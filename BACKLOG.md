# HowToWorkLeads.com — Backlog

**Last updated:** March 26, 2026
**Site status:** 106+ pages live (36 landing + 64 blog + 9 category + download pages + 2 interactive tools)

---

## Completed (March 26 Session)

- [x] **ALS affiliate revenue acceleration** — 6 items completed:
  - Vertical-specific deep links (7 URLs) integrated into ExitIntentPopup, StickyMobileCTA, ALSAutoLinker, portable-text renderer
  - ALS CTAs added to all 8 newsletter issues and 5 welcome sequence emails
  - Comparison/pricing page published with 5 named vendors, real pricing tables, head-to-head comparison
  - Deep link mapping: 26 keyword→URL mappings in lib/analytics.ts
- [x] **Master content calendar** — Consolidated 81 content briefs + 36 editorial calendar entries into single `master-content-calendar.ts` (117 items). Cron updated to use it.
- [x] **Newsletter automation** — Cron now auto-uses pre-written issues (01-08) when available, falls back to AI generation. Issue 1 will auto-send April 7 — no manual step.
- [x] **Compliance guardrails** — 8-rule compliance section added to AI content system prompt and newsletter AI prompt. Prevents FCC 1:1 consent errors, enforces 31-day DNC scrub facts, requires legal disclaimer.
- [x] **Interactive tools built:**
  - ROI Calculator (`/tools/aged-lead-roi-calculator`) — real-time aged vs fresh comparison, vertical-specific defaults, ALS deep links
  - Compliance Checklist (`/tools/compliance-checklist`) — 40-item interactive checklist, 7 sections, progress tracking, print-to-PDF
- [x] **6 new articles written and published** (Week 3-4 accelerated):
  - Cost Per Lead Analysis (Mar 31)
  - Text Messaging Compliance Guide (Apr 2)
  - Objection Handling Scripts — 25 responses (Apr 4)
  - 10 CRM Automation Workflows (Apr 7)
  - Mortgage Lead Conversion Playbook (Apr 9)
  - Multi-Channel Lead Outreach (Apr 11)
- [x] **Security fix** — Removed .env.vercel and .env.vercel-prod (contained API keys) from git, added to .gitignore

---

## Completed (March 25 Session)

- [x] **Site-wide legal & compliance audit** — Researched 3 authoritative legal sources (Henson Legal, Mac Murray & Shuster LLP, DNC.com) and corrected inaccurate compliance information across 12 published articles:
  - **FCC 1:1 consent rule** incorrectly presented as active law in 10 articles — corrected to reflect 11th Circuit vacatur (Jan 2025, never took effect)
  - **DNC scrub frequency** changed from "quarterly" to every 31 days (legal requirement)
  - **DNC exemption windows** added: 3-month inquiry, 18-month transaction
  - **New sections added** to DNC compliance article: Safe Harbor, vicarious liability, reassigned numbers, real case law ($14M American Income Life, $19M QuoteWizard, $145M MediaAlpha)
  - **FCC consent rule article** completely rewritten (was treating vacated rule as active law)
  - **TCPA compliance article** fixed false "August 2025 reinstatement" claim
  - **Glossary** fixed 3 entries (Comparison Shopping, Opt-In, PEWC)
  - All corrections sourced from Henson Legal, Mac Murray & Shuster LLP, and DNC.com
  - All 12 documents pushed live to Sanity + ISR-refreshed
- [x] **Content briefs updated** — Corresponding content brief files and outlines updated to match corrected legal facts

---

## Completed (March 23 Session)

- [x] **Newsletter test send** — Issue 1 sent to bill@billricestrategy.com, confirmed delivery
- [x] **Welcome sequence automation** — 5-email drip wired: Email 1 sends instantly on signup/download, Emails 2-5 via daily Vercel cron (`/api/cron/welcome-sequence`) checking contact `created_at` in Resend audience
- [x] **April 7 launch date locked** — Issue 1 send date set to Tuesday, April 7, 2026 at 8:00 AM ET
- [x] **Issues 5-8 drafted** — Month 2 insurance deep-dive series:
  - Issue 5: Final expense scripts + data ($0.35/lead, 1-in-8 booking script)
  - Issue 6: Medicare AEP pre-season strategy (buy aged leads in May, warm up for October)
  - Issue 7: SMS/text templates (98% open rate channel, 5 templates by cadence day)
  - Issue 8: Case study — 3 agents, same leads, process drives 12x revenue difference
- [x] **GSC + Bing sitemaps submitted** — sitemap.xml submitted to Google Search Console and Bing Webmaster Tools

---

## Completed (March 19 Session)

