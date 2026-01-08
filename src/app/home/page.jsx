import { getSessionUser } from '@/lib/session'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
          Welcome to <span className="text-gold">Blackjack Royale</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
          A real Blackjack game with persistent progress, secure authentication, and fair dealer rules.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* What It Is */}
        <div className="card-panel space-y-3">
          <h2 className="text-2xl font-bold text-gold flex items-center gap-2">
            <span>&#9827;</span> What It Is
          </h2>
          <p className="text-white/90">A web-based Blackjack game with real persistence and database-backed coin tracking.</p>
          <p className="text-white/80">Core problem: most games don't save progress; coins reset; wins aren't tracked.</p>
          <p className="text-white/80">How it helps: teaches probability, decision-making, dealer logic, and risk management.</p>
          <p className="text-white/90 font-semibold">Outcome: coins and results persist across refreshes and sessions for accountability.</p>
        </div>

        {/* Why It Works */}
        <div className="card-panel space-y-3">
          <h2 className="text-2xl font-bold text-gold flex items-center gap-2">
            <span>&#9829;</span> Why It Works
          </h2>
          <p className="text-white/90">Why a database is needed: stores users, sessions, coins, and game results so progress never disappears.</p>
          <p className="text-white/90">Why authentication is needed: identifies you, secures sessions with HTTP-only cookies, and prevents fake coin changes.</p>
          <p className="text-white/80">Fair rules enforced: 52-card deck; dealer hits to 17; Ace = 1 or 11; push keeps coins.</p>
        </div>
      </div>

      {/* Who Benefits */}
      <div className="card-panel mb-8 space-y-3">
        <h2 className="text-2xl font-bold text-gold flex items-center gap-2">
          <span>&#9824;</span> Who Benefits
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-white/10">
            <p className="text-gold font-semibold mb-2">Players</p>
            <p className="text-white/80">Practice decisions with fair, transparent rules and real-time feedback.</p>
          </div>
          <div className="bg-black/30 p-4 rounded-lg border border-white/10">
            <p className="text-gold font-semibold mb-2">Students</p>
            <p className="text-white/80">Learn odds, dealer logic, and probability in an engaging context.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="card-panel text-center space-y-4">
        <p className="text-white/70 text-sm">This supports CCC.1.1 (problem), CCC.1.2 (solution), and CCC.1.3 (implementation) - visible on About, Why, Features, and Product pages.</p>
        <Link href="/product" className="btn-primary inline-block">
          Play Blackjack Now
        </Link>
        <p className="text-white/60 text-sm">Your coins persist after every round</p>
      </div>
    </div>
  )
}
