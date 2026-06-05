// Shared builders for /llms.txt and /llms-full.txt.
// Both routes generate their page inventory from this Sanity-backed data so the
// files stay complete automatically as content is published — no manual updates.

export interface LlmsCategory {
  slug: string
  title?: string
  description?: string
  seoDescription?: string
}

export interface LlmsLanding {
  title?: string
  slug: string
  category?: string
  seoDescription?: string
  focusKeyword?: string
}

export interface LlmsBlog {
  title?: string
  slug: string
  excerpt?: string
  seoDescription?: string
  publishedAt?: string
}

export interface LlmsContent {
  categories: LlmsCategory[]
  landingPages: LlmsLanding[]
  blogPosts: LlmsBlog[]
}

const titleize = (slug: string): string =>
  slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

/**
 * Concise inventory for /llms.txt — every landing page grouped under its
 * category, followed by every blog post. Title + link only.
 */
export function buildLlmsBody(data: LlmsContent, baseUrl: string): string {
  const lines: string[] = []
  const landingByCategory = new Map<string, LlmsLanding[]>()

  for (const page of data.landingPages || []) {
    if (!page.slug || !page.category) continue
    const list = landingByCategory.get(page.category) || []
    list.push(page)
    landingByCategory.set(page.category, list)
  }

  lines.push('## Topics by Category', '')

  // Known categories first (ordered), then any leftover categories.
  const seen = new Set<string>()
  const orderedCategories = [...(data.categories || [])]

  for (const cat of orderedCategories) {
    const pages = landingByCategory.get(cat.slug)
    if (!cat.slug) continue
    seen.add(cat.slug)
    const heading = cat.title || titleize(cat.slug)
    lines.push(`### ${heading} (${baseUrl}/${cat.slug})`)
    const blurb = cat.description || cat.seoDescription
    if (blurb) lines.push(blurb)
    if (pages) {
      for (const p of pages) {
        lines.push(`- [${p.title || titleize(p.slug)}](${baseUrl}/${p.category}/${p.slug})`)
      }
    }
    lines.push('')
  }

  // Landing pages whose category has no categoryPage document.
  for (const [category, pages] of Array.from(landingByCategory)) {
    if (seen.has(category)) continue
    lines.push(`### ${titleize(category)} (${baseUrl}/${category})`)
    for (const p of pages) {
      lines.push(`- [${p.title || titleize(p.slug)}](${baseUrl}/${p.category}/${p.slug})`)
    }
    lines.push('')
  }

  // Blog posts.
  if (data.blogPosts && data.blogPosts.length > 0) {
    lines.push(`## Blog (${baseUrl}/blog)`, '')
    for (const post of data.blogPosts) {
      if (!post.slug) continue
      lines.push(`- [${post.title || titleize(post.slug)}](${baseUrl}/blog/${post.slug})`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * Detailed inventory for /llms-full.txt — same coverage as buildLlmsBody but
 * each page carries its description (seoDescription || excerpt) on the line below.
 */
export function buildLlmsFullBody(data: LlmsContent, baseUrl: string): string {
  const lines: string[] = []
  const landingByCategory = new Map<string, LlmsLanding[]>()

  for (const page of data.landingPages || []) {
    if (!page.slug || !page.category) continue
    const list = landingByCategory.get(page.category) || []
    list.push(page)
    landingByCategory.set(page.category, list)
  }

  lines.push('## Content Categories', '')

  const seen = new Set<string>()
  for (const cat of data.categories || []) {
    if (!cat.slug) continue
    seen.add(cat.slug)
    const heading = cat.title || titleize(cat.slug)
    lines.push(`### ${heading} (${baseUrl}/${cat.slug})`)
    const blurb = cat.description || cat.seoDescription
    if (blurb) lines.push(blurb)
    lines.push('')
    const pages = landingByCategory.get(cat.slug)
    if (pages) {
      for (const p of pages) {
        lines.push(`#### ${p.title || titleize(p.slug)} (${baseUrl}/${p.category}/${p.slug})`)
        const desc = p.seoDescription
        if (desc) lines.push(desc)
        lines.push('')
      }
    }
  }

  for (const [category, pages] of Array.from(landingByCategory)) {
    if (seen.has(category)) continue
    lines.push(`### ${titleize(category)} (${baseUrl}/${category})`, '')
    for (const p of pages) {
      lines.push(`#### ${p.title || titleize(p.slug)} (${baseUrl}/${p.category}/${p.slug})`)
      if (p.seoDescription) lines.push(p.seoDescription)
      lines.push('')
    }
  }

  if (data.blogPosts && data.blogPosts.length > 0) {
    lines.push('---', '', `## Blog Articles (${baseUrl}/blog)`, '')
    for (const post of data.blogPosts) {
      if (!post.slug) continue
      lines.push(`### ${post.title || titleize(post.slug)} (${baseUrl}/blog/${post.slug})`)
      const desc = post.seoDescription || post.excerpt
      if (desc) lines.push(desc)
      lines.push('')
    }
  }

  return lines.join('\n')
}
