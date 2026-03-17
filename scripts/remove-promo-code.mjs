/**
 * Remove ALL references to the BILLRICE promo code from Sanity CMS content.
 *
 * Searches blogPost, landingPage, and categoryPage documents for promo code
 * mentions and removes entire blocks (if standalone) or sentences (if inline).
 *
 * Usage:
 *   node scripts/remove-promo-code.mjs              # dry run (default)
 *   node scripts/remove-promo-code.mjs --apply       # apply changes
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../apps/web/.env.local') })

const client = createClient({
  projectId: 'e9k38j42',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const apply = process.argv.includes('--apply')
const dryRun = !apply

// ── Helpers ─────────────────────────────────────────────────────────────────

function getBlockText(block) {
  if (!block?.children) return ''
  return block.children
    .filter(c => c._type === 'span')
    .map(s => s.text || '')
    .join('')
}

/**
 * Returns true if the entire block is standalone promo text (remove whole block).
 */
function isStandalonePromoBlock(text) {
  const t = text.toLowerCase().trim()
  if (!t) return false
  // Must mention billrice or promo code + billrice
  if (!t.includes('billrice')) return false
  // Short standalone patterns
  if (t === 'promo code: billrice') return true
  // "Use Promo Code: BILLRICE to get 10% off — every order!"
  // "Use promo code BILLRICE for 10% off every order."
  // "Use promo code BILLRICE for a discount on your first order."
  // If the whole block is essentially just the promo message
  if (
    (t.startsWith('use promo code') || t.startsWith('use code')) &&
    t.includes('billrice')
  ) return true
  // "(use code BILLRICE for 10% off)" as a standalone block
  if (t.startsWith('(use code') && t.includes('billrice')) return true
  return false
}

/**
 * Regex patterns that match promo sentences within larger text.
 * Each pattern captures the promo sentence (including trailing space/punctuation).
 */
const PROMO_SENTENCE_PATTERNS = [
  // "Use Promo Code: BILLRICE to get 10% off — every order!"
  /Use [Pp]romo [Cc]ode:?\s*\*{0,2}BILLRICE\*{0,2}[^.!]*[.!]\s*/g,
  // "Use promo code BILLRICE for ..."
  /Use promo code\s*\*{0,2}BILLRICE\*{0,2}[^.!]*[.!]\s*/g,
  // "Use code BILLRICE for ..."
  /Use code\s*\*{0,2}BILLRICE\*{0,2}[^.!]*[.!]\s*/g,
  // "(use code BILLRICE for 10% off)" parenthetical
  /\(use code\s*\*{0,2}BILLRICE\*{0,2}[^)]*\)\s*/gi,
  // "Promo Code: BILLRICE" as inline mention
  /Promo [Cc]ode:\s*\*{0,2}BILLRICE\*{0,2}\s*/g,
]

/**
 * Remove promo text from a single span's text string.
 */
function cleanPromoFromText(text) {
  let cleaned = text
  for (const pattern of PROMO_SENTENCE_PATTERNS) {
    // Reset lastIndex for global regexes
    pattern.lastIndex = 0
    cleaned = cleaned.replace(pattern, '')
  }
  return cleaned.trim()
}

/**
 * Check if text contains promo reference.
 */
function hasPromoReference(text) {
  return text && /billrice/i.test(text)
}

/**
 * Clean promo text from a block's children spans.
 * Returns the modified children array, or null if nothing changed.
 */
function cleanBlockChildren(block) {
  if (!block.children) return null
  let changed = false
  const newChildren = []

  for (const child of block.children) {
    if (child._type !== 'span' || !child.text) {
      newChildren.push(child)
      continue
    }
    if (!hasPromoReference(child.text)) {
      newChildren.push(child)
      continue
    }
    const cleaned = cleanPromoFromText(child.text)
    if (cleaned !== child.text) {
      changed = true
      if (cleaned) {
        newChildren.push({ ...child, text: cleaned })
      }
      // If cleaned is empty, drop the span
    } else {
      newChildren.push(child)
    }
  }

  if (!changed) return null
  return newChildren
}

/**
 * Process an array of Portable Text blocks.
 * Returns { blocks: newArray, removals: [...], edits: [...] } or null if no changes.
 */
