/**
 * Add 10DLC registration section to the GoHighLevel aged leads setup guide.
 *
 * Inserts an h2 + supporting paragraphs/bullets BEFORE the FAQ section
 * (or before the last h2 if no FAQ is found).
 *
 * Usage:
 *   node scripts/update-ghl-10dlc.mjs
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

// ── Build the 10DLC section blocks ──────────────────────────────────────────

function build10DLCBlocks() {
  const blocks = []

  // h2
  blocks.push(textBlock('h2', [span('Setting Up 10DLC Registration in GoHighLevel')]))

  // Intro paragraphs
  blocks.push(textBlock('normal', [
    span("If you\u2019re using GoHighLevel\u2019s SMS capabilities to follow up with aged leads \u2014 and you should be \u2014 you need to complete 10DLC registration first. As of February 2025, all major U.S. carriers block 100% of unregistered business text messages. This isn\u2019t throttling \u2014 it\u2019s a hard block."),
  ]))

  blocks.push(textBlock('normal', [
    span("GoHighLevel has 10DLC registration built into the platform, which is one of its biggest advantages over DIY setups. Here\u2019s how to get it done:"),
  ]))

  // Step 1
  blocks.push(textBlock('h3', [span('Step 1: Register Your Brand')]))

  blocks.push(textBlock('normal', [
    span('Go to Settings \u2192 Phone Numbers \u2192 Trust Center in your GoHighLevel sub-account.'),
  ], [], { listItem: 'bullet', level: 1 }))

  blocks.push(textBlock('normal', [
    span('Complete your brand registration with your legal business name, EIN, and business address.'),
  ], [], { listItem: 'bullet', level: 1 }))

  blocks.push(textBlock('normal', [
    span('This registers your business identity with The Campaign Registry (TCR).'),
  ], [], { listItem: 'bullet', level: 1 }))

  // Step 2
  blocks.push(textBlock('h3', [span('Step 2: Register Your Campaign')]))

  blocks.push(textBlock('normal', [
    span("Create a campaign for each messaging use case (e.g., \u2018Aged Lead Follow-Up\u2019)."),
  ], [], { listItem: 'bullet', level: 1 }))

  blocks.push(textBlock('normal', [
    span('Provide sample messages that match what you\u2019ll actually send \u2014 carriers compare real messages against your samples.'),
  ], [], { listItem: 'bullet', level: 1 }))

  blocks.push(textBlock('normal', [
    span("Select the correct use case category (usually \u2018Marketing\u2019 or \u2018Mixed\u2019 for sales follow-up)."),
  ], [], { listItem: 'bullet', level: 1 }))

  // Step 3
  blocks.push(textBlock('h3', [span('Step 3: Wait for Approval')]))

  blocks.push(textBlock('normal', [
    span("Brand registration typically takes 1\u20133 business days. Campaign registration can take 1\u20132 weeks. Plan ahead \u2014 you can\u2019t send SMS until both are approved."),
  ]))

  // Closing paragraph
  blocks.push(textBlock('normal', [
    span('Once approved, your messages will have higher deliverability and throughput than unregistered numbers. This is a one-time setup that pays off on every lead you text.'),
  ]))

  return blocks
}

// ── Sanity helpers ──────────────────────────────────────────────────────────

async function fetchPost(slug) {
  const query = encodeURIComponent(
    `*[_type == "blogPost" && slug.current == "${slug}"][0]{ _id, title, slug, content }`
  )
  const res = await fetch(`${API_QUERY}?query=${query}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  const data = await res.json()
  return data.result || null
}

/**
 * Find insertion index: before FAQ section, or before the last h2 if no FAQ.
 */
function findInsertionIndex(content) {
  // Look for FAQ heading (contains "FAQ" or "Frequently Asked")
  for (let i = 0; i < content.length; i++) {
    if (content[i]._type === 'block' && content[i].style === 'h2') {
      const text = (content[i].children || []).map(c => c.text || '').join('')
      if (/faq|frequently asked/i.test(text)) {
        return i
      }
    }
  }

  // No FAQ found — insert before the last h2
  for (let i = content.length - 1; i >= 0; i--) {
    if (content[i]._type === 'block' && content[i].style === 'h2') {
      return i
    }
  }

  // Fallback: append at the end
  return content.length
}

function hasSection(content) {
  if (!content || !Array.isArray(content)) return false
  for (const block of content) {
    if (block._type === 'block' && block.children) {
      for (const child of block.children) {
        if (child.text && child.text.includes('Setting Up 10DLC Registration')) {
          return true
        }
      }
    }
  }
  return false
}

async function patchContent(docId, content, insertIndex, newBlocks) {
  const newContent = [
    ...content.slice(0, insertIndex),
    ...newBlocks,
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
  return result
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const SLUG = 'gohighlevel-aged-leads-setup'

  console.log(`\nUpdate GoHighLevel post with 10DLC registration section`)
  console.log('\u2500'.repeat(55))

  const post = await fetchPost(SLUG)
  if (!post) {
    console.error(`Post not found: ${SLUG}`)
    process.exit(1)
  }

  console.log(`Found: "${post.title}" (${post.content?.length || 0} blocks)`)

  const content = post.content || []

  if (hasSection(content)) {
    console.log('SKIP — 10DLC section already exists.')
    return
  }

  const insertIndex = findInsertionIndex(content)
  const newBlocks = build10DLCBlocks()

  console.log(`Inserting ${newBlocks.length} blocks at position ${insertIndex}...`)

  const result = await patchContent(post._id, content, insertIndex, newBlocks)
  console.log(`DONE — patched document ${post._id}`)
  console.log(`New total: ${content.length + newBlocks.length} blocks`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
