import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trim() + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://howtoworkleads.com'
  return `${baseUrl}${path}`
}

export function extractHeadings(content: any[]): { text: string; slug: string; level: number }[] {
  const headings: { text: string; slug: string; level: number }[] = []

  if (!content) return headings

  content.forEach((block) => {
    if (block._type === 'contentBlock' && block.content) {
      block.content.forEach((item: any) => {
        if (item.style === 'h2' || item.style === 'h3') {
          const text = item.children
            ?.map((child: any) => child.text)
            .join('') || ''
          headings.push({
            text,
            slug: slugify(text),
            level: item.style === 'h2' ? 2 : 3,
          })
        }
      })
    }
  })

  return headings
}
