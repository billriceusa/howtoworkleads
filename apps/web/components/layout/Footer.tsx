import Link from 'next/link'
import { getNavigation } from '@/lib/sanity/navigation'
import { Logo } from '@/components/ui'

// Helper to ensure slugs don't have leading/trailing slashes
function cleanSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '')
}

// Static company links (not in Sanity CMS)
const companyLinks = [
  { name: 'Aged Leads Guide', href: '/aged-leads' },
  { name: 'Tools', href: '/tools' },
  { name: 'Free Downloads', href: '/downloads' },
  { name: 'Blog', href: '/blog' },
  { name: 'Resources', href: '/resources' },
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
        {/* Brand Section */}
        <div className="space-y-4 mb-12">
          <Logo variant="dark" size="md" showEndorsement={true} />
          <p className="text-sm text-white/70 max-w-xs">
            Expert strategies and resources to help sales professionals convert internet leads into revenue.
          </p>
        </div>

        {/* Navigation Links Grid - 4 categories + Company */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Dynamic category columns */}
          {navigation.categories.slice(0, 4).map((category) => (
            <div key={category._id}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-yellow">
                {category.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {category.articles.slice(0, 5).map((article) => (
                  <li key={article._id}>
                    <Link
                      href={`/${cleanSlug(category.slug)}/${cleanSlug(article.slug)}`}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/${cleanSlug(category.slug)}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    View All {category.title}
                  </Link>
                </li>
              </ul>
            </div>
          ))}

          {/* Company Links - Static */}
          <div>
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
