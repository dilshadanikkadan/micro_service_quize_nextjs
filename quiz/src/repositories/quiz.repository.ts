import { injectable } from "inversify";
import { IQuizRepository } from "../interfaces/IQuizRepository";
import { SignupSerivces } from "../services/signupServices/signupService";
import { User } from "../entities/user";
import { Quiz } from "../entities/quiz";
import { QuizSerivces } from "../services/quizService/quiz.service";
import { QuestionModel } from "../models/qestion.model";
import { QuizModel } from "../models/quiz.model";
@injectable()
export class QuizRepository implements IQuizRepository {
  async create(payload: User): Promise<any> {
    const savingProcess = await SignupSerivces.build(payload);
    console.log("payload", payload);
    const saved = await savingProcess.save();
    return saved;
  }
  async findAllProducts(data: any): Promise<any> {}
  async build(data: User): Promise<any> {}
  async addQuiz(data: Quiz): Promise<any> {
    console.log("hey dilshad we wre tryoing ");
    
    const savingProcess = await QuizSerivces.build(data);
    const saved = await savingProcess.save();
    return saved;
  }
  async saveQuestion(data: any): Promise<any> {
    console.log("dilshad ur data is",data);
    
    const { questions, quizId } = data;
    console.log("data",data);
    
    const newQuestion = await QuestionModel.insertMany(questions);
    const idGroup = newQuestion.map((x) => x?._id);
    await QuizModel.findByIdAndUpdate(quizId, {
      $push: { questions: { $each: idGroup } },
    });
    return;
  }
}
