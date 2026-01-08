import Link from 'next/link'

export default function FeaturesPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h2 className="text-xl font-semibold">Features</h2>

      <div>
        <p className="font-semibold">This is the actual working tool users interact with </p>
        <div className="space-y-1">
          <p>Live Blackjack table with Hit, Stand, Bet, Reset on <Link className="nav-btn" href="/product">Play</Link>.</p>
          <p>Auto-resolve when player reaches 21; win/lose banner with celebratory coin rain.</p>
          <p>Coins and results persist after every round via <code>/api/game/play</code> and the Game table.</p>
          <p>Sessions (HTTP-only cookies) keep you logged in and protect coin changes.</p>
          <p>Users can play, see balance change, and verify persistence live.</p>
        </div>
      </div>

      <div>
        <p className="font-semibold">My core feature(s) </p>
        <div className="space-y-1">
          <p>Real rules: 52-card deck; dealer hits until 17; face cards = 10; Ace = 1 or 11; push keeps coins.</p>
          <p>Bet validation: must be ≤ coins; server verifies and updates DB atomically.</p>
          <p>Result persistence: betAmount, result (win/lose/push), coinsChange saved per round.</p>
          <p>Earn Coins mini-game: solve math challenges to increase balance safely.</p>
          <p>Reset and reshuffle: start fresh deck and hands anytime.</p>
        </div>
      </div>

      <div>
        <p className="font-semibold">Why would I play your solution over others?</p>
        <div className="space-y-1">
          <p>Real persistence: coins and history don’t disappear; audited in the database.</p>
          <p>Fair, transparent rules: dealer logic and Ace handling are consistent and documented.</p>
          <p>Secure sessions: HTTP-only cookies and hashed passwords prevent fake balances.</p>
          <p>Learning-first: built-in explanations for odds, dealer behavior, and decision-making.</p>
          <p>Delightful UI: responsive layout, rules sidebar, win effects (coin rain), and clear feedback.</p>
          <p>This supports CCC.1.3: users can verify features work in product.</p>
          <p>This is visible on Page Product and Features.</p>
        </div>
      </div>

      <div>
        <p className="font-semibold">How Jack of AI helps solve my problem</p>
        <div className="space-y-1">
          <p>Jack of AI explains dealer logic and odds to guide better hit/stand decisions.</p>
          <p>Jack of AI highlights probability concepts (blackjack, bust risk, push scenarios) during play.</p>
          <p>Jack of AI connects gameplay outcomes to learning (risk management and expected value).</p>
        </div>
      </div>

      <div>
        <p className="font-semibold">Why database and authentication are required</p>
        <div className="space-y-1">
          <p>Database: store users, sessions, coins, and game results so progress never disappears.</p>
          <p>Authentication: identify players, secure sessions, and prevent fake coin changes.</p>
          <p>This supports CCC.1.2: architecture requires persistent storage and secure identity.</p>
          <p>This is visible on Page Why and Features.</p>
        </div>
      </div>
    </div>
  )
}
