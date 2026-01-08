import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/session'

export default async function EvidencePage() {
  const user = await getSessionUser()
  if (!user) redirect('/login?next=/rubric-evidence')
  if (user.role !== 'ADMIN') redirect('/home')
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-3">
          Rubric <span className="text-gold">Evidence</span>
        </h1>
        <p className="text-lg text-white/80">CCC Competency Mapping</p>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2 flex items-center gap-2">
          <span>&#9827;</span> CCC.1.1 - Problem Context
        </h2>
        <div className="space-y-3">
          <p className="text-white/90">Games lose progress without authentication and a database.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded">
              <p className="text-emerald-300 font-semibold mb-1">Why Database?</p>
              <p className="text-white/80 text-sm">Stores users, coins, and game results so progress matters.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 p-3 rounded">
              <p className="text-red-300 font-semibold mb-1">Why Auth?</p>
              <p className="text-white/80 text-sm">Identifies players and secures sessions; prevents fake coin changes.</p>
            </div>
          </div>
          <p className="text-white/70 text-sm">This supports CCC.1.1: clear problem identification and implications.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn-secondary" href="/about">View About Page</Link>
          <Link className="btn-secondary" href="/home">View Home Page</Link>
        </div>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2 flex items-center gap-2">
          <span>&#9829;</span> CCC.1.2 - Solution Architecture
        </h2>
        <div className="space-y-3">
          <p className="text-white/90">Solution: Next.js + API routes, Prisma + Postgres, session auth, real Blackjack rules.</p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-black/30 p-3 rounded border border-white/10">
              <p className="text-gold font-semibold mb-1">Database</p>
              <p className="text-white/70 text-sm">Coin updates and game history persisted per user</p>
            </div>
            <div className="bg-black/30 p-3 rounded border border-white/10">
              <p className="text-gold font-semibold mb-1">Authentication</p>
              <p className="text-white/70 text-sm">Server-side sessions validate access before coin changes</p>
            </div>
            <div className="bg-black/30 p-3 rounded border border-white/10">
              <p className="text-gold font-semibold mb-1">Architecture</p>
              <p className="text-white/70 text-sm">Planned, secure with constraints explained</p>
            </div>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded">
            <p className="text-blue-300 font-semibold mb-1">Wireframe (Figma)</p>
            <Link className="text-white/80 text-sm underline hover:text-gold" href="https://www.figma.com/design/EmMfEQUdIfqOUZH3vB59d5/Black-Jack?node-id=0-1&t=o7r3Ww3hdWQcFjE3-1">View Design Link</Link>
          </div>
          <p className="text-white/70 text-sm">This supports CCC.1.2: planned, secure architecture with constraints.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn-secondary" href="/why">View Why Page</Link>
          <Link className="btn-secondary" href="/features">View Features Page</Link>
          <Link className="btn-secondary" href="/product">View Product Page</Link>
        </div>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2 flex items-center gap-2">
          <span>&#9830;</span> CCC.1.3 - Working Evidence
        </h2>
        <div className="space-y-3">
          <p className="text-white/90">Live demo with persistent coins, real Blackjack rules, and AI-powered feedback.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded">
              <p className="text-purple-300 font-semibold mb-1">Play Blackjack</p>
              <p className="text-white/80 text-sm">Full working game with Hit, Stand, Bet, and persistent results.</p>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 rounded">
              <p className="text-yellow-300 font-semibold mb-1">Earn Coins</p>
              <p className="text-white/80 text-sm">Math challenges that update your balance in real-time.</p>
            </div>
          </div>
          <p className="text-white/70 text-sm">This supports CCC.1.3: working tool with verifiable features.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn-primary" href="/product">Play Now</Link>
          <Link className="btn-secondary" href="/earn">Earn Coins</Link>
        </div>
      </div>

      <div className="card-panel text-center space-y-2">
        <p className="text-white/70 text-sm">All competencies are documented with evidence across multiple pages.</p>
        <p className="text-white/60 text-xs">Admin-only page for rubric evaluation.</p>
      </div>
    </div>
  )
}
