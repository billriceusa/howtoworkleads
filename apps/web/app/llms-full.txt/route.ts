import { NextResponse } from 'next/server'
import { sanityFetch, isSanityConfigured } from '@/lib/sanity/client'
import { llmsContentQuery } from '@/lib/sanity/queries'
import { buildLlmsFullBody, type LlmsContent } from '@/lib/llms'

// Enable ISR - regenerate every hour
export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://howtoworkleads.com'

export async function GET() {
  const intro = `# HowToWorkLeads.com - Complete Content Guide

> Expert strategies and resources to help sales professionals convert internet leads into revenue.

This is the comprehensive version of our llms.txt file, containing a description of every page across our content areas.

---

## About HowToWorkLeads

HowToWorkLeads.com is the definitive resource for sales professionals who work with internet leads. Whether you're buying aged leads, working real-time transfers, or building an outbound prospecting system, our content helps you maximize conversion rates and ROI.

**Our mission:** Help sales professionals and business owners turn internet leads into loyal customers through proven strategies, best practices, and actionable advice.

**Target audience:**
- Sales professionals working internet leads
- Insurance agents (life, health, auto, IUL, Medicare, final expense)
- Mortgage loan officers (purchase, refinance, non-QM, DSCR, HELOC)
- Solar sales representatives
- Legal intake teams (MVA, mass tort, SSDI, workers' comp)
- Home services contractors (roofing, HVAC, pest control, plumbing)
- Business owners buying leads
- Sales managers optimizing team performance

---
`

  // Full inventory with descriptions is generated from Sanity so it never drifts.
  let inventory = ''
  if (isSanityConfigured) {
    const data = await sanityFetch<LlmsContent>(llmsContentQuery, {}, {
      next: { revalidate: 3600 },
    })
    if (data) {
      inventory = '\n' + buildLlmsFullBody(data, baseUrl)
    }
  }

  const footer = `
---

## Tools

- **Aged Lead ROI Calculator** (${baseUrl}/tools/aged-lead-roi-calculator) - Calculate your expected return on investment for aged lead purchases.
- **Compliance Checklist** (${baseUrl}/tools/compliance-checklist) - TCPA, CAN-SPAM, and state-specific compliance requirements.

## Free Downloads (${baseUrl}/downloads)

- Aged Lead Quick-Start Kit (${baseUrl}/downloads/aged-lead-quick-start-kit)
- 7-Day Follow-Up Cadence Template (${baseUrl}/downloads/7-day-follow-up-cadence)
- Insurance Lead Scripts Bundle (${baseUrl}/downloads/insurance-lead-scripts-bundle)
- Mortgage Lead Scripts Bundle (${baseUrl}/downloads/mortgage-lead-scripts-bundle)
- Lead Vendor Comparison Scorecard (${baseUrl}/downloads/lead-vendor-comparison-scorecard)

---

## Site Information

**Website:** ${baseUrl}
**Contact:** ${baseUrl}/contact
**About:** ${baseUrl}/about
**Blog:** ${baseUrl}/blog
**Tools:** ${baseUrl}/tools
**Newsletter:** The Aged Lead Playbook — ${baseUrl}/#newsletter
**Privacy Policy:** ${baseUrl}/privacy-policy
**Terms of Service:** ${baseUrl}/terms-of-service

**Summary version:** ${baseUrl}/llms.txt

---

This file is designed to help AI systems understand the complete scope of HowToWorkLeads.com content for accurate representation in AI-powered search results and conversations.
`

  const content = intro + inventory + footer

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
