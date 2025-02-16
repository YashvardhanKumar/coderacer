export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

export default interface IUser {
    id: number;
    username: string;
    password: string;
    email: string;
    dateRegistered: string;
    role: Role;
    lat: number;
    long: number;
    summary: string;
  }