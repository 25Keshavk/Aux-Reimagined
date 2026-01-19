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
const g = globalThis;
function store() {
    if (!g.__rooms) g.__rooms = new Map();
    return g.__rooms;
}
function randCode(len = 6) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for(let i = 0; i < len; i++)s += chars[Math.floor(Math.random() * chars.length)];
    return s;
}
function createRoom() {
    const s = store();
    let id = randCode(6);
    while(s.has(id))id = randCode(6);
    const room = {
        id,
        createdAt: Date.now(),
        queue: []
    };
    s.set(id, room);
    return room;
}
function getRoom(id) {
    return store().get(id) ?? null;
}
function addTrack(roomId, t) {
    const room = getRoom(roomId);
    if (!room) throw new Error("Room not found");
    const exists = room.queue.find((x)=>x.id === t.id) || room.nowPlaying?.id === t.id;
    if (!exists) {
        room.queue.push({
            ...t,
            votes: 0,
            addedAt: Date.now()
        });
    }
    return room;
}
function vote(roomId, trackId, delta) {
    const room = getRoom(roomId);
    if (!room) throw new Error("Room not found");
    const tr = room.queue.find((x)=>x.id === trackId);
    if (!tr) throw new Error("Track not in queue");
    tr.votes += delta;
    return room;
}
function nextTrack(roomId) {
    const room = getRoom(roomId);
    if (!room) throw new Error("Room not found");
    if (room.queue.length === 0) return {
        room,
        next: null
    };
    // sort: highest votes first; tie-breaker: earlier added first
    room.queue.sort((a, b)=>b.votes - a.votes || a.addedAt - b.addedAt);
    const next = room.queue.shift();
    room.nowPlaying = next;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__36e8c7e6._.js.map