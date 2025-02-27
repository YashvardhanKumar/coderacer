import argon2 from "argon2";
import { UserEntity } from "../databases/postgres/entity/user.entity";
import IUser from "../databases/postgres/model/user.model";
import { useTypeORM } from "../databases/postgres/typeorm";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { server_error, success } from "../utils/errorcodes";

export class UserService {
  static async createUser(user: IUser) {
    const newUser = new UserEntity();
    newUser.id = uuidv4();
    newUser.username = user.username;
    newUser.name = user.name;
    newUser.password = user.password ? await argon2.hash(user.password) : undefined;
    newUser.email = user.email;
    newUser.dateRegistered = new Date().toISOString();
    newUser.role = user.role;
    newUser.lat = user.lat;
    newUser.long = user.long;
    newUser.summary = user.summary;
    newUser.github = user.github;
    newUser.linkedin = user.linkedin;
    newUser.facebook = user.facebook;
    newUser.twitter = user.twitter;

    const newProduct = await useTypeORM(UserEntity).insert(user);
    return newProduct;
  }

  static async getUserById(id: number) {
    return useTypeORM(UserEntity).findOne({ where: { id } });
  }
  static async getUserByUsername(username: string) {
    return useTypeORM(UserEntity).findOne({ where: { username } });
  }
}