- [x] **14 new articles published** across 4 new categories (staggered Mar 31 – Apr 24):
  - **Legal Leads (new category):** How to Work MVA Leads, Mass Tort Leads, SSDI Leads
  - **Insurance Leads (new category):** How to Work ACA Leads
  - **Home Services Leads (new category):** Home Services (pillar), Roofing, HVAC, Pest Control, Plumbing, Window Replacement
  - **Buying Leads:** How to Work Debt Leads
  - **Lead Management / AI Sales Tech:** Building Your AI Sales Stack, The Right Way to Use AI in Lead Follow-Up, AI Lead Scoring and Prioritization
- [x] **3 new Sanity categories created:** Legal Leads, Home Services Leads, Insurance Leads
- [x] **Publish script updated** — Added category slug mappings for new categories, tsx added as local devDependency
- [x] **Content QC** — Spot-checked MVA, Roofing, and AI articles on live site — no frontmatter leaks, clean rendering

---

## Completed (March 14 Session)

- [x] **Internal link remediation** — 55 links patched across 12 mortgage pages via `scripts/fix-internal-links.mjs`. Compliance ~35% → ~100%.
- [x] **Lead magnet download infrastructure** — `/downloads` index + 5 gated download pages + `/api/download` route + email capture → Resend audience + auto-download. "Free Downloads" added to nav + footer.
- [x] **Lead magnet PDFs** — 5 branded PDFs generated via `npx md-to-pdf` with custom stylesheet, deployed to `public/downloads/`.
- [x] **Newsletter Issue 1-4 drafted** — 4 full issues at `newsletters/issue-01.md` through `issue-04.md`. Send script at `scripts/send-newsletter.mjs`.
- [x] **Welcome email sequence** — 5-email drip series at `newsletters/welcome-sequence.md`. Needs Resend automation wiring.
- [x] **6 new articles published** (staggered 4x/week Mon/Tue/Thu/Fri cadence):
  - Mar 14: How to Work P&C Insurance Leads
  - Mar 17: How to Work IUL Leads
  - Mar 18: How to Work Annuity Leads
  - Mar 20: How to Work Health Insurance Leads
  - Mar 21: TCPA Compliance for Lead Buyers (web-researched)
  - Mar 24: State-by-State Lead Compliance Guide (web-researched)
- [x] **SEO infrastructure** — llms.txt updated with insurance guides, compliance guides, downloads. Sitemap updated with download pages.

---

## Still Needs Bill's Hands

1. ~~**Resend sender verification**~~ — DONE
2. ~~**Newsletter test send**~~ — DONE (March 23)
3. ~~**Pick newsletter launch date**~~ — **April 7, 2026** locked
4. ~~**GSC sitemap**~~ — Submitted (March 23)
5. ~~**Bing Webmaster Tools**~~ — Submitted (March 23)
6. **ALS cross-linking** — Share link table with Troy at Monday meeting (table provided)
7. ~~**Welcome sequence**~~ — DONE — automated via cron + instant Day 0 send (March 23)
8. ~~**Launch Issue 1 on April 7**~~ — AUTOMATED — cron will auto-send via Resend broadcast (March 26)

---

## Next Priorities

### Content Production
- [ ] Scripts expansion: Voicemail Scripts by Vertical, SMS/Text Templates by Vertical
- [x] ~~More verticals: How to Work Debt Leads, How to Work Real Estate Leads~~ — Debt done; Real Estate done previously (briefs 60-62)
- [ ] Content upgrade CTAs on high-traffic pages (match lead magnet to page vertical)
- [ ] More home services verticals: Electrical, Landscaping, Painting, Garage Door
- [ ] More legal verticals: Workers' Comp Leads, Bankruptcy Leads, Family Law Leads

### Newsletter Operations
- [x] ~~Wire welcome sequence into Resend automation~~ — Cron-driven drip (Day 0 instant, Day 2/4/7/10 via daily cron)
- [x] ~~Write Issues 5-8 (Month 2 calendar: insurance deep dive)~~ — Final expense, Medicare AEP, SMS templates, case study
- [ ] A/B test subject lines once subscriber base reaches 250+

### Growth & Optimization
- [ ] Quarterly Core Web Vitals audit
- [ ] Monitor AI Overview citations for aged lead queries
- [ ] Track newsletter → site traffic via UTM parameters in GA4

---

## Previously Completed

- [x] Technical SEO audit + all critical fixes
- [x] Canonical tags, www consistency, robots.txt, JSON-LD
- [x] Unsplash featured image pipeline + webhook + all pages branded
- [x] Favicon + apple-touch-icon + default OG image
- [x] Social icons removed, promo codes removed, CTAs → newsletter
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
