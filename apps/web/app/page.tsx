import Link from 'next/link'
import { Button, Card, CardTitle, CardDescription } from '@/components/ui'
import { Hero, NewsletterForm, FeatureCard, ArticleCard } from '@/components/content'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo'

const categories = [
  {
    title: 'Lead Management',
    description: 'Master the art of organizing, tracking, and nurturing your internet leads for maximum conversions.',
    href: '/lead-management',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Sales Process',
    description: 'Proven strategies for working real-time and aged leads through effective sales sequences.',
    href: '/sales-process',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'CRM Systems',
    description: 'Build powerful sales systems using High Level, Close, and other top CRM platforms.',
    href: '/crm-systems',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
  },
  {
    title: 'Buying Leads',
    description: 'Expert guidance on purchasing quality leads including mortgage, insurance, and solar leads.',
    href: '/buying-leads',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const featuredArticles = [
  {
    title: 'How to Work Real-Time Leads',
    description: 'The complete guide to maximizing conversions from fresh, real-time internet leads.',
    href: '/sales-process/working-real-time-leads',
    category: 'Sales Process',
  },
  {
    title: 'Email Sequences That Convert',
    description: 'Build automated email sequences that nurture leads and drive sales.',
    href: '/lead-management/email-sequences',
    category: 'Lead Management',
  },
  {
    title: 'How to Buy Quality Leads',
    description: 'Everything you need to know about purchasing leads from vendors.',
    href: '/buying-leads/how-to-buy-leads',
    category: 'Buying Leads',
  },
]

const features = [
  {
    title: 'Proven Strategies',
    description: 'Battle-tested techniques from sales professionals who have converted thousands of leads.',
  },
  {
    title: 'Step-by-Step Guides',
    description: 'Easy to follow instructions that you can implement immediately in your sales process.',
  },
  {
    title: 'Industry Specific',
    description: 'Tailored advice for insurance, mortgage, solar, and other lead-driven industries.',
  },
]

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* Hero Section */}
      <Hero
        headline="Master the Art of Converting Internet Leads"
        subheadline="Proven strategies, expert guides, and practical tools to help sales professionals turn more leads into paying customers."
        ctaText="Start Learning"
        ctaLink="/lead-management"
        secondaryCtaText="Browse Resources"
        secondaryCtaLink="/buying-leads"
      />

      {/* Value Proposition */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="section-header">
            <h2 className="section-title">Why Sales Pros Trust Our Guides</h2>
            <p className="section-description">
              Everything you need to build a high-converting lead sales operation
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <svg
                    className="h-6 w-6 text-primary-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="section bg-gray-50">
        <div className="container-wide">
          <div className="section-header">
            <h2 className="section-title">Explore Our Resources</h2>
            <p className="section-description">
              Comprehensive guides organized by topic to help you succeed
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <FeatureCard
                key={category.title}
                title={category.title}
                description={category.description}
                href={category.href}
                icon={category.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="section-header">
            <h2 className="section-title">Popular Guides</h2>
            <p className="section-description">
              Start with our most-read articles on lead conversion
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.href}
                title={article.title}
                description={article.description}
                href={article.href}
                category={article.category}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/lead-management" variant="outline" size="lg">
              View All Guides
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section bg-primary-800 text-white">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Trusted by Sales Teams Everywhere
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
            Join thousands of sales professionals who use our strategies to increase their close rates and grow their revenue.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="text-4xl font-bold">10K+</div>
              <div className="mt-1 text-primary-200">Monthly Readers</div>
            </div>
            <div>
              <div className="text-4xl font-bold">50+</div>
              <div className="mt-1 text-primary-200">In-Depth Guides</div>
            </div>
            <div>
              <div className="text-4xl font-bold">15+</div>
              <div className="mt-1 text-primary-200">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section bg-white">
        <div className="container-narrow">
          <NewsletterForm
            title="Get Weekly Sales Tips"
            description="Join our newsletter for the latest strategies on converting internet leads into customers."
          />
        </div>
      </section>
    </>
  )
}
