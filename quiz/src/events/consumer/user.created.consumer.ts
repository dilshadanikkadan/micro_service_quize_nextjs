import { KafkaConsumer, Subjects } from "@quizee/common";
import { inject, injectable } from "inversify";
import { EachMessagePayload } from "kafkajs";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { Consumer } from "kafkajs";
import { consumer } from "../../config/kafka.config";
import { IQuizRepository } from "../../interfaces/IQuizRepository";
@injectable()
export class UserCreatedConsumer extends KafkaConsumer {
  subject: Subjects = Subjects.UserCreated;
  groupId = Subjects.UserCreated;

  constructor(
    @inject(INTERFACE_TYPE.QuizRepository)
    private quizRepository: IQuizRepository
  ) {
    super(consumer);
  }
  async handleMessage(payload: EachMessagePayload): Promise<void> {
    if (payload.message.value) {
      const credentials = JSON.parse(payload.message.value.toString());
      console.log(`Received message on topic ${this.subject}:`, credentials);
      const { username, email,_id } = credentials.payload;
      await this.quizRepository.create({
        username,
        email,
        isAdmin: false,
        _id 
      });

    } else {
      console.error("Received message with undefined value");
    }
  }
}
