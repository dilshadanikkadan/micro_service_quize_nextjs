import { Question } from "../../entities/question";
import { Quiz } from "../../entities/quiz";
import { User } from "../../entities/user";
import { QuestionModel } from "../../models/qestion.model";
import { QuizModel } from "../../models/quiz.model";
import { IUser, UserModel, UserSchema } from "../../models/user.model";

export class QuizSerivces {


  static async build(attrs: Quiz) {
    return new QuizModel(attrs);
  }

  static async questionAppend(attrs:Question){
    return new QuestionModel(attrs)
  }
}


export class LoginSerivces {
  static async emailAlreadyExist(email: string) {
    const res = await UserModel.findOne({email});
    return res;
  }


}
