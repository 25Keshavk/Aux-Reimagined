import crypto from "crypto";
import { getRedis } from "./redis";

export type Track = {
  id: string;
  name: string;
  artist: string;
  artworkUrl?: string;
  votes: number;
  addedAt: number;
};

export type Room = {
  id: string;
  createdAt: number;
  mode: "voted" | "shuffle";
  queue: Track[];
  nowPlaying?: Track;
};

function kMeta(id: string) { return `aux:room:${id}:meta`; }
function kQueue(id: string) { return `aux:room:${id}:queue`; }
function kTracks(id: string) { return `aux:room:${id}:tracks`; }
function kAdded(id: string) { return `aux:room:${id}:addedAt`; }
function kUp(id: string, tid: string) { return `aux:room:${id}:up:${tid}`; }
function kDown(id: string, tid: string) { return `aux:room:${id}:down:${tid}`; }

function randCode(len = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function genHostKey() {
  return crypto.randomBytes(16).toString("hex");
}

export async function createRoom(): Promise<{ roomId: string; hostKey: string }> {
  const redis = await getRedis();
  let id = randCode(6);
  while (await redis.exists(kMeta(id))) id = randCode(6);

  const hostKey = genHostKey();
  const createdAt = Date.now();

  await redis.hSet(kMeta(id), {
    createdAt: String(createdAt),
    hostKey,
    mode: "voted",
    nowPlayingJson: "",
  });

  return { roomId: id, hostKey };
}

export async function getHostKey(roomId: string): Promise<string | null> {
  const redis = await getRedis();
  return (await redis.hGet(kMeta(roomId), "hostKey")) ?? null;
}

export async function requireHost(roomId: string, hostKey: string | null) {
  const real = await getHostKey(roomId);
  if (!real || !hostKey || real !== hostKey) throw new Error("Host only");
}

export async function getRoom(roomId: string): Promise<Room | null> {
  const redis = await getRedis();
  const meta = await redis.hGetAll(kMeta(roomId));
  if (!meta || Object.keys(meta).length === 0) return null;

  const createdAt = Number(meta.createdAt || 0);
  const mode = (meta.mode === "shuffle" ? "shuffle" : "voted") as "voted" | "shuffle";

  let nowPlaying: Track | undefined = undefined;
  const np = meta.nowPlayingJson || "";
  if (np) {
    try { nowPlaying = JSON.parse(np) as Track; } catch { nowPlaying = undefined; }
  }

  const trackIds = await redis.sMembers(kQueue(roomId));
  if (trackIds.length === 0) return { id: roomId, createdAt, mode, queue: [], nowPlaying };

  const pipe = redis.multi();
  for (const tid of trackIds) {
    pipe.hGet(kTracks(roomId), tid);
    pipe.hGet(kAdded(roomId), tid);
    pipe.sCard(kUp(roomId, tid));
    pipe.sCard(kDown(roomId, tid));
  }

  const res = (await pipe.exec()) as any[];
  const queue: Track[] = [];

  for (let i = 0; i < trackIds.length; i++) {
    const tid = trackIds[i];
    const json = res[i * 4 + 0] as string | null;
    const addedAtStr = res[i * 4 + 1] as string | null;
    const up = Number(res[i * 4 + 2] ?? 0);
    const down = Number(res[i * 4 + 3] ?? 0);

    if (!json) continue;

    try {
      const base = JSON.parse(json) as Omit<Track, "votes" | "addedAt">;
      queue.push({
        ...base,
        votes: up - down,
        addedAt: Number(addedAtStr ?? Date.now()),
      });
    } catch {
      continue;
    }
  }

  queue.sort((a, b) => (b.votes - a.votes) || (a.addedAt - b.addedAt));
  return { id: roomId, createdAt, mode, queue, nowPlaying };
}

export async function addTrack(roomId: string, t: { id: string; name: string; artist: string; artworkUrl?: string }): Promise<Room> {
  const redis = await getRedis();
  if (!(await redis.exists(kMeta(roomId)))) throw new Error("Room not found");

  const isNew = await redis.sAdd(kQueue(roomId), t.id);
  if (isNew) {
    await redis.hSet(kTracks(roomId), t.id, JSON.stringify({ id: t.id, name: t.name, artist: t.artist, artworkUrl: t.artworkUrl }));
    await redis.hSet(kAdded(roomId), t.id, String(Date.now()));
  }

  const room = await getRoom(roomId);
  if (!room) throw new Error("Room not found");
  return room;
}

export async function removeTrack(roomId: string, trackId: string, hostKey: string | null): Promise<Room> {
  await requireHost(roomId, hostKey);
  const redis = await getRedis();

  await redis.sRem(kQueue(roomId), trackId);
  await redis.hDel(kTracks(roomId), trackId);
  await redis.hDel(kAdded(roomId), trackId);
  await redis.del(kUp(roomId, trackId));
  await redis.del(kDown(roomId, trackId));

  const room = await getRoom(roomId);
  if (!room) throw new Error("Room not found");
  return room;
}

export async function vote(roomId: string, trackId: string, delta: 1 | -1, clientId: string): Promise<Room> {
  const redis = await getRedis();
  if (!(await redis.exists(kMeta(roomId)))) throw new Error("Room not found");
  if (!(await redis.sIsMember(kQueue(roomId), trackId))) throw new Error("Track not in queue");

  if (delta === 1) {
    const already = await redis.sIsMember(kUp(roomId, trackId), clientId);
    if (already) await redis.sRem(kUp(roomId, trackId), clientId);
    else {
      await redis.sAdd(kUp(roomId, trackId), clientId);
      await redis.sRem(kDown(roomId, trackId), clientId);
    }
  } else {
    const already = await redis.sIsMember(kDown(roomId, trackId), clientId);
    if (already) await redis.sRem(kDown(roomId, trackId), clientId);
    else {
      await redis.sAdd(kDown(roomId, trackId), clientId);
      await redis.sRem(kUp(roomId, trackId), clientId);
    }
  }

  const room = await getRoom(roomId);
  if (!room) throw new Error("Room not found");
  return room;
}

export async function setMode(roomId: string, mode: "voted" | "shuffle", hostKey: string | null): Promise<Room> {
  await requireHost(roomId, hostKey);
  const redis = await getRedis();
  await redis.hSet(kMeta(roomId), { mode });

  const room = await getRoom(roomId);
  if (!room) throw new Error("Room not found");
  return room;
}

export async function nextTrack(roomId: string, hostKey: string | null): Promise<{ room: Room; next: Track | null }> {
  await requireHost(roomId, hostKey);
  const redis = await getRedis();

  const room = await getRoom(roomId);
  if (!room) throw new Error("Room not found");
  if (room.queue.length === 0) return { room, next: null };

  let next: Track | null = null;

  if (room.mode === "shuffle") {
    const tid = await redis.sRandMember(kQueue(roomId));
    if (!tid) return { room, next: null };

    const json = await redis.hGet(kTracks(roomId), tid);
    const addedAtStr = await redis.hGet(kAdded(roomId), tid);
    const up = await redis.sCard(kUp(roomId, tid));
    const down = await redis.sCard(kDown(roomId, tid));

    if (json) {
      try {
        const base = JSON.parse(json) as Omit<Track, "votes" | "addedAt">;
        next = { ...base, votes: up - down, addedAt: Number(addedAtStr ?? Date.now()) };
      } catch {
        next = null;
      }
    }

    await redis.sRem(kQueue(roomId), tid);
  } else {
    next = room.queue[0];
    await redis.sRem(kQueue(roomId), next.id);
  }

  if (!next) {
    const updated = await getRoom(roomId);
    return { room: updated ?? room, next: null };
  }

  await redis.hSet(kMeta(roomId), { nowPlayingJson: JSON.stringify(next) });

  const updated = await getRoom(roomId);
  if (!updated) throw new Error("Room not found");
  return { room: updated, next };
}
