import Link from 'next/link'
import { getNavigation } from '@/lib/sanity/navigation'
import { Logo } from '@/components/ui'

// Helper to ensure slugs don't have leading/trailing slashes
function cleanSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '')
}

// Static company links (not in Sanity CMS)
const companyLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
]

export async function Footer() {
  const navigation = await getNavigation()

  return (
    <footer className="bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-wide py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo variant="dark" size="md" showEndorsement={true} />
            <p className="text-sm text-white/70 max-w-xs">
              Expert strategies and resources to help sales professionals convert internet leads into revenue.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                className="text-white/70 hover:text-brand-yellow transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                className="text-white/70 hover:text-brand-yellow transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                className="text-white/70 hover:text-brand-yellow transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links - Dynamic from Sanity */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {navigation.categories.slice(0, 2).map((category) => (
                <div key={category._id} className={category === navigation.categories[1] ? 'mt-10 md:mt-0' : ''}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-yellow">
                    {category.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {category.articles.map((article) => (
                      <li key={article._id}>
                        <Link
                          href={`/${cleanSlug(category.slug)}/${cleanSlug(article.slug)}`}
                          className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                    {category.articles.length === 0 && (
                      <li>
                        <Link
                          href={`/${cleanSlug(category.slug)}`}
                          className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                          View All {category.title}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {navigation.categories.slice(2, 4).map((category, index) => (
                <div key={category._id} className={index > 0 ? 'mt-10 md:mt-0' : ''}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-yellow">
                    {category.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {category.articles.map((article) => (
                      <li key={article._id}>
                        <Link
                          href={`/${cleanSlug(category.slug)}/${cleanSlug(article.slug)}`}
                          className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                    {category.articles.length === 0 && (
                      <li>
                        <Link
                          href={`/${cleanSlug(category.slug)}`}
                          className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                          View All {category.title}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
              {/* Company Links - Static */}
              {navigation.categories.length < 4 && (
                <div className="mt-10 md:mt-0">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-yellow">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {companyLinks.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <p className="text-sm text-white/70 text-center">
            &copy; {new Date().getFullYear()} HowToWorkLeads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
