'use client'

import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'

// Only collect on the canonical production host so Vercel preview/deploy URLs
// (*.vercel.app) and bots hitting non-prod builds don't inflate 'Direct' sessions.
const PROD_HOST = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://howtoworkleads.com').hostname
  } catch {
    return 'howtoworkleads.com'
  }
})()

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          if (location.hostname === '${PROD_HOST}') {
            gtag('config', '${GA_MEASUREMENT_ID}');
          }
        `}
      </Script>
    </>
  )
}
