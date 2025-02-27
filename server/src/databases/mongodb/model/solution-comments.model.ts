import { Schema, Types } from "mongoose";

export interface ISolutionComments extends Document {
  id: string;
  authorId: number;
  description: string;
  commentsOf: Schema.Types.ObjectId;
  isReply: boolean;
  replies: [Schema.Types.ObjectId];
}