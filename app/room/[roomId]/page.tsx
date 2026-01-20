"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

type Track = {
  id: string;
  name: string;
  artist: string;
  artworkUrl?: string;
  votes: number;
  addedAt: number;
};

type RoomState = {
  id: string;
  createdAt: number;
  mode: "voted" | "shuffle";
  queue: Track[];
  nowPlaying?: Track;
  isHost: boolean;
};

declare global {
  interface Window {
    MusicKit?: any;
  }
}

function getOrMakeClientId() {
  const k = "aux_client_id";
  const existing = localStorage.getItem(k);
  if (existing) return existing;

  const id =
    (globalThis.crypto && "randomUUID" in globalThis.crypto)
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(16).slice(2)}`;

  localStorage.setItem(k, id);
  return id;
}

export default function RoomPage(props: { params: Promise<{ roomId: string }> }) {
  const router = useRouter();
  const { roomId: raw } = use(props.params);
  const roomId = useMemo(() => (raw ?? "").toUpperCase(), [raw]);

  const [room, setRoom] = useState<RoomState | null>(null);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [mkReady, setMkReady] = useState(false);
  const [clientId, setClientId] = useState("");

  // playback UI state (host only)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setClientId(getOrMakeClientId());
  }, []);

  useEffect(() => {
    if (!roomId) return;
    const es = new EventSource(`/api/rooms/${roomId}/events`);
    es.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        if (!data?.error) setRoom(data);
      } catch {}
    };
    return () => es.close();
  }, [roomId]);

  function syncPlaybackState() {
    try {
      const mk = window.MusicKit;
      if (!mk) return;
      const music = mk.getInstance();
      const ps = music?.player?.playbackState;
      const playing = ps === mk.PlaybackStates?.playing;
      setIsPlaying(!!playing);
    } catch {
      // ignore
    }
  }

  // Poll playback state every second so Pause/Resume label stays correct
  useEffect(() => {
    if (!mkReady) return;
    syncPlaybackState();
    const t = setInterval(syncPlaybackState, 1000);
    return () => clearInterval(t);
  }, [mkReady]);

  async function configureMusicKit() {
    const res = await fetch("/api/apple-music/developer-token", { cache: "no-store" });
    const { token: developerToken } = await res.json();
    await window.MusicKit.configure({
      developerToken,
      app: { name: "Aux Reimagined", build: "1.0.0" },
    });
    setMkReady(true);
    try { setIsAuthed(!!window.MusicKit.getInstance().isAuthorized); } catch {}
  }

  async function connectAppleMusic() {
    const music = window.MusicKit.getInstance();
    await music.authorize();
    syncPlaybackState();
  }

  async function togglePause() {
    try {
      const mk = window.MusicKit;
      if (!mk) return;
      const music = mk.getInstance();
      const ps = music.player.playbackState;
      const playing = ps === mk.PlaybackStates?.playing;

      if (playing) await music.pause();
      else await music.play();

      syncPlaybackState();
    } catch (e) {
      console.error(e);
      alert("Pause/Resume failed. Try Connect Apple Music first.");
    }
  }

  async function search() {
    const term = q.trim();
    if (!term) return;
    const res = await fetch(
      `/api/apple-music/search?q=${encodeURIComponent(term)}&storefront=us`,
      { cache: "no-store" }
    );
    const json = await res.json();
    setResults(json?.results?.songs?.data ?? []);
  }

  async function addSong(item: any) {
    if (!clientId) return;

    const attr = item.attributes;
    const artwork = attr?.artwork?.url
      ? attr.artwork.url.replace("{w}", "192").replace("{h}", "192")
      : undefined;

    const res = await fetch(`/api/rooms/${roomId}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": clientId,
      },
      body: JSON.stringify({
        id: item.id,
        name: attr?.name ?? "Unknown",
        artist: attr?.artistName ?? "Unknown",
        artworkUrl: artwork,
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      alert(`Add failed (${res.status}).\n${txt}`);
    }
  }

  async function vote(trackId: string, delta: 1 | -1) {
    if (!clientId) return;

    const res = await fetch(`/api/rooms/${roomId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": clientId,
      },
      body: JSON.stringify({ trackId, delta }),
    });

    if (!res.ok) {
      const txt = await res.text();
      alert(`Vote failed (${res.status}).\n${txt}`);
    }
  }

  async function playNextOrSkip() {
    const res = await fetch(`/api/rooms/${roomId}/next`, { method: "POST" });
    if (res.status === 403) {
      alert("Only the room creator can skip/play next.");
      return;
    }
    const json = await res.json();
    const next = json?.next as Track | null;

    if (!next) {
      alert("Queue is empty.");
      return;
    }

    try {
      const music = window.MusicKit.getInstance();
      await music.setQueue({ song: next.id });
      await music.play();
      syncPlaybackState();
    } catch (e) {
      console.error(e);
      alert("Playback failed. Click 'Connect Apple Music' first.");
    }
  }

  async function toggleMode() {
    const mode = room?.mode === "shuffle" ? "voted" : "shuffle";
    const res = await fetch(`/api/rooms/${roomId}/mode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode }),
    });

    if (res.status === 403) {
      alert("Only the room creator can change mode.");
      return;
    }
    if (!res.ok) {
      const txt = await res.text();
      alert(`Mode change failed (${res.status}).\n${txt}`);
    }
  }

  async function remove(trackId: string) {
    const res = await fetch(`/api/rooms/${roomId}/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trackId }),
    });

    if (res.status === 403) {
      alert("Only the room creator can remove songs.");
      return;
    }
    if (!res.ok) {
      const txt = await res.text();
      alert(`Remove failed (${res.status}).\n${txt}`);
    }
  }

  async function copyInvite() {
    const url = `${window.location.origin}/room/${roomId}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Invite link copied.");
    } catch {
      alert(url);
    }
  }

  const isHost = !!room?.isHost;

  return (
    <div>
      <Script
        src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"
        strategy="afterInteractive"
        onLoad={() => configureMusicKit()}
      />

      <div className="topCard">
        <div className="topRow">
          <div className="pill">Room</div>
          <div className="roomCode">{roomId}</div>
          <button className="btn homeBtn" onClick={() => router.push("/")}>Home</button>
          <button className="btn copyBtn" onClick={copyInvite}>Copy invite</button>
        </div>

        <div className="controls">
          <button className="btn" disabled={!mkReady || isAuthed} onClick={connectAppleMusic}>
            {isAuthed ? "Apple Music Connected" : "Connect Apple Music"}
          </button>

          <button className="btn" disabled={!isHost} onClick={playNextOrSkip}>
            {isHost ? "Play next / Skip" : "Host only"}
          </button>

          <button className="btn controlBtn" disabled={!isHost} onClick={togglePause}>
            {isPlaying ? "Pause" : "Resume"}
          </button>

          <button className="btn controlBtn" disabled={!isHost} onClick={toggleMode}>
            Mode: {room?.mode ?? "voted"}
          </button>
        </div>

        {!isHost ? (
          <div className="hint">Only the creator can control playback and moderation.</div>
        ) : null}
      </div>

      <div className="twoCol">
        <section className="panel">
          <h3 className="panelTitle">Add songs</h3>

          <div className="searchBar">
            <input
              className="searchInput"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search songs..."
              onKeyDown={(e) => { if (e.key === "Enter") search(); }}
            />
            <button className="btn" onClick={search}>Search</button>
          </div>

          <div className="results">
            {results.length === 0 ? (
              <div className="mutedCenter">Search for a song to see results.</div>
            ) : (
              results.map((item) => (
                <div key={item.id} className="resultRow">
                  {item.attributes?.artwork?.url ? (
                    <img
                      className="art"
                      src={item.attributes.artwork.url.replace("{w}", "160").replace("{h}", "160")}
                      width={56}
                      height={56}
                      alt=""
                    />
                  ) : (
                    <div className="artPlaceholder" />
                  )}

                  <div className="songMeta">
                    <div className="songName">{item.attributes?.name}</div>
                    <div className="songArtist">{item.attributes?.artistName}</div>
                  </div>

                  <button className="btn addSolid" onClick={() => addSong(item)}>Add</button>
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="panel">
          <h3 className="panelTitle">Now playing</h3>

          {room?.nowPlaying ? (
            <div className="queueRow">
              {room.nowPlaying.artworkUrl ? (
                <img className="art" src={room.nowPlaying.artworkUrl} width={56} height={56} alt="" />
              ) : (
                <div className="artPlaceholder" />
              )}
              <div className="songMeta">
                <div className="songName">{room.nowPlaying.name}</div>
                <div className="songArtist">{room.nowPlaying.artist}</div>
              </div>
              <div className="pill">{room.nowPlaying.votes}</div>
              <div />
            </div>
          ) : (
            <div className="muted">Nothing yet.</div>
          )}

          <div style={{ height: 12 }} />

          <div className="queueHeader">
            <h3 className="panelTitle" style={{ margin: 0 }}>Queue</h3>
            <div className="mutedSmall">{room?.queue?.length ?? 0} songs</div>
          </div>

          <div className="queue">
            {(room?.queue ?? []).length === 0 ? (
              <div className="muted">Queue is empty.</div>
            ) : (
              (room?.queue ?? []).map((t) => (
                <div key={t.id} className="queueRow">
                  {t.artworkUrl ? (
                    <img className="art" src={t.artworkUrl} width={56} height={56} alt="" />
                  ) : (
                    <div className="artPlaceholder" />
                  )}

                  <div className="songMeta">
                    <div className="songName">{t.name}</div>
                    <div className="songArtist">{t.artist}</div>
                  </div>

                  <div className="voteBlock">
                    <div className="pill">{t.votes}</div>
                    <div className="voteBtns">
                      <button className="btn tiny voteUp" onClick={() => vote(t.id, 1)}>+1</button>
                      <button className="btn tiny voteDown" onClick={() => vote(t.id, -1)}>-1</button>
                    </div>
                  </div>

                  {isHost ? (
                    <button className="btn tiny danger" onClick={() => remove(t.id)}>Remove</button>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      <style jsx>{`
        .topCard {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 14px;
          margin-bottom: 14px;
        }
        .topRow {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .roomCode {
          font-weight: 800;
          letter-spacing: 0.6px;
          font-size: 18px;
        }
        .controls {
          margin-top: 12px;
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .hint {
          margin-top: 10px;
          text-align: center;
          opacity: 0.7;
          font-size: 13px;
        }

        .twoCol {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 420px;
          gap: 14px;
          align-items: start;
        }

        .panel {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 14px;
        }
        .panelTitle {
          margin: 0 0 12px 0;
          font-size: 14px;
          opacity: 0.9;
          letter-spacing: 0.2px;
        }

        .searchBar {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .searchInput { width: min(560px, 100%); }

        .results, .queue { display: grid; gap: 10px; }

        .resultRow {
          display: grid;
          grid-template-columns: 56px 1fr 92px;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
        }

        .queueRow {
          display: grid;
          grid-template-columns: 56px 1fr auto auto;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
        }

        .art { border-radius: 12px; }
        .artPlaceholder {
          width: 56px; height: 56px; border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .songMeta { min-width: 0; }
        .songName { font-weight: 750; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .songArtist { opacity: 0.7; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .queueHeader { display: flex; align-items: baseline; justify-content: space-between; }
        .muted { opacity: 0.7; }
        .mutedSmall { opacity: 0.6; font-size: 12px; }
        .mutedCenter { opacity: 0.7; text-align: center; padding: 18px 0; }

        .pill {
          padding: 4px 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          font-size: 12px;
          opacity: 0.9;
          font-weight: 700;
          justify-self: end;
        }

        .voteBlock { display: flex; align-items: center; gap: 8px; justify-self: end; }
        .voteBtns { display: flex; gap: 6px; }

        .btn {
          background: #1f6feb;
          color: white;
          border: 0;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 800;
          white-space: nowrap;
        }
        .btn.secondary { background: rgba(255,255,255,0.10); font-weight: 700; }
        .btn.danger { background: rgba(248, 81, 73, 0.85); }
        .btn.tiny { padding: 8px 10px; border-radius: 10px; font-weight: 750; }
        .btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .copyBtn { background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.14); }
        .copyBtn:hover { background: rgba(0,0,0,0.62); }



        .homeBtn { background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.14); }
        .homeBtn:hover { background: rgba(255,255,255,0.16); }
        .controlBtn {
          background: rgba(0,0,0,0.55);
          border: 1px solid rgba(255,255,255,0.18);
        }
        .controlBtn:hover {
          background: rgba(0,0,0,0.72);
          border-color: rgba(255,255,255,0.26);
        }
        .addSolid { width: 92px; justify-self: end; }

        .voteUp { background: rgba(31, 111, 235, 0.28); border: 1px solid rgba(31, 111, 235, 0.55); }
        .voteDown { background: rgba(248, 81, 73, 0.22); border: 1px solid rgba(248, 81, 73, 0.50); }
        .voteUp:hover { background: rgba(31, 111, 235, 0.38); }
        .voteDown:hover { background: rgba(248, 81, 73, 0.32); }

        @media (max-width: 920px) {
          .twoCol { grid-template-columns: 1fr 420px; overflow-x: auto; }
        }
      `}</style>
    </div>
  );
}
