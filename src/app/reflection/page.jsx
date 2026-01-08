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

      {/* Paragraph-only sections per competencies */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What Went Well</h3>
        <div className="space-y-1">
          <p>Prisma + Postgres: persistence for users, coins, and game history.</p>
          <p>Session auth: HTTP-only cookies kept users logged in reliably.</p>
          <p>Blackjack engine: dealer hits to 17; Ace as 1/11; auto-stand at 21.</p>
          <p>UI: top result banner; coin rain; responsive layout and rules sidebar.</p>
          <p>This supports CCC.1.3: the working tool behaves correctly and is verifiable.</p>
        </div>
      </section>

      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What Didn’t Go Well</h3>
        <div className="space-y-1">
          <p>CSS theme cohesion: matching casino checkers, felt green, and text contrast was hard.</p>
          <p>Auth visibility: ensuring the session cookie was seen by server components.</p>
          <p>Redirects: next parameter flow for Earn → Login → back to target.</p>
          <p>CSS errors: parse issues (box-shadow inset order, unclosed @layer) blocked builds.</p>
          <p>This supports CCC.1.1: documents challenges tied to the core problem.</p>
        </div>
      </section>

      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What Changed and Why</h3>
        <div className="space-y-1">
          <p>Theme iteration: shifted to felt-green card-panel for authentic casino look.</p>
          <p>Neutral login: added auth-panel for readability on sign-in/register.</p>
          <p>Auth cookie: set cookie on login response for header/user visibility.</p>
          <p>Evidence links: surfaced Evidence + Reflection for post-login clarity.</p>
          <p>Jack of AI help: used Jack of AI to scaffold the deck-of-cards utility/API quickly.</p>
          <p>This supports CCC.1.2: explains architectural and UX decisions with rationale.</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="nav-btn" href="/product">See Product</Link>
          <Link className="nav-btn" href="/why">See Why</Link>
          <Link className="nav-btn" href="/features">See Features</Link>
        </div>
      </section>

      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What I’d Build Next</h3>
        <div className="space-y-1">
          <p>Leaderboard + stats: win rates, streaks, average bet sizes.</p>
          <p>Global scoreboard: show top users by coin balance so everyone can see the leaders.</p>
          <p>Enhanced rules: insurance, splits, double-down, edge-case UX.</p>
          <p>Multiplayer: real-time tables via WebSockets.</p>
          <p>Audio + effects: shuffle/deal sounds, chip clinks, win/loss stingers, subtle animations.</p>
          <p>Docs pages: in-app architecture + API routes for easy review.</p>
          <p>This supports CCC.1.3: clear roadmap to extend the working tool.</p>
        </div>
      </section>
    </div>
  )
}
