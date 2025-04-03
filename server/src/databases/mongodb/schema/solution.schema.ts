import { Schema, Types, model } from "mongoose";
import { IProblems } from "../model/problems.model";
import { ISolution } from "../model/solution.model";

const schema = new Schema<ISolution>(
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
    tags: [{
      type: String,
      required: true,
    }],
    comments: [{
      ref: "solution-comments",
      type: Types.ObjectId,
      required: true,
    }],
  },
  {
    timestamps: true,
  }
);

export default model<ISolution>("solutions", schema);
