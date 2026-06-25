import type { Metadata } from 'next'

/**
 * Terms of Service / Terms of Use
 * Baseline terms for an educational content site. This is boilerplate, not
 * binding legal advice — have counsel review before relying on the liability
 * and governing-law terms.
 */

const siteName = 'HowToWorkLeads'
const domain = 'howtoworkleads.com'
const contactEmail = 'hello@howtoworkleads.com'
const lastUpdated = 'June 25, 2026'
const link = 'text-primary-800 underline hover:text-primary-900'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `${siteName} terms of service — the terms that govern your use of ${domain}.`,
  alternates: { canonical: '/terms-of-service' },
  robots: { index: false, follow: true },
}

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: {lastUpdated}</p>

      <div className="mt-10 space-y-8 text-base leading-7 text-gray-600">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of these terms</h2>
          <p>
            {siteName} ({domain}) is operated by Bill Rice Strategy Group (BRC LLC d/b/a Bill Rice Strategy Group).
            By accessing or using this site, you agree to these Terms of Service. If you do not agree, please do not
            use the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Educational content — not professional advice</h2>
          <p>
            The content on this site is for general educational and informational purposes about working internet
            and aged leads. It is not legal, compliance, financial, or other professional advice, and it is not a
            substitute for advice from a qualified professional who knows your specific situation. You are
            responsible for your own compliance with applicable laws — including the TCPA, DNC rules, and state
            telemarketing and consumer-protection laws — when contacting leads. Verify anything important before you
            act on it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Affiliate links and related companies</h2>
          <p>
            This site contains affiliate links and links to companies affiliated with Bill Rice Strategy Group,
            including AgedLeadStore.com. We may earn compensation when you act on those links. See our{' '}
            <a href="/affiliate-disclosure" className={link}>affiliate disclosure</a> for details. Your use of any
            third-party site is governed by that site&apos;s own terms and policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No warranties</h2>
          <p>
            The site and its content are provided &quot;as is&quot; and &quot;as available,&quot; without warranties
            of any kind, express or implied, including accuracy, completeness, fitness for a particular purpose, or
            non-infringement. We do not warrant that the site will be uninterrupted, error-free, or free of harmful
            components.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Bill Rice Strategy Group and its operators will not be liable for
            any indirect, incidental, consequential, special, or punitive damages, or any loss of profits or
            revenues, arising out of or related to your use of (or inability to use) this site or any content on it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual property</h2>
          <p>
            The content, design, and trademarks on this site are owned by Bill Rice Strategy Group or its licensors
            and are protected by applicable intellectual-property laws. You may view and share content for personal,
            non-commercial use with attribution; you may not republish or resell it without permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Changes are posted on this page with an updated date.
            Continued use of the site after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
          <p>
            Questions about these terms? Contact us at{' '}
            <a href={`mailto:${contactEmail}`} className={link}>{contactEmail}</a>.
          </p>
        </section>
      </div>
    </main>
  )
}
