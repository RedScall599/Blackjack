Blackjack Royale – Business Context (CCC.1.1)

- Problem: online games often reset progress
- Impact: coins/wins lost on refresh or leaving
- Need: user accounts and persistence for fairness
- Solution: real Blackjack with database + sessions

Users & Stakeholders

- Players: learn probability, make decisions, manage risk
- Students: see fair logic and transparent outcomes
- Developers: practice auth, DB, API, UI integration

Success Criteria

- Persistent coins across sessions (DB-backed)
- Accurate win/loss/push tracking (Game records)
- Secure auth with HTTP-only cookies
- Clear UI for Hit, Stand, Bet and results

Risks & Mitigation

- Security: hash passwords, store sessions server-side
- Data integrity: validate bets and results before writing
- UX clarity: show totals, rules, and coin changes

CCC Evidence Mapping

- CCC.1.1: About page explains persistence problem
- CCC.1.2: Auth + DB + API implement solution
- CCC.1.3: Product page demonstrates live game
