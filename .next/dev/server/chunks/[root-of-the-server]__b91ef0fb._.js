module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/node:net [external] (node:net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:net", () => require("node:net"));

module.exports = mod;
}),
"[externals]/node:tls [external] (node:tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:tls", () => require("node:tls"));

module.exports = mod;
}),
"[externals]/node:timers/promises [external] (node:timers/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:timers/promises", () => require("node:timers/promises"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns/promises [external] (dns/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns/promises", () => require("dns/promises"));

module.exports = mod;
}),
"[externals]/node:assert [external] (node:assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:assert", () => require("node:assert"));

module.exports = mod;
}),
"[externals]/node:diagnostics_channel [external] (node:diagnostics_channel, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:diagnostics_channel", () => require("node:diagnostics_channel"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[project]/lib/redis.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRedis",
    ()=>getRedis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redis$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redis/dist/index.js [app-route] (ecmascript)");
;
async function getRedis() {
    const url = process.env.REDIS_URL;
    if (!url) throw new Error("Missing env var: REDIS_URL");
    const g = globalThis;
    if (!g.__redisClient) {
        g.__redisClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redis$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])({
            url
        });
        g.__redisClient.on("error", (err)=>console.error("Redis error:", err));
    }
    if (!g.__redisClient.isOpen) {
        await g.__redisClient.connect();
    }
    return g.__redisClient;
}
}),
"[project]/lib/rooms.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addTrack",
    ()=>addTrack,
    "createRoom",
    ()=>createRoom,
    "getRoom",
    ()=>getRoom,
    "nextTrack",
    ()=>nextTrack,
    "requireHost",
    ()=>requireHost,
    "setMode",
    ()=>setMode,
    "vote",
    ()=>vote
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redis.ts [app-route] (ecmascript)");
;
;
function kMeta(id) {
    return `aux:room:${id}:meta`;
}
function kQueue(id) {
    return `aux:room:${id}:queue`;
}
function kTracks(id) {
    return `aux:room:${id}:tracks`;
}
function kAdded(id) {
    return `aux:room:${id}:addedAt`;
}
function kUp(id, tid) {
    return `aux:room:${id}:up:${tid}`;
}
function kDown(id, tid) {
    return `aux:room:${id}:down:${tid}`;
}
function randCode(len = 6) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for(let i = 0; i < len; i++)s += chars[Math.floor(Math.random() * chars.length)];
    return s;
}
function genHostKey() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(16).toString("hex");
}
async function createRoom() {
    const redis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRedis"])();
    let id = randCode(6);
    while(await redis.exists(kMeta(id)))id = randCode(6);
    const hostKey = genHostKey();
    const createdAt = Date.now();
    await redis.hSet(kMeta(id), {
        createdAt: String(createdAt),
        hostKey,
        mode: "voted",
        nowPlayingJson: ""
    });
    return {
        roomId: id,
        hostKey
    };
}
async function requireHost(roomId, hostKey) {
    const redis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRedis"])();
    const real = await redis.hGet(kMeta(roomId), "hostKey");
    if (!real || !hostKey || real !== hostKey) throw new Error("Host only");
}
async function getRoom(roomId) {
    const redis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRedis"])();
    const meta = await redis.hGetAll(kMeta(roomId));
    if (!meta || Object.keys(meta).length === 0) return null;
    const createdAt = Number(meta.createdAt || 0);
    const mode = meta.mode === "shuffle" ? "shuffle" : "voted";
    // nowPlayingJson: be robust
    let nowPlaying = undefined;
    const np = meta.nowPlayingJson || "";
    if (np) {
        try {
            nowPlaying = JSON.parse(np);
        } catch  {
            nowPlaying = undefined;
        }
    }
    const trackIds = await redis.sMembers(kQueue(roomId));
    if (trackIds.length === 0) return {
        id: roomId,
        createdAt,
        mode,
        queue: [],
        nowPlaying
    };
    const pipe = redis.multi();
    for (const tid of trackIds){
        pipe.hGet(kTracks(roomId), tid);
        pipe.hGet(kAdded(roomId), tid);
        pipe.sCard(kUp(roomId, tid));
        pipe.sCard(kDown(roomId, tid));
    }
    // IMPORTANT: node-redis v4 returns raw values, not [err, val] tuples
    const res = await pipe.exec();
    const queue = [];
    for(let i = 0; i < trackIds.length; i++){
        const tid = trackIds[i];
        const json = res[i * 4 + 0];
        const addedAtStr = res[i * 4 + 1];
        const up = Number(res[i * 4 + 2] ?? 0);
        const down = Number(res[i * 4 + 3] ?? 0);
        if (!json) continue;
        try {
            const base = JSON.parse(json);
            queue.push({
                ...base,
                votes: up - down,
                addedAt: Number(addedAtStr ?? Date.now())
            });
        } catch  {
            continue;
        }
    }
    queue.sort((a, b)=>b.votes - a.votes || a.addedAt - b.addedAt);
    return {
        id: roomId,
        createdAt,
        mode,
        queue,
        nowPlaying
    };
}
async function addTrack(roomId, t) {
    const redis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRedis"])();
    if (!await redis.exists(kMeta(roomId))) throw new Error("Room not found");
    const isNew = await redis.sAdd(kQueue(roomId), t.id);
    if (isNew) {
        await redis.hSet(kTracks(roomId), t.id, JSON.stringify({
            id: t.id,
            name: t.name,
            artist: t.artist,
            artworkUrl: t.artworkUrl
        }));
        await redis.hSet(kAdded(roomId), t.id, String(Date.now()));
    }
    const room = await getRoom(roomId);
    if (!room) throw new Error("Room not found");
    return room;
}
async function vote(roomId, trackId, delta, clientId) {
    const redis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRedis"])();
    if (!await redis.exists(kMeta(roomId))) throw new Error("Room not found");
    if (!await redis.sIsMember(kQueue(roomId), trackId)) throw new Error("Track not in queue");
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
async function setMode(roomId, mode, hostKey) {
    await requireHost(roomId, hostKey);
    const redis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRedis"])();
    await redis.hSet(kMeta(roomId), {
        mode
    });
    const room = await getRoom(roomId);
    if (!room) throw new Error("Room not found");
    return room;
}
async function nextTrack(roomId, hostKey) {
    await requireHost(roomId, hostKey);
    const redis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRedis"])();
    const room = await getRoom(roomId);
    if (!room) throw new Error("Room not found");
    if (room.queue.length === 0) return {
        room,
        next: null
    };
    let next = null;
    if (room.mode === "shuffle") {
        const tid = await redis.sRandMember(kQueue(roomId));
        if (!tid) return {
            room,
            next: null
        };
        const json = await redis.hGet(kTracks(roomId), tid);
        const addedAtStr = await redis.hGet(kAdded(roomId), tid);
        const up = await redis.sCard(kUp(roomId, tid));
        const down = await redis.sCard(kDown(roomId, tid));
        if (json) {
            try {
                const base = JSON.parse(json);
                next = {
                    ...base,
                    votes: up - down,
                    addedAt: Number(addedAtStr ?? Date.now())
                };
            } catch  {
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
        return {
            room: updated ?? room,
            next: null
        };
    }
    await redis.hSet(kMeta(roomId), {
        nowPlayingJson: JSON.stringify(next)
    });
    const updated = await getRoom(roomId);
    if (!updated) throw new Error("Room not found");
    return {
        room: updated,
        next
    };
}
}),
"[project]/app/api/rooms/[roomId]/add/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rooms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rooms.ts [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
async function POST(req, ctx) {
    const { roomId } = await ctx.params;
    const idRoom = (roomId ?? "").toUpperCase();
    const body = await req.json();
    const { id, name, artist, artworkUrl } = body ?? {};
    if (!id || !name || !artist) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Missing id/name/artist"
        }, {
            status: 400
        });
    }
    try {
        const room = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rooms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addTrack"])(idRoom, {
            id,
            name,
            artist,
            artworkUrl
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(room);
    } catch (e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e?.message ?? "Error"
        }, {
            status: 404
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b91ef0fb._.js.map