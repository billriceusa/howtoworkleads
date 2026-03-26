import type { Metadata } from 'next'
import Link from 'next/link'
import { ComplianceChecklist } from '@/components/tools/ComplianceChecklist'
import { Hero, CTASection, NewsletterForm } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { FAQJsonLd, HowToJsonLd, WebPageJsonLd } from '@/components/seo'
import { absoluteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Lead Buying Compliance Checklist',
  description:
    'Interactive 40-point compliance checklist for buying and calling internet leads. Covers TCPA, DNC scrubbing, CAN-SPAM, SMS/10DLC, and safe harbor protection. Check every box before your next campaign.',
  alternates: {
    canonical: 'https://www.howtoworkleads.com/tools/compliance-checklist',
  },
  openGraph: {
    title: 'Lead Buying Compliance Checklist | How To Work Leads',
    description:
      'Interactive 40-point compliance checklist for buying and calling internet leads. Covers TCPA, DNC scrubbing, CAN-SPAM, SMS/10DLC, and safe harbor protection.',
    url: 'https://www.howtoworkleads.com/tools/compliance-checklist',
    siteName: 'How To Work Leads',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'Do I really need to DNC scrub aged leads?',
    answer:
      'Yes. Fines are $500 to $1,500 per violation, per call. Aged leads may have added themselves to the DNC registry since the original inquiry. The small cost of scrubbing (pennies per lead) is negligible compared to the risk. Scrub every list, every time, regardless of what your vendor promises.',
  },
  {
    question: 'How often do I need to scrub against the DNC registry?',
    answer:
      'Every 31 days. This is a federal requirement, not a suggestion. If your last scrub was more than 31 days ago, you must re-scrub before calling. Keep dated records of every scrub to establish safe harbor protection.',
  },
  {
    question: 'What happened to the FCC 1:1 consent rule?',
    answer:
      'The FCC 1:1 consent rule was vacated by the 11th Circuit Court of Appeals in January 2025. It never took effect. Lead generators are not currently required to obtain one-to-one consent naming each specific seller. However, best practices still recommend clear, transparent consent language.',
  },
  {
    question: 'What is the DNC exemption window for aged leads?',
    answer:
      'There are two exemption windows. Inquiry-based: You can contact a consumer for 3 months after they submit an inquiry (even if they are on the DNC list). Transaction-based: You can contact an existing customer for 18 months after their last transaction. After these windows close, DNC rules apply fully.',
  },
  {
    question: 'Do I need written consent to send marketing texts?',
    answer:
      'Yes. Prior express written consent (PEWC) is required for all marketing texts, auto-dialed calls, prerecorded voice messages, and AI-generated voice calls. Simple verbal or implied consent is not sufficient for these contact methods. Manual dialing to landlines requires only prior express consent (not written).',
  },
]

const howToSteps = [
  {
    name: 'Vet your lead vendor',
    text: 'Verify DNC scrubbing is included, request consent documentation with exact opt-in language, confirm consent covers your calling method, and check the return policy for bad data.',
  },
  {
    name: 'Prepare your calling list',
    text: 'Complete DNC scrub within the last 31 days against federal and state registries, check the reassigned number database, remove known TCPA litigators, verify consent level matches your calling method (PEWC for auto-dialers), and assess lead age against exemption windows.',
  },
  {
    name: 'Follow calling rules',
    text: "Call only between 8 AM and 9 PM in the lead's local time zone, display your real business number on caller ID, identify yourself immediately, and honor opt-out requests permanently.",
  },
  {
    name: 'Set up SMS compliance',
    text: 'Verify prior express written consent, complete 10DLC registration, include "Reply STOP to opt out" in every message, and process STOP requests immediately with no follow-up texts.',
  },
  {
    name: 'Configure email compliance',
    text: 'Include unsubscribe link and physical business address in every email, use accurate sender names and non-deceptive subject lines, and honor unsubscribe requests within 10 business days.',
  },
  {
    name: 'Establish safe harbor protection',
    text: 'Document written DNC compliance policies, implement employee training, maintain an active internal DNC suppression list, retain proof of DNC registry access every 31 days, and keep all scrub records for 5+ years.',
  },
  {
    name: 'Maintain records',
    text: 'Archive consent documentation for each lead source, save DNC scrub logs with dates and counts, log opt-out requests with timestamps, store call recordings for 5+ years, and share your internal DNC list with affiliates.',
  },
]

const breadcrumbs = [
  { label: 'Tools', href: '/tools' },
  { label: 'Compliance Checklist' },
]

