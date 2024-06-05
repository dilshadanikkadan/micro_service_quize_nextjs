import { Kafka, Producer, Consumer } from "kafkajs";

export const kafka = new Kafka({
  clientId: "auth-service",
  brokers: ["kafka.kafka.svc.cluster.local:9092"],
  
  retry: {
    retries: 3,
  },
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({ groupId: "user-service" });
export const CartResconsumer: Consumer = kafka.consumer({ groupId: "cart-res-service" });

