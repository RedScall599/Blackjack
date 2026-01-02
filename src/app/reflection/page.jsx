import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/session'

export default async function ReflectionPage() {
  const user = await getSessionUser()
  if (!user || user.role !== 'ADMIN') redirect('/')
  return (
    <div className="max-w-2xl mx-auto p-8 space-y-3">
      <h2 className="text-xl font-semibold">Reflection</h2>
      <ul className="list-disc pl-6">
        <li>Worked: Prisma + sessions for persistence</li>
        <li>Failed: server-side interactive rounds (future work)</li>
        <li>Changed: simplified MVP for clarity</li>
        <li>Add next: leaderboard, stats, multiplayer</li>
        <li>Improve: validation, server-round logic, UI polish</li>
      </ul>
    </div>
  )
}
