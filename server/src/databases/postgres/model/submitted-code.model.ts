import { registerEnumType } from "type-graphql";
import { UserEntity } from "../entity/user.entity";

export enum Status {
  ACCEPTED = "accepted",
  WRONG_ANSWER = "wrong-answer",
  MEMORY_LIMIT_EXCEEDED = "memory-limit-exceeded",
  TIME_LIMIT_EXCEEDED = "time-limit-exceeded",
  COMPILATION_ERROR = "compilation-error",
  RUNTIME_ERROR = "runtime-error",
  INTERNAL_ERROR = "internal-error",
}

export enum Language {
  CPP = "cpp",
  JAVA = "java",
  PYTHON = "python",
  JAVASCRIPT = "javascript",
}
export default interface ISubmittedCode {
  id: string;
  problemId: string;
  status: Status;
  language: Language;
  notes?: string;
  dateSubmitted: Date;
  runtime: number;
  memory: number;
  testcases: number;
  submitter: UserEntity;
}

registerEnumType(Status, {
  name: "Status",
});

registerEnumType(Language, {
  name: "Language",
});
