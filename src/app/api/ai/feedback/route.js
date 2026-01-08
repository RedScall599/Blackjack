// Jack of AI — Feedback API: Post-round messages (win/lose/push)
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export const runtime = 'nodejs'

const OPEN_API_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL = 'gpt-4o-mini'

function dealerBustProb(upcardValue) {
  // Rough dealer bust probabilities by upcard (approximate, for educational feedback)
  const map = {
    2: 0.35,
    3: 0.37,
    4: 0.40,
    5: 0.42,
    6: 0.42,
    7: 0.26,
    8: 0.24,
    9: 0.23,
    10: 0.21,
    11: 0.12 // Ace
  }
  return map[upcardValue] ?? 0.21
}

function localFeedback({ result, playerTotal, dealerUpcardValue, betAmount, moves }) {
  const dealerProb = dealerBustProb(dealerUpcardValue)
  const hits = moves?.hits ?? 0
  const stands = moves?.stands ?? 0
  const bet = Number(betAmount) || 0

  if (result === 'win') {
    return {
      title: 'Good job! 🎉',
      summary: `You won with ${playerTotal}. Dealer upcard ${dealerUpcardValue} has ~${Math.round(dealerProb * 100)}% bust chance.`,
      detail: `Stands: ${stands}, Hits: ${hits}. Bankroll note: consider keeping bet size consistent; you gained +${bet} coins.`
    }
  }
  if (result === 'lose') {
    return {
      title: 'Dang it! 💥',
      summary: `You lost with ${playerTotal}. Against ${dealerUpcardValue}, dealer bust chance is ~${Math.round(dealerProb * 100)}%.`,
      detail: `Stands: ${stands}, Hits: ${hits}. Review basic strategy for this matchup to reduce bust risk next time.`
    }
  }
  return {
    title: 'Push 🤝',
    summary: `Totals tied. No coin change. Dealer upcard ${dealerUpcardValue} bust chance ~${Math.round(dealerProb * 100)}%.`,
    detail: 'Neutral outcome. Focus on consistent decisions across hands.'
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
    const { result, playerTotal, dealerUpcard, betAmount, moves } = body || {}

    const total = Number(playerTotal)
    const bet = Number(betAmount)
    if (!['win', 'lose', 'push'].includes(result)) {
      return NextResponse.json({ error: 'Invalid result' }, { status: 400 })
    }
    if (!Number.isFinite(total) || total <= 0) {
      return NextResponse.json({ error: 'Invalid player total' }, { status: 400 })
    }

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
      const fb = localFeedback({ result, playerTotal: total, dealerUpcardValue: dealerValue, betAmount: bet, moves })
      return NextResponse.json({ source: 'local', feedback: fb }, { status: 200 })
    }

    const system = 'You are Jack of AI, a concise Blackjack coach. Provide a short win/lose/push message with one sentence summary and one sentence technical note (e.g., dealer bust odds, basic strategy rationale).'
    const user = {
      role: 'user',
      content: JSON.stringify({ result, playerTotal: total, dealerUpcardValue: dealerValue, betAmount: bet, moves })
    }

    const res = await fetch(OPEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ model: MODEL, temperature: 0.2, messages: [ { role: 'system', content: system }, user ] })
    })

    if (!res.ok) {
      const fb = localFeedback({ result, playerTotal: total, dealerUpcardValue: dealerValue, betAmount: bet, moves })
      return NextResponse.json({ source: 'local', feedback: fb, error: 'AI request failed' }, { status: 200 })
    }

    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content?.trim() || ''
    return NextResponse.json({ source: 'ai', feedbackText: text }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
