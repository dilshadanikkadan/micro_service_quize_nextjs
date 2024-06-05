import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { SignupSerivces } from "../services/signupServices/signupService";
import { User } from "../entities/user";
@injectable()
export class UserRepository implements IUserRepository {
  async create(payload: User): Promise<any> {
    const savingProcess = await SignupSerivces.build(payload);
    
    return savingProcess
  }
  async findAllProducts(data: any): Promise<any> {
      
  }
}
