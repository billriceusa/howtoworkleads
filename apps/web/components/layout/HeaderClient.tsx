'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import type { NavigationData } from '@/lib/sanity/navigation'

interface HeaderClientProps {
  navigation: NavigationData
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
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-800">
                HowToWork<span className="text-accent-600">Leads</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.categories.map((category) => (
              <div
                key={category._id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(category.slug)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={`/${category.slug}`}
                  className={cn(
                    'inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-800 transition-colors',
                    activeDropdown === category.slug && 'text-primary-800'
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
                  <div className="absolute left-0 top-full w-64 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                    {category.articles.map((article) => (
                      <Link
                        key={article._id}
                        href={`/${category.slug}/${article.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800"
                      >
                        {article.title}
                      </Link>
                    ))}
                    <div className="mt-2 border-t border-gray-100 pt-2">
                      <Link
                        href={`/${category.slug}`}
                        className="block px-4 py-2 text-sm font-medium text-primary-800 hover:bg-primary-50"
                      >
                        View All &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Button href="/contact" variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
              {navigation.categories.map((category) => (
                <div key={category._id} className="border-b border-gray-100 pb-2">
                  <Link
                    href={`/${category.slug}`}
                    className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.title}
                  </Link>
                  {category.articles.length > 0 && (
                    <div className="ml-4 space-y-1">
                      {category.articles.map((article) => (
                        <Link
                          key={article._id}
                          href={`/${category.slug}/${article.slug}`}
                          className="block px-4 py-1.5 text-sm text-gray-600 hover:text-primary-800"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {article.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-4 pt-4">
                <Button href="/contact" variant="primary" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
