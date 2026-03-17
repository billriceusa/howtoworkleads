/**
 * Add "Know Before You Go" compliance callout to all how-to-work-* blog posts.
 *
 * Inserts an h4 heading, 4 bullet points (with a link in the last one),
 * and a transition paragraph before the second h2 in each post's content.
 *
 * Usage:
 *   node scripts/add-compliance-callouts.mjs
 */
import { randomBytes } from 'crypto'
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
const API_MUTATE = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`

function key() {
  return randomBytes(6).toString('hex')
}

function span(text, marks = []) {
  return { _type: 'span', _key: key(), text, marks }
}

function textBlock(style, spans, markDefs = [], extra = {}) {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs,
    children: spans,
    ...extra,
  }
}

// ── Build the callout blocks ─────────────────────────────────────────────────

function buildCalloutBlocks() {
  const blocks = []

  // 1. h4 heading
  blocks.push(textBlock('h4', [span('Know Before You Go')]))

  // 2. Bullet 1
  blocks.push(
    textBlock('normal', [
      span('Verify that your lead vendor can document consent for the leads you\u2019re purchasing.'),
    ], [], { listItem: 'bullet', level: 1 })
  )

  // 3. Bullet 2
  blocks.push(
    textBlock('normal', [
      span('Scrub all leads against the National DNC Registry and applicable state DNC lists before making contact.'),
    ], [], { listItem: 'bullet', level: 1 })
  )

  // 4. Bullet 3
  blocks.push(
    textBlock('normal', [
      span('If using AI voice or AI text tools, make sure your 10DLC registration and AI disclosures are in place.'),
    ], [], { listItem: 'bullet', level: 1 })
  )

  // 5. Bullet 4 (with link)
  const linkKey = key()
  const markDefs = [
    { _type: 'link', _key: linkKey, href: '/blog/lead-buyer-regulatory-cheat-sheet' },
  ]
  blocks.push(
    textBlock('normal', [
      span('Check our '),
      span('Lead Buyer\u2019s Regulatory Cheat Sheet', [linkKey]),
      span(' for a plain-English summary of current rules, and consult your compliance team for guidance specific to your operation.'),
    ], markDefs, { listItem: 'bullet', level: 1 })
  )

  // 6. Transition paragraph
  blocks.push(textBlock('normal', [span('Now let\u2019s get into the strategy.')]))

  return blocks
}

// ── Sanity helpers ───────────────────────────────────────────────────────────

async function fetchHowToPosts() {
  const query = encodeURIComponent(
    `*[_type == "blogPost" && slug.current match "how-to-work-*"]{ _id, title, slug, content }`
  )
  const res = await fetch(`${API_QUERY}?query=${query}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  const data = await res.json()
  return data.result || []
}

function hasCalloutAlready(content) {
  if (!content || !Array.isArray(content)) return false
  for (const block of content) {
    if (block._type === 'block' && block.children) {
      for (const child of block.children) {
        if (child.text && child.text.includes('Know Before You Go')) {
          return true
        }
      }
    }
  }
  return false
}

/**
 * Find the insertion index: before the SECOND h2.
 * If only one h2, insert after the first few paragraphs (index 3 or after first h2 + 2 blocks).
 */
function findInsertionIndex(content) {
  const h2Indices = []
  for (let i = 0; i < content.length; i++) {
    if (content[i]._type === 'block' && content[i].style === 'h2') {
      h2Indices.push(i)
    }
  }

  if (h2Indices.length >= 2) {
    // Insert before the second h2
    return h2Indices[1]
  }

  if (h2Indices.length === 1) {
    // Insert after the first h2 + a couple of paragraphs
    const afterFirst = h2Indices[0] + 3
    return Math.min(afterFirst, content.length)
  }

  // No h2s at all — insert after the first few blocks
  return Math.min(3, content.length)
}

async function patchContent(docId, content, insertIndex, calloutBlocks) {
  // Build the new content array with the callout inserted
  const newContent = [
    ...content.slice(0, insertIndex),
    ...calloutBlocks,
    ...content.slice(insertIndex),
  ]

  const res = await fetch(API_MUTATE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mutations: [{
        patch: {
          id: docId,
          set: { content: newContent },
        },
      }],
    }),
  })

  const result = await res.json()
  if (result.error) {
    throw new Error(JSON.stringify(result.error))
  }
  return true
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\nAdd "Know Before You Go" Compliance Callouts')
  console.log('\u2500'.repeat(50))

  const posts = await fetchHowToPosts()
  console.log(`Found ${posts.length} how-to-work-* blog posts\n`)

  let updated = 0
  let skipped = 0
  let errors = 0

  for (const post of posts) {
    const slug = post.slug?.current || 'unknown'
    const content = post.content || []

    // Check if already has callout
    if (hasCalloutAlready(content)) {
      console.log(`  SKIP  ${slug} — already has "Know Before You Go"`)
      skipped++
      continue
    }

    try {
      const insertIndex = findInsertionIndex(content)
      const calloutBlocks = buildCalloutBlocks()

      await patchContent(post._id, content, insertIndex, calloutBlocks)
      console.log(`  UPDATED  ${slug} — inserted at position ${insertIndex} (${content.length} blocks total)`)
      updated++
    } catch (err) {
      console.error(`  ERROR  ${slug}: ${err.message}`)
      errors++
    }
  }

  console.log('\n' + '\u2500'.repeat(50))
  console.log(`Done. Updated: ${updated}, Skipped: ${skipped}, Errors: ${errors}`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
