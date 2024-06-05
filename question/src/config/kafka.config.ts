import { Kafka, Producer, Consumer, Partitioners } from "kafkajs";

export const kafka = new Kafka({
  clientId: "question-service",
  brokers: ["localhost:9092"],
  
  retry: {
    retries: 3,
  },
});

export const producer: Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
export const consumer: Consumer = kafka.consumer({ groupId: "question-service" });
export const CartResconsumer: Consumer = kafka.consumer({ groupId: "cart-res-service" });

