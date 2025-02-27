import { Schema, Types, model } from "mongoose";
import { IProblems } from "../model/problems.model";
import { ISolution } from "../model/solution.model";
import { ITestcases } from "../model/testcases.model";

const schema = new Schema<ITestcases>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    problemId: {
      type: Number,
      required: true,
    },
    inputVars: [
      {
        type: String,
        required: true,
      },
    ],
    inputTypes: [
      {
        type: String,
        required: true,
      },
    ],
    outputType: {
      type: String,
      required: true,
    },
    inFile: {
      type: String,
      required: true,
    },
    outFile: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ITestcases>("testcases", schema);
