export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h2 className="text-2xl font-bold">About Me & Project (CCC.1.1)</h2>

      <ul className="list-disc pl-6 space-y-1">
        <li>Who I am: builder focused on fair, persistent game design.</li>
        <li>Goal: teach probability, decision-making, and risk management through Blackjack.</li>
        <li>Motivation: most games reset progress; I want learning that sticks.</li>
      </ul>

      <ul className="list-disc pl-6 space-y-1">
        <li>Problem: games without persistence lose progress and accountability.</li>
        <li>Example: refreshing wipes coins and win history; there’s no tracking.</li>
        <li>Impact: players can’t improve decisions; systems feel fake without saved state.</li>
      </ul>

      <ul className="list-disc pl-6 space-y-1">
        <li>Solution: identify users with authentication and store results in a real database.</li>
        <li>Auth: email + password; sessions via HTTP-only cookies; server-side validation.</li>
        <li>Database: PostgreSQL + Prisma to persist users, sessions, coins, and game results.</li>
        <li>Rules: 52-card deck; dealer hits to 17; Ace = 1 or 11; push keeps coins.</li>
        <li>Gameplay: bet, deal, hit/stand; outcomes update coins and save to the Game table.</li>
      </ul>

      <ul className="list-disc pl-6 space-y-1">
        <li>Earn Coins: math challenges (easy/medium/hard) with signed tokens and expiry.</li>
        <li>Limits: earning disabled at ≥ 100 coins; rewards capped so balance never exceeds 100.</li>
        <li>Security: HMAC-signed challenges tied to the user; server verifies before crediting.</li>
      </ul>

      <ul className="list-disc pl-6 space-y-1">
        <li>Tech Stack: Next.js (App Router), PostgreSQL (Neon), Prisma, JavaScript.</li>
        <li>Important details: ESM configs; Next 16 cookies as Promise; Prisma migrations + seed.</li>
        <li>UI: card-themed styling, responsive layout, visual playing cards.</li>
      </ul>

      <ul className="list-disc pl-6 space-y-1">
        <li>This supports CCC.1.1: problem and why persistence matters (About).</li>
        <li>This supports CCC.1.2: how the solution works with auth + DB (Why/Features).</li>
        <li>This supports CCC.1.3: live demo with saved coins and evidence pages (Product/Evidence).</li>
      </ul>
    </div>
  )
}
