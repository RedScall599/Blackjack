"use client"
import { useEffect, useState } from 'react'
import { useGame } from '@/hooks/use-game'
import PlayingCard from '@/components/game/PlayingCard'

export default function BlackjackTable({ initialCoins }) {
  const { player, dealer, playerTotal, dealerTotal, bet, setBet, result, deal, hit, stand, resetDeck } = useGame()
  const [coins, setCoins] = useState(initialCoins ?? 100)
  const [message, setMessage] = useState('')
  const canPlay = coins > 0 && bet > 0 && bet <= coins

  async function persistResult(finalResult) {
    try {
      const res = await fetch('/api/game/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ betAmount: bet, result: finalResult })
      })
      const data = await res.json()
      if (res.ok) {
        setCoins(data.user.coins)
        setMessage(`Round saved: ${finalResult.toUpperCase()} | Coins: ${data.user.coins}`)
      } else {
        setMessage(data.error || 'Error saving game')
      }
    } catch (e) {
      setMessage('Network error')
    }
  }

  function onDeal() {
    if (bet <= 0) {
      setMessage('Bet must be > 0')
      return
    }
    if (coins <= 0) {
      setMessage('You have no coins')
      return
    }
    if (bet > coins) {
      setMessage('Bet exceeds available coins')
      return
    }
    setMessage('')
    deal()
  }

  async function onStand() {
    stand()
  }

  async function onHit() {
    hit()
  }

  // Persist when a round concludes
  useEffect(() => {
    if (result === 'win' || result === 'lose' || result === 'push') {
      persistResult(result)
    }
  }, [result])

  // Auto-resolve when player hits exactly 21: stand immediately
  useEffect(() => {
    if (!result && player.length && playerTotal === 21) {
      stand()
    }
  }, [playerTotal, player.length, result])

  return (
    <div className="space-y-4">
      {/* Top result banner */}
      <div className="min-h-[44px]">
        {result && (
          <div
            className={
              `text-3xl font-bold tracking-wide ` +
              (result === 'win'
                ? 'text-green-700'
                : result === 'lose'
                ? 'text-red-700'
                : 'text-gray-700')
            }
          >
            {result.toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span>Coins:</span>
        <strong>{coins}</strong>
        <span>Bet:</span>
        <input
          type="number"
          className="border px-2 py-1 rounded w-24"
          value={bet}
          min={1}
          max={coins}
          onChange={(e) => {
            let v = Number(e.target.value)
            if (!Number.isFinite(v)) v = 1
            v = Math.max(1, Math.min(v, coins))
            setBet(v)
          }}
        />
        <button className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50" onClick={onDeal} disabled={!canPlay}>Deal</button>
        <button className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50" onClick={onHit} disabled={!player.length || !!result || !canPlay}>Hit</button>
        <button className="bg-yellow-600 text-white px-3 py-1 rounded disabled:opacity-50" onClick={onStand} disabled={!player.length || !!result || !canPlay}>Stand</button>
        <button className="bg-gray-600 text-white px-3 py-1 rounded" onClick={resetDeck}>Reset</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold">Player Hand ({playerTotal})</h3>
          <div className="flex gap-2 flex-wrap">
            {player.map((c, i) => (
              <PlayingCard key={i} card={c} size="lg" />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Dealer Hand ({dealerTotal})</h3>
          <div className="flex gap-2 flex-wrap">
            {dealer.map((c, i) => (
              <PlayingCard key={i} card={c} size="lg" />
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-[24px]">
        {!canPlay && !result && (
          <p className="text-sm text-red-600">{coins <= 0 ? 'Out of coins. Increase balance to play.' : 'Adjust bet to be within available coins.'}</p>
        )}
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  )
}
