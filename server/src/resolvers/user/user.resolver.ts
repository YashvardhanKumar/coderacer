import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { UserEntity } from "../../databases/postgres/entity/user.entity";
import { ObjectLiteral, QueryBuilder, Repository } from "typeorm";
import { useTypeORM } from "../../databases/postgres/typeorm";
import { AuthProvider, Role } from "../../databases/postgres/model/user.model";
import argon2 from "argon2";
import { Service } from "typedi";
import { UserService } from "../../services/user.services";
import { CreateUserInput, UpdateUserInput } from "./user.input";

@Service()
@Resolver((_type) => UserEntity)
export class UserResolver {
  @Query((_type) => [UserEntity])
  public async getUsers(): Promise<UserEntity[]> {
    const userRepository = useTypeORM(UserEntity);
    return UserService.getUsers();
  }
  @Mutation((_type) => UserEntity)
  public async createCategory(
    @Arg("data") inputData: CreateUserInput
  ): Promise<UserEntity> {
    const userRepository = useTypeORM(UserEntity);
    const data = await UserService.checkUserExists(
      inputData.email,
      inputData.role
    );
    if (!data.exists) {
      return UserService.createUser(inputData);
    }
    return (await UserService.getUsersOne(data.user!.id)) as UserEntity
  }

  @Mutation((_type) => [UserEntity])
  public async deleteAll(): Promise<UserEntity[]> {
    const userRepository = useTypeORM(UserEntity);

    const users = await userRepository.find({
      relations: ["solutions"],
      order: { createdAt: "DESC" },
    });
    await userRepository.query('DELETE FROM "user"');
    // await userRepository.save(users);

    return users;
  }

  @Mutation((_type) => UserEntity)
  public async updateCategory(
    @Arg("id") id: string,
    @Arg("data") inputData: UpdateUserInput
  ): Promise<UserEntity> {
    const userRepository = useTypeORM(UserEntity);

    return UserService.updateUsers(id, inputData);
  }
}
