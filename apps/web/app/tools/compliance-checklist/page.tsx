import type { Metadata } from 'next'
import Link from 'next/link'
import { ComplianceChecklist } from '@/components/tools/ComplianceChecklist'
import { Hero, CTASection, NewsletterForm } from '@/components/content'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'
import { FAQJsonLd, HowToJsonLd, WebPageJsonLd } from '@/components/seo'
import { absoluteUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Lead Compliance Checklist',
  description:
    'Interactive compliance checklist for buying and working internet leads. TCPA, DNC, CAN-SPAM, and industry-specific requirements — check every box before your next campaign.',
  alternates: {
    canonical: 'https://www.howtoworkleads.com/tools/compliance-checklist',
  },
  openGraph: {
    title: 'Lead Compliance Checklist | How To Work Leads',
    description:
      'Interactive compliance checklist for buying and working internet leads. TCPA, DNC, CAN-SPAM, and industry-specific requirements — check every box before your next campaign.',
    url: 'https://www.howtoworkleads.com/tools/compliance-checklist',
    siteName: 'How To Work Leads',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'Do I really need to DNC scrub aged leads?',
    answer:
      'Yes — fines are $500-$1,500 per violation, per call. Aged leads may have added themselves to the DNC registry since the original inquiry. The small cost of scrubbing (pennies per lead) is negligible compared to the risk. Scrub every list, every time, regardless of what your vendor promises.',
  },
  {
    question: 'What if my vendor says leads are pre-scrubbed?',
    answer:
      "Trust but verify. Even if your vendor scrubs against the National DNC Registry, the list changes daily. A lead that was clean when the vendor scrubbed it could be on the DNC list by the time you call. Best practice: scrub again yourself before every campaign. It's cheap insurance against expensive fines.",
  },
  {
    question: 'Can I get in trouble for calling an aged lead?',
    answer:
      'Only if you violate TCPA/DNC rules. The consumer gave consent when they filled out the original form, and that consent covers follow-up contact. As long as you DNC scrub, call during legal hours, display your real caller ID, and honor opt-out requests, you are protected. Follow this checklist and document everything.',
  },
]

const howToSteps = [
  { name: 'Verify your lead vendor', text: 'Confirm DNC scrubbing, consent documentation, source transparency, and return policy before purchasing any leads.' },
  { name: 'Prepare for calling', text: 'Scrub your list against federal and state DNC registries, verify calling hours, set up proper caller ID, and train reps on opt-out procedures.' },
  { name: 'Set up SMS compliance', text: 'Verify prior express written consent, configure STOP/opt-out auto-replies, identify your business in messages, and complete 10DLC registration.' },
  { name: 'Configure email compliance', text: 'Include physical address (CAN-SPAM), add unsubscribe links, use accurate sender names, and honor opt-outs within 10 business days.' },
  { name: 'Check industry-specific rules', text: 'Review state DOI requirements (insurance), CMS guidelines (Medicare), TILA/RESPA rules (mortgage), and verify state licensing.' },
  { name: 'Establish record keeping', text: 'Document consent records, maintain call logs, record DNC scrub dates, track opt-outs, and retain all records for 5+ years.' },
]

const breadcrumbs = [
  { label: 'Tools', href: '/tools/aged-lead-roi-calculator' },
  { label: 'Compliance Checklist' },
]

export default function ComplianceChecklistPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <WebPageJsonLd
        title="Lead Compliance Checklist"
        description="Interactive compliance checklist for buying and working internet leads. TCPA, DNC, CAN-SPAM, and industry-specific requirements."
        url={absoluteUrl('/tools/compliance-checklist')}
      />
      <HowToJsonLd
        name="How to Ensure Compliance When Working Internet Leads"
        description="A step-by-step checklist covering TCPA, DNC, CAN-SPAM, and industry-specific requirements for buying and working aged leads legally."
        steps={howToSteps}
      />
      <FAQJsonLd faqs={faqs} />

      <Hero
        headline="Lead Compliance Checklist"
        subheadline="Before you make your first call, send your first text, or launch your first email — make sure you're compliant. Use this interactive checklist to verify you've covered every legal requirement for buying and working internet leads."
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
              <strong>Fines:</strong> $500-$1,500 per TCPA violation — per call or text. A single day of
              calling an unscrubbed list of 200 leads could expose you to $100,000-$300,000 in fines.
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
              <strong>TCPA (Telephone Consumer Protection Act)</strong> — Governs all phone calls and text
              messages to consumers. Requires prior express consent, DNC scrubbing, and calling hour
              restrictions. For a deep dive, see our{' '}
              <Link href="/blog/aged-leads-dnc-compliance">DNC compliance guide</Link>.
            </p>
            <p>
              <strong>CAN-SPAM Act</strong> — Governs commercial email. Requires accurate sender
              identification, physical mailing address, functional unsubscribe mechanism, and honest subject
              lines. Violations are up to $51,744 per email.
            </p>
            <p>
              <strong>FCC 1:1 Consent Rule</strong> — The FCC&apos;s newer ruling requiring one-to-one consent
              for lead selling. This changes how lead generators collect and transfer consent. See our{' '}
              <Link href="/blog/fcc-consent-rule-lead-buying">FCC consent rule guide</Link> for how this
              affects aged leads specifically.
            </p>
            <p>
              <strong>State laws</strong> — California (CCPA/CPRA), Florida, New York, and several other
              states have telemarketing and privacy laws that are stricter than federal rules. Always check
              the requirements for the lead&apos;s state, not just your state.
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
            headline="Compliant and Ready? Get Aged Leads Now"
            features={[
              'DNC-scrubbed data from a trusted vendor.',
              'Documented consent and source transparency.',
              'Return policy for bad data — your compliance safety net.',
            ]}
            ctaText="Buy Aged Leads"
            ctaLink="https://agedleadstore.com/all-lead-types/"
            secondaryCtaText="Book a Lead Strategy Call"
            secondaryCtaLink="https://calendar.app.google/6WQdrfLe2xHDKa8Y8"
            subtext="Use Promo Code: BILLRICE to get 10% off — every order!"
            utmCampaign="tools-compliance-checklist-bottom"
            variant="primary"
          />
        </div>
      </div>
    </>
  )
}
