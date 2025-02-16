import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import ISubmittedCode, { Language, Status } from '../model/submitted-code.model';
import IUser, { Role } from '../model/user.model';



@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column({ default: new Date().toDateString() })
  dateRegistered!: string;

  @Column('int')
  role!: Role;

  @Column({ default: 0 })
  lat!: number;

  @Column({ default: 0 })
  long!: number;

  @Column({nullable: true})
  summary!: string;
}