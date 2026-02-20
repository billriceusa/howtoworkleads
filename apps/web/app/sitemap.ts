import { MetadataRoute } from 'next'
import { sanityFetch, isSanityConfigured } from '@/lib/sanity/client'
import { sitemapQuery } from '@/lib/sanity/queries'

// Enable ISR - regenerate sitemap every 60 seconds
export const revalidate = 60

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.howtoworkleads.com'

interface SitemapData {
  landingPages: Array<{
    slug: string
    category: string
    updatedAt?: string
    publishedAt?: string
  }>
  categoryPages: Array<{
    slug: string
    updatedAt?: string
  }>
  blogPosts: Array<{
    slug: string
    updatedAt?: string
    publishedAt?: string
  }>
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // Homepage - always exists
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  // Static pages that have dedicated routes
  const staticRoutes = [
    { path: '/blog', priority: 0.8 },
    { path: '/tools', priority: 0.8 },
    { path: '/lead-order', priority: 0.7 },
    { path: '/tools/aged-lead-roi-calculator', priority: 0.7 },
    { path: '/tools/compliance-checklist', priority: 0.7 },
  ]

  for (const route of staticRoutes) {
    entries.push({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route.priority,
    })
  }

  // Fetch dynamic content from Sanity
  if (isSanityConfigured) {
    const data = await sanityFetch<SitemapData>(sitemapQuery, {}, {
      next: { revalidate: 60 }
    })

    if (data) {
      // Add category pages
      if (data.categoryPages) {
        for (const category of data.categoryPages) {
          if (category.slug) {
            entries.push({
              url: `${baseUrl}/${category.slug}`,
              lastModified: category.updatedAt ? new Date(category.updatedAt) : new Date(),
              changeFrequency: 'weekly',
              priority: 0.8,
            })
          }
        }
      }

      // Add landing pages (articles under categories)
      if (data.landingPages) {
        for (const page of data.landingPages) {
          if (page.slug && page.category) {
            entries.push({
              url: `${baseUrl}/${page.category}/${page.slug}`,
              lastModified: page.updatedAt
                ? new Date(page.updatedAt)
                : page.publishedAt
                  ? new Date(page.publishedAt)
                  : new Date(),
              changeFrequency: 'weekly',
              priority: 0.6,
            })
          }
        }
      }

      // Add blog posts
      if (data.blogPosts) {
        for (const post of data.blogPosts) {
          if (post.slug) {
            entries.push({
              url: `${baseUrl}/blog/${post.slug}`,
              lastModified: post.updatedAt
                ? new Date(post.updatedAt)
                : post.publishedAt
                  ? new Date(post.publishedAt)
                  : new Date(),
              changeFrequency: 'monthly',
              priority: 0.5,
            })
          }
        }
      }
    }
  }

  return entries
}
