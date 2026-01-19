import { NextResponse } from "next/server";
import { SignJWT, importPKCS8 } from "jose";

export const runtime = "nodejs";

type Cache = { token: string; expMs: number };
const g = globalThis as unknown as { __amCache?: Cache };

function must(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function GET() {
  const TEAM_ID = must("APPLE_MUSIC_TEAM_ID");
  const KEY_ID = must("APPLE_MUSIC_KEY_ID");
  const KEY_B64 = must("APPLE_MUSIC_KEY_B64");
  const ORIGIN = process.env.APPLE_MUSIC_ORIGIN;

  const now = Date.now();
  if (g.__amCache && now < g.__amCache.expMs - 5 * 60 * 1000) {
    return NextResponse.json({ token: g.__amCache.token });
  }

  const privateKeyPem = Buffer.from(KEY_B64, "base64").toString("utf8");

  const iat = Math.floor(now / 1000);
  const exp = iat + 60 * 60 * 24 * 30; // 30 days

  const key = await importPKCS8(privateKeyPem, "ES256");

  const jwt = await new SignJWT(ORIGIN ? { origin: ORIGIN } : {})
    .setProtectedHeader({ alg: "ES256", kid: KEY_ID })
    .setIssuer(TEAM_ID)
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(key);

  g.__amCache = { token: jwt, expMs: exp * 1000 };
  return NextResponse.json({ token: jwt });
}
