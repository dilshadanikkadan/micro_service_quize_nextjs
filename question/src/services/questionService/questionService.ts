import { Question } from "../../entities/quiz";
import { User } from "../../entities/user";
import { QuestionModel } from "../../models/qestion.model";
import { IUser, UserModel, UserSchema } from "../../models/user.model";

export class QuestionSerivces {


  static async build(attrs: Question) {
    return new QuestionModel(attrs);
  }
}



