import { Schema, model } from 'mongoose';
import { ISolutionComments } from '../model/solution-comments.model';

const schema = new Schema<ISolutionComments>(
  {
    authorId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isReply: {
      type: Boolean,
      required: true,
    },
    commentsOf: {
      ref: 'solutions',
      type: Schema.Types.ObjectId,
    },
    replies: [
      {
        ref: 'solutions-comments',
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<ISolutionComments>('solutions-comments', schema);
