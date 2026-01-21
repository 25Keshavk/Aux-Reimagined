import { getRedis } from "./redis";

export async function rateLimit(key: string, limit: number, windowSec: number) {
  const redis = await getRedis();

  // node-redis typing can be string|number depending on config; Make Note of this error, I spent a while debugging
  const raw = await redis.incr(key);
  const count = typeof raw === "string" ? parseInt(raw, 10) : raw;

  if (count === 1) await redis.expire(key, windowSec);

  return { ok: count <= limit, count };
}
