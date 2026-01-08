// Jack of AI — Facts API: Fun and technical Blackjack facts
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

const OPEN_API_URL = 'https://api.openai.com/v1/chat/completions'
const MODEL = 'gpt-4o-mini'

const FUN_FACTS = [
  'Blackjack is also called “21” and dates back to 18th‑century France.',
  'An Ace can be 1 or 11, making “soft” hands more flexible.',
  'Casinos often shuffle multiple decks (4–8) to reduce card counting.',
  'A “blackjack” is Ace + ten-value card and pays extra in many rules.',
  'Early versions offered a 10:1 bonus for Jack of spades + Ace of spades.',
  'Players act before the dealer, which gives the house edge.',
  'Card counting isn’t illegal, but casinos can ask counters to stop playing.',
]
const TECH_FACTS = [
  'Basic strategy minimizes house edge to around 0.5% with perfect play.',
  'Dealer bust odds are highest showing 5 or 6 (~42%).',
  'Standing on 12 vs dealer 2–3 is usually better than hitting due to bust risk.',
  'House edge rises with more decks; shoe games often use 6–8 decks.',
  'Soft 18 vs dealer 9–A is often a hit in basic strategy.',
  'Surrender can reduce losses; optimal with 16 vs dealer 9–A in many charts.',
  'Counting systems like Hi-Lo track high vs low cards to adjust bets.',
]

function pickUnique(history, list) {
  const seen = new Set((history || []).map(s => String(s).toLowerCase()))
  const shuffled = [...list].sort(() => Math.random() - 0.5)
  for (const item of shuffled) {
    const key = String(item).toLowerCase()
    if (!seen.has(key)) return item
  }
  return list[Math.floor(Math.random() * list.length)]
}

function localFacts() {
  const fun = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]
  const tech = TECH_FACTS[Math.floor(Math.random() * TECH_FACTS.length)]
  return { funFact: fun, technicalFact: tech }
}

export async function GET(request) {
  // Auth optional for site-wide facts; but keep session check if cookie exists
  const sessionToken = request.cookies.get('session')?.value
  if (sessionToken) {
    const session = await getSession(sessionToken)
    if (!session) {
      // Allow anonymous facts to keep it site-wide usable
    }
  }

  // Read previous facts history from cookie to encourage novelty
  let history = []
  const histCookie = request.cookies.get('factsHist')?.value
  if (histCookie) {
    try { history = JSON.parse(decodeURIComponent(histCookie)) || [] } catch {}
  }

  const apiKey = process.env.OPEN_API_KEY
  if (!apiKey) {
    const fun = pickUnique(history, FUN_FACTS)
    const tech = pickUnique([...history, fun], TECH_FACTS)
    const updated = [...history, fun, tech].slice(-20)
    const resp = NextResponse.json({ source: 'local', funFact: fun, technicalFact: tech }, { status: 200 })
    resp.cookies.set('factsHist', encodeURIComponent(JSON.stringify(updated)), { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 })
    return resp
  }

  try {
    const res = await fetch(OPEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.9,
        messages: [
          { role: 'system', content: 'You are Jack of AI. Provide two short lines: one fun Blackjack fact and one technical fact. Each under 20 words. Facts must be semantically different from any in provided history. Avoid rewording the same idea.' },
          { role: 'user', content: JSON.stringify({ task: 'facts', history }) }
        ]
      })
    })

    if (!res.ok) {
      return NextResponse.json({ source: 'local', ...localFacts(), error: 'AI request failed' }, { status: 200 })
    }
    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content?.trim() || ''
    let fun, tech
    try {
      const obj = JSON.parse(text)
      fun = obj.funFact || obj.fun || obj.fun_fact
      tech = obj.technicalFact || obj.tech || obj.technical_fact
    } catch {
      const parts = text.split(/\n+/).map(s => s.trim()).filter(Boolean)
      fun = parts[0]
      tech = parts[1]
    }
    if (!fun || !tech) {
      const lf = localFacts()
      fun = fun || lf.funFact
      tech = tech || lf.technicalFact
    }
    const updated = [...history, fun, tech].slice(-20)
    const resp = NextResponse.json({ source: 'ai', funFact: fun, technicalFact: tech }, { status: 200 })
    resp.cookies.set('factsHist', encodeURIComponent(JSON.stringify(updated)), { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 })
    return resp
  } catch (e) {
    const fun = pickUnique(history, FUN_FACTS)
    const tech = pickUnique([...history, fun], TECH_FACTS)
    const updated = [...history, fun, tech].slice(-20)
    const resp = NextResponse.json({ source: 'local', funFact: fun, technicalFact: tech }, { status: 200 })
    resp.cookies.set('factsHist', encodeURIComponent(JSON.stringify(updated)), { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 })
    return resp
  }
}
