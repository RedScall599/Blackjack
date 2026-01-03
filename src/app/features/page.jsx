import Link from 'next/link'

export default function FeaturesPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h2 className="text-xl font-semibold">Features — CCC.1.3</h2>

      <div>
        <p className="font-semibold">This is the actual working tool users interact with (CCC.1.3)</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Live Blackjack table with Hit, Stand, Bet, Reset on <Link className="underline" href="/product">Product</Link>.</li>
          <li>Auto-resolve when player reaches 21; win/lose banner with celebratory coin rain.</li>
          <li>Coins and results persist after every round via <code>/api/game/play</code> and the Game table.</li>
          <li>Sessions (HTTP-only cookies) keep you logged in and protect coin changes.</li>
          <li>This supports CCC.1.3: users can play, see balance change, and verify persistence live.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold">Your core feature(s) working</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Real rules: 52-card deck; dealer hits until 17; face cards = 10; Ace = 1 or 11; push keeps coins.</li>
          <li>Bet validation: must be ≤ coins; server verifies and updates DB atomically.</li>
          <li>Result persistence: betAmount, result (win/lose/push), coinsChange saved per round.</li>
          <li>Earn Coins mini-game: solve math challenges to increase balance safely.</li>
          <li>Reset and reshuffle: start fresh deck and hands anytime.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold">Why would I buy your solution over others?</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Real persistence: coins and history don’t disappear; audited in the database.</li>
          <li>Fair, transparent rules: dealer logic and Ace handling are consistent and documented.</li>
          <li>Secure sessions: HTTP-only cookies and hashed passwords prevent fake balances.</li>
          <li>Learning-first: built-in explanations for odds, dealer behavior, and decision-making.</li>
          <li>Delightful UI: responsive layout, rules sidebar, win effects (coin rain), and clear feedback.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold">How does AI help solve my problem?</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Explains dealer logic and odds to guide better hit/stand decisions.</li>
          <li>Highlights probability concepts (blackjack, bust risk, push scenarios) during play.</li>
          <li>Connects gameplay outcomes to learning (risk management and expected value).</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold">Why database and authentication are required</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Database: store users, sessions, coins, and game results so progress never disappears.</li>
          <li>Authentication: identify players, secure sessions, and prevent fake coin changes.</li>
          <li>Evidence pages: see <Link className="underline" href="/why">Why</Link> (CCC.1.2) and <Link className="underline" href="/product">Product</Link> (CCC.1.3).</li>
        </ul>
      </div>
    </div>
  )
}
