import { NextRequest, NextResponse } from "next/server";
import { setMode } from "../../../../../lib/rooms";

export const runtime = "nodejs";

export async function POST(req: NextRequest, ctx: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await ctx.params;
  const idRoom = (roomId ?? "").toUpperCase();

  const hostKey = req.cookies.get(`aux_host_${idRoom}`)?.value ?? null;

  const body = await req.json();
  const mode = body?.mode;

  if (mode !== "voted" && mode !== "shuffle") {
    return NextResponse.json({ error: "mode must be voted|shuffle" }, { status: 400 });
  }

  try {
    const room = await setMode(idRoom, mode, hostKey);
    return NextResponse.json(room);
  } catch (e: any) {
    const msg = e?.message ?? "Error";
    return NextResponse.json({ error: msg }, { status: msg === "Host only" ? 403 : 404 });
  }
}
