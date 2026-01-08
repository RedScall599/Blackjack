import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/session'

export default async function ReflectionPage() {
  const user = await getSessionUser()
  if (!user) redirect('/login?next=/reflection')
  if (user.role !== 'ADMIN') redirect('/home')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-3">
          Project <span className="text-gold">Reflection</span>
        </h1>
        <p className="text-lg text-white/80">What Worked, What Didn't, What Changed</p>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 border-b border-emerald-500/30 pb-2 flex items-center gap-2">
          <span>&#9824;</span> What Went Well
        </h2>
        <ul className="space-y-2 text-white/90">
          <li className="flex gap-2">
            <span className="text-emerald-400">✓</span>
            <span><strong>Database integration:</strong> Neon + Prisma worked smoothly for storing users, coins, and game results.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400">✓</span>
            <span><strong>Authentication:</strong> Session-based auth with HTTP-only cookies provided secure access control.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400">✓</span>
            <span><strong>Blackjack logic:</strong> Real dealer rules (hit until 17) and card values matched casino standards.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400">✓</span>
            <span><strong>AI integration:</strong> OpenAI API provided real-time strategy feedback after each hand.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400">✓</span>
            <span><strong>Coin persistence:</strong> Players see their balance update and save across sessions—progress matters.</span>
          </li>
        </ul>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-red-400 border-b border-red-500/30 pb-2 flex items-center gap-2">
          <span>&#9829;</span> What Didn't Go Well
        </h2>
        <ul className="space-y-2 text-white/90">
          <li className="flex gap-2">
            <span className="text-red-400">✗</span>
            <span><strong>Initial CSS structure:</strong> Double-nested panels looked cluttered; had to redesign layout.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-400">✗</span>
            <span><strong>UTF-8 encoding:</strong> Raw Unicode card symbols (♠♥♣♦) caused build errors; switched to HTML entities.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-400">✗</span>
            <span><strong>Testing edge cases:</strong> Didn't initially account for when dealer and player both bust (dealer wins).</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-400">✗</span>
            <span><strong>Mobile responsiveness:</strong> Early versions had poor spacing on smaller screens; fixed with Tailwind breakpoints.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-400">✗</span>
            <span><strong>AI latency:</strong> Initial AI calls sometimes took 3-5 seconds; optimized prompts to reduce response time.</span>
          </li>
        </ul>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-blue-400 border-b border-blue-500/30 pb-2 flex items-center gap-2">
          <span>&#9827;</span> What Changed During the Project
        </h2>
        <div className="space-y-3 text-white/90">
          <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded">
            <p className="text-blue-300 font-semibold mb-1">Design System</p>
            <p className="text-white/80 text-sm">Started with generic cards; switched to casino poker theme with felt green, gold accents, and glow effects.</p>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded">
            <p className="text-purple-300 font-semibold mb-1">Game Flow</p>
            <p className="text-white/80 text-sm">Originally planned for multi-round sessions; simplified to single-hand results for clarity.</p>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 rounded">
            <p className="text-yellow-300 font-semibold mb-1">Coin System</p>
            <p className="text-white/80 text-sm">Added "Earn Coins" challenges after realizing users needed a way to recover from losses without waiting.</p>
          </div>
          <div className="bg-pink-900/20 border border-pink-500/30 p-3 rounded">
            <p className="text-pink-300 font-semibold mb-1">Database Schema</p>
            <p className="text-white/80 text-sm">Added a separate Game table to track individual hands instead of just storing coin balance.</p>
          </div>
        </div>
      </div>

      <div className="card-panel mb-6 space-y-4">
        <h2 className="text-2xl font-bold text-gold border-b border-gold/30 pb-2 flex items-center gap-2">
          <span>&#9830;</span> What I'd Build Next
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-black/30 p-4 rounded border border-white/10">
            <p className="text-gold font-semibold mb-2">Leaderboard</p>
            <p className="text-white/70 text-sm">Rank players by coin balance; add weekly/monthly resets for competition.</p>
          </div>
          <div className="bg-black/30 p-4 rounded border border-white/10">
            <p className="text-gold font-semibold mb-2">Statistics Dashboard</p>
            <p className="text-white/70 text-sm">Track win rate, biggest win, total hands played, and favorite bet size.</p>
          </div>
          <div className="bg-black/30 p-4 rounded border border-white/10">
            <p className="text-gold font-semibold mb-2">Multiplayer Mode</p>
            <p className="text-white/70 text-sm">Let multiple users play at the same table with real-time updates (WebSockets).</p>
          </div>
          <div className="bg-black/30 p-4 rounded border border-white/10">
            <p className="text-gold font-semibold mb-2">Achievement Badges</p>
            <p className="text-white/70 text-sm">Unlock badges for milestones: first win, 10-win streak, 1000 coins earned.</p>
          </div>
        </div>
      </div>

      <div className="card-panel text-center space-y-3">
        <p className="text-white/80">This reflection demonstrates growth, problem-solving, and planning for future improvements.</p>
        <Link className="btn-primary inline-block" href="/home">Back to Home</Link>
      </div>
    </div>
  )
}