export default function ComplianceChecklistPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <WebPageJsonLd
        title="Lead Buying Compliance Checklist"
        description="Interactive 40-point compliance checklist for buying and calling internet leads. Covers TCPA, DNC scrubbing, CAN-SPAM, SMS/10DLC, and safe harbor protection."
        url={absoluteUrl('/tools/compliance-checklist')}
      />
      <HowToJsonLd
        name="How to Ensure Compliance When Buying and Calling Internet Leads"
        description="A 7-step, 40-point checklist covering TCPA, DNC, CAN-SPAM, SMS, and safe harbor requirements for buying and working internet leads legally."
        steps={howToSteps}
      />
      <FAQJsonLd faqs={faqs} />

      {/* SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Lead Buying Compliance Checklist',
            description:
              'Free interactive checklist to verify TCPA, DNC, CAN-SPAM, and safe harbor compliance before buying or calling internet leads.',
            url: absoluteUrl('/tools/compliance-checklist'),
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            author: {
              '@type': 'Organization',
              name: 'HowToWorkLeads',
            },
          }),
        }}
      />

      <Hero
        headline="Lead Buying Compliance Checklist"
        subheadline="40 items across 7 sections. Check every box before you buy leads, make your first call, send a text, or launch an email campaign. Your progress saves automatically."
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="mx-auto max-w-3xl">
          {/* Checklist */}
          <ComplianceChecklist />

          {/* Supporting Content */}
          <div className="prose-custom mt-16">
            <h2>Why Compliance Matters (More Than You Think)</h2>
            <p>
              <strong>Fines:</strong> TCPA violations carry penalties of $500 per violation (standard)
              and $1,500 per willful violation. Federal DNC registry violations can reach $43,280 per
              violation. A single day of calling an unscrubbed list of 200 leads could expose you to
              $100,000 to $300,000 in fines.
            </p>
            <p>
              <strong>Lawsuits:</strong> Class action attorneys actively monitor for systematic TCPA
              violations. One complaint can trigger regulatory scrutiny and legal action that costs far
              more than any lead campaign could generate.
            </p>
            <p>
              <strong>Reputation:</strong> A single compliance violation can damage your professional
              reputation, jeopardize your license, and destroy trust with prospects and partners.
            </p>
            <p>
              <strong>The good news:</strong> Compliance is straightforward once you have a system. This
              checklist IS that system. Check every box, document everything, and you&apos;re protected.
            </p>

            <h2>Key Regulations Explained</h2>
            <p>
              <strong>TCPA (Telephone Consumer Protection Act)</strong> &mdash; Governs all phone calls
              and text messages to consumers. Requires prior express consent for manual calls and prior
              express written consent (PEWC) for auto-dialers, prerecorded voice, AI voice, and
              marketing texts. Penalties: $500/violation standard, $1,500/willful. For a deep dive, see
              our{' '}
              <Link href="/blog/tcpa-compliance-lead-buyers">TCPA compliance guide for lead buyers</Link>.
            </p>
            <p>
              <strong>DNC (Do Not Call) Registry</strong> &mdash; Federal and state registries that
              consumers can join to block telemarketing calls. You must scrub your list every 31 days.
              Exemptions: 3 months after an inquiry, 18 months after a transaction. Penalties up to
              $43,280 per violation. See our{' '}
              <Link href="/blog/aged-leads-dnc-compliance">DNC compliance guide</Link> for details.
            </p>
            <p>
              <strong>FCC 1:1 Consent Rule</strong> &mdash; The FCC proposed a rule requiring
              one-to-one consent for lead selling. This rule was <strong>vacated by the 11th Circuit
              Court of Appeals in January 2025</strong> and never took effect. Lead generators are not
              currently required to obtain per-seller consent, though best practices still recommend
              clear consent language.
            </p>
            <p>
              <strong>CAN-SPAM Act</strong> &mdash; Governs commercial email. Requires accurate sender
              identification, physical mailing address, functional unsubscribe mechanism, and honest
              subject lines. Violations can reach $51,744 per email.
            </p>
            <p>
              <strong>State laws</strong> &mdash; California (CCPA/CPRA), Florida, New York, and several
              other states have telemarketing and privacy laws that are stricter than federal rules.
              Always check the requirements for the lead&apos;s state, not just your state.
            </p>

            <h2>FAQ</h2>
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-12">
            <NewsletterForm />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            headline="Compliant and Ready? Get DNC-Scrubbed Aged Leads"
            features={[
              'Every lead is DNC-scrubbed before delivery — included, not an add-on.',
              'Documented consent and source transparency for every lead.',
              'Return policy for bad data — your compliance safety net.',
            ]}
            ctaText="Buy DNC-Scrubbed Aged Leads"
            ctaLink="https://agedleadstore.com/all-lead-types/"
            secondaryCtaText="Subscribe to The Aged Lead Playbook"
            secondaryCtaLink="#newsletter"
            utmCampaign="tools-compliance-checklist-bottom"
            variant="primary"
          />
        </div>
      </div>
    </>
  )
}
