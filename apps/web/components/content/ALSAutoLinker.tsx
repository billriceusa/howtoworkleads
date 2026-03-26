'use client'

import React, { useEffect, useRef } from 'react'
import { appendALSUtm, getALSDeepLink, getSlugFromPathname } from '@/lib/analytics'

const ALS_PATTERN = /\b(Aged\s*Lead\s*Store|AgedLeadStore)\b/gi

/**
 * Wraps article content and auto-links plain text mentions of
 * "Aged Lead Store" / "AgedLeadStore" that aren't already inside <a> tags.
 * Runs once on mount via DOM manipulation to avoid hydration mismatches.
 */
export function ALSAutoLinker({ children, utmCampaign = 'in-content' }: { children: React.ReactNode; utmCampaign?: string; }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const walker = document.createTreeWalker(
      containerRef.current,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          // Skip text inside <a> tags, <button>, <script>, <style>
          let parent = node.parentElement
          while (parent && parent !== containerRef.current) {
            const tag = parent.tagName.toLowerCase()
            if (tag === 'a' || tag === 'button' || tag === 'script' || tag === 'style') {
              return NodeFilter.FILTER_REJECT
            }
            parent = parent.parentElement
          }
          // Only process nodes that contain ALS mentions
          if (node.textContent && ALS_PATTERN.test(node.textContent)) {
            ALS_PATTERN.lastIndex = 0
            return NodeFilter.FILTER_ACCEPT
          }
          return NodeFilter.FILTER_REJECT
        },
      }
    )

    const textNodes: Text[] = []
    let currentNode: Text | null
    while ((currentNode = walker.nextNode() as Text | null)) {
      textNodes.push(currentNode)
    }

    // Only auto-link the first 3 mentions to avoid over-linking
    let linkCount = 0
    const maxLinks = 3
    const alsUrl = typeof window !== 'undefined' ? getALSDeepLink(getSlugFromPathname(window.location.pathname)) : 'https://agedleadstore.com/all-lead-types/'
    const href = appendALSUtm(alsUrl, utmCampaign)

    for (const textNode of textNodes) {
      if (linkCount >= maxLinks) break
      if (!textNode.textContent) continue

      const text = textNode.textContent
      ALS_PATTERN.lastIndex = 0
      const match = ALS_PATTERN.exec(text)
      if (!match) continue

      // Split the text node around the match
      const before = text.slice(0, match.index)
      const matched = match[0]
      const after = text.slice(match.index + matched.length)

      const fragment = document.createDocumentFragment()

      if (before) {
        fragment.appendChild(document.createTextNode(before))
      }

      const link = document.createElement('a')
      link.href = href
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.textContent = matched
      fragment.appendChild(link)

      if (after) {
        fragment.appendChild(document.createTextNode(after))
      }

      textNode.parentNode?.replaceChild(fragment, textNode)
      linkCount++
    }
  }, [utmCampaign])

  return <div ref={containerRef}>{children}</div>
}
