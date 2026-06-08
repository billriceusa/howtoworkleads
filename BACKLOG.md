# HowToWorkLeads.com -- Backlog

**Last updated:** June 8, 2026 (meta-description hygiene sprint)
**Site status:** 119+ pages live (36 landing + 77 blog + 9 category + download pages + 2 interactive tools)
**Revenue:** $2,918/mo affiliate rev share (March 2026, 20% of $14,590 attributed ALS revenue)
**Newsletter:** 8 issues written. **Only 3 subscribers in Resend audience** — Issue 1 (broadcast 2a47893d) is still in DRAFT, never actually sent despite earlier claims. Weekly cron IS sending Sunday 8 AM UTC to those 3 addresses. Treat newsletter as non-channel until subscriber acquisition happens.
**Content automation:** Weekly cron publishes 3/week Mon/Wed/Fri (confirmed healthy April 14). Avoid manual bursts — the April 8 backfill of 13 articles may have triggered quality dampening.
**AI provider:** Anthropic SDK (claude-sonnet-4) -- OpenAI fully removed
**Analytics access:** Local GA4 + GSC pulls work via `brsg-analytics-reader@brsg-mcp.iam.gserviceaccount.com` impersonation. **Token scope flag required**: `--scopes=https://www.googleapis.com/auth/webmasters.readonly` (default token 403s). Set account `bill@billricestrategy.com` first. Ahrefs is blind to this domain (DR≈0) — GSC is the only ground truth.

---

## 2026-06-05 — GSC-grounded SEO review (supersedes April plan)

**28-day GSC (May 6–Jun 2):** 20,342 impressions → **79 clicks → 0.39% CTR**, weighted avg position **27.2**.
**vs April 14 baseline:** CTR up (0.15%→0.39%) and impressions growing (content cron), but avg position *worsened* (24.7→27.2). The site ranks for MORE queries but DEEPER. **Impressions aren't the problem; position depth is.**

**Root-cause diagnosis (query-level):**
- The site ranks for the *right* commercial queries but on **page 3–6**. `buy-life-insurance-leads` ranks for **241 buyer queries** ("life insurance leads for sale", "buy life insurance leads", "term/whole/exclusive life insurance leads") all at **pos 35–58** → 5,551 impr / 2 clicks. CTR can't fix page-5 rankings.
- On-page levers are **already exhausted**: 86 pages link to buy-iul-leads, 87 to buy-life-insurance-leads (April hub sprint maxed internal linking); titles/meta already rewritten; life pillar already expanded — and it *still* slipped to pos 37.6. **The binding constraint is domain authority (DR≈0).**
- High blog-page impression counts are mostly **synthetic/hidden-tail queries** (e.g. "hubspot lead management *features review*") that no human types → ~0 CTR regardless of title. Blanket title rewrites = low value; DROPPED.

**The one genuinely winnable on-page target:** `buy-iul-leads` — pos 9–14 for real queries ("iul leads", "iul leads for sale", "best iul leads"), already 24 clicks/28d. Lower competition; on the cusp of page 1.

**Revised growth plan (authority-first):**
1. **P0 — Backlinks / domain authority** (the real constraint). The ALS cross-link partnership (Troy) was "confirmed complete April 14" yet DR is still ~0 and money pages sit at pos 40 — re-verify the ALS links are live, indexed, and dofollow; expand off-site link building. Nothing on-page moves the needle until this does.
2. **P1 — Stop over-producing thin content.** 167 pages on a DR≈0 domain risks site-quality dampening (noted April). Consider pausing/throttling the weekly-content cron and pruning low-value synthetic-query pages instead of adding more.
3. **P1 — Concentrate on winnable niche terms** (like IUL) where DR matters less, rather than head terms ("buy life insurance leads") owned by established vendors.
4. **P2 — Audit what the content cron optimizes for** — it appears to be generating keyword-stuffed "X features review" variants that draw junk impressions, not buyer clicks.

