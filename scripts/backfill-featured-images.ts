#!/usr/bin/env npx tsx
/**
 * Backfill Featured Images
 *
 * Finds all landing pages and blog posts missing featured/OG images,
 * generates branded images via Unsplash, and uploads to Sanity.
 *
 * Usage:
 *   npx tsx scripts/backfill-featured-images.ts              # process all missing
 *   npx tsx scripts/backfill-featured-images.ts --dry-run     # preview only
 *   npx tsx scripts/backfill-featured-images.ts --limit 3     # process first 3
 *   npx tsx scripts/backfill-featured-images.ts --replace     # replace existing images too
 *   npx tsx scripts/backfill-featured-images.ts --slugs "slug1,slug2"  # specific pages
 */
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'

// Load env from web app
dotenv.config({ path: path.resolve(__dirname, '../apps/web/.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Dynamic import to get the functions after env is loaded
async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const replace = args.includes('--replace')
  const limitIdx = args.indexOf('--limit')
  const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : Infinity
  const slugsIdx = args.indexOf('--slugs')
  const slugFilter = slugsIdx >= 0 ? args[slugsIdx + 1].split(',') : null

  console.log(`\nBackfill Featured Images`)
  console.log(`  dry-run: ${dryRun}, replace: ${replace}, limit: ${limit === Infinity ? 'all' : limit}`)
  if (slugFilter) console.log(`  slugs: ${slugFilter.join(', ')}`)
  console.log()

  // Fetch landing pages
  const landingPages = await client.fetch<any[]>(`
    *[_type == "landingPage" ${!replace ? '&& !defined(ogImage.asset)' : ''}] {
      _id, title, "slug": slug.current, "category": category->slug.current
    }
  `)

  // Fetch blog posts
  const blogPosts = await client.fetch<any[]>(`
    *[_type == "blogPost" ${!replace ? '&& !defined(mainImage.asset)' : ''}] {
      _id, title, "slug": slug.current, "category": categories[0]->slug.current
    }
  `)

  let docs = [
    ...(landingPages || []).map((d: any) => ({ ...d, _type: 'landingPage', fieldName: 'ogImage' })),
    ...(blogPosts || []).map((d: any) => ({ ...d, _type: 'blogPost', fieldName: 'mainImage' })),
  ]

  if (slugFilter) {
    docs = docs.filter((d) => slugFilter.includes(d.slug))
  }

  docs = docs.slice(0, limit)

  console.log(`Found ${docs.length} documents to process\n`)

  if (docs.length === 0) {
    console.log('Nothing to do!')
    return
  }

  // Lazy import the image generation (needs sharp)
  const { generateBrandedImage } = await import('../apps/web/lib/featured-image')

  let processed = 0
  let failed = 0

  for (const doc of docs) {
    console.log(`[${processed + 1}/${docs.length}] ${doc._type}: "${doc.title}" (${doc.slug})`)

    if (dryRun) {
      console.log(`  Would generate image for category: ${doc.category || 'unknown'}\n`)
      processed++
      continue
    }

    try {
      const searchQuery = buildSearchQuery(doc.title, doc.category || 'business')
      console.log(`  Query: "${searchQuery}"`)

      const result = await generateBrandedImage(searchQuery)
      if (!result) {
        console.log('  SKIP: No Unsplash result\n')
        failed++
        continue
      }

      // Upload to Sanity
      const asset = await client.assets.upload('image', result.buffer, {
        filename: `featured-${slugify(doc.title)}.jpg`,
        contentType: 'image/jpeg',
      })

      // Patch document
      await client
        .patch(doc._id)
        .set({
          [doc.fieldName]: {
            _type: 'image',
            alt: doc.title,
            asset: { _type: 'reference', _ref: asset._id },
          },
        })
        .commit()

      console.log(`  OK: ${asset.url}`)
      if (result.credit) {
        console.log(`  Credit: ${result.credit.name} (${result.credit.url})`)
      }
      console.log()
      processed++

      // Rate limit: 1.5s between requests
      await new Promise((r) => setTimeout(r, 1500))
    } catch (err) {
      console.error(`  ERROR: ${err}\n`)
      failed++
    }
  }

  console.log(`\nDone! Processed: ${processed}, Failed: ${failed}`)
}

function buildSearchQuery(title: string, category: string): string {
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'how', 'what', 'why', 'your',
    'buy', 'buying', 'complete', 'guide', 'best', 'top',
  ])
  const titleWords = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w))
  const keywords = [...titleWords.slice(0, 2)]
  const contextMap: Record<string, string> = {
    'buying-leads': 'sales', 'lead-management': 'office',
    'sales-process': 'business', 'crm-systems': 'technology',
  }
  const ctx = contextMap[category.toLowerCase()] || 'business'
  if (!keywords.includes(ctx)) keywords.push(ctx)
  keywords.push('people', 'professional')
  return keywords.join(' ')
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)
}

main().catch(console.error)
