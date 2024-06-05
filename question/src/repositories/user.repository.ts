import { injectable } from "inversify";
import { IQuizRepository } from "../interfaces/IQuizRepository";
import { SignupSerivces } from "../services/signupServices/signupService";
import { User } from "../entities/user";
import { QuestionSerivces } from "../services/questionService/questionService";
import { QuestionModel } from "../models/qestion.model";
@injectable()
export class QuizRepository implements IQuizRepository {
  async create(payload: User): Promise<any> {
    const savingProcess = await SignupSerivces.build(payload);

    return savingProcess;
  }
  async findAllProducts(data: any): Promise<any> {}
  async saveQuiz(data: any): Promise<any> {
    const { questions, quizId } = data;
    console.log("data", data);

    const newQuestion = await QuestionModel.insertMany(questions);
    return newQuestion;
  }
}
