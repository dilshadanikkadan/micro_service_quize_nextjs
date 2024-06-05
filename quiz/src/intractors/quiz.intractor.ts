import { injectable, inject } from "inversify";
import { IQuizInteractor } from "../interfaces/IQuizIntractor";
import { IQuizRepository } from "../interfaces/IQuizRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { User } from "../entities/user";
import {
  LoginSerivces,
  SignupSerivces,
} from "../services/signupServices/signupService";
import { BadRequestError } from "@ezart/common";
import { PasswordServices } from "../services/passwordServices/passwordServices";
import { Password } from "../services/passwordServices/password";
import { Quiz } from "../entities/quiz";
import { Question } from "../entities/question";

@injectable()
export class QuizInteractor implements IQuizInteractor {
  constructor(
    @inject(INTERFACE_TYPE.QuizRepository)
    private quizRepository: IQuizRepository
  ) {}

  async createUser(user: User): Promise<any> {
    const isExistEmail = await SignupSerivces.emailAlreadyExist(user.email);

    if (isExistEmail) throw new BadRequestError("Email Already Exist");

    return this.quizRepository.create(user);
  }
  async allProducts(): Promise<any> {}
  async login(data: any): Promise<any> {
    const userExist = await LoginSerivces.emailAlreadyExist(data.email);
    if (!userExist) throw new BadRequestError("Email Not Existing");

    if (!userExist.password) {
      throw new BadRequestError("Password not found for user");
    }

    const isMatch = await Password.compare(userExist.password, data.password);
    console.log("password match", isMatch);
    if (!isMatch) throw new BadRequestError("Password not matching");

    return userExist;
  }
  async createQuiz(data: Quiz): Promise<any> {
    return this.quizRepository.addQuiz(data);
  }
  async appendQueston(data: any): Promise<any> {
    console.log("dilu ",data);
    
    this.quizRepository.saveQuestion(data);
  }
}
 