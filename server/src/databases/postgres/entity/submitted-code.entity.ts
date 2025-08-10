import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import ISubmittedCode, {
  Language,
  Status,
} from '../model/submitted-code.model';
import { UserEntity } from './user.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('submitted_code')
export class SubmittedCodeEntity implements ISubmittedCode {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => ID)
  @Column({ default: 0, type: 'varchar' })
  problemId!: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (submitter) => submitter.solutions)
  @JoinColumn({ name: 'submitterId' })
  submitter!: UserEntity;

  @Field(() => Status)
  @Column({
    type: 'enum',
    enum: Status,
  })
  status!: Status;

  @Field(() => Language)
  @Column({
    type: 'enum',
    enum: Language,
  })
  language!: Language;

  @Field()
  @Column({ nullable: true, type: 'varchar' })
  notes!: string;

  @Field()
  @CreateDateColumn()
  dateSubmitted!: Date;

  @Field(() => Number)
  @Column({ default: 0 })
  runtime!: number;

  @Field(() => Number)
  @Column({ default: 0 })
  memory!: number;

  @Field(() => Number)
  @Column({ default: 0 })
  testcases!: number;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
