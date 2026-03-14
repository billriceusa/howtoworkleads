import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Downloads — Scripts, Templates & Tools',
  description:
    'Free downloadable resources for working aged leads. Scripts, follow-up cadences, vendor scorecards, and quick-start kits for insurance and mortgage professionals.',
  alternates: {
    canonical: 'https://www.howtoworkleads.com/downloads',
  },
}

const DOWNLOADS = [
  {
    slug: 'aged-lead-quick-start-kit',
    title: 'Aged Lead Quick-Start Kit',
    description:
      'One-page guide with scripts, a follow-up cadence, and vendor selection checklist to get started with aged leads today.',
    tag: 'Getting Started',
  },
  {
    slug: '7-day-follow-up-cadence',
    title: '7-Day Follow-Up Cadence',
    description:
      'Day-by-day multi-channel plan (phone, text, email) with scripts for each touchpoint. Insurance and mortgage versions included.',
    tag: 'Follow-Up',
  },
  {
    slug: 'insurance-lead-scripts-bundle',
    title: 'Insurance Lead Scripts Bundle',
    description:
      '15+ scripts for phone, voicemail, text, and email across life, Medicare, auto, and final expense verticals.',
    tag: 'Insurance',
  },
  {
    slug: 'mortgage-lead-scripts-bundle',
    title: 'Mortgage Lead Scripts Bundle',
    description:
      '15+ scripts for loan officers covering purchase, refinance, HELOC, non-QM, and DSCR scenarios.',
    tag: 'Mortgage',
  },
  {
    slug: 'lead-vendor-comparison-scorecard',
    title: 'Lead Vendor Comparison Scorecard',
    description:
      '10-criteria scoring framework to evaluate and compare aged lead providers before you buy.',
    tag: 'Vendor Selection',
  },
]

export default function DownloadsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Free Resources
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-black sm:text-4xl">
            Downloads
          </h1>
          <p className="mt-4 text-lg text-secondary-600">
            Scripts, templates, and tools to help you convert more aged leads.
            Enter your email to download — free, no strings attached.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {DOWNLOADS.map((dl) => (
            <Link
              key={dl.slug}
              href={`/downloads/${dl.slug}`}
              className="group block border border-secondary-200 p-6 transition-colors hover:border-brand-yellow"
            >
              <span className="inline-block bg-secondary-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-secondary-500">
                {dl.tag}
              </span>
              <h2 className="mt-3 font-serif text-lg font-bold text-black group-hover:text-brand-yellow">
                {dl.title}
              </h2>
              <p className="mt-2 text-sm text-secondary-600">
                {dl.description}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-black underline underline-offset-4">
                Download Free
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
