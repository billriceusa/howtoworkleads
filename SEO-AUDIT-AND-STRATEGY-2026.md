# HowToWorkLeads.com — Complete SEO Audit, Strategy & Content Plan

**Date:** March 13, 2026
**Auditor:** Bill Rice / Claude
**Site:** https://www.howtoworkleads.com
**Stack:** Next.js 14 + Sanity CMS + Vercel + Resend

---

## Part 1: Technical SEO Audit

### 1.1 Critical Issues (Fix Immediately)

#### ISSUE #1: Missing Canonical Tags ⚠️ HIGH PRIORITY
**Status:** No `<link rel="canonical">` on ANY page
**Risk:** Duplicate content from www vs non-www, UTM parameters, and query strings
**Fix:** Add `alternates.canonical` to the root layout metadata AND per-page `generateMetadata()` functions

```typescript
// In layout.tsx metadata:
alternates: {
  canonical: 'https://www.howtoworkleads.com',
}

// In each generateMetadata():
alternates: {
  canonical: `https://www.howtoworkleads.com/${category}/${slug}`,
}
```

#### ISSUE #2: Inconsistent Base URL
**Status:** `metadataBase` in `layout.tsx` uses `https://howtoworkleads.com` (no www), but sitemap and robots use `https://www.howtoworkleads.com`
**Risk:** Mixed signals to Google about the canonical domain
**Fix:** Change `NEXT_PUBLIC_SITE_URL` env var and `layout.tsx` default to `https://www.howtoworkleads.com`

#### ISSUE #3: Missing OG Images on Most Pages
**Status:** Homepage and all guide pages lack `og:image`. Only blog posts with Sanity featured images have them.
**Risk:** Social shares show no preview image → dramatically lower CTR on LinkedIn, X, Facebook
**Fix:** Create a branded default OG image (1200x630) and set it as fallback in root layout. For guides, either require OG images in Sanity or auto-generate from title text.

#### ISSUE #4: Placeholder Social Profile URLs
**Status:** Footer links to `https://twitter.com`, `https://linkedin.com`, `https://youtube.com` (generic, not your profiles). These same URLs are in the Organization JSON-LD `sameAs` array.
**Risk:** Sends incorrect authority signals to Google. Linked Data expects real profile URLs.
**Fix:** Either point to Bill Rice's real social profiles or remove the links entirely until real ones exist.

#### ISSUE #5: Title Tags Too Long
**Status:** Most inner page titles exceed 60 characters and will truncate in SERPs.

| Page | Current Length | Issue |
|------|---------------|-------|
| `/buying-leads/buy-aged-leads` | 77 chars | Will truncate |
| `/blog/how-to-work-aged-leads...` | 84 chars | Will truncate |
| `/sales-process/what-is-a-sales-process` | 89 chars | **Double brand suffix** |
| `/aged-leads` | 92 chars | Will truncate |

**Fix:** Shorten all titles to <60 chars. The `template: '%s | How To Work Leads'` in layout.tsx appends ` | How To Work Leads` (20 chars) — so page-level titles should be ≤40 chars. Review every page in Sanity and shorten `seoTitle` values. Fix the double-brand bug on the sales-process page.

---

### 1.2 Important Issues (Fix This Week)

