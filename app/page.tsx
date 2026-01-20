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
        <h1 className="title">Make a shared queue.</h1>
        <p className="subtitle">Create a room, share the link, and add songs together.</p>

        <div className="card">
          <div className="section">
            <div className="label">Start a room</div>
            <div className="row">
              <button className="btn primary" onClick={create}>Create room</button>
            </div>
          </div>

          <div className="divider" />

          <div className="section">
            <div className="label">Join a room</div>

            <div className="joinRow">
              <input
                className="codeInput"
                value={join}
                onChange={(e) => setJoin(e.target.value)}
                placeholder="Room code (e.g. Q7K2P9)"
                onKeyDown={(e) => { if (e.key === "Enter") goJoin(); }}
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
              />
              <button className="btn secondary" onClick={goJoin} disabled={!joinCode}>
                Join
              </button>
            </div>

            <div className="hint">Tip: after creating a room, use “Copy invite” to share it.</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrap {
          min-height: calc(100vh - 70px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 0 60px;
        }
        .hero {
          width: min(860px, 100%);
          padding: 0 18px;
          text-align: center;
        }
        .title {
          margin: 6px 0 8px;
          font-size: 44px;
          line-height: 1.05;
          letter-spacing: -0.4px;
        }
        .subtitle {
          margin: 0 auto 18px;
          max-width: 680px;
          opacity: 0.72;
          font-size: 16px;
        }

        .card {
          margin: 18px auto 0;
          width: min(720px, 100%);
          text-align: left;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          padding: 16px;
        }

        .section { padding: 2px 0; }
        .label {
          font-weight: 800;
          margin: 2px 0 10px;
          opacity: 0.92;
        }

        .row { display: flex; justify-content: center; }

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

        /* Transparent outlined input */
        .codeInput {
          width: 100%;
          background: transparent;
          border: 2px solid rgba(255,255,255,0.38);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.35);
          color: #e6edf3;
          padding: 12px 14px;
          border-radius: 14px;
          outline: none;
          transition: border-color 120ms ease, box-shadow 120ms ease;
        }
        .codeInput:hover {
          border-color: rgba(255,255,255,0.52);
        }
        .codeInput::placeholder {
          color: rgba(230,237,243,0.48);
        }
        .codeInput:focus {
          border-color: rgba(31, 111, 235, 0.95);
          box-shadow: 0 0 0 5px rgba(31, 111, 235, 0.22), inset 0 0 0 1px rgba(0,0,0,0.35);
        }

        .btn {
          border: 0;
          padding: 12px 14px;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 800;
          white-space: nowrap;
        }
        .btn.primary {
          background: #1f6feb;
          color: white;
        }
        .btn.secondary {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.14);
          color: #e6edf3;
          font-weight: 750;
        }
        .btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .hint {
          margin-top: 10px;
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
