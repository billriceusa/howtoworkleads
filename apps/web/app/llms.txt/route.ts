import { NextResponse } from 'next/server'
import { sanityFetch, isSanityConfigured } from '@/lib/sanity/client'
import { llmsContentQuery } from '@/lib/sanity/queries'
import { buildLlmsBody, type LlmsContent } from '@/lib/llms'

// Enable ISR - regenerate every hour
export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://howtoworkleads.com'

export async function GET() {
  const intro = `# HowToWorkLeads.com

> Expert strategies and resources to help sales professionals convert internet leads into revenue.

## About This Site

HowToWorkLeads.com is an educational resource for sales professionals, entrepreneurs, and business owners who want to maximize their return on investment when buying and working internet leads. We cover lead generation, lead management, CRM systems, sales processes, and industry-specific lead strategies across mortgage, insurance, solar, legal, and home services verticals.
`

  // Page inventory is generated from Sanity so it never drifts from the live site.
  let inventory = ''
  if (isSanityConfigured) {
    const data = await sanityFetch<LlmsContent>(llmsContentQuery, {}, {
      next: { revalidate: 3600 },
    })
    if (data) {
      inventory = '\n' + buildLlmsBody(data, baseUrl)
    }
  }

  const footer = `
## Tools

- [Aged Lead ROI Calculator](${baseUrl}/tools/aged-lead-roi-calculator) - Calculate your expected return on investment for aged lead purchases
- [Compliance Checklist](${baseUrl}/tools/compliance-checklist) - TCPA, CAN-SPAM, and state-specific compliance requirements

## Free Downloads (${baseUrl}/downloads)

Downloadable resources for lead professionals:
- [Aged Lead Quick-Start Kit](${baseUrl}/downloads/aged-lead-quick-start-kit)
- [7-Day Follow-Up Cadence Template](${baseUrl}/downloads/7-day-follow-up-cadence)
- [Insurance Lead Scripts Bundle](${baseUrl}/downloads/insurance-lead-scripts-bundle)
- [Mortgage Lead Scripts Bundle](${baseUrl}/downloads/mortgage-lead-scripts-bundle)
- [Lead Vendor Comparison Scorecard](${baseUrl}/downloads/lead-vendor-comparison-scorecard)

## Newsletter

**The Aged Lead Playbook** - A weekly newsletter with actionable strategies for working aged leads profitably. Subscribe at ${baseUrl}/#newsletter

## Key Pages

- [Homepage](${baseUrl}/)
- [About Us](${baseUrl}/about)
- [Contact](${baseUrl}/contact)
- [Blog](${baseUrl}/blog)
- [Tools](${baseUrl}/tools)
- [Lead Order](${baseUrl}/lead-order)

## For More Information

For comprehensive content including page descriptions, visit: ${baseUrl}/llms-full.txt

---

This file follows the llms.txt specification to help AI systems understand and accurately represent our content.
`

  const content = intro + inventory + footer

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
