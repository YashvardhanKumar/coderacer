import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import ISubmittedCode, {
  Language,
  Status,
} from "../model/submitted-code.model";
import IUser, { AuthProvider, Role } from "../model/user.model";
import { SubmittedCodeEntity } from "./submitted-code.entity";

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  username!: string;

  @Column({ select: false, nullable: true })
  password!: string;

  @Column({ default: AuthProvider.LOCAL })
  authProvider!: AuthProvider;

  @Column()
  email!: string;

  @Column({ default: new Date().toDateString() })
  dateRegistered!: string;

  @Column("int")
  role!: Role;

  @OneToMany(() => SubmittedCodeEntity, (sc) => sc.submitter)
  solutions!: SubmittedCodeEntity[];

  @Column({ default: 0 })
  lat!: number;

  @Column({ default: 0 })
  long!: number;

  @Column({ nullable: true })
  summary!: string;

  @Column({ nullable: true })
  github!: string;

  @Column({ nullable: true })
  linkedin!: string;

  @Column({ nullable: true })
  facebook!: string;

  @Column({ nullable: true })
  twitter!: string;
}
