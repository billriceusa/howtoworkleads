import type { Metadata } from 'next'
import { Hero, ArticleCard, CTASection } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Buy Insurance Leads',
  description:
    'Complete guide to buying insurance leads including life insurance, IUL, auto insurance, and health insurance leads from quality vendors.',
  openGraph: {
    title: 'Buy Insurance Leads | How To Work Leads',
    description:
      'Complete guide to buying insurance leads including life insurance, IUL, auto insurance, and health insurance leads.',
  },
}

const insuranceTypes = [
  {
    title: 'Life Insurance Leads',
    description:
      'Find motivated prospects looking for life insurance coverage. Learn the best vendors and conversion strategies.',
    href: '/buying-leads/insurance-leads/life-insurance-leads',
    category: 'Insurance Leads',
  },
  {
    title: 'IUL Leads',
    description:
      'Connect with high-net-worth individuals interested in Indexed Universal Life insurance products.',
    href: '/buying-leads/insurance-leads/iul-leads',
    category: 'Insurance Leads',
  },
  {
    title: 'Auto Insurance Leads',
    description:
      'Purchase auto insurance leads from drivers shopping for new coverage or better rates.',
    href: '/buying-leads/insurance-leads/auto-insurance-leads',
    category: 'Insurance Leads',
  },
  {
    title: 'Health Insurance Leads',
    description:
      'Reach individuals and families looking for health insurance options and ACA marketplace plans.',
    href: '/buying-leads/insurance-leads/health-insurance-leads',
    category: 'Insurance Leads',
  },
]

const breadcrumbs = [
  { label: 'Buying Leads', href: '/buying-leads' },
  { label: 'Insurance Leads' },
]

export default function InsuranceLeadsPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />

      <Hero
        headline="Buy Insurance Leads"
        subheadline="Expert guidance on purchasing quality insurance leads across all major product lines."
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="prose-custom mb-12 max-w-3xl">
          <p className="text-lg text-gray-600">
            Insurance leads are one of the most competitive lead types on the market.
            Understanding the differences between lead sources, exclusive vs. shared leads,
            and proper follow-up techniques is essential for maintaining a profitable
            cost-per-acquisition.
          </p>
        </div>

        {/* Insurance Types Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {insuranceTypes.map((article) => (
            <ArticleCard
              key={article.href}
              title={article.title}
              description={article.description}
              href={article.href}
              category={article.category}
            />
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 rounded-xl border border-primary-200 bg-primary-50 p-6">
          <h3 className="text-lg font-semibold text-primary-900">
            Insurance Lead Buying Tips
          </h3>
          <ul className="mt-4 space-y-2 text-primary-800">
            <li className="flex items-start">
              <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Start with exclusive leads if budget allows - they convert 2-3x better than shared</span>
            </li>
            <li className="flex items-start">
              <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Always verify vendor compliance with state insurance regulations</span>
            </li>
            <li className="flex items-start">
              <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Track your metrics by lead source to identify your best performing vendors</span>
            </li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <CTASection
            headline="Need Help Evaluating Lead Vendors?"
            description="Use our lead buying checklist to ensure you're getting quality leads at fair prices."
            ctaText="Download Checklist"
            ctaLink="/buying-leads/lead-buying-checklist"
            variant="secondary"
          />
        </div>
      </div>
    </>
  )
}
