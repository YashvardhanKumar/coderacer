import { Schema, Types } from "mongoose";

export interface ISolution extends Document {
  id: string;
  authorId: number;
  title: string;
  description: string;
  tags: [string];
  comments: [Schema.Types.ObjectId];
}