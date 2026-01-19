import { NextRequest } from "next/server";
import { getRoom, getHostKey } from "../../../../../lib/rooms";

export const runtime = "nodejs";

export async function GET(req: NextRequest, ctx: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await ctx.params;
  const idRoom = (roomId ?? "").toUpperCase();

  const encoder = new TextEncoder();
  let last = "";

  const cookieVal = req.cookies.get(`aux_host_${idRoom}`)?.value ?? "";
  const hk = await getHostKey(idRoom);
  const isHost = !!cookieVal && !!hk && cookieVal === hk;

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode("retry: 1000\n\n"));

      const tick = async () => {
        const room = await getRoom(idRoom);
        const payload = JSON.stringify(room ? { ...room, isHost } : { error: "Room not found", isHost: false });
        if (payload !== last) {
          last = payload;
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        }
      };

      await tick();
      const interval = setInterval(tick, 1000);

      const close = () => {
        clearInterval(interval);
        try { controller.close(); } catch {}
      };

      req.signal.addEventListener("abort", close);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
