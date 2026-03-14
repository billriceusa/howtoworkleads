# HowToWorkLeads.com — Backlog

**Last updated:** March 14, 2026
**Site status:** 74+ pages live (36 landing + 32 blog + 6 category + downloads)

---

## Completed (March 14 Session)

- [x] **P1: Internal link remediation** — 55 links added across 12 mortgage pages (briefs 31-42) via `scripts/fix-internal-links.mjs`. Compliance ~35% → ~100%.
- [x] **P2: Lead magnet download infrastructure** — `/downloads` index + 5 gated download pages (`/downloads/[slug]`) + `/api/download` route + email capture → Resend audience + auto-download. "Free Downloads" added to nav.
- [x] **P3: Newsletter Issue 1 drafted** — Full issue at `newsletters/issue-01.md` + send script at `scripts/send-newsletter.mjs` (supports dry run, test, broadcast modes).
- [x] **P4: 4 new insurance how-to guides** — briefs 47-50 (P&C, IUL, Annuity, Health Insurance) written + published
- [x] **P5: SEO infrastructure** — llms.txt updated with insurance guides (43-46) + downloads section. Sitemap updated with all download pages.

---

## Still Needs Bill's Hands

1. **Lead magnet PDF design** — Design 5 PDFs in Canva (yellow/black brand), upload to `apps/web/public/downloads/` as:
   - `aged-lead-quick-start-kit.pdf`
   - `7-day-follow-up-cadence.pdf`
   - `insurance-lead-scripts-bundle.pdf`
   - `mortgage-lead-scripts-bundle.pdf`
   - `lead-vendor-comparison-scorecard.pdf`
2. **Verify Resend sender** — Confirm `bill@howtoworkleads.com` is verified in Resend for newsletter sends
3. **Send newsletter test** — Run `node scripts/send-newsletter.mjs newsletters/issue-01.md --test` to preview in inbox
4. **Pick newsletter launch date** — First Tuesday in April 2026
5. **Google Search Console** — Add www.howtoworkleads.com, submit sitemap.xml
6. **Bing Webmaster Tools** — Sign up, add site, submit sitemap
7. **ALS cross-linking** — Ask Troy to link from ALS blog to HTWL "how to work" guides
8. **Git push** — Push all changes to deploy to Vercel

---

## Next Priorities

### Content Production
- [ ] Compliance cluster: TCPA Deep-Dive, State-by-State Compliance Guide
- [ ] Scripts expansion: Voicemail Scripts by Vertical, SMS/Text Templates by Vertical
- [ ] More verticals: How to Work Debt Leads, How to Work Real Estate Leads

### Newsletter Operations
- [ ] Welcome email sequence (5 emails over 10 days — spec in NEWSLETTER-STRATEGY.md)
- [ ] Set up Resend automation for welcome sequence
- [ ] Write Issues 2-4 (Month 1 calendar in strategy doc)

### Growth & Optimization
- [ ] Quarterly Core Web Vitals audit
- [ ] Monitor AI Overview citations for aged lead queries
- [ ] A/B test newsletter subject lines
- [ ] Content upgrade CTAs on high-traffic pages (match lead magnet to page vertical)

---

## Previously Completed

- [x] Technical SEO audit + all critical fixes
- [x] Canonical tags on every page
- [x] www URL consistency
- [x] Unsplash featured image pipeline + webhook
- [x] All 74 pages have branded OG images
- [x] Favicon + apple-touch-icon + default OG image
- [x] Removed placeholder social icons
- [x] Removed all promo codes sitewide
- [x] CTAs changed to newsletter subscribe
- [x] Newsletter rebuilt as on-site email capture (Resend)
- [x] Newsletter branded "The Aged Lead Playbook"
- [x] llms.txt + llms-full.txt updated
- [x] 20 new pages published (10 mortgage + 6 hub/pillar + 4 insurance)
- [x] 3 pillar page upgrades (buying-leads, lead-management, sales-process)
- [x] 46 content briefs written
- [x] Publishing script (publish-content.ts)
- [x] Backfill script (backfill-featured-images.ts)
- [x] Internal linking audit report
- [x] 5 lead magnet content documents
- [x] Newsletter strategy + 26-week calendar
- [x] SEO audit + strategy document
