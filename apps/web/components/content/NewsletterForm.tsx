'use client'

import { useState } from 'react'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'

interface NewsletterFormProps {
  title?: string
  description?: string
  className?: string
  variant?: 'inline' | 'stacked'
}

export function NewsletterForm({
  title = 'Get sales tips delivered to your inbox',
  description = 'Join thousands of sales professionals who receive our weekly insights on converting leads into customers.',
  className,
  variant = 'stacked',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus('success')
      setMessage(data.message || 'Thanks for subscribing!')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div
      className={cn(
        // Brand-compliant: square corners, light gray background
        'rounded-none bg-secondary-100 p-8 sm:p-10',
        className
      )}
    >
      <div className={cn(variant === 'inline' && 'sm:flex sm:items-center sm:justify-between sm:gap-8')}>
        <div className={cn(variant === 'inline' ? 'sm:flex-1' : 'text-center')}>
          <h3 className="text-xl font-bold text-black sm:text-2xl font-serif">{title}</h3>
          <p className="mt-2 text-secondary-500">{description}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={cn(
            variant === 'inline' ? 'mt-6 sm:mt-0 sm:flex-1' : 'mt-6'
          )}
        >
          <div
            className={cn(
              variant === 'inline'
                ? 'flex gap-3'
                : 'flex flex-col sm:flex-row gap-3 max-w-md mx-auto'
            )}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading' || status === 'success'}
              className="flex-1"
            />
            <Button
              type="submit"
              variant="primary"
              isLoading={status === 'loading'}
              disabled={status === 'success'}
            >
              {status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </div>

          {message && (
            <p
              className={cn(
                'mt-3 text-sm',
                status === 'success' ? 'text-green-600' : 'text-red-600',
                variant !== 'inline' && 'text-center'
              )}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
