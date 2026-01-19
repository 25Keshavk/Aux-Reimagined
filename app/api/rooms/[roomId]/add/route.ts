import { NextRequest, NextResponse } from "next/server";
import { addTrack } from "../../../../../lib/rooms";
import { rateLimit } from "../../../../../lib/ratelimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest, ctx: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await ctx.params;
  const idRoom = (roomId ?? "").toUpperCase();

  const clientId = req.headers.get("x-client-id");
  if (!clientId) return NextResponse.json({ error: "Missing x-client-id" }, { status: 400 });

  const rl = await rateLimit(`aux:rl:add:${idRoom}:${clientId}`, 50, 60);
  if (!rl.ok) return NextResponse.json({ error: "Rate limited" }, { status: 429 });

  const body = await req.json();
  const { id, name, artist, artworkUrl } = body ?? {};
  if (!id || !name || !artist) {
    return NextResponse.json({ error: "Missing id/name/artist" }, { status: 400 });
  }

  try {
    const room = await addTrack(idRoom, { id, name, artist, artworkUrl });
    return NextResponse.json(room);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Error" }, { status: 404 });
  }
}
