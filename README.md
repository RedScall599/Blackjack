# Blackjack Royale — MVP

- Purpose: teach probability, decision-making, and risk management with a real, persistent Blackjack game.
- Core: users log in, bet coins, play rounds, and see results + coin changes saved to the database.
- Stack: Next.js (App Router), PostgreSQL (Neon), Prisma, JavaScript, session-based auth.

## Quick Links
- Live demo: https://blackjack-livid-two.vercel.app/
- Wireframe (Figma): https://www.figma.com/design/EmMfEQUdIfqOUZH3vB59d5/Black-Jack?node-id=0-1&t=o7r3Ww3hdWQcFjE3-1

## Problem Summary (CCC.1.1)
- Many online games don’t save progress; coins reset, wins don’t count, and engagement drops.
- Without authentication + database:
   - Coins aren’t tied to real users.
   - Game outcomes can’t be audited.
   - Refreshing the page loses history.
- This project fixes that by persisting identity, coins, and round results.

## Features (CCC.1.3)
- Real Blackjack rules:
   - 52-card deck; dealer hits until 17; face cards = 10; Ace = 1 or 11.
   - Dealer hole card: one card face-down until you stand, then reveal and resolve.
   - Auto-stand when player reaches 21.
- Persistent coins + game history:
   - Server-side validation; every round saves `betAmount`, `result (win/lose/push)`, and `coinsChange`.
   - Coins update atomically; you can’t bet more than you have.
- UI/UX polish:
   - Product page with rules sidebar; top result banner; coin icon; celebratory coin rain on wins.
   - Red `nav-btn` buttons; felt-green game panel; neutral `auth-panel` for login.
   - Slower card animation and sequential dealer draws (500ms) for a realistic feel.
- Earn Coins mini-game:
   - Solve math challenges to earn coins when your balance is low.
- Authentication:
   - Email + password, sessions saved in DB, HTTP-only cookie.
   - Redirects respect `next` (e.g., `/earn` → login → back to `/earn`).

### Jack of AI Integration
- Jack of AI Advice endpoint: `/api/ai/advice` accepts game state and returns guidance.
   - If `OPEN_API_KEY` is set, calls OpenAI Chat Completions (`model: gpt-4o-mini`).
   - If not available or request fails, uses a local basic-strategy fallback (stand/hit rationale).
- Intended use: add a “Get Advice” button to fetch concise hit/stand rationales based on player total, dealer upcard, and bet.
- Jack of AI Facts: `/api/ai/facts` returns a fun fact and a technical fact with novelty enforced.

## Tech Stack (CCC.1.2)
- Frontend: Next.js App Router (React 19).
- Backend: Next.js API Routes.
- Database: PostgreSQL (Neon).
- ORM: Prisma 7.
- Auth: email + password, session table, HTTP-only cookies.
- Styling: Tailwind CSS; custom casino theme utilities.

## How to Run
- Requirements: Node.js 18+, a PostgreSQL instance (Neon recommended).
- Environment:
   - `DATABASE_URL` (Postgres connection string).
   - Optional: `OPEN_API_KEY` (OpenAI API key for AI advice).
- Install and set up:
   ```bash
   npm install
   npx prisma migrate dev --name init_blackjack
   npx prisma generate
   npm run dev
   ```
- Seed (optional):
   ```bash
   npm run prisma:seed # or: node prisma/seed.js
   ```

## API Overview (CCC.1.2)
- `/api/auth/login`:
   - Verifies credentials; creates session; sets `session` cookie.
- `/api/auth/logout`:
   - Deletes session; clears cookie.
- `/api/game/play`:
   - Validates session + bet; calculates `coinsChange`; saves `Game` row and returns updated coins.
- Jack of AI `/api/ai/advice`:
   - Validates session; accepts `{ playerTotal, dealerUpcard, betAmount, ... }`.
   - Returns Jack of AI guidance or local fallback.

### API Auth Pattern (REQUIRED)
Use server-side session validation on every protected route:

```javascript
export async function POST(request) {
   const sessionToken = request.cookies.get('session')?.value
   const session = await getSession(sessionToken)
   if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
   }
   // proceed with validated user/session
}
```

Notes:
- Sessions are stored in the database (not JWT).
- The `session` cookie is HTTP-only for security.

## Database Schema (CCC.1.2)
- `User` (identity + balance): id, email, password, role, coins, timestamps.
- `Session` (auth): id, token, userId, expiresAt, createdAt.
- `Game` (audit of rounds): id, userId, betAmount, result (WIN/LOSS/PUSH), coinsChange, createdAt.

## Reflection (CCC.1.1 / CCC.1.2 / CCC.1.3)
- What worked:
   - Prisma + Postgres persistence; reliable session-based auth.
   - Blackjack engine: dealer hits-to-17, Ace 1/11, auto-stand at 21.
   - UI polish: top banner, coin rain, rules sidebar, slowed animations.
- What didn’t go well:
   - CSS theme cohesion (checkers, felt green, contrast) took iteration.
   - Auth cookie visibility for server components needed explicit response cookie setting.
   - Redirect `next` flows required tuning; early CSS parse errors blocked dev.
- What changed and why:
   - Moved to felt-green `card-panel` for casino look; added neutral `auth-panel` for login.
   - Explicit cookie setting in login route; surfaced Evidence/Reflection links post-login.
   - Added dealer hole-card behavior and upcard display `(rank+suit + ?)` before reveal.
   - Implemented `/api/ai/advice` with local fallback.
- What to improve next:
   - Leaderboard + global scoreboard: top users by coins; win-rate stats.
   - Enhanced rules: insurance, splits, double-down; audio effects (shuffle/deal, chip clinks, win/loss).
   - Multiplayer tables via WebSockets; docs pages that render architecture + API.

## Evidence & Pages (CCC.1.3)
- About: explains the persistence problem and why it matters.
- Why: solution architecture, features, challenges, and plan.
- Features: core functionality, persistence, and rationale for DB/auth.
- Product: playable Blackjack UI with persistence and animations.
- Rubric Evidence: direct links to proof pages by CCC.
- Reflection: lessons learned and the roadmap.
 - Wireframe: see Figma link in Quick Links.

---

Happy learning and good luck at the tables! 🎲🃏

## Pages Mapping (CCC.1.3)

- Home: overview + navigation
- About: persistence problem and why it matters
- Why: architecture and solution
- Features: gameplay, betting, coin updates
- Product: Blackjack UI (Hit, Stand, Bet)
- Rubric Evidence: links to proof pages
- Reflection: lessons and next features

## Quick Start

- Prereqs: Node.js 18+, PostgreSQL/Neon
- Env: `DATABASE_URL` configured
- Migrate:
   - `npx prisma migrate dev --name init_blackjack`
   - `npx prisma generate`
- Dev:
   - `npm run dev`
