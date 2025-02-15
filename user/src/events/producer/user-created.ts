import { KafkaProducer, Subjects } from "@quizee/common";
import { injectable } from "inversify";
import { Producer } from "kafkajs";

export interface Event {
  subject: Subjects;
  data: any;
}
@injectable()
export class UserCreate extends KafkaProducer<Event> {
  constructor(producer: Producer) {
    super(producer);
  }
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
