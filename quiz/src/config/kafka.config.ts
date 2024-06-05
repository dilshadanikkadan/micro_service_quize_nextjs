import { Kafka, Producer, Consumer, Partitioners } from "kafkajs";

export const kafka = new Kafka({
  clientId: "quiz-service",
  brokers: ["kafka.kafka.svc.cluster.local:9092"],
  
  retry: {
    retries: 3,
  },
});

export const producer: Producer =  kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
export const consumer: Consumer = kafka.consumer({ groupId: "quiz-service" });
export const CartResconsumer: Consumer = kafka.consumer({ groupId: "cart-res-service" });

