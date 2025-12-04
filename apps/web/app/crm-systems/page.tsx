import type { Metadata } from 'next'
import { Hero, ArticleCard, CTASection } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'

export const metadata: Metadata = {
  title: 'CRM Systems',
  description:
    'Build powerful sales systems using High Level, Close, and other top CRM platforms. Learn setup, automation, and best practices.',
  openGraph: {
    title: 'CRM Systems | How To Work Leads',
    description:
      'Build powerful sales systems using High Level, Close, and other top CRM platforms.',
  },
}

const articles = [
  {
    title: 'Using High Level or Close to Build Your Sales System',
    description:
      'Step-by-step guide to setting up and optimizing High Level or Close CRM for lead management and sales automation.',
    href: '/crm-systems/highlevel-close-sales-system',
    category: 'CRM Systems',
  },
]

const breadcrumbs = [{ label: 'CRM Systems' }]

export default function CRMSystemsPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />

      <Hero
        headline="CRM Systems"
        subheadline="Build and optimize your sales system with the right CRM tools and automation."
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="prose-custom mb-12 max-w-3xl">
          <p className="text-lg text-gray-600">
            The right CRM system can transform your sales operation. Learn how to leverage
            platforms like High Level and Close to automate follow-ups, track leads,
            and close more deals with less effort.
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

        {/* Coming Soon Section */}
        <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900">More CRM Guides Coming Soon</h3>
          <p className="mt-2 text-gray-600">
            We&apos;re working on detailed guides for Salesforce, HubSpot, Pipedrive, and more.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <CTASection
            headline="Looking to Buy Quality Leads?"
            description="Explore our comprehensive guides on purchasing leads for mortgage, insurance, solar, and more."
            ctaText="Buying Leads Guide"
            ctaLink="/buying-leads"
            variant="accent"
          />
        </div>
      </div>
    </>
  )
}
