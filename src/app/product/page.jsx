import { getSessionUser } from '@/lib/session'
import BlackjackTable from '@/components/game/BlackjackTable'
import { redirect } from 'next/navigation'

export default async function ProductPage() {
  const user = await getSessionUser()
  if (!user) {
    redirect('/login')
  }
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-4">
      <h2 className="text-xl font-semibold">Play Blackjack</h2>
      <ul className="list-disc pl-6">
        <li>Hit to draw a card</li>
        <li>Stand to let dealer play</li>
        <li>Win if dealer busts or you beat dealer</li>
        <li>Lose if you bust or dealer beats you</li>
        <li>Push if totals tie</li>
      </ul>
      <BlackjackTable initialCoins={user.coins} />
    </div>
  )
}
