import { NextResponse } from 'next/server'

// Define config directly here so Next.js can statically analyze it
export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}

const protectedRoutes = ['/product', '/earn', '/rubric-evidence', '/reflection']
const authRoutes = ['/login', '/register']

export default function middleware(request) {
	const { pathname, search } = request.nextUrl
	const sessionToken = request.cookies.get('session')?.value

	const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
	const isAuthPage = authRoutes.some((route) => pathname.startsWith(route))

	if (isProtected && !sessionToken) {
		const url = request.nextUrl.clone()
		url.pathname = '/login'
		url.searchParams.set('next', pathname + (search || ''))
		return NextResponse.redirect(url)
	}

	if (isAuthPage && sessionToken) {
		const url = request.nextUrl.clone()
		url.pathname = '/product'
		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}
