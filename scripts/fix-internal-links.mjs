/**
 * Internal Link Remediation Script
 *
 * Patches Sanity documents for briefs 31-42 to add missing internal links
 * per the SEO strategy requirements from INTERNAL-LINKING-AUDIT.md.
 *
 * Usage:
 *   node scripts/fix-internal-links.mjs              # dry run (default)
 *   node scripts/fix-internal-links.mjs --apply       # apply changes
 *   node scripts/fix-internal-links.mjs --slug buy-purchase-mortgage-leads  # single page
 */
import { randomBytes } from 'crypto'

const TOKEN = 'skis2pqTY12KO007aXXT1RQs8p5MYNYIW1LNYj593TEpl2KUKqkL9KAvcISd72ljeb1jbYFqT5LMeEjjm'
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

function linkSpan(text, href, markDefs) {
  const linkKey = key()
  markDefs.push({ _type: 'link', _key: linkKey, href })
  return span(text, [linkKey])
}

function boldLinkSpan(text, href, markDefs) {
  const linkKey = key()
  markDefs.push({ _type: 'link', _key: linkKey, href })
  return span(text, ['strong', linkKey])
}

function paragraph(spans, markDefs) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs,
    children: spans,
  }
}

// ── Page definitions ────────────────────────────────────────────────────────

const BUYING_GUIDES = [
  {
    slug: 'buy-purchase-mortgage-leads',
    label: 'purchase mortgage leads',
    type: 'landingPage',
    pairedHowTo: '/blog/how-to-work-purchase-mortgage-leads',
    pairedHowToLabel: 'how to work purchase mortgage leads',
    crossLinks: [
      { href: '/buying-leads/buy-refinance-mortgage-leads', label: 'refinance mortgage leads' },
      { href: '/buying-leads/buy-heloc-leads', label: 'HELOC leads' },
    ],
  },
  {
    slug: 'buy-refinance-mortgage-leads',
    label: 'refinance mortgage leads',
    type: 'landingPage',
    pairedHowTo: '/blog/how-to-work-refinance-mortgage-leads',
    pairedHowToLabel: 'how to work refinance mortgage leads',
    crossLinks: [
      { href: '/buying-leads/buy-purchase-mortgage-leads', label: 'purchase mortgage leads' },
    ],
  },
  {
    slug: 'buy-non-qm-mortgage-leads',
    label: 'non-QM mortgage leads',
    type: 'landingPage',
    pairedHowTo: '/blog/how-to-work-non-qm-mortgage-leads',
    pairedHowToLabel: 'how to work non-QM mortgage leads',
    crossLinks: [
      { href: '/buying-leads/buy-bank-statement-loan-leads', label: 'bank statement loan leads' },
    ],
    missingROI: true,
  },
  {
    slug: 'buy-dscr-loan-leads',
    label: 'DSCR loan leads',
    type: 'landingPage',
    pairedHowTo: '/blog/how-to-work-dscr-loan-leads',
    pairedHowToLabel: 'how to work DSCR loan leads',
    fixPairedLink: true, // currently links to non-QM how-to, needs DSCR-specific
    crossLinks: [
      { href: '/buying-leads/buy-non-qm-mortgage-leads', label: 'non-QM mortgage leads' },
      { href: '/buying-leads/buy-bank-statement-loan-leads', label: 'bank statement loan leads' },
    ],
  },
  {
    slug: 'buy-bank-statement-loan-leads',
    label: 'bank statement loan leads',
    type: 'landingPage',
    pairedHowTo: '/blog/how-to-work-bank-statement-loan-leads',
    pairedHowToLabel: 'how to work bank statement loan leads',
    fixPairedLink: true, // currently links to non-QM how-to
    crossLinks: [
      { href: '/buying-leads/buy-non-qm-mortgage-leads', label: 'non-QM mortgage leads' },
      { href: '/buying-leads/buy-dscr-loan-leads', label: 'DSCR loan leads' },
    ],
    missingROI: true,
  },
  {
    slug: 'buy-heloc-leads',
    label: 'HELOC leads',
    type: 'landingPage',
    pairedHowTo: '/blog/how-to-work-heloc-leads',
    pairedHowToLabel: 'how to work HELOC leads',
    fixPairedLink: true, // missing entirely
    crossLinks: [
      { href: '/buying-leads/buy-purchase-mortgage-leads', label: 'purchase mortgage leads' },
      { href: '/buying-leads/buy-refinance-mortgage-leads', label: 'refinance mortgage leads' },
    ],
  },
]

