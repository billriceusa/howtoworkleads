import { NextResponse } from 'next/server'

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
- Mortgage loan officers
- Solar sales representatives
- Business owners buying leads
- Sales managers optimizing team performance

---

## Content Categories

### 1. Lead Management (${baseUrl}/lead-management)

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

### 2. Sales Process (${baseUrl}/sales-process)

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

### 3. CRM Systems (${baseUrl}/crm-systems)

Choosing and optimizing customer relationship management tools.

#### HighLevel Close Sales System (${baseUrl}/crm-systems/highlevel-close-sales-system)
Deep dive into using HighLevel (GoHighLevel) for lead management, automation, and sales tracking.

---

### 4. Buying Leads (${baseUrl}/buying-leads)

Industry-specific guidance for purchasing leads.

#### Aged Leads (${baseUrl}/buying-leads/aged-leads)
Understanding the aged lead market, pricing expectations, and how to work leads that are 30, 60, or 90+ days old.

#### Mortgage Leads (${baseUrl}/buying-leads/mortgage-leads)
Buying mortgage and refinance leads, including purchase leads, refinance leads, and FHA/VA specialty leads.

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

---

## Key Statistics & Facts

- Speed-to-lead: Responding within 5 minutes increases conversion by 400%
- Aged leads typically cost 50-90% less than real-time leads
- The average sales professional makes 2 call attempts; top performers make 6-8
- Email open rates for lead follow-up average 15-25%
- Multi-channel outreach (phone + email + text) increases contact rates by 300%

---

## Site Information

**Website:** ${baseUrl}
**Contact:** ${baseUrl}/contact
**About:** ${baseUrl}/about
**Blog:** ${baseUrl}/blog
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
