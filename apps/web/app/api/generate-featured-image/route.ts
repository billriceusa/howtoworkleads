import { NextRequest, NextResponse } from 'next/server'
import { generateAndUploadFeaturedImage, patchDocumentImage, writeClient } from '@/lib/featured-image'
import crypto from 'crypto'

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

/**
 * POST /api/generate-featured-image
 *
 * Triggered by Sanity webhook when a landingPage or blogPost is created/updated
 * without an ogImage/mainImage. Fetches a branded photo from Unsplash and
 * uploads it back to Sanity.
 *
 * Also supports manual invocation with Bearer token auth:
 *   curl -X POST /api/generate-featured-image \
 *     -H "Authorization: Bearer $SANITY_WEBHOOK_SECRET" \
 *     -H "Content-Type: application/json" \
 *     -d '{"_id":"abc","_type":"landingPage","title":"...","category":"buying-leads"}'
 */
export async function POST(req: NextRequest) {
  // Verify webhook signature or Bearer token
  const signature = req.headers.get('sanity-webhook-signature')
  const authHeader = req.headers.get('authorization')

  const bodyText = await req.text()

  if (signature && WEBHOOK_SECRET) {
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET)
    hmac.update(bodyText)
    const expectedSig = hmac.digest('hex')
    if (signature !== expectedSig) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  } else if (authHeader?.startsWith('Bearer ') && WEBHOOK_SECRET) {
    if (authHeader.slice(7) !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
  } else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = JSON.parse(bodyText)
  const { _id, _type, title } = body

  if (!_id || !title) {
    return NextResponse.json({ error: 'Missing _id or title' }, { status: 400 })
  }

  // Determine category from document or payload
  let category = body.category || ''
  if (!category && _type === 'landingPage') {
    // Fetch from Sanity
    const doc = await writeClient.fetch(
      `*[_id == $id][0]{ "category": category->slug.current }`,
      { id: _id }
    )
    category = doc?.category || 'business'
  }

  // Determine the image field name
  const fieldName = _type === 'blogPost' ? 'mainImage' : 'ogImage'

  // Check if image already exists
  const existing = await writeClient.fetch(
    `*[_id == $id][0]{ "${fieldName}": ${fieldName}.asset._ref }`,
    { id: _id }
  )
  if (existing?.[fieldName]) {
    return NextResponse.json({ message: 'Image already exists', skipped: true })
  }

  console.log(`Generating featured image for "${title}" (${_type})...`)

  const outcome = await generateAndUploadFeaturedImage(title, category)
  if (outcome.status !== 'created') {
    return NextResponse.json(
      {
        error: `Failed to generate image: ${outcome.reason}${outcome.detail ? ` — ${outcome.detail}` : ''}`,
      },
      { status: outcome.reason === 'rate-limited' ? 429 : 500 }
    )
  }

  // Patch the document
  await patchDocumentImage(_id, outcome.assetId, title, fieldName)

  return NextResponse.json({
    success: true,
    assetId: outcome.assetId,
    assetUrl: outcome.url,
    photographer: outcome.photographer,
  })
}
