import { createClient } from "redis";

type GlobalWithRedis = typeof globalThis & { __redisClient?: ReturnType<typeof createClient> };

export async function getRedis() {
  const url = process.env.REDIS_URL;
  if (!url) throw new Error("Missing env var: REDIS_URL");

  const g = globalThis as GlobalWithRedis;

  if (!g.__redisClient) {
    g.__redisClient = createClient({ url });
    g.__redisClient.on("error", (err) => console.error("Redis error:", err));
  }

  if (!g.__redisClient.isOpen) {
    await g.__redisClient.connect();
  }

  return g.__redisClient;
}
