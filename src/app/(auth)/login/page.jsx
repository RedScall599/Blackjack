'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed')
      } else {
        const next = params?.get('next')
        const dest = next || '/home'
        router.replace(dest)
        router.refresh()
      }
    } catch (e) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card-panel">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="text-gold">&#9824;</span> Sign In <span className="text-gold">&#9824;</span>
            </h1>
            <p className="text-white/70">Welcome back to Blackjack Royale</p>
          </div>

          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-3 mb-6 text-center">
            <p className="text-emerald-300 text-sm font-semibold">New users start with 100 coins</p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mb-4">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/90 text-sm font-semibold mb-2">Email</label>
              <Input 
                className="bg-black/40 border-gold/30 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold/50" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="your@email.com"
                required 
              />
            </div>
            <div>
              <label className="block text-white/90 text-sm font-semibold mb-2">Password</label>
              <Input 
                className="bg-black/40 border-gold/30 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold/50" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary w-full text-lg font-bold" 
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-white/10 pt-6">
            <p className="text-white/70 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-gold hover:text-gold/80 font-semibold underline transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
