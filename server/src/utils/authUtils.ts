import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { JwtPayload } from '../middleware';

export function generateToken(payload: jwt.JwtPayload, jwt_expire: number) {
  const privateKey = process.env.PRIVATE_KEY || 'secret';
  try {
    return jwt.sign(payload, privateKey, {
      expiresIn: jwt_expire,
      algorithm: "RS256",
    });
  } catch (err) {
    // console.log(err);
    return null;
  }
}

export function verifyToken(token: string, onError: Function = () => {}): (JwtPayload | {error: string}){
  const publicKey = process.env.PUBLIC_KEY || 'secret';
  try {
    return jwt.verify(token, publicKey, { algorithms: ["RS256"] }) as JwtPayload;
    
  } catch (error) {
    const err = error as JsonWebTokenError
    return { error: err.message };
  }

}
