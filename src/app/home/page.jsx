import { getSessionUser } from '@/lib/session'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Blackjack Royale</h1>
        <p className="text-sm md:text-base">
          Blackjack is a comparing card game against the dealer. Aim to get as close to 21 as possible without busting; face cards count as 10, and the Ace counts as 1 or 11.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <ul className="list-disc pl-6 space-y-1">
            <li>What it is: a web-based Blackjack game with real persistence.</li>
            <li>Core problem: most games don’t save progress; coins reset; wins aren’t tracked.</li>
            <li>How it helps: teaches probability, decision-making, dealer logic, and risk management.</li>
            <li>Outcome: coins and results persist across refreshes and sessions for accountability.</li>
          </ul>
        </div>
        <div className="space-y-3">
          <ul className="list-disc pl-6 space-y-1">
            <li>Why a database is needed: stores users, sessions, coins, and game results so progress never disappears.</li>
            <li>Why authentication is needed: identifies you, secures sessions with HTTP-only cookies, and prevents fake coin changes.</li>
            <li>Fair rules enforced: 52-card deck; dealer hits to 17; Ace = 1 or 11; push keeps coins.</li>
          </ul>
        </div>
      </div>

      <ul className="list-disc pl-6 space-y-1">
        <li>This supports CCC.1.1: persistence problem explained on About.</li>
        <li>This supports CCC.1.2: solution and architecture shown on Why + Features.</li>
        <li>This supports CCC.1.3: live game demo and coin tracking on Product.</li>
      </ul>

      <div className="card-panel p-4">
        <p className="font-semibold">Who benefits</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Players: practice decisions with fair, transparent rules.</li>
          <li>Students: learn odds and dealer logic in context.</li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/product" className="bg-blue-600 text-white px-4 py-2 rounded">Play Blackjack</Link>
        <span className="text-sm text-black">Your current coins persist after every round.</span>
      </div>
    </div>
  )
}
