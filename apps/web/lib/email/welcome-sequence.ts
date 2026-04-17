/**
 * Welcome Sequence — 5 automated emails sent after newsletter signup
 *
 * Email 1 (Day 0): Sent immediately by /api/newsletter and /api/download routes
 * Emails 2-5 (Day 2, 4, 7, 10): Sent by /api/cron/welcome-sequence
 */

const SITE_URL = 'https://howtoworkleads.com'
const UTM_BASE = 'utm_source=newsletter&utm_medium=email&utm_campaign=welcome-sequence'

export const FROM = 'Bill Rice <bill@howtoworkleads.com>'
export const REPLY_TO = 'bill@howtoworkleads.com'

export interface WelcomeEmail {
  day: number
  subject: string
  html: string
}

// Schedule: which email to send on which day after signup
export const WELCOME_SCHEDULE = [
  { day: 0, emailIndex: 0 },
  { day: 2, emailIndex: 1 },
  { day: 4, emailIndex: 2 },
  { day: 7, emailIndex: 3 },
  { day: 10, emailIndex: 4 },
] as const

export function getWelcomeEmail(index: number): WelcomeEmail {
  const emails = [getEmail1(), getEmail2(), getEmail3(), getEmail4(), getEmail5()]
  return emails[index]
}

export function getEmailForDay(day: number): WelcomeEmail | null {
  const entry = WELCOME_SCHEDULE.find((s) => s.day === day)
  if (!entry) return null
  return getWelcomeEmail(entry.emailIndex)
}

// ── Email 1 — Day 0 (Immediate) ──────────────────────────────────────

function getEmail1(): WelcomeEmail {
  const subject =
    'Your download is ready + what to expect from The Aged Lead Playbook'

  const markdown = `Hey —

Thanks for subscribing to **The Aged Lead Playbook**. Your download should have started automatically — if not, [grab it here](${SITE_URL}/downloads?${UTM_BASE}&utm_content=email-1-download).

Here's what you just signed up for:

**Every Tuesday at 8 AM ET**, you'll get one email with:

- **One tactical play** — a specific strategy, script, or framework you can use that day
- **One actionable insert** — a copy-paste script, checklist, or data table you can screenshot
- **One blog link** — deeper reading on the topic from howtoworkleads.com
- **Quick hits** — an industry stat, tool recommendation, or compliance update

No fluff. No pitches disguised as content. Just the playbook that top-producing agents use to turn aged leads into commission checks.

Talk soon,
Bill Rice

P.S. — Hit reply and tell me what vertical you work in (insurance, mortgage, solar, or something else). I read every response and it helps me send you the most relevant content.

---

*The Aged Lead Playbook by [HowToWorkLeads.com](${SITE_URL}?${UTM_BASE}&utm_content=email-1-footer)*`

  return { day: 0, subject, html: wrapEmail(markdownToHtml(markdown)) }
}

// ── Email 2 — Day 2 ──────────────────────────────────────────────────

function getEmail2(): WelcomeEmail {
  const subject =
    'Start here — the one article every aged lead buyer should read first'

  const markdown = `Most agents start buying aged leads without understanding the math behind them.

They hear "$0.50 per lead" and buy 1,000. Then they call half of them, close two, and decide aged leads don't work.

The problem isn't the leads. It's the math — and the system (or lack of one).

**This article breaks down the real numbers:** cost per lead, contact rates, close rates, and ROI by vertical. It's the most-read article on the site, and it's where I'd start if I were you.

**[Read: Aged Leads vs. Fresh Leads — The Complete Cost-Benefit Analysis](${SITE_URL}/blog/aged-leads-vs-fresh-leads?${UTM_BASE}&utm_content=email-2-blog)**

Key takeaway: aged leads don't have lower ROI — they have a *different* ROI curve. You need more volume, a tighter cadence, and a CRM that doesn't let leads slip through. The agents who figure that out spend one-fifth as much per deal.

Tomorrow I'll share a resource that'll help you put that system in place.

— Bill

---

*The Aged Lead Playbook by [HowToWorkLeads.com](${SITE_URL}?${UTM_BASE}&utm_content=email-2-footer)*`

  return { day: 2, subject, html: wrapEmail(markdownToHtml(markdown)) }
}

// ── Email 3 — Day 4 ──────────────────────────────────────────────────

function getEmail3(): WelcomeEmail {
  const subject =
    'The scripts and cadence that 3x your contact rate (free download)'

  const markdown = `Two days ago I sent you the math on aged leads. Today, here's the system.

The biggest gap I see with agents working aged leads isn't their closing ability — it's their *follow-up*. They make one call, leave one voicemail, and move on. That's a 1-touch approach in a game that requires 7-12.

I've got two resources for you:

**1. [The 7-Day Follow-Up Cadence](${SITE_URL}/downloads/7-day-follow-up-cadence?${UTM_BASE}&utm_content=email-3-cadence)** — A day-by-day plan using phone, text, and email with scripts for every touchpoint. Insurance and mortgage versions included.

**2. [Aged Lead Scripts & Templates](${SITE_URL}/blog/aged-lead-scripts-templates?${UTM_BASE}&utm_content=email-3-scripts)** — The full article with phone openers, voicemail drops, text templates, and email sequences.

The cadence alone will double your contact rate. The scripts make sure you know what to say when they pick up.

— Bill

P.S. — If you work insurance leads specifically, the [Insurance Lead Scripts Bundle](${SITE_URL}/downloads/insurance-lead-scripts-bundle?${UTM_BASE}&utm_content=email-3-insurance) has 15+ scripts built for your vertical. Mortgage? [Here's yours](${SITE_URL}/downloads/mortgage-lead-scripts-bundle?${UTM_BASE}&utm_content=email-3-mortgage).

---

*The Aged Lead Playbook by [HowToWorkLeads.com](${SITE_URL}?${UTM_BASE}&utm_content=email-3-footer)*`

  return { day: 4, subject, html: wrapEmail(markdownToHtml(markdown)) }
}

