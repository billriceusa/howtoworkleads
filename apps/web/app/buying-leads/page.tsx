import type { Metadata } from 'next'
import { Hero, ArticleCard, CTASection } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Buying Leads',
  description:
    'Complete guides on buying leads including aged leads, mortgage leads, insurance leads, solar leads, and more. Plus checklists and ROI calculators.',
  openGraph: {
    title: 'Buying Leads | How To Work Leads',
    description:
      'Complete guides on buying leads including aged leads, mortgage leads, insurance leads, solar leads, and more.',
  },
}

const leadTypeArticles = [
  {
    title: 'Buy Aged Leads',
    description:
      'How to evaluate and purchase aged leads that still convert at a fraction of the cost.',
    href: '/buying-leads/aged-leads',
    category: 'Buying Leads',
  },
  {
    title: 'Buy Mortgage Leads',
    description:
      'Find quality mortgage leads from reputable vendors and maximize your conversion rates.',
    href: '/buying-leads/mortgage-leads',
    category: 'Buying Leads',
  },
  {
    title: 'Buy Insurance Leads',
    description:
      'Comprehensive guide to purchasing life, health, auto, and IUL insurance leads.',
    href: '/buying-leads/insurance-leads',
    category: 'Buying Leads',
    badge: 'Hub Page',
  },
  {
    title: 'Buy Solar Leads',
    description:
      'Connect with homeowners interested in solar installations through quality lead sources.',
    href: '/buying-leads/solar-leads',
    category: 'Buying Leads',
  },
]

const resourceArticles = [
  {
    title: 'How to Buy Leads',
    description:
      'The complete beginner\'s guide to purchasing leads from vendors and marketplaces.',
    href: '/buying-leads/how-to-buy-leads',
    category: 'Guide',
  },
  {
    title: 'Lead Buying Checklist',
    description:
      'Essential checklist to evaluate lead vendors before making a purchase.',
    href: '/buying-leads/lead-buying-checklist',
    category: 'Resource',
  },
  {
    title: 'Lead ROI Calculator',
    description:
      'Calculate your expected return on investment before purchasing leads.',
    href: '/buying-leads/lead-roi-calculator',
    category: 'Tool',
  },
  {
    title: 'Compliance Checklist',
    description:
      'Stay compliant with TCPA, DNC, and other regulations when purchasing and contacting leads.',
    href: '/buying-leads/compliance-checklist',
    category: 'Resource',
  },
]

const breadcrumbs = [{ label: 'Buying Leads' }]

export default function BuyingLeadsPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />

      <Hero
        headline="Buying Leads"
        subheadline="Expert guidance on purchasing quality leads that convert into sales."
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="prose-custom mb-12 max-w-3xl">
          <p className="text-lg text-gray-600">
            Purchasing leads is one of the fastest ways to fill your pipeline, but it&apos;s
            crucial to know what you&apos;re buying. Our guides help you evaluate vendors,
            understand pricing, and maximize your ROI on lead purchases.
          </p>
        </div>

        {/* Lead Types Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Lead Types</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {leadTypeArticles.map((article) => (
              <div key={article.href} className="relative">
                {article.badge && (
                  <div className="absolute -top-2 right-4 z-10">
                    <Badge variant="accent">{article.badge}</Badge>
                  </div>
                )}
                <ArticleCard
                  title={article.title}
                  description={article.description}
                  href={article.href}
                  category={article.category}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Resources & Tools</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {resourceArticles.map((article) => (
              <ArticleCard
                key={article.href}
                title={article.title}
                description={article.description}
                href={article.href}
                category={article.category}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          headline="New to Working Leads?"
          description="Start with our lead management fundamentals to maximize your conversion rates."
          ctaText="Lead Management Guide"
          ctaLink="/lead-management"
          variant="primary"
        />
      </div>
    </>
  )
}
