// Home page - Redirects to login or product based on session
import { getSessionUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const user = await getSessionUser()
  if (!user) return redirect('/login')
  return redirect('/home')
}
