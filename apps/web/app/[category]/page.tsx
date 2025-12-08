import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch, isSanityConfigured } from '@/lib/sanity/client'
import { categoryPageQuery, allCategoriesQuery } from '@/lib/sanity/queries'
import { Hero, ArticleCard, CTASection } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { Markdown } from '@/components/ui'
import { fallbackNavigation } from '@/lib/sanity/navigation'

// Enable ISR - revalidate pages every 60 seconds
export const revalidate = 60

// Allow dynamic params for on-demand page generation
export const dynamicParams = true

interface CategoryPageProps {
  params: { category: string }
}

async function getCategory(slug: string) {
  return sanityFetch<any>(categoryPageQuery, { slug })
}

export async function generateStaticParams() {
  if (!isSanityConfigured) {
    // Return fallback paths when Sanity is not configured
    return fallbackNavigation.categories.map((category) => ({
      category: category.slug,
    }))
  }
  const categories = await sanityFetch<any[]>(allCategoriesQuery)
  if (!categories) {
    return fallbackNavigation.categories.map((category) => ({
      category: category.slug,
    }))
  }
  return categories.map((category: { slug: { current: string } }) => ({
    category: category.slug.current,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategory(params.category)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: category.seoTitle || category.title,
    description: category.seoDescription || category.description,
    openGraph: {
      title: `${category.seoTitle || category.title} | How To Work Leads`,
      description: category.seoDescription || category.description,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategory(params.category)

  if (!category) {
    notFound()
  }

  const breadcrumbs = [{ label: category.title }]

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />

      <Hero
        headline={category.heroSection?.headline || category.title}
        subheadline={category.heroSection?.subheadline || category.description}
        ctaText={category.heroSection?.ctaText}
        ctaLink={category.heroSection?.ctaLink}
        secondaryCtaText={category.heroSection?.secondaryCtaText}
        secondaryCtaLink={category.heroSection?.secondaryCtaLink}
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        {category.description && (
          <div className="prose-custom mb-12 max-w-3xl text-lg text-gray-600">
            <Markdown content={category.description} />
          </div>
        )}

        {/* Resources Section */}
        {category.resources && category.resources.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-black">Resources</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.resources.map((resource: any) => (
                <ArticleCard
                  key={resource._id}
                  title={resource.title}
                  description={resource.seoDescription || resource.heroSection?.headline}
                  href={`/${params.category}/${resource.slug.current}`}
                  category={category.title}
                  publishedAt={resource.publishedAt}
                />
              ))}
            </div>
          </section>
        )}

        {/* Articles Section (Blog Posts) */}
        {category.articles && category.articles.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-black">Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.articles.map((article: any) => (
                <ArticleCard
                  key={article._id}
                  title={article.title}
                  description={article.excerpt}
                  href={`/blog/${article.slug.current}`}
                  category={category.title}
                  publishedAt={article.publishedAt}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {(!category.resources || category.resources.length === 0) &&
          (!category.articles || category.articles.length === 0) && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900">Content Coming Soon</h3>
              <p className="mt-2 text-gray-600">
                We&apos;re working on comprehensive guides for this category.
              </p>
            </div>
          )}

        {/* CTA Section */}
        <div className="mt-16">
          <CTASection
            headline="Hit your Sales and Revenue Goals, Every Month"
            features={[
              "Stop worrying about leads. Buy them on demand.",
              "Learn to convert any lead with proper lead management.",
              "Build and nurture a huge database into an endless stream of leads."
            ]}
            ctaText="Get a Custom Lead Quote"
            ctaLink="/lead-order"
            secondaryCtaText="Book a Lead Strategy Call"
            secondaryCtaLink="https://calendar.app.google/6WQdrfLe2xHDKa8Y8"
            variant="primary"
          />
        </div>
      </div>
    </>
  )
}
