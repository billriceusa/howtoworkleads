#!/usr/bin/env npx tsx
/**
 * One-shot builder for the flagship "How to Build a Real-Time Internet Lead Team" landingPage.
 * Uploads chart PNGs, assembles content (contentBlocks + embedded charts + comparisonTables +
 * faqSection + ALS ctaSection), sets author/ogImage/seo/category/relatedPages, creates LIVE.
 *
 * Run from the MAIN checkout (which has node_modules):
 *   npx tsx scripts/_build-realtime-report.ts [--dry-run]
 * Reads CONTENT + chart PNGs from the worktree by absolute path.
 */
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { randomBytes } from 'crypto'

dotenv.config({ path: path.resolve(__dirname, '../apps/web/.env.local') })

const DRY = process.argv.includes('--dry-run')

const WT = '/Users/billrice/Code/sites/brsg/owned/howtoworkleads.com/.claude/worktrees/content-session'
const CONTENT_PATH = `${WT}/content-briefs/97-real-time-lead-team-CONTENT.md`
const CHART_DIR = `${WT}/scripts/charts/out`

const CATEGORY_ID = '9ec08571-9c36-44fe-8f09-9eebe75f3438' // sales-process
const AUTHOR_ID = '8e322218-8ea3-4654-bae3-1cf0186a4564'   // Bill Rice
const OG_CHART = 'capacity-curve'

const SECONDARY_KEYWORDS = [
  'real-time leads', 'internet lead team', 'speed to lead', 'working internet leads',
  'lead pipeline management', 'text first lead follow up', 'lead nurturing', 'TCPA consent leads',
]

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e9k38j42',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const key = () => randomBytes(6).toString('hex')
const span = (text: string, marks: string[] = []) => ({ _type: 'span', _key: key(), text, marks })
const block = (style: string, children: any[], markDefs: any[] = [], extra: Record<string, unknown> = {}) =>
  ({ _type: 'block', _key: key(), style, markDefs, children, ...extra })

// --- inline markdown (bold/italic/links) ---
function parseInline(text: string) {
  const spans: any[] = []; const markDefs: any[] = []
  const regex = /(\[(\*\*)?(.+?)\2?\]\(([^)]+)\)|\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*)/g
  let last = 0; let m: RegExpExecArray | null
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) spans.push(span(text.slice(last, m.index)))
    if (m[3] && m[4]) {
      const lk = key(); const href = m[4]
      const isExt = href.startsWith('http://') || href.startsWith('https://')
      markDefs.push({ _type: 'link', _key: lk, href, ...(isExt ? { openInNewTab: true } : {}) })
      const marks = [lk]; if (m[2]) marks.unshift('strong')
      spans.push(span(m[3], marks))
    } else if (m[5]) spans.push(span(m[5], ['strong', 'em']))
    else if (m[6]) spans.push(span(m[6], ['strong']))
    else if (m[7]) spans.push(span(m[7], ['em']))
    last = m.index + m[0].length
  }
  if (last < text.length) spans.push(span(text.slice(last)))
  if (spans.length === 0) spans.push(span(text))
  return { spans, markDefs }
}

