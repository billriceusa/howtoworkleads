# HowToWorkLeads.com — Backlog for Next Session

**Last updated:** March 13, 2026
**Site status:** 74 pages live (36 landing + 32 blog + 6 category)

---

## Priority 1: Internal Link Remediation (Programmatic)

The internal linking audit (`INTERNAL-LINKING-AUDIT.md`) found 35% compliance with the linking strategy. Fix by patching Sanity content for all 12 new mortgage pages (briefs 31-42):

- Add `/buying-leads` pillar link to every page
- Add `/buying-leads/buy-aged-leads` link to every page
- Add `/lead-order` link to all buying guides
- Add cross-links between buying guides (2+ per page)
- Add scripts/templates + CRM guide links to all how-to posts
- Add follow-up cadence link to the 2 how-to posts missing it

**Estimated effort:** 30 min (script the Sanity patches)

---

## Priority 2: Lead Magnet PDFs

Content is written in `/lead-magnets/` (5 markdown files). Need to:

- [ ] Design as branded PDFs (Canva or similar — HTWL yellow/black brand)
- [ ] Upload to `/public/downloads/`
- [ ] Create gated download pages or inline forms that capture email before delivering PDF
- [ ] Wire into newsletter signup flow (Resend audience 8a35228e)

Assets:
1. Aged Lead Quick-Start Kit
2. 7-Day Follow-Up Cadence Template
3. Insurance Lead Scripts Bundle
4. Mortgage Lead Scripts Bundle
5. Lead Vendor Comparison Scorecard

---

## Priority 3: First Newsletter Issue

Strategy + 26-week calendar ready in `NEWSLETTER-STRATEGY.md`.

- [ ] Set up Resend broadcast for Week 1
- [ ] Subject: "The #1 mistake agents make with aged leads (and the 30-second fix)"
- [ ] Links to: /blog/how-to-work-aged-leads
- [ ] Send Tuesday 8 AM ET
- [ ] Set up welcome email sequence (5-email series in strategy doc)

---

## Priority 4: More Content Verticals

### Insurance "How to Work" Guides (not yet written)
- How to Work P&C Insurance Leads
- How to Work IUL Leads
- How to Work Annuity Leads
- How to Work Health Insurance Leads

### Compliance Cluster
- TCPA Deep-Dive for Lead Buyers
- State-by-State Lead Compliance Guide
- FCC 1:1 Consent Rule (brief 26 exists, already published)

### Scripts & Templates Expansion
- Voicemail Scripts by Vertical (dedicated page)
- SMS/Text Templates by Vertical
- Email Drip Sequences by Vertical (brief 28 exists, already published)

---

## Priority 5: SEO Infrastructure

- [ ] Update llms.txt with insurance how-to guides (43-46) — missed in last update
- [ ] Submit new pages to GSC for indexing (request URL inspection on all new pages)
- [ ] Set up Bing Webmaster Tools
- [ ] Quarterly Core Web Vitals audit
- [ ] Monitor AI Overview citations for aged lead queries

---

## Manual TODO (Needs Bill's Hands)

1. **Google Search Console** — Add www.howtoworkleads.com, submit sitemap.xml
2. **Bing Webmaster Tools** — Sign up, add site, submit sitemap
3. **ALS cross-linking** — Ask Troy to link from ALS blog to HTWL "how to work" guides
4. **Resend audience** — Verify audience 8a35228e is correct for this site
5. **Lead magnet PDF design** — Use Canva or similar with HTWL brand (yellow/black)

---

## Completed (This Session)

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
