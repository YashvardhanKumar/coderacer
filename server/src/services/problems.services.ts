import { IProblems } from '../databases/mongodb/model/problems.model';
import Problem from '../databases/mongodb/schema/problems.schema'

export class ProblemService {
    static async getProblems() {
        const data = await Problem.find();
        return data;
    }
    static async getProblemById(id: string) {
        const data = await Problem.findById(id);
        return data;
    }
    static async createProblem(problem: IProblems) {
        const newProblem = await Problem.insertOne(problem);
        return newProblem;
    }
    static async updateProblem(id: string, problem: IProblems) {
        const updatedProblem = await Problem.findByIdAndUpdate(id, problem, { new: true });
        return updatedProblem;
    }
    static async deleteProblem(id: string) {
        const deletedProblem = await Problem.findByIdAndDelete(id);
        return deletedProblem;
    }
    
}