import { getSessionUser } from '@/lib/session'
import BlackjackTable from '@/components/game/BlackjackTable'
import { redirect } from 'next/navigation'

export default async function ProductPage() {
  const user = await getSessionUser()
  if (!user) {
    redirect('/login')
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Game Area */}
        <div className="xl:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">Play Blackjack</h1>
            <div className="flex items-center gap-2 px-4 py-2 bg-gold/30 border-2 border-gold rounded-lg">
              <span className="text-2xl">💰</span>
              <span className="text-xl font-bold text-white">{user.coins}</span>
            </div>
          </div>
          <BlackjackTable initialCoins={user.coins} />
        </div>
        
        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="card-panel space-y-2">
            <h3 className="text-lg font-bold text-gold border-b border-gold/30 pb-2">How to Play</h3>
            <ul className="space-y-1.5 text-sm text-white/80">
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span>Hit to draw a card</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span>Stand to let dealer play</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span>Win if dealer busts or you're higher</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span>Lose if you bust or dealer is higher</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span>Push if totals tie</li>
            </ul>
          </div>
          
          <div className="card-panel space-y-2">
            <h3 className="text-lg font-bold text-gold border-b border-gold/30 pb-2">Rules</h3>
            <ul className="space-y-1.5 text-sm text-white/80">
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">♠</span>52-card deck</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">♥</span>Dealer hits until 17</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">♣</span>Face cards = 10</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">♦</span>Ace = 1 or 11</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">♠</span>Blackjack = Ace + 10</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">♥</span>Bust = over 21</li>
            </ul>
          </div>
          
          <div className="card-panel space-y-2">
            <h3 className="text-sm font-bold text-gold/80 border-b border-gold/20 pb-2">Why This Works</h3>
            <p className="text-xs text-white/60">Database persists coins and game history per user.</p>
            <p className="text-xs text-white/60">Authentication secures session-based coin updates.</p>
            <p className="text-xs text-white/50 italic">CCC.1.3: live demo with saved coins</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
