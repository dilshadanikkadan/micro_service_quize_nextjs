import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { INTERFACE_TYPE } from "./utils/appConst";
import { IUserRepository } from "./interfaces/IUserRepository";
import { UserRepository } from "./repositories/userRepository";
import { IUserInteractor } from "./interfaces/IUserIntractor";
import { UserInteractor } from "./intractors/userIntractor";
import cookieSession from "cookie-session";
import "./controllers/user.controller";
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
  .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
  .to(UserRepository);
container
  .bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor)
  .to(UserInteractor);
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
app.set("trust proxy", true);
app.use((req,res,next) => {
  console.log(`actually reached in the user-service`);
  next();
});
app.get("/api/user", (req, res) => {
  res.send("server is started");
});
dbConnect();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
