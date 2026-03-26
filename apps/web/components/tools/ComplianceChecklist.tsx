'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ChecklistItem {
  id: string
  label: string
}

interface ChecklistSection {
  title: string
  items: ChecklistItem[]
}

const CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    title: 'Section 1: Before You Buy Leads',
    items: [
      { id: 'buy-1', label: 'Verify vendor provides DNC scrubbing (included, not add-on)' },
      { id: 'buy-2', label: 'Request consent documentation (exact opt-in form language)' },
      { id: 'buy-3', label: 'Verify consent covers your calling method (manual dial vs auto-dialer vs text)' },
      { id: 'buy-4', label: 'Confirm no long-term contracts required' },
      { id: 'buy-5', label: 'Check vendor return policy for bad data' },
      { id: 'buy-6', label: 'Verify lead generation date is available (not just "aged")' },
    ],
  },
  {
    title: 'Section 2: Before You Call',
    items: [
      { id: 'call-1', label: 'DNC scrub completed within last 31 days (federal + state registries)' },
      { id: 'call-2', label: 'Reassigned number database checked' },
      { id: 'call-3', label: 'Known TCPA litigators removed from list' },
      { id: 'call-4', label: 'Internal company DNC list checked' },
      { id: 'call-5', label: 'Prior express consent documented for each lead' },
      { id: 'call-6', label: 'Consent level matches calling method (PEWC for auto-dialers/texts)' },
      { id: 'call-7', label: 'Lead age assessed against DNC exemption windows (3-month inquiry / 18-month transaction)' },
      { id: 'call-8', label: 'State licensing verified (only calling states where licensed)' },
      { id: 'call-9', label: 'Wireless numbers identified (additional TCPA protections)' },
    ],
  },
  {
    title: 'Section 3: During Your Calls',
    items: [
      { id: 'during-1', label: "Calling between 8 AM and 9 PM in lead's LOCAL time zone" },
      { id: 'during-2', label: 'Caller ID displays real/registered business number (no spoofing)' },
      { id: 'during-3', label: 'Identify yourself and company within first few seconds' },
      { id: 'during-4', label: 'Opt-out requests honored immediately and permanently' },
      { id: 'during-5', label: 'State-specific calling hour restrictions checked (e.g., Florida 8 PM cutoff)' },
    ],
  },
  {
    title: 'Section 4: Text/SMS Compliance',
    items: [
      { id: 'sms-1', label: 'Prior express written consent verified for marketing texts' },
      { id: 'sms-2', label: '10DLC campaign registration completed' },
      { id: 'sms-3', label: '"Reply STOP to opt out" included in every message' },
      { id: 'sms-4', label: 'STOP requests processed immediately (no follow-up texts after)' },
      { id: 'sms-5', label: 'Texts sent only during permitted hours' },
    ],
  },
  {
    title: 'Section 5: Email Compliance (CAN-SPAM)',
    items: [
      { id: 'email-1', label: 'Unsubscribe link included in every email' },
      { id: 'email-2', label: 'Physical business address included' },
      { id: 'email-3', label: 'Subject lines are not deceptive' },
      { id: 'email-4', label: 'Sender name accurately identifies your business' },
      { id: 'email-5', label: 'Unsubscribe requests honored within 10 business days' },
    ],
  },
  {
    title: 'Section 6: Safe Harbor Protection',
    items: [
      { id: 'safe-1', label: 'Written DNC compliance policies and procedures documented' },
      { id: 'safe-2', label: 'DNC employee training program in place' },
      { id: 'safe-3', label: 'Active internal do-not-call suppression list maintained' },
      { id: 'safe-4', label: 'Proof of DNC registry access at least every 31 days documented' },
      { id: 'safe-5', label: 'All scrub records retained for 5+ years' },
    ],
  },
  {
    title: 'Section 7: Record Keeping',
    items: [
      { id: 'rec-1', label: 'Consent documentation archived for each lead source' },
      { id: 'rec-2', label: 'DNC scrub logs saved with dates and record counts' },
      { id: 'rec-3', label: 'Opt-out requests logged with timestamps' },
      { id: 'rec-4', label: 'Call recordings stored (if applicable) for 5+ years' },
      { id: 'rec-5', label: 'Internal DNC list maintained and shared with affiliates' },
    ],
  },
]

