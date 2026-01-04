// AI Advice API - Blackjack guidance based on game state
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

const OPEN_API_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL = 'gpt-4o-mini'

function basicStrategyAdvice({ playerTotal, dealerUpcardValue, betAmount }) {
  // Very simplified basic strategy (no splits/doubles; soft-hand detection omitted)
  const dealer = dealerUpcardValue ?? 10
  const player = Number(playerTotal)
  const bet = Number(betAmount)
  let action = 'hit'
  let rationale = ''

  if (!Number.isFinite(player) || player <= 0) {
    return { action: 'unknown', rationale: 'Invalid player total.' }
  }

  if (player >= 17) {
    action = 'stand'
    rationale = 'Total ≥ 17 typically stands to avoid high bust risk.'
  } else if (player >= 13 && player <= 16 && dealer <= 6) {
    action = 'stand'
    rationale = 'Stand 13–16 vs dealer 2–6; dealer more likely to bust.'
  } else if (player === 12 && dealer >= 4 && dealer <= 6) {
    action = 'stand'
    rationale = 'Stand 12 vs 4–6; below that or ≥7, hit to avoid dealer advantage.'
  } else {
    action = 'hit'
    rationale = 'Hit below 17 against strong dealer upcards; improve total.'
  }

  return {
    action,
    rationale,
    notes: 'This is a simplified guideline without soft-hand or pair logic.',
    suggestedBetAdjustment: bet > 0 ? 'Keep bet size consistent unless bankroll demands change.' : undefined
  }
}

export async function POST(request) {
  // API Auth Pattern (REQUIRED)
  const sessionToken = request.cookies.get('session')?.value
  const session = await getSession(sessionToken)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      playerHand,
      dealerHand,
      playerTotal,
      dealerUpcard, // e.g., { rank: 'K' } or numeric 10
      betAmount
    } = body || {}

    // Minimal validation
    const bet = Number(betAmount)
    const total = Number(playerTotal)
    if (!Number.isFinite(total) || total <= 0) {
      return NextResponse.json({ error: 'Invalid player total' }, { status: 400 })
    }
    if (!Number.isFinite(bet) || bet <= 0) {
      return NextResponse.json({ error: 'Invalid bet amount' }, { status: 400 })
    }

    // Map dealer upcard to a value (A=11 for advisory; face cards=10)
    const dealerValue = (() => {
      if (typeof dealerUpcard === 'number') return dealerUpcard
      const r = (dealerUpcard && dealerUpcard.rank ? String(dealerUpcard.rank).toUpperCase() : '').trim()
      if (r === 'A') return 11
      if (['K', 'Q', 'J'].includes(r)) return 10
      const n = Number(r)
      if (Number.isFinite(n) && n > 1 && n <= 10) return n
      return 10
    })()

    const apiKey = process.env.OPEN_API_KEY
    if (!apiKey) {
      // Fallback: local advice
      const advice = basicStrategyAdvice({ playerTotal: total, dealerUpcardValue: dealerValue, betAmount: bet })
      return NextResponse.json({ source: 'local', advice }, { status: 200 })
    }

    // Build structured prompt for AI
    const system = 'You are a concise Blackjack advisor. Use standard Blackjack rules. Provide a one-sentence action (Hit/Stand) and a brief rationale referencing player total and dealer upcard. Avoid illegal moves; no splits/doubles unless explicitly asked.'
    const user = {
      role: 'user',
      content: JSON.stringify({
        context: 'Provide Hit or Stand guidance and a short rationale.',
        playerHand: playerHand ?? null,
        dealerHand: dealerHand ?? null,
        playerTotal: total,
        dealerUpcardValue: dealerValue,
        betAmount: bet
      })
    }

    const res = await fetch(OPEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        messages: [
          { role: 'system', content: system },
          user
        ]
      })
    })

    if (!res.ok) {
      const fallback = basicStrategyAdvice({ playerTotal: total, dealerUpcardValue: dealerValue, betAmount: bet })
      return NextResponse.json({ source: 'local', advice: fallback, error: 'AI request failed' }, { status: 200 })
    }

    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content?.trim() || ''

    return NextResponse.json({ source: 'ai', adviceText: text }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
