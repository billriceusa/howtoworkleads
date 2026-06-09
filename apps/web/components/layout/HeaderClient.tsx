'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button, Logo } from '@/components/ui'
import type { NavigationData } from '@/lib/sanity/navigation'

interface HeaderClientProps {
  navigation: NavigationData
}

type MenuLink = { label: string; href: string }
type MenuColumn = { heading: string; href: string; links: MenuLink[] }

// Helper to ensure slugs don't have leading/trailing slashes
function cleanSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '')
}

// --- Curated nav config -----------------------------------------------------
// The "Buy Leads" mega-menu groups commercial lead verticals. The flat Sanity
// category model can't express this 2-level grouping, so it's curated here and
// mapped to real published page URLs. "Guides" is data-driven from Sanity.

const BUY_LEADS_COLUMNS: MenuColumn[] = [
  {
    heading: 'Insurance',
    href: '/insurance-leads',
    links: [
      { label: 'Life Insurance', href: '/buying-leads/buy-life-insurance-leads' },
      { label: 'IUL', href: '/buying-leads/buy-iul-leads' },
      { label: 'Final Expense', href: '/buying-leads/buy-final-expense-leads' },
      { label: 'Medicare', href: '/buying-leads/buy-medicare-leads' },
      { label: 'Health', href: '/buying-leads/health-insurance-leads' },
      { label: 'Annuity', href: '/buying-leads/buy-annuity-leads' },
      { label: 'Auto', href: '/buying-leads/buy-auto-insurance-leads' },
      { label: 'P&C', href: '/buying-leads/buy-pc-insurance-leads' },
      { label: 'Mortgage Protection', href: '/buying-leads/buy-mortgage-protection-leads' },
    ],
  },
  {
    heading: 'Mortgage',
    href: '/buying-leads/buy-mortgage-leads',
    links: [
      { label: 'All Mortgage Leads', href: '/buying-leads/buy-mortgage-leads' },
      { label: 'Purchase', href: '/buying-leads/buy-purchase-mortgage-leads' },
      { label: 'Refinance', href: '/buying-leads/buy-refinance-mortgage-leads' },
      { label: 'HELOC', href: '/buying-leads/buy-heloc-leads' },
      { label: 'Non-QM', href: '/buying-leads/buy-non-qm-mortgage-leads' },
      { label: 'DSCR', href: '/buying-leads/buy-dscr-loan-leads' },
      { label: 'Bank Statement', href: '/buying-leads/buy-bank-statement-loan-leads' },
    ],
  },
  {
    heading: 'Home Services',
    href: '/home-services-leads',
    links: [
      { label: 'Home Improvement', href: '/buying-leads/buy-home-improvement-leads' },
      { label: 'Solar', href: '/buying-leads/buy-solar-leads' },
      { label: 'All Home Services →', href: '/home-services-leads' },
    ],
  },
  {
    heading: 'Legal',
    href: '/legal-leads',
    links: [
      { label: 'MVA / Auto Accident', href: '/blog/how-to-work-mva-leads' },
      { label: 'Mass Tort', href: '/blog/how-to-work-mass-tort-leads' },
      { label: "Workers' Comp", href: '/blog/how-to-work-workers-comp-leads' },
      { label: 'SSDI', href: '/blog/how-to-work-ssdi-leads' },
      { label: 'All Legal Leads →', href: '/legal-leads' },
    ],
  },
]

const BUY_LEADS_FEATURED: MenuLink[] = [
  { label: 'Aged Leads — all verticals', href: '/buying-leads/buy-aged-leads' },
  { label: 'Real Estate', href: '/buying-leads/buy-real-estate-leads' },
]

// Educational hubs surfaced under "Guides" (data-driven from Sanity navigation)
const GUIDES_SLUGS = ['lead-management', 'sales-process', 'crm-systems']

