import { Quiz } from "../entities/quiz";
import { User } from "../entities/user";

export interface IQuizRepository {
  create(data: User): Promise<User>;
  build(data: User): Promise<any>;
  addQuiz(data: Quiz): Promise<any>;
  findAllProducts(data:any):Promise<any>;
  saveQuestion(data:any):Promise<any>;
}
 