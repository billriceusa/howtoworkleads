import { sanityFetch } from './client'
import { navigationQuery } from './queries'

export interface NavigationArticle {
  _id: string
  title: string
  slug: string
}

export interface NavigationCategory {
  _id: string
  title: string
  slug: string
  articles: NavigationArticle[]
}

export interface NavigationData {
  categories: NavigationCategory[]
}

// Fallback navigation data when Sanity is unavailable
export const fallbackNavigation: NavigationData = {
  categories: [
    {
      _id: 'fallback-1',
      title: 'Lead Management',
      slug: 'lead-management',
      articles: [],
    },
    {
      _id: 'fallback-2',
      title: 'Sales Process',
      slug: 'sales-process',
      articles: [],
    },
    {
      _id: 'fallback-3',
      title: 'CRM Systems',
      slug: 'crm-systems',
      articles: [],
    },
    {
      _id: 'fallback-4',
      title: 'Buying Leads',
      slug: 'buying-leads',
      articles: [],
    },
  ],
}

export async function getNavigation(): Promise<NavigationData> {
  const data = await sanityFetch<NavigationData>(navigationQuery, {}, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })

  if (!data?.categories || data.categories.length === 0) {
    return fallbackNavigation
  }

  return data
}
