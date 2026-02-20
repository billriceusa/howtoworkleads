declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const GA_MEASUREMENT_ID = 'G-86654ZPS5H'

const ALS_UTM_PARAMS = 'utm_source=howtoworkleads&utm_medium=website&utm_campaign=cta'

/** Append UTM params to AgedLeadStore URLs */
export function appendALSUtm(url: string): string {
  if (!url.includes('agedleadstore.com')) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${ALS_UTM_PARAMS}`
}

/** Fire a GA4 event (safe to call server-side — no-ops gracefully) */
export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}
