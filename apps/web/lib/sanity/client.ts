import { createClient, type SanityClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Check if Sanity is properly configured
export const isSanityConfigured = Boolean(projectId)

// Create client only if projectId is available
export const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null

// Safe fetch function that returns empty array/null if Sanity is not configured
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options?: { next?: { revalidate?: number } }
): Promise<T | null> {
  if (!client) {
    console.warn('Sanity client not configured. Returning null.')
    return null
  }

  try {
    return await client.fetch<T>(query, params, options)
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    return null
  }
}
