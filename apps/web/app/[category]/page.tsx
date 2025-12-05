import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch, isSanityConfigured } from '@/lib/sanity/client'
import { categoryPageQuery, allCategoriesQuery } from '@/lib/sanity/queries'
import { Hero, ArticleCard, CTASection } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { fallbackNavigation } from '@/lib/sanity/navigation'

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
          <div className="prose-custom mb-12 max-w-3xl">
            <p className="text-lg text-gray-600">{category.description}</p>
          </div>
        )}

        {/* Articles Grid */}
        {category.articles && category.articles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.articles.map((article: any) => (
              <ArticleCard
                key={article._id}
                title={article.title}
                description={article.seoDescription || article.heroSection?.headline}
                href={`/${params.category}/${article.slug.current}`}
                category={category.title}
                publishedAt={article.publishedAt}
              />
            ))}
          </div>
        ) : (
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
            headline="Ready to Convert More Leads?"
            description="Explore our other resources to build a complete lead conversion system."
            ctaText="Browse All Resources"
            ctaLink="/"
            variant="primary"
          />
        </div>
      </div>
    </>
  )
}
