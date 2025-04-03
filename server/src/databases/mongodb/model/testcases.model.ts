import { ObjectId } from "mongoose";

export class ITestcases {
  _id: ObjectId;
  problemId: number;
  inputVars: [string];
  inputTypes: [string];
  outputType: string;
  inFile: string;
  outFile: string;
}
