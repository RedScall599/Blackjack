import Link from 'next/link'

export default function WhyPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h2 className="text-xl font-semibold">Why Blackjack Royale — CCC.1.2</h2>

      <div>
        <p className="font-semibold">Why I chose Blackjack</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>I enjoy the game: personal interest keeps the project engaging.</li>
          <li>Helps users think: builds probability intuition and pattern recognition.</li>
          <li>Decision-making practice: hit/stand choices with immediate feedback.</li>
          <li>Simple rules, real risk: busts and losses reduce coins to show consequences.</li>
          <li>Rewards success: wins increase coins to reinforce good decisions.</li>
          <li>Work-to-earn: math challenges on Earn give the feeling of earning coins.</li>
          <li>Learning focus: teaches risk management and expected value in a friendly format.</li>
          <li>This supports CCC.1.2: clear rationale for solution choice and user impact.</li>
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="nav-btn" href="/product">Play Blackjack</Link>
          <Link className="nav-btn" href="/earn">Earn Coins</Link>
          <Link className="nav-btn" href="/features">See Features</Link>
        </div>
      </div>

      <div>
        <p className="font-semibold">My solution idea </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Build a real Blackjack game with persistent coins and round history.</li>
          <li>Teach probability, dealer logic, and decision-making through authentic rules.</li>
          <li>Use Next.js + Prisma + Neon (PostgreSQL) with session-based auth for reliability.</li>
          <li>Make progress matter: coins and results survive refreshes and logins.</li>
        </ul>
      </div>


      <div>
        <p className="font-semibold">Challenges I expect </p>
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
          <li>
            Evidence:
            <span className="inline-flex gap-2 ml-2 flex-wrap">
              <Link className="nav-btn" href="/features">Features</Link>
              <Link className="nav-btn" href="/product">Product</Link>
            </span>
            <span className="ml-2 text-sm">(CCC.1.2)</span>
          </li>
          <li>
            CCC.1.1:
            <span className="inline-flex gap-2 ml-2 flex-wrap">
              <Link className="nav-btn" href="/about">About</Link>
            </span>
          </li>
          <li>
            CCC.1.3:
            <span className="inline-flex gap-2 ml-2 flex-wrap">
              <Link className="nav-btn" href="/product">Product</Link>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
