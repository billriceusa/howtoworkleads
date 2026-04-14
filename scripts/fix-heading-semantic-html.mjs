/**
 * Convert normal Portable Text blocks that start with "## " / "### " / "#### "
 * into proper h2 / h3 / h4 style blocks, stripping the markdown prefix.
 *
 * Background: historical content imports landed section headings as plain
 * text "## Heading" inside style:"normal" blocks. The template renders them
 * via markdown processor, but they emit <div> not <h2> — losing semantic HTML,
 * schema structure, and TOC extraction.
 *
 * Safety rules:
 *  - Only convert blocks where style is "normal"
 *  - Only single-span children (no mixed formatting)
 *  - Only if text starts with exact "## " / "### " / "#### " (with space)
 *  - Leaves bullet / number list items alone
 *  - Leaves other prefixes alone (e.g. "#hashtag", "##something" without space)
 *
 * Run:
 *   node scripts/fix-heading-semantic-html.mjs                   # dry run, all docs
 *   node scripts/fix-heading-semantic-html.mjs --limit 1         # dry-run 1 doc
 *   node scripts/fix-heading-semantic-html.mjs --slug <slug>     # single doc
 *   node scripts/fix-heading-semantic-html.mjs --apply           # apply to all
 */
import { randomBytes } from 'crypto'

const TOKEN = process.env.SANITY_API_TOKEN
const PROJECT = 'e9k38j42'
const API_QUERY = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/production`
const API_MUTATE = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/production`
if (!TOKEN) { console.error('SANITY_API_TOKEN required'); process.exit(1) }

const HEADING_PATTERN = /^(#{2,4})\s+(.+)$/

function classifyBlock(block) {
  if (block._type !== 'block') return null
  if (block.style !== 'normal') return null
  if (block.listItem) return null
  const children = block.children || []
  if (children.length !== 1) return null
  const child = children[0]
  if (child._type !== 'span') return null
  if ((child.marks || []).length > 0) return null
  const text = (child.text || '').trim()
  const match = text.match(HEADING_PATTERN)
  if (!match) return null
  const hashes = match[1]
  const heading = match[2].trim()
  if (heading.length > 200) return null
  const style = hashes.length === 2 ? 'h2' : hashes.length === 3 ? 'h3' : 'h4'
  return { style, heading }
}

function convertBlock(block, conversion) {
  const firstChild = block.children[0]
  return {
    ...block,
    style: conversion.style,
    children: [{ ...firstChild, text: conversion.heading }],
  }
}

function processContent(contentArray) {
  if (!Array.isArray(contentArray)) return { updated: contentArray, changes: 0 }
  let changes = 0
  const updated = contentArray.map((item) => {
    if (item._type === 'contentBlock' && Array.isArray(item.content)) {
      const inner = processContent(item.content)
      changes += inner.changes
      return { ...item, content: inner.updated }
    }
    if (item._type === 'block') {
      const conversion = classifyBlock(item)
      if (conversion) { changes++; return convertBlock(item, conversion) }
    }
    return item
  })
  return { updated, changes }
}

async function fetchDocs(slug, limit) {
  let query
  if (slug) {
    query = `*[_type in ["landingPage","blogPost"] && slug.current == "${slug}"]{_id,_type,"slug":slug.current,title,content}`
  } else if (limit) {
    query = `*[_type in ["landingPage","blogPost"]][0...${limit}]{_id,_type,"slug":slug.current,title,content}`
  } else {
    query = '*[_type in ["landingPage","blogPost"]]{_id,_type,"slug":slug.current,title,content}'
  }
  const res = await fetch(`${API_QUERY}?query=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  return (await res.json()).result || []
}

async function patchDoc(docId, content, dryRun) {
  if (dryRun) return true
  const res = await fetch(API_MUTATE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations: [{ patch: { id: docId, set: { content } } }] }),
  })
  const data = await res.json()
  if (data.error) { console.error(`  ERROR ${docId}:`, data.error); return false }
  return true
}

async function main() {
  const args = process.argv.slice(2)
  const apply = args.includes('--apply')
  const dryRun = !apply
  const slug = args[args.indexOf('--slug') + 1]
  const limitArg = args[args.indexOf('--limit') + 1]
  const limit = limitArg ? parseInt(limitArg, 10) : null

  console.log(`Heading Semantic HTML Fix — ${dryRun ? 'DRY RUN' : 'APPLYING'}`)
  console.log('─'.repeat(60))

  const docs = await fetchDocs(slug && args[args.indexOf('--slug') + 1] !== '--apply' ? slug : null, limit)
  console.log(`Loaded ${docs.length} docs`)
  console.log()

  let totalChanges = 0
  let docsChanged = 0
  let failed = 0

  for (const doc of docs) {
    const { updated, changes } = processContent(doc.content || [])
    if (changes === 0) continue
    docsChanged++
    totalChanges += changes
    console.log(`  ${dryRun ? 'DRY' : 'PATCH'} ${doc.slug || doc._id} (${doc._type}): ${changes} heading(s)`)
    if (!dryRun) {
      const ok = await patchDoc(doc._id, updated, false)
      if (!ok) failed++
    }
  }

  console.log('─'.repeat(60))
  console.log(`Docs changed: ${docsChanged} / ${docs.length}`)
  console.log(`Total headings converted: ${totalChanges}`)
  if (failed) console.log(`FAILURES: ${failed}`)
  if (dryRun) console.log('Run with --apply to patch Sanity.')
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
