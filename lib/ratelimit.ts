import { getRedis } from "./redis";

export async function rateLimit(key: string, limit: number, windowSec: number) {
  const redis = await getRedis();
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSec);
  return { ok: count <= limit, count };
}
