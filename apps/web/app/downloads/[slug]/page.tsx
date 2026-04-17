import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DownloadForm } from './DownloadForm'

interface LeadMagnet {
  title: string
  description: string
  benefits: string[]
  file: string
}

const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  'aged-lead-quick-start-kit': {
    title: 'The Aged Lead Quick-Start Kit',
    description:
      'Your one-page guide to turning aged leads into closed deals. Includes phone scripts, a day-by-day follow-up cadence, and the exact framework top producers use to convert 80-95% cheaper leads.',
    benefits: [
      '3 proven phone scripts that get callbacks',
      'Day-by-day follow-up cadence for your first week',
      'Vendor selection checklist so you buy the right leads',
      'ROI benchmarks by vertical (insurance, mortgage, solar)',
    ],
    file: '/downloads/aged-lead-quick-start-kit.pdf',
  },
  '7-day-follow-up-cadence': {
    title: 'The 7-Day Follow-Up Cadence',
    description:
      'A day-by-day multi-channel plan (phone, text, email) to convert aged leads into appointments. Includes insurance and mortgage versions with ready-to-use scripts for each touchpoint.',
    benefits: [
      'Complete 7-day cadence with phone, text, and email scripts',
      'Insurance version and mortgage version included',
      'Specific timing recommendations for each day',
      'Objection handling for common pushbacks',
    ],
    file: '/downloads/7-day-follow-up-cadence.pdf',
  },
  'insurance-lead-scripts-bundle': {
    title: 'Insurance Lead Scripts Bundle',
    description:
      '15+ ready-to-use scripts for phone, voicemail, text, and email — built specifically for agents working aged insurance leads across life, Medicare, auto, and final expense verticals.',
    benefits: [
      '15+ scripts across phone, voicemail, text, and email',
      'Covers life, Medicare, auto, P&C, and final expense',
      'Cold call openers that stop the hang-up',
      'Objection handlers for "I already have coverage"',
    ],
    file: '/downloads/insurance-lead-scripts-bundle.pdf',
  },
  'mortgage-lead-scripts-bundle': {
    title: 'Mortgage Lead Scripts Bundle',
    description:
      '15+ ready-to-use scripts for loan officers working aged mortgage leads. Purchase, refinance, HELOC, non-QM, and DSCR scenarios covered with rate-specific language and compliance-safe phrasing.',
    benefits: [
      '15+ scripts for calls, voicemails, texts, and emails',
      'Purchase, refinance, HELOC, non-QM, and DSCR scenarios',
      'Rate-sensitive language that works in any market',
      'Compliance-safe phrasing for TCPA and DNC',
    ],
    file: '/downloads/mortgage-lead-scripts-bundle.pdf',
  },
  'lead-vendor-comparison-scorecard': {
    title: 'Lead Vendor Comparison Scorecard',
    description:
      'A systematic framework for evaluating aged lead providers. Score vendors across 10 criteria, compare side by side, and make a data-driven decision before you spend a dollar on leads.',
    benefits: [
      '10-criteria scoring framework for vendor evaluation',
      'Side-by-side comparison template for up to 4 vendors',
      'Red flag checklist to avoid low-quality providers',
      'Contract negotiation tips from experienced buyers',
    ],
    file: '/downloads/lead-vendor-comparison-scorecard.pdf',
  },
}

type Params = Promise<{ slug: string }>

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params
  const magnet = LEAD_MAGNETS[slug]
  if (!magnet) return {}

  return {
    title: `Free Download: ${magnet.title}`,
    description: magnet.description,
    alternates: {
      canonical: `https://howtoworkleads.com/downloads/${slug}`,
    },
    robots: { index: true, follow: true },
  }
}

export function generateStaticParams() {
  return Object.keys(LEAD_MAGNETS).map((slug) => ({ slug }))
}

export default async function DownloadPage({
  params,
}: {
  params: Params
}) {
  const { slug } = await params
  const magnet = LEAD_MAGNETS[slug]
  if (!magnet) notFound()

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Free Download
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-black sm:text-4xl">
            {magnet.title}
          </h1>
          <p className="mt-4 text-lg text-secondary-600">{magnet.description}</p>
        </div>

        {/* Benefits */}
        <div className="mt-10 bg-secondary-100 p-8">
          <h2 className="font-serif text-lg font-bold text-black">
            What you get:
          </h2>
          <ul className="mt-4 space-y-3">
            {magnet.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center bg-brand-yellow text-xs font-bold text-black">
                  {i + 1}
                </span>
                <span className="text-secondary-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Email capture form */}
        <div className="mt-10">
          <DownloadForm slug={slug} title={magnet.title} />
        </div>

        {/* Trust signals */}
        <p className="mt-6 text-center text-xs text-secondary-400">
          No spam, ever. You&apos;ll also get The Aged Lead Playbook — our
          weekly newsletter with strategies, scripts, and insider tips. Unsubscribe
          anytime.
        </p>
      </div>
    </div>
  )
}
