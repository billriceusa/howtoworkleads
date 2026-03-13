import React from 'react'
import { appendALSUtm } from '@/lib/analytics'

/** Pattern to match ALS brand mentions that should be auto-linked */
const ALS_PATTERN = /(Aged\s*Lead\s*Store|AgedLeadStore)/gi

const ALS_URL = 'https://agedleadstore.com/all-lead-types/'

/**
 * Takes a plain text string and returns React nodes with ALS mentions
 * converted to affiliate links. If no match, returns the original string.
 */
export function autoLinkALS(text: string, utmCampaign: string = 'in-content'): React.ReactNode {
  const parts = text.split(ALS_PATTERN)
  if (parts.length === 1) return text

  return parts.map((part, i) => {
    if (ALS_PATTERN.test(part)) {
      // Reset lastIndex since we use the global flag
      ALS_PATTERN.lastIndex = 0
      return (
        <a
          key={i}
          href={appendALSUtm(ALS_URL, utmCampaign)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

/** Detect markdown syntax in text */
export function containsMarkdown(text: string): boolean {
  if (!text || typeof text !== 'string') return false
  const markdownPatterns = [
    /^\s*#{1,6}\s+/m,
    /\[.+?\]\(.+?\)/,
    /\*\*[^*]+\*\*/,
    /(?<!\*)\*[^*]+\*(?!\*)/,
    /`[^`]+`/,
    /^\s*[-*+]\s+/m,
    /^\s*\d+\.\s+/m,
    /^\s*>/m,
  ]
  return markdownPatterns.some(pattern => pattern.test(text))
}

/** Extract plain text from Portable Text block value */
export function extractTextFromBlock(value: any): string {
  if (!value) return ''
  const children = value.children || value
  if (!Array.isArray(children)) return ''
  return children
    .filter((child: any) => child && (child._type === 'span' || child.text !== undefined))
    .map((child: any) => child.text || '')
    .join('')
}
