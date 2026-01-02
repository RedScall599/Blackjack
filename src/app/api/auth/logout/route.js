// Authentication API - User Logout
import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/session'

export async function POST(request) {
  try {
    const sessionToken = request.cookies.get('session')?.value
    if (sessionToken) {
      await deleteSession(sessionToken)
    }
    const res = NextResponse.redirect(new URL('/login', request.url))
    res.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0)
    })
    return res
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}