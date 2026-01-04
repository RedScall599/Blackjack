// Next.js Middleware - Route protection and authentication
import { NextResponse } from 'next/server'

// Routes that require authentication for Blackjack Royale
const protectedRoutes = ['/product', '/earn', '/rubric-evidence', '/reflection']

// Routes that should redirect to product if already authenticated
const authRoutes = ['/login', '/register']

export async function proxy(request) {
  const { pathname, search } = request.nextUrl
  const sessionToken = request.cookies.get('session')?.value

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthPage = authRoutes.some((route) => pathname.startsWith(route))

  // If accessing a protected route without a session, redirect to login with next
  if (isProtected && !sessionToken) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname + (search || ''))
    return NextResponse.redirect(url)
  }

  // If already authenticated, redirect away from auth pages to main product
  if (isAuthPage && sessionToken) {
    const url = request.nextUrl.clone()
    url.pathname = '/product'
    return NextResponse.redirect(url)
  }

  // Otherwise allow the request
  return NextResponse.next()
}

// Optional: allow usage if imported by a root middleware file
export function middleware(request) {
  return proxy(request)
}