import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client, projectId, dataset } from './client'

// Create a builder that works even when client is null
const builder = client
  ? imageUrlBuilder(client)
  : imageUrlBuilder({ projectId, dataset })

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}
