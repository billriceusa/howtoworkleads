import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend lazily to avoid build errors when API key is not set
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

// Lead type labels for email display
const LEAD_TYPE_LABELS: Record<string, string> = {
  'life-insurance': 'Life Insurance',
  'health-insurance': 'Health Insurance',
  'auto-insurance': 'Auto Insurance',
  'home-insurance': 'Homeowner Insurance',
  'mortgage': 'Mortgage/Refinance',
  'solar': 'Solar Installation',
  'final-expense': 'Final Expense',
  'medicare': 'Medicare',
  'annuity': 'Annuity',
  'other': 'Other',
}

// Lead age labels
const LEAD_AGE_LABELS: Record<string, string> = {
  '0-30': '0-30 days (Fresh)',
  '31-60': '31-60 days (Recent)',
  '61-90': '61-90 days (Aged)',
  '91-180': '91-180 days (Well-aged)',
  '180+': '180+ days (Deeply aged)',
  'any': 'Any age',
}

// Quantity labels
const QUANTITY_LABELS: Record<string, string> = {
  '100-500': '100-500 leads',
  '500-1000': '500-1,000 leads',
  '1000-5000': '1,000-5,000 leads',
  '5000-10000': '5,000-10,000 leads',
  '10000+': '10,000+ leads',
  'custom': 'Custom quantity',
}

interface LeadOrderFormData {
  leadTypes: string[]
  otherLeadType: string
  leadAge: string
  quantity: string
  customQuantity: string
  states: string[]
  allStates: boolean
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  additionalRequirements: string
  budget: string
  timeline: string
  howDidYouHear: string
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadOrderFormData = await request.json()

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required contact information' },
        { status: 400 }
      )
    }

    if (!data.leadTypes || data.leadTypes.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one lead type' },
        { status: 400 }
      )
    }

    // Format lead types for display
    const leadTypesDisplay = data.leadTypes
      .map(type => {
        if (type === 'other' && data.otherLeadType) {
          return `Other: ${data.otherLeadType}`
        }
        return LEAD_TYPE_LABELS[type] || type
      })
      .join(', ')

    // Format states for display
    const statesDisplay = data.allStates ? 'All States' : (data.states.length > 0 ? data.states.join(', ') : 'Not specified')

    // Format quantity for display
    const quantityDisplay = data.quantity === 'custom' ? data.customQuantity : (QUANTITY_LABELS[data.quantity] || data.quantity)

    // Get Resend client
    const resend = getResendClient()

    // Send confirmation email to the contact
    const confirmationEmail = await resend.emails.send({
      from: 'How To Work Leads <noreply@howtoworkleads.com>',
      to: [data.email],
      subject: 'Your Lead Request Has Been Received',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You, ${data.firstName}!</h1>
          </div>

          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 16px; margin-top: 0;">I just received your inquiry, and I'm taking a look at it.</p>

            <p style="font-size: 16px;">I'll contact you shortly with any questions or clarifications to help me find and broker the leads you are looking for.</p>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e2e8f0;">
              <h2 style="font-size: 16px; margin-top: 0; color: #1e40af;">Your Request Summary:</h2>
              <ul style="padding-left: 20px; margin: 0;">
                <li><strong>Lead Types:</strong> ${leadTypesDisplay}</li>
                <li><strong>Lead Age:</strong> ${LEAD_AGE_LABELS[data.leadAge] || data.leadAge}</li>
                <li><strong>Quantity:</strong> ${quantityDisplay}</li>
                <li><strong>States:</strong> ${statesDisplay}</li>
                ${data.budget ? `<li><strong>Budget:</strong> ${data.budget}</li>` : ''}
                ${data.timeline ? `<li><strong>Timeline:</strong> ${data.timeline}</li>` : ''}
              </ul>
            </div>

            <p style="font-size: 16px;">While you wait, check out our weekly newsletter for tips on converting more leads:</p>

            <div style="text-align: center; margin: 25px 0;">
              <a href="https://www.howtoworkleads.com/#newsletter"
                 style="display: inline-block; background: #FFD500; color: #000; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 16px;">
                Subscribe to The Aged Lead Playbook
              </a>
            </div>

            <p style="font-size: 16px; margin-bottom: 0;">Looking forward to helping you get the leads you need!</p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 14px; color: #64748b; margin: 0;">
                <strong>Bill Rice</strong><br>
                How To Work Leads<br>
                <a href="https://howtoworkleads.com" style="color: #1e40af;">howtoworkleads.com</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // Send notification email to Bill
    const notificationEmail = await resend.emails.send({
      from: 'How To Work Leads <noreply@howtoworkleads.com>',
      to: ['bill@billrice.com'],
      subject: `New Lead Request from ${data.firstName} ${data.lastName}`,
      replyTo: data.email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Lead Request</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
              From: ${data.firstName} ${data.lastName}
            </p>
          </div>

          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">

            <h2 style="font-size: 18px; color: #1e40af; margin-top: 0; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.firstName} ${data.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                  <a href="mailto:${data.email}" style="color: #1e40af;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                  <a href="tel:${data.phone}" style="color: #1e40af;">${data.phone}</a>
                </td>
              </tr>
              ${data.company ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Company:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.company}</td>
              </tr>
              ` : ''}
            </table>

            <h2 style="font-size: 18px; color: #1e40af; margin-top: 0; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">Lead Request Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Lead Types:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${leadTypesDisplay}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Lead Age:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${LEAD_AGE_LABELS[data.leadAge] || data.leadAge}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Quantity:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${quantityDisplay}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>States:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${statesDisplay}</td>
              </tr>
              ${data.budget ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Budget:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.budget}</td>
              </tr>
              ` : ''}
              ${data.timeline ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Timeline:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.timeline}</td>
              </tr>
              ` : ''}
              ${data.howDidYouHear ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>How they heard about us:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.howDidYouHear}</td>
              </tr>
              ` : ''}
            </table>

            ${data.additionalRequirements ? `
            <h2 style="font-size: 18px; color: #1e40af; margin-top: 0; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">Additional Requirements</h2>
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
              <p style="margin: 0; white-space: pre-wrap;">${data.additionalRequirements}</p>
            </div>
            ` : ''}

            <div style="text-align: center; margin: 25px 0;">
              <a href="mailto:${data.email}"
                 style="display: inline-block; background: #1e40af; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-right: 10px;">
                Reply to ${data.firstName}
              </a>
              <a href="tel:${data.phone}"
                 style="display: inline-block; background: #16a34a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Call ${data.firstName}
              </a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="font-size: 12px; color: #64748b; margin: 0;">
                This lead request was submitted via howtoworkleads.com/lead-order
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    console.log('Confirmation email sent:', confirmationEmail)
    console.log('Notification email sent:', notificationEmail)

    return NextResponse.json({
      success: true,
      message: 'Lead request submitted successfully',
    })
  } catch (error) {
    console.error('Error processing lead order:', error)

    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    )
  }
}
