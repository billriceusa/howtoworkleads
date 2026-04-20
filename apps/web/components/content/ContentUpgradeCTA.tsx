'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui'
import { HoneypotInput } from '@/components/honeypot-input'

/**
 * Maps page slug keywords to the best matching lead magnet download.
 * Falls back to the generic quick-start kit.
 */
const LEAD_MAGNET_MAP: {
  keywords: string[]
  slug: string
  title: string
  description: string
}[] = [
  {
    keywords: [
      'insurance', 'life-insurance', 'final-expense', 'health-insurance',
      'medicare', 'iul', 'aca', 'auto-insurance', 'annuity', 'pc-insurance',
      'mortgage-protection',
    ],
    slug: 'insurance-lead-scripts-bundle',
    title: 'Insurance Lead Scripts Bundle',
    description: '15+ phone, voicemail, text, and email scripts across life, Medicare, auto, and final expense verticals.',
  },
  {
    keywords: [
      'mortgage', 'purchase-mortgage', 'refinance', 'heloc', 'dscr',
      'non-qm', 'bank-statement', 'loan-officer',
    ],
    slug: 'mortgage-lead-scripts-bundle',
    title: 'Mortgage Lead Scripts Bundle',
    description: '15+ scripts for loan officers covering purchase, refinance, HELOC, non-QM, and DSCR scenarios.',
  },
  {
    keywords: ['follow-up', 'cadence', 'drip', 'sequence', 'outreach', 'multi-channel'],
    slug: '7-day-follow-up-cadence',
    title: '7-Day Follow-Up Cadence',
    description: 'Day-by-day multi-channel plan with scripts for each touchpoint. Insurance and mortgage versions included.',
  },
  {
    keywords: ['vendor', 'comparison', 'buying-leads', 'lead-source', 'lead-provider', 'cost-per-lead'],
    slug: 'lead-vendor-comparison-scorecard',
    title: 'Lead Vendor Comparison Scorecard',
    description: '10-criteria scoring framework to evaluate and compare aged lead providers before you buy.',
  },
]

const DEFAULT_LEAD_MAGNET = {
  slug: 'aged-lead-quick-start-kit',
  title: 'Aged Lead Quick-Start Kit',
  description: 'Scripts, a follow-up cadence, and vendor checklist to get started with aged leads today.',
}

function getLeadMagnetForSlug(pageSlug: string): { slug: string; title: string; description: string } {
  const normalized = pageSlug.toLowerCase()
  for (const entry of LEAD_MAGNET_MAP) {
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword)) {
        return { slug: entry.slug, title: entry.title, description: entry.description }
      }
    }
  }
  return DEFAULT_LEAD_MAGNET
}

interface ContentUpgradeCTAProps {
  pageSlug: string
  className?: string
}

export function ContentUpgradeCTA({ pageSlug, className }: ContentUpgradeCTAProps) {
  const magnet = getLeadMagnetForSlug(pageSlug)
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, slug: magnet.slug, website }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Check your inbox — your download is on the way.')
        // Trigger file download
        const link = document.createElement('a')
        link.href = `/downloads/${magnet.slug}.pdf`
        link.download = `${magnet.slug}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
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
    <div className={`not-prose border-l-4 border-brand-yellow bg-secondary-50 p-6 sm:p-8 ${className || ''}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-secondary-500">
        Free Download
      </p>
      <h3 className="mt-2 font-serif text-lg font-bold text-black sm:text-xl">
        {magnet.title}
      </h3>
      <p className="mt-2 text-sm text-secondary-600">
        {magnet.description}
      </p>

      {status === 'success' ? (
        <p className="mt-4 text-sm font-semibold text-green-700">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="h-11 flex-1 min-w-0 px-4 text-sm border-2 border-secondary-300 bg-white text-black placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          />
          <HoneypotInput value={website} onChange={setWebsite} />
          <Button type="submit" variant="primary" size="md" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Get Free Download'}
          </Button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">{message}</p>
      )}
    </div>
  )
}
