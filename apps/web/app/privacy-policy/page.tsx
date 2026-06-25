import type { Metadata } from 'next'

/**
 * Privacy Policy
 * Canonical BRSG fleet privacy policy, adapted to the howtoworkleads.com theme.
 * Implements the Privacy Policy & CCPA/CPRA Standard v1.0
 * (standards.billricestrategy.com/compliance/standards/privacy-policy/).
 */

const config = {
  siteName: 'How to Work Leads',
  domain: 'howtoworkleads.com',
  contactEmail: 'hello@howtoworkleads.com',
  lastUpdated: 'June 25, 2026',
  hasNewsletter: true,
  hasLeadForm: true, // gated downloads
  hasAffiliateLinks: true, // AgedLeadStore funnel + affiliate links
}

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `${config.siteName} privacy policy — what we collect, how we use it, your CCPA/CPRA rights, and how to contact us.`,
  alternates: { canonical: '/privacy-policy' },
  robots: { index: false, follow: true },
}

const c = config
const link = 'text-primary-800 underline hover:text-primary-900'

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: {c.lastUpdated}</p>

      <div className="mt-10 space-y-8 text-base leading-7 text-gray-600">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p>
            {c.siteName} (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is operated by Bill Rice Strategy Group
            (BRC LLC d/b/a Bill Rice Strategy Group). This policy explains what information we collect when you visit{' '}
            {c.domain}, how we use it, who we share it with, and the rights you have over it.
          </p>
          <p className="mt-4">
            We collect minimal data and we do not sell your personal information. This notice is provided at and
            before the point of collection, and the full policy is always available here.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Information you provide</h3>
          <ul className="space-y-2 list-disc list-inside">
            {c.hasNewsletter && (
              <li><strong className="text-gray-900">Newsletter signup:</strong> your email address when you subscribe. Stored with our email service provider.</li>
            )}
            {c.hasLeadForm && (
              <li><strong className="text-gray-900">Downloads and forms:</strong> information you enter to access a free download or contact us — typically your name and email.</li>
            )}
            <li><strong className="text-gray-900">Direct contact:</strong> information you include when you email us.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Information collected automatically</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-gray-900">Analytics data:</strong> pages viewed, time on site, referral source, device type, and approximate (country/city-level) location, gathered via cookies and similar identifiers.</li>
            <li><strong className="text-gray-900">Server logs:</strong> IP addresses, browser type, and request timestamps logged by our hosting provider for security and performance.</li>
          </ul>

          <p className="mt-4">
            In CCPA terms, these fall into the categories of <em>identifiers</em> (name, email, IP address) and{' '}
            <em>internet or other electronic network activity</em> (browsing data). We do not knowingly collect
            Social Security numbers, financial account numbers, or other sensitive personal information through this
            site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
          <ul className="space-y-2 list-disc list-inside">
            {c.hasNewsletter && <li>To send our newsletter, if you subscribed</li>}
            <li>To respond to your inquiries and provide the content or downloads you request</li>
            <li>To understand how our content is used and improve the site</li>
            <li>To detect and prevent abuse or security incidents</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Share Information</h2>
          <p>
            We share personal information only with service providers / processors that operate the site on our
            behalf — hosting, analytics, email delivery, and content management. They may process data only to
            provide their service to us. We do not sell your information or share it with third parties for their
            own marketing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sale or Sharing of Personal Information</h2>
          <p>
            We do <strong className="text-gray-900">not</strong> sell your personal information for money.
          </p>
          <p className="mt-4">
            Under the California Privacy Rights Act (CPRA), the use of third-party analytics or advertising cookies
            can be considered &quot;sharing&quot; personal information for cross-context behavioral advertising, even
            when no money changes hands. You can opt out of this sharing — see &quot;Do Not Sell or Share&quot;
            below.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Do Not Sell or Share My Personal Information</h3>
          <p>
            To opt out, you can: (1) disable analytics/advertising cookies in your browser or via the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={link}>
              Google Analytics Opt-out Add-on
            </a>
            ; and (2) email us at{' '}
            <a href={`mailto:${c.contactEmail}`} className={link}>{c.contactEmail}</a>{' '}
            with the subject &quot;Do Not Sell or Share&quot; and we will honor your request. We will not
            discriminate against you for exercising this right.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your California Privacy Rights (CCPA/CPRA)</h2>
          <p>If you are a California resident, you have the right to:</p>
          <ul className="mt-4 space-y-2 list-disc list-inside">
            <li><strong className="text-gray-900">Know and access</strong> the personal information we have collected and how we use and share it</li>
            <li><strong className="text-gray-900">Delete</strong> personal information we have collected from you</li>
            <li><strong className="text-gray-900">Correct</strong> inaccurate personal information</li>
            <li><strong className="text-gray-900">Opt out</strong> of the sale or sharing of your personal information</li>
            <li><strong className="text-gray-900">Limit</strong> the use of sensitive personal information (we do not collect it through this site)</li>
            <li><strong className="text-gray-900">Non-discrimination</strong> for exercising any of these rights</li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, email{' '}
            <a href={`mailto:${c.contactEmail}`} className={link}>{c.contactEmail}</a>. We may need to verify your
            identity before responding. Residents of other states with comparable privacy laws have similar rights
            and may use the same contact.
          </p>
        </section>

        {c.hasAffiliateLinks && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Affiliate Links and Related Companies</h2>
            <p>
              Some links on this site are affiliate links or point to companies affiliated with Bill Rice Strategy
              Group (including AgedLeadStore.com). When you click one, the destination may set cookies to track the
              referral, and we may include tracking parameters for our own analytics. These relationships are
              disclosed; see our affiliate and material-connection disclosures for details.
            </p>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
          <p>
            We use analytics cookies (such as Google Analytics) to measure site usage, and our tag manager to manage
            those tags. You can disable cookies through your browser settings; the site will continue to function
            without them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
          <p>
            We keep newsletter and contact information for as long as you remain subscribed or until you ask us to
            delete it. Download and form submissions are kept only as long as needed to act on your request and to
            meet legal or recordkeeping obligations. Analytics data is retained according to our analytics
            provider&apos;s default retention period.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Children&apos;s Privacy</h2>
          <p>
            This site is intended for sales and business professionals. We do not knowingly collect personal
            information from children under 13 (or under 16 for the purposes of sale/sharing). If you believe a
            child has provided us information, contact us and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
          <p>We may update this policy from time to time. Changes are posted on this page with an updated date.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p>
            For any privacy request or question, contact us at{' '}
            <a href={`mailto:${c.contactEmail}`} className={link}>{c.contactEmail}</a>.
          </p>
        </section>
      </div>
    </main>
  )
}
