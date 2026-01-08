import './globals.css'
import Link from 'next/link'
import { getSessionUser } from '@/lib/session'
import FactsButton from '@/components/ui/FactsButton'

export const metadata = {
  title: 'Blackjack Royale',
  description: 'Web-based Blackjack with real persistence and learning',
}

export default async function RootLayout({ children }) {
  const user = await getSessionUser()
  return (
    <html lang="en" className="card-font">
      <body className="min-h-screen relative overflow-x-hidden">
        {/* Animated floating bubbles background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
          <div className="bubble bubble-5"></div>
          <div className="bubble bubble-6"></div>
        </div>
        
        <header className="relative z-10 backdrop-blur-sm bg-black/60 border-b border-gold/30 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="text-xl sm:text-2xl font-bold text-gold hover:text-gold-light transition-colors">
                ♠ Blackjack Royale ♦
              </Link>
              
              <nav className="hidden lg:flex gap-2 text-sm">
                {user && <Link href="/home" className="nav-btn">Home</Link>}
                {user && <Link href="/product" className="nav-btn">Play</Link>}
                {user && <Link href="/earn" className="nav-btn">Earn Coins</Link>}
                <Link href="/about" className="nav-btn">About</Link>
                <Link href="/why" className="nav-btn">Why</Link>
                <Link href="/features" className="nav-btn">Features</Link>
                {user?.role === 'ADMIN' && <Link href="/rubric-evidence" className="nav-btn">Evidence</Link>}
                {user?.role === 'ADMIN' && <Link href="/reflection" className="nav-btn">Reflection</Link>}
              </nav>
              
              <div className="flex items-center gap-3 text-sm">
                {user ? (
                  <>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/40">
                      <span className="text-gold font-semibold">💰 {user.coins}</span>
                    </div>
                    <span className="hidden md:inline text-white/80">{user.email}</span>
                    <form action="/api/auth/logout" method="post">
                      <button type="submit" className="nav-btn">Logout</button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-white/80 hover:text-white transition-colors">Login</Link>
                    <Link href="/register" className="nav-btn">Register</Link>
                  </>
                )}
              </div>
            </div>
            
            {/* Mobile nav */}
            <nav className="lg:hidden flex gap-2 mt-3 flex-wrap text-xs">
              {user && <Link href="/home" className="nav-btn">Home</Link>}
              {user && <Link href="/product" className="nav-btn">Play</Link>}
              {user && <Link href="/earn" className="nav-btn">Earn</Link>}
              <Link href="/about" className="nav-btn">About</Link>
              <Link href="/why" className="nav-btn">Why</Link>
              <Link href="/features" className="nav-btn">Features</Link>
            </nav>
          </div>
        </header>
        
        <main className="relative z-10 min-h-screen">
          {children}
          {/* Site-wide floating facts button */}
          <FactsButton />
        </main>
      </body>
    </html>
  )
}
