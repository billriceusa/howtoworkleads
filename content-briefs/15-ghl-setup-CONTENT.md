# GoHighLevel Setup Guide: Build an Aged Lead Campaign That Converts

GoHighLevel is the most popular CRM among insurance agents, mortgage loan officers, and solar reps for a good reason — it combines CRM, phone dialer, SMS, email marketing, workflow automation, calendars, and landing pages in a single platform for $97/month. That's 4-5 separate tools replaced by one login.

But here's the problem: most agents sign up for GoHighLevel, import their aged leads, and immediately get overwhelmed by the platform's complexity. They make some calls, send a few texts manually, and never build the automated systems that make aged leads profitable at scale.

This guide walks you through setting up GoHighLevel specifically for aged lead campaigns — step by step, from CSV import to automated multi-channel workflows. Follow along and you'll have a fully operational aged lead machine in a single afternoon.

## Why GoHighLevel Is the Best Platform for Aged Leads

Before we get into setup, here's why GHL is our [top CRM pick for aged leads](/blog/best-crm-aged-leads):

**All-in-one means all-in-sync.** Your phone calls, texts, emails, and voicemail drops all happen inside one platform. When you call a lead and they don't answer, the automated text goes out without you lifting a finger. When they reply to that text, the conversation appears in the same place as their call history and email thread.

**Multi-channel workflows are built-in.** GHL's workflow builder lets you create sequences that coordinate phone, text, email, and voicemail drops across a defined timeline. This is exactly what aged leads need — persistent, systematic follow-up without manual management.

**The price is right.** At $97/month for the Starter plan, you get everything most agents need. Compare that to $50/month for a CRM + $25/month for a dialer + $30/month for SMS + $50/month for email automation + $50/month for landing pages. GHL replaces $200+ in monthly tool costs.

**Massive community support.** GoHighLevel has over a million users, with a huge concentration in insurance and mortgage. That means pre-built templates, community workflows, YouTube tutorials, and Facebook groups where agents share what's working.

## Step 1: Import Your Aged Leads

Before you import anything, make sure your leads are DNC-scrubbed. Your lead vendor should handle this, but verify before loading leads into your dialer. Working unscrubbed leads is a compliance violation that can cost you $50,000+ per incident.

### Format Your CSV

GHL's import requires a clean CSV with consistent columns. Here's the recommended format:

- **First Name** — required
- **Last Name** — required
- **Phone** — required (format: 10-digit, no dashes or parentheses)
- **Email** — include if available (many aged leads have email)
- **Address, City, State, Zip** — useful for geographic targeting and personalization
- **Tags** — add columns for lead source, lead age bracket, and vertical

### Import Process

Navigate to **Contacts → Import Contacts → Upload CSV**. Map your CSV columns to GHL's contact fields. GHL will show you a preview — verify the mapping looks correct before confirming.

### Tag on Import

This is the step most agents skip — and it costs them later. During import, add tags that let you segment and automate:

- **Source tag:** `als-feb-2026` (vendor + date)
- **Age tag:** `30-day` or `60-day` or `90-day`
- **Vertical tag:** `final-expense` or `mortgage-refi` or `solar`
- **State tag:** the lead's state (critical for licensing compliance)

These tags power your automation rules and reporting later. Spend two minutes tagging now to save hours of manual sorting later.

### Common Import Errors

- **Duplicate contacts:** GHL matches on email or phone. Duplicates get skipped — check your duplicate count after import.
- **Invalid phone numbers:** GHL rejects numbers that aren't valid US formats. Clean your CSV before importing.
- **Missing required fields:** First name, last name, and either phone or email are required.

### Batch Your Imports

Don't import 2,000 leads at once. Import 200-500 at a time. This prevents your automation workflows from triggering thousands of simultaneous messages (which can flag your Twilio account) and keeps your daily call volume manageable.

## Step 2: Build Your Aged Lead Pipeline

Create a dedicated pipeline for aged leads — don't mix them with fresh leads. The stages, timelines, and metrics are completely different.

Navigate to **Opportunities → Pipelines → Create Pipeline**.

### Recommended Pipeline Stages

