import { ObjectId, Schema, Types } from "mongoose";

export class ISolution extends Document {
  _id: ObjectId;
  authorId: number;
  title: string;
  description: string;
  tags: [string];
  comments: [Schema.Types.ObjectId];
}