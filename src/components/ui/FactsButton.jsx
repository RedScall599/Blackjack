"use client"
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

export default function FactsButton() {
  const [open, setOpen] = useState(false)
  const [fun, setFun] = useState('')
  const [tech, setTech] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadFacts() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/ai/facts?t=${Date.now()}`, { cache: 'no-store' })
      const data = await res.json()
      if (res.ok) {
        setFun(data.funFact || '')
        setTech(data.technicalFact || '')
      } else {
        setError(data.error || 'Failed to load facts')
      }
    } catch (e) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) loadFacts()
  }, [open])

  return (
    <>
      <button
        aria-label="Jack of AI facts"
        className="fixed bottom-4 right-4 z-50 rounded-full bg-purple-700 text-white px-4 py-3 shadow-lg hover:bg-purple-800 focus:outline-none"
        onClick={() => setOpen(true)}
      >
        Facts
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Jack of AI Facts</DialogTitle>
            <DialogDescription>Fun and technical notes about Blackjack from Jack of AI.</DialogDescription>
          </DialogHeader>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Fun Fact</p>
                <p>{fun}</p>
              </div>
              <div>
                <p className="font-semibold">Technical Fact</p>
                <p>{tech}</p>
              </div>
            </div>
          )}
          <DialogFooter className="flex items-center gap-2">
            <button className="bg-purple-700 text-white px-4 py-2 rounded" onClick={loadFacts} disabled={loading}>
              {loading ? 'Loading…' : 'New Facts'}
            </button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={() => setOpen(false)}>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
