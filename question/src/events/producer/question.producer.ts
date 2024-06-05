import { KafkaProducer, Subjects } from "@quizee/common";
import { Producer } from "kafkajs";

export interface Event {
  subject: Subjects;
  data: any;
}
export class QuestionProducer extends KafkaProducer<Event> {
  constructor(producer: Producer) {
    super(producer);
  }
  subject: Subjects.QuestonAdded = Subjects.QuestonAdded; 
}
