# Internal Linking Audit: Mortgage Content (Briefs 31-42)

**Date:** March 13, 2026
**Scope:** New mortgage content briefs 31-42 (CONTENT.md files)
**Reference:** SEO-GROWTH-STRATEGY.md Section 7 — Internal Linking Strategy

---

## Audit Methodology

Each CONTENT.md file was reviewed for internal links against four criteria:

1. **Corresponding buying guide / how-to guide** — Does the buying guide link to its paired how-to post, and vice versa?
2. **Main aged leads page** — Does it link to `/buying-leads/buy-aged-leads`?
3. **ROI calculator** — Does it link to `/tools/aged-lead-roi-calculator`?
4. **Cross-links** — Does it link to at least 2-3 other pages on the site?

The SEO strategy also requires:
- Every buying guide links to: `/buying-leads` pillar, corresponding how-to post, 2+ other buying guides, `/lead-order`
- Every how-to blog post links to: `/buying-leads` pillar, corresponding buying guide, scripts/templates post, follow-up cadence post, CRM guide

---

## Summary Scorecard

| # | File | Type | Paired Page | /buy-aged-leads | ROI Calc | Cross-links | /buying-leads pillar | /lead-order | Scripts Post | Cadence Post | CRM Guide |
|---|------|------|-------------|-----------------|----------|-------------|---------------------|-------------|--------------|--------------|-----------|
| 31 | buy-purchase-mortgage-leads | Buying Guide | YES | NO | YES | 4 | NO | NO | YES | YES | NO |
| 32 | buy-refinance-mortgage-leads | Buying Guide | YES | NO | YES | 4 | NO | NO | YES | YES | NO |
| 33 | buy-non-qm-mortgage-leads | Buying Guide | YES | NO | NO | 3 | NO | NO | YES | YES | NO |
| 34 | buy-dscr-loan-leads | Buying Guide | YES | NO | YES | 4 | NO | NO | YES | YES | NO |
| 35 | buy-bank-statement-loan-leads | Buying Guide | YES | NO | NO | 2 | NO | NO | YES | YES | NO |
| 36 | buy-heloc-leads | Buying Guide | NO | NO | YES | 2 | NO | NO | YES | YES | NO |
| 37 | how-to-work-purchase-mortgage-leads | How-To | YES | NO | YES | 5 | NO | NO | NO | YES | NO |
| 38 | how-to-work-refinance-mortgage-leads | How-To | YES | NO | YES | 3 | NO | NO | NO | NO | NO |
| 39 | how-to-work-non-qm-mortgage-leads | How-To | YES | NO | YES | 7 | NO | NO | NO | NO | NO |
| 40 | how-to-work-dscr-loan-leads | How-To | YES | NO | YES | 4 | NO | NO | NO | NO | NO |
| 41 | how-to-work-bank-statement-loan-leads | How-To | YES | NO | YES | 2 | NO | NO | NO | NO | NO |
| 42 | how-to-work-heloc-leads | How-To | YES | NO | YES | 4 | NO | NO | NO | NO | NO |

**YES** = link present | **NO** = link missing

---

## Gap Analysis by Category

### GAP 1: No pages link to `/buying-leads/buy-aged-leads` (the main aged leads page)

**Impact: HIGH** — This is the primary pillar page for aged leads. Zero of the 12 new mortgage content pieces link to it.

**Affected files:** All 12 (briefs 31-42)

### GAP 2: No pages link to `/buying-leads` pillar page

**Impact: HIGH** — The SEO strategy explicitly requires every buying guide and every how-to post to link to the `/buying-leads` pillar. Zero of the 12 pages include this link.

**Affected files:** All 12 (briefs 31-42)

### GAP 3: No pages link to `/lead-order`

