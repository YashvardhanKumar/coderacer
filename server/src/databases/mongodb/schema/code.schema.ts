import { Schema, model } from 'mongoose';
import { ICode } from '../model/code.model';

const schema = new Schema<ICode>(
  {
    submissionId: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ICode>('code', schema);
