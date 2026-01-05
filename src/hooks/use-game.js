// Blackjack game hook (client)
'use client'

import { useMemo, useState } from 'react'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildDeck() {
  const suits = ['♠', '♥', '♦', '♣']
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  const deck = []
  for (const s of suits) {
    for (const r of ranks) {
      deck.push({ rank: r, suit: s })
    }
  }
  return deck
}

function shuffle(array) {
  const a = array.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function cardValue(rank) {
  if (rank === 'A') return 11
  if (['K', 'Q', 'J'].includes(rank)) return 10
  return Number(rank)
}

function handTotals(hand) {
  // Ace can be 1 or 11
  let total = 0
  let aces = 0
  for (const c of hand) {
    total += cardValue(c.rank)
    if (c.rank === 'A') aces += 1
  }
  while (total > 21 && aces > 0) {
    total -= 10
    aces -= 1
  }
  return total
}

export function useGame() {
  const [deck, setDeck] = useState(() => shuffle(buildDeck()))
  const [player, setPlayer] = useState([])
  const [dealer, setDealer] = useState([])
  const [dealerRevealed, setDealerRevealed] = useState(false)
  const [bet, setBet] = useState(10)
  const [result, setResult] = useState(null) // 'win' | 'lose' | 'push'
  const playerTotal = useMemo(() => handTotals(player), [player])
  const dealerTotal = useMemo(() => handTotals(dealer), [dealer])

  async function deal() {
    // Stage the initial deal so the dealer's card shows first
    let d = deck.slice()
    const p = []
    const dl = []
    setPlayer([])
    setDealer([])
    setDealerRevealed(false)
    setResult(null)

    // Dealer first card
    dl.push(d.pop())
    setDealer(dl.slice())
    setDeck(d.slice())
    await sleep(350)

    // Player first card
    p.push(d.pop())
    setPlayer(p.slice())
    setDeck(d.slice())
    await sleep(350)

    // Dealer second card (face-down by UI until reveal)
    dl.push(d.pop())
    setDealer(dl.slice())
    setDeck(d.slice())
    await sleep(350)

    // Player second card
    p.push(d.pop())
    setPlayer(p.slice())
    setDeck(d.slice())
  }

  function hit() {
    if (result) return
    const d = deck.slice()
    const p = player.concat(d.pop())
    setDeck(d)
    setPlayer(p)
    if (handTotals(p) > 21) {
      setResult('lose')
    }
  }

  async function stand() {
    if (result) return
    // Reveal dealer hole card
    setDealerRevealed(true)
    // Dealer hits until 17 (sequential with delay)
    let d = deck.slice()
    let dl = dealer.slice()
    while (handTotals(dl) < 17 && d.length) {
      await sleep(500)
      dl = dl.concat(d.pop())
      setDeck(d.slice())
      setDealer(dl.slice())
    }
    const pt = handTotals(player)
    const dt = handTotals(dl)
    if (dt > 21) setResult('win')
    else if (pt > dt) setResult('win')
    else if (pt < dt) setResult('lose')
    else setResult('push')
  }

  function resetDeck() {
    setDeck(shuffle(buildDeck()))
    setPlayer([])
    setDealer([])
    setDealerRevealed(false)
    setResult(null)
  }

  return {
    deck,
    player,
    dealer,
    dealerRevealed,
    playerTotal,
    dealerTotal,
    bet,
    setBet,
    result,
    deal,
    hit,
    stand,
    resetDeck
  }
}