function processBlocks(blocks, docTitle, pathPrefix) {
  if (!Array.isArray(blocks)) return null
  let changed = false
  const newBlocks = []
  const removals = []
  const edits = []

  for (const block of blocks) {
    if (block._type === 'block') {
      const text = getBlockText(block)

      // Check standalone removal first
      if (isStandalonePromoBlock(text)) {
        changed = true
        removals.push({ path: pathPrefix, text: text.substring(0, 120) })
        continue // skip this block entirely
      }

      // Check inline promo text
      if (hasPromoReference(text)) {
        const cleanedChildren = cleanBlockChildren(block)
        if (cleanedChildren) {
          changed = true
          const newText = cleanedChildren
            .filter(c => c._type === 'span')
            .map(s => s.text || '')
            .join('')
          if (newText.trim()) {
            // Clean up markDefs - remove any that reference marks no longer used
            const usedMarks = new Set()
            for (const c of cleanedChildren) {
              if (c.marks) c.marks.forEach(m => usedMarks.add(m))
            }
            const newMarkDefs = (block.markDefs || []).filter(
              md => usedMarks.has(md._key)
            )
            newBlocks.push({ ...block, children: cleanedChildren, markDefs: newMarkDefs })
          }
          edits.push({
            path: pathPrefix,
            before: text.substring(0, 120),
            after: newText.substring(0, 120),
          })
          continue
        }
      }
    }

    // Recurse into nested content (landingPage contentBlock, ctaSection, faqSection)
    if (block._type === 'contentBlock' && block.content) {
      const result = processBlocks(block.content, docTitle, `${pathPrefix}.contentBlock`)
      if (result) {
        changed = true
        removals.push(...result.removals)
        edits.push(...result.edits)
        newBlocks.push({ ...block, content: result.blocks })
        continue
      }
    }

    if (block._type === 'ctaSection') {
      // Check description field (string or portable text)
      if (typeof block.description === 'string' && hasPromoReference(block.description)) {
        const cleaned = cleanPromoFromText(block.description)
        if (cleaned !== block.description) {
          changed = true
          edits.push({
            path: `${pathPrefix}.ctaSection.description`,
            before: block.description.substring(0, 120),
            after: cleaned.substring(0, 120),
          })
          newBlocks.push({ ...block, description: cleaned })
          continue
        }
      }
      // If description is portable text array
      if (Array.isArray(block.description)) {
        const result = processBlocks(block.description, docTitle, `${pathPrefix}.ctaSection.description`)
        if (result) {
          changed = true
          removals.push(...result.removals)
          edits.push(...result.edits)
          newBlocks.push({ ...block, description: result.blocks })
          continue
        }
      }
    }

    if (block._type === 'faqSection' && Array.isArray(block.faqs)) {
      let faqChanged = false
      const newFaqs = []
      for (const faq of block.faqs) {
        let faqModified = { ...faq }
        // Check question
        if (typeof faq.question === 'string' && hasPromoReference(faq.question)) {
          const cleaned = cleanPromoFromText(faq.question)
          if (cleaned !== faq.question) {
            faqChanged = true
            edits.push({
              path: `${pathPrefix}.faqSection.question`,
              before: faq.question.substring(0, 120),
              after: cleaned.substring(0, 120),
            })
            faqModified.question = cleaned
          }
        }
        // Check answer (portable text array)
        if (Array.isArray(faq.answer)) {
          const result = processBlocks(faq.answer, docTitle, `${pathPrefix}.faqSection.answer`)
          if (result) {
            faqChanged = true
            removals.push(...result.removals)
            edits.push(...result.edits)
            faqModified.answer = result.blocks
          }
        }
        newFaqs.push(faqModified)
      }
      if (faqChanged) {
        changed = true
        newBlocks.push({ ...block, faqs: newFaqs })
        continue
      }
    }

    newBlocks.push(block)
  }

  if (!changed) return null
  return { blocks: newBlocks, removals, edits }
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\nRemove BILLRICE Promo Code References')
  console.log('='.repeat(50))
  if (dryRun) console.log('MODE: DRY RUN (use --apply to make changes)\n')
  else console.log('MODE: APPLYING CHANGES\n')

  const docTypes = ['blogPost', 'landingPage', 'categoryPage']
  let totalModified = 0
  let totalRemovals = 0
  let totalEdits = 0
  const mutations = []

  for (const docType of docTypes) {
    console.log(`\n--- Scanning ${docType} documents ---`)
    const query = `*[_type == "${docType}"]{ _id, _type, title, slug, content }`
    const docs = await client.fetch(query)
    console.log(`  Found ${docs.length} documents`)

    for (const doc of docs) {
      const result = processBlocks(doc.content, doc.title, 'content')
      if (!result) continue

      totalModified++
      totalRemovals += result.removals.length
      totalEdits += result.edits.length

      const slug = doc.slug?.current || doc._id
      console.log(`\n  [MODIFIED] "${doc.title}" (${slug})`)

      for (const r of result.removals) {
        console.log(`    REMOVE block: "${r.text}"`)
      }
      for (const e of result.edits) {
        console.log(`    EDIT at ${e.path}:`)
        console.log(`      Before: "${e.before}"`)
        console.log(`      After:  "${e.after}"`)
      }

      mutations.push({
        patch: {
          id: doc._id,
          set: { content: result.blocks },
        },
      })
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('SUMMARY')
  console.log(`  Documents modified: ${totalModified}`)
  console.log(`  Blocks removed:     ${totalRemovals}`)
  console.log(`  Blocks edited:      ${totalEdits}`)

  if (totalModified === 0) {
    console.log('\nNo promo code references found. Nothing to do.')
    return
  }

  if (dryRun) {
    console.log('\n[DRY RUN] No changes made. Run with --apply to apply fixes.')
    return
  }

  console.log(`\nApplying ${mutations.length} patches...`)
  // Batch mutations in groups of 10
  for (let i = 0; i < mutations.length; i += 10) {
    const batch = mutations.slice(i, i + 10)
    const result = await client.mutate(batch)
    console.log(`  Patched batch ${Math.floor(i / 10) + 1} (${batch.length} docs)`)
  }
  console.log('\nDone! All promo code references removed.')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
