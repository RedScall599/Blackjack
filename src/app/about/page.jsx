export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h2 className="text-2xl font-bold">About Me & Project (CCC.1.1)</h2>

      <div className="space-y-1">
        <p>Who I am: builder focused on fair, persistent game design.</p>
        <p>Goal: teach probability, decision-making, and risk management through Blackjack.</p>
        <p>Motivation: most games reset progress; I want learning that sticks.</p>
      </div>

      <div className="space-y-1">
        <p>Problem: games without persistence lose progress and accountability.</p>
        <p>Example: refreshing wipes coins and win history; there’s no tracking.</p>
        <p>Impact: players can’t improve decisions; systems feel fake without saved state.</p>
      </div>

      <div className="space-y-1">
        <p>Solution: identify users with authentication and store results in a real database.</p>
        <p>Auth: email + password; sessions via HTTP-only cookies; server-side validation.</p>
        <p>Database: PostgreSQL + Prisma to persist users, sessions, coins, and game results.</p>
        <p>Rules: 52-card deck; dealer hits to 17; Ace = 1 or 11; push keeps coins.</p>
        <p>Gameplay: bet, deal, hit/stand; outcomes update coins and save to the Game table.</p>
        <p>Why database is needed: saves coins and game history so progress matters.</p>
        <p>Why authentication is needed: identifies players and secures coin updates.</p>
      </div>

      <div className="space-y-1">
        <p>Earn Coins: math challenges (easy/medium/hard) with signed tokens and expiry.</p>
        <p>Limits: earning disabled at ≥ 100 coins; rewards capped so balance never exceeds 100.</p>
        <p>Security: HMAC-signed challenges tied to the user; server verifies before crediting.</p>
      </div>

      <div className="space-y-1">
        <p>Tech Stack: Next.js (App Router), PostgreSQL (Neon), Prisma, JavaScript.</p>
        <p>Important details: ESM configs; Next 16 cookies as Promise; Prisma migrations + seed.</p>
        <p>UI: card-themed styling, responsive layout, visual playing cards.</p>
      </div>

      <div className="space-y-1">
        <p>This supports CCC.1.1: problem and persistence rationale.</p>
        <p>This supports CCC.1.2: solution and architecture plan.</p>
        <p>This supports CCC.1.3: working demo and saved coins.</p>
        <p>This is visible on Page About, Home, Why, Features, Product, Evidence.</p>
      </div>
    </div>
  )
}
