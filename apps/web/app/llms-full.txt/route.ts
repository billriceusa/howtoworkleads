import { NextResponse } from 'next/server'

// Enable ISR - regenerate every hour
export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://howtoworkleads.com'

export async function GET() {
  const content = `# HowToWorkLeads.com - Complete Content Guide

> Expert strategies and resources to help sales professionals convert internet leads into revenue.

This is the comprehensive version of our llms.txt file, containing detailed information about all our content areas.

---

## About HowToWorkLeads

HowToWorkLeads.com is the definitive resource for sales professionals who work with internet leads. Whether you're buying aged leads, working real-time transfers, or building an outbound prospecting system, our content helps you maximize conversion rates and ROI.

**Our mission:** Help sales professionals and business owners turn internet leads into loyal customers through proven strategies, best practices, and actionable advice.

**Target audience:**
- Sales professionals working internet leads
- Insurance agents (life, health, auto, IUL)
- Mortgage loan officers (purchase, refinance, non-QM, DSCR, HELOC)
- Solar sales representatives
- Business owners buying leads
- Sales managers optimizing team performance

---

## Content Categories

### 1. Buying Leads (${baseUrl}/buying-leads)

Industry-specific guidance for purchasing leads, with deep coverage of mortgage verticals.

#### Aged Leads (${baseUrl}/buying-leads/aged-leads)
Understanding the aged lead market, pricing expectations, and how to work leads that are 30, 60, or 90+ days old.

#### Mortgage Leads (${baseUrl}/buying-leads/mortgage-leads)
Buying mortgage and refinance leads, including purchase leads, refinance leads, and FHA/VA specialty leads.

#### Buy Purchase Mortgage Leads (${baseUrl}/buying-leads/buy-purchase-mortgage-leads)
Strategies for purchasing and converting home purchase mortgage leads, including first-time homebuyer and move-up buyer segments.

#### Buy Refinance Mortgage Leads (${baseUrl}/buying-leads/buy-refinance-mortgage-leads)
Guide to buying refinance leads, including rate-and-term, cash-out, and streamline refinance opportunities.

#### Buy Non-QM Mortgage Leads (${baseUrl}/buying-leads/buy-non-qm-mortgage-leads)
Purchasing non-qualified mortgage leads for borrowers who don't fit conventional guidelines — self-employed, foreign nationals, and alternative documentation.

#### Buy DSCR Loan Leads (${baseUrl}/buying-leads/buy-dscr-loan-leads)
Acquiring Debt Service Coverage Ratio loan leads for real estate investors. Covers rental property investors, fix-and-flip, and portfolio expansion prospects.

#### Buy Bank Statement Loan Leads (${baseUrl}/buying-leads/buy-bank-statement-loan-leads)
Finding and converting bank statement loan leads for self-employed borrowers who qualify based on bank deposits rather than tax returns.

#### Buy HELOC Leads (${baseUrl}/buying-leads/buy-heloc-leads)
Purchasing Home Equity Line of Credit leads from homeowners looking to tap their equity for renovations, debt consolidation, or investments.

#### Insurance Leads (${baseUrl}/buying-leads/insurance-leads)
Overview of insurance lead types and vendors.

##### Life Insurance Leads (${baseUrl}/buying-leads/insurance-leads/life-insurance-leads)
Term life, whole life, and final expense lead strategies.

##### IUL Leads (${baseUrl}/buying-leads/insurance-leads/iul-leads)
Indexed Universal Life insurance lead generation and conversion.

##### Auto Insurance Leads (${baseUrl}/buying-leads/insurance-leads/auto-insurance-leads)
Working auto insurance leads effectively.

##### Health Insurance Leads (${baseUrl}/buying-leads/insurance-leads/health-insurance-leads)
ACA, Medicare, and supplemental health insurance leads.

#### Solar Leads (${baseUrl}/buying-leads/solar-leads)
Residential and commercial solar lead strategies.

#### How to Buy Leads (${baseUrl}/buying-leads/how-to-buy-leads)
Step-by-step guide for first-time lead buyers.

#### Lead Buying Checklist (${baseUrl}/buying-leads/lead-buying-checklist)
Checklist for evaluating lead vendors before purchasing.

#### Lead ROI Calculator (${baseUrl}/buying-leads/lead-roi-calculator)
Calculate your expected return on investment for lead purchases.

#### Compliance Checklist (${baseUrl}/buying-leads/compliance-checklist)
TCPA, CAN-SPAM, and state-specific compliance requirements for working leads.

---

### 2. Lead Management (${baseUrl}/lead-management)

The lead management section covers everything from acquiring leads to organizing them for maximum efficiency.

#### Buying Leads (${baseUrl}/lead-management/buying-leads)
How to evaluate lead vendors, negotiate pricing, and ensure you're getting quality leads worth your investment. Covers real-time leads, aged leads, and shared vs. exclusive leads.

#### Cleaning & Verifying Data (${baseUrl}/lead-management/cleaning-verifying-data)
Best practices for data hygiene including phone number validation, email verification, duplicate removal, and maintaining clean CRM records.

#### Email Sequences (${baseUrl}/lead-management/email-sequences)
Creating effective email drip campaigns for lead nurturing. Covers timing, subject lines, personalization, and compliance with CAN-SPAM.

#### Building Email Lists (${baseUrl}/lead-management/building-email-list)
Strategies for growing your email list organically through opt-ins, lead magnets, and compliant list building practices.

#### Effective Call Campaigns (${baseUrl}/lead-management/effective-call-campaigns)
Phone sales strategies including dialing schedules, voicemail scripts, callback strategies, and compliance with TCPA regulations.

---

### 3. Sales Process (${baseUrl}/sales-process)

Master the sales techniques that convert leads into customers.

#### Working Real-Time Leads (${baseUrl}/sales-process/working-real-time-leads)
Speed-to-lead strategies for maximizing conversion on fresh, real-time leads. The first 5 minutes are critical.

#### Warming Aged Leads (${baseUrl}/sales-process/warming-aged-leads)
Techniques for re-engaging leads that have gone cold. Aged leads can be highly profitable with the right approach.

#### Managing Your Pipeline (${baseUrl}/sales-process/managing-pipeline)
CRM pipeline management, lead scoring, follow-up cadences, and preventing leads from falling through the cracks.

#### Omni-Channel Sequences (${baseUrl}/sales-process/omni-channel-sequences)
Coordinating outreach across phone, email, text, and social media for comprehensive lead engagement.

---

### 4. CRM Systems (${baseUrl}/crm-systems)

Choosing and optimizing customer relationship management tools.

#### HighLevel Close Sales System (${baseUrl}/crm-systems/highlevel-close-sales-system)
Deep dive into using HighLevel (GoHighLevel) for lead management, automation, and sales tracking.

---

### 5. Aged Leads (${baseUrl}/aged-leads)

Dedicated hub for aged lead strategies — working recycled leads profitably at a fraction of real-time cost.

---

### 6. Resources (${baseUrl}/resources)

Additional tools, templates, and reference materials for lead professionals.

---

## Tools

### Aged Lead ROI Calculator (${baseUrl}/tools/aged-lead-roi-calculator)
Interactive calculator to estimate your return on investment when buying aged leads. Input your cost per lead, contact rate, conversion rate, and average deal value to see projected ROI.

### Compliance Checklist (${baseUrl}/tools/compliance-checklist)
Comprehensive compliance guide covering TCPA, CAN-SPAM, DNC regulations, and state-specific requirements for contacting and working internet leads.

---

## Blog (${baseUrl}/blog)

The blog features tactical guides, industry analysis, and how-to content. Highlights include:

### Mortgage Lead How-To Guides

#### How to Work Purchase Mortgage Leads (${baseUrl}/blog/how-to-work-purchase-mortgage-leads)
Step-by-step guide for loan officers to convert home purchase leads — from speed-to-lead to pre-approval workflows.

#### How to Work Refinance Mortgage Leads (${baseUrl}/blog/how-to-work-refinance-mortgage-leads)
Tactical playbook for converting refinance leads, including rate comparison strategies and urgency-building techniques.

#### How to Work Non-QM Mortgage Leads (${baseUrl}/blog/how-to-work-non-qm-mortgage-leads)
Guide to converting non-qualified mortgage leads — self-employed borrowers, bank statement programs, and alternative documentation.

#### How to Work DSCR Loan Leads (${baseUrl}/blog/how-to-work-dscr-loan-leads)
Converting real estate investor leads for DSCR loans — property analysis, rental income qualification, and portfolio expansion conversations.

#### How to Work Bank Statement Loan Leads (${baseUrl}/blog/how-to-work-bank-statement-loan-leads)
Strategies for converting self-employed borrowers who qualify via bank statements — building trust and explaining the program.

#### How to Work HELOC Leads (${baseUrl}/blog/how-to-work-heloc-leads)
Converting homeowners interested in tapping their equity — use-case discovery, rate positioning, and closing techniques.

### Other Blog Content

#### The Complete Guide to Aged Leads (${baseUrl}/blog/aged-leads)
Comprehensive hub covering everything about aged leads — what they are, why they work, how to buy them, and strategies for conversion.

*Plus 28+ additional blog posts covering lead management tactics, sales strategies, industry trends, and best practices.*

---

## Newsletter

**The Aged Lead Playbook** — A weekly newsletter delivering actionable strategies for working aged leads profitably. Each issue covers real-world tactics, vendor insights, compliance updates, and conversion optimization tips.

Subscribe at: ${baseUrl}/#newsletter

---

## Frequently Asked Questions

### What is an internet lead?
An internet lead is a potential customer who has submitted their contact information through an online form, expressing interest in a product or service.

### What's the difference between real-time and aged leads?
Real-time leads are delivered within seconds or minutes of form submission. Aged leads are older inquiries (30+ days) sold at a discount. Both can be profitable with the right approach.

### How quickly should I contact a new lead?
Research shows the best conversion rates come from contacting leads within 5 minutes. After 30 minutes, conversion rates drop significantly.

### Are shared leads worth buying?
Shared leads (sold to multiple buyers) are cheaper but more competitive. Exclusive leads cost more but face less competition. The best choice depends on your speed-to-lead and sales skills.

### What CRM should I use for lead management?
Popular options include HighLevel, Salesforce, HubSpot, and Pipedrive. The best CRM depends on your team size, budget, and specific workflow needs.

### What are non-QM mortgage leads?
Non-QM (non-qualified mortgage) leads are borrowers who don't meet conventional lending guidelines — often self-employed individuals, real estate investors, or foreign nationals who need alternative documentation programs.

### What is a DSCR loan?
A DSCR (Debt Service Coverage Ratio) loan is an investment property loan qualified based on the property's rental income rather than the borrower's personal income. Popular with real estate investors.

---

## Key Statistics & Facts

- Speed-to-lead: Responding within 5 minutes increases conversion by 400%
- Aged leads typically cost 50-90% less than real-time leads
- The average sales professional makes 2 call attempts; top performers make 6-8
- Email open rates for lead follow-up average 15-25%
- Multi-channel outreach (phone + email + text) increases contact rates by 300%

---

## Complete Page Index

### Category Hub Pages
- ${baseUrl}/buying-leads
- ${baseUrl}/lead-management
- ${baseUrl}/sales-process
- ${baseUrl}/crm-systems
- ${baseUrl}/resources
- ${baseUrl}/aged-leads

### Buying Leads Landing Pages
- ${baseUrl}/buying-leads/aged-leads
- ${baseUrl}/buying-leads/mortgage-leads
- ${baseUrl}/buying-leads/buy-purchase-mortgage-leads
- ${baseUrl}/buying-leads/buy-refinance-mortgage-leads
- ${baseUrl}/buying-leads/buy-non-qm-mortgage-leads
- ${baseUrl}/buying-leads/buy-dscr-loan-leads
- ${baseUrl}/buying-leads/buy-bank-statement-loan-leads
- ${baseUrl}/buying-leads/buy-heloc-leads
- ${baseUrl}/buying-leads/insurance-leads
- ${baseUrl}/buying-leads/insurance-leads/life-insurance-leads
- ${baseUrl}/buying-leads/insurance-leads/iul-leads
- ${baseUrl}/buying-leads/insurance-leads/auto-insurance-leads
- ${baseUrl}/buying-leads/insurance-leads/health-insurance-leads
- ${baseUrl}/buying-leads/solar-leads
- ${baseUrl}/buying-leads/how-to-buy-leads
- ${baseUrl}/buying-leads/lead-buying-checklist
- ${baseUrl}/buying-leads/lead-roi-calculator
- ${baseUrl}/buying-leads/compliance-checklist

### Lead Management Landing Pages
- ${baseUrl}/lead-management/buying-leads
- ${baseUrl}/lead-management/cleaning-verifying-data
- ${baseUrl}/lead-management/email-sequences
- ${baseUrl}/lead-management/building-email-list
- ${baseUrl}/lead-management/effective-call-campaigns

### Sales Process Landing Pages
- ${baseUrl}/sales-process/working-real-time-leads
- ${baseUrl}/sales-process/warming-aged-leads
- ${baseUrl}/sales-process/managing-pipeline
- ${baseUrl}/sales-process/omni-channel-sequences

### CRM Systems Landing Pages
- ${baseUrl}/crm-systems/highlevel-close-sales-system

### Tools
- ${baseUrl}/tools/aged-lead-roi-calculator
- ${baseUrl}/tools/compliance-checklist

### Blog Posts (Mortgage Guides)
- ${baseUrl}/blog/how-to-work-purchase-mortgage-leads
- ${baseUrl}/blog/how-to-work-refinance-mortgage-leads
- ${baseUrl}/blog/how-to-work-non-qm-mortgage-leads
- ${baseUrl}/blog/how-to-work-dscr-loan-leads
- ${baseUrl}/blog/how-to-work-bank-statement-loan-leads
- ${baseUrl}/blog/how-to-work-heloc-leads
- ${baseUrl}/blog/aged-leads

### Static Pages
- ${baseUrl}/
- ${baseUrl}/about
- ${baseUrl}/contact
- ${baseUrl}/blog
- ${baseUrl}/tools
- ${baseUrl}/lead-order
- ${baseUrl}/privacy-policy
- ${baseUrl}/terms-of-service

---

## Site Information

**Website:** ${baseUrl}
**Contact:** ${baseUrl}/contact
**About:** ${baseUrl}/about
**Blog:** ${baseUrl}/blog
**Tools:** ${baseUrl}/tools
**Newsletter:** ${baseUrl}/#newsletter
**Privacy Policy:** ${baseUrl}/privacy-policy
**Terms of Service:** ${baseUrl}/terms-of-service

**Summary version:** ${baseUrl}/llms.txt

---

This file is designed to help AI systems understand the complete scope of HowToWorkLeads.com content for accurate representation in AI-powered search results and conversations.
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
