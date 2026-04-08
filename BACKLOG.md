# HowToWorkLeads.com -- Backlog

**Last updated:** April 8, 2026
**Site status:** 106+ pages live (36 landing + 64 blog + 9 category + download pages + 2 interactive tools)
**Revenue:** $2,918/mo affiliate rev share (March 2026, 20% of $14,590 attributed ALS revenue)
**Newsletter:** 8 issues written, auto-send started April 7, welcome sequence live
**Content automation:** Weekly cron publishes from master-content-calendar.ts

---

## Prioritization Framework

| Priority | Criteria | Timeframe |
|----------|----------|-----------|
| **P0** | Directly increases revenue or fixes something broken | This session / this week |
| **P1** | Grows traffic or conversions meaningfully | Next 2-4 weeks |
| **P2** | Expands coverage, improves ops, or future-proofs | When P0/P1 clear |

---

## P0 -- Revenue & Conversion (Do First)

### 1. Content upgrade CTAs on high-traffic pages
- **What:** Match lead magnet downloads to page vertical (e.g., insurance script bundle CTA on insurance pages, mortgage scripts on mortgage pages)
- **Why:** 6 lead magnets exist but aren't contextually promoted. Vertical-matched CTAs convert 2-3x better than generic ones. More email captures = more newsletter subscribers = more ALS clicks.
- **Dependency:** Need to identify top 20 pages by traffic (check GA4 manually or via daily-performance cron email reports)
- **Effort:** Medium (component + per-page CTA mapping)

### 2. ALS cross-linking coordination with Troy
- **What:** Share the deep link mapping table (26 keyword-to-URL mappings already built) with Troy at Monday meeting. Get reciprocal links from ALS back to HTWL.
- **Why:** Backlinks from agedleadstore.com (high DA, topically relevant) are the single highest-leverage SEO signal available. Already prepared, just needs handoff.
- **Dependency:** Troy meeting (Mondays)
- **Effort:** Low (table already exists in lib/analytics.ts)
- **Owner:** Bill (manual handoff)

### 3. Newsletter subscriber growth tactics
- **What:** Add inline email capture CTAs within blog post body content (not just footer/popup). Test placement after the first H2 and before the conclusion.
- **Why:** Newsletter is now live and automated. Every subscriber gets 8 issues + welcome sequence, each with ALS affiliate links. Subscriber growth directly drives affiliate revenue.
- **Dependency:** None (Resend + capture form already exist)
- **Effort:** Low-Medium (new component + portable text integration)

---

## P1 -- Traffic Growth (Do Next)

### 4. Voicemail & SMS script templates by vertical
- **What:** Create script template articles for each major vertical (insurance, mortgage, home services, legal). "Voicemail Scripts for [Vertical] Leads" + "SMS Templates for [Vertical] Leads."
- **Why:** Script/template queries have high search intent and low competition. These pages are natural internal link targets from existing "how to work" vertical pages. Issue 7 newsletter already covers SMS -- this creates the evergreen landing page.
- **Dependency:** None
- **Effort:** Medium (8-12 new articles, can batch via content automation)
- **Suggested articles:**
  - [ ] Voicemail Scripts for Insurance Leads
  - [ ] Voicemail Scripts for Mortgage Leads
  - [ ] Voicemail Scripts for Home Services Leads
  - [ ] SMS Templates for Insurance Leads
  - [ ] SMS Templates for Mortgage Leads
  - [ ] SMS Templates for Home Services Leads

### 5. Home services vertical expansion
- **What:** Add 4 new "How to Work [X] Leads" articles: Electrical, Landscaping, Painting, Garage Door
- **Why:** Home services vertical is partially built (6 articles live). Completing it creates a comprehensive hub that ranks for "[service] lead" queries. These verticals have less competition than insurance/mortgage.
- **Dependency:** None
- **Effort:** Medium (4 articles, follow existing home services template)
- **Articles:**
  - [ ] How to Work Electrical Leads
  - [ ] How to Work Landscaping Leads
  - [ ] How to Work Painting Leads
  - [ ] How to Work Garage Door Leads