const TOTAL_ITEMS = CHECKLIST_SECTIONS.reduce((sum, s) => sum + s.items.length, 0)
const STORAGE_KEY = 'htw-compliance-checklist-v2'

export function ComplianceChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setChecked(new Set(JSON.parse(saved)))
      }
    } catch {
      /* ignore */
    }
    setLoaded(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checked)))
      } catch {
        /* ignore */
      }
    }
  }, [checked, loaded])

  const toggleItem = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setChecked(new Set())
  }, [])

  const checkedCount = checked.size
  const percentage = Math.round((checkedCount / TOTAL_ITEMS) * 100)

  const getStatusMessage = () => {
    if (percentage === 100) {
      return {
        text: "You're compliant! Keep these records updated and re-check before every new campaign.",
        color: 'text-green-700',
        bg: 'bg-green-50 border-green-500',
      }
    }
    if (percentage >= 75) {
      return {
        text: 'Almost there \u2014 address the unchecked items before your next campaign.',
        color: 'text-yellow-700',
        bg: 'bg-yellow-50 border-yellow-500',
      }
    }
    return {
      text: 'Risk alert \u2014 several compliance gaps need attention. Review unchecked items carefully.',
      color: 'text-red-700',
      bg: 'bg-red-50 border-red-500',
    }
  }

  const status = getStatusMessage()

  const handlePrint = () => {
    window.print()
  }

  if (!loaded) {
    return <div className="py-8 text-center text-secondary-500">Loading checklist...</div>
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="sticky top-16 z-10 bg-white pb-4 pt-2 print:static">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-secondary-800">
            {checkedCount} of {TOTAL_ITEMS} items checked
          </span>
          <span
            className={cn(
              'text-sm font-bold',
              percentage === 100 ? 'text-green-700' : 'text-secondary-600'
            )}
          >
            {percentage}%
          </span>
        </div>
        <div className="h-3 w-full bg-secondary-200">
          <div
            className={cn(
              'h-full transition-all duration-300',
              percentage === 100
                ? 'bg-green-500'
                : percentage >= 75
                  ? 'bg-brand-yellow'
                  : 'bg-red-500'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Checklist Sections */}
      {CHECKLIST_SECTIONS.map((section) => {
        const sectionChecked = section.items.filter((item) => checked.has(item.id)).length
        const sectionTotal = section.items.length
        const sectionComplete = sectionChecked === sectionTotal

        return (
          <div key={section.title} className="border-2 border-secondary-200">
            <div
              className={cn(
                'flex items-center justify-between px-6 py-4',
                sectionComplete ? 'bg-green-50' : 'bg-secondary-50'
              )}
            >
              <h3 className="font-serif text-lg font-bold text-black">{section.title}</h3>
              <span
                className={cn(
                  'text-sm font-semibold',
                  sectionComplete ? 'text-green-700' : 'text-secondary-500'
                )}
              >
                {sectionChecked}/{sectionTotal}
              </span>
            </div>
            <div className="divide-y divide-secondary-100">
              {section.items.map((item) => (
                <label
                  key={item.id}
                  className={cn(
                    'flex cursor-pointer items-start gap-4 px-6 py-4 transition-colors hover:bg-secondary-50',
                    checked.has(item.id) && 'bg-green-50/50'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked.has(item.id)}
                    onChange={() => toggleItem(item.id)}
                    className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer accent-green-600"
                  />
                  <span
                    className={cn(
                      'text-sm leading-relaxed',
                      checked.has(item.id)
                        ? 'text-secondary-500 line-through'
                        : 'text-secondary-800'
                    )}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )
      })}

      {/* Status Summary */}
      <div className={cn('border-2 p-6', status.bg)}>
        <p className={cn('text-lg font-bold', status.color)}>{status.text}</p>
      </div>

      {/* Key Penalty Reference */}
      <div className="border-2 border-secondary-200 bg-secondary-50 p-6 print:break-inside-avoid">
        <h3 className="mb-3 font-serif text-lg font-bold text-black">
          TCPA Penalty Quick Reference
        </h3>
        <ul className="space-y-2 text-sm text-secondary-800">
          <li>
            <strong>$500</strong> per violation (standard TCPA)
          </li>
          <li>
            <strong>$1,500</strong> per violation (willful/knowing TCPA)
          </li>
          <li>
            <strong>$43,280</strong> per violation (federal DNC registry)
          </li>
        </ul>
        <p className="mt-3 text-xs text-secondary-500">
          A single day of calling an unscrubbed list of 200 leads could expose you to $100,000 to
          $300,000 in fines.
        </p>
      </div>

      {/* Key Compliance Facts */}
      <div className="border-2 border-brand-yellow bg-primary-50 p-6 print:break-inside-avoid">
        <h3 className="mb-3 font-serif text-lg font-bold text-black">
          Key Compliance Facts
        </h3>
        <ul className="space-y-2 text-sm text-secondary-800">
          <li>
            <strong>FCC 1:1 consent rule:</strong> Vacated by the 11th Circuit Court of Appeals in
            January 2025. This rule never took effect.
          </li>
          <li>
            <strong>DNC scrubbing frequency:</strong> Required every 31 days (not quarterly).
          </li>
          <li>
            <strong>DNC exemption windows:</strong> Inquiry-based: 3 months. Transaction-based: 18
            months.
          </li>
          <li>
            <strong>Prior express written consent (PEWC):</strong> Required for auto-dialers,
            prerecorded voice, AI voice, and marketing texts.
          </li>
        </ul>
      </div>

      {/* Related Guides */}
      <div className="border-2 border-secondary-200 p-6 print:break-inside-avoid">
        <h3 className="mb-3 font-serif text-lg font-bold text-black">Related Compliance Guides</h3>
        <ul className="space-y-2 text-sm text-secondary-800">
          <li>
            <Link
              href="/blog/aged-leads-dnc-compliance"
              className="bg-brand-yellow font-bold text-black no-underline transition-all hover:bg-transparent hover:underline"
            >
              DNC Compliance Guide for Aged Leads
            </Link>{' '}
            &mdash; Deep dive on DNC scrubbing, exemptions, and safe harbor protection.
          </li>
          <li>
            <Link
              href="/blog/tcpa-compliance-lead-buyers"
              className="bg-brand-yellow font-bold text-black no-underline transition-all hover:bg-transparent hover:underline"
            >
              TCPA Compliance Guide for Lead Buyers
            </Link>{' '}
            &mdash; Consent requirements, calling rules, and penalty avoidance.
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="border-l-4 border-brand-yellow bg-secondary-50 p-4 text-xs leading-relaxed text-secondary-500 print:break-inside-avoid">
        <strong>Disclaimer:</strong> This is educational guidance, not legal advice. Consult a
        licensed attorney for compliance questions. Regulations change frequently &mdash; verify
        current rules with the FCC, FTC, and your state regulatory agencies before launching any
        campaign.
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-none border-2 border-black bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition-all hover:bg-black hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Download as PDF
        </button>
        <button
          onClick={resetAll}
          className="inline-flex items-center gap-2 rounded-none border-2 border-secondary-300 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-secondary-600 transition-all hover:border-red-500 hover:text-red-600"
        >
          Reset All
        </button>
      </div>
    </div>
  )
}
