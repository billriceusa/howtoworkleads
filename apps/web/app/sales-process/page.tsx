import type { Metadata } from 'next'
import { Hero, ArticleCard, CTASection } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Sales Process',
  description:
    'Proven sales process strategies for working real-time leads, warming aged leads, managing pipelines, and building omni-channel sequences.',
  openGraph: {
    title: 'Sales Process | How To Work Leads',
    description:
      'Proven sales process strategies for working real-time leads, warming aged leads, managing pipelines, and building omni-channel sequences.',
  },
}

const articles = [
  {
    title: 'How to Work Real-Time Leads',
    description:
      'Speed-to-lead strategies and best practices for maximizing conversions from fresh internet leads.',
    href: '/sales-process/working-real-time-leads',
    category: 'Sales Process',
  },
  {
    title: 'How to Warm Up Aged Leads',
    description:
      'Turn old leads into new opportunities with proven re-engagement strategies and sequences.',
    href: '/sales-process/warming-aged-leads',
    category: 'Sales Process',
  },
  {
    title: 'How to Manage Your Pipeline',
    description:
      'Pipeline management techniques that keep deals moving and prevent leads from falling through the cracks.',
    href: '/sales-process/managing-pipeline',
    category: 'Sales Process',
  },
  {
    title: 'Integrated Omni-Channel Sequences',
    description:
      'Build multi-touch sequences across email, phone, SMS, and social that actually convert.',
    href: '/sales-process/omni-channel-sequences',
    category: 'Sales Process',
  },
]

const breadcrumbs = [{ label: 'Sales Process' }]

export default function SalesProcessPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />

      <Hero
        headline="Sales Process"
        subheadline="Master the art of converting internet leads with proven sales strategies and sequences."
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="prose-custom mb-12 max-w-3xl">
          <p className="text-lg text-gray-600">
            A well-defined sales process is what separates top performers from average
            salespeople. Learn how to work different types of leads, build effective
            sequences, and manage your pipeline for consistent results.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2">
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
            headline="Need the Right CRM to Execute?"
            description="Learn how to set up powerful sales systems using High Level, Close, and other top platforms."
            ctaText="Explore CRM Systems"
            ctaLink="/crm-systems"
            variant="primary"
          />
        </div>
      </div>
    </>
  )
}
