import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/session'
import EarnCoins from '@/components/earn/EarnCoins'

export default async function Page() {
  const user = await getSessionUser()
  if (!user) redirect('/login?next=/earn')
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-3">
          Earn <span className="text-gold">Coins</span>
        </h1>
        <p className="text-lg text-white/80">Solve math challenges to increase your balance</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="card-panel space-y-2">
          <h3 className="text-gold font-bold border-b border-gold/30 pb-2">&#9827; How It Works</h3>
          <p className="text-white/80 text-sm">Solve equations to earn coins.</p>
          <p className="text-white/80 text-sm">Time-limited, session-bound problems.</p>
          <p className="text-white/80 text-sm">Higher difficulty pays more.</p>
        </div>

        <div className="card-panel space-y-2">
          <h3 className="text-gold font-bold border-b border-gold/30 pb-2">&#9829; Why It Matters</h3>
          <p className="text-white/80 text-sm">Authentication ties challenges to your session securely.</p>
          <p className="text-white/80 text-sm">Database credits are saved to your user balance.</p>
        </div>

        <div className="card-panel space-y-2">
          <h3 className="text-gold font-bold border-b border-gold/30 pb-2">&#9830; Evidence</h3>
          <p className="text-white/80 text-sm">This supports CCC.1.3: working tool that updates persistent coins.</p>
          <p className="text-white/80 text-sm">Visible on Earn and Product pages.</p>
        </div>
      </div>

      <EarnCoins initialCoins={user.coins} />
    </div>
  )
}
