import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/session'
import EarnCoins from '@/components/earn/EarnCoins'

export default async function Page() {
  const user = await getSessionUser()
  if (!user) redirect('/login?next=/earn')
  return (
    <main className="max-w-3xl mx-auto py-4 space-y-4">
      <h1 className="text-xl font-bold">Earn Coins</h1>
      <ul className="list-disc pl-6 text-sm">
        <li>Solve equations to earn coins.</li>
        <li>Time-limited, session-bound problems.</li>
        <li>Higher difficulty pays more.</li>
      </ul>
      <EarnCoins initialCoins={user.coins} />
    </main>
  )
}
