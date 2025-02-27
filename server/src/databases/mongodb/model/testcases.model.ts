export interface ITestcases {
  id: string;
  problemId: number;
  inputVars: [string];
  inputTypes: [string];
  outputType: string;
  inFile: string;
  outFile: string;
}
