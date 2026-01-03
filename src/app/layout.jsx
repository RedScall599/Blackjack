import './globals.css'
import Link from 'next/link'
import { getSessionUser } from '@/lib/session'

export const metadata = {
  title: 'Blackjack Royale',
  description: 'Web-based Blackjack with real persistence and learning',
}

export default async function RootLayout({ children }) {
  const user = await getSessionUser()
  return (
    <html lang="en" className="card-font">
      <body className="min-h-screen casino-checkers">
        <header className="border-b bg-white/80 backdrop-blur card-outline">
          <div className="max-w-full w-full mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-4 flex-wrap">
            <Link href="/" className="font-semibold">Blackjack Royale</Link>
            <nav className="flex gap-2 sm:gap-3 text-sm flex-wrap">
              {user && <Link href="/home" className="nav-btn">Home</Link>}
              {user && <Link href="/product" className="nav-btn">Play</Link>}
              {user && <Link href="/earn" className="nav-btn">Earn Coins</Link>}
              <Link href="/about" className="nav-btn">About</Link>
              <Link href="/why" className="nav-btn">Why</Link>
              <Link href="/features" className="nav-btn">Features</Link>
              {user && <Link href="/rubric-evidence" className="nav-btn">Evidence</Link>}
              {user && <Link href="/reflection" className="nav-btn">Reflection</Link>}
            </nav>
            <div className="ml-auto text-sm flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-gray-700">{user.email}</span>
                  <form action="/api/auth/logout" method="post">
                    <button type="submit" className="nav-btn">Logout</button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="underline">Login</Link>
                  <Link href="/register" className="underline">Register</Link>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="w-full mx-auto px-2 sm:px-4 py-6 sm:py-8">
          <div className="card-panel w-full p-4 sm:p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
