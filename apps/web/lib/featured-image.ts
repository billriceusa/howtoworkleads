/**
 * Featured Image Generator for HowToWorkLeads
 *
 * Fetches a relevant photograph (with people) from Unsplash, applies the HTWL
 * brand treatment (grayscale + yellow duotone tint + white dot grid + yellow accent),
 * and uploads the result to Sanity as a featured image / OG image.
 */
import type Sharp from 'sharp'
import { createClient } from 'next-sanity'

async function getSharp(): Promise<typeof Sharp> {
  const mod = await import('sharp')
  return mod.default
}


const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY!
const IMAGE_WIDTH = 1200
const IMAGE_HEIGHT = 630

// Write-capable Sanity client for uploading images
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// ── Unsplash search ──────────────────────────────────────────────────
interface UnsplashPhoto {
  id: string
  urls: { raw: string; regular: string }
  user: { name: string; links: { html: string } }
  links: { download_location: string }
  description: string | null
  alt_description: string | null
  tags?: Array<{ title: string }>
}

/**
 * Search Unsplash for professional photographs featuring people.
 * Fetches multiple candidates, scores each, returns the best match.
 */
export async function searchUnsplash(query: string): Promise<UnsplashPhoto | null> {
  const url = new URL('https://api.unsplash.com/search/photos')
  url.searchParams.set('query', query)
  url.searchParams.set('per_page', '20')
  url.searchParams.set('orientation', 'landscape')
  url.searchParams.set('content_filter', 'high')

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  })

  if (!res.ok) {
    console.error(`Unsplash API error: ${res.status} ${res.statusText}`)
    return null
  }

  const data = await res.json()
  const photos = (data.results || []) as UnsplashPhoto[]

  if (photos.length === 0) return null

  const scored = photos.map((photo) => ({
    photo,
    score: scorePhoto(photo),
  }))

  scored.sort((a, b) => b.score - a.score)

  const best = scored[0].photo
  console.log(`  Selected photo score: ${scored[0].score} (of ${photos.length} candidates)`)

  // Trigger Unsplash download endpoint (required by API guidelines)
  fetch(best.links.download_location, {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  }).catch(() => {})

  return best
}

/**
 * Score a photo for quality and relevance.
 * We want: real photographs of people in professional/sales/business settings.
 * We don't want: graphics, text overlays, flat illustrations, screenshots.
 */
function scorePhoto(photo: UnsplashPhoto): number {
  let score = 0
  const text = [
    photo.description || '',
    photo.alt_description || '',
    ...(photo.tags?.map((t) => t.title) || []),
  ]
    .join(' ')
    .toLowerCase()

  // Boost: people-related keywords
  const peopleWords = [
    'person', 'people', 'woman', 'man', 'team', 'group', 'meeting',
    'professional', 'business', 'office', 'working', 'conference',
    'entrepreneur', 'executive', 'colleague', 'coworker', 'handshake',
    'laptop', 'desk', 'suit', 'portrait', 'discussion', 'collaboration',
    'sales', 'phone', 'call', 'agent', 'insurance', 'mortgage',
  ]
  for (const word of peopleWords) {
    if (text.includes(word)) score += 3
  }

  // Boost: professional/business environment
  const proWords = [
    'corporate', 'workplace', 'startup', 'boardroom', 'presentation',
    'strategy', 'finance', 'technology', 'modern', 'consulting',
  ]
  for (const word of proWords) {
    if (text.includes(word)) score += 2
  }

  // Penalize: graphics, text, illustrations, screenshots
  const penaltyWords = [
    'illustration', 'icon', 'graphic', 'vector', 'flat', 'cartoon',
    'text', 'letter', 'word', 'typography', 'font', 'sign', 'logo',
    'screenshot', 'screen', 'mockup', 'template', 'banner', 'poster',
    'abstract', 'pattern', 'texture', 'background', 'wallpaper',
    'drawing', 'sketch', 'clipart', 'infographic', 'diagram', 'chart',
  ]
  for (const word of penaltyWords) {
    if (text.includes(word)) score -= 5
  }

  // Boost if alt_description mentions a person directly
  const alt = (photo.alt_description || '').toLowerCase()
  if (/\b(man|woman|person|people|team|group)\b/.test(alt)) {
    score += 5
  }

  return score
}

/** Download an image from a URL and return it as a Buffer. */
async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download image: ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

// ── Brand overlay generation (HTWL: yellow/black brand) ──────────────

