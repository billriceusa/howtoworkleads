import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getWelcomeEmail, FROM, REPLY_TO } from '@/lib/email/welcome-sequence'
import { isGoodOrigin, isHoneypotFilled, isGibberishName } from '@/lib/anti-spam'

// Resend Audience/Segment ID for newsletter subscribers
const NEWSLETTER_AUDIENCE_ID = '8a35228e-149f-4b15-8e24-26a24e3d6e98'

// Initialize Resend lazily to avoid build errors when API key is not set
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

interface NewsletterSubscribeData {
  email: string
  firstName?: string
  website?: string
}

export async function POST(request: NextRequest) {
  try {
    if (!isGoodOrigin(request)) {
      return NextResponse.json({ success: true })
    }

    const data: NewsletterSubscribeData = await request.json()

    if (isHoneypotFilled(data as unknown as Record<string, unknown>)) {
      return NextResponse.json({ success: true })
    }

    if (isGibberishName(data.firstName)) {
      return NextResponse.json({ success: true })
    }

    // Validate email
    if (!data.email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Get Resend client
    const resend = getResendClient()

    // Add contact to the newsletter audience
    const contact = await resend.contacts.create({
      email: data.email,
      unsubscribed: false,
      audienceId: NEWSLETTER_AUDIENCE_ID,
    })

    console.log('Newsletter subscription added:', contact)

    // Send welcome Email 1 (Day 0) immediately
    const welcome = getWelcomeEmail(0)
    await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: [data.email],
      subject: welcome.subject,
      html: welcome.html,
    })

    console.log('Welcome email sent to:', data.email)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to the newsletter',
    })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)

    // Check if it's a duplicate contact error from Resend
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed to our newsletter',
      })
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}