1. **New / Imported** — lead loaded, not yet contacted. Your workflow starts here.
2. **Contact Attempted** — in active follow-up sequence (Days 1-7). At least one outreach attempt made.
3. **Contacted / Warm** — spoke with the prospect. They're aware of you and didn't shut you down.
4. **Appointment Set** — scheduled a call, meeting, site visit, or quote presentation.
5. **Proposal / Quote Sent** — presented pricing or coverage options.
6. **Closed / Won** — sale completed.
7. **Nurture** — not ready now, moved to long-term drip.
8. **Not Interested** — explicitly declined. Remove from active outreach.
9. **Bad Data** — wrong number, disconnected, deceased. Tag and exclude from future campaigns.

### Pipeline Settings

- **Auto-move rules:** When a contact replies to any SMS or email, automatically move them from "Contact Attempted" to "Contacted / Warm."
- **Stage duration alerts:** Set alerts if a lead sits in "Appointment Set" for more than 48 hours without progressing — someone needs to confirm or reschedule.

## Step 3: Create Your Multi-Channel Workflow

This is the heart of your aged lead system. Navigate to **Automation → Workflows → Create Workflow → Start from scratch**.

### Trigger

**Contact Added to Pipeline** → Stage: "New / Imported"

This means every lead you import and assign to the pipeline automatically enters the workflow. No manual steps.

### Day 1 Actions

