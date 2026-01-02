import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/session'

export default async function EvidencePage() {
  const user = await getSessionUser()
  if (!user || user.role !== 'ADMIN') redirect('/')
  return (
    <div className="max-w-2xl mx-auto p-8 space-y-3">
      <h2 className="text-xl font-semibold">Rubric Evidence</h2>
      <ul className="list-disc pl-6">
        <li>CCC.1.1: About page explains persistence problem</li>
        <li>CCC.1.2: Architecture and API implement solution</li>
        <li>CCC.1.3: Live game demo on Product page</li>
        <li>Buttons link directly to proof (navigation)</li>
        <li>README describes design and tracking</li>
      </ul>
    </div>
  )
}
