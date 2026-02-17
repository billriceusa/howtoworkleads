# Content Brief: Aged Lead ROI Calculator (Interactive Tool)

**Status:** Not Started
**Phase:** 3 (Authority)
**Priority:** 21

---

## Target

- **Primary Keyword:** `aged lead ROI calculator`
- **Secondary Keywords:** `lead ROI calculator`, `cost per acquisition calculator leads`, `lead conversion calculator`, `insurance lead ROI`, `mortgage lead ROI calculator`
- **Search Intent:** Transactional / Tool
- **Target Word Count:** 800-1,200 (supporting content around the tool)
- **Content Type:** Interactive Tool Page
- **URL:** `/tools/aged-lead-roi-calculator`

---

## Competitive Analysis

- AgedLeadStore mentions an ROI calculator concept but doesn't have a live interactive one
- Generic marketing ROI calculators exist (HubSpot, Omnicalculator) but nothing specific to aged leads
- No lead-specific ROI calculator exists that accounts for lead age, industry, and conversion rate benchmarks
- **Interactive tools earn backlinks** — this is a link-building asset more than a traffic page

---

## Tool Specification

### Inputs (User Fills In)
1. **Industry** — dropdown: Life Insurance, Health Insurance, Final Expense, Medicare, Mortgage (Purchase), Mortgage (Refinance), Solar, Home Improvement, Auto Insurance, Other
2. **Lead type** — dropdown: Aged (30-60 days), Aged (60-180 days), Aged (180+ days), Fresh/Real-Time
3. **Number of leads purchased** — number input (default: 1,000)
4. **Cost per lead** — dollar input (auto-filled based on industry + lead type selection, user can override)
5. **Your expected close rate** — percentage input (auto-filled with industry benchmark, user can override)
6. **Average revenue per closed deal** — dollar input (auto-filled with industry estimate, user can override)

### Outputs (Calculated)
1. **Total lead investment** — leads x cost per lead
2. **Expected conversions** — leads x close rate
3. **Expected revenue** — conversions x revenue per deal
4. **ROI** — (revenue - investment) / investment x 100
5. **Cost per acquisition** — total investment / conversions
6. **Revenue per lead** — total revenue / total leads
7. **Break-even point** — how many leads you need to close ONE deal to break even

### Benchmark Comparison
Show user's inputs vs. industry benchmarks side by side:
- "Your close rate vs. industry average"
- "Your CPA vs. industry average"
- "Your ROI vs. typical aged lead ROI"

### Pre-Filled Industry Defaults

| Industry | 30-60d Cost | Close Rate | Avg Revenue |
|----------|------------|-----------|------------|
| Life Insurance | $3.00 | 3% | $1,200 |
| Health/ACA | $3.50 | 2.5% | $800 |
| Final Expense | $2.00 | 1.5% | $450 |
| Medicare | $4.00 | 2% | $600 |
| Mortgage (Purchase) | $4.00 | 1.5% | $3,000 |
| Mortgage (Refi) | $3.00 | 2% | $2,000 |
| Solar | $3.50 | 1.5% | $4,000 |
| Home Improvement | $2.00 | 2% | $3,500 |

---

## Page Content Outline

### H1: Aged Lead ROI Calculator — See Your Real Return

### Above the calculator:
- Brief intro (2-3 sentences): "Find out exactly how much revenue your aged lead investment could generate. Adjust the inputs to match your business, or use our industry benchmarks."

### The Calculator (Interactive Component)
- Clean, simple UI — inputs on left, outputs on right (or top/bottom on mobile)
- Instant calculation (no submit button — updates as user changes inputs)
- Color-coded: green for positive ROI, red for negative

### Below the calculator:

### H2: How to Interpret Your Results
- What a "good" ROI looks like for aged leads (200%+ is common)
- Why CPA matters more than cost-per-lead
- The break-even insight: even ONE closed deal from 500 aged leads is often profitable

### H2: How to Improve Your Aged Lead ROI
- Increase close rate: better scripts, more follow-up touches (link to scripts post)
- Decrease cost per lead: buy in volume, use older leads, negotiate with vendor
- Increase deal value: upsell, cross-sell, bundle products
- Link to cadence, scripts, and CRM posts

### H2: FAQ
1. **What's a good ROI on aged leads?** [200-500% is common with a good system]
2. **How accurate are these benchmarks?** [Industry averages — your results will vary based on your system, scripts, and follow-up]
3. **Why is my ROI negative?** [Usually means close rate is too low or deal value is too low — improve your system before blaming leads]

---

## Technical Implementation

### Build Approach
- **Client-side JavaScript** — no server needed, instant calculation
- React component within Next.js page
- Use `useState` for reactive inputs
- Style with Tailwind to match site design
- Mobile responsive (stack inputs/outputs vertically)

### Files to Create/Modify
- `apps/web/app/tools/aged-lead-roi-calculator/page.tsx` — page component
- `apps/web/components/tools/ROICalculator.tsx` — calculator component
- May need to add `/tools` to navigation and sitemap

### Structured Data
- `SoftwareApplication` schema for the calculator
- `FAQPage` schema for the FAQ section

---

## Required Elements

- [ ] Interactive calculator (client-side JS)
- [ ] Industry benchmark defaults
- [ ] FAQ section (3 questions) with FAQPage schema
- [ ] SoftwareApplication schema
- [ ] CTA: "Get leads to test your ROI" → AgedLeadStore (promo code BILLRICE)
- [ ] CTA: "Need help improving your numbers?" → Book a Lead Strategy Call
- [ ] CTA: Newsletter signup
- [ ] Internal links to:
  - `/blog/aged-lead-conversion-rates`
  - `/blog/aged-lead-pricing-guide`
  - `/blog/aged-lead-scripts-templates`
  - `/blog/aged-lead-follow-up-cadence`
  - `/aged-leads` (hub)
- [ ] Meta title: `Aged Lead ROI Calculator: See Your Real Return by Industry`
- [ ] Meta description: `Calculate your ROI on aged leads instantly. Enter your industry, lead cost, and close rate to see expected revenue, CPA, and break-even point.`

---

## Writing Notes

- **The tool IS the content.** Keep surrounding text minimal — people came for the calculator.
- **Pre-filled defaults reduce friction.** Let users see results instantly, then customize.
- **This earns backlinks.** Industry blogs, agent training sites, and forums link to useful tools. This is a link-building investment.
- **Share-worthy:** Consider adding a "Share your results" or "Download results as PDF" feature.
