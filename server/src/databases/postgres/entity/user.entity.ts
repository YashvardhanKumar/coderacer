import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import IUser, { AuthProvider, Role } from '../model/user.model';
import { SubmittedCodeEntity } from './submitted-code.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('user')
@Unique(['username'])
export class UserEntity implements IUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field()
  @Column({ type: 'varchar' })
  name!: string;

  @Field(() => ID)
  @Column({ type: 'varchar' })
  username!: string;

  @Field({ nullable: true })
  @Column({ select: false, nullable: true, type: 'varchar' })
  password: string;

  @Field(() => AuthProvider)
  @Column({ type: 'enum', enum: AuthProvider, default: AuthProvider.LOCAL })
  authProvider!: AuthProvider;

  @Field()
  @Column({ type: 'varchar' })
  email!: string;

  @Field()
  @Column({ default: new Date().toDateString() })
  dateRegistered!: string;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field(() => Role)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role!: Role;

  @Field(() => [SubmittedCodeEntity])
  @OneToMany(() => SubmittedCodeEntity, (sc) => sc.submitter)
  solutions!: SubmittedCodeEntity[];

  @Field(() => Number)
  @Column({ default: 0 })
  lat!: number;

  @Field(() => Number)
  @Column({ default: 0 })
  long!: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  avatar!: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  summary!: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  github!: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  linkedin!: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  facebook!: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  twitter!: string;
}
