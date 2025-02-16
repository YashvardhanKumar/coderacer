import { Document } from 'mongoose';
import { Language } from '../../postgres/model/submitted-code.model';
import { InstanceChecker } from 'typeorm';

export enum Difficulty {EASY = 'easy', MEDIUM = 'medium', HARD = 'hard'};
export interface Testcases {
  inputVars: string[];
  inputTypes: string[];
  outputVar: string
  outputType: string;
  inFile: string;
  outFile: string;
}
export interface IProblems extends Document {
  id: number;
  difficulty: Difficulty;
  title: string;
  description: string;
  hints: string[];
  tags: string[];
  testcases: Array<Testcases>;
}