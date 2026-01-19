import { NextResponse } from "next/server";
import { createRoom } from "../../../lib/rooms";

export const runtime = "nodejs";

export async function POST() {
  const { roomId, hostKey } = await createRoom();

  const res = NextResponse.json({ roomId });

  res.cookies.set({
    name: `aux_host_${roomId}`,
    value: hostKey,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
