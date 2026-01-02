// Authentication API - User Registration
import { NextResponse } from 'next/server'
import { register } from '@/lib/auth'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body || {}
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }
    try {
      const user = await register({ email, password })
      return NextResponse.json({ user }, { status: 201 })
    } catch (e) {
      return NextResponse.json({ error: e.message || 'Registration failed' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}