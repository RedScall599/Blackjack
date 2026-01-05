// Game API - Play Blackjack (persist results)
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'

export const runtime = 'nodejs'

export async function POST(request) {
  // API Auth Pattern (REQUIRED)
  const sessionToken = request.cookies.get('session')?.value
  const session = await getSession(sessionToken)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { betAmount, result } = body || {}

    // Validate bet
    const bet = Number(betAmount)
    if (!Number.isFinite(bet) || bet <= 0) {
      return NextResponse.json({ error: 'Invalid bet amount' }, { status: 400 })
    }

    // Validate result: 'win' | 'lose' | 'push'
    const normalized = String(result || '').toLowerCase()
    if (!['win', 'lose', 'push'].includes(normalized)) {
      return NextResponse.json({ error: 'Invalid result' }, { status: 400 })
    }

    // Ensure user has enough coins to place the bet
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { coins: true }
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    if (user.coins < bet) {
      return NextResponse.json({ error: 'Insufficient coins' }, { status: 400 })
    }

    // Calculate coinsChange
    let coinsChange = 0
    if (normalized === 'win') coinsChange = bet
    if (normalized === 'lose') coinsChange = -bet
    if (normalized === 'push') coinsChange = 0

    // Update user coins and save Game
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { coins: { increment: coinsChange } },
      select: { id: true, email: true, coins: true }
    })

    await prisma.game.create({
      data: {
        userId: session.user.id,
        betAmount: bet,
        result: normalized === 'win' ? 'WIN' : normalized === 'lose' ? 'LOSS' : 'PUSH',
        coinsChange
      }
    })

    return NextResponse.json({
      user: updatedUser,
      game: { betAmount: bet, result: normalized, coinsChange }
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
