import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { INTERFACE_TYPE } from "./utils/appConst";
import { IQuizRepository } from "./interfaces/IQuizRepository";
import { QuizRepository } from "./repositories/quiz.repository";
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
import { UserCreatedConsumer } from "./events/consumer/user.created.consumer";
import { QuestionConsumer } from "./events/consumer/question.created.consumer";

const container = new Container();

container
  .bind<IQuizRepository>(INTERFACE_TYPE.QuizRepository)
  .to(QuizRepository);
container
  .bind<IQuizInteractor>(INTERFACE_TYPE.QuizInteractor)
  .to(QuizInteractor);
container.bind<UserCreatedConsumer>(UserCreatedConsumer).toSelf();
container.bind<QuestionConsumer>(QuestionConsumer).toSelf();
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
const port = process.env.PORT || 3001;
app.get('/',(req,res)=>{
  res.send('server is started from the quiz')
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const userCreatedConsumer =
  container.get<UserCreatedConsumer>(UserCreatedConsumer);
const questionCreateConsumer =
  container.get<QuestionConsumer>(QuestionConsumer);
questionCreateConsumer.listen();
userCreatedConsumer.listen().catch((err) => {
  console.error("Error starting user created consumer:", err);
});
