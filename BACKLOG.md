# HowToWorkLeads.com — Backlog

**Last updated:** March 19, 2026
**Site status:** 94+ pages live (36 landing + 52 blog + 9 category + download pages)

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

1. **Resend sender verification** — Verify `bill@howtoworkleads.com` domain in Resend (DONE per Bill)
2. **Newsletter test send** — Run `node scripts/send-newsletter.mjs newsletters/issue-01.md --test`
3. **Pick newsletter launch date** — First Tuesday in April 2026
4. **GSC sitemap** — Submit sitemap.xml in Search Console (site already added per Bill)
5. **Bing Webmaster Tools** — Sign up, add site, submit sitemap
6. **ALS cross-linking** — Share link table with Troy at Monday meeting (table provided)
7. **Welcome sequence** — Wire 5-email series into Resend automation

---

## Next Priorities

### Content Production
- [ ] Scripts expansion: Voicemail Scripts by Vertical, SMS/Text Templates by Vertical
- [x] ~~More verticals: How to Work Debt Leads, How to Work Real Estate Leads~~ — Debt done; Real Estate done previously (briefs 60-62)
- [ ] Content upgrade CTAs on high-traffic pages (match lead magnet to page vertical)
- [ ] More home services verticals: Electrical, Landscaping, Painting, Garage Door
- [ ] More legal verticals: Workers' Comp Leads, Bankruptcy Leads, Family Law Leads

### Newsletter Operations
- [ ] Wire welcome sequence into Resend automation
- [ ] Write Issues 5-8 (Month 2 calendar: insurance deep dive)
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
