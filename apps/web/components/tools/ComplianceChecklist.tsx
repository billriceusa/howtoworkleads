'use client'

import { useState, useEffect, useCallback } from 'react'
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
    title: 'Before You Buy Leads',
    items: [
      { id: 'buy-1', label: 'Verified vendor provides DNC-scrubbed data' },
      { id: 'buy-2', label: 'Confirmed how leads were generated (source transparency)' },
      { id: 'buy-3', label: 'Verified vendor has documented consumer consent' },
      { id: 'buy-4', label: 'Confirmed leads include opt-in for phone, email, and/or SMS (separately)' },
      { id: 'buy-5', label: "Checked vendor's return/refund policy for bad data" },
      { id: 'buy-6', label: "Reviewed vendor's privacy policy and data handling practices" },
    ],
  },
  {
    title: 'Before You Call',
    items: [
      { id: 'call-1', label: 'Scrubbed lead list against National DNC Registry' },
      { id: 'call-2', label: 'Scrubbed against state-specific DNC lists (if applicable)' },
      { id: 'call-3', label: "Verified calling hours: 8 AM\u20139 PM lead's LOCAL time" },
      { id: 'call-4', label: 'Caller ID displays your real business number (no spoofing)' },
      { id: 'call-5', label: 'Call recording disclosures prepared (check state consent laws)' },
      { id: 'call-6', label: 'Trained reps on opt-out procedures' },
    ],
  },
  {
    title: 'Before You Text (SMS)',
    items: [
      { id: 'sms-1', label: 'Verified prior express written consent for SMS marketing' },
      { id: 'sms-2', label: 'Auto-reply STOP/opt-out mechanism configured' },
      { id: 'sms-3', label: 'Messages identify your business name' },
      { id: 'sms-4', label: 'Messages are sent during appropriate hours' },
      { id: 'sms-5', label: 'Short-code or 10DLC registration complete (carrier compliance)' },
    ],
  },
  {
    title: 'Before You Email',
    items: [
      { id: 'email-1', label: 'CAN-SPAM compliant: includes physical mailing address' },
      { id: 'email-2', label: 'Unsubscribe mechanism in every email' },
      { id: 'email-3', label: '"From" name accurately identifies sender' },
      { id: 'email-4', label: 'Subject lines are not misleading' },
      { id: 'email-5', label: 'Honoring unsubscribe requests within 10 business days' },
    ],
  },
  {
    title: 'Industry-Specific',
    items: [
      { id: 'ind-1', label: 'Insurance: State DOI requirements reviewed' },
      { id: 'ind-2', label: 'Medicare: CMS marketing guidelines followed, Scope of Appointment obtained' },
      { id: 'ind-3', label: 'Mortgage: TILA/RESPA advertising rules followed' },
      { id: 'ind-4', label: "All: State licensing verified for lead's state (if applicable)" },
    ],
  },
  {
    title: 'Record Keeping',
    items: [
      { id: 'rec-1', label: 'Consent records documented and accessible' },
      { id: 'rec-2', label: 'Call logs maintained' },
      { id: 'rec-3', label: 'DNC scrub dates recorded' },
      { id: 'rec-4', label: 'Opt-out requests tracked and honored' },
      { id: 'rec-5', label: 'Records retained for 5+ years' },
    ],
  },
]

const TOTAL_ITEMS = CHECKLIST_SECTIONS.reduce((sum, s) => sum + s.items.length, 0)
const STORAGE_KEY = 'htw-compliance-checklist'

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
    } catch {}
    setLoaded(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checked)))
      } catch {}
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
      return { text: "You're compliant! Keep these records updated and re-check before every new campaign.", color: 'text-green-700', bg: 'bg-green-50 border-green-500' }
    }
    if (percentage >= 75) {
      return { text: 'Almost there \u2014 address the unchecked items before your next campaign.', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-500' }
    }
    return { text: 'Risk alert \u2014 several compliance gaps need attention. Review unchecked items carefully.', color: 'text-red-700', bg: 'bg-red-50 border-red-500' }
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
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-secondary-800">
            {checkedCount} of {TOTAL_ITEMS} items checked
          </span>
          <span className={cn('text-sm font-bold', percentage === 100 ? 'text-green-700' : 'text-secondary-600')}>
            {percentage}%
          </span>
        </div>
        <div className="h-3 w-full bg-secondary-200">
          <div
            className={cn(
              'h-full transition-all duration-300',
              percentage === 100 ? 'bg-green-500' : percentage >= 75 ? 'bg-brand-yellow' : 'bg-red-500'
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
            <div className={cn(
              'flex items-center justify-between px-6 py-4',
              sectionComplete ? 'bg-green-50' : 'bg-secondary-50'
            )}>
              <h3 className="text-lg font-bold text-black font-serif">{section.title}</h3>
              <span className={cn(
                'text-sm font-semibold',
                sectionComplete ? 'text-green-700' : 'text-secondary-500'
              )}>
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
                  <span className={cn(
                    'text-sm leading-relaxed',
                    checked.has(item.id) ? 'text-secondary-500 line-through' : 'text-secondary-800'
                  )}>
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

      {/* Actions */}
      <div className="flex flex-wrap gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-none border-2 border-black bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition-all hover:bg-black hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Checklist
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