**Not done this session (deliberately):** blanket title rewrites and more internal links — data shows both are exhausted/low-value. Shipped instead: llms.txt/llms-full.txt now Sanity-generated (79→172 URLs).

---

## 2026-06-08 — Meta-description hygiene sprint <!-- /brsg-session -->

Ran WITHOUT GSC query-level data (gcloud not installed on this machine; the impersonation note above needs that binary). So this was baseline hygiene, not a data-targeted play. **Defer to the June 5 strategy above: domain authority/backlinks is the binding constraint; on-page CTR work is low-leverage until DR moves.** This sprint only fixed pages that had *no* meta at all (Google was auto-generating their snippets) — never wrong to fix, but don't expect it to move clicks much on its own.

- [x] **43 pages: added missing `seoTitle`/`seoDescription`** via Sanity MCP (workspace `howtoworkleads`, `e9k38j42`) — 5 Buying-Leads landing pages, the 11-page `how-to-work-*` series + aged-leads pillar (desc only), 27 blog posts (title+desc). Verified live in production HTML. Titles 39–62 chars, descriptions 137–160.
  - Note: 2 of those 27 (`lead-attribution-multi-touch-tracking`, `multi-vendor-lead-performance-dashboard`) were redirect *losers* per the June 5 consolidation — meta on them is moot; unpublished them in Sanity to match (see below).
- [x] **1 new redirect** added to `next.config.js`: `/buying-leads/buy-mortgage-refinance-leads` → `/buying-leads/buy-refinance-mortgage-leads` (word-order dupe; the other 3 dupes I found were already redirected June 5).
- [x] **6 dupe/loser docs unpublished in Sanity** so they leave the sitemap (301s already handle the URLs): closing-techniques-...-10-methods-work, pipeline-management-framework-leads, pipeline-management-framework-never-lose-track-lead, buy-mortgage-refinance-leads, lead-attribution-multi-touch-tracking, multi-vendor-lead-performance-dashboard.

### OPEN — still queued

- [x] **Featured images — 7 bare blog posts backfilled** (June 8) with distinct branded images via local `scripts/backfill-featured-images.ts` (sharp works on macOS): compliance-automation-workflows-2026, conversion-psychology-internet-leads, crm-integration-checklist-lead-tools, cross-channel-lead-attribution-tracking, lead-qualification-framework-internet-leads, lead-velocity-optimization-guide, solar-lead-conversion-internet-leads. (8th, multi-vendor-dashboard, is now a redirect — dropped.) Also fixed the script's cross-doc photo dedup so generic queries don't reuse the same image.
- [ ] **P0 — Featured-image webhook is STILL broken in production.** `/api/generate-featured-image` throws `Could not load the "sharp" module using the linux-x64 runtime`, so EVERY new post publishes without an image until someone runs the local backfill. The June 8 `outputFileTracingIncludes` fix (commit in PR #37) was deployed but **did NOT resolve it** — sharp's native binary still isn't loading in the lambda. Real fix needs deeper Vercel/Next sharp work (candidates: verify `@img/sharp-linux-x64` is actually *installed* on Vercel not just in the lockfile; try `serverExternalPackages` (Next 14 stable name); or make the generator sharp-optional). Interim: run the local backfill periodically, or schedule it.
- [ ] **P0 (per June 5) — verify the ALS backlinks are live, indexed, dofollow.** This is the real lever; nothing on-page moves the needle until DR rises.

### Drift flagged this session

- **`apps/web/.env.local` is MISSING locally** (only `.env.example`). Sanity-patch/publish scripts + `backfill-featured-images.ts` won't run locally without it; used the Sanity MCP instead. Restore it (or pull from Vercel) before running repo scripts.
- **gcloud is NOT installed** on this machine — couldn't pull GSC live (June 5's analytics note assumes it). Local repo HEAD was also stale (June 4) so the June 5 push wasn't visible until a push collision surfaced it — **`git pull` before starting a session here.**

---

## Prioritization Framework

