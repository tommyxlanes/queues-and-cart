import { Queue } from "bullmq";
import { redisConnection } from "@/lib/redis";

export const emailQueue = new Queue("emails", {
  connection: redisConnection,
});
