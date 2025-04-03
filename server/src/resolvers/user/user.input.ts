import { Field, InputType } from "type-graphql";
import { UserEntity } from "../../databases/postgres/entity/user.entity";
import { AuthProvider, Role } from "../../databases/postgres/model/user.model";

@InputType()
export class CreateUserInput implements Partial<UserEntity> {
  @Field()
  public username!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public password?: string;

  @Field()
  public email!: string;

  @Field((_type) => Role)
  public role!: Role;

  @Field((_type) => AuthProvider)
  public authProvider!: AuthProvider;

  @Field({ nullable: true })
  public summary?: string;

  @Field({ nullable: true })
  public github?: string;

  @Field({ nullable: true })
  public linkedin?: string;

  @Field({ nullable: true })
  public facebook?: string;

  @Field({ nullable: true })
  public twitter?: string;

  @Field({ nullable: true })
  public lat?: number;

  @Field({ nullable: true })
  public long?: number;

  @Field({ nullable: true })
  public avatar?: string;
}

@InputType()
export class UpdateUserInput implements Partial<UserEntity> {
  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public password?: string;

  @Field({ nullable: true })
  public email?: string;

  @Field((_type) => Role, { nullable: true })
  public role?: Role;

  @Field((_type) => AuthProvider, { nullable: true })
  public authProvider?: AuthProvider;

  @Field({ nullable: true })
  public summary?: string;

  @Field({ nullable: true })
  public github?: string;

  @Field({ nullable: true })
  public linkedin?: string;

  @Field({ nullable: true })
  public facebook?: string;

  @Field({ nullable: true })
  public twitter?: string;

  @Field({ nullable: true })
  public lat?: number;

  @Field({ nullable: true })
  public long?: number;

  @Field({ nullable: true })
  public avatar?: string;
}

