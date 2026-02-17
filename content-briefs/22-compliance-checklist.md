# Content Brief: Lead Compliance Checklist (Interactive Tool)

**Status:** Not Started
**Phase:** 3 (Authority)
**Priority:** 22

---

## Target

- **Primary Keyword:** `lead buying compliance checklist`
- **Secondary Keywords:** `TCPA compliance checklist`, `DNC compliance checklist leads`, `lead compliance requirements`, `telemarketing compliance checklist`, `insurance lead compliance`
- **Search Intent:** Informational / Tool
- **Target Word Count:** 1,000-1,500 (supporting content around the checklist)
- **Content Type:** Interactive Tool Page
- **URL:** `/tools/compliance-checklist`

---

## Competitive Analysis

- No interactive compliance checklist exists specific to buying and working internet leads
- TCPA compliance content is heavy legal text with no practical tools
- Agents want a simple "am I compliant?" checklist, not a law review article
- Link-worthy asset — compliance resources get referenced and bookmarked

---

## Tool Specification

### Interactive Checklist Format
A step-by-step checklist the user can check off, organized by category. Progress bar at top showing completion percentage. Results summary at bottom.

### Checklist Sections

#### Section 1: Before You Buy Leads
- [ ] Verified vendor provides DNC-scrubbed data
- [ ] Confirmed how leads were generated (source transparency)
- [ ] Verified vendor has documented consumer consent
- [ ] Confirmed leads include opt-in for phone, email, and/or SMS (separately)
- [ ] Checked vendor's return/refund policy for bad data
- [ ] Reviewed vendor's privacy policy and data handling practices

#### Section 2: Before You Call
- [ ] Scrubbed lead list against National DNC Registry
- [ ] Scrubbed against state-specific DNC lists (if applicable)
- [ ] Verified calling hours: 8am-9pm lead's LOCAL time
- [ ] Caller ID is set to display your real business number (no spoofing)
- [ ] Call recording disclosures prepared (if recording, check state consent laws)
- [ ] Trained reps on opt-out procedures

#### Section 3: Before You Text (SMS)
- [ ] Verified prior express written consent for SMS marketing
- [ ] Auto-reply STOP/opt-out mechanism configured
- [ ] Messages identify your business name
- [ ] Messages are sent during appropriate hours
- [ ] Short-code or 10DLC registration complete (carrier compliance)

#### Section 4: Before You Email
- [ ] CAN-SPAM compliant: includes physical mailing address
- [ ] Unsubscribe mechanism in every email
- [ ] "From" name accurately identifies sender
- [ ] Subject lines are not misleading
- [ ] Honoring unsubscribe requests within 10 business days

#### Section 5: Industry-Specific
- [ ] **Insurance:** State DOI requirements reviewed
- [ ] **Medicare:** CMS marketing guidelines followed, Scope of Appointment obtained
- [ ] **Mortgage:** TILA/RESPA advertising rules followed
- [ ] **All:** State licensing verified for lead's state (if applicable)

#### Section 6: Record Keeping
- [ ] Consent records documented and accessible
- [ ] Call logs maintained
- [ ] DNC scrub dates recorded
- [ ] Opt-out requests tracked and honored
- [ ] Records retained for 5+ years

### Results Summary
- **100% complete:** "You're compliant! Keep these records updated."
- **75-99%:** "Almost there — address the unchecked items before your next campaign."
- **Below 75%:** "Risk alert — several compliance gaps need attention. Review unchecked items carefully."

---

## Page Content Outline

### H1: Lead Compliance Checklist: Are You Ready to Work Your Leads Legally?

### Brief intro (3-4 sentences):
"Before you make your first call, send your first text, or launch your first email — make sure you're compliant. Use this interactive checklist to verify you've covered every legal requirement for buying and working internet leads."

### The Checklist (Interactive Component)

### H2: Why Compliance Matters (More Than You Think)
- Fines: $500-$1,500 per TCPA violation (per call/text)
- Lawsuits: class action risk for systematic violations
- Reputation: one complaint can trigger regulatory scrutiny
- The good news: compliance is straightforward once you have a system

### H2: Key Regulations Explained (Brief)
- **TCPA** — governs calls and texts (2-3 sentences + link to DNC compliance post)
- **CAN-SPAM** — governs email (2-3 sentences)
- **FCC 1:1 Consent** — new rule affecting lead generation (2-3 sentences + link to FCC post)
- **State laws** — some states have stricter rules (mention key ones: CA, FL, NY)

### H2: FAQ
1. **Do I really need to DNC scrub aged leads?** [Yes — fines are per-violation, and aged leads may have added themselves to DNC since the original inquiry]
2. **What if my vendor says leads are pre-scrubbed?** [Trust but verify — scrub again yourself to be safe]
3. **Can I get in trouble for calling an aged lead?** [Only if you violate TCPA/DNC rules — follow this checklist and you're protected]

---

## Technical Implementation

### Build Approach
- React component with `useState` for checkbox tracking
- Progress bar calculated from checked items / total items
- Local storage to save checklist progress (user can return and continue)
- Print/download as PDF option
- Style with Tailwind to match site design

### Files to Create/Modify
- `apps/web/app/tools/compliance-checklist/page.tsx`
- `apps/web/components/tools/ComplianceChecklist.tsx`

### Structured Data
- `HowTo` schema (the checklist is essentially a how-to for compliance)
- `FAQPage` schema for FAQ section

---

## Required Elements

- [ ] Interactive checklist with progress tracking
- [ ] Print/download PDF option
- [ ] FAQ section (3 questions) with FAQPage schema
- [ ] CTA: "Compliant and ready? Get aged leads" → AgedLeadStore (promo code BILLRICE)
- [ ] CTA: Book a Lead Strategy Call
- [ ] CTA: Newsletter signup
- [ ] Internal links to:
  - `/blog/aged-leads-dnc-compliance` (deep dive)
  - `/blog/fcc-consent-rule-lead-buying`
  - `/buying-leads/buy-aged-leads`
  - `/aged-leads` (hub)
- [ ] External links to:
  - FCC TCPA page
  - FTC DNC Registry
  - CAN-SPAM Act reference
- [ ] Meta title: `Lead Compliance Checklist: TCPA, DNC & Email Requirements`
- [ ] Meta description: `Interactive compliance checklist for buying and working internet leads. TCPA, DNC, CAN-SPAM, and industry-specific requirements — check every box before your next campaign.`

---

## Writing Notes

- **The checklist IS the product.** Minimal surrounding text — people want to check boxes, not read essays.
- **Save progress in local storage.** Agents may start the checklist and come back to it later.
- **PDF download is the lead magnet opportunity.** "Download this checklist as a PDF" could gate behind email capture.
- **This builds trust at a deep level.** Providing compliance tools shows you care about agents' businesses, not just selling them leads.
