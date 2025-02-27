import { Request, Response } from "express";
import crypto from "crypto";
import { rClient } from "../../databases/redis";
import { v4 as uuidv4 } from "uuid";
import { bad_req, success, unauthorized } from "../../utils/errorcodes";
import axios from "axios";
import IUser, {
  AuthProvider,
  Role,
} from "../../databases/postgres/model/user.model";
import { UserService } from "../user.services";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../../middleware";
import { generateToken, verifyToken } from "../../utils/authUtils";

declare module "express-serve-static-core" {
  interface Request {
    user: JwtPayload;
  }
}
interface IGithubUserData {
  email: string;
  name: string;
  login: string;
  html_url: string;
  two_factor_authentication: boolean;
  bio: string;
}

const REDIRECT_URL = "http://localhost:5050/auth/github/oauth2callback";
const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const scopes = ["user"].join("%20");

export class Github {
  static async authorize(req: Request, res: Response) {
    const role = req.body.role as Role;
    const userId = req.body.userId;
    const state_data = {
      state: crypto.randomBytes(32).toString("hex"),
      userId,
      role,
    };
    let encoded_state = Buffer.from(JSON.stringify(state_data)).toString(
      "base64url"
    );
    await rClient.setEx(`github_state:${userId}`, 600, encoded_state);
    success(
      res,
      GITHUB_AUTH_URL +
        `?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${scopes}&state=${encoded_state}`
    );
  }

  static async callback(req: Request, res: Response) {
    if (req.query.error) {
      bad_req(res, req.query.error);
    }
    const code = req.query.code as string;
    const encoded_state = req.query.state as string;
    const decoded_state = JSON.parse(
      Buffer.from(encoded_state, "base64url").toString()
    );
    const state = decoded_state.state;
    const userId = decoded_state.userId;
    const role = decoded_state.role;
    const redis_state_data = await rClient.get(`github_state:${userId}`);

    if (
      !redis_state_data ||
      state !=
        JSON.parse(Buffer.from(redis_state_data, "base64url").toString()).state
    ) {
      res.status(401).json({ error: "Invalid state" });
      return;
    }
    const resp = await axios.post<{
      access_token: string;
      scope: string;
      token_type: string;
    }>(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
        redirect_url: REDIRECT_URL,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await rClient.del(`github_state:${userId}`);
    await rClient.setEx(
      `github_credentials:${userId}`,
      600,
      Buffer.from(JSON.stringify({ data: resp.data, role })).toString(
        "base64url"
      )
    );
    res.cookie(
      "accessToken",
      generateToken({ userId, role }, 30 * 24 * 60 * 60),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      }
    );
    res.cookie("github_token", resp.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 6 * 60 * 1000),
    });
    success(res, resp.data);
  }
  static async getGithubCredentials(req: Request, res: Response) {
    const bearerToken = req.cookies.github_token;

    const accessToken = req.cookies.access_token;

    const { userId, role, error} = verifyToken(accessToken) as any;

    if(error) {
      unauthorized(res, error);
      return;
    }

    const credentials = await rClient.get(
      `github_credentials:${req.body.userId}`
    );
    if (!credentials) {
      bad_req(res, "No credentials found.");
    }
    const cred_json = JSON.parse(credentials ?? "");
    await rClient.del(`github_credentials:${userId}`);
    const resp = (
      await axios.get<IGithubUserData>("https://api.github.com/user", {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "Bearer " + bearerToken,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
    ).data;
    let metadata: IUser = {
      id: userId,
      role: role,
      solutions: [],
      username: resp.login,
      authProvider: AuthProvider.GITHUB,
      lat: req.user.loc.lat,
      long: req.user.loc.long,
      email: resp.email,
      name: resp.name,
      github: resp.html_url,
      summary: resp.bio,
      dateRegistered: Date.now().toString(),
    };
    let user;
    if (await UserService.getUserByUsername(resp.login)) {
      metadata.username = resp.login + "_" + uuidv4().split("-").reverse()[0];
    }
    user = await UserService.createUser(metadata);
    success(res, { ...cred_json, role, user });
  }

  //   static async getIntegrations(req: Request, res: Response) {
  //     const credentials = req.user.credentials;
  //     const role = req.user.role;

  //     success(res, user);
  //   }
}