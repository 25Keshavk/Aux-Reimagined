"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [join, setJoin] = useState("");

  const joinCode = useMemo(() => join.trim().toUpperCase(), [join]);

  async function create() {
    const res = await fetch("/api/rooms", { method: "POST" });
    if (!res.ok) {
      const txt = await res.text();
      alert(`Create failed (${res.status}).\n${txt}`);
      return;
    }
    const { roomId } = await res.json();
    router.push(`/room/${roomId}`);
  }

  function goJoin() {
    if (!joinCode) return;
    router.push(`/room/${joinCode}`);
  }

  return (
    <div className="wrap">
      <div className="hero">
        <div className="badge">Aux Reimagined</div>
        <h1 className="title">Build a party queue together.</h1>
        <p className="subtitle">
          Create a room, share the link, and let friends add and vote on songs. The host controls playback.
        </p>

        <div className="card">
          <div className="cardTitle">Start</div>

          <div className="row">
            <button className="btn" onClick={create}>Create room</button>
          </div>

          <div className="divider" />

          <div className="cardTitle">Join</div>
          <div className="joinRow">
            <input
              value={join}
              onChange={(e) => setJoin(e.target.value)}
              placeholder="Enter room code (e.g. Q7K2P9)"
              onKeyDown={(e) => { if (e.key === "Enter") goJoin(); }}
            />
            <button className="btn secondary" onClick={goJoin} disabled={!joinCode}>
              Join
            </button>
          </div>

          <div className="hint">
            Tip: once you create a room, hit “Copy invite” and send the link.
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrap {
          min-height: calc(100vh - 70px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 0 60px;
        }
        .hero {
          width: min(860px, 100%);
          padding: 0 18px;
          text-align: center;
        }
        .badge {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(0,0,0,0.55);
          font-weight: 700;
          font-size: 12px;
          opacity: 0.9;
        }
        .title {
          margin: 14px 0 8px;
          font-size: 44px;
          line-height: 1.05;
          letter-spacing: -0.4px;
        }
        .subtitle {
          margin: 0 auto 18px;
          max-width: 720px;
          opacity: 0.75;
          font-size: 16px;
        }
        .card {
          margin: 18px auto 0;
          width: min(720px, 100%);
          text-align: left;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 16px;
          padding: 16px;
        }
        .cardTitle {
          font-weight: 800;
          margin: 2px 0 10px;
          opacity: 0.92;
        }
        .row {
          display: flex;
          justify-content: center;
        }
        .joinRow {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          align-items: center;
        }
        .divider {
          height: 1px;
          margin: 14px 0;
          background: rgba(255,255,255,0.10);
        }
        input {
          background: rgba(0,0,0,0.55);
          border: 1px solid rgba(255,255,255,0.16);
          color: #e6edf3;
          padding: 11px 12px;
          border-radius: 12px;
          outline: none;
        }
        input::placeholder {
          color: rgba(230,237,243,0.5);
        }
        .btn {
          background: #1f6feb;
          color: white;
          border: 0;
          padding: 11px 14px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 800;
          white-space: nowrap;
        }
        .btn.secondary {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.14);
          font-weight: 750;
        }
        .btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .hint {
          margin-top: 12px;
          opacity: 0.65;
          font-size: 13px;
          text-align: center;
        }
        @media (max-width: 640px) {
          .title { font-size: 34px; }
          .card { padding: 14px; }
        }
      `}</style>
    </div>
  );
}
