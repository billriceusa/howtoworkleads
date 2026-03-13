import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero, CTASection } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { WebPageJsonLd } from '@/components/seo'
import { absoluteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Free Sales Tools',
  description:
    'Free interactive tools for sales professionals working internet leads. Calculate your aged lead ROI and verify compliance before your next campaign.',
  alternates: {
    canonical: 'https://www.howtoworkleads.com/tools',
  },
  openGraph: {
    title: 'Free Sales Tools | How To Work Leads',
    description:
      'Free interactive tools for sales professionals working internet leads. Calculate your aged lead ROI and verify compliance before your next campaign.',
    url: 'https://www.howtoworkleads.com/tools',
    siteName: 'How To Work Leads',
    type: 'website',
  },
}

const tools = [
  {
    title: 'Aged Lead ROI Calculator',
    description:
      'Enter your industry, lead cost, and close rate to instantly see expected revenue, cost per acquisition, and break-even point on aged leads.',
    href: '/tools/aged-lead-roi-calculator',
  },
  {
    title: 'Lead Compliance Checklist',
    description:
      'Interactive checklist covering TCPA, DNC, CAN-SPAM, and industry-specific requirements. Check every box before your next lead campaign.',
    href: '/tools/compliance-checklist',
  },
]

export default function ToolsPage() {
  const breadcrumbs = [{ label: 'Tools' }]
  const pageUrl = absoluteUrl('/tools')

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Sales Tools',
    description:
      'Interactive tools for sales professionals working internet leads.',
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.title,
      url: absoluteUrl(tool.href),
    })),
  }

  return (
    <>
      <WebPageJsonLd
        title="Free Sales Tools"
        description="Interactive tools for sales professionals working internet leads."
        url={pageUrl}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <BreadcrumbsJsonLd items={breadcrumbs} />

      <Hero
        headline="Free Sales Tools"
        subheadline="Interactive calculators and checklists to help you work leads smarter"
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="grid gap-8 md:grid-cols-2">
          {tools.map((tool) => (
            <article
              key={tool.href}
              className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-800 transition-colors">
                <Link href={tool.href}>
                  <span className="absolute inset-0" />
                  {tool.title}
                </Link>
              </h2>
              <p className="mt-3 text-gray-600">{tool.description}</p>
              <span className="mt-4 text-sm font-medium text-primary-800">
                Try it free &rarr;
              </span>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <CTASection
            headline="Hit your Sales and Revenue Goals, Every Month"
            features={[
              'Stop worrying about leads. Buy them on demand.',
              'Learn to convert any lead with proper lead management.',
              'Build and nurture a huge database into an endless stream of leads.',
            ]}
            ctaText="Buy Aged Leads"
            ctaLink="https://agedleadstore.com/all-lead-types/"
            secondaryCtaText="Subscribe to The Lead Brief"
            secondaryCtaLink="#newsletter"
            downloadText="Free Guide: How to Work Consumer Data"
            downloadLink="https://drive.google.com/file/d/1mWhf4A7Ne_oCPoXaXnyBs_pWWDhe9zB1/view?usp=sharing"
            utmCampaign="tools-index-bottom"
            variant="primary"
          />
        </div>
      </div>
    </>
  )
}
