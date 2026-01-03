import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/session'

export default async function EvidencePage() {
  const user = await getSessionUser()
  if (!user) redirect('/login?next=/rubric-evidence')
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Rubric Evidence</h2>

      {/* CCC.1.1 */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">CCC.1.1 — Problem Context</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Why it matters: games often lose progress without auth + DB.</li>
          <li>Where to see it in my project:</li>
          <li>
            
            <span className="font-medium">About Page</span> — clear explanation of the persistence problem.
          </li>
          <li>
            <span className="font-medium">README</span> — project overview and motivation.
          </li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="nav-btn" href="/about">View About</Link>
          <Link className="nav-btn" href="/home">View Overview</Link>
        </div>
      </section>

      {/* CCC.1.2 */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">CCC.1.2 — Solution Architecture</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>What was built: auth + sessions, Prisma + Postgres, API routes.</li>
          <li>Real Blackjack rules with persistent coins + game results.</li>
          <li>Where to see it in my project:</li>
          <li>
            <span className="font-medium">Why Page</span> — solution, features, challenges, plan.
          </li>
          <li>
            <span className="font-medium">Features Page</span> — working tool, core features, DB/auth rationale.
          </li>
          <li>
            <span className="font-medium">Product Page</span> — live Blackjack UI demonstrating persistence.
          </li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="nav-btn" href="/why">View Why</Link>
          <Link className="nav-btn" href="/features">View Features</Link>
          <Link className="nav-btn" href="/product">Play Demo</Link>
        </div>
      </section>

      {/* CCC.1.3 */}
      <section className="card-outline p-4">
        <h3 className="text-lg font-semibold mb-2">CCC.1.3 — Working Evidence</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Play Blackjack: hit, stand, bet, and see coin updates.</li>
          <li>Auth flow: login persists session; earn page respects redirects.</li>
          <li>Where to see it in my project:</li>
          <li>
            <span className="font-medium">Product Page</span> — live demo with top result banner + coin rain.
          </li>
          <li>
            <span className="font-medium">Earn Page</span> — requires login; demonstrates session-based access.
          </li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="nav-btn" href="/product">Play Blackjack</Link>
          <Link className="nav-btn" href="/earn">Earn Coins</Link>
        </div>
      </section>
    </div>
  )
}
