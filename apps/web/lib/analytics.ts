declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const GA_MEASUREMENT_ID = 'G-86654ZPS5H'

/** Append UTM params to AgedLeadStore URLs */
export function appendALSUtm(url: string, campaign: string = 'cta'): string {
  if (!url.includes('agedleadstore.com')) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}utm_source=howtoworkleads&utm_medium=website&utm_campaign=${campaign}`
}

/** Map of slug keywords to AgedLeadStore vertical deep links */
const ALS_DEEP_LINKS: Record<string, string> = {
  "life-insurance": "https://agedleadstore.com/life-insurance-leads/",
  "final-expense": "https://agedleadstore.com/life-insurance-leads/",
  "health-insurance": "https://agedleadstore.com/health-insurance-leads/",
  "iul": "https://agedleadstore.com/indexed-universal-life-insurance-leads/",
  "aca": "https://agedleadstore.com/aca-leads/",
  "auto-insurance": "https://agedleadstore.com/auto-insurance-leads/",
  "home-improvement": "https://agedleadstore.com/buy-home-improvement-leads-lp/",
  "home-services": "https://agedleadstore.com/buy-home-improvement-leads-lp/",
  "roofing": "https://agedleadstore.com/buy-home-improvement-leads-lp/",
  "hvac": "https://agedleadstore.com/buy-home-improvement-leads-lp/",
  "plumbing": "https://agedleadstore.com/buy-home-improvement-leads-lp/",
  "window-replacement": "https://agedleadstore.com/buy-home-improvement-leads-lp/",
  "pest-control": "https://agedleadstore.com/buy-home-improvement-leads-lp/",
  "mortgage": "https://agedleadstore.com/mortgage-leads-purchase-refinance/",
  "purchase-mortgage": "https://agedleadstore.com/mortgage-leads-purchase-refinance/",
  "refinance": "https://agedleadstore.com/mortgage-leads-purchase-refinance/",
  "heloc": "https://agedleadstore.com/mortgage-leads-purchase-refinance/",
  "dscr": "https://agedleadstore.com/mortgage-leads-purchase-refinance/",
  "non-qm": "https://agedleadstore.com/mortgage-leads-purchase-refinance/",
  "bank-statement": "https://agedleadstore.com/mortgage-leads-purchase-refinance/",
  "solar": "https://agedleadstore.com/all-lead-types/",
  "annuity": "https://agedleadstore.com/life-insurance-leads/",
  "medicare": "https://agedleadstore.com/health-insurance-leads/",
  "pc-insurance": "https://agedleadstore.com/auto-insurance-leads/",
  "debt": "https://agedleadstore.com/all-lead-types/",
}

const ALS_DEFAULT_URL = 'https://agedleadstore.com/all-lead-types/'

/**
 * Returns the best ALS deep link for a given page slug.
 * Checks if the slug contains any known vertical keyword;
 * falls back to the generic all-lead-types page.
 */
export function getALSDeepLink(slug: string): string {
  if (!slug) return ALS_DEFAULT_URL
  const normalized = slug.toLowerCase()
  // Check longest keys first to avoid partial matches (e.g., "auto-insurance" before "insurance")
  const sortedKeys = Object.keys(ALS_DEEP_LINKS).sort((a, b) => b.length - a.length)
  for (const key of sortedKeys) {
    if (normalized.includes(key)) {
      return ALS_DEEP_LINKS[key]
    }
  }
  return ALS_DEFAULT_URL
}

/**
 * Extracts the slug from a pathname for deep link matching.
 * Combines all path segments so vertical keywords anywhere in the URL are matched.
 */
export function getSlugFromPathname(pathname: string): string {
  return pathname.replace(/^\//, '').replace(/\/$/, '')
}

/** Fire a GA4 event (safe to call server-side — no-ops gracefully) */
export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}
