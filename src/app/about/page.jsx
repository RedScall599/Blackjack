export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-3">
          About <span className="text-gold">Blackjack Royale</span>
        </h1>
        <p className="text-lg text-white/80">Understanding the Problem (CCC.1.1)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card-panel space-y-3">
          <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2">&#9824; Who I Am</h2>
          <p className="text-white/90">Builder focused on fair, persistent game design.</p>
          <p className="text-white/80">Goal: teach probability, decision-making, and risk management through Blackjack.</p>
          <p className="text-white/80">Motivation: most games reset progress; I want learning that sticks.</p>
        </div>

        <div className="card-panel space-y-3">
          <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2">&#9829; The Problem</h2>
          <p className="text-white/90">Problem: games without persistence lose progress and accountability.</p>
          <p className="text-white/80">Example: refreshing wipes coins and win history; there's no tracking.</p>
          <p className="text-white/80">Impact: players can't improve decisions; systems feel fake without saved state.</p>
        </div>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2">&#9827; The Solution</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-white/90 font-semibold">Authentication</p>
            <p className="text-white/80">Email + password authentication</p>
            <p className="text-white/80">Sessions via HTTP-only cookies</p>
            <p className="text-white/80">Server-side validation for security</p>
          </div>
          <div className="space-y-2">
            <p className="text-white/90 font-semibold">Database</p>
            <p className="text-white/80">PostgreSQL + Prisma ORM</p>
            <p className="text-white/80">Persist users, sessions, coins, and game results</p>
            <p className="text-white/80">Progress matters and survives refreshes</p>
          </div>
        </div>
      </div>

      <div className="card-panel mb-6 space-y-3">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2">&#9830; Game Rules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-black/30 p-3 rounded border border-white/10">
            <p className="text-gold font-semibold mb-1">Deck</p>
            <p className="text-white/80 text-sm">52-card standard deck</p>
          </div>
          <div className="bg-black/30 p-3 rounded border border-white/10">
            <p className="text-gold font-semibold mb-1">Dealer</p>
            <p className="text-white/80 text-sm">Hits until 17</p>
          </div>
          <div className="bg-black/30 p-3 rounded border border-white/10">
            <p className="text-gold font-semibold mb-1">Cards</p>
            <p className="text-white/80 text-sm">Ace = 1 or 11, Face = 10</p>
          </div>
          <div className="bg-black/30 p-3 rounded border border-white/10">
            <p className="text-gold font-semibold mb-1">Push</p>
            <p className="text-white/80 text-sm">Tie keeps your coins</p>
          </div>
        </div>
        <p className="text-white/90">Gameplay: bet, deal, hit/stand; outcomes update coins and save to the Game table.</p>
        <div className="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded">
          <p className="text-emerald-300 font-semibold">Why database is needed:</p>
          <p className="text-white/80">Saves coins and game history so progress matters.</p>
        </div>
        <div className="bg-red-900/20 border border-red-500/30 p-3 rounded">
          <p className="text-red-300 font-semibold">Why authentication is needed:</p>
          <p className="text-white/80">Identifies players and secures coin updates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card-panel space-y-3">
          <h2 className="text-xl font-bold text-gold border-b border-gold/30 pb-2">Earn Coins Feature</h2>
          <p className="text-white/80">Math challenges (easy/medium/hard) with signed tokens and expiry.</p>
          <p className="text-white/80">Limits: earning disabled at &#8805; 100 coins; rewards capped so balance never exceeds 100.</p>
          <p className="text-white/80">Security: HMAC-signed challenges tied to the user; server verifies before crediting.</p>
        </div>

        <div className="card-panel space-y-3">
          <h2 className="text-xl font-bold text-gold border-b border-gold/30 pb-2">Tech Stack</h2>
          <p className="text-white/80">Next.js 16 (App Router) with React 19</p>
          <p className="text-white/80">PostgreSQL (Neon) with Prisma 7</p>
          <p className="text-white/80">JavaScript with ESM configs</p>
          <p className="text-white/80">Card-themed styling, responsive layout, visual playing cards</p>
        </div>
      </div>

      <div className="card-panel text-center space-y-2">
        <p className="text-white/70 text-sm">This page supports CCC.1.1: clear problem identification and implications.</p>
        <p className="text-white/60 text-sm">Visible on About Page and referenced in Home, Why, Features.</p>
      </div>
    </div>
  )
}