### 6. Legal vertical expansion
- **What:** Add 3 new legal vertical articles: Workers' Comp Leads, Bankruptcy Leads, Family Law Leads
- **Why:** Legal leads category has only 3 articles (MVA, Mass Tort, SSDI). Adding these completes coverage of high-value legal verticals. Legal lead buyers have high AOV.
- **Dependency:** None
- **Effort:** Medium (3 articles)
- **Articles:**
  - [ ] How to Work Workers' Comp Leads
  - [ ] How to Work Bankruptcy Leads
  - [ ] How to Work Family Law Leads

### 7. UTM parameter tracking for newsletter traffic
- **What:** Add UTM parameters to all links in newsletter issues and welcome sequence emails. Configure GA4 to report on newsletter as a traffic source.
- **Why:** Can't measure newsletter ROI without attribution. Need to know which issues drive site visits and ALS clicks.
- **Dependency:** Newsletter must be sending (done -- started April 7)
- **Effort:** Low (update link URLs in issue templates + newsletter send script)

---

## P2 -- Coverage & Optimization (When P0/P1 Clear)

### 8. Core Web Vitals audit
- **What:** Run Lighthouse + CrUX audit. Fix any LCP, INP, or CLS regressions.
- **Why:** Site targets 90+ performance score. As page count grows, bundle size and image loading can regress. Quarterly check keeps rankings safe.
- **Dependency:** None
- **Effort:** Low-Medium (audit + targeted fixes)

### 9. AI Overview monitoring
- **What:** Track which aged lead queries trigger Google AI Overviews and whether HTWL content is cited. Document which pages appear and which don't.
- **Why:** AI Overviews are cannibalizing clicks for informational queries. Understanding citation patterns helps optimize content structure (answer-first format, FAQ schema).
- **Dependency:** None (manual or GSC data)
- **Effort:** Low (research task, not code)

