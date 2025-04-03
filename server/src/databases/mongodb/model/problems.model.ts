import { Document, ObjectId, Schema } from "mongoose";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export class IProblems extends Document {
  _id: ObjectId;
  difficulty: Difficulty;
  title: string;
  description: string;
  hints: [string];
  tags: [string];
  testcases: Schema.Types.ObjectId;
}