/** Create the white dot grid pattern as an SVG buffer. */
function createDotGrid(width: number, height: number): Buffer {
  const dotRadius = 3
  const spacingX = 36
  const spacingY = 36
  const startY = Math.floor(height * 0.4)

  const circles: string[] = []
  for (let y = startY; y < height; y += spacingY) {
    for (let x = 18; x < width; x += spacingX) {
      circles.push(`<circle cx="${x}" cy="${y}" r="${dotRadius}" fill="white" opacity="0.6"/>`)
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    ${circles.join('\n')}
  </svg>`

  return Buffer.from(svg)
}

/** Create the brand yellow accent rectangle overlay. */
function createYellowAccent(width: number, height: number): Buffer {
  const rectW = Math.floor(width * 0.3)
  const rectH = Math.floor(height * 0.4)
  const rectX = Math.floor(width * 0.6)
  const rectY = Math.floor(height * 0.03)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect x="${rectX}" y="${rectY}" width="${rectW}" height="${rectH}"
          rx="0" fill="#FFD500" opacity="0.3"/>
  </svg>`

  return Buffer.from(svg)
}

// ── Main pipeline ────────────────────────────────────────────────────

/**
 * Generate a branded featured image.
 *
 * 1. Search Unsplash for professional photographs with people
 * 2. Resize to 1200x630 (OG image standard)
 * 3. Apply yellow duotone tint (grayscale -> yellow colorize)
 * 4. Composite white dot grid + yellow accent rectangle
 * 5. Return the final image buffer (JPEG)
 */
export async function generateBrandedImage(searchQuery: string): Promise<{
  buffer: Buffer
  credit: { name: string; url: string } | null
} | null> {
  const photo = await searchUnsplash(searchQuery)
  if (!photo) return null

  // Download at optimal size, crop to faces
  const downloadUrl = `${photo.urls.raw}&w=${IMAGE_WIDTH}&h=${IMAGE_HEIGHT}&fit=crop&crop=faces,center&q=80`
  const rawBuffer = await downloadImage(downloadUrl)

  // Process: resize -> grayscale -> yellow tint -> composites
  const sharp = await getSharp()
  const base = sharp(rawBuffer)
    .resize(IMAGE_WIDTH, IMAGE_HEIGHT, { fit: 'cover', position: 'centre' })
    .grayscale()
    .tint({ r: 210, g: 180, b: 0 }) // HTWL yellow-gold tint

  const dotGrid = createDotGrid(IMAGE_WIDTH, IMAGE_HEIGHT)
  const yellowAccent = createYellowAccent(IMAGE_WIDTH, IMAGE_HEIGHT)

  const buffer = await base
    .composite([
      { input: yellowAccent, blend: 'over' },
      { input: dotGrid, blend: 'over' },
    ])
    .jpeg({ quality: 85 })
    .toBuffer()

  return {
    buffer,
    credit: { name: photo.user.name, url: photo.user.links.html },
  }
}

/**
 * Generate a branded featured image and upload it to Sanity.
 * Returns the Sanity image asset document, or null on failure.
 */
export async function generateAndUploadFeaturedImage(
  title: string,
  category: string,
): Promise<{ _id: string; url: string } | null> {
  const searchQuery = buildSearchQuery(title, category)
  console.log(`  Unsplash query: "${searchQuery}"`)

  const result = await generateBrandedImage(searchQuery)
  if (!result) {
    console.error(`  No Unsplash result for "${searchQuery}"`)
    return null
  }

  // Upload to Sanity
  const asset = await writeClient.assets.upload('image', result.buffer, {
    filename: `featured-${slugify(title)}.jpg`,
    contentType: 'image/jpeg',
  })

  if (result.credit) {
    console.log(`  Photo credit: ${result.credit.name} (${result.credit.url})`)
  }

  return { _id: asset._id, url: asset.url }
}

/**
 * Patch a Sanity document to set its ogImage (for landing pages) or mainImage (for blog posts).
 */
export async function patchDocumentImage(
  docId: string,
  assetId: string,
  altText: string,
  fieldName: 'ogImage' | 'mainImage' = 'ogImage',
): Promise<void> {
  await writeClient
    .patch(docId)
    .set({
      [fieldName]: {
        _type: 'image',
        alt: altText,
        asset: { _type: 'reference', _ref: assetId },
      },
    })
    .commit()
}

// ── Helpers ──────────────────────────────────────────────────────────

/**
 * Build an Unsplash search query from page title and category.
 * Always includes "people professional" to bias toward photographs
 * of real people in business/professional settings.
 */
function buildSearchQuery(title: string, category: string): string {
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'how', 'what', 'why', 'when', 'who', 'which', 'that', 'this', 'your',
    'their', 'should', 'about', 'into', 'through', 'during', 'before',
    'after', 'above', 'below', 'between', 'same', 'than', 'too', 'very',
    'can', 'will', 'just', 'don', 'should', 'now', 'also', 'do', 'does',
    'buy', 'buying', 'complete', 'guide', 'best', 'top',
  ])

  const titleWords = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w))

  const keywords = [...titleWords.slice(0, 2)]

  // Add category-specific context
  const categoryContextMap: Record<string, string> = {
    'buying-leads': 'sales',
    'lead-management': 'office',
    'sales-process': 'business',
    'crm-systems': 'technology',
    'aged-leads': 'sales',
  }
  const contextWord = categoryContextMap[category.toLowerCase()] || 'business'
  if (!keywords.includes(contextWord)) keywords.push(contextWord)

  keywords.push('people', 'professional')

  return keywords.join(' ')
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}
