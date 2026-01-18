import type { ConnectionOptions } from "bullmq";

export const redisConnection: ConnectionOptions = {
  url: process.env.UPSTASH_REDIS_URL!,
  maxRetriesPerRequest: null,
};
