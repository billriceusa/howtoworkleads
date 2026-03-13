#!/usr/bin/env npx tsx
/**
 * Publish CONTENT.md files to Sanity CMS
 *
 * Creates new blogPost or landingPage documents from markdown content files.
 * Parses frontmatter from Sanity CMS Fields blockquote or falls back to the
 * corresponding brief file for metadata.
 *
 * Usage:
 *   npx tsx scripts/publish-content.ts content-briefs/01-aged-vs-fresh-CONTENT.md
 *   npx tsx scripts/publish-content.ts --all                    # publish all unpublished
 *   npx tsx scripts/publish-content.ts --dry-run content-briefs/01-aged-vs-fresh-CONTENT.md
 *   npx tsx scripts/publish-content.ts --dry-run --all
 */
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { randomBytes } from 'crypto'

// Load env from web app
dotenv.config({ path: path.resolve(__dirname, '../apps/web/.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e9k38j42',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// --- Helpers ---

function key(): string {
  return randomBytes(6).toString('hex')
}

// Map human-readable category names to slugs
const CATEGORY_SLUG_MAP: Record<string, string> = {
  'buying leads': 'buying-leads',
  'lead management': 'lead-management',
  'sales process': 'sales-process',
  'crm systems': 'crm-systems',
  'insurance leads': 'insurance-leads',
}

// --- Frontmatter / Brief Parsing ---

interface ContentMeta {
  title: string
  slug: string
  seoTitle: string
  seoDescription: string
  excerpt: string
  categorySlug: string
  contentType: 'blogPost' | 'landingPage'
  secondaryKeywords: string[]
  publishedAt: string
}

/**
 * Parse the Sanity CMS Fields blockquote from the top of a CONTENT.md file.
 * Returns null if not found.
 */
function parseFrontmatter(markdown: string): Partial<ContentMeta> | null {
  const blockquoteMatch = markdown.match(
    /^> \*\*Sanity CMS Fields\*\*\n((?:> .*\n?)*)/m
  )
  if (!blockquoteMatch) return null

  const block = blockquoteMatch[0]
  const meta: Partial<ContentMeta> = {}

  const slugMatch = block.match(/\*\*Slug:\*\*\s*`([^`]+)`/)
  if (slugMatch) meta.slug = slugMatch[1]

  const seoTitleMatch = block.match(/\*\*SEO Title:\*\*\s*`([^`]+)`/)
  if (seoTitleMatch) meta.seoTitle = seoTitleMatch[1]

  const metaDescMatch = block.match(/\*\*Meta Description:\*\*\s*`([^`]+)`/)
  if (metaDescMatch) meta.seoDescription = metaDescMatch[1]

  const excerptMatch = block.match(/\*\*Excerpt:\*\*\s*`([^`]+)`/)
  if (excerptMatch) meta.excerpt = excerptMatch[1]

  const categoryMatch = block.match(/\*\*Category:\*\*\s*(.+)/)
  if (categoryMatch) {
    const catName = categoryMatch[1].trim()
    meta.categorySlug =
      CATEGORY_SLUG_MAP[catName.toLowerCase()] ||
      catName.toLowerCase().replace(/\s+/g, '-')
  }

  const dateMatch = block.match(
    /\*\*Published Date:\*\*\s*(\d{4}-\d{2}-\d{2})/
  )
  if (dateMatch) meta.publishedAt = dateMatch[1]

  return meta
}

/**
 * Read the corresponding brief file and extract metadata.
 * E.g., 03-scripts-templates-CONTENT.md → 03-scripts-templates.md
 */
function parseBriefFile(contentFilePath: string): Partial<ContentMeta> | null {
  const briefPath = contentFilePath.replace('-CONTENT.md', '.md')
  if (!fs.existsSync(briefPath)) return null

  const brief = fs.readFileSync(briefPath, 'utf-8')
  const meta: Partial<ContentMeta> = {}

  // Content Type
  const typeMatch = brief.match(/\*\*Content Type:\*\*\s*(.+)/)
  if (typeMatch) {
    const rawType = typeMatch[1].trim().toLowerCase()
    if (rawType.includes('landing page')) {
      meta.contentType = 'landingPage'
    } else {
      meta.contentType = 'blogPost'
    }
  }

  // URL → derive slug
  const urlMatch = brief.match(/\*\*URL:\*\*\s*`([^`]+)`/)
  if (urlMatch) {
    const url = urlMatch[1]
    // Extract the last segment as slug
    const segments = url.split('/').filter(Boolean)
    meta.slug = segments[segments.length - 1]

    // If URL has category prefix (e.g. /buying-leads/buy-final-expense-leads),
    // the first segment is the category
    if (segments.length >= 2 && segments[0] !== 'blog') {
      meta.categorySlug = segments[0]
    }
  }

  // Primary Keyword
  const kwMatch = brief.match(/\*\*Primary Keyword:\*\*\s*`([^`]+)`/)
  if (kwMatch) {
    // Use as fallback for SEO title
    if (!meta.seoTitle) {
      meta.seoTitle = ''
    }
  }

  // Secondary Keywords
  const secKwMatch = brief.match(/\*\*Secondary Keywords:\*\*\s*(.+)/)
  if (secKwMatch) {
    meta.secondaryKeywords = secKwMatch[1]
      .split(',')
      .map((kw) => kw.replace(/`/g, '').trim())
      .filter(Boolean)
  }

  return meta
}

/**
 * Build full metadata for a CONTENT.md file, combining frontmatter + brief + defaults.
 */
function buildMeta(filePath: string, markdown: string): ContentMeta {
  const frontmatter = parseFrontmatter(markdown) || {}
  const briefMeta = parseBriefFile(filePath) || {}

  // Title from H1
  const h1Match = markdown.match(/^# (.+)/m)
  const title = h1Match ? h1Match[1].trim() : path.basename(filePath, '.md')

  // Determine content type
  const contentType =
    frontmatter.contentType || briefMeta.contentType || 'blogPost'

  // Determine slug
  const slug =
    frontmatter.slug ||
    briefMeta.slug ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

  // Determine category slug - brief URL is most reliable for category
  const categorySlug =
    frontmatter.categorySlug || briefMeta.categorySlug || 'buying-leads'

  // SEO title - frontmatter, then title
  const seoTitle = frontmatter.seoTitle || briefMeta.seoTitle || title

  // Meta description
  const seoDescription = frontmatter.seoDescription || briefMeta.seoDescription || ''

  // Excerpt
  const excerpt = frontmatter.excerpt || briefMeta.excerpt || ''

  // Secondary keywords
  const secondaryKeywords =
    frontmatter.secondaryKeywords || briefMeta.secondaryKeywords || []

  // Published date
  const publishedAt =
    frontmatter.publishedAt || new Date().toISOString().split('T')[0]

  return {
    title,
    slug,
    seoTitle,
    seoDescription,
    excerpt,
    categorySlug,
    contentType,
    secondaryKeywords,
    publishedAt,
  }
}

// --- Markdown → Sanity Blocks ---

interface SanitySpan {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}

interface SanityMarkDef {
  _type: string
  _key: string
  href?: string
  openInNewTab?: boolean
}

interface SanityBlock {
  _type: string
  _key: string
  style?: string
  markDefs?: SanityMarkDef[]
  children?: SanitySpan[]
  listItem?: string
  level?: number
  // comparisonTable fields
  title?: string
  columns?: string[]
  rows?: Array<{
    _type: string
    _key: string
    cells: string[]
    isHighlighted: boolean
  }>
}

function span(text: string, marks: string[] = []): SanitySpan {
  return { _type: 'span', _key: key(), text, marks }
}

function block(
  style: string,
  children: SanitySpan[],
  markDefs: SanityMarkDef[] = [],
  extra: Record<string, unknown> = {}
): SanityBlock {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs,
    children,
    ...extra,
  } as SanityBlock
}

/**
 * Parse inline markdown (bold, italic, bold+italic, links) into spans.
 * Handles nested bold inside links and various combinations.
 */
function parseInline(
  text: string
): { spans: SanitySpan[]; markDefs: SanityMarkDef[] } {
  const spans: SanitySpan[] = []
  const markDefs: SanityMarkDef[] = []

  // Regex handles: links with possible bold text, bold, italic
  const regex =
    /(\[(\*\*)?(.+?)\2?\]\(([^)]+)\)|\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      spans.push(span(text.slice(lastIndex, match.index)))
    }

    if (match[3] && match[4]) {
      // Link: [text](url) or [**text**](url)
      const linkKey = key()
      const href = match[4]
      const isExternal =
        href.startsWith('http://') || href.startsWith('https://')
      markDefs.push({
        _type: 'link',
        _key: linkKey,
        href,
        ...(isExternal ? { openInNewTab: true } : {}),
      })
      const marks: string[] = [linkKey]
      if (match[2]) marks.unshift('strong') // bold link
      spans.push(span(match[3], marks))
    } else if (match[5]) {
      // Bold+Italic: ***text***
      spans.push(span(match[5], ['strong', 'em']))
    } else if (match[6]) {
      // Bold: **text**
      spans.push(span(match[6], ['strong']))
    } else if (match[7]) {
      // Italic: *text*
      spans.push(span(match[7], ['em']))
    }

    lastIndex = match.index + match[0].length
  }

  // Remaining text
  if (lastIndex < text.length) {
    spans.push(span(text.slice(lastIndex)))
  }

  if (spans.length === 0) {
    spans.push(span(text))
  }

  return { spans, markDefs }
}

/**
 * Parse a markdown table into a comparisonTable object.
 * Returns the table object and how many lines were consumed.
 */
function parseTable(
  lines: string[],
  startIndex: number
): { table: SanityBlock; linesConsumed: number } {
  let i = startIndex
  const tableLines: string[] = []

  while (i < lines.length && lines[i].trim().startsWith('|')) {
    tableLines.push(lines[i].trim())
    i++
  }

  const linesConsumed = i - startIndex

  // Parse header row
  const headerCells = tableLines[0]
    .split('|')
    .map((c) => c.trim())
    .filter(Boolean)
    .map((c) => c.replace(/\*\*/g, '')) // strip bold from headers

  // Skip separator row (index 1)
  // Parse data rows (index 2+)
  const rows: Array<{
    _type: string
    _key: string
    cells: string[]
    isHighlighted: boolean
  }> = []

  for (let r = 2; r < tableLines.length; r++) {
    const cells = tableLines[r]
      .split('|')
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => c.replace(/\*\*/g, '')) // strip bold markdown

    rows.push({
      _type: 'row',
      _key: key(),
      cells,
      isHighlighted: false,
    })
  }

  // Try to find a title from the preceding heading
  let title = ''
  for (let j = startIndex - 1; j >= Math.max(0, startIndex - 5); j--) {
    const headingMatch = lines[j]?.match(/^#{2,4}\s+(.+)/)
    if (headingMatch) {
      title = headingMatch[1].replace(/\*\*/g, '')
      break
    }
    // Stop if we hit non-empty non-heading content
    if (lines[j]?.trim() && !lines[j]?.trim().startsWith('|')) break
  }

  return {
    table: {
      _type: 'comparisonTable',
      _key: key(),
      title,
      columns: headerCells,
      rows,
    },
    linesConsumed,
  }
}

/**
 * Strip content that should not be published:
 * - H1 title line
 * - Sanity CMS Fields blockquote
 * - "[ARTICLE CONTENT BEGINS]" markers
 * - Internal Linking Checklist and everything after
 * - Structured Data Needed section
 * - About the Author blockquote
 */
function cleanMarkdown(markdown: string): string {
  let cleaned = markdown
    // Remove H1 title
    .replace(/^# .+\n+/, '')
    // Remove Sanity CMS Fields blockquote
    .replace(/^> \*\*Sanity CMS Fields\*\*\n(?:> .*\n?)*/m, '')
    // Remove [ARTICLE CONTENT BEGINS] markers
    .replace(/^##\s*\[ARTICLE CONTENT BEGINS\]\s*$/m, '')
    // Remove Internal Linking Checklist and everything after
    .replace(/---\n+## Internal Linking Checklist[\s\S]*$/, '')
    // Remove Structured Data Needed section
    .replace(/---\n+## Structured Data Needed[\s\S]*$/, '')
    // Remove About the Author blockquote section at end
    .replace(
      /---\n+> \*\*About the Author\*\*[\s\S]*?(?=\n---|\n## Internal|\n## Structured|$)/,
      ''
    )
    // Clean up multiple consecutive blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return cleaned
}

/**
 * Convert cleaned markdown into Sanity Portable Text blocks.
 * Handles: headings (h2-h4), bold, italic, links, bullet lists,
 * numbered lists, blockquotes, and tables (→ comparisonTable).
 */
function convertMarkdownToBlocks(markdown: string): SanityBlock[] {
  const lines = markdown.split('\n')
  const blocks: SanityBlock[] = []
  let i = 0
  let blockquoteLines: string[] = []
  let inBlockquote = false

  function flushBlockquote(): void {
    if (blockquoteLines.length > 0) {
      const text = blockquoteLines.join(' ').trim()
      const { spans, markDefs } = parseInline(text)
      blocks.push(block('blockquote', spans, markDefs))
      blockquoteLines = []
    }
    inBlockquote = false
  }

  while (i < lines.length) {
    const line = lines[i]

    // Empty line
    if (line.trim() === '') {
      if (inBlockquote) flushBlockquote()
      i++
      continue
    }

    // HR / separator
    if (line.trim() === '---') {
      if (inBlockquote) flushBlockquote()
      i++
      continue
    }

    // Table (pipe-delimited)
    if (line.trim().startsWith('|')) {
      if (inBlockquote) flushBlockquote()
      const { table, linesConsumed } = parseTable(lines, i)
      blocks.push(table)
      i += linesConsumed
      continue
    }

    // Headings (h4 must be checked before h3 before h2)
    const h4Match = line.match(/^#### (.+)/)
    const h3Match = !h4Match ? line.match(/^### (.+)/) : null
    const h2Match = !h4Match && !h3Match ? line.match(/^## (.+)/) : null

    if (h4Match) {
      if (inBlockquote) flushBlockquote()
      const { spans, markDefs } = parseInline(h4Match[1])
      blocks.push(block('h4', spans, markDefs))
      i++
      continue
    }

    if (h3Match) {
      if (inBlockquote) flushBlockquote()
      const { spans, markDefs } = parseInline(h3Match[1])
      blocks.push(block('h3', spans, markDefs))
      i++
      continue
    }

    if (h2Match) {
      if (inBlockquote) flushBlockquote()
      const { spans, markDefs } = parseInline(h2Match[1])
      blocks.push(block('h2', spans, markDefs))
      i++
      continue
    }

    // Blockquote
    if (line.startsWith('> ') || line === '>') {
      const quoteLine = line.replace(/^>\s?/, '')
      if (!inBlockquote) {
        inBlockquote = true
        blockquoteLines = []
      }
      blockquoteLines.push(quoteLine)
      i++
      continue
    } else if (inBlockquote) {
      flushBlockquote()
      // Don't increment — reprocess this line
      continue
    }

    // Bullet list (handles - and * prefixes, and nested with indentation)
    const bulletMatch = line.match(/^(\s*)[-*]\s+(.+)/)
    if (bulletMatch) {
      const indent = bulletMatch[1].length
      const level = indent >= 4 ? 2 : 1
      const { spans, markDefs } = parseInline(bulletMatch[2])
      blocks.push(
        block('normal', spans, markDefs, { listItem: 'bullet', level })
      )
      i++
      continue
    }

    // Numbered list
    const numMatch = line.match(/^(\s*)\d+\.\s+(.+)/)
    if (numMatch) {
      const indent = numMatch[1].length
      const level = indent >= 4 ? 2 : 1
      const { spans, markDefs } = parseInline(numMatch[2])
      blocks.push(
        block('normal', spans, markDefs, { listItem: 'number', level })
      )
      i++
      continue
    }

    // Normal paragraph
    const { spans, markDefs } = parseInline(line.trim())
    blocks.push(block('normal', spans, markDefs))
    i++
  }

  // Flush remaining blockquote
  if (inBlockquote) flushBlockquote()

  return blocks
}

// --- Sanity Operations ---

/**
 * Look up a categoryPage by its slug and return its _id.
 */
async function findCategoryId(categorySlug: string): Promise<string | null> {
  const result = await client.fetch<{ _id: string } | null>(
    `*[_type == "categoryPage" && slug.current == $slug][0]{ _id }`,
    { slug: categorySlug }
  )
  return result?._id || null
}

/**
 * Check if a document with the given slug already exists.
 */
async function documentExists(
  docType: string,
  slug: string
): Promise<string | null> {
  const result = await client.fetch<{ _id: string } | null>(
    `*[_type == $docType && slug.current == $slug][0]{ _id }`,
    { docType, slug }
  )
  return result?._id || null
}

/**
 * Create a blogPost document in Sanity.
 */
async function createBlogPost(
  meta: ContentMeta,
  contentBlocks: SanityBlock[],
  categoryId: string,
  dryRun: boolean
): Promise<string | null> {
  const now = new Date().toISOString()
  const publishedAt = meta.publishedAt.includes('T')
    ? meta.publishedAt
    : `${meta.publishedAt}T12:00:00Z`

  const doc = {
    _type: 'blogPost' as const,
    title: meta.title,
    slug: { _type: 'slug' as const, current: meta.slug },
    seoTitle: meta.seoTitle,
    seoDescription: meta.seoDescription,
    excerpt: meta.excerpt,
    content: contentBlocks,
    categories: [
      {
        _type: 'reference' as const,
        _ref: categoryId,
        _key: key(),
      },
    ],
    publishedAt,
    updatedAt: now,
  }

  if (dryRun) {
    console.log('\n  Document to create:')
    console.log(`    _type: blogPost`)
    console.log(`    title: ${doc.title}`)
    console.log(`    slug: ${doc.slug.current}`)
    console.log(`    seoTitle: ${doc.seoTitle}`)
    console.log(
      `    seoDescription: ${doc.seoDescription.slice(0, 80)}${doc.seoDescription.length > 80 ? '...' : ''}`
    )
    console.log(`    excerpt: ${doc.excerpt.slice(0, 80)}${doc.excerpt.length > 80 ? '...' : ''}`)
    console.log(`    categories: [ref → ${categoryId}]`)
    console.log(`    content blocks: ${contentBlocks.length}`)
    console.log(`    publishedAt: ${publishedAt}`)
    return null
  }

  const result = await client.create(doc)
  return result._id
}

/**
 * Create a landingPage document in Sanity.
 * Landing page content is an array of contentBlock objects, each wrapping portable text.
 */
async function createLandingPage(
  meta: ContentMeta,
  contentBlocks: SanityBlock[],
  categoryId: string,
  dryRun: boolean
): Promise<string | null> {
  const now = new Date().toISOString()
  const publishedAt = meta.publishedAt.includes('T')
    ? meta.publishedAt
    : `${meta.publishedAt}T12:00:00Z`

  // Landing pages wrap content in contentBlock objects.
  // We chunk the portable text blocks into contentBlock sections,
  // splitting at each h2 heading. Tables stay as top-level comparisonTable objects.
  const contentArray: Array<Record<string, unknown>> = []
  let currentPortableText: SanityBlock[] = []

  function flushContentBlock(): void {
    if (currentPortableText.length > 0) {
      contentArray.push({
        _type: 'contentBlock',
        _key: key(),
        content: currentPortableText,
      })
      currentPortableText = []
    }
  }

  for (const blk of contentBlocks) {
    if (blk._type === 'comparisonTable') {
      // Flush any accumulated text blocks, then add table at top level
      flushContentBlock()
      contentArray.push(blk)
    } else {
      currentPortableText.push(blk)
    }
  }
  flushContentBlock()

  const doc = {
    _type: 'landingPage' as const,
    title: meta.title,
    slug: { _type: 'slug' as const, current: meta.slug },
    seoTitle: meta.seoTitle,
    seoDescription: meta.seoDescription,
    tableOfContents: true,
    content: contentArray,
    category: {
      _type: 'reference' as const,
      _ref: categoryId,
    },
    secondaryKeywords: meta.secondaryKeywords,
    publishedAt,
    updatedAt: now,
  }

  if (dryRun) {
    console.log('\n  Document to create:')
    console.log(`    _type: landingPage`)
    console.log(`    title: ${doc.title}`)
    console.log(`    slug: ${doc.slug.current}`)
    console.log(`    seoTitle: ${doc.seoTitle}`)
    console.log(
      `    seoDescription: ${doc.seoDescription.slice(0, 80)}${doc.seoDescription.length > 80 ? '...' : ''}`
    )
    console.log(`    category: ref → ${categoryId}`)
    console.log(`    content sections: ${contentArray.length}`)
    console.log(
      `    secondaryKeywords: ${meta.secondaryKeywords.length} keywords`
    )
    console.log(`    tableOfContents: true`)
    console.log(`    publishedAt: ${publishedAt}`)
    return null
  }

  const result = await client.create(doc)
  return result._id
}

// --- Main ---

async function publishFile(
  filePath: string,
  dryRun: boolean
): Promise<boolean> {
  const absPath = path.resolve(filePath)
  if (!fs.existsSync(absPath)) {
    console.error(`  File not found: ${absPath}`)
    return false
  }

  const markdown = fs.readFileSync(absPath, 'utf-8')
  const meta = buildMeta(absPath, markdown)

  console.log(`\n  File: ${path.basename(absPath)}`)
  console.log(`  Type: ${meta.contentType}`)
  console.log(`  Slug: ${meta.slug}`)
  console.log(`  Category: ${meta.categorySlug}`)

  // Check if already exists
  const existingId = await documentExists(meta.contentType, meta.slug)
  if (existingId) {
    console.log(`  SKIPPED — already exists (${existingId})`)
    return false
  }

  // Look up category
  const categoryId = await findCategoryId(meta.categorySlug)
  if (!categoryId) {
    console.error(
      `  ERROR — category "${meta.categorySlug}" not found in Sanity`
    )
    return false
  }
  console.log(`  Category ID: ${categoryId}`)

  // Clean and convert markdown
  const cleaned = cleanMarkdown(markdown)
  const blocks = convertMarkdownToBlocks(cleaned)
  const tableCount = blocks.filter(
    (b) => b._type === 'comparisonTable'
  ).length
  const textBlockCount = blocks.length - tableCount
  console.log(
    `  Parsed: ${textBlockCount} text blocks, ${tableCount} tables`
  )

  // Create document
  let docId: string | null = null
  if (meta.contentType === 'landingPage') {
    docId = await createLandingPage(meta, blocks, categoryId, dryRun)
  } else {
    docId = await createBlogPost(meta, blocks, categoryId, dryRun)
  }

  if (dryRun) {
    console.log(`  DRY RUN — would create ${meta.contentType}`)
  } else {
    console.log(`  CREATED — ${meta.contentType} → ${docId}`)
  }

  return true
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const all = args.includes('--all')
  const files = args.filter((a) => !a.startsWith('--'))

  if (!all && files.length === 0) {
    console.error(
      'Usage:\n' +
        '  npx tsx scripts/publish-content.ts <CONTENT.md file>\n' +
        '  npx tsx scripts/publish-content.ts --all\n' +
        '  npx tsx scripts/publish-content.ts --dry-run <CONTENT.md file>\n' +
        '  npx tsx scripts/publish-content.ts --dry-run --all'
    )
    process.exit(1)
  }

  console.log(`\nPublish Content to Sanity CMS`)
  console.log(`${'─'.repeat(40)}`)
  if (dryRun) console.log('MODE: Dry Run (no changes will be made)\n')

  let targetFiles: string[]

  if (all) {
    // Find all CONTENT.md files in content-briefs/
    const briefsDir = path.resolve(__dirname, '../content-briefs')
    const allFiles = fs.readdirSync(briefsDir).filter((f) => f.endsWith('-CONTENT.md'))
    targetFiles = allFiles.map((f) => path.join(briefsDir, f))
    console.log(`Found ${targetFiles.length} CONTENT.md files`)
  } else {
    targetFiles = files.map((f) => path.resolve(f))
  }

  let created = 0
  let skipped = 0
  let errors = 0

  for (const file of targetFiles) {
    try {
      const wasCreated = await publishFile(file, dryRun)
      if (wasCreated) created++
      else skipped++
    } catch (err: unknown) {
      errors++
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`  ERROR processing ${path.basename(file)}: ${msg}`)
    }
  }

  console.log(`\n${'─'.repeat(40)}`)
  console.log(
    `Done. Created: ${created}, Skipped: ${skipped}, Errors: ${errors}`
  )
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