const HOW_TO_POSTS = [
  {
    slug: 'how-to-work-purchase-mortgage-leads',
    label: 'purchase mortgage leads',
    type: 'blogPost',
    pairedBuyingGuide: '/buying-leads/buy-purchase-mortgage-leads',
    missingScripts: true,
    missingCadence: false,
    missingCRM: true,
  },
  {
    slug: 'how-to-work-refinance-mortgage-leads',
    label: 'refinance mortgage leads',
    type: 'blogPost',
    pairedBuyingGuide: '/buying-leads/buy-refinance-mortgage-leads',
    missingScripts: true,
    missingCadence: true,
    missingCRM: true,
  },
  {
    slug: 'how-to-work-non-qm-mortgage-leads',
    label: 'non-QM mortgage leads',
    type: 'blogPost',
    pairedBuyingGuide: '/buying-leads/buy-non-qm-mortgage-leads',
    missingScripts: true,
    missingCadence: true,
    missingCRM: true,
  },
  {
    slug: 'how-to-work-dscr-loan-leads',
    label: 'DSCR loan leads',
    type: 'blogPost',
    pairedBuyingGuide: '/buying-leads/buy-dscr-loan-leads',
    missingScripts: true,
    missingCadence: true,
    missingCRM: false, // links to /blog/crm-aged-leads-setup (possibly same page)
  },
  {
    slug: 'how-to-work-bank-statement-loan-leads',
    label: 'bank statement loan leads',
    type: 'blogPost',
    pairedBuyingGuide: '/buying-leads/buy-bank-statement-loan-leads',
    missingScripts: true,
    missingCadence: true,
    missingCRM: true,
  },
  {
    slug: 'how-to-work-heloc-leads',
    label: 'HELOC leads',
    type: 'blogPost',
    pairedBuyingGuide: '/buying-leads/buy-heloc-leads',
    missingScripts: true,
    missingCadence: false,
    missingCRM: false, // links to /blog/crm-aged-leads-setup
  },
]

// ── Sanity helpers ──────────────────────────────────────────────────────────

