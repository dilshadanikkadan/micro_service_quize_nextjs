import { User } from "../entities/user";

export interface IQuizRepository {
  create(data: User): Promise<User>;
  findAllProducts(data:any):Promise<any>;
  saveQuiz(data:any):Promise<any>;
}
 