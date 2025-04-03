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
import { Octokit } from "@octokit/core";
import { useTypeORM } from "../../databases/postgres/typeorm";
import { UserEntity } from "../../databases/postgres/entity/user.entity";

declare module "express-serve-static-core" {
  interface Request {
    user: JwtPayload;
  }
}

const REDIRECT_URL = "http://localhost:5050/auth/github/oauth2callback";
const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const scopes = ["read:user", "user:email"].join("%20");

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
    success(res, {
      url:
        GITHUB_AUTH_URL +
        `?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${scopes}&state=${encoded_state}`,
    });
  }

  static async callback(req: Request, res: Response) {
    if (req.query.error) {
      bad_req(res, { error: req.query.error });
    }
    try {
      const code = req.query.code as string;
      const encoded_state = req.query.state as string;
      const decoded_state = JSON.parse(
        Buffer.from(encoded_state, "base64url").toString()
      );

      const state = decoded_state.state;
      const userId = decoded_state.userId;
      const role = decoded_state.role;
      const redis_state_data = await rClient.get(`github_state:${userId}`);
      const redis_state = JSON.parse(
        Buffer.from(redis_state_data ?? "", "base64url").toString()
      ).state;

      if (!redis_state_data || state != redis_state) {
        res.status(401).json({ error: "Invalid state" });
        return;
      }
      const resp = await axios.post<string>(
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
      var vars = resp.data.split("&");
      let github_token = vars[0].split("=")[1];

      await rClient.del(`github_state:${userId}`);
      await rClient.setEx(
        `github_credentials:${userId}`,
        600,
        Buffer.from(
          JSON.stringify({ github_token, role })
        ).toString("base64url")
      );
      res.status(200).send(`
          <html>
              <script>
                  window.close();
              </script>
          </html>
        `);
    } catch (error) {
      console.error(error);

      bad_req(res, { error: req.query.error });
      return;
    }
  }
  static async getGithubCredentials(req: Request, res: Response) {
    try {
      let userId = req.body.userId;
      const credentials = await rClient.get(`github_credentials:${userId}`);
      if (!credentials) {
        bad_req(res, { error: "No credentials found." });
      }

      const cred_json = JSON.parse(
        Buffer.from(credentials ?? "", "base64url").toString()
      );
      const role = cred_json?.role;
      await rClient.del(`github_credentials:${userId}`);
      const octokit = new Octokit({
        auth: cred_json.github_token,
      });

      const resp = (
        await octokit.request("GET /user", {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        })
      ).data;
      const emails = (
        await octokit.request("GET /user/emails", {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        })
      ).data;
      const primary = emails.filter((email) => email.primary)[0];
      const existingUser = await useTypeORM(UserEntity).findOne({
        where: [{ email: primary.email }],
      });



      let metadata: IUser = {
        id: userId,
        role: role,
        solutions: [],
        username: resp.login,
        authProvider: AuthProvider.GITHUB,
        lat: req.user?.loc?.lat,
        long: req.user?.loc?.long,
        email: primary.email,
        name: resp?.name ?? resp.login,
        avatar: resp.avatar_url,
        github: resp.html_url,
        summary: resp?.bio ?? "",
        dateRegistered: Date.now().toString(),
      };
      let data = await UserService.createUser(metadata);
      userId = existingUser?.id ?? data.id;
      const accessToken = generateToken({ userId  , role }, 30 * 24 * 60 * 60);

      res.cookie("github_token", cred_json.github_token, {
        httpOnly: true,
        secure: true,
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
      });
      success(res, {
        ...cred_json,
        role,
        data,
        userId,
      });
    } catch (error) {
      console.error(error);
      unauthorized(res, { error: req.query.error });
      return;
    }
  }
}
