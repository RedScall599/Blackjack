import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import { verifySolution } from '@/lib/challenge'

export async function POST(request) {
  const sessionToken = request.cookies.get('session')?.value
  const session = await getSession(sessionToken)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { token, answer } = await request.json()
    if (!token || typeof answer === 'undefined') {
      return NextResponse.json({ error: 'Missing token or answer' }, { status: 400 })
    }

    const result = verifySolution(token, Number(answer), session.user.id)
    if (!result.valid) {
      return NextResponse.json({ error: result.reason || 'Invalid solution' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { coins: true }
    })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    if (user.coins >= 100) {
      return NextResponse.json({ error: 'Earning disabled: balance ≥ 100' }, { status: 400 })
    }
    const allowed = Math.max(0, 100 - user.coins)
    const rewardApplied = Math.min(result.reward, allowed)
    if (rewardApplied <= 0) {
      return NextResponse.json({ error: 'Earning limit reached' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { coins: { increment: rewardApplied } },
      select: { id: true, email: true, coins: true }
    })

    return NextResponse.json({ user: updatedUser, reward: rewardApplied }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