#### ISSUE #6: Missing og:url and og:site_name on Inner Pages
**Status:** Only the homepage sets these. All landing pages, blog posts, and tools are missing them.
**Fix:** Add to each `generateMetadata()`:
```typescript
openGraph: {
  url: `https://www.howtoworkleads.com/${category}/${slug}`,
  siteName: 'How To Work Leads',
  // ... existing fields
}
```

#### ISSUE #7: /aged-leads Pillar Page Has Wrong Twitter Tags
**Status:** Shows homepage defaults ("How To Work Leads | Master Internet Lead Conversion") instead of page-specific content
**Fix:** The `/aged-leads` page's `generateMetadata()` isn't properly overriding twitter metadata. Add explicit twitter fields.

#### ISSUE #8: Article Schema Missing Author & Dates on Guide Pages
**Status:** Non-blog landing pages pass no `authorName`, `datePublished`, or `dateModified` to `ArticleJsonLd`
**Risk:** E-E-A-T signals are incomplete. Google uses author and freshness signals for ranking.
**Fix:** Ensure all landing pages in Sanity have author + dates populated, and the template passes them to `ArticleJsonLd`.

#### ISSUE #9: /aged-leads Missing Article Schema Entirely
**Status:** Only has `BreadcrumbList` — no Article schema at all
**Fix:** Add `ArticleJsonLd` with full author, dates, speakable, and mainEntity.

#### ISSUE #10: No FAQPage Schema on Most Pages
**Status:** The `FAQJsonLd` component exists but is only used when FAQ data is present. Many guide pages have FAQ-style content but no structured FAQ in Sanity.
**Fix:** Audit all existing pages — any with Q&A sections should have FAQ data added in Sanity so the schema renders.

---

### 1.3 Minor Issues (Fix This Month)

| # | Issue | Fix |
|---|-------|-----|
| 11 | Meta description on `/buying-leads/buy-aged-leads` has trailing `\n` | Trim whitespace in Sanity or in `generateMetadata()` |
| 12 | Blog post still says "(2025)" in title | Update to "(2026)" in Sanity |
| 13 | "Explore our resources resources" copy error | Fix duplicate word in Sanity content |
| 14 | No explicit favicon `<link>` tags in `<head>` | Add `icons` to root metadata in `layout.tsx` |
| 15 | Blog posts priority too low in sitemap (0.5) | Increase to 0.6 — blog is a core content type |
| 16 | Google Fonts loaded via `<link>` instead of `next/font` | Migrate to `next/font/google` for better LCP |
| 17 | `logo.png` referenced in Article schema publisher — verify it exists | Check `/public/logo.png` exists at the right URL |
| 18 | Keywords meta tag in root layout | Remove — Google ignores `keywords` meta tag since 2009, it's wasted bytes |

---

### 1.4 What's Working Well (Keep Doing)

- **Robots.txt** — Clean, AI-crawler-friendly configuration
- **Dynamic sitemap** — Auto-includes all Sanity content with correct `lastmod`
- **JSON-LD structured data** — 7 schema types including Speakable
- **llms.txt / llms-full.txt** — Forward-thinking LLM optimization
- **ISR at 60 seconds** — Content updates appear fast
- **Breadcrumbs** — Proper implementation with BreadcrumbList schema
- **H1 tags** — One per page, unique, keyword-relevant
- **Mobile CTA + Exit Intent** — Good conversion optimization
- **UTM tracking on ALS links** — Clean attribution

---

## Part 2: Google Algorithm Alignment Check

### 2.1 Current Algorithm Landscape (2025-2026)

| Update | Date | Key Impact |
|--------|------|-----------|
| March 2025 Core | Mar 13-27 | Surfacing more relevant, satisfying content |
| June 2025 Core | Jun 30-Jul 17 | Ranking swings up to 20% |
| August 2025 Spam | Aug 26-Sep 22 | Scaled content abuse crackdown via SpamBrain AI |
| December 2025 Core | Dec 11-29 | Tighter E-E-A-T requirements |
| February 2026 Discover | Feb 2026 | First Discover-specific core update |

### 2.2 Risk Assessment for HowToWorkLeads

| Risk Factor | Status | Notes |
|-------------|--------|-------|
| Scaled Content Abuse | LOW RISK | Content is AI-assisted but human-reviewed, expert-authored. Quality over volume approach. |
| Site Reputation Abuse | NO RISK | No third-party hosted content |
| E-E-A-T Signals | NEEDS WORK | Author bios are thin. No visible credentials, social proof, or "About the Author" sections. |
| Thin Content | MODERATE RISK | Category hub pages are link grids, not substantive pillar content |
| AI Content Quality | LOW RISK | Content briefs ensure human expertise shapes every piece |
| Link Spam | NO RISK | Clean link profile, legitimate affiliate relationship |

### 2.3 Alignment Actions Required

**E-E-A-T Improvements (HIGHEST IMPACT for 2026 algorithms):**
1. **Expand Bill Rice's author bio** — Add credentials, years in lead gen, client count, industry affiliations. Display on every article.
2. **Add "About the Author" sidebar widget** on all content pages with photo, bio, and social links
3. **Create a robust /about page** — Company story, team, methodology, client logos (with permission)
4. **Add visible publish and update dates** on all content (Google uses freshness as a ranking signal, and December 2025 core update tightened E-E-A-T)
5. **Include first-hand experience signals** — Case study data, screenshots, personal anecdotes in content
6. **Add editorial standards or methodology note** — "Content reviewed by [name], [X] years in insurance/mortgage lead gen"

**AI Overview Optimization:**
- AI Overviews appear on ~16% of queries, with 61% organic CTR drop when present
- BUT AI referral traffic has 23% lower bounce rate and 41% more time on site
- **Action:** Structure content for citation — clear definitions, concise answer-first format, authoritative data points
- The existing llms.txt and Speakable schema are strong foundations here

---

## Part 3: Recommended Technical Fixes (Prioritized)

### Sprint 1: Critical Fixes (This Week)

| # | Fix | File(s) | Effort |
|---|-----|---------|--------|
| 1 | Add canonical tags sitewide | `layout.tsx`, `[category]/[slug]/page.tsx`, `blog/[slug]/page.tsx`, `[category]/page.tsx` | 1 hour |
| 2 | Fix metadataBase to use www | `layout.tsx` + env var | 5 min |
| 3 | Add default OG image | Create `/public/og-default.jpg` (1200x630), add to `layout.tsx` openGraph | 30 min |
| 4 | Fix og:url + og:site_name on inner pages | All `generateMetadata()` functions | 1 hour |
| 5 | Fix placeholder social links | `Footer.tsx` + Organization JSON-LD | 15 min |
| 6 | Fix double brand title on sales-process page | Sanity CMS content | 5 min |

### Sprint 2: E-E-A-T & Schema (Next Week)

| # | Fix | File(s) | Effort |
|---|-----|---------|--------|
| 7 | Add author + dates to all guide Article schema | `[category]/[slug]/page.tsx` | 30 min |
| 8 | Add Article schema to /aged-leads | `/aged-leads/page.tsx` | 15 min |
| 9 | Fix /aged-leads twitter tags | `/aged-leads/page.tsx` generateMetadata | 15 min |
| 10 | Add FAQPage schema to all pages with Q&A content | Sanity content + page templates | 2 hours |
| 11 | Shorten all title tags to <60 chars | Sanity CMS (each page seoTitle) | 1 hour |
| 12 | Add visible author bio component to articles | New component + page templates | 2 hours |
| 13 | Add visible publish/update dates to articles | Page templates | 30 min |

### Sprint 3: Performance & Polish (Week After)

| # | Fix | File(s) | Effort |
|---|-----|---------|--------|
| 14 | Migrate Google Fonts to next/font | `layout.tsx` | 30 min |
| 15 | Add favicon link tags | `layout.tsx` metadata | 10 min |
| 16 | Remove keywords meta tag | `layout.tsx` | 5 min |
| 17 | Verify logo.png exists for schema | `/public/logo.png` | 5 min |
| 18 | Fix minor content issues (year, typo) | Sanity CMS | 15 min |
| 19 | Increase blog sitemap priority to 0.6 | `sitemap.ts` | 5 min |
| 20 | Set up Bing Webmaster Tools | External | 30 min |

---

## Part 4: SEO & Content Strategy

### 4.1 Strategic Positioning

**Current position:** ~63 indexed pages, early-stage authority site
**Target position:** The #1 educational resource for working aged leads

**Competitive moat:** AgedLeadStore owns "buy aged leads" (transactional). HowToWorkLeads owns "how to work aged leads" (educational). This is a symbiotic relationship — lean into it hard.

### 4.2 Content Pillars (Hub & Spoke Model)

```
                    howtoworkleads.com
                          │
    ┌─────────┬───────────┼───────────┬──────────┐
    │         │           │           │          │
 BUYING    HOW TO     SCRIPTS &   CRM &      COMPLIANCE
 LEADS     WORK       TEMPLATES   TOOLS      & STRATEGY
 (pillar)  (pillar)   (pillar)    (pillar)   (pillar)
    │         │           │           │          │
    ├─ Final  ├─ Insurance├─ Phone    ├─ Best    ├─ DNC
    │  Expense│  Leads    │  Scripts  │  CRM     │  Rules
    ├─ Medicare├─ Mortgage├─ VM       ├─ GHL     ├─ FCC 1:1
    ├─ Auto   ├─ Solar   │  Scripts  │  Setup   ├─ TCPA
    ├─ P&C    ├─ Final   ├─ Email    ├─ ROI     ├─ State
    ├─ Annuity│  Expense │  Templates│  Calc    │  Regs
    ├─ Mortgage├─ Medicare├─ SMS      ├─ Comp.  │
    │  Protect│         │  Templates│  Checker │
    └─ Pricing└─ Home   └─ Follow-up└─────────┘
     Guide     Improve.   Cadence