**Impact: MEDIUM** — The SEO strategy requires every buying guide to link to `/lead-order`. Zero of the 6 buying guides include this link. (The AgedLeadStore affiliate link partially fills this role but doesn't satisfy the internal linking requirement.)

**Affected files:** 31, 32, 33, 34, 35, 36

### GAP 4: How-to posts missing scripts/templates link

**Impact: HIGH** — The SEO strategy requires every how-to post to link to the scripts/templates post (`/blog/aged-lead-scripts-templates`). None of the 6 how-to posts (37-42) link to it, though all 6 buying guides do. The how-to posts reference scripts within their own content but don't link out to the dedicated scripts resource.

**Wait — correction on 37 (purchase):** Brief 37 does NOT link to scripts/templates. It links to `/blog/aged-lead-email-drip-campaigns` and `/blog/gohighlevel-aged-leads-setup` and `/blog/aged-lead-follow-up-cadence`, but no scripts link.

**Affected files:** 37, 38, 39, 40, 41, 42

**Note:** Upon closer review, some how-to posts DO reference scripts but only within the buying guide cross-reference sections:
- 38 (refinance how-to) does NOT link to scripts — references `/blog/aged-lead-follow-up-cadence` and `/buying-leads/buy-refinance-mortgage-leads` and `/blog/gohighlevel-aged-leads-setup`
- 39 (non-QM how-to) DOES link to `/blog/aged-lead-scripts-templates` in the "Working Aged Non-QM Leads" section — CORRECTION, it does NOT link to scripts from the body; it only links in the closing CTA area to buying guides
- 40 (DSCR how-to) links to `/blog/aged-lead-email-drip-campaigns`, `/blog/crm-aged-leads-setup`, `/buying-leads/buy-dscr-loan-leads`, `/buying-leads/buy-mortgage-leads`
- 41 (bank statement how-to) links to `/buying-leads/buy-bank-statement-loan-leads`, `/buying-leads/buy-aged-leads` — WAIT, this links to buy-aged-leads in the closing CTA! Let me re-check.

### CORRECTION after re-reading:

**Brief 41 (bank statement how-to)** DOES link to `/buying-leads/buy-aged-leads` in the closing CTA: "explore all aged mortgage lead types" — but only as a text reference, not an inline body link. Similarly, **Brief 42 (HELOC how-to)** links to `/buying-leads/buy-mortgage-leads` in the CTA.

These closing CTA links are present on several how-to posts but are at the very bottom, not woven into the body content. For SEO purposes, in-body contextual links carry more weight.

### GAP 5: How-to posts missing follow-up cadence link

**Impact: MEDIUM** — The strategy requires every how-to post to link to `/blog/aged-lead-follow-up-cadence`.

| File | Has cadence link? |
|------|-------------------|
| 37 (purchase) | YES — links to `/blog/aged-lead-follow-up-cadence` |
| 38 (refinance) | YES — links to `/blog/aged-lead-follow-up-cadence` (via Freddie Mac section) |
| 39 (non-QM) | YES — links to `/blog/aged-lead-email-drip-campaigns` and `/blog/gohighlevel-aged-leads-setup` but NOT the cadence post |
| 40 (DSCR) | YES — links to `/blog/aged-lead-follow-up-cadence` and `/blog/aged-lead-email-drip-campaigns` |
| 41 (bank statement) | NO — no cadence link |
| 42 (HELOC) | YES — links to `/blog/aged-lead-follow-up-cadence` and `/blog/aged-lead-email-drip-campaigns` |

**Affected files:** 39, 41

### GAP 6: How-to posts missing CRM guide link

**Impact: MEDIUM** — The strategy requires every how-to post to link to the CRM guide (`/blog/best-crm-aged-leads`). None of the 6 how-to posts include this link.

Some posts link to the GHL setup guide (`/blog/gohighlevel-aged-leads-setup`) which is adjacent, but not the same page. Brief 40 links to `/blog/crm-aged-leads-setup` which appears to be the same page as `/blog/best-crm-aged-leads` with a different slug — needs verification.

**Affected files:** 37, 38, 39, 40, 41, 42

### GAP 7: ROI calculator missing from 2 buying guides

**Impact: LOW** — Briefs 33 (non-QM) and 35 (bank statement) do not link to `/tools/aged-lead-roi-calculator`. All other pages do.

**Affected files:** 33, 35

### GAP 8: HELOC buying guide (36) missing paired how-to link

**Impact: MEDIUM** — Brief 36 (buy-heloc-leads) does NOT link to its paired how-to post. It links to `/blog/aged-lead-follow-up-cadence` and `/blog/aged-lead-scripts-templates` but has no link to `/blog/how-to-work-heloc-leads`. Every other buying guide correctly links to its paired how-to post.

**Affected file:** 36

### GAP 9: Buying guides missing cross-links to other buying guides

The strategy requires each buying guide to link to "at least 2 other related buying guide pages."

| File | Other buying guide links |
|------|------------------------|
| 31 (purchase) | None — no links to other buying guides |
| 32 (refinance) | YES — links to `/buying-leads/buy-heloc-leads` |
| 33 (non-QM) | YES — links to `/buying-leads/buy-dscr-loan-leads` |
| 34 (DSCR) | None — no links to other buying guides |
| 35 (bank statement) | None — no links to other buying guides |
| 36 (HELOC) | None — no links to other buying guides |

**Only 2 of 6 buying guides cross-link to other buying guides, and neither meets the 2-link minimum.**

**Affected files:** 31, 32, 33, 34, 35, 36

---

## Detailed File-by-File Audit

### Brief 31: Buy Purchase Mortgage Leads (`/buying-leads/buy-purchase-mortgage-leads`)

**Links found:**
- `/blog/how-to-work-purchase-mortgage-leads` (paired how-to) — YES
- `/blog/aged-lead-follow-up-cadence` — YES
- `/blog/aged-lead-scripts-templates` — YES
- `/blog/how-to-work-aged-mortgage-leads` — YES
- `/tools/aged-lead-roi-calculator` — YES
- `/newsletter` — YES
- AgedLeadStore affiliate (external) — YES

**Missing:**
- `/buying-leads` pillar page
- `/buying-leads/buy-aged-leads` (main aged leads page)
- `/lead-order`
- 2+ other buying guides (e.g., refinance, non-QM, DSCR)

---

### Brief 32: Buy Refinance Mortgage Leads (`/buying-leads/buy-refinance-mortgage-leads`)

**Links found:**
- `/blog/how-to-work-refinance-mortgage-leads` (paired how-to) — YES
- `/buying-leads/buy-heloc-leads` — YES (1 buying guide cross-link)
- `/blog/aged-lead-follow-up-cadence` — YES
- `/blog/aged-lead-scripts-templates` — YES
- `/tools/aged-lead-roi-calculator` — YES
- `/newsletter` — YES

**Missing:**
- `/buying-leads` pillar page
- `/buying-leads/buy-aged-leads`
- `/lead-order`
- 1+ additional buying guide cross-link (needs 2 total)

---

### Brief 33: Buy Non-QM Mortgage Leads (`/buying-leads/buy-non-qm-mortgage-leads`)

**Links found:**
- `/blog/how-to-work-non-qm-mortgage-leads` (paired how-to) — YES
- `/buying-leads/buy-dscr-loan-leads` — YES (1 buying guide cross-link)
- `/blog/aged-lead-follow-up-cadence` — YES
- `/blog/aged-lead-scripts-templates` — YES
- `/newsletter` — YES

**Missing:**
- `/buying-leads` pillar page
- `/buying-leads/buy-aged-leads`
- `/lead-order`
- `/tools/aged-lead-roi-calculator`
- 1+ additional buying guide cross-link

---

### Brief 34: Buy DSCR Loan Leads (`/buying-leads/buy-dscr-loan-leads`)

**Links found:**
- `/blog/how-to-work-non-qm-mortgage-leads` (links to non-QM how-to, not DSCR-specific — but paired logically)
- `/blog/aged-lead-follow-up-cadence` — YES
- `/blog/aged-lead-scripts-templates` — YES
- `/tools/aged-lead-roi-calculator` — YES
- `/newsletter` — YES

**Missing:**
- `/buying-leads` pillar page
- `/buying-leads/buy-aged-leads`
- `/lead-order`
- 2+ other buying guides (e.g., non-QM, bank statement, purchase)
- Does NOT link to `/blog/how-to-work-dscr-loan-leads` — links to non-QM how-to instead

**Note:** Brief 34 was written before brief 40 (DSCR how-to) existed. Now that the DSCR how-to exists, the buying guide should link to it directly.

---

### Brief 35: Buy Bank Statement Loan Leads (`/buying-leads/buy-bank-statement-loan-leads`)

**Links found:**
- `/blog/how-to-work-non-qm-mortgage-leads` (links to non-QM how-to — logical but not the dedicated bank statement how-to)
- `/blog/aged-lead-follow-up-cadence` — YES
- `/blog/aged-lead-scripts-templates` — YES
- `/newsletter` — YES

**Missing:**
- `/buying-leads` pillar page
- `/buying-leads/buy-aged-leads`
- `/lead-order`
- `/tools/aged-lead-roi-calculator`
- 2+ other buying guides
- `/blog/how-to-work-bank-statement-loan-leads` — should link to the dedicated bank statement how-to

---

### Brief 36: Buy HELOC Leads (`/buying-leads/buy-heloc-leads`)

**Links found:**
- `/blog/aged-lead-follow-up-cadence` — YES
- `/blog/aged-lead-scripts-templates` — YES
- `/tools/aged-lead-roi-calculator` — YES
- `/newsletter` — YES

**Missing:**
- `/blog/how-to-work-heloc-leads` (paired how-to) — MISSING
- `/buying-leads` pillar page
- `/buying-leads/buy-aged-leads`
- `/lead-order`
- 2+ other buying guides (e.g., purchase, refinance)

---

### Brief 37: How to Work Purchase Mortgage Leads (`/blog/how-to-work-purchase-mortgage-leads`)

**Links found:**
- `/buying-leads/buy-purchase-mortgage-leads` (paired buying guide) — YES (in closing CTA)
- `/blog/how-to-work-aged-mortgage-leads` — YES
- `/blog/aged-lead-follow-up-cadence` — YES
- `/blog/aged-lead-email-drip-campaigns` — YES
- `/blog/gohighlevel-aged-leads-setup` — YES
- `/tools/aged-lead-roi-calculator` — YES
- `/newsletter` — YES

**Missing:**
- `/buying-leads` pillar page
- `/buying-leads/buy-aged-leads`
- `/blog/aged-lead-scripts-templates` — NOT linked (the strategy requires scripts link)
- `/blog/best-crm-aged-leads` (CRM guide)

---

### Brief 38: How to Work Refinance Mortgage Leads (`/blog/how-to-work-refinance-mortgage-leads`)

**Links found:**
- `/buying-leads/buy-refinance-mortgage-leads` (paired buying guide) — YES
- `/blog/gohighlevel-aged-leads-setup` — YES
- `/tools/aged-lead-roi-calculator` — YES
- `/newsletter` — YES

**Missing:**
- `/buying-leads` pillar page
- `/buying-leads/buy-aged-leads`
- `/blog/aged-lead-scripts-templates`
- `/blog/aged-lead-follow-up-cadence` — NOT linked from body (the cadence is built into the post itself but doesn't link to the dedicated cadence article)
- `/blog/best-crm-aged-leads` (CRM guide)

**Note:** Brief 38 references Freddie Mac PMMS (external) but misses the internal scripts and cadence links.

---

### Brief 39: How to Work Non-QM Mortgage Leads (`/blog/how-to-work-non-qm-mortgage-leads`)

**Links found:**
- `/buying-leads/buy-non-qm-mortgage-leads` (paired buying guide) — YES (closing CTA)
- `/buying-leads/buy-dscr-loan-leads` — YES
- `/buying-leads/buy-bank-statement-loan-leads` — YES (closing CTA)
- `/blog/aged-lead-email-drip-campaigns` — YES
- `/blog/gohighlevel-aged-leads-setup` — YES
- `/tools/aged-lead-roi-calculator` — YES
- `/newsletter` — YES

**Missing:**
- `/buying-leads` pillar page
- `/buying-leads/buy-aged-leads`
- `/blog/aged-lead-scripts-templates`
- `/blog/aged-lead-follow-up-cadence`
- `/blog/best-crm-aged-leads` (CRM guide)

---

### Brief 40: How to Work DSCR Loan Leads (`/blog/how-to-work-dscr-loan-leads`)

**Links found:**
- `/buying-leads/buy-dscr-loan-leads` (paired buying guide) — YES (closing CTA)
- `/buying-leads/buy-mortgage-leads` — YES (closing CTA — this is the mortgage leads hub)
- `/blog/aged-lead-email-drip-campaigns` — YES
- `/blog/crm-aged-leads-setup` — YES (likely same as CRM guide, different slug)
- `/tools/aged-lead-roi-calculator` — YES
- `/newsletter` — YES

**Missing:**
- `/buying-leads` pillar page
- `/buying-leads/buy-aged-leads`
- `/blog/aged-lead-scripts-templates`
- `/blog/aged-lead-follow-up-cadence`

**Note:** Links to `/blog/crm-aged-leads-setup` — verify this slug matches the published CRM guide. The brief says `/blog/best-crm-aged-leads`.

---

### Brief 41: How to Work Bank Statement Loan Leads (`/blog/how-to-work-bank-statement-loan-leads`)

**Links found:**
- `/buying-leads/buy-bank-statement-loan-leads` (paired buying guide) — YES (closing CTA)
- `/buying-leads/buy-aged-leads` — YES (closing CTA only: "explore all aged mortgage lead types")
- `/tools/aged-lead-roi-calculator` — YES
- `/newsletter` — YES

**Missing:**
- `/buying-leads` pillar page
- `/blog/aged-lead-scripts-templates`
- `/blog/aged-lead-follow-up-cadence`
- `/blog/best-crm-aged-leads` (CRM guide)
- Cross-links to other how-to posts (e.g., non-QM, DSCR)

**Note:** This is the ONLY how-to post that links to `/buying-leads/buy-aged-leads`, but only in the closing CTA, not in body content.

---

### Brief 42: How to Work HELOC Leads (`/blog/how-to-work-heloc-leads`)

**Links found:**
- `/buying-leads/buy-heloc-leads` (paired buying guide) — YES (closing CTA)
- `/buying-leads/buy-mortgage-leads` — YES (closing CTA)
- `/blog/aged-lead-email-drip-campaigns` — YES
- `/blog/crm-aged-leads-setup` — YES (same slug question as brief 40)
- `/blog/aged-lead-follow-up-cadence` — YES
- `/tools/aged-lead-roi-calculator` — YES
- `/newsletter` — YES

**Missing:**
- `/buying-leads` pillar page
- `/buying-leads/buy-aged-leads`
- `/blog/aged-lead-scripts-templates`
- `/blog/best-crm-aged-leads` (CRM guide — `/blog/crm-aged-leads-setup` may be the same page)
- Cross-links to other how-to posts

---

## Priority Remediation Plan

### Priority 1 — Universal Gaps (All 12 pages)

These links should be added to every page:

| Link | Where to Place |
|------|---------------|
| `/buying-leads` | In-body reference to "browse all lead buying guides" or similar |
| `/buying-leads/buy-aged-leads` | In-body reference when discussing aged leads generally |

### Priority 2 — Buying Guide Gaps (Briefs 31-36)

| Link | Where to Place |
|------|---------------|
| `/lead-order` | In the "Getting Started" section or near AgedLeadStore CTA |
| 2+ other buying guides | In-body cross-references (e.g., "If you also work refinance leads, see our [refinance lead buying guide]") |

**Specific pairings to add:**
- 31 (purchase) → 32 (refinance), 36 (HELOC)
- 32 (refinance) → 31 (purchase), 36 (HELOC) — already has HELOC, add purchase
- 33 (non-QM) → 35 (bank statement), 34 (DSCR) — already has DSCR, add bank statement
- 34 (DSCR) → 33 (non-QM), 35 (bank statement)
- 35 (bank statement) → 33 (non-QM), 34 (DSCR)
- 36 (HELOC) → 31 (purchase), 32 (refinance)

### Priority 3 — How-To Post Gaps (Briefs 37-42)

| Link | Where to Place |
|------|---------------|
| `/blog/aged-lead-scripts-templates` | In scripts/templates sections of each how-to |
| `/blog/aged-lead-follow-up-cadence` | In cadence sections (missing from 39, 41) |
| `/blog/best-crm-aged-leads` | In CRM/pipeline sections |

### Priority 4 — Specific Missing Links

| File | Missing Link | Notes |
|------|-------------|-------|
| 34 (DSCR buying guide) | `/blog/how-to-work-dscr-loan-leads` | Currently links to non-QM how-to; should add DSCR-specific how-to |
| 35 (bank statement buying guide) | `/blog/how-to-work-bank-statement-loan-leads` | Currently links to non-QM how-to; should add bank statement-specific how-to |
| 36 (HELOC buying guide) | `/blog/how-to-work-heloc-leads` | Missing entirely — no paired how-to link |
| 33 (non-QM buying guide) | `/tools/aged-lead-roi-calculator` | Missing ROI calculator link |
| 35 (bank statement buying guide) | `/tools/aged-lead-roi-calculator` | Missing ROI calculator link |

### Priority 5 — Slug Verification

Two slugs used in how-to posts need verification against published pages:
- `/blog/crm-aged-leads-setup` (used in briefs 40, 42) vs. `/blog/best-crm-aged-leads` (from strategy doc, brief 14)
- `/buying-leads/buy-mortgage-leads` (used in briefs 40, 42) — verify this page exists as a published hub

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total pages audited | 12 |
| Pages linking to `/buying-leads/buy-aged-leads` | 1 (CTA only) |
| Pages linking to `/buying-leads` pillar | 0 |
| Pages linking to `/lead-order` | 0 |
| Pages linking to `/tools/aged-lead-roi-calculator` | 10 of 12 |
| Buying guides linking to paired how-to | 5 of 6 (HELOC missing) |
| How-to posts linking to paired buying guide | 6 of 6 |
| Buying guides with 2+ cross-links to other buying guides | 0 of 6 |
| How-to posts linking to scripts/templates | 0 of 6 |
| How-to posts linking to CRM guide | 0 of 6 (2 link to a possibly equivalent slug) |

**Overall internal linking compliance with SEO strategy: ~35%**

The ROI calculator and paired page cross-links are generally good. The systematic gaps are: pillar page links, aged leads hub links, /lead-order links, buying guide cross-links, and the scripts/CRM/cadence trio for how-to posts.

---

*This audit covers CONTENT.md files only (what was published to Sanity). Backlinks from existing pages to these new pages were not audited — that is a separate task.*
