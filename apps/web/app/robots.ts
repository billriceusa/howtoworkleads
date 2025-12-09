import { MetadataRoute } from 'next'

// Enable ISR - regenerate robots.txt every hour
export const revalidate = 3600

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.howtoworkleads.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
      // AI-specific crawlers - explicitly allow access to llms.txt
      {
        userAgent: 'GPTBot',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/studio/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/studio/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/studio/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/studio/'],
      },
      {
        userAgent: 'Amazonbot',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/studio/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
