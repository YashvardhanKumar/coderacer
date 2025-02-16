import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import ISubmittedCode, { Language, Status } from '../model/submitted-code.model';



@Entity()
export class SubmittedCodeEntity implements ISubmittedCode {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 0 })
  problemId!: number;

  

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