| Priority | Criteria | Timeframe |
|----------|----------|-----------|
| **P0** | Directly increases revenue or fixes something broken | This session / this week |
| **P1** | Grows traffic or conversions meaningfully | Next 2-4 weeks |
| **P2** | Expands coverage, improves ops, or future-proofs | When P0/P1 clear |

---

## P0 -- SEO Sprint -- COMPLETED April 14

- [x] **10 SEO title/meta rewrites** -- Top-impression pages with 0% CTR (buy-iul-leads, close-crm-aged-leads-review, hubspot-crm-leads-review, aged-lead-pricing-guide, buy-home-improvement-leads, voicemail-scripts-insurance-leads, sms-templates-insurance-leads, how-to-work-aged-leads, buy-aged-leads, buy-non-qm-mortgage-leads). Patched directly in Sanity.
- [x] **4 URL redirects** -- Cannibalization + deprecation cleanup in `apps/web/next.config.js`:
  - `/crm-systems/crm-vs-lead-management` → `/lead-management/lead-management-vs-crm` (cannibalization, ~463 impr)
  - `/crm-systems/what-is-a-crm-system` → `/crm-systems` (2,100 impr / 0 clicks, pos 71.9)
  - `/crm-systems/b2c-vs-b2b-crm` → `/blog/best-crm-aged-leads` (1,904 impr / 0 clicks, pos 44.4)
  - `/crm-systems/operational-analytical-and-collaborative-crm` → `/crm-systems` (1,318 impr / 0 clicks, pos 34.1)
- [x] **Hub-and-spoke internal linking** -- 27 pages patched with 51 new links to 3 hubs (aged-lead-pricing-guide, buy-iul-leads, buy-life-insurance-leads). Script: `scripts/hub-link-sprint.mjs`.
- [x] **IUL pillar expansion** -- `/buying-leads/buy-iul-leads` extended with pricing tiers, filter spec, 7-point vendor checklist, FAQ section (6 Q&As triggering FAQPage JSON-LD). Script: `scripts/iul-pillar-expansion.mjs`.
- [x] **Life insurance pillar expansion** -- Same pattern applied to `/buying-leads/buy-life-insurance-leads` (3,674 impr / pos 28.8 — biggest latent ranking opportunity). Script: `scripts/life-pillar-expansion.mjs`.
- [x] **CRM content merge** -- Pre-Sale/Post-Sale boundary + Revenue Model lens sections merged from redirected loser into winner `/lead-management/lead-management-vs-crm`. Script: `scripts/lead-mgmt-vs-crm-merge.mjs`.
- [x] **Semantic HTML heading fix** -- 19 docs / 147 headings converted from `## Heading` in normal blocks to proper `style: "h2"` / `h3` / `h4` blocks. Improves TOC, schema, accessibility. Script: `scripts/fix-heading-semantic-html.mjs`.

**⚠ FOLLOW-UP DUE APRIL 24, 2026** — 10-day impact review against baseline at `data/seo-baseline-2026-04-14.json`. Tell Claude: "Pull the HTWL SEO sprint review against the baseline."

**Commits:** `127d84e` `da959a7` `0c77de0` `f6c5b5c` `b1f9025` `0ce9089` `85c846f`

---

## P0 -- Revenue & Conversion -- COMPLETED April 8

- [x] **Content upgrade CTAs** -- ContentUpgradeCTA component maps page slug to best lead magnet (insurance scripts on insurance pages, etc.). Integrated into blog + landing page templates.
- [x] **Newsletter subscriber growth** -- InlineNewsletterCTA component added mid-article (after 2nd H2 in blog, after 1st content block in landing pages).
- [x] **Cron build fix** -- All 5 cron jobs were silently broken (openai/google-auth webpack resolution). Fixed via serverComponentsExternalPackages.
- [x] **OpenAI to Anthropic migration** -- All 4 AI cron files converted to @anthropic-ai/sdk (claude-sonnet-4). openai package removed.
- [x] **Newsletter Issue 1 sent** -- Broadcast ID 2a47893d, sent April 8 (was delayed due to broken cron).
- [x] **UTM safety net** -- Auto-append UTM params to howtoworkleads.com links in both newsletter HTML converters.
- [x] **ALS cross-linking** -- Handed off to Troy. Confirmed complete April 14.

