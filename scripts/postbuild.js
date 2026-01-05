// Create a stub middleware trace file to satisfy Vercel's builder
import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

try {
  const dir = join('.next', 'server')
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  const target = join(dir, 'middleware.js.nft.json')
  if (!existsSync(target)) {
    writeFileSync(target, JSON.stringify({ files: [], reasons: [] }, null, 2))
    console.log('Created stub:', target)
  } else {
    console.log('Stub already exists:', target)
  }
} catch (err) {
  console.error('Postbuild failed to create middleware trace stub:', err)
}
