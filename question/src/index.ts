import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { INTERFACE_TYPE } from "./utils/appConst";
import { IQuizRepository } from "./interfaces/IQuizRepository";
import { QuizRepository } from "./repositories/user.repository";
import { IQuizInteractor } from "./interfaces/IQuizIntractor";
import { QuizInteractor } from "./intractors/quiz.intractor";
import cookieSession from "cookie-session";
import "./controllers/quiz.controller";
import { dbConnect } from "./config/databseConnection";
import {
  KafkaConsumer,
  KafkaProducer,
  NotFoundError,
  errorHandler,
} from "@ezart/common";
// import { Event, UserCreate } from "./events/user-created";
import { producer } from "./config/kafka.config";

const container = new Container();

container
  .bind<IQuizRepository>(INTERFACE_TYPE.QuizRepository)

  .to(QuizRepository);
container
  .bind<IQuizInteractor>(INTERFACE_TYPE.QuizInteractor)
  .to(QuizInteractor);
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cookieSession({
      signed: false,
      secure: false,
    })
  );

  app.use(errorHandler);
});

const app = server.build();
dbConnect();
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
