'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui'
import { HoneypotInput } from '@/components/honeypot-input'

interface InlineNewsletterCTAProps {
  className?: string
}

export function InlineNewsletterCTA({ className }: InlineNewsletterCTAProps) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || "You're in! Check your inbox.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  return (
    <div className={`not-prose border border-secondary-200 bg-white p-5 sm:p-6 ${className || ''}`}>
      <div className="sm:flex sm:items-center sm:gap-6">
        <div className="sm:flex-1">
          <p className="font-serif text-base font-bold text-black">
            Get the Aged Lead Playbook
          </p>
          <p className="mt-1 text-sm text-secondary-500">
            Weekly scripts, strategies, and insider tips. Free.
          </p>
        </div>

        {status === 'success' ? (
          <p className="mt-3 text-sm font-semibold text-green-700 sm:mt-0">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3 flex gap-2 sm:mt-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="h-10 w-full min-w-0 max-w-[220px] px-3 text-sm border-2 border-secondary-300 bg-white text-black placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
            <HoneypotInput value={website} onChange={setWebsite} />
            <Button type="submit" variant="primary" size="sm" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : 'Subscribe'}
            </Button>
          </form>
        )}
      </div>

      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">{message}</p>
      )}
    </div>
  )
}
