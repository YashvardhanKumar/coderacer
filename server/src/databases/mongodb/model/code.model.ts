import { Document, ObjectId, Schema } from "mongoose";
import { ObjectType, registerEnumType } from "type-graphql";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

@ObjectType()
export class ICode extends Document {
  _id: ObjectId;
  submissionId: string;
  code: string;
}


registerEnumType(Difficulty, {
  name: "Difficulty"
})