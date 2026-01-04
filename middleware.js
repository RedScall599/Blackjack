import { middleware as proxyMiddleware } from './src/proxy'

// Define config directly here so Next.js can statically analyze it
export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}

export default function middleware(request) {
	return proxyMiddleware(request)
}
