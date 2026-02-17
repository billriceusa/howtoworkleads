'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button, Logo } from '@/components/ui'
import type { NavigationData } from '@/lib/sanity/navigation'

interface HeaderClientProps {
  navigation: NavigationData
}

// Helper to ensure slugs don't have leading/trailing slashes
function cleanSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '')
}

export function HeaderClient({ navigation }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container-wide" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo variant="light" size="md" showEndorsement={false} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.categories
              .filter((category) => category.slug !== 'resources')
              .map((category) => (
              <div
                key={category._id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(category.slug)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={`/${category.slug}`}
                  className={cn(
                    'inline-flex items-center px-4 py-2 text-sm font-medium uppercase tracking-wide text-secondary-800 hover:text-brand-yellow transition-colors',
                    activeDropdown === category.slug && 'text-brand-yellow'
                  )}
                >
                  {category.title}
                  {category.articles.length > 0 && (
                    <svg
                      className={cn(
                        'ml-1 h-4 w-4 transition-transform',
                        activeDropdown === category.slug && 'rotate-180'
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown - only show if category has articles */}
                {activeDropdown === category.slug && category.articles.length > 0 && (
                  <div className="absolute left-0 top-full w-64 rounded-none bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                    {category.articles.map((article) => (
                      <Link
                        key={article._id}
                        href={`/${cleanSlug(category.slug)}/${cleanSlug(article.slug)}`}
                        className="block px-4 py-2 text-sm text-secondary-800 hover:bg-secondary-100 hover:text-black"
                      >
                        {article.title}
                      </Link>
                    ))}
                    <div className="mt-2 border-t border-secondary-300 pt-2">
                      <Link
                        href={`/${category.slug}`}
                        className="block px-4 py-2 text-sm font-medium text-black hover:bg-secondary-100"
                      >
                        View All &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/resources"
                className={cn(
                  'inline-flex items-center px-4 py-2 text-sm font-medium uppercase tracking-wide text-secondary-800 hover:text-brand-yellow transition-colors',
                  activeDropdown === 'resources' && 'text-brand-yellow'
                )}
              >
                Resources
                <svg
                  className={cn(
                    'ml-1 h-4 w-4 transition-transform',
                    activeDropdown === 'resources' && 'rotate-180'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {activeDropdown === 'resources' && (
                <div className="absolute left-0 top-full w-48 rounded-none bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Link
                    href="/blog"
                    className="block px-4 py-2 text-sm text-secondary-800 hover:bg-secondary-100 hover:text-black"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-sm text-secondary-800 hover:bg-secondary-100 hover:text-black"
                  >
                    About
                  </Link>
                  <div className="mt-2 border-t border-secondary-300 pt-2">
                    <Link
                      href="/resources"
                      className="block px-4 py-2 text-sm font-medium text-black hover:bg-secondary-100"
                    >
                      All Resources &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Button href="https://agedleadstore.com/all-lead-types/" variant="primary" size="sm">
              Buy Leads
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-none p-2 text-secondary-800 hover:bg-secondary-100 hover:text-black"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {navigation.categories
                .filter((category) => category.slug !== 'resources')
                .map((category) => (
                <div key={category._id} className="border-b border-secondary-300 pb-2">
                  <Link
                    href={`/${category.slug}`}
                    className="block px-4 py-2 text-base font-medium uppercase tracking-wide text-black hover:bg-secondary-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.title}
                  </Link>
                  {category.articles.length > 0 && (
                    <div className="ml-4 space-y-1">
                      {category.articles.map((article) => (
                        <Link
                          key={article._id}
                          href={`/${cleanSlug(category.slug)}/${cleanSlug(article.slug)}`}
                          className="block px-4 py-1.5 text-sm text-secondary-500 hover:text-black"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {article.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* Resources Section */}
              <div className="border-b border-secondary-300 pb-2">
                <Link
                  href="/resources"
                  className="block px-4 py-2 text-base font-medium uppercase tracking-wide text-black hover:bg-secondary-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resources
                </Link>
                <div className="ml-4 space-y-1">
                  <Link
                    href="/blog"
                    className="block px-4 py-1.5 text-sm text-secondary-500 hover:text-black"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-1.5 text-sm text-secondary-500 hover:text-black"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </div>
              </div>
              <div className="px-4 pt-4">
                <Button href="https://agedleadstore.com/all-lead-types/" variant="primary" className="w-full">
                  Buy Leads
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
