import argon2 from 'argon2';
import { UserEntity } from '../databases/postgres/entity/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { useTypeORM } from '../databases/postgres/typeorm';
import { rClient } from '../databases/redis';
import { CreateUserInput, UpdateUserInput } from '../resolvers/user/user.input';

export class UserService {
  static async checkUserExists(email: string, role: string) {
    const db = useTypeORM(UserEntity);
    const existingUser = await db.findOne({
      where: [{ email }],
    });
    if (existingUser?.email == email && existingUser.role == role) {
      return { user: existingUser, exists: true };
    } else {
      return { exists: false };
    }
  }
  static async createUser(inputData: CreateUserInput) {
    const db = useTypeORM(UserEntity);

    while (await rClient.bf.exists('username:models', inputData.username)) {
      console.log('Username already exists!');
      inputData.username =
        inputData.username + '_' + uuidv4().split('-').reverse()[0];
    }
    await rClient.bf.add('username:models', inputData.username);

    const user = db.create({
      name: inputData.name,
      username: inputData.username,
      email: inputData.email,
      role: inputData.role,
      authProvider: inputData.authProvider,
      summary: inputData.summary,
      github: inputData.github,
      password: inputData.password
        ? await argon2.hash(inputData.password)
        : undefined,
      linkedin: inputData.linkedin,
      twitter: inputData.twitter,
      facebook: inputData.facebook,
      lat: inputData.lat,
      long: inputData.long,
      avatar: inputData.avatar,
    });

    return user;
  }

  static async getUsers() {
    const db = useTypeORM(UserEntity);

    const users = await db.find({
      // relations: ["solutions"],
      order: { createdAt: 'DESC' },
    });

    return users;
  }

  static async getUsersOne(id: string) {
    const db = useTypeORM(UserEntity);

    const users = await db.findOne({
      where: { id },
      relations: ['solutions'],
      order: { createdAt: 'DESC' },
    });

    return users;
  }

  static async updateUsers(id: string, inputData: UpdateUserInput) {
    const db = useTypeORM(UserEntity);

    const user = await this.getUsersOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    await db.update(
      { id },
      {
        id,
        ...inputData,
      }
    );

    return user;
  }

  static async deleteUser(id: string) {
    const db = useTypeORM(UserEntity);

    const user = await this.getUsersOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    await db.delete({ id });

    return user;
  }
}
