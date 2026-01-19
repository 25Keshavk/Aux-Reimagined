import { NextRequest, NextResponse } from "next/server";
import { getRoom, getHostKey } from "../../../../lib/rooms";

export const runtime = "nodejs";

export async function GET(req: NextRequest, ctx: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await ctx.params;
  const id = (roomId ?? "").toUpperCase();

  const room = await getRoom(id);
  if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });

  const cookieVal = req.cookies.get(`aux_host_${id}`)?.value ?? "";
  const hk = await getHostKey(id);
  const isHost = !!cookieVal && !!hk && cookieVal === hk;

  return NextResponse.json({ ...room, isHost });
}
