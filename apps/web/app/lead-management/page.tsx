import type { Metadata } from 'next'
import { Hero, ArticleCard, CTASection } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Lead Management',
  description:
    'Master lead management with our comprehensive guides on buying leads, data cleaning, email sequences, list building, and call campaigns.',
  openGraph: {
    title: 'Lead Management | How To Work Leads',
    description:
      'Master lead management with our comprehensive guides on buying leads, data cleaning, email sequences, list building, and call campaigns.',
  },
}

const articles = [
  {
    title: 'Buying Leads: The Complete Guide',
    description:
      'Learn how to evaluate lead vendors, negotiate pricing, and ensure you\'re getting quality leads that convert.',
    href: '/lead-management/buying-leads',
    category: 'Lead Management',
  },
  {
    title: 'Cleaning and Verifying Consumer Data',
    description:
      'Essential techniques for data hygiene, verification services, and maintaining accurate lead information.',
    href: '/lead-management/cleaning-verifying-data',
    category: 'Lead Management',
  },
  {
    title: 'Email Sequences to Engage Leads',
    description:
      'Build automated email sequences that nurture leads through your sales funnel and boost conversions.',
    href: '/lead-management/email-sequences',
    category: 'Lead Management',
  },
  {
    title: 'Building Your Email List',
    description:
      'Strategies for growing a high-quality email list that generates consistent sales opportunities.',
    href: '/lead-management/building-email-list',
    category: 'Lead Management',
  },
  {
    title: 'Effective Call Campaigns',
    description:
      'Proven phone strategies for reaching leads at the right time with the right message.',
    href: '/lead-management/effective-call-campaigns',
    category: 'Lead Management',
  },
]

const breadcrumbs = [{ label: 'Lead Management' }]

export default function LeadManagementPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />

      <Hero
        headline="Lead Management"
        subheadline="Everything you need to organize, nurture, and convert your internet leads into paying customers."
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="prose-custom mb-12 max-w-3xl">
          <p className="text-lg text-gray-600">
            Effective lead management is the foundation of any successful sales operation.
            Whether you&apos;re working with fresh real-time leads or nurturing aged prospects,
            having the right systems and processes in place can dramatically improve your
            conversion rates and ROI.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.href}
              title={article.title}
              description={article.description}
              href={article.href}
              category={article.category}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <CTASection
            headline="Ready to Master Your Sales Process?"
            description="Learn how to work leads effectively with our complete sales process guides."
            ctaText="Explore Sales Process"
            ctaLink="/sales-process"
            variant="secondary"
          />
        </div>
      </div>
    </>
  )
}
