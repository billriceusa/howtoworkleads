/**
 * Send newsletter issue via Resend API
 *
 * Usage:
 *   node scripts/send-newsletter.mjs newsletters/issue-01.md              # dry run
 *   node scripts/send-newsletter.mjs newsletters/issue-01.md --send       # send to audience
 *   node scripts/send-newsletter.mjs newsletters/issue-01.md --test       # send test to bill@billricestrategy.com
 *
 * Requires: RESEND_API_KEY in apps/web/.env.local
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load env
const envPath = resolve(__dirname, '../apps/web/.env.local')
const envFile = readFileSync(envPath, 'utf-8')
const RESEND_API_KEY = envFile.match(/RESEND_API_KEY=(.+)/)?.[1]?.trim()
if (!RESEND_API_KEY) {
  console.error('RESEND_API_KEY not found in apps/web/.env.local')
  process.exit(1)
}

const AUDIENCE_ID = '8a35228e-149f-4b15-8e24-26a24e3d6e98'
const FROM = 'Bill Rice <bill@howtoworkleads.com>'
const REPLY_TO = 'bill@howtoworkleads.com'
const TEST_EMAIL = 'bill@billricestrategy.com'

/**
 * Parse newsletter markdown into subject + HTML body.
 */
function parseNewsletter(markdown) {
  // Extract subject from frontmatter
  const subjectMatch = markdown.match(/\*\*Subject:\*\*\s*(.+)/)
  const subject = subjectMatch ? subjectMatch[1].trim() : 'The Aged Lead Playbook'

  // Strip frontmatter (everything before first ---)
  const bodyStart = markdown.indexOf('---\n\n')
  const body = bodyStart > -1 ? markdown.slice(bodyStart + 5) : markdown

  // Convert markdown to simple HTML
  const html = markdownToHtml(body)

  return { subject, html }
}

/**
 * Simple markdown → HTML converter for email.
 * Emails need inline-friendly HTML (no complex CSS).
 */
function markdownToHtml(md) {
  // Pre-process: convert markdown tables to HTML tables as a block
  md = md.replace(/(\|.+\|\n)+/g, (tableBlock) => {
    const rows = tableBlock.trim().split('\n')
    let html = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;margin:16px 0;font-family:Inter,Arial,sans-serif;font-size:16px;">'
    let isFirstDataRow = true
    for (const row of rows) {
      const cells = row.split('|').filter(c => c.trim())
      // Skip separator rows (|---|---|---|)
      if (cells.every(c => /^[\s-:]+$/.test(c))) continue
      if (isFirstDataRow) {
        // First row is the header
        const thStyle = 'style="padding:8px 12px;border:1px solid #E5E5E5;text-align:left;background:#F5F5F5;font-weight:bold;"'
        html += '<tr>' + cells.map(c => `<th ${thStyle}>${c.trim().replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</th>`).join('') + '</tr>'
        isFirstDataRow = false
      } else {
        const tdStyle = 'style="padding:8px 12px;border:1px solid #E5E5E5;text-align:left;"'
        html += '<tr>' + cells.map(c => `<td ${tdStyle}>${c.trim().replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</td>`).join('') + '</tr>'
      }
    }
    html += '</table>'
    return html
  })

  let html = md
    // Headers
    .replace(/^## (.+)$/gm, '<h2 style="font-family:Georgia,serif;font-size:22px;color:#1A1A1A;margin:32px 0 12px;">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-family:Georgia,serif;font-size:18px;color:#1A1A1A;margin:24px 0 8px;">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#1A1A1A;text-decoration:underline;">$1</a>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #E5E5E5;margin:24px 0;">')
    // Bullet lists
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0;">$1</li>')
    // Paragraphs (double newline)
    .replace(/\n\n/g, '</p><p style="font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.6;color:#333;margin:0 0 16px;">')

  // Wrap list items
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul style="padding-left:20px;margin:12px 0;">${match}</ul>`)

  // Wrap in email container
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;">
<div style="max-width:600px;margin:0 auto;padding:24px 20px;font-family:Inter,Arial,sans-serif;">
<p style="font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.6;color:#333;margin:0 0 16px;">
${html}
</p>
</div>
</body>
</html>`
}

async function sendEmail(to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      reply_to: REPLY_TO,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    }),
  })
  return res.json()
}

async function sendBroadcast(subject, html) {
  const res = await fetch('https://api.resend.com/broadcasts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      audience_id: AUDIENCE_ID,
      from: FROM,
      reply_to: REPLY_TO,
      subject,
      html,
    }),
  })
  return res.json()
}

// Main
const args = process.argv.slice(2)
const mdFile = args.find(a => !a.startsWith('--'))
const doSend = args.includes('--send')
const doTest = args.includes('--test')

if (!mdFile) {
  console.error('Usage: node scripts/send-newsletter.mjs <newsletter.md> [--test|--send]')
  process.exit(1)
}

const markdown = readFileSync(resolve(mdFile), 'utf-8')
const { subject, html } = parseNewsletter(markdown)

console.log('\nNewsletter Send Script')
console.log('─'.repeat(50))
console.log(`Subject: ${subject}`)
console.log(`From: ${FROM}`)
console.log(`HTML length: ${html.length} chars`)

if (doTest) {
  console.log(`\nSending TEST to ${TEST_EMAIL}...`)
  const result = await sendEmail(TEST_EMAIL, `[TEST] ${subject}`, html)
  console.log('Result:', JSON.stringify(result, null, 2))
} else if (doSend) {
  console.log(`\nSending BROADCAST to audience ${AUDIENCE_ID}...`)
  const result = await sendBroadcast(subject, html)
  console.log('Result:', JSON.stringify(result, null, 2))
} else {
  console.log('\nDRY RUN — no email sent.')
  console.log('Use --test to send a test email, or --send to broadcast to audience.')
  console.log('\nPreview (first 500 chars of HTML body):')
  console.log(html.slice(0, 500) + '...')
}
