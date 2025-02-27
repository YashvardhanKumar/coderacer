import { Document, Schema } from "mongoose";
import { Language } from "../../postgres/model/submitted-code.model";
import { InstanceChecker } from "typeorm";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface IProblems extends Document {
  id: string;
  difficulty: Difficulty;
  title: string;
  description: string;
  hints: [string];
  tags: [string];
  testcases: Schema.Types.ObjectId;
}
