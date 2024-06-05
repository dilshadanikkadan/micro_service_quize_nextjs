import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { INTERFACE_TYPE } from "../utils/appConst";
import { IQuizInteractor } from "../interfaces/IQuizIntractor";
import { successMessage } from "../services/requestServices/successMessage";
import { accessToken } from "../services/jwtServices/accessToken";
import {
  RequestValidationError,
  Subjects,
  currentUser,
  validateRequest,
} from "@quizee/common";
import { User } from "../entities/user";

import { validationResult } from "express-validator";
import { producer } from "../config/kafka.config";
import { validateSignUP } from "../services/validation/signup-validate";
import { UserCreate } from "../events/producer/user-created";

@controller("/api/quiz")
export class QuizController {
  constructor(
    @inject(INTERFACE_TYPE.QuizInteractor) private interactor: IQuizInteractor
  ) {} 

  @httpGet("/currentUser", currentUser)
  async currentuser(req: Request, res: Response, next: NextFunction) {
    res.send("hey this fom quiz");
  }

  @httpPost("/login")
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const credential = req.body;
      const user = await this.interactor.login(credential);
      const token = accessToken(user);
      req.session = {
        jwt: token,
      };
      return successMessage(res, 200, user);
    } catch (error: any) {
      res.status(400).json(error?.message);
      next(error);
    }
  }

  @httpPost("/addquiz")
  async createQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const quizData = req.body;
      const quiz = await this.interactor.createQuiz(quizData);

      return successMessage(res, 200, quiz);
    } catch (error: any) {
      res.status(400).json(error?.message);
      next(error);
    }
  }

  @httpPost("/create", ...validateSignUP)
  async createUser(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array()[0].msg);
    }
    try {
      const credential: User = req.body;
      const user = await this.interactor.createUser(credential);
      const userCreate = new UserCreate(producer);
      await user.save();
      const token = accessToken(user);
      req.session = {
        jwt: token,
      };
      await userCreate.produce({ payload: user }, Subjects.UserCreated);

      return successMessage(res, 201, {
        paylaod: user,
        token,
      });
    } catch (error: any) {
      next(error);
    }
  }
}