function parseTable(lines: string[], start: number) {
  let i = start; const tl: string[] = []
  while (i < lines.length && lines[i].trim().startsWith('|')) { tl.push(lines[i].trim()); i++ }
  const cols = tl[0].split('|').map(c => c.trim()).filter(Boolean).map(c => c.replace(/\*\*/g, ''))
  const rows: any[] = []
  for (let r = 2; r < tl.length; r++) {
    const cells = tl[r].split('|').map(c => c.trim()).filter(Boolean).map(c => c.replace(/\*\*/g, ''))
    rows.push({ _type: 'row', _key: key(), cells, isHighlighted: false })
  }
  let title = ''
  for (let j = start - 1; j >= Math.max(0, start - 5); j--) {
    const h = lines[j]?.match(/^#{2,4}\s+(.+)/)
    if (h) { title = h[1].replace(/\*\*/g, ''); break }
    if (lines[j]?.trim() && !lines[j]?.trim().startsWith('|')) break
  }
  return { table: { _type: 'comparisonTable', _key: key(), title, columns: cols, rows }, consumed: i - start }
}

function cleanMarkdown(md: string) {
  return md
    .replace(/^# .+\n+/, '')
    .replace(/^> \*\*Sanity CMS Fields\*\*\n(?:> .*\n?)*/m, '')
    .replace(/^##\s*\[ARTICLE CONTENT BEGINS\]\s*$/m, '')
    .replace(/---\n+## Internal Linking Checklist[\s\S]*$/, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function toBlocks(md: string) {
  const lines = md.split('\n'); const blocks: any[] = []; let i = 0
  let bq: string[] = []; let inBq = false
  const flush = () => { if (bq.length) { const t = bq.join(' ').trim(); const { spans, markDefs } = parseInline(t); blocks.push(block('blockquote', spans, markDefs)); bq = [] } inBq = false }
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === '') { if (inBq) flush(); i++; continue }
    if (line.trim() === '---') { if (inBq) flush(); i++; continue }
    if (line.trim().startsWith('|')) { if (inBq) flush(); const { table, consumed } = parseTable(lines, i); blocks.push(table); i += consumed; continue }
    const h4 = line.match(/^#### (.+)/); const h3 = !h4 ? line.match(/^### (.+)/) : null; const h2 = !h4 && !h3 ? line.match(/^## (.+)/) : null
    if (h4) { if (inBq) flush(); const { spans, markDefs } = parseInline(h4[1]); blocks.push(block('h4', spans, markDefs)); i++; continue }
    if (h3) { if (inBq) flush(); const { spans, markDefs } = parseInline(h3[1]); blocks.push(block('h3', spans, markDefs)); i++; continue }
    if (h2) { if (inBq) flush(); const { spans, markDefs } = parseInline(h2[1]); blocks.push(block('h2', spans, markDefs)); i++; continue }
    if (line.startsWith('> ') || line === '>') { const q = line.replace(/^>\s?/, ''); if (!inBq) { inBq = true; bq = [] } bq.push(q); i++; continue }
    else if (inBq) { flush(); continue }
    const b = line.match(/^(\s*)[-*]\s+(.+)/)
    if (b) { const lvl = b[1].length >= 4 ? 2 : 1; const { spans, markDefs } = parseInline(b[2]); blocks.push(block('normal', spans, markDefs, { listItem: 'bullet', level: lvl })); i++; continue }
    const nm = line.match(/^(\s*)\d+\.\s+(.+)/)
    if (nm) { const lvl = nm[1].length >= 4 ? 2 : 1; const { spans, markDefs } = parseInline(nm[2]); blocks.push(block('normal', spans, markDefs, { listItem: 'number', level: lvl })); i++; continue }
    const { spans, markDefs } = parseInline(line.trim()); blocks.push(block('normal', spans, markDefs)); i++
  }
  if (inBq) flush()
  return blocks
}

// --- frontmatter ---
function parseFrontmatter(md: string) {
  const bm = md.match(/^> \*\*Sanity CMS Fields\*\*\n((?:> .*\n?)*)/m)
  const meta: any = {}
  if (bm) {
    const b = bm[0]
    meta.slug = b.match(/\*\*Slug:\*\*\s*`([^`]+)`/)?.[1]
    meta.seoTitle = b.match(/\*\*SEO Title:\*\*\s*`([^`]+)`/)?.[1]
    meta.seoDescription = b.match(/\*\*Meta Description:\*\*\s*`([^`]+)`/)?.[1]
    meta.publishedAt = b.match(/\*\*Published Date:\*\*\s*(\d{4}-\d{2}-\d{2})/)?.[1]
  }
  meta.title = md.match(/^# (.+)/m)?.[1]?.trim()
  return meta
}

// --- FAQ ---
const FAQS = [
  { q: 'How fast should you respond to a real-time internet lead?', a: 'Within about a minute — but with an automated, branded text and a self-scheduling link, not necessarily a phone call. Roughly 86% of calls from unknown numbers now go unanswered (Hiya, 2026), while about 74% of consumers read a text within five minutes. Speed still wins; it just means speed to a response in the channel the consumer will actually answer.' },
  { q: 'Should you call or text a new internet lead first?', a: 'Lead with a text to open a permissioned channel, then move to a call once the consumer engages. About 80% of people will not answer an unknown number, so a cold call as the opener mostly reaches voicemail. For high-stakes mortgage and insurance decisions the rule is text-to-engage, voice-to-close: earn the conversation by text, then hold the consultative conversation by phone.' },
  { q: 'How many leads can one salesperson effectively handle?', a: 'Fewer than most managers think. Around 20 active leads a month per rep is usually plenty, and roughly 100 open leads is a sensible hard cap. Past that point, per-lead conversion degrades because the rep cannot service the queue — a peer-reviewed study found over-prospecting steals the time that actually closes deals. Treat open-lead count as a capacity number, not a vanity number.' },
  { q: 'Is it legal to text leads you buy?', a: 'Only if the lead’s form captured clear written consent that names your business and discloses automated or text contact — and that consent has to transfer to you, the buyer. Financial services and insurance are the two most-litigated TCPA categories, and the FCC treats AI voice as a regulated robocall. "We bought the lead" is not a defense. Build consent into the intake and have a TCPA attorney review your setup.' },
  { q: 'What should you do with aging leads that don’t convert?', a: 'Don’t delete them. Pull low-probability and aging leads out of reps’ active queues into automated nurture (keep them assigned for routing back), so rep energy goes to the leads most likely to close this week. Most "not now" leads remain recoverable, and low-cost aged-lead recycling can capture value from leads that were uneconomic to keep dialing at full freight.' },
  { q: 'Are AI agents replacing salespeople on internet leads?', a: 'Not the conversation. AI is taking over speed, qualification, and nurture across email and text, where it is reliable and low-risk. Humans are becoming more valuable for the consultative, trust-building close, because buyers increasingly arrive already informed (often via AI) and want a person to validate the decision. Build AI on acquisition and nurture; keep humans on trust.' },
]

const faqSection = { _type: 'faqSection', _key: key(), title: 'Frequently Asked Questions', faqs: FAQS.map(f => ({ _type: 'faq', _key: key(), question: f.q, answer: f.a })) }

const alsCta = {
  _type: 'ctaSection', _key: key(), variant: 'primary',
  headline: 'The leads your team ages out are still worth money',
  description: 'When you cap the active queue and route aging leads to nurture, the tail still converts — at a different cost structure. Aged leads let you recycle that pipeline through patient, low-cost, compliant follow-up instead of deleting it.',
}

async function uploadCharts(): Promise<Record<string, string>> {
  const ids = ['answer-collapse', 'text-optin', 'advisory-rise', 'tcpa-industry', 'capacity-curve', 'cadence']
  const map: Record<string, string> = {}
  for (const id of ids) {
    const p = `${CHART_DIR}/${id}.png`
    if (!fs.existsSync(p)) throw new Error(`missing chart ${p}`)
    if (DRY) { map[id] = `image-DRY-${id}`; console.log(`  [dry] would upload ${id}.png`); continue }
    const buf = fs.readFileSync(p)
    const asset = await client.assets.upload('image', buf, { filename: `realtime-${id}.png`, contentType: 'image/png' })
    map[id] = asset._id
    console.log(`  uploaded ${id} -> ${asset._id}`)
  }
  return map
}

function imageBlock(assetRef: string, alt: string, caption: string) {
  return { _type: 'image', _key: key(), asset: { _type: 'reference', _ref: assetRef }, alt, caption }
}

async function resolveRelated(): Promise<any[]> {
  const slugs = ['aged-lead-pricing-guide', 'buy-pc-insurance-leads', 'how-to-work-internet-leads', 'what-is-lead-management', 'aged-final-expense-leads']
  const found = await client.fetch<{ _id: string; slug: string }[]>(
    `*[_type=="landingPage" && slug.current in $slugs]{_id, "slug": slug.current}`, { slugs })
  return (found || []).slice(0, 6).map(f => ({ _type: 'reference', _key: key(), _ref: f._id }))
}

async function main() {
  console.log(`\nBuild Real-Time Lead Team report ${DRY ? '(DRY RUN)' : '(LIVE)'}\n${'─'.repeat(46)}`)
  const md = fs.readFileSync(CONTENT_PATH, 'utf-8')
  const meta = parseFrontmatter(md)
  console.log(`  title: ${meta.title}`)
  console.log(`  slug:  ${meta.slug}`)

  // dedupe
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type=="landingPage" && slug.current==$s][0]{_id}`, { s: meta.slug })
  if (existing) { console.log(`  ABORT — landingPage already exists (${existing._id})`); return }

  const charts = await uploadCharts()
  const related = DRY ? [] : await resolveRelated()
  console.log(`  related pages resolved: ${related.length}`)

  // parse body -> blocks, swap chart markers for image blocks
  const cleaned = cleanMarkdown(md)
  let blocks = toBlocks(cleaned)
  // drop empty FAQ heading + trailing methodology FAQ placeholder; we append a real faqSection
  blocks = blocks.filter(b => {
    if (b._type === 'block' && b.style === 'h2') {
      const t = (b.children || []).map((c: any) => c.text).join('')
      if (/^frequently asked questions$/i.test(t.trim())) return false
    }
    return true
  })
  let chartCount = 0
  blocks = blocks.map(b => {
    if (b._type === 'block' && (!b.listItem) && b.children?.length === 1) {
      const m = b.children[0].text.match(/^\[\[CHART:([\w-]+)\|([\s\S]+)\]\]$/)
      if (m) {
        const id = m[1]; const caption = m[2].trim()
        if (!charts[id]) throw new Error(`unknown chart id in content: ${id}`)
        chartCount++
        return imageBlock(charts[id], caption, caption)
      }
    }
    return b
  })
  console.log(`  charts embedded: ${chartCount}`)

  // chunk into landingPage content: contentBlocks split at comparisonTable (images stay inside)
  const content: any[] = []
  let buf: any[] = []
  const flush = () => { if (buf.length) { content.push({ _type: 'contentBlock', _key: key(), content: buf }); buf = [] } }
  for (const b of blocks) {
    if (b._type === 'comparisonTable') { flush(); content.push(b) }
    else buf.push(b)
  }
  flush()
  // append ALS CTA + FAQ
  content.push(alsCta)
  content.push(faqSection)

  const doc: any = {
    _type: 'landingPage',
    title: meta.title,
    slug: { _type: 'slug', current: meta.slug },
    category: { _type: 'reference', _ref: CATEGORY_ID },
    author: { _type: 'reference', _ref: AUTHOR_ID },
    tableOfContents: true,
    content,
    seoTitle: meta.seoTitle,
    seoDescription: meta.seoDescription,
    focusKeyword: 'real-time internet leads',
    secondaryKeywords: SECONDARY_KEYWORDS,
    ogImage: DRY ? undefined : { _type: 'image', asset: { _type: 'reference', _ref: charts[OG_CHART] } },
    relatedPages: related,
    publishedAt: `${meta.publishedAt}T12:30:00Z`,
    updatedAt: new Date().toISOString(),
  }

  console.log(`  content sections: ${content.length} (contentBlocks/tables + CTA + FAQ)`)
  if (DRY) { console.log('  DRY RUN — not creating'); return }
  const res = await client.create(doc)
  console.log(`\n  CREATED landingPage -> ${res._id}`)
  console.log(`  URL: https://howtoworkleads.com/sales-process/${meta.slug}`)
}

main().catch(e => { console.error('FATAL', e); process.exit(1) })
