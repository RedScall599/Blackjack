import Link from 'next/link'

export default function WhyPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h2 className="text-xl font-semibold">Why Blackjack Royale — CCC.1.2</h2>

      <div>
        <p className="font-semibold">Show your plan and explain your solution.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>This supports CCC.1.2: solution and architecture explained here; evidence links to Features and Product.</li>
          <li>Why a database is needed: persist users, sessions, coin balances, and game results for real accountability.</li>
          <li>Why authentication is needed: identify players, secure HTTP-only session cookies, prevent fake coin changes.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold">Your solution idea (what you’re building and why)</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Build a real Blackjack game with persistent coins and round history.</li>
          <li>Teach probability, dealer logic, and decision-making through authentic rules.</li>
          <li>Use Next.js + Prisma + Neon (PostgreSQL) with session-based auth for reliability.</li>
          <li>Make progress matter: coins and results survive refreshes and logins.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold">Features list (what your app will do)</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Signup/Login with hashed passwords and server-side sessions.</li>
          <li>Play Blackjack: 52-card deck; dealer hits to 17; Ace = 1 or 11; push keeps coins.</li>
          <li>Bet coins, see live totals, auto-resolve when player reaches 21.</li>
          <li>Persist each round: store bet, result (win/lose/push), and coin change.</li>
          <li>Earn Coins mini-game: math challenges to increase balance safely.</li>
          <li>Explain rules and odds on the Why and Features pages for learning.</li>
          <li>UI feedback: win/lose banner and celebratory coin rain on wins.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold">Challenges you expect (and how you’ll handle them)</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Fairness and rules: implement a pure game engine; dealer hits-to-17; Ace handling; push logic.</li>
          <li>State sync and persistence: validate on the server; save after each round; return updated coins.</li>
          <li>Secure auth: HTTP-only cookies; server session table; password hashing; route guards.</li>
          <li>Data integrity: Prisma schema with constraints; transactional updates for coins + game row.</li>
          <li>Edge cases: busts, natural blackjack, deck exhaustion; reset and reshuffle mechanisms.</li>
          <li>UX polish: clear CTA, rules sidebar, responsive layout, accessible controls.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold">Your project plan summary/link (sprints/tasks)</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Sprint 1: Auth + DB — user/session tables; login/register APIs; cookie sessions.</li>
          <li>Sprint 2: Game Engine + UI — deck, hand totals, dealer loop; product page UI.</li>
          <li>Sprint 3: Persistence + Coins — /api/game/play writes results; coin updates returned to client.</li>
          <li>Sprint 4: Learning + Polish — Why/Features pages; Earn Coins; banners; animations.</li>
          <li>Evidence: see <Link className="underline" href="/features">Features</Link>, <Link className="underline" href="/product">Product</Link>, and <Link className="underline" href="/rubric-evidence">Rubric Evidence</Link> for CCC.1.2 demonstration.</li>
          <li>CCC.1.1: persistence problem and context are covered on <Link className="underline" href="/about">About</Link>.</li>
          <li>CCC.1.3: live demo of the product with coin tracking is shown on <Link className="underline" href="/product">Product</Link>.</li>
        </ul>
      </div>
    </div>
  )
}
