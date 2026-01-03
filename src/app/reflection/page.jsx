import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/session'

export default async function ReflectionPage() {
  const user = await getSessionUser()
  if (!user) redirect('/login?next=/reflection')
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Reflection</h2>

      {/* What went well */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What Went Well</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Prisma + Postgres: reliable persistence for users, coins, and games.</li>
          <li>Session-based auth: cookie-backed login kept users signed in across refreshes.</li>
          <li>Blackjack engine: dealer hits to 17, Ace as 1/11, auto-stand at 21.</li>
          <li>UX polish: top result banner, coin rain on wins, responsive layout.</li>
        </ul>
      </section>

      {/* What didn’t go well */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What Didn’t Go Well</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>CSS theme cohesion: matching casino checkers, felt green, and contrast was tricky.</li>
          <li>Auth setup friction: ensuring the session cookie was visible to server components.</li>
          <li>Navigation: redirect flows (e.g., Earn → Login → back) needed careful `next` handling.</li>
          <li>Initial CSS errors: parse issues (box-shadow inset, unclosed blocks) blocked dev server.</li>
        </ul>
      </section>

      {/* What changed and why */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What Changed and Why</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Theme iteration: moved from ivory panel to felt-green card panel for casino feel.</li>
          <li>Neutral auth panel: added non-green sign-in container to improve readability.</li>
          <li>Auth cookie handling: explicitly set cookie on login response to fix header state.</li>
          <li>Evidence navigation: exposed Evidence/Reflection in header after login for clarity.</li>
          <li>AI-assisted API: used AI to scaffold a deck-of-cards API/util to speed up game setup.</li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="nav-btn" href="/product">See Product</Link>
          <Link className="nav-btn" href="/why">See Why</Link>
          <Link className="nav-btn" href="/features">See Features</Link>
        </div>
      </section>

      {/* What’s next */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">What I’d Build Next</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Leaderboard + stats: track win rates, streaks, average bet sizes.</li>
          <li>Enhanced dealer logic: insurance, splits, double-down, and UX for edge cases.</li>
          <li>Multiplayer: tables with real-time play using WebSockets.</li>
          <li>Audio + effects: card shuffle/deal sounds, chip clinks, win/loss stingers, subtle UI animations.</li>
          <li>Docs pages: in-app views of architecture diagrams and API routes.</li>
        </ul>
      </section>
    </div>
  )
}
