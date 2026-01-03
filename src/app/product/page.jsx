import { getSessionUser } from '@/lib/session'
import BlackjackTable from '@/components/game/BlackjackTable'
import { redirect } from 'next/navigation'

export default async function ProductPage() {
  const user = await getSessionUser()
  if (!user) {
    redirect('/login')
  }
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Play Blackjack</h2>
          <BlackjackTable initialCoins={user.coins} />
        </div>
        <aside className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">How to Play</h3>
            <ul className="list-disc pl-6">
              <li>Hit to draw a card</li>
              <li>Stand to let dealer play</li>
              <li>Win if dealer busts or you beat dealer</li>
              <li>Lose if you bust or dealer beats you</li>
              <li>Push if totals tie</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Rules</h3>
            <ul className="list-disc pl-6">
              <li>Deck of 52 cards</li>
              <li>Dealer hits until 17</li>
              <li>Face cards = 10</li>
              <li>Ace = 1 or 11</li>
              <li>Blackjack = Ace + 10</li>
              <li>Bust = over 21</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
