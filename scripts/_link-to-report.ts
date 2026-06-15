#!/usr/bin/env npx tsx
// Add the Real-Time Lead Team report to the relatedPages of topically-relevant landingPages
// (inbound internal links). Edits PUBLISHED docs directly. Run from MAIN checkout.
//   npx tsx scripts/_link-to-report.ts [--dry-run]
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import { randomBytes } from 'crypto'

dotenv.config({ path: path.resolve(__dirname, '../apps/web/.env.local') })
const DRY = process.argv.includes('--dry-run')
const REPORT_ID = 'cCHfv7ic37Jhh8Triwf4ci'
const MAX_RELATED = 6

// Candidate linking pages (script acts only on those that exist; skips missing).
const CANDIDATES = [
  // sales-process siblings (same cluster as the report)
  'the-modern-b2c-sales-funnel',
  'what-is-a-sales-process',
  'b2c-vs-b2b-sales-process',
  'the-customer-journey',
  // pipeline / lifecycle
  'the-lead-lifecycle',
  // vertical match
  'buy-solar-leads',
]

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e9k38j42',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
const key = () => randomBytes(6).toString('hex')

async function main() {
  console.log(`\nLink relevant pages -> report ${DRY ? '(DRY)' : '(LIVE)'}\n${'─'.repeat(48)}`)
  const pages = await client.fetch<any[]>(
    `*[_type=="landingPage" && slug.current in $slugs]{_id, "slug": slug.current, title, relatedPages}`,
    { slugs: CANDIDATES }
  )
  const foundSlugs = pages.map(p => p.slug)
  const missing = CANDIDATES.filter(s => !foundSlugs.includes(s))
  if (missing.length) console.log(`  (not found, skipped): ${missing.join(', ')}`)

  let changed = 0
  for (const p of pages) {
    const rp: any[] = p.relatedPages || []
    const already = rp.some(r => r?._ref === REPORT_ID)
    if (already) { console.log(`  = ${p.slug} — already links to report`); continue }
    if (rp.length >= MAX_RELATED) { console.log(`  ! ${p.slug} — relatedPages full (${rp.length}/${MAX_RELATED}), skipped`); continue }
    const next = [...rp, { _type: 'reference', _key: key(), _ref: REPORT_ID }]
    if (DRY) { console.log(`  + ${p.slug} — would add report (${rp.length} -> ${next.length})`); changed++; continue }
    await client.patch(p._id).setIfMissing({ relatedPages: [] }).set({ relatedPages: next }).commit()
    console.log(`  + ${p.slug} — added (${rp.length} -> ${next.length})`)
    changed++
  }
  console.log(`${'─'.repeat(48)}\n${DRY ? 'Would update' : 'Updated'} ${changed} page(s).`)
}
main().catch(e => { console.error('FATAL', e); process.exit(1) })
