# Aux Reimagined

What is Aux Reimagined?
Aux Reimagined is a full-stack web app that lets friends build a shared party queue. One person creates a room and becomes the host. Friends can join the room, search the Apple Music catalog, add songs to the queue, and vote songs up/down in real time. The app toggles between two modes of voting and shuffling. Only the host controls playback actions like play next/skip/pause.

Features included
Frontend
- Component-based UI (Home page + Room page + song/queue cards)
- Mobile-friendly layout
- UI with clear navigation (Home button, Copy invite link)

Backend
- API endpoints for creating rooms, adding songs, voting, removing songs, switching modes, and playing next
- Redis database integration (Upstash) to persist room state (queue, votes, mode, now playing)
- Structured objects/types (`Room`, `Track`) and helper modules for room logic
- Anti-abuse protections:
  - Redis-backed rate limiting on key endpoints
  - Vote toggling per user 

Full-stack
- Apple Music integration:
  - Server-generated developer token (Apple .p8)
  - MusicKit JS authorization
  - Apple Music catalog search
- Realtime updates using Server-Sent Events
- Deployed on Vercel

Time spent
Approx. 7 hours total.

How to run the project
Live deployment: aux-reimagined.vercel.app

Prereqs
- Node.js
- npm
- A Redis database 
- Apple Developer account with MusicKit enabled + a MusicKit key 



