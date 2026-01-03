// Authentication API - User Login
import { NextResponse } from 'next/server'
import { login } from '@/lib/auth'
import { createSession } from '@/lib/session'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body || {}
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }
    const user = await login(email, password)
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    const { token, expiresAt } = await createSession(user.id)
    const res = NextResponse.json({ user }, { status: 200 })
    res.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(expiresAt)
    })
    return res
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}