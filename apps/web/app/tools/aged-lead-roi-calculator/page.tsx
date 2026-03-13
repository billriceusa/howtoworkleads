import type { Metadata } from 'next'
import Link from 'next/link'
import { ROICalculator } from '@/components/tools/ROICalculator'
import { Hero, CTASection, NewsletterForm } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { FAQJsonLd, WebPageJsonLd } from '@/components/seo'
import { absoluteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Aged Lead ROI Calculator',
  description:
    'Calculate your ROI on aged leads instantly. Enter your industry, lead cost, and close rate to see expected revenue, CPA, and break-even point.',
  alternates: {
    canonical: 'https://www.howtoworkleads.com/tools/aged-lead-roi-calculator',
  },
  openGraph: {
    title: 'Aged Lead ROI Calculator | How To Work Leads',
    description:
      'Calculate your ROI on aged leads instantly. Enter your industry, lead cost, and close rate to see expected revenue, CPA, and break-even point.',
    url: 'https://www.howtoworkleads.com/tools/aged-lead-roi-calculator',
    siteName: 'How To Work Leads',
    type: 'website',
  },
}

const faqs = [
  {
    question: "What's a good ROI on aged leads?",
    answer:
      '200-500% ROI is common with a good system — meaning for every $1 you spend on aged leads, you generate $3-$6 in revenue. Some top-performing agents see 1,000%+ ROI. The key factors are your close rate, deal value, and cost per lead. Use the calculator above to see where you stand.',
  },
  {
    question: 'How accurate are these benchmarks?',
    answer:
      "The pre-filled values are industry averages based on data from major aged lead vendors and agent surveys. Your actual results will vary based on your scripts, follow-up cadence, CRM setup, and consistency. The benchmarks give you a realistic starting point — adjust the inputs to match your actual performance.",
  },
  {
    question: 'Why is my ROI negative?',
    answer:
      "A negative ROI usually means your close rate is too low or your average deal value is too small relative to your lead cost. Before blaming the leads, check your system: Are you completing your full follow-up cadence? Are your scripts optimized? Is your CRM automating touches? Most negative ROI is a system problem, not a lead quality problem.",
  },
]

const breadcrumbs = [
  { label: 'Tools', href: '/tools/aged-lead-roi-calculator' },
  { label: 'ROI Calculator' },
]

export default function ROICalculatorPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <WebPageJsonLd
        title="Aged Lead ROI Calculator"
        description="Calculate your ROI on aged leads instantly. Enter your industry, lead cost, and close rate to see expected revenue, CPA, and break-even point."
        url={absoluteUrl('/tools/aged-lead-roi-calculator')}
      />
      <FAQJsonLd faqs={faqs} />

      {/* SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Aged Lead ROI Calculator',
            description:
              'Free calculator to estimate your return on investment when buying aged leads. Includes industry benchmarks for insurance, mortgage, solar, and more.',
            url: absoluteUrl('/tools/aged-lead-roi-calculator'),
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            author: {
              '@type': 'Organization',
              name: 'HowToWorkLeads',
            },
          }),
        }}
      />

      <Hero
        headline="Aged Lead ROI Calculator"
        subheadline="Find out exactly how much revenue your aged lead investment could generate. Adjust the inputs to match your business, or use our industry benchmarks."
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="mx-auto max-w-5xl">
          {/* Calculator */}
          <ROICalculator />

          {/* Supporting Content */}
          <div className="prose-custom mt-16">
            <h2>How to Interpret Your Results</h2>
            <p>
              <strong>200%+ ROI is the target.</strong> This means for every $1 you invest in aged leads,
              you&apos;re generating $3 or more in revenue. Most agents with a working system — scripts,
              cadence, CRM — hit this range consistently.
            </p>
            <p>
              <strong>Cost per acquisition (CPA) matters more than cost per lead.</strong> A $3 lead that
              converts at 2% gives you a $150 CPA. A $0.50 lead that converts at 0.3% gives you a $167 CPA.
              Cheaper leads aren&apos;t always better — focus on the total cost to close a deal.
            </p>
            <p>
              <strong>The break-even insight:</strong> Even closing ONE deal from a batch of aged leads is
              often profitable. If your average commission is $1,000 and you spent $500 on 500 leads at $1
              each, one closed deal puts you $500 ahead. Everything after that is pure profit.
            </p>

            <h2>How to Improve Your Aged Lead ROI</h2>
            <p>
              <strong>Increase your close rate</strong> with better{' '}
              <Link href="/blog/aged-lead-scripts-templates">scripts</Link>, more follow-up touches through a{' '}
              <Link href="/blog/aged-lead-follow-up-cadence">proven cadence</Link>, and automated{' '}
              <Link href="/blog/aged-lead-email-drip-campaigns">email drip sequences</Link>.
            </p>
            <p>
              <strong>Decrease your cost per lead</strong> by buying in larger volumes (most vendors offer
              10-30% discounts), using slightly older leads (60-180 days instead of 30-60), or negotiating
              with your vendor. See our{' '}
              <Link href="/blog/aged-lead-pricing-guide">pricing guide</Link> for current rates.
            </p>
            <p>
              <strong>Increase your deal value</strong> through upsells, cross-sells, and bundled products.
              An insurance agent who sells a final expense policy AND an annuity on the same lead doubles
              their revenue per conversion.
            </p>
            <p>
              For the complete system, visit our{' '}
              <Link href="/aged-leads">aged leads resource hub</Link>.
            </p>

            <h2>FAQ</h2>
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-12">
            <NewsletterForm />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            headline="Ready to Test Your ROI? Get Aged Leads Now"
            features={[
              'DNC-scrubbed, compliant data across all major industries.',
              'No contracts — buy what you need, when you need it.',
              'Use your ROI numbers above to set your budget and volume.',
            ]}
            ctaText="Buy Aged Leads"
            ctaLink="https://agedleadstore.com/all-lead-types/"
            secondaryCtaText="Subscribe to The Lead Brief"
            secondaryCtaLink="#newsletter"
            utmCampaign="tools-roi-calculator-bottom"
            variant="primary"
          />
        </div>
      </div>
    </>
  )
}
