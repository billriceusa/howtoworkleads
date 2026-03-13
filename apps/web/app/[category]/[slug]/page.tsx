import type { Metadata } from 'next'
import React from 'react'
import { notFound } from 'next/navigation'
import { sanityFetch, isSanityConfigured } from '@/lib/sanity/client'
import { landingPageQuery, landingPagePathsQuery } from '@/lib/sanity/queries'
import { Hero, TableOfContents, CTASection, ArticleCard, NewsletterForm, ALSAutoLinker } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { ArticleJsonLd, FAQJsonLd } from '@/components/seo'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity/image'
import { extractHeadings, absoluteUrl } from '@/lib/utils'
import { containsMarkdown, extractTextFromBlock } from '@/lib/portable-text'
import Image from 'next/image'
import { Accordion, Markdown } from '@/components/ui'

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

  const ogImage = page.ogImage?.asset ? urlForImage(page.ogImage).width(1200).height(630).url() : undefined

  const pageUrl = `https://www.howtoworkleads.com/${params.category}/${params.slug}`

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription?.trim(),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${page.seoTitle || page.title} | How To Work Leads`,
      description: page.seoDescription?.trim(),
      url: pageUrl,
      siteName: 'How To Work Leads',
      type: 'article',
      publishedTime: page.publishedAt,
      modifiedTime: page.updatedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seoTitle || page.title,
      description: page.seoDescription?.trim(),
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
    // Default handler — auto-link ALS mentions in plain text spans
    normal: ({ children, value }: any) => {
      const processed = processTextContent(value, children)
      // If markdown was detected, wrap in div instead of p to allow block elements
      if (processed !== children) {
        return <div className="prose-paragraph">{processed}</div>
      }
      return <p>{children}</p>
    },
    // Headings with markdown processing
    h2: ({ children, value }: any) => {
      const rawText = extractTextFromBlock(value)
      const slug = rawText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
      // Check if the text itself contains markdown (e.g., starts with ##)
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
        imageUrl={page.ogImage?.asset ? urlForImage(page.ogImage).width(1200).url() : undefined}
        datePublished={page.publishedAt}
        dateModified={page.updatedAt}
        authorName={page.author?.name}
      />
      {faqs.length > 0 && <FAQJsonLd faqs={faqs} />}

      <Hero
        headline={page.heroSection?.headline || page.title}
        subheadline={page.heroSection?.subheadline}
        ctaText="Buy Aged Leads"
        ctaLink="https://agedleadstore.com/all-lead-types/"
        secondaryCtaText={page.heroSection?.secondaryCtaText}
        secondaryCtaLink={page.heroSection?.secondaryCtaLink}
        subtext="Use Promo Code: BILLRICE to get 10% off — every order!"
        downloadText="Free Guide: How to Work Consumer Data"
        downloadLink="https://drive.google.com/file/d/1mWhf4A7Ne_oCPoXaXnyBs_pWWDhe9zB1/view?usp=sharing"
        utmCampaign={`article-${params.slug}-hero`}
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <ALSAutoLinker utmCampaign={`article-${params.slug}-in-content`}>
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
                          ctaText="Buy Aged Leads"
                          ctaLink="https://agedleadstore.com/all-lead-types/"
                          subtext="Use Promo Code: BILLRICE to get 10% off — every order!"
                          downloadText="Free Guide: How to Work Consumer Data"
                          downloadLink="https://drive.google.com/file/d/1mWhf4A7Ne_oCPoXaXnyBs_pWWDhe9zB1/view?usp=sharing"
                          utmCampaign={`article-${params.slug}-inline`}
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

                  case 'comparisonTable':
                    return (
                      <div key={index} className="not-prose my-8 overflow-x-auto">
                        {block.title && (
                          <h4 className="mb-3 text-lg font-semibold text-gray-900">{block.title}</h4>
                        )}
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-900 text-white">
                              {block.columns?.map((col: string, i: number) => (
                                <th key={i} className="px-4 py-3 text-left font-semibold">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {block.rows?.map((row: any, i: number) => (
                              <tr
                                key={row._key || i}
                                className={`border-b border-gray-200 ${
                                  row.isHighlighted
                                    ? 'bg-yellow-50 font-semibold'
                                    : i % 2 === 0
                                      ? 'bg-white'
                                      : 'bg-gray-50'
                                }`}
                              >
                                {row.cells?.map((cell: string, j: number) => (
                                  <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-medium' : ''}`}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
            </ALSAutoLinker>
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
