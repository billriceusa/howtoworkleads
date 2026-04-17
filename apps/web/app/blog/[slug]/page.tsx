import type { Metadata } from 'next'
import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { blogPostQuery } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { Hero, CTASection, NewsletterForm, ALSAutoLinker, ContentUpgradeCTA, InlineNewsletterCTA } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { ArticleJsonLd } from '@/components/seo'
import { Badge, Markdown } from '@/components/ui'
import { PortableText } from '@portabletext/react'
import { formatDate, absoluteUrl } from '@/lib/utils'
import { containsMarkdown, extractTextFromBlock } from '@/lib/portable-text'

// Frontmatter field patterns that should never render as visible content
const FRONTMATTER_PATTERN = /^(slug|seo_title|meta_description|excerpt|category|title|date|author|tags|layout|published|draft|image|description|permalink):\s/i

/**
 * Filter out Portable Text blocks that contain raw frontmatter metadata.
 * This catches cases where YAML frontmatter was accidentally imported into
 * the content field instead of being stripped during markdown-to-Sanity conversion.
 */
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

// Allow dynamic params for on-demand page generation
export const dynamicParams = true

interface BlogPostPageProps {
  params: { slug: string }
}

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  seoTitle?: string
  seoDescription?: string
  excerpt?: string
  mainImage?: {
    asset: any
    alt?: string
  }
  content?: any[]
  categories?: {
    _id: string
    title: string
    slug: { current: string }
  }[]
  author?: {
    _id: string
    name: string
    slug?: { current: string }
    image?: any
    bio?: string
  }
  publishedAt?: string
  updatedAt?: string
}

async function getBlogPost(slug: string) {
  return sanityFetch<BlogPost>(blogPostQuery, { slug })
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const ogImage = post.mainImage?.asset ? urlForImage(post.mainImage).width(1200).height(630).url() : undefined

  const pageUrl = `https://howtoworkleads.com/blog/${params.slug}`

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${post.seoTitle || post.title} | How To Work Leads`,
      description: post.seoDescription || post.excerpt,
      url: pageUrl,
      siteName: 'How To Work Leads',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
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
    comparisonTable: ({ value }: any) => {
      if (!value?.columns || !value?.rows) return null
      return (
        <div className="not-prose my-8 overflow-x-auto">
          {value.title && (
            <h4 className="mb-3 text-lg font-semibold text-gray-900">{value.title}</h4>
          )}
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-900 text-white">
                {value.columns.map((col: string, i: number) => (
                  <th key={i} className="px-4 py-3 text-left font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.rows.map((row: any, i: number) => (
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
    // Default handler for blocks without a specific style or with style: 'normal'
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ]

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <ArticleJsonLd
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt || ''}
        url={absoluteUrl(`/blog/${params.slug}`)}
        imageUrl={post.mainImage?.asset ? urlForImage(post.mainImage).width(1200).url() : undefined}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        authorName={post.author?.name}
      />

      <Hero
        headline={post.title}
        subheadline={post.excerpt}
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            {/* Featured Image */}
            {post.mainImage?.asset && (
              <div className="relative aspect-video overflow-hidden rounded-xl mb-8">
                <Image
                  src={urlForImage(post.mainImage).width(800).height(450).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Badge key={category._id} variant="primary">
                    {category.title}
                  </Badge>
                ))}
              </div>
            )}

            {/* Meta */}
            <div className="mb-8 flex items-center gap-4 text-sm text-gray-500 border-b border-gray-200 pb-6">
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <Image
                      src={urlForImage(post.author.image).width(40).height(40).url()}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <span className="font-medium text-gray-900">{post.author.name}</span>
                </div>
              )}
              {post.publishedAt && (
                <>
                  {post.author && <span>&middot;</span>}
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </>
              )}
            </div>

            {/* Content with inline CTAs */}
            <ALSAutoLinker utmCampaign={`blog-${params.slug}-in-content`}>
            {(() => {
              const filteredContent = filterFrontmatterBlocks(post.content || [])
              // Find the index of the second h2 block to insert inline CTA after it
              let h2Count = 0
              let splitIndex = -1
              for (let i = 0; i < filteredContent.length; i++) {
                if (filteredContent[i]._type === 'block' && filteredContent[i].style === 'h2') {
                  h2Count++
                  if (h2Count === 2) {
                    // Insert after the paragraph(s) following this h2
                    splitIndex = i + 1
                    while (
                      splitIndex < filteredContent.length &&
                      filteredContent[splitIndex]._type === 'block' &&
                      filteredContent[splitIndex].style === 'normal'
                    ) {
                      splitIndex++
                    }
                    break
                  }
                }
              }

              if (splitIndex > 0 && splitIndex < filteredContent.length) {
                const firstHalf = filteredContent.slice(0, splitIndex)
                const secondHalf = filteredContent.slice(splitIndex)
                return (
                  <>
                    <div className="prose-custom">
                      <PortableText value={firstHalf} components={portableTextComponents} />
                    </div>
                    <div className="my-8">
                      <InlineNewsletterCTA />
                    </div>
                    <div className="prose-custom">
                      <PortableText value={secondHalf} components={portableTextComponents} />
                    </div>
                  </>
                )
              }

              return (
                <div className="prose-custom">
                  <PortableText value={filteredContent} components={portableTextComponents} />
                </div>
              )
            })()}
            </ALSAutoLinker>

            {/* Vertical-matched lead magnet download */}
            <div className="mt-12">
              <ContentUpgradeCTA pageSlug={params.slug} />
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="mt-12 lg:col-span-4 lg:mt-0">
            <div className="sticky top-24 space-y-8">
              {/* Author Bio */}
              {post.author && (
                <div className="rounded-xl border border-gray-200 p-6">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    About the Author
                  </h3>
                  <div className="flex items-start gap-4">
                    {post.author.image && (
                      <Image
                        src={urlForImage(post.author.image).width(64).height(64).url()}
                        alt={post.author.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{post.author.name}</p>
                      {post.author.bio && (
                        <Markdown content={post.author.bio} className="mt-1 text-sm text-gray-600" />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Back to Blog */}
              <div className="rounded-xl border border-gray-200 p-6">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-primary-800 hover:text-primary-900 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Blog
                </Link>
              </div>
            </div>
          </aside>
        </div>

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
            utmCampaign={`blog-${params.slug}-bottom`}
            variant="primary"
          />
        </div>
      </div>
    </>
  )
}
