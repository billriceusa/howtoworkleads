import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trim() + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://howtoworkleads.com'
  return `${baseUrl}${path}`
}

/**
 * The one URI for Bill Rice, reused verbatim on every property he owns.
 * @id is a URI, not a URL that has to live on the emitting host — reusing this
 * everywhere is what merges the graph into a single person.
 */
export const BILL_RICE_ID = 'https://billrice.com/#person'

// Canonical author identity for JSON-LD Person entities (E-E-A-T / AEO).
// Keyed by author name so a future author never inherits another's profiles.
/**
 * Author identity for JSON-LD. Bill resolves to the canonical person URI shared
 * across every property he owns — see ~/Code/_shared-docs/bill-rice-identity.md.
 * The @id is what merges him with the same person on the other sites; matching
 * sameAs lists alone never did.
 */
export function authorProfile(
  name?: string
): { id?: string; url?: string; sameAs?: string[] } {
  if (!name) return {}
  switch (name.trim().toLowerCase()) {
    case 'bill rice':
      return {
        id: BILL_RICE_ID,
        url: 'https://billrice.com',
        // Identity profiles only. Entries 1-5 verified 2026-07-29;
        // substack.com/@billrice verified and added 2026-07-31.
        sameAs: [
          'https://www.wikidata.org/wiki/Q139037772',
          'https://www.linkedin.com/in/billrice/',
          'https://x.com/billrice',
          'https://www.youtube.com/@billricestrategy',
          'https://medium.com/@billrice',
          'https://substack.com/@billrice',
        ],
      }
    default:
      return {}
  }
}

export function extractHeadings(content: any[]): { text: string; slug: string; level: number }[] {
  const headings: { text: string; slug: string; level: number }[] = []

  if (!content) return headings

  content.forEach((block) => {
    if (block._type === 'contentBlock' && block.content) {
      block.content.forEach((item: any) => {
        if (item.style === 'h2' || item.style === 'h3') {
          const text = item.children
            ?.map((child: any) => child.text)
            .join('') || ''
          headings.push({
            text,
            slug: slugify(text),
            level: item.style === 'h2' ? 2 : 3,
          })
        }
      })
    }
  })

  return headings
}
