import type { Metadata } from 'next'

/**
 * Affiliate & Material-Connection Disclosure
 * Per the BRSG Affiliate & Sponsorship Disclosure Standard v1.1
 * (standards.billricestrategy.com/compliance/standards/affiliate-disclosure/)
 * and FTC 16 CFR Part 255. Discloses the AgedLeadStore.com material connection.
 */

const contactEmail = 'hello@howtoworkleads.com'
const lastUpdated = 'June 25, 2026'
const link = 'text-primary-800 underline hover:text-primary-900'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description:
    'How HowToWorkLeads makes money, our relationship with AgedLeadStore.com, our FTC affiliate disclosure, and our editorial independence policy.',
  alternates: { canonical: '/affiliate-disclosure' },
  robots: { index: false, follow: true },
}

export default function AffiliateDisclosurePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900">Affiliate &amp; Material-Connection Disclosure</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: {lastUpdated}</p>

      <div className="mt-10 space-y-8 text-base leading-7 text-gray-600">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The short version</h2>
          <p>
            HowToWorkLeads is operated by Bill Rice Strategy Group (BRC LLC d/b/a Bill Rice Strategy Group). We
            publish educational content about working internet and aged leads, and we earn revenue when readers act
            on some of the links and recommendations on this site. The most important relationship to know about is
            our connection to <strong className="text-gray-900">AgedLeadStore.com</strong>, disclosed below. Our
            educational recommendations are made on the merits and are not changed by these relationships.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our relationship with AgedLeadStore.com</h2>
          <p>
            Many of the calls-to-action on this site point to <strong className="text-gray-900">AgedLeadStore.com</strong>{' '}
            (&quot;buy leads,&quot; &quot;browse leads,&quot; &quot;create a free account&quot;). You should know that
            AgedLeadStore.com is a company we are affiliated with: Bill Rice, who operates this site through Bill Rice
            Strategy Group, also serves as the marketing director of AgedLeadStore.com. This is a{' '}
            <strong className="text-gray-900">material connection</strong> under FTC guidance — a relationship a
            reasonable reader would want to know about — so we disclose it plainly here and near the links themselves.
          </p>
          <p className="mt-4">
            Links to AgedLeadStore.com are marked as sponsored links (<code>rel=&quot;sponsored&quot;</code>) and we
            may earn compensation when you sign up or purchase through them, at no additional cost to you. We point
            readers to AgedLeadStore.com because we believe it is a strong option — not because we are paid to say
            so — but you should weigh our recommendation knowing the relationship exists.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Other affiliate links</h2>
          <p>
            Some other links on this site — for example to CRMs, dialers, or other sales tools we mention — may be
            affiliate links, meaning we may earn a commission if you sign up through them at no additional cost to
            you. Where a link is an affiliate or sponsored link, it is marked accordingly. Content that simply
            references a product category, or that cites public data, is editorial and carries no affiliate
            relationship.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Editorial independence</h2>
          <p>
            Affiliate and related-company relationships do not determine our editorial conclusions. We do not accept
            payment to change a recommendation, and a company cannot pay us to be recommended in content where it
            does not belong. When our interest in an outcome is material — as with AgedLeadStore.com — we tell you,
            so you can weigh the recommendation accordingly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions</h2>
          <p>
            If you have any questions about these relationships or this disclosure, contact us at{' '}
            <a href={`mailto:${contactEmail}`} className={link}>{contactEmail}</a>.
          </p>
        </section>
      </div>
    </main>
  )
}
