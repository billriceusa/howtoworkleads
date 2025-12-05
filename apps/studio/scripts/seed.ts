// Sanity Content Seed Script
// Run with: npx sanity exec scripts/seed.ts --with-user-token

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'e9k38j42',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Need a write token
  useCdn: false,
})

// First, we need to get the category IDs
async function getCategoryId(slug: string): Promise<string | null> {
  const result = await client.fetch(
    `*[_type == "categoryPage" && slug.current == $slug][0]._id`,
    { slug }
  )
  return result
}

interface LandingPageData {
  title: string
  slug: string
  categorySlug: string
  seoTitle: string
  seoDescription: string
  heroHeadline: string
  heroSubheadline: string
  content: string
}

const landingPages: LandingPageData[] = [
  // Lead Management Pages
  {
    title: 'Buying Leads: The Complete Guide',
    slug: 'buying-leads',
    categorySlug: 'lead-management',
    seoTitle: 'Buying Leads: The Complete Guide for Sales Professionals',
    seoDescription: 'Learn how to evaluate lead vendors, negotiate pricing, and ensure you\'re getting quality leads that convert into sales.',
    heroHeadline: 'Buying Leads: The Complete Guide',
    heroSubheadline: 'Learn how to evaluate lead vendors, negotiate pricing, and ensure you\'re getting quality leads that convert.',
    content: `Buying leads is one of the fastest ways to fill your sales pipeline, but it's crucial to understand what you're purchasing and how to maximize your ROI.

## Why Buy Leads?

Purchasing leads allows you to:
- Scale your sales operation quickly
- Focus on selling rather than prospecting
- Test new markets with minimal risk
- Maintain a consistent flow of opportunities

## Types of Leads You Can Buy

### Real-Time Leads
Fresh leads delivered within minutes of the prospect filling out a form. These have the highest conversion rates but also the highest cost.

### Aged Leads
Leads that are 30-90+ days old. Lower cost but require more nurturing to convert.

### Exclusive vs. Shared
Exclusive leads are sold to only one buyer, while shared leads may be sold to multiple buyers.

## How to Evaluate Lead Vendors

Before purchasing from any vendor, ask these questions:
1. What is the lead source?
2. How are leads verified?
3. What is your return policy?
4. Can I see sample leads first?
5. What is your average contact rate?

## Best Practices for Working Purchased Leads

Speed matters - contact leads within 5 minutes for best results. Have a multi-touch sequence ready including calls, emails, and SMS.`,
  },
  {
    title: 'Cleaning and Verifying Consumer Data',
    slug: 'cleaning-verifying-data',
    categorySlug: 'lead-management',
    seoTitle: 'Cleaning and Verifying Consumer Data - Lead Data Hygiene Guide',
    seoDescription: 'Essential techniques for data hygiene, verification services, and maintaining accurate lead information for better conversions.',
    heroHeadline: 'Cleaning and Verifying Consumer Data',
    heroSubheadline: 'Essential techniques for maintaining accurate lead information and improving contact rates.',
    content: `Clean data is the foundation of successful lead conversion. Bad data wastes time, money, and damages your sender reputation.

## Why Data Cleaning Matters

- 30% of data decays annually
- Bad phone numbers waste dialer time
- Invalid emails hurt deliverability
- Duplicate records create confusion

## Data Verification Services

### Phone Verification
Services like Twilio Lookup, NumVerify, and Real Phone Validation can verify if numbers are valid, mobile vs. landline, and connected.

### Email Verification
Use services like ZeroBounce, NeverBounce, or BriteVerify to validate email addresses before sending campaigns.

### Address Verification
USPS address verification ensures mail reaches recipients and helps with compliance.

## Building a Data Hygiene Process

1. Verify data on import
2. Remove duplicates regularly
3. Update records after contact attempts
4. Append missing data points
5. Archive old, unresponsive records

## Tools for Data Cleaning

Popular tools include:
- Clearbit for data enrichment
- ZoomInfo for B2B data
- Melissa Data for consumer data
- Your CRM's built-in deduplication`,
  },
  {
    title: 'Email Sequences to Engage Leads',
    slug: 'email-sequences',
    categorySlug: 'lead-management',
    seoTitle: 'Email Sequences to Engage Leads - Drip Campaign Guide',
    seoDescription: 'Build automated email sequences that nurture leads through your sales funnel and boost conversions with proven templates.',
    heroHeadline: 'Email Sequences to Engage Leads',
    heroSubheadline: 'Build automated email sequences that nurture leads and drive sales.',
    content: `Email sequences are automated series of emails that nurture leads over time, keeping you top of mind until they're ready to buy.

## Why Email Sequences Work

- 80% of sales require 5+ follow-ups
- Automated sequences ensure consistency
- Personalization increases engagement
- Sequences work while you sleep

## Types of Email Sequences

### Welcome Sequence
Introduce new leads to your company and offerings over 3-5 emails.

### Nurture Sequence
Long-term drip campaigns that provide value and keep you top of mind.

### Re-engagement Sequence
Win back cold leads who haven't responded in 30+ days.

### Post-Call Sequence
Follow up after phone conversations with relevant information.

## Email Sequence Best Practices

1. **Subject Lines**: Keep them short, personal, and curiosity-inducing
2. **Timing**: Space emails 2-3 days apart initially, then weekly
3. **Value First**: Lead with helpful content, not sales pitches
4. **Clear CTAs**: One clear call-to-action per email
5. **Mobile-Friendly**: 60%+ of emails are read on mobile

## Sample 5-Email Nurture Sequence

**Email 1 (Day 0)**: Welcome + introduce your value proposition
**Email 2 (Day 2)**: Share a helpful resource or tip
**Email 3 (Day 5)**: Case study or success story
**Email 4 (Day 8)**: Address common objections
**Email 5 (Day 12)**: Direct offer with urgency`,
  },
  {
    title: 'Building Your Email List',
    slug: 'building-email-list',
    categorySlug: 'lead-management',
    seoTitle: 'Building Your Email List - Lead Generation Strategies',
    seoDescription: 'Strategies for growing a high-quality email list that generates consistent sales opportunities and revenue.',
    heroHeadline: 'Building Your Email List',
    heroSubheadline: 'Strategies for growing a high-quality email list that generates consistent sales opportunities.',
    content: `Your email list is one of your most valuable business assets. Unlike social media followers, you own your email list.

## Why Build an Email List?

- Direct access to prospects
- No algorithm changes to worry about
- Higher conversion rates than social
- Asset you own and control

## Lead Magnets That Convert

Offer something valuable in exchange for an email address:

### For Insurance
- Coverage comparison guides
- Rate calculators
- Claims checklists

### For Mortgage
- Home buying guides
- Rate comparison tools
- Pre-approval checklists

### For Solar
- Savings calculators
- Installation guides
- Incentive summaries

## List Building Strategies

1. **Website Opt-ins**: Pop-ups, slide-ins, and embedded forms
2. **Content Upgrades**: Bonus content for blog readers
3. **Webinars**: Educational events that capture registrations
4. **Social Media**: Lead ads on Facebook and LinkedIn
5. **Referrals**: Incentivize existing contacts to refer others

## Maintaining List Quality

- Use double opt-in
- Clean your list quarterly
- Segment by engagement
- Remove bounces immediately
- Honor unsubscribes promptly`,
  },
  {
    title: 'Effective Call Campaigns',
    slug: 'effective-call-campaigns',
    categorySlug: 'lead-management',
    seoTitle: 'Effective Call Campaigns - Phone Sales Strategies',
    seoDescription: 'Proven phone strategies for reaching leads at the right time with the right message to maximize conversions.',
    heroHeadline: 'Effective Call Campaigns',
    heroSubheadline: 'Proven phone strategies for reaching leads at the right time with the right message.',
    content: `Phone calls remain one of the most effective ways to convert leads, but success requires strategy and persistence.

## The Speed-to-Lead Advantage

Calling within 5 minutes of lead submission increases contact rates by 900%. Every minute you wait, conversion probability drops.

## Best Times to Call

Research shows optimal calling windows:
- **Best days**: Wednesday and Thursday
- **Best times**: 8-9 AM and 4-5 PM local time
- **Avoid**: Monday mornings and Friday afternoons

## Call Cadence Best Practices

Don't give up after one attempt:
- Day 1: 3 call attempts
- Day 2: 2 call attempts
- Day 3-7: 1 call attempt daily
- Week 2+: 2-3 calls per week

## Voicemail Strategies

When you can't reach them live:
1. Keep it under 30 seconds
2. State your name and company
3. Mention why you're calling
4. Create curiosity to call back
5. Leave your number twice

## Handling Objections

Common objections and responses:
- "I'm not interested" → "I understand. May I ask what changed since you requested information?"
- "I'm busy" → "I appreciate that. When would be a better time for a 5-minute call?"
- "Send me information" → "I'd be happy to. What specific questions can I address in that email?"

## Tracking and Optimization

Track these metrics:
- Contact rate
- Conversation rate
- Appointment set rate
- Close rate by lead source`,
  },
  // Sales Process Pages
  {
    title: 'How to Work Real-Time Leads',
    slug: 'working-real-time-leads',
    categorySlug: 'sales-process',
    seoTitle: 'How to Work Real-Time Leads - Speed to Lead Guide',
    seoDescription: 'Speed-to-lead strategies and best practices for maximizing conversions from fresh internet leads.',
    heroHeadline: 'How to Work Real-Time Leads',
    heroSubheadline: 'Speed-to-lead strategies and best practices for maximizing conversions from fresh internet leads.',
    content: `Real-time leads are the hottest prospects you'll work with. They've just expressed interest, and your job is to connect before they move on.

## The 5-Minute Rule

Contact real-time leads within 5 minutes. Studies show:
- 5 minutes: 900% higher contact rate
- 10 minutes: 400% higher contact rate
- 30 minutes: Dramatically lower results

## Setting Up for Speed

### Technology Requirements
- Auto-dialer or click-to-call
- Lead routing automation
- Mobile notifications
- CRM with instant alerts

### Process Requirements
- Dedicated lead working time
- Pre-written scripts ready
- Calendar open for appointments
- Quiet space for calls

## The First Call Script

Opening (10 seconds):
"Hi [Name], this is [Your Name] with [Company]. You recently requested information about [product/service]. Do you have a quick moment?"

Discovery (2-3 minutes):
Ask about their situation, timeline, and what prompted their interest.

Value Proposition (1 minute):
Briefly explain how you can help based on what they shared.

Close (30 seconds):
Set an appointment or next step.

## Multi-Channel Follow-Up

After the first call attempt:
1. Send an immediate text message
2. Send a personalized email
3. Try calling again in 15 minutes
4. Connect on LinkedIn if B2B

## Common Mistakes to Avoid

- Waiting too long to call
- Reading from a script robotically
- Talking too much, listening too little
- Not having a clear next step
- Giving up after 1-2 attempts`,
  },
  {
    title: 'How to Warm Up Aged Leads',
    slug: 'warming-aged-leads',
    categorySlug: 'sales-process',
    seoTitle: 'How to Warm Up Aged Leads - Re-engagement Strategies',
    seoDescription: 'Turn old leads into new opportunities with proven re-engagement strategies and sequences that convert.',
    heroHeadline: 'How to Warm Up Aged Leads',
    heroSubheadline: 'Turn old leads into new opportunities with proven re-engagement strategies.',
    content: `Aged leads—those 30, 60, or 90+ days old—are often overlooked gold mines. With the right approach, you can convert them at a fraction of the cost of new leads.

## Why Aged Leads Are Valuable

- 50-80% cheaper than real-time leads
- Circumstances may have changed
- Competition has moved on
- They already know your brand

## Re-Engagement Strategies

### The "Checking In" Approach
"Hi [Name], I wanted to follow up on your inquiry from [timeframe]. Has your situation changed, or are you still exploring options?"

### The Value-Add Approach
Lead with new information: market changes, new products, limited-time offers, or helpful resources.

### The Survey Approach
"We're updating our records. Are you still in the market for [product/service]?"

## Aged Lead Sequences

### Week 1
- Day 1: Email with value proposition refresh
- Day 2: Phone call attempt
- Day 4: Text message
- Day 6: Second email with case study

### Week 2
- Day 8: Phone call
- Day 10: Email with special offer
- Day 12: Final attempt email

## Segmenting Aged Leads

Prioritize based on:
1. Original lead quality/source
2. Previous engagement level
3. Time since last contact
4. Demographic fit

## Converting Aged Leads

Keys to success:
- Acknowledge time has passed
- Don't assume they remember you
- Offer something new or different
- Be persistent but respectful
- Track what's working`,
  },
  {
    title: 'How to Manage Your Pipeline',
    slug: 'managing-pipeline',
    categorySlug: 'sales-process',
    seoTitle: 'How to Manage Your Pipeline - Sales Pipeline Management',
    seoDescription: 'Pipeline management techniques that keep deals moving and prevent leads from falling through the cracks.',
    heroHeadline: 'How to Manage Your Pipeline',
    heroSubheadline: 'Pipeline management techniques that keep deals moving and prevent leads from falling through the cracks.',
    content: `Your sales pipeline is the lifeblood of your business. Effective pipeline management ensures consistent revenue and predictable growth.

## Pipeline Stages

Define clear stages for your sales process:

1. **New Lead**: Just received, not yet contacted
2. **Contacted**: Had initial conversation
3. **Qualified**: Confirmed need, budget, timeline
4. **Proposal Sent**: Presented solution/pricing
5. **Negotiation**: Working through objections
6. **Closed Won/Lost**: Final outcome

## Daily Pipeline Review

Every day, review:
- New leads to contact
- Follow-ups due today
- Stalled deals needing attention
- Appointments scheduled

## Weekly Pipeline Metrics

Track these numbers weekly:
- Total pipeline value
- Number of deals per stage
- Average deal size
- Win rate by stage
- Average time in each stage

## Preventing Pipeline Leaks

Leads fall through the cracks when:
- No follow-up task is set
- Contact information is wrong
- Notes are incomplete
- Handoffs aren't clear

## Pipeline Velocity

Increase velocity by:
1. Shortening time between touches
2. Removing unnecessary steps
3. Addressing objections proactively
4. Setting clear next steps always
5. Using automation for routine tasks

## CRM Best Practices

- Update records after every interaction
- Log all calls, emails, and meetings
- Set next action before closing record
- Use consistent stage definitions
- Review pipeline in team meetings`,
  },
  {
    title: 'Integrated Omni-Channel Sequences',
    slug: 'omni-channel-sequences',
    categorySlug: 'sales-process',
    seoTitle: 'Omni-Channel Sequences - Multi-Touch Sales Sequences',
    seoDescription: 'Build multi-touch sequences across email, phone, SMS, and social that actually convert leads into customers.',
    heroHeadline: 'Integrated Omni-Channel Sequences',
    heroSubheadline: 'Build multi-touch sequences across email, phone, SMS, and social that actually convert.',
    content: `Modern buyers expect to hear from you across multiple channels. An integrated omni-channel approach dramatically increases contact and conversion rates.

## Why Omni-Channel Works

- Different people prefer different channels
- Multiple touches increase recall
- Reinforces your message
- Catches people at the right moment

## Channel Overview

### Phone
Best for: Complex conversations, building rapport, handling objections
Timing: Business hours, respect time zones

### Email
Best for: Detailed information, documentation, nurturing
Timing: Tuesday-Thursday, 10 AM or 2 PM

### SMS/Text
Best for: Quick updates, appointment reminders, time-sensitive offers
Timing: Business hours only, keep it brief

### Social (LinkedIn, Facebook)
Best for: Building credibility, soft touches, research
Timing: Varies by platform

## Sample 14-Day Omni-Channel Sequence

**Day 1**
- Immediate: Phone call
- +15 min: SMS if no answer
- +1 hour: Email introduction

**Day 2**
- Morning: Phone call
- Afternoon: Email with value content

**Day 3**
- LinkedIn connection request
- SMS follow-up

**Day 4**
- Phone call
- Email if no answer

**Day 7**
- Phone call
- Email with case study

**Day 10**
- SMS check-in
- Email with offer

**Day 14**
- Final phone attempt
- Break-up email

## Automation Tools

Popular platforms for omni-channel sequences:
- Outreach
- Salesloft
- HubSpot Sequences
- Close.io
- GoHighLevel`,
  },
  // CRM Systems
  {
    title: 'Using High Level or Close to Build Your Sales System',
    slug: 'highlevel-close-sales-system',
    categorySlug: 'crm-systems',
    seoTitle: 'High Level vs Close CRM - Building Your Sales System',
    seoDescription: 'Step-by-step guide to setting up and optimizing High Level or Close CRM for lead management and sales automation.',
    heroHeadline: 'Using High Level or Close to Build Your Sales System',
    heroSubheadline: 'Step-by-step guide to setting up and optimizing your CRM for lead management and sales automation.',
    content: `The right CRM transforms your sales operation from chaos to a well-oiled machine. Both High Level (GoHighLevel) and Close are excellent choices for lead-focused sales teams.

## High Level (GoHighLevel)

### Best For
- Agencies and multi-location businesses
- All-in-one marketing + sales
- White-label solutions
- Budget-conscious teams

### Key Features
- Built-in phone system
- SMS and email marketing
- Landing page builder
- Appointment scheduling
- Pipeline management
- Reputation management

### Setting Up High Level
1. Create your pipelines and stages
2. Set up phone numbers and messaging
3. Build intake forms and landing pages
4. Create automation workflows
5. Configure notifications and alerts

## Close CRM

### Best For
- Inside sales teams
- High-volume calling
- Sales-focused organizations
- Teams wanting simplicity

### Key Features
- Built-in calling and SMS
- Power dialer
- Email sequences
- Pipeline management
- Excellent reporting
- API integrations

### Setting Up Close
1. Import your leads
2. Configure custom fields
3. Set up lead statuses
4. Create Smart Views
5. Build email sequences
6. Set up calling workflows

## Comparison

| Feature | High Level | Close |
|---------|------------|-------|
| Phone | Built-in | Built-in |
| Email Marketing | Yes | Basic |
| Landing Pages | Yes | No |
| Price | $97-297/mo | $49-149/user |
| Learning Curve | Steeper | Easier |
| Best For | All-in-one | Pure Sales |

## Implementation Tips

1. Start with core features, add complexity later
2. Train your team thoroughly
3. Set up reporting from day one
4. Integrate with your lead sources
5. Review and optimize monthly`,
  },
  // Buying Leads Pages
  {
    title: 'Buy Aged Leads',
    slug: 'aged-leads',
    categorySlug: 'buying-leads',
    seoTitle: 'Buy Aged Leads - Quality Aged Lead Vendors',
    seoDescription: 'How to evaluate and purchase aged leads that still convert at a fraction of the cost of real-time leads.',
    heroHeadline: 'Buy Aged Leads',
    heroSubheadline: 'How to evaluate and purchase aged leads that still convert at a fraction of the cost.',
    content: `Aged leads are leads that are 30, 60, 90, or more days old. While they require different handling than fresh leads, they can deliver excellent ROI.

## Why Buy Aged Leads?

- 50-90% cheaper than real-time
- Lower competition
- Great for training new reps
- Excellent for testing scripts/offers
- Builds pipeline volume

## Aged Lead Pricing

Typical pricing ranges:
- 30-day aged: $3-8 per lead
- 60-day aged: $1-5 per lead
- 90+ day aged: $0.50-3 per lead

## What to Look For

### Lead Source
Where did the lead originally come from? Quality sources = better aged leads.

### Data Fields Included
More data points = better targeting:
- Full name and contact info
- Original inquiry details
- Geographic information
- Any qualification data

### Exclusivity
How many times has the lead been sold? Fewer sales = better results.

## Top Aged Lead Vendors

Research vendors thoroughly and start with small test purchases before committing to volume.

## Working Aged Leads

Key differences from real-time:
1. Don't expect instant callbacks
2. Use longer nurture sequences
3. Lead with "checking in" messaging
4. Offer current promotions/rates
5. Be prepared for more voicemails

## ROI Calculation

Even with lower contact rates, aged leads can be highly profitable:
- 1000 leads at $2 = $2,000
- 10% contact rate = 100 conversations
- 10% close rate = 10 sales
- Cost per sale = $200`,
  },
  {
    title: 'Buy Mortgage Leads',
    slug: 'mortgage-leads',
    categorySlug: 'buying-leads',
    seoTitle: 'Buy Mortgage Leads - Quality Mortgage Lead Sources',
    seoDescription: 'Find quality mortgage leads from reputable vendors and maximize your conversion rates with our proven strategies.',
    heroHeadline: 'Buy Mortgage Leads',
    heroSubheadline: 'Find quality mortgage leads from reputable vendors and maximize your conversion rates.',
    content: `Mortgage leads are among the most valuable and competitive lead types. Understanding the landscape helps you make smart purchasing decisions.

## Types of Mortgage Leads

### Purchase Leads
Homebuyers looking for financing. Higher intent, higher value.

### Refinance Leads
Homeowners looking to refinance. Volume varies with rates.

### Home Equity Leads
Homeowners seeking HELOCs or home equity loans.

## Lead Sources

### Online Lead Generators
Companies like LendingTree, Bankrate, and NerdWallet generate leads through comparison sites.

### Direct Response
TV, radio, and direct mail campaigns that drive inquiries.

### Affiliate Networks
Networks that aggregate leads from multiple sources.

## Pricing Overview

Mortgage lead pricing varies significantly:
- Exclusive real-time: $50-150+
- Shared real-time: $20-50
- Aged leads: $2-15

## Key Qualification Data

Look for leads with:
- Credit score or range
- Loan amount sought
- Property type and value
- Employment status
- Timeline to purchase/refi

## Compliance Considerations

Mortgage leads require careful compliance:
- TCPA consent verification
- State licensing requirements
- Fair lending practices
- Data security standards

## Vendor Evaluation Questions

1. What is your lead source?
2. How is TCPA consent obtained?
3. What is your return policy?
4. Can you filter by state/credit/loan amount?
5. What is your average contact rate?`,
  },
  {
    title: 'Buy Insurance Leads',
    slug: 'insurance-leads',
    categorySlug: 'buying-leads',
    seoTitle: 'Buy Insurance Leads - Life, Health, Auto Insurance Leads',
    seoDescription: 'Complete guide to buying insurance leads including life insurance, IUL, auto insurance, and health insurance leads.',
    heroHeadline: 'Buy Insurance Leads',
    heroSubheadline: 'Complete guide to buying insurance leads across all major product lines.',
    content: `Insurance leads are a cornerstone of agency growth. Understanding the different types and sources helps you build a sustainable lead strategy.

## Types of Insurance Leads

### Life Insurance Leads
Final expense, term, whole life, and universal life inquiries.

### Health Insurance Leads
ACA marketplace, Medicare, and supplemental health leads.

### Auto Insurance Leads
Drivers shopping for new coverage or better rates.

### Home Insurance Leads
Homeowners seeking property coverage.

### Commercial Insurance Leads
Business insurance inquiries.

## Lead Quality Factors

### Intent Indicators
- Specific coverage requested
- Timeline mentioned
- Current coverage status
- Life events (new home, baby, etc.)

### Data Quality
- Verified phone numbers
- Valid email addresses
- Complete demographic info

## Pricing by Type

| Lead Type | Exclusive | Shared |
|-----------|-----------|--------|
| Life Insurance | $20-50 | $8-20 |
| Health/Medicare | $15-40 | $5-15 |
| Auto Insurance | $15-35 | $5-12 |
| Home Insurance | $15-30 | $5-12 |

## Vendor Categories

### Lead Aggregators
Buy from multiple sources, resell to agents.

### Direct Generators
Create their own leads through marketing.

### Referral Networks
Agent-to-agent or partner referrals.

## Best Practices

1. Start with small test orders
2. Track results by source meticulously
3. Negotiate volume discounts
4. Build relationships with best vendors
5. Diversify your lead sources`,
  },
  {
    title: 'Buy Solar Leads',
    slug: 'solar-leads',
    categorySlug: 'buying-leads',
    seoTitle: 'Buy Solar Leads - Quality Solar Installation Leads',
    seoDescription: 'Connect with homeowners interested in solar installations through quality lead sources and proven conversion strategies.',
    heroHeadline: 'Buy Solar Leads',
    heroSubheadline: 'Connect with homeowners interested in solar installations through quality lead sources.',
    content: `Solar leads connect you with homeowners considering solar panel installation. The market has grown significantly, and so have lead generation options.

## Solar Lead Types

### Exclusive Leads
Sold to one installer only. Higher cost, higher conversion.

### Shared Leads
Sold to 2-4 installers. Lower cost, more competition.

### Appointment Leads
Pre-scheduled appointments with qualified homeowners.

### Live Transfers
Warm transfers from call center to your team.

## Key Qualification Criteria

The best solar leads include:
- Homeownership verified
- Roof age and condition
- Monthly electric bill amount
- Credit score range
- Shading/orientation assessment
- Timeline for installation

## Pricing Ranges

Solar lead pricing varies by type and region:
- Exclusive leads: $50-150
- Shared leads: $20-50
- Appointments: $100-300
- Live transfers: $150-400

## Geographic Considerations

Lead quality and pricing vary by:
- State incentives and policies
- Utility rates
- Sun exposure/climate
- Market saturation
- Installation complexity

## Evaluating Solar Lead Vendors

Ask potential vendors:
1. How do you generate leads?
2. What qualification questions are asked?
3. What is your homeowner verification process?
4. What is your return/replacement policy?
5. Can you provide references?

## Maximizing Conversion

Speed and professionalism matter:
1. Call within 5 minutes
2. Have satellite imagery ready
3. Prepare preliminary savings estimate
4. Offer flexible financing options
5. Book the in-home appointment`,
  },
  {
    title: 'How to Buy Leads',
    slug: 'how-to-buy-leads',
    categorySlug: 'buying-leads',
    seoTitle: 'How to Buy Leads - Complete Lead Buying Guide',
    seoDescription: 'The complete beginner\'s guide to purchasing leads from vendors and marketplaces for your sales operation.',
    heroHeadline: 'How to Buy Leads',
    heroSubheadline: 'The complete beginner\'s guide to purchasing leads from vendors and marketplaces.',
    content: `Buying leads can accelerate your sales growth, but it requires understanding the landscape and making informed decisions.

## Before You Buy

### Define Your Ideal Customer
- Demographics
- Geographic area
- Budget/qualification level
- Specific needs or triggers

### Set Your Budget
- Cost per lead target
- Monthly lead budget
- Acceptable cost per acquisition

### Prepare Your Systems
- CRM configured
- Follow-up sequences ready
- Team trained and available

## Finding Lead Vendors

### Industry-Specific Vendors
Search for vendors specializing in your industry (insurance leads, mortgage leads, etc.)

### Lead Marketplaces
Platforms connecting buyers with multiple lead sources.

### Referral Networks
Ask other professionals who they use.

## Evaluating Vendors

### Initial Questions
1. How are leads generated?
2. What data fields are included?
3. How fresh are the leads?
4. What is pricing and minimums?
5. What is your return policy?

### Test Orders
Always start with a small test:
- Order 25-100 leads
- Track every metric
- Compare to benchmarks
- Evaluate before scaling

## Negotiating Terms

Don't accept first pricing:
- Ask for volume discounts
- Request trial pricing
- Negotiate return policies
- Bundle for better rates

## After Purchase

### Track Everything
- Contact rate
- Qualification rate
- Appointment rate
- Close rate
- Revenue per lead

### Optimize Continuously
- Test different sources
- Refine your targeting
- Improve your follow-up
- Scale what works`,
  },
  {
    title: 'Lead Buying Checklist',
    slug: 'lead-buying-checklist',
    categorySlug: 'buying-leads',
    seoTitle: 'Lead Buying Checklist - Vendor Evaluation Guide',
    seoDescription: 'Essential checklist to evaluate lead vendors before making a purchase and ensure you\'re getting quality leads.',
    heroHeadline: 'Lead Buying Checklist',
    heroSubheadline: 'Essential checklist to evaluate lead vendors before making a purchase.',
    content: `Use this checklist before purchasing leads from any vendor to ensure you're making a smart investment.

## Vendor Research

- [ ] Company has been in business 2+ years
- [ ] Can find reviews/testimonials online
- [ ] Willing to provide references
- [ ] Has clear contact information
- [ ] Responds promptly to inquiries

## Lead Source Verification

- [ ] Vendor explains how leads are generated
- [ ] Lead source is disclosed (website, ads, etc.)
- [ ] Consent collection process is explained
- [ ] Can provide sample leads for review

## Data Quality

- [ ] Phone numbers are verified/validated
- [ ] Email addresses are verified
- [ ] Data fields meet your requirements
- [ ] Duplicate policy is clear
- [ ] Data is recent and accurate

## Pricing and Terms

- [ ] Pricing is clearly stated
- [ ] Volume discounts available
- [ ] Minimum order requirements reasonable
- [ ] Payment terms are acceptable
- [ ] Contract terms are fair

## Return Policy

- [ ] Return policy exists
- [ ] Invalid lead definition is clear
- [ ] Return window is reasonable (24-72 hours)
- [ ] Return process is simple
- [ ] Credits vs. refunds explained

## Compliance

- [ ] TCPA compliance confirmed
- [ ] DNC scrubbing offered
- [ ] State regulations addressed
- [ ] Data security measures in place
- [ ] Privacy policy available

## Integration

- [ ] Delivery method works for you (email, API, etc.)
- [ ] Can integrate with your CRM
- [ ] Delivery timing meets your needs
- [ ] Support available for technical issues

## Post-Purchase

- [ ] Tracking system in place
- [ ] Success metrics defined
- [ ] Review schedule set
- [ ] Escalation path clear
- [ ] Optimization plan ready`,
  },
  {
    title: 'Lead ROI Calculator',
    slug: 'lead-roi-calculator',
    categorySlug: 'buying-leads',
    seoTitle: 'Lead ROI Calculator - Calculate Your Lead Investment Return',
    seoDescription: 'Calculate your expected return on investment before purchasing leads with our comprehensive ROI framework.',
    heroHeadline: 'Lead ROI Calculator',
    heroSubheadline: 'Calculate your expected return on investment before purchasing leads.',
    content: `Understanding your lead ROI helps you make informed purchasing decisions and optimize your sales operation.

## Basic ROI Formula

ROI = (Revenue from Leads - Cost of Leads) / Cost of Leads × 100

## Key Metrics to Track

### Lead Metrics
- Total leads purchased
- Cost per lead
- Contact rate (%)
- Qualification rate (%)

### Sales Metrics
- Appointments set
- Proposals sent
- Deals closed
- Average deal size

## Sample ROI Calculation

**Scenario:**
- 100 leads purchased at $25 each = $2,500
- 60% contact rate = 60 contacts
- 30% qualification rate = 18 qualified
- 25% close rate = 4.5 sales (round to 4-5)
- Average sale = $3,000

**Results:**
- Revenue: 4 × $3,000 = $12,000
- Cost: $2,500
- Profit: $9,500
- ROI: 380%

## Factors Affecting ROI

### Lead Quality Factors
- Lead source
- Lead freshness
- Exclusivity
- Data accuracy

### Sales Process Factors
- Speed to contact
- Follow-up consistency
- Sales skill
- Offer competitiveness

## Break-Even Analysis

Calculate your break-even point:

Break-even leads = Total Lead Cost / (Close Rate × Average Sale Value)

Example:
- $2,500 in leads
- 4% overall close rate
- $3,000 average sale
- Break-even: $2,500 / (0.04 × $3,000) = 20.8 leads

## Optimization Strategies

Improve ROI by:
1. Negotiating better lead prices
2. Increasing contact rates
3. Improving sales conversion
4. Increasing average deal size
5. Reducing time to close`,
  },
  {
    title: 'Compliance Checklist',
    slug: 'compliance-checklist',
    categorySlug: 'buying-leads',
    seoTitle: 'Lead Compliance Checklist - TCPA & DNC Guide',
    seoDescription: 'Stay compliant with TCPA, DNC, and other regulations when purchasing and contacting leads.',
    heroHeadline: 'Compliance Checklist',
    heroSubheadline: 'Stay compliant with TCPA, DNC, and other regulations when purchasing and contacting leads.',
    content: `Compliance isn't optional—violations can result in significant fines. Use this checklist to ensure your lead practices are compliant.

## TCPA (Telephone Consumer Protection Act)

### Before Calling
- [ ] Verify lead has given prior express consent
- [ ] Maintain records of consent
- [ ] Honor internal DNC requests immediately
- [ ] Scrub against National DNC Registry
- [ ] Scrub against state DNC lists

### During Calls
- [ ] Identify yourself and company clearly
- [ ] State purpose of call promptly
- [ ] Provide phone number or address on request
- [ ] Honor DNC requests immediately
- [ ] Keep calls within allowed hours (8am-9pm local)

### Auto-Dialing Rules
- [ ] No auto-dialed calls without consent
- [ ] No prerecorded messages without consent
- [ ] Provide opt-out mechanism
- [ ] Honor opt-outs within 30 days

## Email Compliance (CAN-SPAM)

- [ ] Don't use deceptive subject lines
- [ ] Identify message as advertisement
- [ ] Include valid physical address
- [ ] Provide clear unsubscribe option
- [ ] Honor unsubscribes within 10 days

## SMS/Text Compliance

- [ ] Obtain express written consent
- [ ] Clearly identify sender
- [ ] Provide opt-out instructions
- [ ] Honor STOP requests immediately
- [ ] Keep messages relevant to consent

## Industry-Specific Rules

### Insurance
- [ ] Verify state licensing requirements
- [ ] Follow state-specific solicitation rules
- [ ] Maintain required disclosures

### Mortgage
- [ ] RESPA compliance
- [ ] Equal Credit Opportunity Act
- [ ] State licensing requirements

### Financial Services
- [ ] Fair Credit Reporting Act
- [ ] Gramm-Leach-Bliley Act
- [ ] State regulations

## Documentation Best Practices

- [ ] Record consent timestamps
- [ ] Keep consent language copies
- [ ] Document DNC requests
- [ ] Maintain call recordings (where legal)
- [ ] Archive compliance training records

## Regular Audits

- [ ] Monthly DNC scrub verification
- [ ] Quarterly consent audit
- [ ] Annual compliance training
- [ ] Vendor compliance verification`,
  },
]

