import { NextRequest, NextResponse } from "next/server";
import { removeTrack } from "../../../../../lib/rooms";

export const runtime = "nodejs";

export async function POST(req: NextRequest, ctx: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await ctx.params;
  const idRoom = (roomId ?? "").toUpperCase();

  const hostKey = req.cookies.get(`aux_host_${idRoom}`)?.value ?? null;

  const body = await req.json();
  const trackId = body?.trackId;
  if (!trackId) return NextResponse.json({ error: "Missing trackId" }, { status: 400 });

  try {
    const room = await removeTrack(idRoom, trackId, hostKey);
    return NextResponse.json(room);
  } catch (e: any) {
    const msg = e?.message ?? "Error";
    return NextResponse.json({ error: msg }, { status: msg === "Host only" ? 403 : 404 });
  }
}
