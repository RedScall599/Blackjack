import Link from 'next/link'

export default function WhyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-3">
          Why <span className="text-gold">Blackjack Royale</span>?
        </h1>
        <p className="text-lg text-white/80">Solution Architecture (CCC.1.2)</p>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2 flex items-center gap-2">
          <span>&#9827;</span> Why I Chose Blackjack
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-black/30 p-4 rounded border border-white/10 space-y-2">
            <p className="text-gold font-semibold">Personal Engagement</p>
            <p className="text-white/80">I enjoy the game: personal interest keeps the project engaging.</p>
            <p className="text-white/80">Simple rules, real risk: busts and losses reduce coins to show consequences.</p>
          </div>
          <div className="bg-black/30 p-4 rounded border border-white/10 space-y-2">
            <p className="text-gold font-semibold">Learning Value</p>
            <p className="text-white/80">Builds probability intuition and pattern recognition.</p>
            <p className="text-white/80">Decision-making practice: hit/stand choices with immediate feedback.</p>
          </div>
          <div className="bg-black/30 p-4 rounded border border-white/10 space-y-2">
            <p className="text-gold font-semibold">Real Consequences</p>
            <p className="text-white/80">Rewards success: wins increase coins to reinforce good decisions.</p>
            <p className="text-white/80">Work-to-earn: math challenges on Earn give the feeling of earning coins.</p>
          </div>
          <div className="bg-black/30 p-4 rounded border border-white/10 space-y-2">
            <p className="text-gold font-semibold">Educational Focus</p>
            <p className="text-white/80">Teaching risk management and expected value in a friendly format.</p>
            <p className="text-white/80">Helps users think through probability and dealer logic.</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <Link className="btn-primary" href="/product">Play Blackjack</Link>
          <Link className="btn-secondary" href="/earn">Earn Coins</Link>
          <Link className="btn-secondary" href="/features">See Features</Link>
        </div>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2 flex items-center gap-2">
          <span>&#9829;</span> My Solution Architecture
        </h2>
        <div className="space-y-3">
          <p className="text-white/90 text-lg">Build a real Blackjack game with persistent coins and round history.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded">
              <p className="text-emerald-300 font-semibold mb-2">&#9824; Tech Stack</p>
              <p className="text-white/80 text-sm">Next.js + Prisma + Neon (PostgreSQL) with session-based auth for reliability.</p>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded">
              <p className="text-blue-300 font-semibold mb-2">&#9830; Persistence</p>
              <p className="text-white/80 text-sm">Make progress matter: coins and results survive refreshes and logins.</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded">
              <p className="text-purple-300 font-semibold mb-2">&#9829; Education</p>
              <p className="text-white/80 text-sm">Teach probability, dealer logic, and decision-making through authentic rules.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card-panel space-y-3">
          <h2 className="text-xl font-bold text-gold border-b border-gold/30 pb-2">Why Database?</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-gold mt-1">&#8226;</span>
              <p className="text-white/80">Persist user identity, coins, and game results</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gold mt-1">&#8226;</span>
              <p className="text-white/80">Progress survives refreshes and logins</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gold mt-1">&#8226;</span>
              <p className="text-white/80">Game history tracked per user</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gold mt-1">&#8226;</span>
              <p className="text-white/80">Enables accountability and learning from past games</p>
            </div>
          </div>
        </div>

        <div className="card-panel space-y-3">
          <h2 className="text-xl font-bold text-gold border-b border-gold/30 pb-2">Why Authentication?</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-gold mt-1">&#8226;</span>
              <p className="text-white/80">Sessions validate requests and protect coin changes</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gold mt-1">&#8226;</span>
              <p className="text-white/80">HTTP-only cookies prevent client-side tampering</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gold mt-1">&#8226;</span>
              <p className="text-white/80">Identifies players securely across sessions</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gold mt-1">&#8226;</span>
              <p className="text-white/80">Prevents fake balances and unauthorized access</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-panel space-y-3">
        <h2 className="text-xl font-bold text-gold border-b border-gold/30 pb-2">Challenges & Constraints</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="bg-red-900/20 border border-red-500/30 p-3 rounded">
            <p className="text-red-300 font-semibold text-sm mb-1">State Management</p>
            <p className="text-white/70 text-xs">Managing dealer vs player hands, bet flow, and UI updates</p>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 rounded">
            <p className="text-yellow-300 font-semibold text-sm mb-1">Security</p>
            <p className="text-white/70 text-xs">Validating bets server-side, preventing coin manipulation</p>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded">
            <p className="text-blue-300 font-semibold text-sm mb-1">UX Polish</p>
            <p className="text-white/70 text-xs">Card animations, win effects, responsive design</p>
          </div>
        </div>
      </div>

      <div className="card-panel text-center space-y-3">
        <p className="text-white/70">This supports CCC.1.2: planned solution and constraints.</p>
        <p className="text-white/60 text-sm">Visible on Why, Features, and Product pages.</p>
      </div>
    </div>
  )
}
