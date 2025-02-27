import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import ISubmittedCode, { Language, Status } from '../model/submitted-code.model';
import { UserEntity } from './user.entity';
import IUser from '../model/user.model';



@Entity()
export class SubmittedCodeEntity implements ISubmittedCode {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ default: 0 })
  problemId!: number;

  @ManyToOne(() => UserEntity, (submitter) => submitter.solutions)
  submitter!: UserEntity;

  @Column('int')
  status!: Status;

  @Column()
  language!: Language;

  @Column({ nullable: true })
  notes!: string;

  @Column({ default: new Date().toDateString() })
  dateSubmitted!: string;

  @Column({ default: 0 })
  runtime!: number;

  @Column({ default: 0 })
  memory!: number;
  
  @Column({ default: 0 })
  testcases!: number;
}