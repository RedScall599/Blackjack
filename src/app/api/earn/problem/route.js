import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { createProblem } from '@/lib/challenge'
import { prisma } from '@/lib/db'

export async function GET(request) {
  const sessionToken = request.cookies.get('session')?.value
  const session = await getSession(sessionToken)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const level = searchParams.get('level') || 'easy'
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { coins: true }
    })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    if (user.coins >= 100) {
      return NextResponse.json({ error: 'Earning disabled: balance ≥ 100' }, { status: 400 })
    }
    const problem = createProblem(session.user.id, level)
    return NextResponse.json(problem, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create problem' }, { status: 500 })
  }
}
