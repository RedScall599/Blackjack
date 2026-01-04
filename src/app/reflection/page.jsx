import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/session'

export default async function ReflectionPage() {
  const user = await getSessionUser()
  if (!user) redirect('/login?next=/reflection')
  if (user.role !== 'ADMIN') redirect('/home')
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Reflection</h2>

      {/* Bullet-only sections per competencies */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What Went Well</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Prisma + Postgres: persistence for users, coins, and game history.</li>
          <li>Session auth: HTTP-only cookies kept users logged in reliably.</li>
          <li>Blackjack engine: dealer hits to 17; Ace as 1/11; auto-stand at 21.</li>
          <li>UI: top result banner; coin rain; responsive layout and rules sidebar.</li>
          <li>This supports CCC.1.3: the working tool behaves correctly and is verifiable.</li>
        </ul>
      </section>

      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What Didn’t Go Well</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>CSS theme cohesion: matching casino checkers, felt green, and text contrast was hard.</li>
          <li>Auth visibility: ensuring the session cookie was seen by server components.</li>
          <li>Redirects: `next` parameter flow for Earn → Login → back to target.</li>
          <li>CSS errors: parse issues (box-shadow inset order, unclosed @layer) blocked builds.</li>
          <li>This supports CCC.1.1: documents challenges tied to the core problem.</li>
        </ul>
      </section>

      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What Changed and Why</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Theme iteration: shifted to felt-green `card-panel` for authentic casino look.</li>
          <li>Neutral login: added `auth-panel` for readability on sign-in/register.</li>
          <li>Auth cookie: set cookie on login response for header/user visibility.</li>
          <li>Evidence links: surfaced Evidence + Reflection for post-login clarity.</li>
          <li>AI help: used AI to scaffold the deck-of-cards utility/API quickly.</li>
          <li>This supports CCC.1.2: explains architectural and UX decisions with rationale.</li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="nav-btn" href="/product">See Product</Link>
          <Link className="nav-btn" href="/why">See Why</Link>
          <Link className="nav-btn" href="/features">See Features</Link>
        </div>
      </section>

      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What I’d Build Next</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Leaderboard + stats: win rates, streaks, average bet sizes.</li>
          <li>Global scoreboard: show top users by coin balance so everyone can see the leaders.</li>
          <li>Enhanced rules: insurance, splits, double-down, edge-case UX.</li>
          <li>Multiplayer: real-time tables via WebSockets.</li>
          <li>Audio + effects: shuffle/deal sounds, chip clinks, win/loss stingers, subtle animations.</li>
          <li>Docs pages: in-app architecture + API routes for easy review.</li>
          <li>This supports CCC.1.3: clear roadmap to extend the working tool.</li>
        </ul>
      </section>
    </div>
  )
}
