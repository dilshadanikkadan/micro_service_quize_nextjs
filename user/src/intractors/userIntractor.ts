import { injectable, inject } from "inversify";
import { IUserInteractor } from "../interfaces/IUserIntractor";
import { IUserRepository } from "../interfaces/IUserRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { User } from "../entities/user";
import {
  LoginSerivces,
  SignupSerivces,
} from "../services/signupServices/signupService";
import { BadRequestError } from "@ezart/common";
import { PasswordServices } from "../services/passwordServices/passwordServices";
import { Password } from "../services/passwordServices/password";

@injectable()
export class UserInteractor implements IUserInteractor {
  constructor(
    @inject(INTERFACE_TYPE.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async createUser(user: User): Promise<any> {
    const isExistEmail = await SignupSerivces.emailAlreadyExist(user.email);

    if (isExistEmail) throw new BadRequestError("Email Already Exist");

    return this.userRepository.create(user);
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
}
