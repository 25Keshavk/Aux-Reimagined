import { NextRequest, NextResponse } from "next/server";
import { vote } from "../../../../../lib/rooms";
import { rateLimit } from "../../../../../lib/ratelimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest, ctx: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await ctx.params;
  const idRoom = (roomId ?? "").toUpperCase();

  const clientId = req.headers.get("x-client-id");
  if (!clientId) return NextResponse.json({ error: "Missing x-client-id" }, { status: 400 });

  const rl = await rateLimit(`aux:rl:vote:${idRoom}:${clientId}`, 200, 60);
  if (!rl.ok) return NextResponse.json({ error: "Rate limited" }, { status: 429 });

  const body = await req.json();
  const { trackId, delta } = body ?? {};
  if (!trackId || (delta !== 1 && delta !== -1)) {
    return NextResponse.json({ error: "Need trackId and delta=1|-1" }, { status: 400 });
  }

  try {
    const room = await vote(idRoom, trackId, delta, clientId);
    return NextResponse.json(room);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Error" }, { status: 404 });
  }
}
