import { NextFunction, Request, Response } from "express";
import { unauthorized } from "./utils/errorcodes";
import { AuthProvider, Role } from "./databases/postgres/model/user.model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { generateToken, verifyToken } from "./utils/authUtils";
export interface JwtPayload extends jwt.JwtPayload {
    uid: string;
    role: Role;
    accessToken: string;
    provider: AuthProvider
}
export const authorizedUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.get('token');
    const publicKey = process.env.PUBLIC_KEY || 'secret';
    let payload: JwtPayload
    try {
        payload = jwt.verify(token, publicKey, { algorithms: ["RS256"] }) as JwtPayload;
        
    } catch (err) {
        const error = err as JsonWebTokenError
        unauthorized(res, { message: error.message });
        return;
    }
    req.user = payload;
    next();
}