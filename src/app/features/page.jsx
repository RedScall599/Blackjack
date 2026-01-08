import Link from 'next/link'

export default function FeaturesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-3">
          Game <span className="text-gold">Features</span>
        </h1>
        <p className="text-lg text-white/80">Working Implementation (CCC.1.3)</p>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2 flex items-center gap-2">
          <span>&#9827;</span> Live Blackjack Table
        </h2>
        <p className="text-white/90 text-lg">The actual working tool users interact with.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-black/30 p-3 rounded border border-emerald-500/30">
            <p className="text-emerald-300 font-semibold mb-1">Hit & Stand</p>
            <p className="text-white/70 text-sm">Draw cards or let dealer play</p>
          </div>
          <div className="bg-black/30 p-3 rounded border border-gold/30">
            <p className="text-gold font-semibold mb-1">Betting</p>
            <p className="text-white/70 text-sm">Place bets with your coins</p>
          </div>
          <div className="bg-black/30 p-3 rounded border border-red-500/30">
            <p className="text-red-300 font-semibold mb-1">Reset</p>
            <p className="text-white/70 text-sm">Start fresh anytime</p>
          </div>
          <div className="bg-black/30 p-3 rounded border border-blue-500/30">
            <p className="text-blue-300 font-semibold mb-1">Auto-Resolve</p>
            <p className="text-white/70 text-sm">Automatic at 21</p>
          </div>
        </div>
        <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded">
          <p className="text-white/90">Live on <Link className="text-gold hover:text-gold-light underline" href="/product">Play Page</Link></p>
          <p className="text-white/70 text-sm">Win/lose banner with celebratory coin rain effects</p>
        </div>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2 flex items-center gap-2">
          <span>&#9829;</span> Core Game Features
        </h2>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded">
              <p className="text-emerald-300 font-semibold mb-2">Real Casino Rules</p>
              <ul className="space-y-1 text-white/80 text-sm">
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>52-card standard deck</li>
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>Dealer hits until 17</li>
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>Face cards = 10, Ace = 1 or 11</li>
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>Push keeps your coins</li>
              </ul>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded">
              <p className="text-blue-300 font-semibold mb-2">Smart Validation</p>
              <ul className="space-y-1 text-white/80 text-sm">
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>Bet must be &#8804; your coins</li>
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>Server verifies every bet</li>
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>Updates database atomically</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded">
              <p className="text-purple-300 font-semibold mb-2">Persistence</p>
              <ul className="space-y-1 text-white/80 text-sm">
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>Coins persist after every round</li>
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>Game results saved to database</li>
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>History tracked per user</li>
              </ul>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 rounded">
              <p className="text-yellow-300 font-semibold mb-2">Earn Coins</p>
              <ul className="space-y-1 text-white/80 text-sm">
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>Solve math challenges</li>
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>Easy, medium, hard difficulty</li>
                <li className="flex items-start gap-2"><span className="text-gold">&#8226;</span>Safe, secure coin increases</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2 flex items-center gap-2">
          <span>&#9830;</span> Jack of AI Integration
        </h2>
        <p className="text-white/90">AI-powered features that enhance learning and engagement.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-black/30 p-4 rounded border border-white/10">
            <p className="text-gold font-semibold mb-2">Game Feedback</p>
            <p className="text-white/80 text-sm">Post-round analysis with dealer bust probabilities</p>
          </div>
          <div className="bg-black/30 p-4 rounded border border-white/10">
            <p className="text-gold font-semibold mb-2">Blackjack Facts</p>
            <p className="text-white/80 text-sm">Fun and technical facts about the game</p>
          </div>
          <div className="bg-black/30 p-4 rounded border border-white/10">
            <p className="text-gold font-semibold mb-2">Strategy Tips</p>
            <p className="text-white/80 text-sm">Context-aware advice during gameplay</p>
          </div>
        </div>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2">Why Choose Blackjack Royale?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-gold text-2xl">&#10003;</span>
            <div>
              <p className="text-white font-semibold">Real Persistence</p>
              <p className="text-white/70 text-sm">Coins and history don't disappear; audited in the database.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-gold text-2xl">&#10003;</span>
            <div>
              <p className="text-white font-semibold">Fair & Transparent</p>
              <p className="text-white/70 text-sm">Dealer logic and Ace handling are consistent and documented.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-gold text-2xl">&#10003;</span>
            <div>
              <p className="text-white font-semibold">Secure Sessions</p>
              <p className="text-white/70 text-sm">HTTP-only cookies and hashed passwords prevent fake balances.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-gold text-2xl">&#10003;</span>
            <div>
              <p className="text-white font-semibold">Learning First</p>
              <p className="text-white/70 text-sm">Built-in explanations for odds, dealer behavior, and decision-making.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-panel text-center space-y-3">
        <p className="text-white/70">This supports CCC.1.3: users can verify features work in product.</p>
        <Link href="/product" className="btn-primary inline-block">Try It Now</Link>
      </div>
    </div>
  )
}
