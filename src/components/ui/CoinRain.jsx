"use client"
import { useMemo } from 'react'

export default function CoinRain({ count = 24, durationMs = 3000 }) {
  const coins = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100
      const delay = Math.floor(Math.random() * 800)
      const size = 16 + Math.floor(Math.random() * 16)
      const dur = durationMs + Math.floor(Math.random() * 1000)
      return { id: i, left, delay, size, dur }
    })
  }, [count, durationMs])

  return (
    <div className="coin-rain fixed inset-0 pointer-events-none z-50">
      {coins.map((c) => (
        <div
          key={c.id}
          className="coin-rain__coin"
          style={{
            left: `${c.left}%`,
            ['--coin-delay']: `${c.delay}ms`,
            ['--coin-size']: `${c.size}px`,
            ['--coin-duration']: `${c.dur}ms`
          }}
        />
      ))}
    </div>
  )
}
