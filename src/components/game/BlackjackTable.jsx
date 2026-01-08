"use client"
import { useEffect, useState } from 'react'
import { useGame } from '@/hooks/use-game'
import PlayingCard from '@/components/game/PlayingCard'
import CoinRain from '@/components/ui/CoinRain'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

export default function BlackjackTable({ initialCoins }) {
  const { player, dealer, dealerRevealed, playerTotal, dealerTotal, bet, setBet, result, deal, hit, stand, resetDeck } = useGame()
  const [coins, setCoins] = useState(initialCoins ?? 100)
  const [message, setMessage] = useState('')
  const [showCoins, setShowCoins] = useState(false)
  const [resetWarned, setResetWarned] = useState(false)
  const canPlay = coins > 0 && bet > 0 && bet <= coins
  const isActive = player.length > 0 && !result
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalDesc, setModalDesc] = useState('')
  const [modalVariant, setModalVariant] = useState('') // 'win' | 'lose' | 'push' | 'forfeit' | 'error'
  const [bannerOpen, setBannerOpen] = useState(false)
  const [bannerVariant, setBannerVariant] = useState('default') // success | error | warning
  const [bannerTitle, setBannerTitle] = useState('')
  const [bannerDesc, setBannerDesc] = useState('')

  function titleClass() {
    if (modalVariant === 'win') return 'text-green-700'
    if (modalVariant === 'lose') return 'text-red-700'
    if (modalVariant === 'forfeit') return 'text-red-700'
    if (modalVariant === 'push') return 'text-gray-800'
    if (modalVariant === 'error') return 'text-red-700'
    return ''
  }

  async function persistResult(finalResult, opts = {}) {
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
        const change = finalResult === 'win' ? bet : finalResult === 'lose' ? -bet : 0
        let title = ''
        let desc = ''
        if (opts.forfeit) {
          title = 'Forfeit'
          desc = `You forfeited the hand. Bet lost (−${bet}).`
          setBannerVariant('error')
        } else if (finalResult === 'win') {
          title = 'You Win!'
          desc = `+${change} coins. New balance: ${data.user.coins}.`
          setBannerVariant('success')
        } else if (finalResult === 'lose') {
          title = 'You Lose'
          desc = `${change} coins. New balance: ${data.user.coins}.`
          setBannerVariant('error')
        } else {
          title = 'Push'
          desc = `No coin change. Balance: ${data.user.coins}.`
          setBannerVariant('default')
        }
        setBannerTitle(title)
        setBannerDesc(desc)
        setBannerOpen(true)
        // Fetch Jack of AI feedback to append guidance
        try {
          const dealerUpcard = dealer && dealer.length ? dealer[0] : null
          const fbRes = await fetch('/api/ai/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              result: finalResult,
              playerTotal,
              dealerUpcard,
              betAmount: bet,
              moves: { hits: player.filter(Boolean).length - 2, stands: 1 }
            })
          })
          const fbData = await fbRes.json()
          if (fbRes.ok) {
            const extra = fbData.feedbackText
              ? fbData.feedbackText
              : `${fbData.feedback?.title ? fbData.feedback.title + ' ' : ''}${fbData.feedback?.summary || ''}`
            if (extra) {
              setBannerDesc(`${desc} Jack of AI: ${extra}`)
            }
          }
        } catch (_) {}
      } else {
        setMessage(data.error || 'Error saving game')
        setBannerVariant('error')
        setBannerTitle('Error')
        setBannerDesc(data.error || 'Error saving game result.')
        setBannerOpen(true)
      }
    } catch (e) {
      setMessage('Network error')
      setBannerVariant('error')
      setBannerTitle('Network Error')
      setBannerDesc('Could not save the game result. Please try again.')
      setBannerOpen(true)
    }
  }

  function onDeal() {
    if (isActive) {
      setMessage('Finish the current hand before dealing again.')
      return
    }
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
    // Close the banner when starting a new deal
    setBannerOpen(false)
    deal()
  }

  async function onStand() {
    stand()
  }

  async function onHit() {
    hit()
  }

  async function onReset() {
    // If a hand is active (no result yet), warn once, then forfeit on second press
    if (isActive) {
      if (!resetWarned) {
        setResetWarned(true)
        setMessage('Game is active. Press reset again to forfeit your bet.')
        return
      }
      // Forfeit: record a loss with current bet, then reset
      // Show immediate modal feedback, then persist
      setModalVariant('forfeit')
      setModalTitle('Forfeit')
      setModalDesc(`You forfeited the hand. Bet lost (−${bet}). Saving...`)
      setModalOpen(true)
      await persistResult('lose', { forfeit: true })
      resetDeck()
      setResetWarned(false)
      setMessage('Hand forfeited. Bet lost.')
      return
    }
    // No active hand: just reset
    resetDeck()
    setResetWarned(false)
    setMessage('Deck reset.')
  }

  // Persist when a round concludes and show slide-down banner
  useEffect(() => {
    if (result === 'win' || result === 'lose' || result === 'push') {
      // Show banner immediately with saving text, then update after save
      setBannerVariant(result === 'win' ? 'success' : result === 'lose' ? 'error' : 'default')
      setBannerTitle(result === 'win' ? 'You Win!' : result === 'lose' ? 'You Lose' : 'Push')
      setBannerDesc('Saving result... Fetching feedback...')
      setBannerOpen(true)
      persistResult(result)
      setResetWarned(false)
    }
  }, [result])

  // Trigger coin rain on win
  useEffect(() => {
    if (result === 'win') {
      setShowCoins(true)
      const t = setTimeout(() => setShowCoins(false), 2500)
      return () => clearTimeout(t)
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
      {/* Slide-down banner from top */}
      <div className={`fixed top-0 left-0 right-0 z-[60] flex justify-center transition-transform duration-700 ${bannerOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className={
          `mx-4 my-2 w-full max-w-xl rounded-lg border shadow-lg p-4 ` +
          (bannerVariant === 'success' ? 'bg-green-50 border-green-200 text-green-900' :
           bannerVariant === 'error' ? 'bg-red-50 border-red-200 text-red-900' :
           bannerVariant === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-900' :
           'bg-white border-gray-200 text-gray-900')
        }>
          <div className="flex items-start justify-between gap-3">
            <div className="grid gap-1">
              <div className="text-lg font-bold tracking-wide">{bannerTitle}</div>
              <div className="text-sm opacity-90">{bannerDesc}</div>
            </div>
            <button className="text-sm px-2 py-1 rounded bg-gray-800 text-white" onClick={() => setBannerOpen(false)}>Close</button>
          </div>
        </div>
      </div>
      {showCoins && <CoinRain count={28} durationMs={2600} />}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent onClose={() => setModalOpen(false)}>
          <DialogHeader>
            <DialogTitle className={`text-2xl ${titleClass()}`}>{modalTitle}</DialogTitle>
            <DialogDescription className="text-base">{modalDesc}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setModalOpen(false)}>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Spacer for content to not jump under banner */}
      <div className="pt-16" />
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1">
          {/* Coin icon */}
          <svg aria-hidden="true" focusable="false" className="w-4 h-4" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="coinGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#E6B800" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill="url(#coinGrad)" stroke="#C9A200" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="6.5" fill="none" stroke="#F7D24A" strokeWidth="1" />
          </svg>
          Coins:
        </span>
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
        <button className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50" onClick={onDeal} disabled={!canPlay || isActive}>Deal</button>
        <button className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50" onClick={onHit} disabled={!player.length || !!result || !canPlay}>Hit</button>
        <button className="bg-yellow-600 text-white px-3 py-1 rounded disabled:opacity-50" onClick={onStand} disabled={!player.length || !!result || !canPlay}>Stand</button>
        <button className="bg-gray-600 text-white px-3 py-1 rounded" onClick={onReset}>Reset</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-semibold">Player Hand</h3>
            <span className="inline-flex items-center rounded-full bg-emerald-700 text-white px-3 py-1 text-sm font-bold shadow">
              Total: {playerTotal}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {player.map((c, i) => (
              <PlayingCard key={i} card={c} size="lg" />
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-semibold">Dealer Hand</h3>
            {dealerRevealed ? (
              <span className="inline-flex items-center rounded-full bg-slate-800 text-white px-3 py-1 text-sm font-bold shadow">
                Total: {dealerTotal}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-slate-200 text-slate-900 px-3 py-1 text-sm font-semibold shadow">
                Showing: {dealer.length ? `${dealer[0].rank}${dealer[0].suit}` : '—'}
              </span>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {dealer.map((c, i) => (
              <PlayingCard key={i} card={c} size="lg" faceDown={!dealerRevealed && i === 1} />
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-[24px]">
        {!canPlay && !result && (
          <p className="text-sm text-red-600">{coins <= 0 ? 'Out of coins. Increase balance to play.' : 'Adjust bet to be within available coins.'}</p>
        )}
        {message && <p className="text-sm text-black">{message}</p>}
      </div>
    </div>
  )
}
