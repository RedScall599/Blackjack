// Math challenge utilities for earning coins
import { createHmac, randomInt } from 'node:crypto'

const SECRET = process.env.CHALLENGE_SECRET || 'dev-secret'

function sign(payload) {
  const data = JSON.stringify(payload)
  const signature = createHmac('sha256', SECRET).update(data).digest('hex')
  const token = Buffer.from(data).toString('base64') + '.' + signature
  return token
}

function verify(token) {
  if (typeof token !== 'string' || !token.includes('.')) return null
  const [b64, sig] = token.split('.')
  try {
    const dataStr = Buffer.from(b64, 'base64').toString('utf8')
    const payload = JSON.parse(dataStr)
    const expectedSig = createHmac('sha256', SECRET).update(dataStr).digest('hex')
    if (sig !== expectedSig) return null
    if (Date.now() > payload.exp) return null
    return payload
  } catch {
    return null
  }
}

export function createProblem(userId, level = 'easy') {
  // Harder difficulties per request:
  // easy: mixed addition and subtraction with 3 terms
  // medium: multiplication and division (integer result)
  // hard: PEMDAS with parentheses and optional exponent
  let reward = 5
  const ttlMs = 2 * 60 * 1000

  let expression = ''
  let expected = 0

  if (level === 'easy') {
    reward = 5
    const a = randomInt(1, 21)
    const b = randomInt(1, 21)
    const c = randomInt(1, 21)
    const ops = ['+', '-']
    const op1 = ops[randomInt(0, ops.length)]
    const op2 = ops[randomInt(0, ops.length)]
    // Left-to-right for + and -
    expected = op1 === '+' ? a + b : a - b
    expected = op2 === '+' ? expected + c : expected - c
    expression = `${a} ${op1} ${b} ${op2} ${c}`
  } else if (level === 'medium') {
    reward = 10
    const a = randomInt(2, 13)
    const b = randomInt(2, 13)
    const product = a * b
    // Choose a divisor of product to keep integer division
    const divisors = []
    for (let d = 2; d <= 12; d++) {
      if (product % d === 0) divisors.push(d)
    }
    const c = divisors.length ? divisors[randomInt(0, divisors.length)] : 2
    expected = product / c
    expression = `${a} × ${b} ÷ ${c}`
  } else if (level === 'hard') {
    reward = 50
    const pattern = randomInt(0, 3)
    const a = randomInt(2, 11)
    const b = randomInt(2, 11)
    const c = randomInt(2, 11)
    const d = randomInt(1, 10)
    const e = randomInt(2, 5) // small exponent
    if (pattern === 0) {
      // (a + b) * c - d
      expected = (a + b) * c - d
      expression = `(${a} + ${b}) × ${c} − ${d}`
    } else if (pattern === 1) {
      // a + b * (c - d)
      expected = a + b * (c - d)
      expression = `${a} + ${b} × (${c} − ${d})`
    } else {
      // (a - b)^e + c
      const diff = a - b
      expected = Math.pow(diff, e) + c
      expression = `(${a} − ${b}) ^ ${e} + ${c}`
    }
  } else {
    // fallback to easy
    const a = randomInt(1, 21)
    const b = randomInt(1, 21)
    expected = a + b
    expression = `${a} + ${b}`
  }

  const payload = { expression, expected, reward, userId, exp: Date.now() + ttlMs }
  const token = sign(payload)
  return { expression, token, reward }
}

export function verifySolution(token, answer, userId) {
  const payload = verify(token)
  if (!payload) return { valid: false, reason: 'Invalid or expired challenge' }
  if (payload.userId !== userId) return { valid: false, reason: 'Challenge not for this user' }
  if (Number(answer) === Number(payload.expected)) {
    return { valid: true, reward: payload.reward }
  }
  return { valid: false, reason: 'Incorrect answer' }
}
