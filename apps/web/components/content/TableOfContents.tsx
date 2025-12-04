'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TocItem {
  text: string
  slug: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
  className?: string
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 0,
      }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.slug)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.slug)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className={cn('space-y-2', className)} aria-label="Table of contents">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
        On This Page
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.slug}
            className={cn(item.level === 3 && 'ml-4')}
          >
            <a
              href={`#${item.slug}`}
              className={cn(
                'block py-1 transition-colors hover:text-primary-800',
                activeId === item.slug
                  ? 'font-medium text-primary-800'
                  : 'text-gray-600'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