const RESOURCES_LINKS: MenuLink[] = [
  { label: 'The Complete Guide to Aged Leads', href: '/aged-leads' },
  { label: 'Free Tools & Calculators', href: '/tools' },
  { label: 'Free Downloads', href: '/downloads' },
  { label: 'Email Starter Stack Guide', href: '/resources/email-starter-stack' },
  { label: 'Lead Generation Glossary', href: '/blog/lead-generation-glossary' },
]

const ABOUT_HREF = '/resources/about'
const CTA_HREF = 'https://agedleadstore.com/all-lead-types/'

const triggerClass =
  'inline-flex items-center px-4 py-2 text-sm font-medium uppercase tracking-wide text-secondary-800 hover:text-brand-yellow transition-colors'

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={cn('ml-1 h-4 w-4 transition-transform', open && 'rotate-180')}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export function HeaderClient({ navigation }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)

  const guideColumns = GUIDES_SLUGS.map((slug) =>
    navigation.categories.find((c) => c.slug === slug)
  ).filter((c): c is NonNullable<typeof c> => Boolean(c))

  const closeMobile = () => {
    setMobileMenuOpen(false)
    setMobileSection(null)
  }
  const toggleMobileSection = (key: string) =>
    setMobileSection((cur) => (cur === key ? null : key))

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
            {/* Buy Leads (mega-menu) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('buy')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/buying-leads"
                className={cn(triggerClass, activeDropdown === 'buy' && 'text-brand-yellow')}
              >
                Lead Types
                <Chevron open={activeDropdown === 'buy'} />
              </Link>

              {activeDropdown === 'buy' && (
                <div className="absolute left-0 top-full w-[56rem] max-w-[calc(100vw-2rem)] rounded-none bg-white p-6 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="grid grid-cols-4 gap-6">
                    {BUY_LEADS_COLUMNS.map((col) => (
                      <div key={col.heading}>
                        <Link
                          href={col.href}
                          className="block border-b border-secondary-300 pb-1 text-xs font-bold uppercase tracking-wide text-black hover:text-brand-yellow"
                        >
                          {col.heading}
                        </Link>
                        <div className="mt-2 space-y-1">
                          {col.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="block py-1 text-sm text-secondary-800 hover:text-black"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-secondary-300 pt-3">
                    {BUY_LEADS_FEATURED.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-sm font-medium text-secondary-800 hover:text-black"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/buying-leads"
                      className="ml-auto text-sm font-bold text-black hover:text-brand-yellow"
                    >
                      Browse all lead types &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Guides (mega-menu, data-driven) */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('guides')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={cn(triggerClass, activeDropdown === 'guides' && 'text-brand-yellow')}
                aria-expanded={activeDropdown === 'guides'}
              >
                Guides
                <Chevron open={activeDropdown === 'guides'} />
              </button>

              {activeDropdown === 'guides' && (
                <div className="absolute left-0 top-full w-[44rem] max-w-[calc(100vw-2rem)] rounded-none bg-white p-6 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="grid grid-cols-3 gap-6">
                    {guideColumns.map((col) => (
                      <div key={col._id}>
                        <Link
                          href={`/${col.slug}`}
                          className="block border-b border-secondary-300 pb-1 text-xs font-bold uppercase tracking-wide text-black hover:text-brand-yellow"
                        >
                          {col.title}
                        </Link>
                        <div className="mt-2 space-y-1">
                          {col.articles.map((article) => (
                            <Link
                              key={article._id}
                              href={`/${cleanSlug(col.slug)}/${cleanSlug(article.slug)}`}
                              className="block py-1 text-sm text-secondary-800 hover:text-black"
                            >
                              {article.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-secondary-300 pt-3">
                    <Link href="/blog" className="text-sm font-bold text-black hover:text-brand-yellow">
                      Read the blog &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/resources"
                className={cn(triggerClass, activeDropdown === 'resources' && 'text-brand-yellow')}
              >
                Resources
                <Chevron open={activeDropdown === 'resources'} />
              </Link>

              {activeDropdown === 'resources' && (
                <div className="absolute left-0 top-full w-64 rounded-none bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                  {RESOURCES_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-secondary-800 hover:bg-secondary-100 hover:text-black"
                    >
                      {link.label}
                    </Link>
                  ))}
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

            {/* About */}
            <Link href={ABOUT_HREF} className={triggerClass}>
              About
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:items-center">
            <Button href={CTA_HREF} variant="primary" size="sm" utmCampaign="header-nav">
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
              {/* Buy Leads */}
              <div className="border-b border-secondary-300 pb-2">
                <button
                  type="button"
                  onClick={() => toggleMobileSection('buy')}
                  className="flex w-full items-center justify-between px-4 py-2 text-base font-medium uppercase tracking-wide text-black hover:bg-secondary-100"
                  aria-expanded={mobileSection === 'buy'}
                >
                  Lead Types
                  <Chevron open={mobileSection === 'buy'} />
                </button>
                {mobileSection === 'buy' && (
                  <div className="ml-4 space-y-3 pb-2">
                    {BUY_LEADS_COLUMNS.map((col) => (
                      <div key={col.heading}>
                        <Link
                          href={col.href}
                          className="block px-4 py-1 text-xs font-bold uppercase tracking-wide text-black"
                          onClick={closeMobile}
                        >
                          {col.heading}
                        </Link>
                        {col.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block px-4 py-1.5 text-sm text-secondary-500 hover:text-black"
                            onClick={closeMobile}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                    {BUY_LEADS_FEATURED.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-1.5 text-sm text-secondary-500 hover:text-black"
                        onClick={closeMobile}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/buying-leads"
                      className="block px-4 py-1.5 text-sm font-bold text-black"
                      onClick={closeMobile}
                    >
                      Browse all lead types &rarr;
                    </Link>
                  </div>
                )}
              </div>

              {/* Guides */}
              <div className="border-b border-secondary-300 pb-2">
                <button
                  type="button"
                  onClick={() => toggleMobileSection('guides')}
                  className="flex w-full items-center justify-between px-4 py-2 text-base font-medium uppercase tracking-wide text-black hover:bg-secondary-100"
                  aria-expanded={mobileSection === 'guides'}
                >
                  Guides
                  <Chevron open={mobileSection === 'guides'} />
                </button>
                {mobileSection === 'guides' && (
                  <div className="ml-4 space-y-3 pb-2">
                    {guideColumns.map((col) => (
                      <div key={col._id}>
                        <Link
                          href={`/${col.slug}`}
                          className="block px-4 py-1 text-xs font-bold uppercase tracking-wide text-black"
                          onClick={closeMobile}
                        >
                          {col.title}
                        </Link>
                        {col.articles.map((article) => (
                          <Link
                            key={article._id}
                            href={`/${cleanSlug(col.slug)}/${cleanSlug(article.slug)}`}
                            className="block px-4 py-1.5 text-sm text-secondary-500 hover:text-black"
                            onClick={closeMobile}
                          >
                            {article.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <Link
                      href="/blog"
                      className="block px-4 py-1.5 text-sm font-bold text-black"
                      onClick={closeMobile}
                    >
                      Read the blog &rarr;
                    </Link>
                  </div>
                )}
              </div>

              {/* Resources */}
              <div className="border-b border-secondary-300 pb-2">
                <Link
                  href="/resources"
                  className="block px-4 py-2 text-base font-medium uppercase tracking-wide text-black hover:bg-secondary-100"
                  onClick={closeMobile}
                >
                  Resources
                </Link>
                <div className="ml-4 space-y-1">
                  {RESOURCES_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-1.5 text-sm text-secondary-500 hover:text-black"
                      onClick={closeMobile}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="border-b border-secondary-300 pb-2">
                <Link
                  href={ABOUT_HREF}
                  className="block px-4 py-2 text-base font-medium uppercase tracking-wide text-black hover:bg-secondary-100"
                  onClick={closeMobile}
                >
                  About
                </Link>
              </div>

              <div className="px-4 pt-4 text-center">
                <Button href={CTA_HREF} variant="primary" className="w-full" utmCampaign="header-nav-mobile">
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
