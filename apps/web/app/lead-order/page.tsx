import { Metadata } from 'next'
import { LeadOrderForm } from '@/components/content/LeadOrderForm'

export const metadata: Metadata = {
  title: 'Request Leads | How To Work Leads',
  description: 'Submit your lead request and get a custom quote for high-quality aged leads. Life insurance, health insurance, mortgage, solar, and more.',
  openGraph: {
    title: 'Request Leads | How To Work Leads',
    description: 'Submit your lead request and get a custom quote for high-quality aged leads.',
    type: 'website',
  },
}

export default function LeadOrderPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-black text-white py-16 sm:py-20">
        <div className="container-narrow text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Request Your Custom Lead Quote
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Tell me about the leads you need, and I&apos;ll find the best options for your business.
            Get started with a quick questionnaire below.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section bg-gray-100">
        <div className="container-narrow">
          <LeadOrderForm />
        </div>
      </section>

      {/* Trust Section */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="section-header">
            <h2 className="section-title">Why Work With Me?</h2>
            <p className="section-description">
              I help sales professionals get the leads they need at the best prices
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
                <svg className="h-7 w-7 text-primary-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Vetted Lead Sources</h3>
              <p className="mt-2 text-gray-600">
                I work with trusted lead providers to ensure you get quality, compliant leads that convert.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary-100">
                <svg className="h-7 w-7 text-secondary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Competitive Pricing</h3>
              <p className="mt-2 text-gray-600">
                Get access to wholesale lead pricing through my network of suppliers and aggregators.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-100">
                <svg className="h-7 w-7 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Personalized Support</h3>
              <p className="mt-2 text-gray-600">
                Get expert guidance on lead selection, working strategies, and maximizing your ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Types Section */}
      <section className="section bg-gray-50">
        <div className="container-wide">
          <div className="section-header">
            <h2 className="section-title">Lead Types Available</h2>
            <p className="section-description">
              I can help you source leads across all major verticals
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Life Insurance', icon: '🛡️' },
              { title: 'Health Insurance', icon: '🏥' },
              { title: 'Medicare', icon: '👴' },
              { title: 'Final Expense', icon: '📋' },
              { title: 'Auto Insurance', icon: '🚗' },
              { title: 'Home Insurance', icon: '🏠' },
              { title: 'Mortgage/Refi', icon: '🏦' },
              { title: 'Solar', icon: '☀️' },
            ].map((type) => (
              <div key={type.title} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                <span className="text-2xl">{type.icon}</span>
                <span className="font-medium text-gray-900">{type.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container-narrow">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">What are aged leads?</h3>
              <p className="mt-2 text-gray-600">
                Aged leads are prospects who originally filled out a form requesting information but weren&apos;t
                immediately converted. They&apos;re typically 30-180+ days old and cost significantly less than fresh leads.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">How quickly will I receive my leads?</h3>
              <p className="mt-2 text-gray-600">
                Most lead orders are fulfilled within 24-48 hours. Larger or more specific orders may take
                a bit longer to ensure quality matching.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">What format will my leads be delivered in?</h3>
              <p className="mt-2 text-gray-600">
                Leads are typically delivered as CSV files that can be easily imported into your CRM.
                I can also help with direct CRM integration if needed.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Are these leads TCPA compliant?</h3>
              <p className="mt-2 text-gray-600">
                All leads come from opt-in web forms where consumers requested information. However,
                you&apos;re responsible for following applicable laws and respecting opt-out requests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-800 text-white">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold sm:text-4xl text-white">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">
            Fill out the form above, or book a call to discuss your lead needs in detail.
          </p>
          <div className="mt-8">
            <a
              href="https://calendar.app.google/Kc6UTzAM5pn11ocv6"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-800 transition-colors hover:bg-primary-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Lead Strategy Call
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
