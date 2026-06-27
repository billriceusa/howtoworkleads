# Lead-Data Hygiene Checklist — Pillar Brief (#103)

**Content Type:** Blog Post (pillar / cornerstone)
**URL:** `/lead-data-hygiene-checklist`
**Category:** Resources
**Status:** DRAFT WRITTEN — pending review → schedule
**Cluster:** Lead-Data Hygiene (pillar + 4 spokes)

---

## Strategic rationale

The site already owns the *compliance/legal* angle deeply (7 live pages: `/tcpa-compliance-lead-buyers`, `/aged-leads-dnc-compliance`, `/state-by-state-lead-compliance-guide`, `/fcc-consent-rule-lead-buying`, `/lead-buyer-regulatory-cheat-sheet`, `/compliance-automation-workflows-2026`, `/text-messaging-compliance-guide`). Another TCPA/DNC guide would cannibalize those.

The genuine whitespace is the **data-quality / hygiene-workflow** side — nobody (not the scrub vendors, not the competitors, not this site) has built the unified, vendor-agnostic "clean your purchased phone data before you dial it" workflow that chains all five hygiene layers in the order an agent actually runs them. This pillar fills that gap and links *up* to the existing compliance pages for the legal mechanics rather than re-explaining them.

## Target keywords

- Primary: `data hygiene` (800/KD6), `list scrubbing` (150/KD4)
- Secondary / in-body long-tail: `how to scrub leads against dnc` (50), `dnc scrub software` (50), `phone number validation` (700/KD33), `dnc scrubbing` (70/KD1), `dnc compliance` (80/KD1)
- The literal "lead list cleaning / scrub service" phrasings are ~0 volume — do NOT title for them; capture them in-body.

## Competitive gap (what we beat)

- **ClickPoint** (strongest editorial competitor) is thorough but DNC-only, vendor-conflicted (sells LeadExec), and not agent-vertical-framed. We beat it on **breadth** (all 5 layers) and **neutrality** (we sell no scrub).
- **"Clean a lead list"** head SERP is hijacked by email-deliverability vendors → phone/voice angle is vacant.
- **Litigator-scrub** SERP is 100% vendor → neutral explainer wins (that's spoke #1).
- **Landline/disconnected** SERP is half consumer noise → clean B2B content wins (spoke #2).

## Required elements

- Five-layer sequenced workflow: DNC → litigator/TCPA-plaintiff → disconnected/invalid → landline/wireless split → internal DNC/opt-out.
- Free vs. paid + rough cost per layer; re-run cadence table.
- Inline copy/paste checklist (the asset — keep inline; do NOT link a downloadable that 404s).
- FAQ block answering harvested PAA-style questions.
- Internal links UP to the 7 compliance pages + `/resources` parent + `/buying-leads`.
- AgedLeadStore affiliate CTA (`?ref=howtoworkleads`).

## Compliance guardrails (non-negotiable)

- FCC 1:1 consent rule was **vacated by the 11th Circuit in Jan 2025 and never took effect** — never present-tense it as law. Multi-company consent model remains permissible.
- Purchased/aged data = **non-consented**: manual dial / click-to-dial only. **No** autodialer/ATDS, predictive dialer, prerecorded/artificial voice, ringless voicemail. **No texting** purchased non-consent data.
- DNC scrub = federal + state + internal; 31-day re-scrub; internal DNC kept 5 years; honor every opt-out; SAN required for federal registry access.
- State mini-TCPAs active (FL FTSA, TX SB 140 eff. 9/1/2025, OK, WA, PA).
- Tag everything "guidance, not legal advice — liability sits with the caller." Authoritative sources only: henson-legal.com, mslawgroup.com, dnc.com.

## FAQPage structured data

Publish script renders FAQ as prose, not `faqSection`. After publish, patch a `faqSection` block onto the doc (preserve the real Q&As) to capture featured-snippet / AI-Overview — the proven on-page lever on this site.

## Cluster roadmap

1. **Pillar (#103, this):** Lead-Data Hygiene Checklist
2. **Spoke (#104):** TCPA litigator scrub explained — the only neutral entry in a 100%-vendor SERP
3. **Spoke (#105):** Remove landlines & disconnected numbers before you dial
4. **Spoke (#106):** DNC scrubbing on a budget — free vs. paid
5. **Spoke (#107):** Is it legal to call leads you bought? (narrow, high-fear)

Build order: pillar → #104 → #105 (purest whitespace + best CTR) → #106 → #107.