// ── Email 4 — Day 7 ──────────────────────────────────────────────────

function getEmail4(): WelcomeEmail {
  const subject = "What's your ROI on aged leads? (2-minute calculator)"

  const markdown = `One week in. By now you've seen the math, the scripts, and the cadence.

Here's the question that ties it all together: **what's your actual ROI?**

Most agents guess. They have a "feel" for whether leads are working. That's not a strategy — that's hope.

I built a free calculator that takes your numbers — cost per lead, volume, contact rate, close rate, average commission — and shows you exactly what you're making (or losing) per dollar spent.

**[Use the Aged Lead ROI Calculator](${SITE_URL}/tools/aged-lead-roi-calculator?${UTM_BASE}&utm_content=email-4-calculator)**

Takes 2 minutes. No email required. Just plug in your numbers and see where you stand.

**Quick question for you:** What vertical do you work in?

- Insurance (life, health, Medicare, final expense, auto, P&C)
- Mortgage (purchase, refi, HELOC, non-QM)
- Solar
- Home improvement
- Other

Just reply with your vertical — it helps me tailor the content I send you. I read every reply.

— Bill

---

*The Aged Lead Playbook by [HowToWorkLeads.com](${SITE_URL}?${UTM_BASE}&utm_content=email-4-footer)*`

  return { day: 7, subject, html: wrapEmail(markdownToHtml(markdown)) }
}

// ── Email 5 — Day 10 ─────────────────────────────────────────────────

function getEmail5(): WelcomeEmail {
  const subject =
    "You're one of 200+ agents getting this. Here's what they're saying."

  const markdown = `You've been on The Aged Lead Playbook for 10 days. Here's what I've heard from other subscribers:

> *"I was spending $3,000/month on fresh leads and closing 4 deals. Switched to aged leads with the cadence from your site and I'm closing 5 deals for $600."* — Insurance agent, Texas

> *"The GHL setup guide alone saved me 20 hours. My aged lead pipeline runs on autopilot now."* — Mortgage LO, Florida

> *"I didn't realize aged leads needed a completely different approach than real-time leads. The scripts changed everything."* — Medicare agent, Ohio

These aren't unicorns. They're agents who learned the system and committed to working it.

**If you know someone who buys leads**, forward this email to them. They'll get the same resources you did — the Quick-Start Kit, the scripts, the cadence, the calculator — plus a tactical email every Tuesday.

**[Forward-friendly signup link: howtoworkleads.com/#newsletter](${SITE_URL}/#newsletter?${UTM_BASE}&utm_content=email-5-forward)**

**Ready to put what you've learned into practice?** [Browse aged leads by vertical, geography, and age at AgedLeadStore.com](https://agedleadstore.com/all-lead-types/?utm_source=howtoworkleads&utm_medium=email&utm_campaign=welcome-sequence&utm_content=email-5-cta)

Thanks for being here. See you Tuesday.

— Bill

---

*The Aged Lead Playbook by [HowToWorkLeads.com](${SITE_URL}?${UTM_BASE}&utm_content=email-5-footer)*`

  return { day: 10, subject, html: wrapEmail(markdownToHtml(markdown)) }
}

// ── HTML Conversion ───────────────────────────────────────────────────

function markdownToHtml(md: string): string {
  let html = md
    // Blockquotes
    .replace(
      /^> (.+)$/gm,
      '<blockquote style="border-left:3px solid #FFD500;padding:8px 16px;margin:16px 0;color:#555;font-style:italic;">$1</blockquote>'
    )
    // Headers
    .replace(
      /^## (.+)$/gm,
      '<h2 style="font-family:Georgia,serif;font-size:22px;color:#1A1A1A;margin:32px 0 12px;">$1</h2>'
    )
    .replace(
      /^### (.+)$/gm,
      '<h3 style="font-family:Georgia,serif;font-size:18px;color:#1A1A1A;margin:24px 0 8px;">$1</h3>'
    )
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" style="color:#1A1A1A;text-decoration:underline;">$1</a>'
    )
    // Horizontal rules
    .replace(
      /^---$/gm,
      '<hr style="border:none;border-top:1px solid #E5E5E5;margin:24px 0;">'
    )
    // Bullet lists
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0;">$1</li>')
    // Paragraphs
    .replace(
      /\n\n/g,
      '</p><p style="font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.6;color:#333;margin:0 0 16px;">'
    )

  // Wrap consecutive list items in <ul>
  html = html.replace(
    /(<li[^>]*>.*<\/li>\n?)+/g,
    (match) => `<ul style="padding-left:20px;margin:12px 0;">${match}</ul>`
  )

  return html
}

function wrapEmail(body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;">
<div style="max-width:600px;margin:0 auto;padding:24px 20px;font-family:Inter,Arial,sans-serif;">
<p style="font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.6;color:#333;margin:0 0 16px;">
${body}
</p>
</div>
</body>
</html>`
}
