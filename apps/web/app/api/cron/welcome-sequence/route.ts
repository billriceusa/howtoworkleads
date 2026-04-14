import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  WELCOME_SCHEDULE,
  getWelcomeEmail,
  FROM,
  REPLY_TO,
} from '@/lib/email/welcome-sequence'
import { recordCronRun } from '@/lib/cron/heartbeat'

const AUDIENCE_ID = '8a35228e-149f-4b15-8e24-26a24e3d6e98'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

/**
 * Calculate the number of full days between two dates (UTC).
 */
function daysSince(dateStr: string): number {
  const created = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - created.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

/**
 * Daily cron — sends welcome sequence Emails 2-5 based on
 * days since each contact's created_at in the Resend audience.
 *
 * Email 1 (Day 0) is sent immediately by the signup/download routes.
 * This cron handles Day 2, 4, 7, and 10.
 */
export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const startTime = Date.now()
  const ALERT_EMAIL = 'bill@billricestrategy.com'
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || 'HowToWorkLeads <noreply@howtoworkleads.com>'

  let resend: Resend
  try {
    resend = getResendClient()
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    await recordCronRun({
      name: 'welcome-sequence',
      status: 'failed',
      detail: msg,
      durationMs: Date.now() - startTime,
    })
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  async function alertOnFailure(subject: string, detail: string) {
    try {
      await resend.emails.send({
        from: fromEmail,
        to: ALERT_EMAIL,
        subject: `[WELCOME CRON ALERT] ${subject}`,
        html: `<h2 style="color:#dc2626;">Welcome sequence cron failure</h2><pre style="white-space:pre-wrap;font-family:monospace;background:#f9fafb;padding:12px;border-radius:6px;">${detail.replace(/</g, '&lt;')}</pre>`,
      })
    } catch (err) {
      console.error('[Welcome Cron] Failed to send alert email:', err)
    }
  }

  // Days we need to check (skip Day 0 — handled at signup)
  const cronDays: number[] = WELCOME_SCHEDULE.filter((s) => s.day > 0).map(
    (s) => s.day
  )

  let totalSent = 0
  let totalErrors = 0
  const log: string[] = []

  // Paginate through all contacts in the audience
  let hasMore = true
  let cursor: string | undefined

  while (hasMore) {
    const listOptions: { audienceId: string; limit: number; cursor?: string } =
      {
        audienceId: AUDIENCE_ID,
        limit: 100,
      }
    if (cursor) {
      ;(listOptions as Record<string, unknown>).cursor = cursor
    }

    const { data: result, error } = await resend.contacts.list(listOptions)

    if (error || !result) {
      console.error('Failed to list contacts:', error)
      log.push(`Error listing contacts: ${error?.message ?? 'unknown'}`)
      break
    }

    const contacts = result.data

    for (const contact of contacts) {
      // Skip unsubscribed contacts
      if (contact.unsubscribed) continue

      const days = daysSince(contact.created_at)

      // Check if today is a welcome email day for this contact
      if (!cronDays.includes(days)) continue

      const email = getWelcomeEmail(
        WELCOME_SCHEDULE.find((s) => s.day === days)!.emailIndex
      )

      try {
        await resend.emails.send({
          from: FROM,
          replyTo: REPLY_TO,
          to: [contact.email],
          subject: email.subject,
          html: email.html,
        })
        totalSent++
        log.push(`Sent Day ${days} email to ${contact.email}`)
      } catch (err) {
        totalErrors++
        const msg = err instanceof Error ? err.message : 'unknown'
        log.push(`Error sending Day ${days} to ${contact.email}: ${msg}`)
        console.error(`Welcome sequence error:`, err)
      }
    }

    hasMore = result.has_more
    if (hasMore && contacts.length > 0) {
      // Use the last contact ID as cursor for next page
      cursor = contacts[contacts.length - 1].id
    }
  }

  console.log(
    `Welcome sequence cron complete: ${totalSent} sent, ${totalErrors} errors`
  )

  if (totalErrors > 0) {
    await alertOnFailure(
      `${totalErrors} send failure${totalErrors > 1 ? 's' : ''}`,
      `Sent: ${totalSent}\n\nLog:\n${log.join('\n')}`
    )
  }

  await recordCronRun({
    name: 'welcome-sequence',
    status: totalErrors > 0 ? 'partial' : 'ok',
    detail: `sent=${totalSent} errors=${totalErrors}`,
    durationMs: Date.now() - startTime,
  })

  return NextResponse.json({
    success: totalErrors === 0,
    sent: totalSent,
    errors: totalErrors,
    log,
  })
}
