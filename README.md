# Aux Reimagined

What is Aux Reimagined?
Aux Reimagined is a full-stack web app that lets friends build a shared party queue. One person creates a room and becomes the host. Friends can join the room, search the Apple Music catalog, add songs to the queue, and vote songs up/down in real time. The app toggles between two modes of voting and shuffling. Only the host controls playback actions like play next/skip/pause.

How is it different?
Aux Reimagined solves two major problems involving any shared queue. Programs like spotify jam and shareplay require all users to have a paid subscription. By coordinating with the hosts device, everyone can queue songs without a subscription as long as the host has a paid subscription. Next, to ensure the best vibes possible, theres a voting system in the queue. Each user can upvote or downvote songs so that the most heavily liked songs in the queue play first, and highly downvoted songs will be pushed to the back of the queue (newly added songs will play before a net downvoted song). Save the wallet and the vibes with Aux Reimagined.
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



