import { ISolution } from "../../mongodb/model/solution.model";
import { SubmittedCodeEntity } from "../entity/submitted-code.entity";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}
export enum AuthProvider {
  LOCAL = "local",
  GITHUB = "github",
  LINKEDIN = "linkedin",
  GOOGLE = "google",
}

export default interface IUser {
  id: string;
  solutions: SubmittedCodeEntity[];
  name: string;
  username: string;
  password?: string;
  authProvider: AuthProvider;
  email: string;
  dateRegistered: string;
  role: Role;
  lat: number;
  long: number;
  summary?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
}