---

## P1 -- Traffic Growth -- COMPLETED April 8

- [x] **6 voicemail/SMS script articles** (published Apr 14-25):
  - Voicemail Scripts: Insurance (19 scripts), Mortgage (16), Home Services (14)
  - SMS Templates: Insurance (20+), Mortgage (17), Home Services (21)
- [x] **4 home services articles** (published Apr 28 - May 7):
  - Electrical, Landscaping, Painting, Garage Door
- [x] **3 legal vertical articles** (published May 9-14):
  - Workers' Comp, Bankruptcy, Family Law
- [x] **llms.txt updated** with all 13 new article links
- [x] **5 pages submitted for GSC indexing** (April 8)

---

## Next Priorities — Queued for Post-Sprint (April 24+)

### A. Newsletter subscriber acquisition (strategic decision needed)
- **What:** Only 3 contacts in Resend audience. Issue 1 still in draft (never sent). Decide: invest in acquisition (LinkedIn push, ALS partnership, lead-magnet-to-newsletter flow) or accept newsletter is not a channel.
- **Why:** Multiple hours of cron infrastructure + 8 written issues are producing zero traffic. Cost/benefit is currently upside-down.
- **Effort:** Low-Medium for a decision. High for execution if invest.

### E. GSC indexing gap
- **What:** 104/148 sitemap URLs receive zero search impressions (30% coverage). Submit for indexing via GSC API, or identify thin-content pages to noindex/consolidate.
- **Why:** Uncrawled pages produce no rankings regardless of content quality.
- **Dependency:** Revisit after April 24 review — some of today's changes may surface buried pages via improved link equity.
- **Effort:** Medium

---

## Next Priorities (P2 and beyond)

---

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

## Completed History

### April 8, 2026

- [x] **P0 complete** -- ContentUpgradeCTA + InlineNewsletterCTA components built and integrated into all blog + landing page templates
- [x] **Cron infrastructure fixed** -- All 5 cron jobs were silently broken due to openai/google-auth webpack resolution failures. Fixed via serverComponentsExternalPackages in next.config.js.
- [x] **OpenAI replaced with Anthropic** -- All 4 AI cron files (newsletter-ai, performance-ai, ai-content, seo-audit) migrated from openai/gpt-4o to @anthropic-ai/sdk/claude-sonnet-4. openai package removed from dependencies.
- [x] **Newsletter Issue 1 broadcast** -- Sent manually after discovering cron had never fired. Broadcast ID: 2a47893d.
- [x] **UTM safety net** -- Auto-append UTM params to howtoworkleads.com links in both markdownToHtml functions (cron + manual send script)
- [x] **13 new articles written and published** (staggered Apr 14 - May 14):
  - Voicemail Scripts: Insurance (19 scripts), Mortgage (16), Home Services (14)
  - SMS Templates: Insurance (20+), Mortgage (17), Home Services (21)
  - Home Services: Electrical, Landscaping, Painting, Garage Door
  - Legal: Workers' Comp, Bankruptcy, Family Law
- [x] **llms.txt updated** with all 13 new article links (home services, legal, scripts/templates sections)
- [x] **Backlog rewritten** with P0/P1/P2 prioritization and dependency map
- [x] **Repo re-cloned** -- local git had corrupted objects, fresh clone from GitHub
- [x] **5 pages submitted for GSC indexing** -- voicemail-scripts-insurance, sms-templates-insurance, electrical, workers-comp, voicemail-scripts-mortgage
- [x] **Site health audit** -- 145 URLs in sitemap, all pages 200, structured data complete, AI bot access confirmed

---

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
