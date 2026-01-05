import { NextResponse } from 'next/server'

// Minimal matcher covering all paths; we'll skip assets within the function
// export const config = { matcher: ['/:path*'] }

const protectedRoutes = ['/product', '/earn', '/rubric-evidence', '/reflection']
const authRoutes = ['/login', '/register']

export default function middleware(request) {
	const { pathname } = request.nextUrl
	// Skip static assets and Next internals to avoid interfering
	if (
		pathname.startsWith('/_next') ||
		pathname === '/favicon.ico' ||
		pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)
	) {
		return NextResponse.next()
	}
	const sessionToken = request.cookies.get('session')?.value

	const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
	const isAuthPage = authRoutes.some((route) => pathname.startsWith(route))

	if (isProtected && !sessionToken) {
		const url = request.nextUrl.clone()
		url.pathname = '/login'
		// Preserve intended destination after login
		url.searchParams.set('next', pathname)
		return NextResponse.redirect(url)
	}

	if (isAuthPage && sessionToken) {
		const url = request.nextUrl.clone()
		url.pathname = '/product'
		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}
