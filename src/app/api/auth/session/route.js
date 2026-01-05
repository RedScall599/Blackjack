// Authentication API - Session Check
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export const runtime = 'nodejs'

export async function GET(request) {
  try {
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ user: {
      id: session.user.id,
      email: session.user.email,
      coins: session.user.coins,
      createdAt: session.user.createdAt
    } })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}