### 10. Newsletter A/B testing
- **What:** Test subject lines, send times, and CTA placement once subscriber base reaches 250+.
- **Why:** Below 250 subscribers, A/B tests lack statistical significance. Focus on subscriber growth (P0 #3) first.
- **Dependency:** 250+ subscribers (blocked by P0 #3)
- **Effort:** Low (Resend supports A/B natively)

### 11. Additional interactive tools
- **What:** Build 1-2 more tools: Lead Source Comparison Calculator, Speed-to-Lead Response Timer, Lead Vendor Scorecard Generator.
- **Why:** Interactive tools earn backlinks and have high engagement. ROI calculator and compliance checklist are already live and performing. But new content has higher priority than new tools at this stage.
- **Dependency:** None
- **Effort:** High (each tool is a custom React component)

### 12. Additional lead magnets by vertical
- **What:** Create vertical-specific PDF downloads beyond the current 6 (e.g., Legal Lead Scripts Bundle, Home Services Follow-Up Cadence).
- **Why:** More lead magnets = more email capture opportunities, especially with content upgrade CTAs (P0 #1). But current 6 cover the major verticals already.
- **Dependency:** Best done after P0 #1 (content upgrade CTAs) to have distribution mechanism
- **Effort:** Medium (content writing + PDF generation)

---

## Dependency Map

```
P0 #1 (Content upgrade CTAs) --> P2 #12 (More lead magnets)
P0 #3 (Subscriber growth) ----> P2 #10 (A/B testing, needs 250+)
P0 #2 (ALS cross-links)  -----> unlocks backlink authority for all pages
P1 #4-6 (New content)    -----> feeds P0 #1 (more pages to add CTAs to)
P1 #7 (UTM tracking)     -----> enables measuring P0 #3 effectiveness
```

---

## Session Plan (Recommended Order)

**This session:**
1. P0 #1 -- Build content upgrade CTA component + map lead magnets to verticals
2. P0 #3 -- Add inline newsletter CTAs in blog post body
3. P1 #7 -- Add UTM parameters to newsletter links

**Next session:**
4. P1 #4 -- Batch write voicemail/SMS script articles (6-12 articles)
5. P1 #5 -- Home services expansion (4 articles)

**Following session:**
6. P1 #6 -- Legal vertical expansion (3 articles)
7. P2 #8 -- Core Web Vitals audit

---

## Completed History

### March 26, 2026

- [x] **ALS affiliate revenue acceleration** -- 6 items completed:
  - Vertical-specific deep links (7 URLs) integrated into ExitIntentPopup, StickyMobileCTA, ALSAutoLinker, portable-text renderer
  - ALS CTAs added to all 8 newsletter issues and 5 welcome sequence emails
  - Comparison/pricing page published with 5 named vendors, real pricing tables, head-to-head comparison
  - Deep link mapping: 26 keyword-to-URL mappings in lib/analytics.ts
- [x] **Master content calendar** -- Consolidated 81 content briefs + 36 editorial calendar entries into single `master-content-calendar.ts` (117 items). Cron updated to use it.
- [x] **Newsletter automation** -- Cron now auto-uses pre-written issues (01-08) when available, falls back to AI generation. Issue 1 will auto-send April 7 -- no manual step.
- [x] **Compliance guardrails** -- 8-rule compliance section added to AI content system prompt and newsletter AI prompt. Prevents FCC 1:1 consent errors, enforces 31-day DNC scrub facts, requires legal disclaimer.
- [x] **Interactive tools built:**
  - ROI Calculator (`/tools/aged-lead-roi-calculator`) -- real-time aged vs fresh comparison, vertical-specific defaults, ALS deep links
  - Compliance Checklist (`/tools/compliance-checklist`) -- 40-item interactive checklist, 7 sections, progress tracking, print-to-PDF
- [x] **6 new articles written and published** (Week 3-4 accelerated):
  - Cost Per Lead Analysis (Mar 31)
  - Text Messaging Compliance Guide (Apr 2)
  - Objection Handling Scripts -- 25 responses (Apr 4)
  - 10 CRM Automation Workflows (Apr 7)
  - Mortgage Lead Conversion Playbook (Apr 9)
  - Multi-Channel Lead Outreach (Apr 11)
- [x] **Security fix** -- Removed .env.vercel and .env.vercel-prod (contained API keys) from git, added to .gitignore

### March 25, 2026

- [x] **Site-wide legal & compliance audit** -- Researched 3 authoritative legal sources (Henson Legal, Mac Murray & Shuster LLP, DNC.com) and corrected inaccurate compliance information across 12 published articles:
  - **FCC 1:1 consent rule** incorrectly presented as active law in 10 articles -- corrected to reflect 11th Circuit vacatur (Jan 2025, never took effect)
  - **DNC scrub frequency** changed from "quarterly" to every 31 days (legal requirement)
  - **DNC exemption windows** added: 3-month inquiry, 18-month transaction
  - **New sections added** to DNC compliance article: Safe Harbor, vicarious liability, reassigned numbers, real case law ($14M American Income Life, $19M QuoteWizard, $145M MediaAlpha)
  - **FCC consent rule article** completely rewritten (was treating vacated rule as active law)
  - **TCPA compliance article** fixed false "August 2025 reinstatement" claim
  - **Glossary** fixed 3 entries (Comparison Shopping, Opt-In, PEWC)
  - All corrections sourced from Henson Legal, Mac Murray & Shuster LLP, and DNC.com
  - All 12 documents pushed live to Sanity + ISR-refreshed
- [x] **Content briefs updated** -- Corresponding content brief files and outlines updated to match corrected legal facts

### March 23, 2026

- [x] **Newsletter test send** -- Issue 1 sent to bill@billricestrategy.com, confirmed delivery
- [x] **Welcome sequence automation** -- 5-email drip wired: Email 1 sends instantly on signup/download, Emails 2-5 via daily Vercel cron (`/api/cron/welcome-sequence`) checking contact `created_at` in Resend audience
- [x] **April 7 launch date locked** -- Issue 1 send date set to Tuesday, April 7, 2026 at 8:00 AM ET
- [x] **Issues 5-8 drafted** -- Month 2 insurance deep-dive series:
  - Issue 5: Final expense scripts + data ($0.35/lead, 1-in-8 booking script)
  - Issue 6: Medicare AEP pre-season strategy (buy aged leads in May, warm up for October)
  - Issue 7: SMS/text templates (98% open rate channel, 5 templates by cadence day)
  - Issue 8: Case study -- 3 agents, same leads, process drives 12x revenue difference
- [x] **GSC + Bing sitemaps submitted** -- sitemap.xml submitted to Google Search Console and Bing Webmaster Tools

### March 19, 2026

- [x] **14 new articles published** across 4 new categories (staggered Mar 31 - Apr 24):
  - **Legal Leads (new category):** How to Work MVA Leads, Mass Tort Leads, SSDI Leads
  - **Insurance Leads (new category):** How to Work ACA Leads
  - **Home Services Leads (new category):** Home Services (pillar), Roofing, HVAC, Pest Control, Plumbing, Window Replacement
  - **Buying Leads:** How to Work Debt Leads
  - **Lead Management / AI Sales Tech:** Building Your AI Sales Stack, The Right Way to Use AI in Lead Follow-Up, AI Lead Scoring and Prioritization
- [x] **3 new Sanity categories created:** Legal Leads, Home Services Leads, Insurance Leads
- [x] **Publish script updated** -- Added category slug mappings for new categories, tsx added as local devDependency
- [x] **Content QC** -- Spot-checked MVA, Roofing, and AI articles on live site -- no frontmatter leaks, clean rendering

### March 14, 2026

- [x] **Internal link remediation** -- 55 links patched across 12 mortgage pages via `scripts/fix-internal-links.mjs`. Compliance ~35% to ~100%.
- [x] **Lead magnet download infrastructure** -- `/downloads` index + 5 gated download pages + `/api/download` route + email capture to Resend audience + auto-download. "Free Downloads" added to nav + footer.
- [x] **Lead magnet PDFs** -- 5 branded PDFs generated via `npx md-to-pdf` with custom stylesheet, deployed to `public/downloads/`.
- [x] **Newsletter Issue 1-4 drafted** -- 4 full issues at `newsletters/issue-01.md` through `issue-04.md`. Send script at `scripts/send-newsletter.mjs`.
- [x] **Welcome email sequence** -- 5-email drip series at `newsletters/welcome-sequence.md`. Needs Resend automation wiring.
- [x] **6 new articles published** (staggered 4x/week Mon/Tue/Thu/Fri cadence):
  - Mar 14: How to Work P&C Insurance Leads
  - Mar 17: How to Work IUL Leads
  - Mar 18: How to Work Annuity Leads
  - Mar 20: How to Work Health Insurance Leads
  - Mar 21: TCPA Compliance for Lead Buyers (web-researched)
  - Mar 24: State-by-State Lead Compliance Guide (web-researched)
- [x] **SEO infrastructure** -- llms.txt updated with insurance guides, compliance guides, downloads. Sitemap updated with download pages.

### Previously Completed (Pre-March 14)

- [x] Technical SEO audit + all critical fixes
- [x] Canonical tags, www consistency, robots.txt, JSON-LD
- [x] Unsplash featured image pipeline + webhook + all pages branded
- [x] Favicon + apple-touch-icon + default OG image
- [x] Social icons removed, promo codes removed, CTAs to newsletter
- [x] Newsletter rebuilt as on-site email capture (Resend)
- [x] Newsletter branded "The Aged Lead Playbook"
- [x] llms.txt + llms-full.txt (updated multiple times)
- [x] 81 content briefs written with CONTENT.md files (68-81 added Mar 19)
- [x] Publishing script (publish-content.ts) + backfill script + fix-internal-links script
- [x] Internal linking audit report + remediation
- [x] 5 lead magnet content documents + PDFs
- [x] Newsletter strategy + 26-week calendar
- [x] SEO audit + strategy document
- [x] AI Content Playbook documented

---

## Still Needs Bill's Hands

1. **ALS cross-linking** -- Share link table with Troy at Monday meeting (table provided)
