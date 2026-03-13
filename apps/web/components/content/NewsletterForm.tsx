'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

interface NewsletterFormProps {
  title?: string
  description?: string
  className?: string
  variant?: 'inline' | 'stacked'
}

export function NewsletterForm({
  title = 'Get the Aged Lead Playbook',
  description = 'Weekly strategies, scripts, and insider tips for turning aged leads into closed deals. Join free.',
  className,
  variant = 'stacked',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
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
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'You\'re in! Check your inbox.')
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
    <div
      id="newsletter"
      className={cn(
        'rounded-none bg-secondary-100 p-8 sm:p-10',
        className
      )}
    >
      <div className={cn(variant === 'inline' ? 'sm:flex sm:items-center sm:justify-between sm:gap-8' : 'text-center')}>
        <div className={cn(variant === 'inline' ? 'sm:flex-1' : '')}>
          <h3 className="text-xl font-bold text-black sm:text-2xl font-serif">{title}</h3>
          <p className="mt-2 text-secondary-500">{description}</p>
        </div>

        {status === 'success' ? (
          <div className={cn(variant === 'inline' ? 'mt-6 sm:mt-0' : 'mt-6')}>
            <p className="text-sm font-semibold text-green-700">{message}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={cn(
              variant === 'inline' ? 'mt-6 sm:mt-0' : 'mt-6',
              'flex flex-col sm:flex-row gap-3 justify-center'
            )}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="h-12 flex-1 min-w-0 max-w-sm px-4 text-sm border border-secondary-300 bg-white text-black placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  )
}
