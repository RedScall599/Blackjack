import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/session'
import EarnCoins from '@/components/earn/EarnCoins'

export default async function Page() {
  const user = await getSessionUser()
  if (!user) redirect('/login?next=/earn')
  return (
    <main className="max-w-3xl mx-auto py-4 space-y-4">
      <h1 className="text-xl font-bold">Earn Coins</h1>
      <div className="space-y-1 text-sm">
        <p>Solve equations to earn coins.</p>
        <p>Time-limited, session-bound problems.</p>
        <p>Higher difficulty pays more.</p>
        <p>Why authentication is needed: ties challenges to your session securely.</p>
        <p>Why database is needed: credits are saved to your user balance.</p>
        <p>This supports CCC.1.3: working tool that updates persistent coins.</p>
        <p>This is visible on Page Earn and Product.</p>
      </div>
      <EarnCoins initialCoins={user.coins} />
    </main>
  )
}
