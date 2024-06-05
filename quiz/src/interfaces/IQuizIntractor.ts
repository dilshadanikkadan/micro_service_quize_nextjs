import { Question } from "../entities/question";
import { Quiz } from "../entities/quiz";

export interface IQuizInteractor {
    createUser(user: any): Promise<any>;
    login(data:any): Promise<any>;
    createQuiz(data:Quiz):Promise<any>;
    appendQueston(data:any):Promise<any>;
  }
  