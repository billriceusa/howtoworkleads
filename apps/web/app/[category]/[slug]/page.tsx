import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch, isSanityConfigured } from '@/lib/sanity/client'
import { landingPageQuery, landingPagePathsQuery } from '@/lib/sanity/queries'
import { Hero, TableOfContents, CTASection, ArticleCard, NewsletterForm } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { ArticleJsonLd, FAQJsonLd } from '@/components/seo'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity/image'
import { extractHeadings, absoluteUrl } from '@/lib/utils'
import Image from 'next/image'
import { Accordion } from '@/components/ui'

// Enable ISR - revalidate pages every 60 seconds
export const revalidate = 60

// Allow dynamic params for on-demand page generation
export const dynamicParams = true

interface LandingPageProps {
  params: { category: string; slug: string }
}

async function getLandingPage(slug: string) {
  return sanityFetch<any>(landingPageQuery, { slug })
}

export async function generateStaticParams() {
  if (!isSanityConfigured) {
    // Return empty array when Sanity is not configured - pages will be generated on demand
    return []
  }
  const pages = await sanityFetch<any[]>(landingPagePathsQuery)
  if (!pages) {
    return []
  }
  return pages.map((page: { slug: string; category: string }) => ({
    category: page.category,
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const page = await getLandingPage(params.slug)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  const ogImage = page.ogImage ? urlForImage(page.ogImage).width(1200).height(630).url() : undefined

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
    keywords: page.secondaryKeywords,
    openGraph: {
      title: `${page.seoTitle || page.title} | How To Work Leads`,
      description: page.seoDescription,
      type: 'article',
      publishedTime: page.publishedAt,
      modifiedTime: page.updatedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seoTitle || page.title,
      description: page.seoDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

// Portable Text components for rendering Sanity content
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
      // Check if this is an external link (starts with http:// or https:// and not howtoworkleads.com)
      const isExternal = value.href?.startsWith('http://') || value.href?.startsWith('https://')
      const isExternalSite = isExternal && !value.href?.includes('howtoworkleads.com')
      // Open in new tab if explicitly set OR if it's an external site
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
    h2: ({ children, value }: any) => {
      const text = value.children?.map((child: any) => child.text).join('') || ''
      const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')
      return <h2 id={slug}>{children}</h2>
    },
    h3: ({ children, value }: any) => {
      const text = value.children?.map((child: any) => child.text).join('') || ''
      const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')
      return <h3 id={slug}>{children}</h3>
    },
  },
}

export default async function LandingPage({ params }: LandingPageProps) {
  const page = await getLandingPage(params.slug)

  if (!page) {
    notFound()
  }

  const breadcrumbs = [
    { label: page.category?.title || 'Resources', href: `/${params.category}` },
    { label: page.title },
  ]

  // Extract headings for table of contents
  const headings = extractHeadings(page.content)

  // Extract FAQs for structured data
  const faqSection = page.content?.find((block: any) => block._type === 'faqSection')
  const faqs = faqSection?.faqs || []

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <ArticleJsonLd
        title={page.seoTitle || page.title}
        description={page.seoDescription || ''}
        url={absoluteUrl(`/${params.category}/${params.slug}`)}
        imageUrl={page.ogImage ? urlForImage(page.ogImage).width(1200).url() : undefined}
        datePublished={page.publishedAt}
        dateModified={page.updatedAt}
        authorName={page.author?.name}
      />
      {faqs.length > 0 && <FAQJsonLd faqs={faqs} />}

      <Hero
        headline={page.heroSection?.headline || page.title}
        subheadline={page.heroSection?.subheadline}
        ctaText={page.heroSection?.ctaText}
        ctaLink={page.heroSection?.ctaLink}
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <div className="prose-custom">
              {page.content?.map((block: any, index: number) => {
                switch (block._type) {
                  case 'contentBlock':
                    return (
                      <div key={index}>
                        <PortableText
                          value={block.content}
                          components={portableTextComponents}
                        />
                      </div>
                    )

                  case 'ctaSection':
                    return (
                      <div key={index} className="not-prose my-12">
                        <CTASection
                          headline={block.headline}
                          description={block.description}
                          ctaText={block.ctaText}
                          ctaLink={block.ctaLink}
                          variant={block.variant || 'primary'}
                        />
                      </div>
                    )

                  case 'faqSection':
                    return (
                      <div key={index} className="not-prose my-12">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">
                          {block.title || 'Frequently Asked Questions'}
                        </h2>
                        <Accordion
                          items={block.faqs.map((faq: any, faqIndex: number) => ({
                            id: `faq-${faqIndex}`,
                            question: faq.question,
                            answer: faq.answer,
                          }))}
                        />
                      </div>
                    )

                  default:
                    return null
                }
              })}
            </div>

            {/* Newsletter */}
            <div className="mt-12">
              <NewsletterForm />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="mt-12 lg:col-span-4 lg:mt-0">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              {page.tableOfContents && headings.length > 0 && (
                <div className="rounded-xl border border-gray-200 p-6">
                  <TableOfContents items={headings} />
                </div>
              )}

              {/* Related Articles */}
              {page.relatedPages && page.relatedPages.length > 0 && (
                <div className="rounded-xl border border-gray-200 p-6">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Related Articles
                  </h3>
                  <ul className="space-y-3">
                    {page.relatedPages.map((related: any) => (
                      <li key={related._id}>
                        <a
                          href={`/${related.category?.slug?.current || params.category}/${related.slug.current}`}
                          className="text-gray-700 hover:text-primary-800 transition-colors"
                        >
                          {related.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
