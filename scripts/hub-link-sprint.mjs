/**
 * Hub-and-Spoke Internal Linking — April 2026
 *
 * Adds contextual links from spoke pages to 3 identified hubs:
 *   - /blog/aged-lead-pricing-guide       (pos 4.5, pricing source-of-truth)
 *   - /buying-leads/buy-iul-leads         (#1 click generator, 19 clicks/28d)
 *   - /buying-leads/buy-life-insurance-leads  (3,674 impr, needs link juice to rise)
 *
 * Run:
 *   node scripts/hub-link-sprint.mjs              # dry run
 *   node scripts/hub-link-sprint.mjs --apply      # apply
 */
import { randomBytes } from 'crypto'

const TOKEN = process.env.SANITY_API_TOKEN
const PROJECT = 'e9k38j42'
const DATASET = 'production'
const API_QUERY = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}`
const API_MUTATE = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`

if (!TOKEN) {
  console.error('SANITY_API_TOKEN env var required')
  process.exit(1)
}

const key = () => randomBytes(6).toString('hex')
const span = (text, marks = []) => ({ _type: 'span', _key: key(), text, marks })
const linkSpan = (text, href, markDefs) => {
  const k = key()
  markDefs.push({ _type: 'link', _key: k, href })
  return span(text, [k])
}
const paragraph = (spans, markDefs) => ({
  _type: 'block', _key: key(), style: 'normal', markDefs, children: spans,
})

const HUB_PRICING = '/blog/aged-lead-pricing-guide'
const HUB_IUL = '/buying-leads/buy-iul-leads'
const HUB_LIFE = '/buying-leads/buy-life-insurance-leads'

// Spoke pages: all /buying-leads/* landing pages (except the hubs themselves)
const BUYING_LEADS_SPOKES = [
  'buy-aged-leads', 'buy-annuity-leads', 'buy-auto-insurance-leads',
  'buy-bank-statement-loan-leads', 'buy-dscr-loan-leads', 'buy-final-expense-leads',
  'buy-heloc-leads', 'buy-home-improvement-leads', 'buy-medicare-leads',
  'buy-mortgage-leads', 'buy-mortgage-protection-leads', 'buy-mortgage-refinance-leads',
  'buy-non-qm-mortgage-leads', 'buy-pc-insurance-leads', 'buy-purchase-mortgage-leads',
  'buy-real-estate-leads', 'buy-refinance-mortgage-leads', 'buy-solar-leads',
  'health-insurance-leads',
]

// Insurance-themed pages that should also link to IUL + life hubs
const INSURANCE_SPOKES_LIFE_IUL = [
  'buy-annuity-leads', 'buy-final-expense-leads', 'buy-medicare-leads',
  'buy-mortgage-protection-leads',
]

// Insurance how-to blog posts — link to both IUL and life hubs
const INSURANCE_HOWTO_POSTS = [
  'how-to-work-aca-leads', 'how-to-work-aged-insurance-leads',
  'how-to-work-annuity-leads', 'how-to-work-auto-insurance-leads',
  'how-to-work-final-expense-leads', 'how-to-work-health-insurance-leads',
  'how-to-work-life-insurance-leads', 'how-to-work-medicare-leads',
  'how-to-work-pc-insurance-leads',
]

