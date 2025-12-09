import { NextResponse } from 'next/server'

// Enable ISR - regenerate every hour
export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.howtoworkleads.com'

export async function GET() {
  const content = `# HowToWorkLeads.com

> Expert strategies and resources to help sales professionals convert internet leads into revenue.

## About This Site

HowToWorkLeads.com is an educational resource for sales professionals, entrepreneurs, and business owners who want to maximize their return on investment when buying and working internet leads. We cover lead generation, lead management, CRM systems, sales processes, and industry-specific lead strategies.

## Main Topics

### Lead Management
Learn how to effectively manage, organize, and prioritize your leads for maximum conversion rates.
- [Buying Leads](${baseUrl}/lead-management/buying-leads)
- [Cleaning & Verifying Data](${baseUrl}/lead-management/cleaning-verifying-data)
- [Email Sequences](${baseUrl}/lead-management/email-sequences)
- [Building Email Lists](${baseUrl}/lead-management/building-email-list)
- [Effective Call Campaigns](${baseUrl}/lead-management/effective-call-campaigns)

### Sales Process
Master the art of converting leads into customers with proven sales techniques.
- [Working Real-Time Leads](${baseUrl}/sales-process/working-real-time-leads)
- [Warming Aged Leads](${baseUrl}/sales-process/warming-aged-leads)
- [Managing Your Pipeline](${baseUrl}/sales-process/managing-pipeline)
- [Omni-Channel Sequences](${baseUrl}/sales-process/omni-channel-sequences)

### CRM Systems
Choose and optimize the right CRM for your lead management needs.
- [HighLevel Close Sales System](${baseUrl}/crm-systems/highlevel-close-sales-system)

### Buying Leads
Make informed decisions when purchasing leads for your business.
- [Aged Leads Guide](${baseUrl}/buying-leads/aged-leads)
- [Mortgage Leads](${baseUrl}/buying-leads/mortgage-leads)
- [Insurance Leads](${baseUrl}/buying-leads/insurance-leads)
- [Solar Leads](${baseUrl}/buying-leads/solar-leads)
- [How to Buy Leads](${baseUrl}/buying-leads/how-to-buy-leads)
- [Lead Buying Checklist](${baseUrl}/buying-leads/lead-buying-checklist)
- [Lead ROI Calculator](${baseUrl}/buying-leads/lead-roi-calculator)
- [Compliance Checklist](${baseUrl}/buying-leads/compliance-checklist)

## Key Pages

- [Homepage](${baseUrl}/)
- [About Us](${baseUrl}/about)
- [Contact](${baseUrl}/contact)
- [Blog](${baseUrl}/blog)

## For More Information

For comprehensive content including full articles, visit: ${baseUrl}/llms-full.txt

## Contact

Website: ${baseUrl}
Contact Page: ${baseUrl}/contact

---

This file follows the llms.txt specification to help AI systems understand and accurately represent our content.
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
