import { NextRequest, NextResponse } from "next/server";
import { nextTrack } from "../../../../../lib/rooms";

export const runtime = "nodejs";

export async function POST(req: NextRequest, ctx: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await ctx.params;
  const idRoom = (roomId ?? "").toUpperCase();

  const hostKey = req.cookies.get(`aux_host_${idRoom}`)?.value ?? null;

  try {
    const { room, next } = await nextTrack(idRoom, hostKey);
    return NextResponse.json({ room, next });
  } catch (e: any) {
    const msg = e?.message ?? "Error";
    return NextResponse.json({ error: msg }, { status: msg === "Host only" ? 403 : 404 });
  }
}
