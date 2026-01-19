"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    MusicKit?: any;
  }
}

export function AppleMusicAuthButton() {
  const [ready, setReady] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  async function configureMusicKit() {
    const res = await fetch("/api/apple-music/developer-token", { cache: "no-store" });
    const { token: developerToken } = await res.json();

    await window.MusicKit.configure({
      developerToken,
      app: { name: "Aux Reimagined", build: "1.0.0" },
    });

    setReady(true);
  }

  async function authorize() {
    const music = window.MusicKit.getInstance();
    const tok = await music.authorize();
    setUserToken(tok);
    localStorage.setItem("apple_music_user_token", tok);
  }

  useEffect(() => {
    const existing = localStorage.getItem("apple_music_user_token");
    if (existing) setUserToken(existing);
  }, []);

  return (
    <>
      <Script
        src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"
        strategy="afterInteractive"
        onLoad={() => configureMusicKit()}
      />
      <button disabled={!ready} onClick={authorize}>
        {userToken ? "Re-authorize Apple Music" : "Connect Apple Music"}
      </button>
    </>
  );
}
