import { NextResponse } from 'next/server'

// Enable ISR - regenerate every hour
export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://howtoworkleads.com'

export async function GET() {
  const content = `# HowToWorkLeads.com

> Expert strategies and resources to help sales professionals convert internet leads into revenue.

## About This Site

HowToWorkLeads.com is an educational resource for sales professionals, entrepreneurs, and business owners who want to maximize their return on investment when buying and working internet leads. We cover lead generation, lead management, CRM systems, sales processes, and industry-specific lead strategies across mortgage, insurance, solar, and other verticals.

## Main Topics

### Buying Leads (${baseUrl}/buying-leads)
Make informed decisions when purchasing leads for your business.
- [Aged Leads Guide](${baseUrl}/buying-leads/aged-leads)
- [Mortgage Leads](${baseUrl}/buying-leads/mortgage-leads)
- [Buy Purchase Mortgage Leads](${baseUrl}/buying-leads/buy-purchase-mortgage-leads)
- [Buy Refinance Mortgage Leads](${baseUrl}/buying-leads/buy-refinance-mortgage-leads)
- [Buy Non-QM Mortgage Leads](${baseUrl}/buying-leads/buy-non-qm-mortgage-leads)
- [Buy DSCR Loan Leads](${baseUrl}/buying-leads/buy-dscr-loan-leads)
- [Buy Bank Statement Loan Leads](${baseUrl}/buying-leads/buy-bank-statement-loan-leads)
- [Buy HELOC Leads](${baseUrl}/buying-leads/buy-heloc-leads)
- [Insurance Leads](${baseUrl}/buying-leads/insurance-leads)
- [Solar Leads](${baseUrl}/buying-leads/solar-leads)
- [How to Buy Leads](${baseUrl}/buying-leads/how-to-buy-leads)
- [Lead Buying Checklist](${baseUrl}/buying-leads/lead-buying-checklist)
- [Lead ROI Calculator](${baseUrl}/buying-leads/lead-roi-calculator)
- [Compliance Checklist](${baseUrl}/buying-leads/compliance-checklist)

### Lead Management (${baseUrl}/lead-management)
Learn how to effectively manage, organize, and prioritize your leads for maximum conversion rates.
- [Buying Leads](${baseUrl}/lead-management/buying-leads)
- [Cleaning & Verifying Data](${baseUrl}/lead-management/cleaning-verifying-data)
- [Email Sequences](${baseUrl}/lead-management/email-sequences)
- [Building Email Lists](${baseUrl}/lead-management/building-email-list)
- [Effective Call Campaigns](${baseUrl}/lead-management/effective-call-campaigns)

### Sales Process (${baseUrl}/sales-process)
Master the art of converting leads into customers with proven sales techniques.
- [Working Real-Time Leads](${baseUrl}/sales-process/working-real-time-leads)
- [Warming Aged Leads](${baseUrl}/sales-process/warming-aged-leads)
- [Managing Your Pipeline](${baseUrl}/sales-process/managing-pipeline)
- [Omni-Channel Sequences](${baseUrl}/sales-process/omni-channel-sequences)

### CRM Systems (${baseUrl}/crm-systems)
Choose and optimize the right CRM for your lead management needs.
- [HighLevel Close Sales System](${baseUrl}/crm-systems/highlevel-close-sales-system)

### Aged Leads (${baseUrl}/aged-leads)
Deep-dive resources on working aged and recycled leads profitably.

### Resources (${baseUrl}/resources)
Additional tools, templates, and reference materials for lead professionals.

## Tools

- [Aged Lead ROI Calculator](${baseUrl}/tools/aged-lead-roi-calculator) - Calculate your expected return on investment for aged lead purchases
- [Compliance Checklist](${baseUrl}/tools/compliance-checklist) - TCPA, CAN-SPAM, and state-specific compliance requirements

## Blog

Our blog features how-to guides and tactical advice:

### Mortgage Lead Guides
- [How to Work Purchase Mortgage Leads](${baseUrl}/blog/how-to-work-purchase-mortgage-leads)
- [How to Work Refinance Mortgage Leads](${baseUrl}/blog/how-to-work-refinance-mortgage-leads)
- [How to Work Non-QM Mortgage Leads](${baseUrl}/blog/how-to-work-non-qm-mortgage-leads)
- [How to Work DSCR Loan Leads](${baseUrl}/blog/how-to-work-dscr-loan-leads)
- [How to Work Bank Statement Loan Leads](${baseUrl}/blog/how-to-work-bank-statement-loan-leads)
- [How to Work HELOC Leads](${baseUrl}/blog/how-to-work-heloc-leads)

### Insurance Lead Guides
- [How to Work Medicare Leads](${baseUrl}/blog/how-to-work-medicare-leads)
- [How to Work Auto Insurance Leads](${baseUrl}/blog/how-to-work-auto-insurance-leads)
- [How to Work Life Insurance Leads](${baseUrl}/blog/how-to-work-life-insurance-leads)
- [How to Work Home Improvement Leads](${baseUrl}/blog/how-to-work-home-improvement-leads)
- [How to Work P&C Insurance Leads](${baseUrl}/blog/how-to-work-pc-insurance-leads)
- [How to Work IUL Leads](${baseUrl}/blog/how-to-work-iul-leads)
- [How to Work Annuity Leads](${baseUrl}/blog/how-to-work-annuity-leads)
- [How to Work Health Insurance Leads](${baseUrl}/blog/how-to-work-health-insurance-leads)

### Home Services Lead Guides
- [How to Work Electrical Leads](${baseUrl}/blog/how-to-work-electrical-leads)
- [How to Work Landscaping Leads](${baseUrl}/blog/how-to-work-landscaping-leads)
- [How to Work Painting Leads](${baseUrl}/blog/how-to-work-painting-leads)
- [How to Work Garage Door Leads](${baseUrl}/blog/how-to-work-garage-door-leads)

### Legal Lead Guides
- [How to Work Workers' Comp Leads](${baseUrl}/blog/how-to-work-workers-comp-leads)
- [How to Work Bankruptcy Leads](${baseUrl}/blog/how-to-work-bankruptcy-leads)
- [How to Work Family Law Leads](${baseUrl}/blog/how-to-work-family-law-leads)

### Scripts & Templates
- [Voicemail Scripts for Insurance Leads](${baseUrl}/blog/voicemail-scripts-insurance-leads)
- [Voicemail Scripts for Mortgage Leads](${baseUrl}/blog/voicemail-scripts-mortgage-leads)
- [Voicemail Scripts for Home Services Leads](${baseUrl}/blog/voicemail-scripts-home-services-leads)
- [SMS Templates for Insurance Leads](${baseUrl}/blog/sms-templates-insurance-leads)
- [SMS Templates for Mortgage Leads](${baseUrl}/blog/sms-templates-mortgage-leads)
- [SMS Templates for Home Services Leads](${baseUrl}/blog/sms-templates-home-services-leads)

### Compliance Guides
- [TCPA Compliance for Lead Buyers](${baseUrl}/blog/tcpa-compliance-lead-buyers)
- [State-by-State Lead Compliance Guide](${baseUrl}/blog/state-by-state-lead-compliance-guide)

### General Guides
- [The Complete Guide to Aged Leads](${baseUrl}/blog/aged-leads)
- [Aged Lead Scripts and Templates](${baseUrl}/blog/aged-lead-scripts-templates)
- [Aged Lead Follow-Up Cadence](${baseUrl}/blog/aged-lead-follow-up-cadence)
- [Best CRM for Aged Leads](${baseUrl}/blog/best-crm-aged-leads)
- [All Blog Posts](${baseUrl}/blog)

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
