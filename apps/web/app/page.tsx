import { sanityFetch } from '@/lib/sanity/client'
import { allCategoriesQuery } from '@/lib/sanity/queries'
import { Button } from '@/components/ui'
import { Hero, NewsletterForm, FeatureCard, ArticleCard } from '@/components/content'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo'

// Fetch categories from Sanity
async function getCategories() {
  const categories = await sanityFetch<any[]>(allCategoriesQuery)
  return categories || []
}

// Fetch featured articles (latest landing pages)
async function getFeaturedArticles() {
  const articles = await sanityFetch<any[]>(`
    *[_type == "landingPage"] | order(publishedAt desc) [0...3] {
      _id,
      title,
      seoDescription,
      slug,
      category-> {
        title,
        slug
      }
    }
  `)
  return articles || []
}

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  'lead-management': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  'sales-process': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  'crm-systems': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  'buying-leads': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

// Default icon for categories without a specific one
const defaultIcon = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
)

// Static fallback categories
const fallbackCategories = [
  {
    title: 'Lead Management',
    description: 'Master the art of organizing, tracking, and nurturing your internet leads for maximum conversions.',
    slug: { current: 'lead-management' },
  },
  {
    title: 'Sales Process',
    description: 'Proven strategies for working real-time and aged leads through effective sales sequences.',
    slug: { current: 'sales-process' },
  },
  {
    title: 'CRM Systems',
    description: 'Build powerful sales systems using High Level, Close, and other top CRM platforms.',
    slug: { current: 'crm-systems' },
  },
  {
    title: 'Buying Leads',
    description: 'Expert guidance on purchasing quality leads including mortgage, insurance, and solar leads.',
    slug: { current: 'buying-leads' },
  },
]

// Static fallback articles
const fallbackArticles = [
  {
    title: 'How to Work Real-Time Leads',
    seoDescription: 'The complete guide to maximizing conversions from fresh, real-time internet leads.',
    slug: { current: 'working-real-time-leads' },
    category: { title: 'Sales Process', slug: { current: 'sales-process' } },
  },
  {
    title: 'Email Sequences That Convert',
    seoDescription: 'Build automated email sequences that nurture leads and drive sales.',
    slug: { current: 'email-sequences' },
    category: { title: 'Lead Management', slug: { current: 'lead-management' } },
  },
  {
    title: 'How to Buy Quality Leads',
    seoDescription: 'Everything you need to know about purchasing leads from vendors.',
    slug: { current: 'how-to-buy-leads' },
    category: { title: 'Buying Leads', slug: { current: 'buying-leads' } },
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

export default async function HomePage() {
  const [sanityCategories, sanityArticles] = await Promise.all([
    getCategories(),
    getFeaturedArticles(),
  ])

  // Use Sanity data if available, otherwise use fallbacks
  const categories = sanityCategories.length > 0 ? sanityCategories : fallbackCategories
  const featuredArticles = sanityArticles.length > 0 ? sanityArticles : fallbackArticles

  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* Hero Section */}
      <Hero
        headline="Master the Art of Converting Internet Leads"
        subheadline="Proven strategies, expert guides, and practical tools to help sales professionals turn more leads into paying customers."
        ctaText="Start Learning"
        ctaLink={`/${categories[0]?.slug?.current || 'lead-management'}`}
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
            {categories.map((category: any) => (
              <FeatureCard
                key={category.title}
                title={category.title}
                description={category.description || `Explore our ${category.title.toLowerCase()} resources.`}
                href={`/${category.slug?.current || category.slug}`}
                icon={categoryIcons[category.slug?.current || category.slug] || defaultIcon}
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
            {featuredArticles.map((article: any) => (
              <ArticleCard
                key={article.title}
                title={article.title}
                description={article.seoDescription}
                href={`/${article.category?.slug?.current || 'resources'}/${article.slug?.current || article.slug}`}
                category={article.category?.title}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href={`/${categories[0]?.slug?.current || 'lead-management'}`} variant="outline" size="lg">
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
