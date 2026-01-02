"use client"
import { useEffect, useState } from 'react'

export default function EarnCoins({ initialCoins }) {
  const [coins, setCoins] = useState(initialCoins ?? 0)
  const [level, setLevel] = useState('easy')
  const [problem, setProblem] = useState(null)
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const earningDisabled = coins >= 100

  async function fetchProblem(lvl = level) {
    if (earningDisabled) {
      setMessage('Earning disabled when coins ≥ 100')
      return
    }
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`/api/earn/problem?level=${encodeURIComponent(lvl)}`)
      const data = await res.json()
      if (res.ok) {
        setProblem(data)
        setAnswer('')
      } else {
        setMessage(data.error || 'Failed to load problem')
      }
    } catch {
      setMessage('Network error')
    } finally {
      setLoading(false)
    }
  }

  async function submit() {
    if (earningDisabled) {
      setMessage('Earning disabled when coins over 100')
      return
    }
    if (!problem) return
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/earn/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: problem.token, answer })
      })
      const data = await res.json()
      if (res.ok) {
        setCoins(data.user.coins)
        setMessage(`✅ Correct! +${data.reward} coins. New total: ${data.user.coins}`)
        fetchProblem(level)
      } else {
        setMessage(`❌ ${data.error || 'Incorrect answer'}`)
      }
    } catch {
      setMessage('Network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProblem(level)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  return (
    <div className="space-y-3 sm:space-y-4 max-w-xl mx-auto">
      <div className="flex items-center gap-2 text-sm">
        <span>Coins:</span>
        <strong>{coins}</strong>
        {earningDisabled && <span className="text-red-600">(Limit reached)</span>}
      </div>

      <div className="flex items-center gap-2 flex-wrap text-sm">
        <label htmlFor="level">Difficulty:</label>
        <select id="level" className="border px-2 py-1 rounded" value={level} onChange={(e) => setLevel(e.target.value)} disabled={earningDisabled}>
          <option value="easy">Easy: mixed + and − — +5</option>
          <option value="medium">Medium: × and ÷ (integer result) — +10</option>
          <option value="hard">Hard: PEMDAS (parentheses/exponents) — +50</option>
        </select>
        <button className="bg-gray-600 text-white px-2 py-1 rounded" onClick={() => fetchProblem(level)} disabled={loading || earningDisabled}>New</button>
      </div>

      <div className="border rounded p-3 sm:p-4">
        <p className="mb-2 text-sm">Solve to earn coins:</p>
        {problem ? (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base sm:text-lg font-semibold">{problem.expression} =</span>
            <input
              type="number"
              className="border px-2 py-1 rounded w-24"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={submit} disabled={loading || answer === '' || earningDisabled}>Submit</button>
          </div>
        ) : (
          <p className="text-sm">No problem loaded.</p>
        )}
      </div>

      <div className="min-h-[20px]">
        {message && <p className="text-sm">{message}</p>}
      </div>
    </div>
  )
}
