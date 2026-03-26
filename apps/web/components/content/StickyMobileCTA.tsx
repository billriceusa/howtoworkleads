'use client'

import { useState, useEffect } from 'react'
import { appendALSUtm, getALSDeepLink, getSlugFromPathname } from '@/lib/analytics'

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 500px (roughly past the hero)
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isDismissed || !isVisible) return null

  const deepLink = typeof window !== 'undefined' ? getALSDeepLink(getSlugFromPathname(window.location.pathname)) : 'https://agedleadstore.com/all-lead-types/'
  const href = appendALSUtm(deepLink, 'sticky-mobile-cta')

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="bg-black px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white truncate">
              Buy Aged Leads
            </p>
            <p className="text-xs text-gray-400">
              AgedLeadStore.com
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center justify-center bg-brand-yellow px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-black transition-all hover:bg-brand-yellow-hover"
          >
            Shop Leads
          </a>
          <button
            onClick={() => setIsDismissed(true)}
            className="flex-shrink-0 p-1 text-gray-500 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
