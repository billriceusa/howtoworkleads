/**
 * Fix "Content Coming Soon" placeholder on the aged-leads categoryPage.
 *
 * The placeholder text was NOT stored in Sanity -- it was a hardcoded empty state
 * in the frontend component (apps/web/app/[category]/page.tsx) that displayed when
 * a category page had no resources or articles, even if it had rich content blocks.
 *
 * This script verifies the Sanity document is clean (no placeholder text in content)
 * and confirms the aged-leads page has content blocks that should suppress the
 * empty state.
 *
 * The actual fix was in the frontend: the empty state conditional now also checks
 * for content blocks, so pages with pillar content no longer show the placeholder.
 *
 * Usage:
 *   node scripts/fix-content-coming-soon.mjs
 */

import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../apps/web/.env.local') })

const TOKEN = process.env.SANITY_API_TOKEN
if (!TOKEN) {
  console.error('SANITY_API_TOKEN not found in apps/web/.env.local')
  process.exit(1)
}

const PROJECT = 'e9k38j42'
const DATASET = 'production'
const API_QUERY = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}`

function extractAllText(obj) {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  if (Array.isArray(obj)) return obj.map(extractAllText).join(' ')
  if (typeof obj === 'object') {
    if (obj._type === 'span' && typeof obj.text === 'string') return obj.text
    return Object.values(obj).map(extractAllText).join(' ')
  }
  return ''
}

async function main() {
  console.log('\nFix "Content Coming Soon" — aged-leads categoryPage')
  console.log('─'.repeat(55))

  // 1. Fetch the categoryPage with slug "aged-leads"
  const query = encodeURIComponent(
    `*[_type == "categoryPage" && slug.current == "aged-leads"][0]{
      _id, title, slug,
      "contentBlockCount": count(content),
      "resourceCount": count(*[_type == "landingPage" && references(^._id)]),
      "articleCount": count(*[_type == "blogPost" && references(^._id)]),
      content
    }`
  )
  const res = await fetch(`${API_QUERY}?query=${query}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  const { result: doc } = await res.json()

  if (!doc) {
    console.log('ERROR: categoryPage with slug "aged-leads" not found.')
    process.exit(1)
  }

  console.log(`\nDocument: "${doc.title}" (_id: ${doc._id})`)
  console.log(`  Content blocks: ${doc.contentBlockCount}`)
  console.log(`  Resources (landing pages): ${doc.resourceCount}`)
  console.log(`  Articles (blog posts): ${doc.articleCount}`)

  // 2. Check for placeholder text in Sanity content
  const allText = extractAllText(doc.content).toLowerCase()
  const hasComingSoon = allText.includes('content coming soon')
  const hasWorkingOn = allText.includes("working on comprehensive")

  console.log(`\nSanity content check:`)
  console.log(`  Contains "Content Coming Soon": ${hasComingSoon ? 'YES' : 'No'}`)
  console.log(`  Contains "working on comprehensive": ${hasWorkingOn ? 'YES' : 'No'}`)

  if (hasComingSoon || hasWorkingOn) {
    console.log('\n  WARNING: Placeholder text found in Sanity content!')
    console.log('  This needs manual removal.')
  } else {
    console.log('\n  Sanity content is clean -- no placeholder text found.')
  }

  // 3. Explain the frontend issue
  console.log('\n' + '─'.repeat(55))
  console.log('DIAGNOSIS:')
  console.log('  The "Content Coming Soon" message was a hardcoded empty state')
  console.log('  in apps/web/app/[category]/page.tsx (line ~289).')
  console.log('  It displayed when resources=0 AND articles=0, even though')
  console.log(`  the aged-leads page has ${doc.contentBlockCount} rich content blocks.`)
  console.log('')
  console.log('FIX APPLIED:')
  console.log('  Updated the empty state conditional to also check for content blocks.')
  console.log('  The placeholder now only shows when content=0 AND resources=0 AND articles=0.')
  console.log('')
  console.log('Done.')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
