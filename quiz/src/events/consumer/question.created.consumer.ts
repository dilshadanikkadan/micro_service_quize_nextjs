import { KafkaConsumer, Subjects } from "@quizee/common";
import { EachMessagePayload } from "kafkajs";
import { consumer } from "../../config/kafka.config";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { IQuizInteractor } from "../../interfaces/IQuizIntractor";

@injectable()
export class QuestionConsumer extends KafkaConsumer {
  subject: Subjects = Subjects.QuestonAdded;
  groupId: string = Subjects.QuestonAdded;
  constructor(
    @inject(INTERFACE_TYPE.QuizInteractor)
    private quizIntractor: IQuizInteractor
  ) {
    super(consumer);
  }
  async handleMessage(payload: EachMessagePayload): Promise<void> {
    if (payload.message.value) {
      const credentials = JSON.parse(payload.message.value.toString());
      console.log(`Received message on topic ${this.subject}:`, credentials);

      this.quizIntractor.appendQueston(credentials.payload)
    }
  }
}
