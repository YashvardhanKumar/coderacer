import { Schema, Types, model } from "mongoose";
import { IProblems, Testcases } from "../model/problems.model";

const schema = new Schema<IProblems>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    difficulty: {
      type: String,
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
    hints: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    testcases: {
      type: [Types.Map<Testcases>],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IProblems>("problems", schema);
