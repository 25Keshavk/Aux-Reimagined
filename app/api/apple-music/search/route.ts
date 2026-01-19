import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  const storefront = req.nextUrl.searchParams.get("storefront") ?? "us";
  if (!q.trim()) {
    return NextResponse.json({ results: { songs: { data: [] } } });
  }

  const origin = process.env.APPLE_MUSIC_ORIGIN; // e.g. http://localhost:3000

  const dtRes = await fetch(new URL("/api/apple-music/developer-token", req.url), { cache: "no-store" });
  const { token: developerToken } = await dtRes.json();

  const url = `https://api.music.apple.com/v1/catalog/${storefront}/search?term=${encodeURIComponent(
    q
  )}&types=songs&limit=10`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${developerToken}`,
  };
  if (origin) headers["Origin"] = origin;

  const apiRes = await fetch(url, { headers });
  const body = await apiRes.text();

  return new NextResponse(body, {
    status: apiRes.status,
    headers: { "Content-Type": "application/json" },
  });
}
