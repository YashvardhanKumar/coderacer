import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import ISubmittedCode, {
  Language,
  Status,
} from "../model/submitted-code.model";
import { UserEntity } from "./user.entity";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity("submitted_code")
export class SubmittedCodeEntity implements ISubmittedCode {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Field((_type) => ID)
  @Column({ default: 0, type: "varchar" })
  problemId!: string;

  @Field((_type) => UserEntity)
  @ManyToOne(() => UserEntity, (submitter) => submitter.solutions)
  @JoinColumn({ name: "submitterId" })
  submitter!: UserEntity;

  @Field((_type) => Status)
  @Column({
    type: "enum",
    enum: Status,
  })
  status!: Status;

  @Field((_type) => Language)
  @Column({
    type: "enum",
    enum: Language,
  })
  language!: Language;

  @Field()
  @Column({ nullable: true, type: "varchar" })
  notes!: string;

  @Field()
  @CreateDateColumn()
  dateSubmitted!: Date;

  @Field((_type) => Number)
  @Column({ default: 0 })
  runtime!: number;

  @Field((_type) => Number)
  @Column({ default: 0 })
  memory!: number;

  @Field((_type) => Number)
  @Column({ default: 0 })
  testcases!: number;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
