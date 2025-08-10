import { ObjectId, Schema } from 'mongoose';

export class ISolutionComments extends Document {
  _id: ObjectId;
  authorId: number;
  description: string;
  commentsOf: Schema.Types.ObjectId;
  isReply: boolean;
  replies: [Schema.Types.ObjectId];
}
