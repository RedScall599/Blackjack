import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/session'

export default async function EvidencePage() {
  const user = await getSessionUser()
  if (!user) redirect('/login?next=/rubric-evidence')
  if (user.role !== 'ADMIN') redirect('/home')
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Rubric Evidence</h2>

      {/* CCC.1.1 — Bullet-only */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">CCC.1.1 — Problem Context</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Games lose progress without authentication and a database.</li>
          <li>Why database is needed: stores users, coins, and game results so progress matters.</li>
          <li>Why auth is needed: identifies players and secures sessions; prevents fake coin changes.</li>
          <li>This supports CCC.1.1: clear problem identification and implications.</li>
          <li>Where to see it in my project: About Page and Home overview.</li>
          <li>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link className="nav-btn" href="/about">About</Link>
              <Link className="nav-btn" href="/home">Home</Link>
            </div>
          </li>
        </ul>
      </section>

      {/* CCC.1.2 — Bullet-only */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">CCC.1.2 — Solution Architecture</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Solution: Next.js + API routes, Prisma + Postgres, session auth, real Blackjack rules.</li>
          <li>Why database is needed: coin updates and game history are persisted per user.</li>
          <li>Why auth is needed: server-side sessions validate access before coin changes.</li>
          <li>This supports CCC.1.2: planned, secure architecture with constraints explained.</li>
          <li>Wireframe (Figma): <Link className="underline" href="https://www.figma.com/design/EmMfEQUdIfqOUZH3vB59d5/Black-Jack?node-id=0-1&t=o7r3Ww3hdWQcFjE3-1">Design Link</Link></li>
          <li>Where to see it in my project: Why, Features, and Product pages.</li>
          <li>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link className="nav-btn" href="/why">Why</Link>
              <Link className="nav-btn" href="/features">Features</Link>
              <Link className="nav-btn" href="/product">Product</Link>
            </div>
          </li>
        </ul>
      </section>

      {/* CCC.1.3 — Bullet-only */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">CCC.1.3 — Working Evidence</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Play: hit, stand, bet; auto-stand at 21; dealer hole card reveals on stand.</li>
          <li>Persist: coins and results saved after each round via /api/game/play.</li>
          <li>Auth: login keeps sessions; Earn page redirects to login when needed.</li>
          <li>This supports CCC.1.3: users can verify persistence in a live demo.</li>
          <li>Where to see it in my project: Product and Earn pages.</li>
          <li>
            <div className="flex flex-wrap gap-2 mt-2">
              <Link className="nav-btn" href="/product">Play Blackjack</Link>
              <Link className="nav-btn" href="/earn">Earn Coins</Link>
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}
