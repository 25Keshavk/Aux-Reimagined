"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [join, setJoin] = useState("");

  async function create() {
    const res = await fetch("/api/rooms", { method: "POST" });
    const { roomId } = await res.json();
    router.push(`/room/${roomId}`);
  }

  function joinRoom() {
    const code = join.trim().toUpperCase();
    if (code) router.push(`/room/${code}`);
  }

  return (
    <div className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>Start a room</h1>
      <div className="muted">Create a room, share the code, and build a queue together.</div>

      <div className="spacer" />

      <div className="row">
        <button onClick={create}>Create room</button>
      </div>

      <div className="spacer" />

      <div className="row" style={{ justifyContent: "center" }}>
        <div style={{ width: 360, maxWidth: "100%" }}>
          <input
            value={join}
            onChange={(e) => setJoin(e.target.value)}
            placeholder="Enter room code (e.g. Q7K2P9)"
          />
        </div>
        <button className="secondary" onClick={joinRoom}>Join</button>
      </div>
    </div>
  );
}
