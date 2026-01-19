import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;

export async function getRedis(): Promise<RedisClientType> {
  if (client) return client;

  const url = process.env.REDIS_URL;
  if (!url) throw new Error("Missing REDIS_URL");

  const isTls = url.startsWith("rediss://");

  client = createClient({
    url,
    socket: isTls ? { tls: true } : undefined,
  });

  client.on("error", (err) => {
    console.error("Redis Client Error", err);
  });

  await client.connect();
  return client;
}
