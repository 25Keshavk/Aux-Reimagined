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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
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
    "vote",
    ()=>vote
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), ".data");
const STORE_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DATA_DIR, "rooms.json");
function ensureDir() {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(DATA_DIR)) __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(DATA_DIR, {
        recursive: true
    });
}
function loadStore() {
    ensureDir();
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(STORE_FILE)) return {};
    try {
        const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(STORE_FILE, "utf8");
        if (!raw.trim()) return {};
        return JSON.parse(raw);
    } catch  {
        return {};
    }
}
function saveStore(store) {
    ensureDir();
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
}
function randCode(len = 6) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for(let i = 0; i < len; i++)s += chars[Math.floor(Math.random() * chars.length)];
    return s;
}
function createRoom() {
    const store = loadStore();
    let id = randCode(6);
    while(store[id])id = randCode(6);
    const room = {
        id,
        createdAt: Date.now(),
        queue: []
    };
    store[id] = room;
    saveStore(store);
    return room;
}
function getRoom(id) {
    const store = loadStore();
    return store[id] ?? null;
}
function addTrack(roomId, t) {
    const store = loadStore();
    const room = store[roomId];
    if (!room) throw new Error("Room not found");
    const exists = room.queue.find((x)=>x.id === t.id) || room.nowPlaying?.id === t.id;
    if (!exists) {
        room.queue.push({
            ...t,
            votes: 0,
            addedAt: Date.now()
        });
    }
    store[roomId] = room;
    saveStore(store);
    return room;
}
function vote(roomId, trackId, delta) {
    const store = loadStore();
    const room = store[roomId];
    if (!room) throw new Error("Room not found");
    const tr = room.queue.find((x)=>x.id === trackId);
    if (!tr) throw new Error("Track not in queue");
    tr.votes += delta;
    store[roomId] = room;
    saveStore(store);
    return room;
}
function nextTrack(roomId) {
    const store = loadStore();
    const room = store[roomId];
    if (!room) throw new Error("Room not found");
    if (room.queue.length === 0) {
        saveStore(store);
        return {
            room,
            next: null
        };
    }
    room.queue.sort((a, b)=>b.votes - a.votes || a.addedAt - b.addedAt);
    const next = room.queue.shift();
    room.nowPlaying = next;
    store[roomId] = room;
    saveStore(store);
    return {
        room,
        next
    };
}
}),
"[project]/app/api/rooms/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
async function POST() {
    const room = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rooms$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRoom"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        roomId: room.id
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6b7249dc._.js.map