# [Move.it](https://moveit-pomodoro.vercel.app/)

A gamified wellness app that nudges you to take short physical breaks during long focus sessions like work or studying.

## How it works

Every 25 minutes (Pomodoro cycle), a simple physical challenge appears — a quick stretch, neck roll, or eye exercise. Complete it to earn XP and level up. Skip it and lose the round. The loop keeps you moving without breaking your flow.

- **Pomodoro timer** — 25-minute countdown starts a challenge cycle
- **Physical challenges** — body and eye exercises drawn randomly from a challenge pool
- **XP & leveling** — earn XP on success, accumulate it across levels
- **Persistent progress** — all state (level, XP, completed challenges) saved to `localStorage`
- **Avatar** — generated from your name via [DiceBear](https://dicebear.com/), or upload your own photo

## Stack

- [Next.js](https://nextjs.org/) — React framework
- [DiceBear](https://dicebear.com/) — avatar generation
- `localStorage` — client-side persistence, no backend required
- Hosted on [Vercel](https://vercel.com/)

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