async function fetchDocument(docType, slug) {
  const query = encodeURIComponent(
    `*[_type == "${docType}" && slug.current == "${slug}"][0]{ _id, _type, slug, title, content }`
  )
  const res = await fetch(`${API_QUERY}?query=${query}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  const data = await res.json()
  return data.result
}

function findExistingLinks(content) {
  const links = new Set()
  function walk(obj) {
    if (!obj) return
    if (Array.isArray(obj)) {
      obj.forEach(walk)
      return
    }
    if (typeof obj === 'object') {
      if (obj._type === 'link' && obj.href) {
        links.add(obj.href)
      }
      // Walk into content arrays (for landingPage contentBlock wrappers)
      if (obj.content) walk(obj.content)
      if (obj.children) walk(obj.children)
      if (obj.markDefs) walk(obj.markDefs)
      Object.values(obj).forEach((v) => {
        if (Array.isArray(v)) walk(v)
      })
    }
  }
  walk(content)
  return links
}

/**
 * For landingPages, content is an array of contentBlock objects.
 * We need to get the actual content blocks array and know how to patch it.
 * For blogPosts, content is directly an array of portable text blocks.
 */
function getContentBlocks(doc) {
  if (doc._type === 'blogPost') {
    return { blocks: doc.content || [], path: 'content' }
  }
  // landingPage: content is array of contentBlock objects, each with a content array
  return { blocks: doc.content || [], path: 'content' }
}

async function patchDocument(docId, path, newBlocks, dryRun) {
  if (dryRun) return true

  // Append new blocks to the end of the content array
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
          insert: {
            after: `${path}[-1]`,
            items: newBlocks,
          },
        },
      }],
    }),
  })

  const result = await res.json()
  if (result.error) {
    console.error(`    ERROR patching ${docId}:`, result.error)
    return false
  }
  return true
}

// ── Block builders ──────────────────────────────────────────────────────────

function buildUniversalLinkBlocks(existingLinks) {
  const blocks = []

  // Pillar page link
  if (!existingLinks.has('/buying-leads')) {
    const markDefs = []
    const spans = [
      span('For a complete overview of aged lead types and pricing, explore our '),
      boldLinkSpan('complete guide to buying leads', '/buying-leads', markDefs),
      span('.'),
    ]
    blocks.push(paragraph(spans, markDefs))
  }

  // Main aged leads page link
  if (!existingLinks.has('/buying-leads/buy-aged-leads')) {
    const markDefs = []
    const spans = [
      span('New to aged leads? Start with our '),
      boldLinkSpan('aged leads buying guide', '/buying-leads/buy-aged-leads', markDefs),
      span(' to understand pricing, quality tiers, and how to evaluate vendors before you buy.'),
    ]
    blocks.push(paragraph(spans, markDefs))
  }

  return blocks
}

function buildBuyingGuideLinkBlocks(page, existingLinks) {
  const blocks = []

  // /lead-order link
  if (!existingLinks.has('/lead-order')) {
    const markDefs = []
    const spans = [
      span('Ready to get started? '),
      boldLinkSpan('Place your lead order here', '/lead-order', markDefs),
      span(' and start working aged leads today.'),
    ]
    blocks.push(paragraph(spans, markDefs))
  }

  // Cross-links to other buying guides
  for (const cross of page.crossLinks) {
    if (!existingLinks.has(cross.href)) {
      const markDefs = []
      const spans = [
        span('Also consider '),
        boldLinkSpan(cross.label, cross.href, markDefs),
        span(' — many mortgage professionals diversify across multiple lead types to build a more consistent pipeline.'),
      ]
      blocks.push(paragraph(spans, markDefs))
    }
  }

  // ROI calculator
  if (page.missingROI && !existingLinks.has('/tools/aged-lead-roi-calculator')) {
    const markDefs = []
    const spans = [
      span('Use our '),
      boldLinkSpan('aged lead ROI calculator', '/tools/aged-lead-roi-calculator', markDefs),
      span(' to estimate your return before you buy.'),
    ]
    blocks.push(paragraph(spans, markDefs))
  }

  return blocks
}

function buildHowToLinkBlocks(page, existingLinks) {
  const blocks = []

  // Scripts/templates link
  if (page.missingScripts && !existingLinks.has('/blog/aged-lead-scripts-templates')) {
    const markDefs = []
    const spans = [
      span('Need ready-to-use call and email scripts? Download our '),
      boldLinkSpan('aged lead scripts and templates', '/blog/aged-lead-scripts-templates', markDefs),
      span(' — proven openers, objection handlers, and voicemail scripts for every lead type.'),
    ]
    blocks.push(paragraph(spans, markDefs))
  }

  // Follow-up cadence link
  if (page.missingCadence && !existingLinks.has('/blog/aged-lead-follow-up-cadence')) {
    const markDefs = []
    const spans = [
      span('Not sure how often to follow up? Our '),
      boldLinkSpan('aged lead follow-up cadence guide', '/blog/aged-lead-follow-up-cadence', markDefs),
      span(' breaks down the optimal contact schedule for maximum conversions.'),
    ]
    blocks.push(paragraph(spans, markDefs))
  }

  // CRM guide link
  if (page.missingCRM && !existingLinks.has('/blog/best-crm-aged-leads') && !existingLinks.has('/blog/crm-aged-leads-setup')) {
    const markDefs = []
    const spans = [
      span('Setting up your CRM for aged leads? See our '),
      boldLinkSpan('best CRM systems for aged leads', '/blog/best-crm-aged-leads', markDefs),
      span(' guide for setup tips, automation workflows, and recommended platforms.'),
    ]
    blocks.push(paragraph(spans, markDefs))
  }

  return blocks
}

/**
 * For landingPages, we need to wrap new blocks in a contentBlock object.
 */
function wrapForLandingPage(blocks) {
  if (blocks.length === 0) return []
  return [{
    _type: 'contentBlock',
    _key: key(),
    content: blocks,
  }]
}

// ── Main ────────────────────────────────────────────────────────────────────

async function processPage(page, isBuyingGuide, dryRun) {
  const doc = await fetchDocument(page.type, page.slug)
  if (!doc) {
    console.log(`  SKIP — ${page.slug}: not found in Sanity`)
    return
  }

  const existingLinks = findExistingLinks(doc.content)
  const { path } = getContentBlocks(doc)

  // Build new blocks
  const universalBlocks = buildUniversalLinkBlocks(existingLinks)
  const specificBlocks = isBuyingGuide
    ? buildBuyingGuideLinkBlocks(page, existingLinks)
    : buildHowToLinkBlocks(page, existingLinks)

  const allNewBlocks = [...universalBlocks, ...specificBlocks]

  if (allNewBlocks.length === 0) {
    console.log(`  OK — ${page.slug}: all links already present`)
    return
  }

  // For landingPages, wrap in contentBlock
  const blocksToInsert = page.type === 'landingPage'
    ? wrapForLandingPage(allNewBlocks)
    : allNewBlocks

  const linkCount = allNewBlocks.length
  const linkDescriptions = []
  if (universalBlocks.length > 0) linkDescriptions.push(`${universalBlocks.length} universal`)
  if (specificBlocks.length > 0) linkDescriptions.push(`${specificBlocks.length} specific`)

  if (dryRun) {
    console.log(`  DRY RUN — ${page.slug}: would add ${linkCount} link blocks (${linkDescriptions.join(', ')})`)
    // Show what links would be added
    for (const b of allNewBlocks) {
      const hrefs = (b.markDefs || []).filter(m => m._type === 'link').map(m => m.href)
      console.log(`    → ${hrefs.join(', ')}`)
    }
    return
  }

  const success = await patchDocument(doc._id, path, blocksToInsert, false)
  if (success) {
    console.log(`  PATCHED — ${page.slug}: added ${linkCount} link blocks (${linkDescriptions.join(', ')})`)
  }
}

async function main() {
  const args = process.argv.slice(2)
  const apply = args.includes('--apply')
  const dryRun = !apply
  const singleSlug = args.find((a, i) => args[i - 1] === '--slug')

  console.log('\nInternal Link Remediation — Briefs 31-42')
  console.log('─'.repeat(50))
  if (dryRun) console.log('MODE: Dry Run (use --apply to make changes)\n')
  else console.log('MODE: APPLYING CHANGES\n')

  const allPages = [
    ...BUYING_GUIDES.map(p => ({ ...p, isBuyingGuide: true })),
    ...HOW_TO_POSTS.map(p => ({ ...p, isBuyingGuide: false })),
  ]

  const pages = singleSlug
    ? allPages.filter(p => p.slug === singleSlug)
    : allPages

  if (pages.length === 0) {
    console.log(`No pages found matching slug: ${singleSlug}`)
    return
  }

  console.log(`Processing ${pages.length} pages...\n`)

  for (const page of pages) {
    await processPage(page, page.isBuyingGuide, dryRun)
  }

  console.log('\n' + '─'.repeat(50))
  console.log('Done.')
  if (dryRun) console.log('Run with --apply to make changes.')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
