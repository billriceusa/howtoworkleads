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

/** Distinguish 403/429 rate-limit responses from genuine empty results. */
export class UnsplashRateLimitError extends Error {
  status: number
  constructor(status: number) {
    super(`Unsplash rate limited (HTTP ${status})`)
    this.status = status
  }
}

/**
 * Search Unsplash for professional photographs featuring people.
 * Fetches multiple candidates, scores each, returns the best match.
 *
 * Throws UnsplashRateLimitError on 403/429 so callers can distinguish
 * rate-limiting from empty results. Accepts excludePhotoIds for batch
 * dedup (e.g. cron publishing 3 articles in one run shouldn't get the
 * same top-ranked photo on every record).
 */
export async function searchUnsplash(
  query: string,
  excludePhotoIds: Set<string> = new Set(),
): Promise<UnsplashPhoto | null> {
  const url = new URL('https://api.unsplash.com/search/photos')
  url.searchParams.set('query', query)
  url.searchParams.set('per_page', '20')
  url.searchParams.set('orientation', 'landscape')
  url.searchParams.set('content_filter', 'high')

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  })

  if (res.status === 403 || res.status === 429) {
    throw new UnsplashRateLimitError(res.status)
  }
  if (!res.ok) {
    console.error(`Unsplash API error: ${res.status} ${res.statusText}`)
    return null
  }

  const data = await res.json()
  const photos = (data.results || []) as UnsplashPhoto[]

  if (photos.length === 0) return null

  const eligible = photos.filter((p) => !excludePhotoIds.has(p.id))
  // If everything is already used, fall back to the full set.
  const candidates = eligible.length > 0 ? eligible : photos

  const scored = candidates.map((photo) => ({
    photo,
    score: scorePhoto(photo),
  }))

  scored.sort((a, b) => b.score - a.score)

  const best = scored[0].photo
  console.log(`  Selected photo score: ${scored[0].score} (of ${candidates.length} candidates)`)

  // Trigger Unsplash download endpoint (required by API guidelines)
  fetch(best.links.download_location, {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  }).catch(() => {})

  return best
}

/**
 * One-retry wrapper. Retries once after delayMs on transient failures
 * (rate limits, 5xx, network blips). Doesn't retry on auth or
 * permanent errors.
 */
async function withRetry<T>(fn: () => Promise<T>, delayMs = 2000): Promise<T> {
  try {
    return await fn()
  } catch (e: unknown) {
    const err = e as Error & { status?: number }
    const isTransient =
      err instanceof UnsplashRateLimitError ||
      err.status === 429 ||
      (typeof err.status === 'number' && err.status >= 500) ||
      err.name === 'FetchError' ||
      err.message?.includes('ECONNRESET') ||
      err.message?.includes('ETIMEDOUT') ||
      err.message?.includes('network')

    if (!isTransient) throw e
    await new Promise((r) => setTimeout(r, delayMs))
    return await fn()
  }
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
export async function generateBrandedImage(
  searchQuery: string,
  excludePhotoIds: Set<string> = new Set(),
): Promise<{
  buffer: Buffer
  photoId: string
  credit: { name: string; url: string } | null
} | null> {
  const photo = await searchUnsplash(searchQuery, excludePhotoIds)
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
    photoId: photo.id,
    credit: { name: photo.user.name, url: photo.user.links.html },
  }
}

/**
 * Discriminated outcome type. Callers branch on `status` and, for skips,
 * on `reason`. The `photoId` returned with `created` lets a batch caller
 * add it to its dedup set so subsequent posts in the batch get a
 * different photo.
 */
export type FeaturedImageOutcome =
  | {
      status: 'created'
      assetId: string
      url: string
      photoId: string
      photographer: string
      photographerUrl: string | null
    }
  | {
      status: 'skipped'
      reason: 'no-key' | 'no-results' | 'rate-limited' | 'upload-failed'
      detail?: string
    }

export interface GenerateOptions {
  /** Photos already used in this batch — will be excluded from selection. */
  excludePhotoIds?: Set<string>
}

/**
 * Generate, brand, and upload a featured image to Sanity. Returns a
 * discriminated outcome instead of throwing on common failures so the
 * cron can log outcomes without breaking the publish flow.
 */
