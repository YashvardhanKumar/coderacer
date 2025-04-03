export enum Role {
    ADMIN = "admin",
    USER = "user",
    CONTRIBUTOR = "contributor",
  }
  export enum AuthProvider {
    LOCAL = "local",
    GITHUB = "github",
    LINKEDIN = "linkedin",
    GOOGLE = "google",
  }
  
  export default interface IUser {
    id: string;
    name: string;
    username: string;
    password?: string;
    authProvider: AuthProvider;
    email: string;
    dateRegistered: string;
    role: Role;
    lat: number;
    long: number;
    avatar?: string;
    summary?: string;
    github?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  }