async function fetchDoc(slug) {
  const query = encodeURIComponent(
    `*[_type in ["landingPage","blogPost"] && slug.current == "${slug}"][0]{_id,_type,slug,title,content}`
  )
  const res = await fetch(`${API_QUERY}?query=${query}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  const data = await res.json()
  return data.result
}

function findLinks(content) {
  const set = new Set()
  function walk(x) {
    if (!x) return
    if (Array.isArray(x)) return x.forEach(walk)
    if (typeof x !== 'object') return
    if (x._type === 'link' && x.href) set.add(x.href)
    if (x.content) walk(x.content)
    if (x.children) walk(x.children)
    if (x.markDefs) walk(x.markDefs)
    Object.values(x).forEach(v => { if (Array.isArray(v)) walk(v) })
  }
  walk(content)
  return set
}

function buildLinkBlock(href, anchorText, intro, tail) {
  const markDefs = []
  const spans = [span(intro), linkSpan(anchorText, href, markDefs), span(tail)]
  return paragraph(spans, markDefs)
}

function buildBlocksForSpoke(slug, existingLinks, isInsurance, isBlog) {
  const blocks = []
  // Pricing guide — applies to all
  if (!existingLinks.has(HUB_PRICING)) {
    blocks.push(buildLinkBlock(
      HUB_PRICING,
      'aged lead pricing guide',
      'For up-to-date cost ranges by vertical and age tier, see our ',
      ' — the definitive 2026 pricing reference.'
    ))
  }
  // IUL hub — insurance spoke pages and insurance blog posts
  if (isInsurance && slug !== 'buy-iul-leads' && slug !== 'how-to-work-iul-leads' && !existingLinks.has(HUB_IUL)) {
    blocks.push(buildLinkBlock(
      HUB_IUL,
      'buy IUL leads',
      'Selling permanent life insurance? ',
      ' to diversify into Indexed Universal Life prospects — one of the highest-ROI aged lead verticals.'
    ))
  }
  // Life hub — insurance spoke pages and insurance blog posts
  if (isInsurance && slug !== 'buy-life-insurance-leads' && slug !== 'how-to-work-life-insurance-leads' && !existingLinks.has(HUB_LIFE)) {
    blocks.push(buildLinkBlock(
      HUB_LIFE,
      'life insurance leads',
      'Expanding your insurance lead mix? Browse our ',
      ' page for aged life prospects filtered by state, age, and coverage type.'
    ))
  }
  return blocks
}

function wrapForLanding(blocks) {
  if (!blocks.length) return []
  return [{ _type: 'contentBlock', _key: key(), content: blocks }]
}

async function patchDoc(docId, newBlocks, dryRun) {
  if (dryRun) return true
  const res = await fetch(API_MUTATE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mutations: [{
        patch: { id: docId, insert: { after: 'content[-1]', items: newBlocks } }
      }],
    }),
  })
  const result = await res.json()
  if (result.error) { console.error(`  ERROR: ${JSON.stringify(result.error)}`); return false }
  return true
}

async function processSlug(slug, isInsurance, dryRun) {
  const doc = await fetchDoc(slug)
  if (!doc) { console.log(`  SKIP ${slug}: not found`); return { skipped: 1 } }
  const existing = findLinks(doc.content)
  const isBlog = doc._type === 'blogPost'
  const blocks = buildBlocksForSpoke(slug, existing, isInsurance, isBlog)
  if (!blocks.length) { console.log(`  OK ${slug}: all hubs already linked`); return { ok: 1 } }
  const toInsert = isBlog ? blocks : wrapForLanding(blocks)
  if (dryRun) {
    console.log(`  DRY ${slug}: would add ${blocks.length} hub link(s)`)
    blocks.forEach(b => {
      const hrefs = (b.markDefs || []).filter(m => m._type === 'link').map(m => m.href)
      console.log(`    → ${hrefs.join(', ')}`)
    })
    return { dry: 1 }
  }
  const ok = await patchDoc(doc._id, toInsert, false)
  if (ok) console.log(`  PATCHED ${slug}: +${blocks.length} hub link(s)`)
  return { patched: ok ? 1 : 0 }
}

async function main() {
  const apply = process.argv.includes('--apply')
  const dryRun = !apply
  console.log(`Hub-and-Spoke Linking Sprint — ${dryRun ? 'DRY RUN' : 'APPLYING'}`)
  console.log('─'.repeat(60))

  const INSURANCE_LANDING_SET = new Set([
    'buy-annuity-leads', 'buy-auto-insurance-leads', 'buy-final-expense-leads',
    'buy-iul-leads', 'buy-life-insurance-leads', 'buy-medicare-leads',
    'buy-mortgage-protection-leads', 'buy-pc-insurance-leads', 'health-insurance-leads',
  ])

  let totals = { ok: 0, patched: 0, dry: 0, skipped: 0 }
  for (const slug of BUYING_LEADS_SPOKES) {
    const r = await processSlug(slug, INSURANCE_LANDING_SET.has(slug), dryRun)
    for (const k of Object.keys(r)) totals[k] = (totals[k] || 0) + r[k]
  }
  for (const slug of INSURANCE_HOWTO_POSTS) {
    const r = await processSlug(slug, true, dryRun)
    for (const k of Object.keys(r)) totals[k] = (totals[k] || 0) + r[k]
  }
  console.log('─'.repeat(60))
  console.log(`Done. ${JSON.stringify(totals)}`)
  if (dryRun) console.log('Run with --apply to patch Sanity.')
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
