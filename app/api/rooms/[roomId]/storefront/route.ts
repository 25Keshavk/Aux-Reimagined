import { NextRequest, NextResponse } from "next/server";
import { setStorefront } from "../../../../../lib/rooms";

export const runtime = "nodejs";

export async function POST(req: NextRequest, ctx: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await ctx.params;
  const idRoom = (roomId ?? "").toUpperCase();

  const hostKey = req.cookies.get(`aux_host_${idRoom}`)?.value ?? null;

  const body = await req.json();
  const storefront = (body?.storefront ?? "").toString().trim().toLowerCase();
  if (!storefront) return NextResponse.json({ error: "Missing storefront" }, { status: 400 });

  try {
    const room = await setStorefront(idRoom, storefront, hostKey);
    return NextResponse.json(room);
  } catch (e: any) {
    const msg = e?.message ?? "Error";
    return NextResponse.json({ error: msg }, { status: msg === "Host only" ? 403 : 404 });
  }
}