export async function generateAndUploadFeaturedImage(
  title: string,
  category: string,
  options: GenerateOptions = {},
): Promise<FeaturedImageOutcome> {
  if (!UNSPLASH_ACCESS_KEY) {
    return { status: 'skipped', reason: 'no-key' }
  }

  const exclude = options.excludePhotoIds || new Set<string>()
  const searchQuery = buildSearchQuery(title, category)
  console.log(`  Unsplash query: "${searchQuery}"`)

  let result: Awaited<ReturnType<typeof generateBrandedImage>> = null
  try {
    result = await withRetry(() => generateBrandedImage(searchQuery, exclude))

    // No results for the title-derived query (common for acronym-heavy or
    // unusual titles, e.g. "Cross-Channel Attribution"). Retry once with a
    // generic category query so the post still gets an on-brand photo
    // instead of shipping bare.
    if (!result) {
      const fallbackQuery = buildFallbackQuery(category)
      console.log(`  No results — retrying with fallback query: "${fallbackQuery}"`)
      result = await withRetry(() => generateBrandedImage(fallbackQuery, exclude))
    }
  } catch (e: unknown) {
    if (e instanceof UnsplashRateLimitError) {
      return { status: 'skipped', reason: 'rate-limited', detail: e.message }
    }
    return {
      status: 'skipped',
      reason: 'upload-failed',
      detail: (e as Error).message,
    }
  }

  if (!result) {
    return { status: 'skipped', reason: 'no-results' }
  }

  try {
    const asset = await withRetry(() =>
      writeClient.assets.upload('image', result.buffer, {
        filename: `featured-${slugify(title)}.jpg`,
        contentType: 'image/jpeg',
      }),
    )

    if (result.credit) {
      console.log(`  Photo credit: ${result.credit.name} (${result.credit.url})`)
    }

    return {
      status: 'created',
      assetId: asset._id,
      url: asset.url,
      photoId: result.photoId,
      photographer: result.credit?.name || 'Unsplash',
      photographerUrl: result.credit?.url || null,
    }
  } catch (e: unknown) {
    return {
      status: 'skipped',
      reason: 'upload-failed',
      detail: (e as Error).message,
    }
  }
}

/** Unsplash attribution + source identity persisted alongside the image. */
export interface ImageCredit {
  photoId?: string
  photographer?: string
  photographerUrl?: string | null
}

/**
 * Patch a Sanity document to set its ogImage (for landing pages) or mainImage (for blog posts).
 * When `credit` is provided, the Unsplash photographer + photo ID are stored on the
 * image object — satisfying Unsplash's attribution requirement and enabling cross-run dedup.
 */
export async function patchDocumentImage(
  docId: string,
  assetId: string,
  altText: string,
  fieldName: 'ogImage' | 'mainImage' = 'ogImage',
  credit?: ImageCredit,
): Promise<void> {
  await writeClient
    .patch(docId)
    .set({
      [fieldName]: {
        _type: 'image',
        alt: altText,
        asset: { _type: 'reference', _ref: assetId },
        ...(credit?.photographer ? { photographer: credit.photographer } : {}),
        ...(credit?.photographerUrl ? { photographerUrl: credit.photographerUrl } : {}),
        ...(credit?.photoId ? { unsplashId: credit.photoId } : {}),
      },
    })
    .commit()
}

/**
 * Fetch Unsplash photo IDs already used across recent posts/pages so a new
 * run can avoid re-selecting the same stock photo. Best-effort: returns an
 * empty set on any failure so it never blocks publishing.
 */
export async function getUsedPhotoIds(): Promise<Set<string>> {
  try {
    const ids = await writeClient.fetch<string[]>(
      `array::unique(
        *[
          _type in ["blogPost","landingPage"] &&
          (defined(mainImage.unsplashId) || defined(ogImage.unsplashId))
        ]{
          "id": coalesce(mainImage.unsplashId, ogImage.unsplashId)
        }.id
      )`,
    )
    return new Set((ids || []).filter(Boolean))
  } catch {
    return new Set<string>()
  }
}

// ── Helpers ──────────────────────────────────────────────────────────

/**
 * Industry acronyms and brand terms that don't surface relevant Unsplash
 * photos on their own. Expanded to broader english terms before query
 * construction so e.g. "DSCR" searches "realestate" instead of returning
 * nothing.
 */
const ACRONYM_EXPANSIONS: Record<string, string> = {
  nonqm: 'mortgage', dscr: 'realestate', heloc: 'home',
  iul: 'insurance', aca: 'health', ssdi: 'disability',
  tcpa: 'compliance', fcc: 'compliance', mva: 'accident',
  crm: 'office', sms: 'phone', salesforce: 'office',
  hubspot: 'office',
}

/** Category → generic context word. Shared by primary + fallback queries. */
const CATEGORY_CONTEXT_MAP: Record<string, string> = {
  'buying-leads': 'sales',
  'lead-management': 'office',
  'sales-process': 'business',
  'crm-systems': 'technology',
  'aged-leads': 'sales',
  'insurance-leads': 'insurance',
  'legal-leads': 'legal',
  'home-services-leads': 'construction',
}

/**
 * Build an Unsplash search query from page title and category.
 * Always includes "people professional" to bias toward photographs
 * of real people in business/professional settings. Acronyms are
 * expanded and bare numbers dropped so unusual title tokens don't
 * starve the search.
 */
export function buildSearchQuery(title: string, category: string): string {
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
    .map((w) => ACRONYM_EXPANSIONS[w] || w)
    .filter((w) => w.length > 2 && !stopWords.has(w) && !/^\d+$/.test(w))

  const keywords = [...titleWords.slice(0, 2)]

  const contextWord = CATEGORY_CONTEXT_MAP[category.toLowerCase()] || 'business'
  if (!keywords.includes(contextWord)) keywords.push(contextWord)

  keywords.push('people', 'professional')

  return keywords.join(' ')
}

/**
 * Generic, title-free query used when the primary query returns no
 * Unsplash results. Leans entirely on the category context so we still
 * attach a relevant on-brand photo rather than leaving the post bare.
 */
export function buildFallbackQuery(category: string): string {
  const ctx = CATEGORY_CONTEXT_MAP[category.toLowerCase()] || 'business'
  return `${ctx} office people professional`
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}