async function seedLandingPages() {
  console.log('Starting content seed...')

  for (const page of landingPages) {
    const categoryId = await getCategoryId(page.categorySlug)

    if (!categoryId) {
      console.log(`Category not found: ${page.categorySlug}, skipping ${page.title}`)
      continue
    }

    // Check if page already exists
    const existing = await client.fetch(
      `*[_type == "landingPage" && slug.current == $slug][0]._id`,
      { slug: page.slug }
    )

    if (existing) {
      console.log(`Page already exists: ${page.title}, skipping`)
      continue
    }

    const doc = {
      _type: 'landingPage',
      title: page.title,
      slug: { _type: 'slug', current: page.slug },
      category: { _type: 'reference', _ref: categoryId },
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      heroSection: {
        _type: 'heroSection',
        headline: page.heroHeadline,
        subheadline: page.heroSubheadline,
      },
      tableOfContents: true,
      content: [
        {
          _type: 'contentBlock',
          _key: 'content-1',
          content: page.content.split('\n\n').map((para, index) => {
            // Check if it's a heading
            if (para.startsWith('## ')) {
              return {
                _type: 'block',
                _key: `block-${index}`,
                style: 'h2',
                children: [{ _type: 'span', _key: `span-${index}`, text: para.replace('## ', '') }],
              }
            }
            if (para.startsWith('### ')) {
              return {
                _type: 'block',
                _key: `block-${index}`,
                style: 'h3',
                children: [{ _type: 'span', _key: `span-${index}`, text: para.replace('### ', '') }],
              }
            }
            // Check if it's a list
            if (para.includes('\n- ')) {
              const items = para.split('\n- ').filter(Boolean)
              return items.map((item, itemIndex) => ({
                _type: 'block',
                _key: `block-${index}-${itemIndex}`,
                style: 'normal',
                listItem: 'bullet',
                children: [{ _type: 'span', _key: `span-${index}-${itemIndex}`, text: item.replace('- ', '') }],
              }))
            }
            // Regular paragraph
            return {
              _type: 'block',
              _key: `block-${index}`,
              style: 'normal',
              children: [{ _type: 'span', _key: `span-${index}`, text: para }],
            }
          }).flat(),
        },
      ],
      publishedAt: new Date().toISOString(),
    }

    try {
      const result = await client.create(doc)
      console.log(`Created: ${page.title} (${result._id})`)
    } catch (error) {
      console.error(`Error creating ${page.title}:`, error)
    }
  }

  console.log('Seed complete!')
}

seedLandingPages()
