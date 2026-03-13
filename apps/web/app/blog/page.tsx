import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { allBlogPostsQuery } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { Hero, CTASection } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { Badge } from '@/components/ui'
import { formatDate } from '@/lib/utils'

// Enable ISR - revalidate pages every 60 seconds
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Expert insights, tips, and strategies for converting internet leads into sales. Stay up to date with the latest in lead management and sales optimization.',
  alternates: {
    canonical: 'https://www.howtoworkleads.com/blog',
  },
  openGraph: {
    title: 'Blog | How To Work Leads',
    description: 'Expert insights, tips, and strategies for converting internet leads into sales.',
    url: 'https://www.howtoworkleads.com/blog',
    siteName: 'How To Work Leads',
  },
}

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: {
    asset: any
    alt?: string
  }
  categories?: {
    title: string
    slug: { current: string }
  }[]
  author?: {
    name: string
    image?: any
  }
  publishedAt?: string
}

export default async function BlogPage() {
  const posts = await sanityFetch<BlogPost[]>(allBlogPostsQuery)

  const breadcrumbs = [{ label: 'Blog' }]

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />

      <Hero
        headline="Blog"
        subheadline="Expert insights, tips, and strategies for converting internet leads into sales"
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        {/* Blog Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group relative flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              >
                {/* Featured Image */}
                {post.mainImage?.asset && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={urlForImage(post.mainImage).width(600).height(340).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map((category) => (
                        <Badge key={category.slug.current} variant="primary">
                          {category.title}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-800 transition-colors">
                    <Link href={`/blog/${post.slug.current}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="mt-3 text-gray-600 line-clamp-3">{post.excerpt}</p>
                  )}

                  {/* Meta */}
                  <div className="mt-auto pt-4 flex items-center gap-4 text-sm text-gray-500">
                    {post.author?.name && (
                      <span className="flex items-center gap-2">
                        {post.author.image && (
                          <Image
                            src={urlForImage(post.author.image).width(24).height(24).url()}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        )}
                        {post.author.name}
                      </span>
                    )}
                    {post.publishedAt && (
                      <>
                        {post.author?.name && <span>&middot;</span>}
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900">Blog Posts Coming Soon</h3>
            <p className="mt-2 text-gray-600">
              We&apos;re working on insightful articles to help you convert more leads.
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
            utmCampaign="blog-index-bottom"
            variant="primary"
          />
        </div>
      </div>
    </>
  )
}
