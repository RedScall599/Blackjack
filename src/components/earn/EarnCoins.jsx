"use client"
import { useEffect, useRef, useState } from 'react'

export default function EarnCoins({ initialCoins }) {
  const [coins, setCoins] = useState(initialCoins ?? 0)
  const [level, setLevel] = useState('easy')
  const [problem, setProblem] = useState(null)
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const controllerRef = useRef(null)
  const earningDisabled = coins >= 100

  async function fetchProblem(lvl = level) {
    if (earningDisabled) {
      setMessage('Earning disabled when coins ≥ 100')
      return
    }
    setLoading(true)
    setMessage('')
    try {
      // Abort any in-flight request before starting a new one
      if (controllerRef.current) controllerRef.current.abort()
      const controller = new AbortController()
      controllerRef.current = controller
      const id = setTimeout(() => controller.abort(), 10000)
      const res = await fetch(`/api/earn/problem?level=${encodeURIComponent(lvl)}` , {
        signal: controller.signal,
        cache: 'no-store',
        credentials: 'same-origin'
      })
      clearTimeout(id)
      const data = await res.json()
      if (res.ok) {
        setProblem(data)
        setAnswer('')
      } else {
        setMessage(data.error || 'Failed to load problem')
      }
    } catch (e) {
      if (e?.name === 'AbortError') {
        setMessage('Request timed out. Try again.')
      } else {
        setMessage('Network error')
      }
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
      if (!problem) return
      // Abort any in-flight request before starting a new one
      if (controllerRef.current) controllerRef.current.abort()
      const controller = new AbortController()
      controllerRef.current = controller
      const id = setTimeout(() => controller.abort(), 10000)
      const res = await fetch('/api/earn/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: problem.token, answer }),
        signal: controller.signal,
        cache: 'no-store',
        credentials: 'same-origin'
      })
      clearTimeout(id)
      const data = await res.json()
      if (res.ok) {
        setCoins(data.user.coins)
        setMessage(`✅ Correct! +${data.reward} coins. New total: ${data.user.coins}`)
        // Do not auto-fetch a new problem to avoid looped requests
        setProblem(null)
        setAnswer('')
      } else {
        setMessage(`❌ ${data.error || 'Incorrect answer'}`)
      }
    } catch (e) {
      if (e?.name === 'AbortError') {
        setMessage('Request timed out. Try again.')
      } else {
        setMessage('Network error')
      }
    } finally {
      setLoading(false)
    }
  }

  // Cleanup any pending request on unmount
  useEffect(() => {
    return () => {
      if (controllerRef.current) controllerRef.current.abort()
    }
  }, [])

  return (
    <div className="space-y-3 sm:space-y-4 max-w-xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-white">
        <span>Coins:</span>
        <strong>{coins}</strong>
        {earningDisabled && <span className="text-red-400">(Limit reached)</span>}
      </div>

      <div className="flex items-center gap-2 flex-wrap text-sm text-white">
        <label htmlFor="level">Difficulty:</label>
        <select id="level" className="bg-emerald-700 text-white border border-emerald-500 px-2 py-1 rounded" value={level} onChange={(e) => setLevel(e.target.value)} disabled={earningDisabled}>
          <option value="easy">Easy: mixed + and − — +5</option>
          <option value="medium">Medium: × and ÷ (integer result) — +10</option>
          <option value="hard">Hard: PEMDAS (parentheses/exponents) — +50</option>
        </select>
        <button className="bg-gray-600 text-white px-2 py-1 rounded" onClick={() => fetchProblem(level)} disabled={loading || earningDisabled}>New</button>
        {loading && (
          <button
            className="bg-gray-400 text-white px-2 py-1 rounded"
            onClick={() => controllerRef.current?.abort()}
            type="button"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="border rounded p-3 sm:p-4">
        <p className="mb-2 text-sm text-white">Solve to earn coins:</p>
        {problem ? (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base sm:text-lg font-semibold text-white">{problem.expression} =</span>
            <input
              type="number"
              className="border px-2 py-1 rounded w-24"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && answer !== '' && !loading && !earningDisabled) {
                  submit()
                }
              }}
            />
            <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={submit} disabled={loading || answer === '' || earningDisabled}>Submit</button>
          </div>
        ) : (
          <p className="text-sm text-white">No problem loaded. Click "New" to start.</p>
        )}
      </div>

      <div className="min-h-[20px]">
        {message && <p className="text-sm text-white">{message}</p>}
      </div>
    </div>
  )
}
