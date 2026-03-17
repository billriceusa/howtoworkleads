import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch, isSanityConfigured } from '@/lib/sanity/client'
import { categoryPageQuery, allCategoriesQuery } from '@/lib/sanity/queries'
import { Hero, ArticleCard, CTASection, ALSAutoLinker } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { Markdown } from '@/components/ui'
import { fallbackNavigation } from '@/lib/sanity/navigation'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity/image'
import Image from 'next/image'
import React from 'react'
import { containsMarkdown, extractTextFromBlock } from '@/lib/portable-text'

// Frontmatter field patterns that should never render as visible content
const FRONTMATTER_PATTERN = /^(slug|seo_title|meta_description|excerpt|category|title|date|author|tags|layout|published|draft|image|description|permalink):\s/i

function filterFrontmatterBlocks(content: any[]): any[] {
  if (!content) return []
  return content.filter((block) => {
    if (block._type !== 'block') return true
    const text = extractTextFromBlock(block)?.trim()
    if (!text) return true
    return !FRONTMATTER_PATTERN.test(text)
  })
}

// Process text content - render as markdown if it contains markdown syntax
function processTextContent(value: any, children: React.ReactNode): React.ReactNode {
  const rawText = extractTextFromBlock(value)
  if (containsMarkdown(rawText)) {
    return <Markdown content={rawText} />
  }
  return children
}

// Enable ISR - revalidate pages every 60 seconds
export const revalidate = 60

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <Image
            src={urlForImage(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={450}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const isExternal = value.href?.startsWith('http://') || value.href?.startsWith('https://')
      const isExternalSite = isExternal && !value.href?.includes('howtoworkleads.com')
      const shouldOpenNewTab = value.openInNewTab || isExternalSite
      const target = shouldOpenNewTab ? '_blank' : undefined
      const rel = shouldOpenNewTab ? 'noopener noreferrer' : undefined
      return (
        <a href={value.href} target={target} rel={rel}>
          {children}
        </a>
      )
    },
    internalLink: ({ children, value }: any) => {
      return <a href={`/${value.reference?.slug?.current}`}>{children}</a>
    },
  },
  block: {
    normal: ({ children, value }: any) => {
      const processed = processTextContent(value, children)
      if (processed !== children) {
        return <div className="prose-paragraph">{processed}</div>
      }
      return <p>{children}</p>
    },
    h2: ({ children, value }: any) => {
      const rawText = extractTextFromBlock(value)
      const slug = rawText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
      if (containsMarkdown(rawText)) {
        return <div className="prose-heading">{processTextContent(value, children)}</div>
      }
      return <h2 id={slug}>{children}</h2>
    },
    h3: ({ children, value }: any) => {
      const rawText = extractTextFromBlock(value)
      const slug = rawText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
      if (containsMarkdown(rawText)) {
        return <div className="prose-heading">{processTextContent(value, children)}</div>
      }
      return <h3 id={slug}>{children}</h3>
    },
    h4: ({ children, value }: any) => {
      const rawText = extractTextFromBlock(value)
      if (containsMarkdown(rawText)) {
        return <div className="prose-heading">{processTextContent(value, children)}</div>
      }
      return <h4>{children}</h4>
    },
    blockquote: ({ children, value }: any) => {
      const processed = processTextContent(value, children)
      if (processed !== children) {
        return <blockquote>{processed}</blockquote>
      }
      return <blockquote>{children}</blockquote>
    },
  },
}

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
  return categories
    .filter((category: any) => category.slug?.current)
    .map((category: { slug: { current: string } }) => ({
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

  const pageUrl = `https://www.howtoworkleads.com/${params.category}`

  return {
    title: category.seoTitle || category.title,
    description: category.seoDescription || category.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${category.seoTitle || category.title} | How To Work Leads`,
      description: category.seoDescription || category.description,
      url: pageUrl,
      siteName: 'How To Work Leads',
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
        ctaText="Buy Aged Leads"
        ctaLink="https://agedleadstore.com/all-lead-types/"
        secondaryCtaText={category.heroSection?.secondaryCtaText}
        secondaryCtaLink={category.heroSection?.secondaryCtaLink}
        downloadText="Free Guide: How to Work Consumer Data"
        downloadLink="https://drive.google.com/file/d/1mWhf4A7Ne_oCPoXaXnyBs_pWWDhe9zB1/view?usp=sharing"
        utmCampaign={`category-${params.category}-hero`}
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        {category.description && (
          <div className="prose-custom mb-12 max-w-3xl text-lg text-gray-600">
            <Markdown content={category.description} />
          </div>
        )}

        {/* Pillar Content Blocks */}
        {category.content && category.content.length > 0 && (
          <article className="prose-custom mb-16 max-w-3xl">
            <ALSAutoLinker utmCampaign={`category-${params.category}-in-content`}>
            {category.content.map((block: any, index: number) => {
              switch (block._type) {
                case 'contentBlock':
                  return (
                    <div key={block._key || index}>
                      <PortableText
                        value={filterFrontmatterBlocks(block.content)}
                        components={portableTextComponents}
                      />
                    </div>
                  )
                case 'ctaSection':
                  return (
                    <div key={block._key || index} className="not-prose my-12">
                      <CTASection
                        headline={block.headline}
                        description={block.description}
                        ctaText="Buy Aged Leads"
                        ctaLink="https://agedleadstore.com/all-lead-types/"
                                        downloadText="Free Guide: How to Work Consumer Data"
                        downloadLink="https://drive.google.com/file/d/1mWhf4A7Ne_oCPoXaXnyBs_pWWDhe9zB1/view?usp=sharing"
                        utmCampaign={`category-${params.category}-inline`}
                        variant="secondary"
                      />
                    </div>
                  )
                default:
                  return null
              }
            })}
            </ALSAutoLinker>
          </article>
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

        {/* Empty State - only show when there are no content blocks, resources, or articles */}
        {(!category.content || category.content.length === 0) &&
          (!category.resources || category.resources.length === 0) &&
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
            ctaText="Buy Aged Leads"
            ctaLink="https://agedleadstore.com/all-lead-types/"
            secondaryCtaText="Subscribe to The Aged Lead Playbook"
            secondaryCtaLink="#newsletter"
                downloadText="Free Guide: How to Work Consumer Data"
            downloadLink="https://drive.google.com/file/d/1mWhf4A7Ne_oCPoXaXnyBs_pWWDhe9zB1/view?usp=sharing"
            utmCampaign={`category-${params.category}-bottom`}
            variant="primary"
          />
        </div>
      </div>
    </>
  )
}
