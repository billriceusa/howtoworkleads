'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui'
import { getALSDeepLink, getSlugFromPathname } from '@/lib/analytics'

const STORAGE_KEY = 'htwl_exit_popup_dismissed'
const DISMISS_DAYS = 7

function isDismissed(): boolean {
  if (typeof window === 'undefined') return true
  const dismissed = localStorage.getItem(STORAGE_KEY)
  if (!dismissed) return false
  const dismissedAt = parseInt(dismissed, 10)
  const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24)
  return daysSince < DISMISS_DAYS
}

function dismiss() {
  localStorage.setItem(STORAGE_KEY, Date.now().toString())
}

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  const showPopup = useCallback(() => {
    if (hasTriggered || isDismissed()) return
    setHasTriggered(true)
    setIsVisible(true)
  }, [hasTriggered])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    dismiss()
  }, [])

  useEffect(() => {
    if (isDismissed()) return

    // Desktop: mouse leaves viewport toward top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup()
      }
    }

    // Mobile: scroll up quickly from deep in page (user is "leaving")
    let lastScrollY = window.scrollY
    let scrollTimeout: ReturnType<typeof setTimeout>
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY
        const scrolledUp = lastScrollY - currentScrollY
        const pageDepth = lastScrollY / document.documentElement.scrollHeight
        // Trigger if user scrolled up 300px+ from below 40% of the page
        if (scrolledUp > 300 && pageDepth > 0.4) {
          showPopup()
        }
        lastScrollY = currentScrollY
      }, 100)
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [showPopup])

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Special offer"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white p-8 sm:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-yellow">
            Before You Go
          </p>
          <h2 className="mt-3 text-2xl font-bold text-black font-serif sm:text-3xl">
            Free Guide: How to Work Consumer Data
          </h2>
          <p className="mt-4 text-gray-600">
            Learn the proven system for turning aged leads into closed deals — scripts, follow-up cadences, and the exact workflow top producers use.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Button
              href="https://drive.google.com/file/d/1mWhf4A7Ne_oCPoXaXnyBs_pWWDhe9zB1/view?usp=sharing"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Download Free Guide
            </Button>
            <Button
              href={typeof window !== 'undefined' ? getALSDeepLink(getSlugFromPathname(window.location.pathname)) : 'https://agedleadstore.com/all-lead-types/'}
              variant="outline"
              size="lg"
              className="w-full"
              utmCampaign="exit-intent-popup"
            >
              Buy Aged Leads
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
