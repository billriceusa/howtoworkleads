import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getWelcomeEmail, FROM, REPLY_TO } from '@/lib/email/welcome-sequence'
import { isGoodOrigin, isHoneypotFilled, isGibberishName } from '@/lib/anti-spam'

const NEWSLETTER_AUDIENCE_ID = '8a35228e-149f-4b15-8e24-26a24e3d6e98'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

// Lead magnet definitions
const LEAD_MAGNETS: Record<string, { title: string; file: string }> = {
  'aged-lead-quick-start-kit': {
    title: 'Aged Lead Quick-Start Kit',
    file: '/downloads/aged-lead-quick-start-kit.pdf',
  },
  '7-day-follow-up-cadence': {
    title: '7-Day Follow-Up Cadence Template',
    file: '/downloads/7-day-follow-up-cadence.pdf',
  },
  'insurance-lead-scripts-bundle': {
    title: 'Insurance Lead Scripts Bundle',
    file: '/downloads/insurance-lead-scripts-bundle.pdf',
  },
  'mortgage-lead-scripts-bundle': {
    title: 'Mortgage Lead Scripts Bundle',
    file: '/downloads/mortgage-lead-scripts-bundle.pdf',
  },
  'lead-vendor-comparison-scorecard': {
    title: 'Lead Vendor Comparison Scorecard',
    file: '/downloads/lead-vendor-comparison-scorecard.pdf',
  },
}

export async function POST(request: NextRequest) {
  try {
    if (!isGoodOrigin(request)) {
      return NextResponse.json({ success: true })
    }

    const body = await request.json()

    if (isHoneypotFilled(body)) {
      return NextResponse.json({ success: true })
    }

    const { email, slug, firstName } = body

    if (isGibberishName(firstName)) {
      return NextResponse.json({ success: true })
    }

    if (!email || !slug) {
      return NextResponse.json(
        { error: 'Email and resource slug are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const magnet = LEAD_MAGNETS[slug]
    if (!magnet) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    // Subscribe to newsletter audience
    const resend = getResendClient()
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: NEWSLETTER_AUDIENCE_ID,
    })

    // Send welcome Email 1 (Day 0) immediately
    const welcome = getWelcomeEmail(0)
    await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: [email],
      subject: welcome.subject,
      html: welcome.html,
    })

    return NextResponse.json({
      success: true,
      downloadUrl: magnet.file,
      title: magnet.title,
    })
  } catch (error) {
    console.error('Error processing download:', error)

    // If already subscribed, still allow download
    if (error instanceof Error && error.message.includes('already exists')) {
      const { slug } = await request.clone().json()
      const magnet = LEAD_MAGNETS[slug]
      if (magnet) {
        return NextResponse.json({
          success: true,
          downloadUrl: magnet.file,
          title: magnet.title,
        })
      }
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