```

### 4.3 Content Production Plan (Updated for March 2026)

**Current state:** ~63 pages indexed, 30 content briefs written (many with CONTENT.md drafts)

#### Phase 1: Foundation — Publish Existing Briefs (Weeks 1-4)
**Goal:** Get from 63 to 80+ pages by publishing the backlog

| Week | Content to Publish | Type | Target Keyword |
|------|-------------------|------|----------------|
| 1 | Aged Leads vs Fresh Leads (01) | Blog | `aged leads vs fresh leads` |
| 1 | How to Work Aged Insurance Leads (02) | Blog | `how to work aged insurance leads` |
| 1 | Scripts & Templates Library (03) | Blog | `aged lead scripts` |
| 2 | Follow-Up Cadence (04) | Blog | `aged lead follow up schedule` |
| 2 | Buy Final Expense Leads (05) | Landing | `buy final expense leads` |
| 2 | Buy Medicare Leads (06) | Landing | `buy medicare leads` |
| 3 | Buy Auto Insurance Leads (07) | Landing | `buy auto insurance leads` |
| 3 | Buy Mortgage Protection Leads (08) | Landing | `buy mortgage protection leads` |
| 3 | Buying Leads Pillar Upgrade (09) | Pillar | `buy internet leads` |
| 4 | Conversion Rates by Industry (10) | Blog | `aged lead conversion rates` |
| 4 | How to Work Mortgage Leads (11) | Blog | `how to work aged mortgage leads` |
| 4 | How to Work Solar Leads (12) | Blog | `how to work aged solar leads` |

#### Phase 2: Depth — Topical Authority (Weeks 5-8)

| Week | Content to Publish | Type | Target Keyword |
|------|-------------------|------|----------------|
| 5 | How to Work Final Expense Leads (13) | Blog | `how to work final expense leads` |
| 5 | Best CRM for Aged Leads (14) | Blog | `best CRM for aged leads` |
| 6 | GoHighLevel Setup Guide (15) | Blog | `GoHighLevel aged leads` |
| 6 | Buy Annuity Leads (16) | Landing | `buy annuity leads` |
| 6 | Buy P&C Insurance Leads (17) | Landing | `buy P&C insurance leads` |
| 7 | Lead Management Pillar Upgrade (18) | Pillar | `lead management system` |
| 7 | Sales Process Pillar Upgrade (19) | Pillar | `sales process for internet leads` |
| 8 | DNC Compliance Guide (20) | Blog | `aged leads DNC compliance` |

#### Phase 3: Authority & Link Magnets (Weeks 9-12)

| Week | Content to Publish | Type | Target Keyword |
|------|-------------------|------|----------------|
| 9 | ROI Calculator Tool (21) | Tool | `aged lead ROI calculator` |
| 9 | Compliance Checklist Tool (22) | Tool | `lead buying compliance checklist` |
| 10 | Complete Pricing Guide (23) | Blog | `aged lead pricing` |
| 10 | Lead Budget Calculator Guide (24) | Blog | `insurance lead budget` |
| 11 | Vendor Comparison (25) | Blog | `aged lead vendors comparison` |
| 11 | FCC 1:1 Consent Rule (26) | Blog | `FCC 1:1 consent leads` |
| 12 | Case Studies Collection (27) | Blog | `aged lead success stories` |
| 12 | Email Drip Campaigns (28) | Blog | `aged lead email drip campaign` |

#### Phase 4: Ongoing (Monthly, Starting Week 13+)

- **2 new blog posts/month** — Seasonal, news-reactive, long-tail keyword expansion
- **1 page refresh/month** — Update stats, add sections, improve CTAs on existing content
- **1 tool/resource per quarter** — Calculators, downloadable templates, cheat sheets
- **Weekly internal linking audit** — Every new page gets 5+ internal links TO it and FROM it

### 4.4 Keyword Strategy

#### Primary Keywords (Transactional / Commercial)

| Keyword | Monthly Search Volume (Est.) | Current Rank | Target | Page |
|---------|------------------------------|-------------|--------|------|
| buy aged leads | 500-1K | Ranking | Top 5 | /buying-leads/buy-aged-leads |
| buy final expense leads | 300-500 | Not ranking | Top 10 | /buying-leads/buy-final-expense-leads (NEW) |
| buy medicare leads | 500-1K | Not ranking | Top 10 | /buying-leads/buy-medicare-leads (NEW) |
| buy auto insurance leads | 300-500 | Not ranking | Top 10 | /buying-leads/buy-auto-insurance-leads (NEW) |
| buy mortgage protection leads | 200-300 | Not ranking | Top 10 | /buying-leads/buy-mortgage-protection-leads (NEW) |
| aged lead pricing | 200-300 | Not ranking | Top 10 | /blog/aged-lead-pricing-guide (NEW) |

#### Secondary Keywords (Informational / Educational)

| Keyword | Monthly Search Volume (Est.) | Current Rank | Target | Page |
|---------|------------------------------|-------------|--------|------|
| how to work aged leads | 200-500 | Ranking | Top 3 | /blog/how-to-work-aged-leads |
| how to work aged insurance leads | 100-300 | Not ranking | Top 5 | /blog/how-to-work-aged-insurance-leads (NEW) |
| aged leads vs fresh leads | 100-200 | Not ranking | Top 5 | /blog/aged-leads-vs-fresh-leads (NEW) |
| aged lead scripts | 100-200 | Not ranking | Top 3 | /blog/aged-lead-scripts-templates (NEW) |
| aged lead follow up | 100-200 | Not ranking | Top 5 | /blog/aged-lead-follow-up-cadence (NEW) |
| aged lead conversion rates | 100-200 | Not ranking | Top 5 | /blog/aged-lead-conversion-rates (NEW) |
| best CRM for aged leads | 50-100 | Not ranking | Top 3 | /blog/best-crm-aged-leads (NEW) |

#### Long-Tail Expansion Targets

| Keyword Cluster | Example Queries | Page Strategy |
|----------------|-----------------|---------------|
| Speed to lead | "how fast to call aged leads", "best time to call internet leads" | Dedicated blog post |
| Lead aging | "how old is too old for leads", "90 day old leads worth it" | FAQ section + blog |
| Industry-specific | "how to sell final expense to aged leads", "medicare lead scripts" | Vertical "how to work" guides |
| Tool-specific | "GoHighLevel for aged leads", "Salesforce aged lead workflow" | CRM setup guides |
| Compliance | "TCPA aged leads", "do not call list aged leads" | Compliance content cluster |
| ROI / Budget | "aged lead ROI", "how much to spend on leads per month" | Calculator tool + guide |

### 4.5 Internal Linking Strategy

**Current gap:** Weak cross-linking between blog and buying guides

**Rules going forward:**
1. Every buying guide → links to corresponding "how to work" guide + buying pillar + /lead-order
2. Every "how to work" guide → links to corresponding buying guide + scripts post + follow-up cadence + CRM guide
3. Every blog post → 5-10 internal links per 2,000 words using descriptive anchor text
4. Pillar/category pages → links to every child page + cross-link to other pillars
5. **Never use "click here" or "learn more" as anchor text** — always keyword-rich, descriptive
6. Add related articles sidebar with 3-6 contextually relevant links on every content page

### 4.6 Link Building Strategy

**Tier 1: AgedLeadStore Cross-Links (Highest ROI, easiest)**
- Ask Troy to link from ALS blog posts to HTWL "how to work" guides
- Pitch: "We send affiliate traffic to you, you send educational traffic to us"
- Target: 5-10 reciprocal links within 30 days
- This alone could significantly move rankings

**Tier 2: Industry Community**
- Reddit: r/InsuranceAgent, r/MortgageBrokers, r/Sales — share guides when questions arise
- LinkedIn: Share every new post, tag industry contacts
- Facebook Groups: Insurance agent groups, mortgage LO groups
- Quora: Answer aged lead questions with links back

**Tier 3: Guest Content & Digital PR**
- Insurance industry blogs (guest posts on lead conversion)
- Mortgage publications (NMP, HousingWire)
- Podcast appearances (Insurance Agent Podcast, The Modern Insurance Agent)
- HARO / Connectively / Quoted — respond to journalist queries

**Tier 4: Natural Link Magnets**
- Interactive ROI calculator (tools earn links naturally)
- Original data (conversion rate benchmarks, pricing surveys)
- Downloadable templates (scripts, checklists)
- "Vs" comparison content (vendor comparisons)

---

## Part 5: Newsletter Strategy — "The Aged Lead Playbook"

### 5.1 Newsletter Overview

| Element | Detail |
|---------|--------|
| **Name** | The Aged Lead Playbook |
| **Tagline** | Weekly tips to turn old leads into new revenue |
| **Frequency** | Weekly (Tuesday 8 AM ET) |
| **Platform** | Resend (already integrated) |
| **Audience** | Insurance agents, mortgage LOs, sales managers buying/working aged leads |
| **Goal** | Build email list → drive repeat site visits → increase dwell time/engagement signals → nurture to ALS affiliate conversions |

### 5.2 Lead Magnets (Email Capture)

Replace generic "Subscribe to our newsletter" with specific, high-value offers:

| Lead Magnet | Format | Placement | Expected Conversion |
|-------------|--------|-----------|-------------------|
| **The Aged Lead Quick-Start Kit** | PDF (scripts + cadence + checklist) | Exit intent popup, homepage hero | 3-5% |
| **Aged Lead ROI Calculator** | Interactive tool (gated results email) | /tools/aged-lead-roi-calculator | 15-25% |
| **7-Day Follow-Up Cadence Template** | PDF one-pager | Blog sidebar, article inline CTA | 5-8% |
| **Insurance Lead Scripts Bundle** | PDF (phone + VM + email + SMS) | Insurance vertical pages | 5-10% |
| **Lead Vendor Comparison Scorecard** | PDF matrix | Buying guide pages | 3-5% |

### 5.3 Newsletter Content Calendar (First 12 Weeks)

| Week | Date | Subject Line | Content Theme | CTA |
|------|------|-------------|---------------|-----|
| 1 | Mar 18 | "The #1 mistake agents make with aged leads (and the 30-second fix)" | Speed to lead + first-call framework | Read: /blog/how-to-work-aged-leads |
| 2 | Mar 25 | "Aged vs. fresh leads: the math most agents get wrong" | ROI comparison, cost-per-contact analysis | Read: /blog/aged-leads-vs-fresh-leads |
| 3 | Apr 1 | "Copy-paste: 3 phone scripts that work on 90-day-old leads" | Phone scripts for insurance & mortgage | Read: /blog/aged-lead-scripts-templates |
| 4 | Apr 8 | "Your 7-day follow-up plan (steal mine)" | Follow-up cadence walkthrough | Download: cadence template PDF |
| 5 | Apr 15 | "Final expense leads for $0.50? Here's how" | Final expense aged lead buying guide | Read: /buying-leads/buy-final-expense-leads |
| 6 | Apr 22 | "I tracked 1,000 aged lead calls. Here's what converted." | Conversion rate data + best practices | Read: /blog/aged-lead-conversion-rates |
| 7 | Apr 29 | "Medicare leads are about to get expensive. Here's why." | FCC 1:1 consent impact on Medicare leads | Read: /blog/fcc-consent-rule-lead-buying |
| 8 | May 6 | "The CRM setup that turns aged leads into a system" | CRM workflow for aged leads | Read: /blog/best-crm-aged-leads |
| 9 | May 13 | "DNC compliance: what aged lead buyers MUST know in 2026" | Compliance deep-dive | Read: /blog/aged-leads-dnc-compliance |
| 10 | May 20 | "Are you paying too much for aged leads? (pricing breakdown)" | Pricing guide + value analysis | Read: /blog/aged-lead-pricing-guide |
| 11 | May 27 | "3 email drips that resurrect dead leads" | Email campaign templates | Read: /blog/aged-lead-email-drip-campaigns |
| 12 | Jun 3 | "From aged lead to closed deal: 5 real stories" | Case studies with ROI | Read: /blog/aged-lead-case-studies |

### 5.4 Newsletter Growth Tactics

1. **On-site capture points:**
   - Homepage hero → Quick-Start Kit
   - Article inline CTAs (after H2 #2 in every post) → topic-specific magnet
   - Exit intent popup → Quick-Start Kit
   - Sticky mobile CTA → Newsletter signup
   - /tools gated results → email capture

2. **Off-site growth:**
   - LinkedIn posts → link to latest newsletter issue (hosted as blog post)
   - Reddit/community answers → link to relevant guide (captures organic visitors)
   - ALS partnership → mention newsletter in cross-linked content

3. **Engagement optimization:**
   - Single CTA per email (one article link)
   - Clean, scannable layout — no complex HTML
   - Personal tone from Bill Rice (not corporate)
   - Ask for replies to boost deliverability ("Hit reply and tell me your biggest lead challenge")

### 5.5 Newsletter Metrics Targets

| Metric | 30-Day | 90-Day | 6-Month |
|--------|--------|--------|---------|
| Subscribers | 50 | 250 | 1,000 |
| Open Rate | 40%+ | 35%+ | 30%+ |
| Click Rate | 8%+ | 6%+ | 5%+ |
| Unsubscribe Rate | <1% | <1% | <1% |

---

## Part 6: Content Calendar (March-June 2026)

### March 2026 (Remaining)

| Date | Activity | Type | Notes |
|------|----------|------|-------|
| Mar 14-15 | Fix all Critical Technical Issues (#1-5) | Tech SEO | Sprint 1 |
| Mar 17-18 | Fix E-E-A-T & Schema Issues (#6-13) | Tech SEO | Sprint 2 |
| Mar 17 | Publish: Aged Leads vs Fresh Leads | Blog | Brief 01 |
| Mar 18 | Newsletter #1: Launch issue | Email | First send |
| Mar 19 | Publish: How to Work Insurance Leads | Blog | Brief 02 |
| Mar 21 | Publish: Scripts & Templates Library | Blog | Brief 03 |
| Mar 24 | Publish: Follow-Up Cadence | Blog | Brief 04 |
| Mar 25 | Newsletter #2 | Email | |
| Mar 26 | Publish: Buy Final Expense Leads | Landing | Brief 05 |
| Mar 28 | Publish: Buy Medicare Leads | Landing | Brief 06 |

### April 2026

| Date | Activity | Type | Notes |
|------|----------|------|-------|
| Apr 1 | Newsletter #3 | Email | Scripts theme |
| Apr 2 | Publish: Buy Auto Insurance Leads | Landing | Brief 07 |
| Apr 4 | Publish: Buy Mortgage Protection Leads | Landing | Brief 08 |
| Apr 7 | Publish: Buying Leads Pillar Upgrade | Pillar | Brief 09 — major rewrite |
| Apr 8 | Newsletter #4 | Email | Follow-up cadence |
| Apr 9 | Publish: Conversion Rates by Industry | Blog | Brief 10 |
| Apr 11 | Publish: How to Work Mortgage Leads | Blog | Brief 11 |
| Apr 14 | Publish: How to Work Solar Leads | Blog | Brief 12 |
| Apr 15 | Newsletter #5 | Email | Final expense |
| Apr 16 | Publish: How to Work Final Expense Leads | Blog | Brief 13 |
| Apr 18 | Publish: Best CRM for Aged Leads | Blog | Brief 14 |
| Apr 22 | Newsletter #6 | Email | Conversion data |
| Apr 23 | Publish: GoHighLevel Setup Guide | Blog | Brief 15 |
| Apr 25 | Publish: Buy Annuity Leads | Landing | Brief 16 |
| Apr 28 | Publish: Buy P&C Insurance Leads | Landing | Brief 17 |
| Apr 29 | Newsletter #7 | Email | Medicare/FCC |
| Apr 30 | Monthly refresh: Update homepage stats + 1 existing article | Refresh | |

### May 2026

| Date | Activity | Type | Notes |
|------|----------|------|-------|
| May 2 | Publish: Lead Management Pillar Upgrade | Pillar | Brief 18 |
| May 5 | Publish: Sales Process Pillar Upgrade | Pillar | Brief 19 |
| May 6 | Newsletter #8 | Email | CRM setup |
| May 7 | Publish: DNC Compliance Guide | Blog | Brief 20 |
| May 9 | Launch: Aged Lead ROI Calculator | Tool | Brief 21 |
| May 12 | Launch: Compliance Checklist Tool | Tool | Brief 22 |
| May 13 | Newsletter #9 | Email | Compliance |
| May 14 | Publish: Complete Pricing Guide | Blog | Brief 23 |
| May 16 | Publish: Lead Budget Guide | Blog | Brief 24 |
| May 20 | Newsletter #10 | Email | Pricing |
| May 21 | Publish: Vendor Comparison | Blog | Brief 25 |
| May 23 | Publish: FCC 1:1 Consent Rule | Blog | Brief 26 |
| May 27 | Newsletter #11 | Email | Email drips |
| May 28 | Publish: Case Studies | Blog | Brief 27 |
| May 30 | Publish: Email Drip Campaigns | Blog | Brief 28 |
| May 31 | Monthly refresh: 2 existing articles | Refresh | |

### June 2026

| Date | Activity | Type | Notes |
|------|----------|------|-------|
| Jun 3 | Newsletter #12 | Email | Case studies |
| Jun 4 | Publish: Aged Leads Hub (Mega Pillar) | Hub | Brief 29 |
| Jun 6 | Publish: Speed to Lead | Blog | Brief 30 |
| Jun 9 | Begin Phase 4: Ongoing content (2/month) | Blog | New topics TBD |
| Jun 10 | Newsletter #13 | Email | |
| Jun 13 | Content audit: Review all 90+ pages for quality | Audit | |
| Jun 17 | Newsletter #14 | Email | |
| Jun 20 | Quarterly tool release planning | Planning | |
| Jun 24 | Newsletter #15 | Email | |
| Jun 30 | Monthly refresh + 90-day performance review | Review | |

---

## Part 7: Backlog Items (From Existing Strategy Docs)

### Technical Backlog

| # | Item | Status | Priority | Source |
|---|------|--------|----------|--------|
| T1 | Canonical tag implementation | NOT STARTED | CRITICAL | This audit |
| T2 | Fix metadataBase www inconsistency | NOT STARTED | CRITICAL | This audit |
| T3 | Default OG image | NOT STARTED | CRITICAL | This audit |
| T4 | Fix placeholder social URLs | NOT STARTED | HIGH | This audit |
| T5 | Author bio component for articles | NOT STARTED | HIGH | E-E-A-T |
| T6 | Visible publish/update dates | NOT STARTED | HIGH | E-E-A-T |
| T7 | Migrate to next/font/google | NOT STARTED | MEDIUM | Performance |
| T8 | Set up Bing Webmaster Tools | NOT STARTED | MEDIUM | SEO-GROWTH-STRATEGY |
| T9 | Expand llms.txt after new content | NOT STARTED | LOW | Ongoing |
| T10 | Implement HowTo schema on guide pages | NOT STARTED | MEDIUM | SEO-GROWTH-STRATEGY |
| T11 | Core Web Vitals audit (quarterly) | NOT STARTED | MEDIUM | Ongoing |

### Content Backlog (Briefs Ready, Not Published)

| # | Brief | Type | Status | Priority |
|---|-------|------|--------|----------|
| C1 | 01 - Aged vs Fresh Leads | Blog | CONTENT DRAFT READY | Phase 1 |
| C2 | 02 - Work Insurance Leads | Blog | CONTENT DRAFT READY | Phase 1 |
| C3 | 03 - Scripts & Templates | Blog | CONTENT DRAFT READY | Phase 1 |
| C4 | 04 - Follow-Up Cadence | Blog | CONTENT DRAFT READY | Phase 1 |
| C5 | 05 - Final Expense Leads | Landing | CONTENT DRAFT READY | Phase 1 |
| C6 | 06 - Medicare Leads | Landing | CONTENT DRAFT READY | Phase 1 |
| C7 | 07 - Auto Insurance Leads | Landing | CONTENT DRAFT READY | Phase 1 |
| C8 | 08 - Mortgage Protection | Landing | CONTENT DRAFT READY | Phase 1 |
| C9 | 09 - Buying Leads Pillar | Pillar | CONTENT DRAFT READY | Phase 1 |
| C10 | 10 - Conversion Rates | Blog | CONTENT DRAFT READY | Phase 1 |
| C11 | 11 - Work Mortgage Leads | Blog | CONTENT DRAFT READY | Phase 2 |
| C12 | 12 - Work Solar Leads | Blog | CONTENT DRAFT READY | Phase 2 |
| C13 | 13 - Work Final Expense | Blog | CONTENT DRAFT READY | Phase 2 |
| C14 | 14 - CRM for Aged Leads | Blog | CONTENT DRAFT READY | Phase 2 |
| C15 | 15 - GHL Setup | Blog | CONTENT DRAFT READY | Phase 2 |
| C16 | 16 - Annuity Leads | Landing | BRIEF ONLY | Phase 2 |
| C17 | 17 - P&C Insurance | Landing | BRIEF ONLY | Phase 2 |
| C18 | 18 - Lead Mgmt Pillar | Pillar | CONTENT DRAFT READY | Phase 2 |
| C19 | 19 - Sales Process Pillar | Pillar | CONTENT DRAFT READY | Phase 2 |
| C20 | 20 - DNC Compliance | Blog | CONTENT DRAFT READY | Phase 2 |
| C21 | 21 - ROI Calculator | Tool | BRIEF ONLY | Phase 3 |
| C22 | 22 - Compliance Checklist | Tool | BRIEF ONLY | Phase 3 |
| C23 | 23 - Pricing Guide | Blog | CONTENT DRAFT READY | Phase 3 |
| C24 | 24 - Lead Budget | Blog | CONTENT DRAFT READY | Phase 3 |
| C25 | 25 - Vendor Comparison | Blog | CONTENT DRAFT READY | Phase 3 |
| C26 | 26 - FCC Rule | Blog | CONTENT DRAFT READY | Phase 3 |
| C27 | 27 - Case Studies | Blog | CONTENT DRAFT READY | Phase 3 |
| C28 | 28 - Email Drips | Blog | CONTENT DRAFT READY | Phase 3 |
| C29 | 29 - Aged Leads Hub | Hub | CONTENT DRAFT READY | Phase 3 |
| C30 | 30 - Speed to Lead | Blog | CONTENT DRAFT READY | Phase 3 |

### Strategic Backlog

| # | Item | Status | Priority |
|---|------|--------|----------|
| S1 | ALS cross-linking partnership (ask Troy) | NOT STARTED | HIGH |
| S2 | Build downloadable Quick-Start Kit PDF | NOT STARTED | HIGH |
| S3 | Reddit/community seeding strategy | NOT STARTED | MEDIUM |
| S4 | Guest post pitches to industry blogs | NOT STARTED | MEDIUM |
| S5 | Podcast appearance outreach | NOT STARTED | LOW |
| S6 | Robust /about page with E-E-A-T signals | NOT STARTED | HIGH |
| S7 | Create editorial standards page | NOT STARTED | MEDIUM |
| S8 | Set up Google Search Console submissions for new pages | NOT STARTED | HIGH |
| S9 | Monthly indexing audit (site:howtoworkleads.com) | NOT STARTED | MEDIUM |

---

## Part 8: Success Metrics

### 30-Day Targets (by April 13, 2026)
- All critical technical fixes deployed
- 10+ new pages published
- Newsletter launched with 50+ subscribers
- Author bio visible on all articles

### 90-Day Targets (by June 13, 2026)
- 90+ total indexed pages
- 500+ monthly organic sessions
- Top 20 for "aged leads vs fresh leads"
- Top 20 for "how to work aged insurance leads"
- 250+ newsletter subscribers
- ALS cross-links live

### 6-Month Targets (by September 2026)
- 100+ total indexed pages
- 3,000+ monthly organic sessions
- 10+ keywords in top 10
- 1,000+ newsletter subscribers
- Affiliate revenue growing month-over-month
- AI Overview citations for aged lead queries

### 12-Month Targets (by March 2027)
- 120+ total indexed pages
- 10,000+ monthly organic sessions
- 25+ keywords in top 10
- 3,000+ newsletter subscribers
- Recognized as the go-to educational resource for aged leads
- Consistent affiliate revenue from ALS

---

*This document supersedes the previous SEO-GROWTH-STRATEGY.md with updated audit findings, 2026 algorithm alignment, and expanded newsletter/content calendar strategy.*
