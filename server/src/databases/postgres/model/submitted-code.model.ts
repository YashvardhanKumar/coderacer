export enum Status {
  ACCEPTED = "accepted",
  WRONG_ANSWER = "wrong-answer",
  MEMORY_LIMIT_EXCEEDED = "memory-limit-exceeded",
  TIME_LIMIT_EXCEEDED = "time-limit-exceeded",
  COMPILATION_ERROR = "compilation-error",
  RUNTIME_ERROR = "runtime-error",
  INTERNAL_ERROR = "internal-error"
}

export enum Language {
  CPP = "cpp",
  JAVA = "java",
  PYTHON = "python",
  JAVASCRIPT = "javascript"
}
export default interface ISubmittedCode {
    id: number;
    problemId: number;
    status: Status;
    language: Language;
    notes?: string;
    dateSubmitted: string;
    runtime: number;
    memory: number;
    testcases: number
  }
  