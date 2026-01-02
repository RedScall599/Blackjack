Blackjack Royale – Component Architecture (CCC.1.2)

Main Components

- Frontend: Next.js App Router pages and game UI
- Backend: Next.js API Routes for auth and gameplay
- Data: PostgreSQL + Prisma models (`User`, `Session`, `Game`)

Frontend Responsibilities

- Login and register forms
- Product page: Blackjack table (Hit, Stand, Bet)
- Show coin balance and round results
- Navigation to About, Why, Features, Evidence, Reflection

Backend Responsibilities

- `/api/auth/login`, `/register`, `/logout`, `/session`
- `/api/game/play` for persisting game results
- Validate sessions, bets, and result values
- Update `User.coins` and insert `Game`

Data Responsibilities

- `User`: identity and coin balance
- `Session`: session token, expiry, user link
- `Game`: betAmount, result, coinsChange, createdAt

Communication Paths

- Frontend ↔ API: JSON requests for auth and gameplay
- API ↔ DB: Prisma reads/writes for sessions, users, games

External Services

- Database: Neon PostgreSQL (SSL required)
- Password hashing: bcrypt

MVP Build Approach

- Implement session-based auth with HTTP-only cookies
- Build Blackjack UI with local round logic
- Persist results via `/api/game/play` after each round
* Minimal scoring (rules-based)

**Scale (after proving retention lift)**

* Warehouse + deeper analytics
* More integrations + self-serve mapping UI
* ML-based scoring and experimentation framework
* Admin/compliance hardening (SSO, audit exports)