- **Send SMS:** "Hi [First Name], this is [Your Name] with [Company]. I'm following up on your [insurance/mortgage/solar] inquiry. Do you have a quick minute to chat? Reply YES and I'll give you a call."
- **Wait 2 hours**
- **Create Manual Call Task:** "Call [First Name] [Last Name]" — this appears in your task list as a reminder to call
- **Wait 4 hours (after call task)**
- **Voicemail Drop** (if using GHL's ringless voicemail feature): Record a 20-second warm voicemail referencing their inquiry

### Day 2 Actions

- **Wait until 10 AM** (respect time zones — GHL supports timezone-aware sending)
- **Send Email:** Subject: "Your [insurance/mortgage/solar] information — [First Name]." Body: provide value first — a rate update, a savings estimate, or a quick comparison. End with a clear CTA.

### Day 3 Actions

- **Create Manual Call Task:** "Follow-up call — [First Name]" (try a different time than Day 1)
- **Wait 3 hours after task**
- **Send SMS:** "Hi [First Name], tried calling you again. I have some options for you that I think you'll want to see. When's a good time to connect?"

### Day 5 Actions

- **Send Email:** Subject: "Quick question, [First Name]." Body: social proof angle — mention a recent client success or include a testimonial. Keep it short.
- **Wait 4 hours**
- **Send SMS:** Short check-in. "Just sent you an email with some info. Let me know if you have questions!"

### Day 7 Actions

- **Create Manual Call Task:** "Final call attempt — [First Name]"
- **Wait 4 hours**
- **Send Email:** Breakup email. Subject: "Should I close your file?" Body: "I've reached out a few times and haven't been able to connect. I don't want to be a pest, so this will be my last message. If your situation changes, I'm here — just reply to this email or call me at [number]."
- **IF/ELSE Condition:** Has the contact replied to any message?
  - **YES:** Move to "Contacted / Warm" stage → exit this workflow
  - **NO:** Move to "Nurture" stage → add to Long-Term Nurture Workflow (Step 7)

### Workflow Tips

- **Use "Wait" steps, not "Delay" steps** for time-sensitive sends. Wait steps can be configured to fire at specific times of day.
- **Add "Stop on Reply" conditions.** If a contact replies at any point, you probably want to pause the automated sequence and handle them manually.
- **Test your workflow** with your own contact before going live. Import yourself as a test lead and verify every step fires correctly.

## Step 4: Set Up Templates

Pre-build your message templates so they're ready when your workflow fires. Navigate to **Marketing → Templates** for email, and **Settings → Custom Values/Snippets** for SMS.

### SMS Templates (3 Core Messages)

**Intro Text (Day 1):**
"Hi [First Name], this is [Your Name] with [Company]. Following up on your [vertical] inquiry. Got a minute to chat? Reply YES and I'll call you right away."

**Follow-Up Text (Day 3):**
"Hi [First Name], tried reaching you about your [vertical] inquiry. I have some options I think you'd like. When's a good time to connect? - [Your Name]"

**Breakup Text (Day 7 — optional):**
"[First Name], last message from me. I had some [insurance/mortgage/solar] options for you but don't want to bother you. My number is [phone] — I'm here when you're ready. - [Your Name]"

### Email Templates (4 Core Emails)

For full script content and additional templates, see our [complete scripts and templates guide](/blog/aged-lead-scripts-templates). Build these as saved templates in GHL so your workflow can reference them.

**Email 1 — Introduction (Day 2):** Value-first approach. Share a rate update, savings estimate, or helpful resource. No hard sell.

**Email 2 — Social Proof (Day 5):** Client success story or testimonial. "One of my clients in [state] saved $[amount]..." End with soft CTA.

**Email 3 — Breakup (Day 7):** "Should I close your file?" This creates urgency through scarcity — you're about to stop reaching out.

**Email 4 — Re-engagement (Day 30, for Nurture):** Monthly check-in with updated information. Rate change, new incentive, seasonal angle.

### Voicemail Drop Recordings

Record three voicemails in your own voice — warm, conversational, unhurried:

1. **VM 1 (Day 1):** Introduce yourself, reference their inquiry, offer to help
2. **VM 2 (Day 3):** Mention you've been trying to reach them, offer specific value
3. **VM 3 (Day 7):** Breakup voicemail — last attempt, leave the door open

Keep each under 30 seconds. Record in a quiet room. Smile while you talk — it comes through in your voice.

## Step 5: Configure Your Dialer

GHL's built-in dialer requires a Twilio connection for phone and SMS. Navigate to **Settings → Phone Numbers → Twilio** to connect your account.

### Twilio Setup

- Create a Twilio account at twilio.com
- Purchase a local phone number ($1/month)
- Connect to GHL via API credentials (SID + Auth Token)
- Typical costs: $0.013/minute for calls, $0.0079/text message

### Local Presence Dialing

Enable local presence to display a phone number with the lead's area code when you call. This dramatically improves answer rates — people are more likely to pick up a local number than an out-of-state one. In GHL: **Settings → Phone Numbers → enable Local Presence**.

### Call Recording

Enable call recording for training and compliance. **Important:** check your state's recording laws. Some states require two-party consent (both parties must agree to be recorded). Add a disclosure to your opening: "This call may be recorded for quality purposes."

### Power Dialer Mode

For batch calling through your aged lead list, use GHL's Power Dialer. Navigate to **Contacts → select your filtered list → Power Dialer**. The system dials the next lead automatically when you finish a call. This can double or triple your hourly dial count.

## Step 6: Build Reporting Dashboards

You can't optimize what you don't measure. Navigate to **Reporting → Dashboards → Create Dashboard**.

### Key Metrics to Track

- **Contact rate:** percentage of leads you actually speak with (target: 20-30% for 30-90 day leads)
- **Response rate:** percentage who reply to any outreach channel (text, email, or call back)
- **Appointment rate:** percentage of contacts who book a meeting or agree to a quote
- **Close rate:** percentage of appointments that convert to sales
- **Pipeline velocity:** average time from import to close
- **Revenue per lead:** total revenue divided by total leads imported

### Custom Reports

Create a report that shows contact rate and conversion rate broken down by:
- **Lead age** (30-day vs. 60-day vs. 90-day) — identifies the best age bracket
- **Lead source** — identifies the best vendor
- **Workflow variant** — if you're A/B testing sequences

Review these weekly. Kill what's not working, double down on what is.

## Step 7: Long-Term Nurture Automation

After a lead completes the 7-day active cadence without converting, they're not dead — they're just not ready yet. Move them to a long-term nurture workflow that keeps you top of mind.

### Monthly Email Drip

Create a separate workflow triggered by the "Nurture" pipeline stage. Send one email per month with:

- Industry-relevant updates (rate changes for mortgage, new incentives for solar, product updates for insurance)
- A helpful tip or resource
- A soft CTA: "Reply to this email if your situation has changed and you'd like to revisit your options."

### Re-Engagement Triggers

This is where GHL's automation shines. Set up IF/ELSE conditions in your nurture workflow:

- **If lead opens email:** wait 1 hour → send SMS check-in → create call task
- **If lead clicks a link:** immediately move back to "Contact Attempted" → re-enter the active 7-day workflow
- **If lead replies to any message:** move to "Contacted / Warm" → notify you immediately

These triggers automatically reactivate leads who show interest — without you monitoring anything manually.

### Quarterly Phone Touch

Add a task every 90 days: "Quarterly check-in call — [First Name]." One call per quarter keeps the relationship alive. "Hi [Name], just checking in to see if anything has changed with your [insurance/mortgage/solar] situation. No pressure — just wanted to make sure you know I'm here."

## Pro Tips for GHL Aged Lead Campaigns

**Batch your imports.** Import 200-500 leads at a time, not thousands. This keeps your workflow from overwhelming your Twilio account (which can trigger spam flags) and keeps your daily task list manageable.

**A/B test your workflows.** Create two variants of your 7-day sequence — different opening text, different email subject lines, different call times. Split your leads between them and compare contact rates and conversion rates after 30 days.

**Process tasks daily.** GHL creates call tasks from your workflow. If you don't complete them the same day, they stack up and your cadence timing gets thrown off. Block 2-3 hours per day for dedicated dial time.

**Compliance first.** Always include an opt-out mechanism in SMS ("Reply STOP to opt out") and email (unsubscribe link). Respect DNC requests immediately and update your contact records. One compliance violation costs more than a thousand aged leads.

**Use custom fields.** Add custom fields for industry-specific data — current insurance carrier, current mortgage rate, utility company, roof age. This data powers personalization in your templates and helps you prioritize leads.

## FAQ

### Can GoHighLevel handle bulk aged lead imports?

Yes — GHL's CSV import handles thousands of contacts at a time. You can map any CSV column to a GHL contact field, add tags during import, and automatically assign leads to a pipeline stage. The key is formatting your CSV properly before import (10-digit phone numbers, consistent column names) and adding tags for lead source, age bracket, and vertical. We recommend importing in batches of 200-500 rather than all at once to keep your workflow automation running smoothly.

### How much does GoHighLevel cost?

The Starter plan is $97/month and includes everything most individual agents need — CRM, workflows, email, phone (via Twilio), SMS, calendars, and basic reporting. The Unlimited plan at $297/month adds unlimited sub-accounts, which is valuable for agencies managing multiple agents. You'll also need a Twilio account for phone and SMS, which typically costs $20-$50/month depending on your call and text volume (roughly $0.013/minute for calls and $0.008/text).

### Do I need Twilio for GoHighLevel?

Yes — Twilio powers GHL's phone calling and SMS features. You'll need to create a Twilio account, purchase at least one phone number ($1/month), and connect it to GHL via API. The per-use costs are minimal: about $0.013 per minute for outbound calls and $0.0079 per outbound text. For an agent making 50 calls and sending 50 texts per day, that's roughly $1-$2/day in Twilio costs.

### Can I use GoHighLevel for both aged and fresh leads?

Absolutely — just create separate pipelines and workflows for each. Fresh leads should have a speed-to-lead workflow (instant notification, call within 5 minutes, rapid-fire follow-up). Aged leads should have the persistence workflow described in this guide (systematic multi-channel follow-up over days and weeks). Using the same pipeline for both creates confusion because the stages, timelines, and metrics are completely different.

### How long does it take to set up GoHighLevel for aged leads?

Following this guide, expect 2-4 hours for the initial setup — pipeline creation, workflow building, template creation, Twilio connection, and dialer configuration. The templates and workflow logic in this guide give you a blueprint to follow rather than building from scratch. After the initial setup, you'll spend ongoing time optimizing — adjusting templates based on response rates, refining your workflow timing, and improving your call scripts. Most agents see meaningful improvements within the first 2-3 weeks of running their campaigns.

## Get Aged Leads for Your New GHL Campaign

Your GoHighLevel system is only as good as the leads you put in it. [Browse aged leads at AgedLeadStore](https://www.agedleadstore.com/?ref=howtoworkleads) — insurance, mortgage, solar, and more. DNC-scrubbed, no contracts, ready to import into GHL. Use promo code **BILLRICE** for a discount on your first order.

For the complete [follow-up cadence strategy](/blog/aged-lead-follow-up-cadence) and [scripts and templates](/blog/aged-lead-scripts-templates) to load into your GHL workflows, check out our other guides.
