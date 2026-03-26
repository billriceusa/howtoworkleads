'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { getALSDeepLink, appendALSUtm, trackEvent } from '@/lib/analytics'

/* ─── Vertical Configuration ─── */

type Vertical =
  | 'Life Insurance'
  | 'Health Insurance'
  | 'Medicare'
  | 'Auto Insurance'
  | 'Mortgage'
  | 'Home Improvement'
  | 'Solar'
  | 'Final Expense'
  | 'IUL'
  | 'Other'

interface VerticalConfig {
  agedPrice: number
  freshPrice: number
  commission: number
  deepLinkSlug: string
}

const VERTICAL_CONFIG: Record<Vertical, VerticalConfig> = {
  'Life Insurance': { agedPrice: 1.0, freshPrice: 15.0, commission: 500, deepLinkSlug: 'life-insurance' },
  'Health Insurance': { agedPrice: 0.75, freshPrice: 12.0, commission: 300, deepLinkSlug: 'health-insurance' },
  'Medicare': { agedPrice: 1.25, freshPrice: 20.0, commission: 400, deepLinkSlug: 'medicare' },
  'Auto Insurance': { agedPrice: 0.35, freshPrice: 8.0, commission: 200, deepLinkSlug: 'auto-insurance' },
  'Mortgage': { agedPrice: 1.5, freshPrice: 35.0, commission: 5000, deepLinkSlug: 'mortgage' },
  'Home Improvement': { agedPrice: 1.0, freshPrice: 25.0, commission: 3000, deepLinkSlug: 'home-improvement' },
  'Solar': { agedPrice: 1.5, freshPrice: 30.0, commission: 4000, deepLinkSlug: 'solar' },
  'Final Expense': { agedPrice: 1.0, freshPrice: 12.0, commission: 350, deepLinkSlug: 'final-expense' },
  'IUL': { agedPrice: 1.5, freshPrice: 25.0, commission: 2000, deepLinkSlug: 'iul' },
  'Other': { agedPrice: 1.0, freshPrice: 15.0, commission: 500, deepLinkSlug: '' },
}

const VERTICALS = Object.keys(VERTICAL_CONFIG) as Vertical[]

/* ─── Helpers ─── */

function fmt(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
}

function fmtDec(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

function fmtPct(n: number): string {
  return `${n >= 0 ? '+' : ''}${n.toFixed(0)}%`
}

function fmtNum(n: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(n)
}

function calcResults(costPerLead: number, numLeads: number, contactRate: number, appointmentRate: number, closeRate: number, commission: number) {
  const investment = costPerLead * numLeads
  const contacts = numLeads * (contactRate / 100)
  const appointments = contacts * (appointmentRate / 100)
  const deals = appointments * (closeRate / 100)
  const revenue = deals * commission
  const roi = investment > 0 ? ((revenue - investment) / investment) * 100 : 0
  const cpa = deals > 0 ? investment / deals : 0
  const revenuePerLead = numLeads > 0 ? revenue / numLeads : 0
  return { investment, contacts, appointments, deals, revenue, roi, cpa, revenuePerLead }
}

/* ─── Page Component ─── */

export default function ROICalculatorPage() {
  const [vertical, setVertical] = useState<Vertical>('Life Insurance')
  const [costPerLead, setCostPerLead] = useState(VERTICAL_CONFIG['Life Insurance'].agedPrice)
  const [numLeads, setNumLeads] = useState(500)
  const [contactRate, setContactRate] = useState(35)
  const [appointmentRate, setAppointmentRate] = useState(25)
  const [closeRate, setCloseRate] = useState(15)
  const [commission, setCommission] = useState(VERTICAL_CONFIG['Life Insurance'].commission)
  const [showFreshComparison, setShowFreshComparison] = useState(false)

  const config = VERTICAL_CONFIG[vertical]

  function handleVerticalChange(v: Vertical) {
    setVertical(v)
    const cfg = VERTICAL_CONFIG[v]
    setCostPerLead(cfg.agedPrice)
    setCommission(cfg.commission)
    trackEvent('roi_calc_vertical_change', { vertical: v })
  }

  const aged = useMemo(
    () => calcResults(costPerLead, numLeads, contactRate, appointmentRate, closeRate, commission),
    [costPerLead, numLeads, contactRate, appointmentRate, closeRate, commission]
  )

  const fresh = useMemo(
    () => calcResults(config.freshPrice, numLeads, contactRate, appointmentRate, closeRate, commission),
    [config.freshPrice, numLeads, contactRate, appointmentRate, closeRate, commission]
  )

  const alsLink = appendALSUtm(
    getALSDeepLink(config.deepLinkSlug),
    'tools-roi-calculator-cta'
  )

  const pageUrl = 'https://www.howtoworkleads.com/tools/aged-lead-roi-calculator'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Aged Lead ROI Calculator',
    description:
      'Free calculator to estimate your return on investment when buying aged leads. Compare aged vs. fresh lead pricing across insurance, mortgage, solar, and more.',
    url: pageUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: 'HowToWorkLeads', url: 'https://www.howtoworkleads.com' },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "What's a good ROI on aged leads?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: '200-500% ROI is common with a good system. Some top-performing agents see 1,000%+ ROI. The key factors are your close rate, deal value, and cost per lead.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much cheaper are aged leads than fresh leads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aged leads typically cost 10-20x less than fresh leads. For example, a fresh mortgage lead costs $35 while an aged mortgage lead costs $1.50. Use the comparison toggle in our calculator to see the exact difference for your vertical.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is my ROI negative?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "A negative ROI usually means your close rate is too low or your average deal value is too small relative to your lead cost. Check your follow-up cadence, scripts, and CRM setup before blaming lead quality.",
        },
      },
    ],
  }

  return (
    <>
      {/* SEO metadata via head tags */}
      <title>Aged Lead ROI Calculator | How To Work Leads</title>
      <meta
        name="description"
        content="Calculate your ROI on aged leads instantly. Compare aged vs. fresh lead pricing across insurance, mortgage, solar, and home improvement. Free interactive tool."
      />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:title" content="Aged Lead ROI Calculator | How To Work Leads" />
      <meta
        property="og:description"
        content="Calculate your ROI on aged leads instantly. Compare aged vs. fresh lead pricing across insurance, mortgage, solar, and home improvement."
      />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="How To Work Leads" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Aged Lead ROI Calculator | How To Work Leads" />
      <meta
        name="twitter:description"
        content="Calculate your ROI on aged leads instantly. Compare aged vs. fresh lead pricing."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-secondary-800 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <nav className="mb-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools" className="hover:text-white">Tools</Link>
            <span className="mx-2">/</span>
            <span className="text-brand-yellow">ROI Calculator</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
            Aged Lead ROI Calculator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Find out exactly how much revenue your aged lead investment could generate.
            Adjust the inputs to match your business, or use our industry benchmarks.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Calculator Grid */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* ─── Inputs Panel ─── */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 bg-white p-6">
              <h2 className="mb-6 font-serif text-xl font-bold text-secondary-800">
                Your Numbers
              </h2>

              {/* Vertical */}
              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-secondary-800">
                  Vertical
                </label>
                <select
                  value={vertical}
                  onChange={(e) => handleVerticalChange(e.target.value as Vertical)}
                  className="w-full border border-gray-300 bg-white px-3 py-2.5 text-secondary-800 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                >
                  {VERTICALS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Cost per Lead */}
              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-secondary-800">
                  Cost per Lead
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={costPerLead}
                    onChange={(e) => setCostPerLead(parseFloat(e.target.value) || 0)}
                    className="w-full border border-gray-300 py-2.5 pl-7 pr-3 text-secondary-800 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>
              </div>

              {/* Number of Leads */}
              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-secondary-800">
                  Number of Leads
                </label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={numLeads}
                  onChange={(e) => setNumLeads(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 px-3 py-2.5 text-secondary-800 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
              </div>

              {/* Contact Rate */}
              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-secondary-800">
                  Contact Rate: {contactRate}%
                </label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={contactRate}
                  onChange={(e) => setContactRate(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none bg-gray-200 accent-brand-yellow"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>1%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Appointment/Quote Rate */}
              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-secondary-800">
                  Appointment / Quote Rate: {appointmentRate}%
                </label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={appointmentRate}
                  onChange={(e) => setAppointmentRate(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none bg-gray-200 accent-brand-yellow"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>1%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Close Rate */}
              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-secondary-800">
                  Close Rate: {closeRate}%
                </label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={closeRate}
                  onChange={(e) => setCloseRate(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none bg-gray-200 accent-brand-yellow"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>1%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Average Commission */}
              <div className="mb-2">
                <label className="mb-1.5 block text-sm font-semibold uppercase tracking-wide text-secondary-800">
                  Avg Commission / Revenue per Sale
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={commission}
                    onChange={(e) => setCommission(parseFloat(e.target.value) || 0)}
                    className="w-full border border-gray-300 py-2.5 pl-7 pr-3 text-secondary-800 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ─── Results Panel ─── */}
          <div className="lg:col-span-3">
            {/* ROI Hero Card */}
            <div className={`p-8 text-center ${aged.roi >= 0 ? 'bg-secondary-800 text-white' : 'bg-red-700 text-white'}`}>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                Your Estimated ROI
              </p>
              <p className="mt-2 font-serif text-5xl font-bold md:text-6xl">
                <span className={aged.roi >= 0 ? 'text-brand-yellow' : 'text-red-200'}>
                  {fmtPct(aged.roi)}
                </span>
              </p>
              <p className="mt-3 text-lg">
                {fmt(aged.revenue)} revenue on a {fmt(aged.investment)} investment
              </p>
              {aged.roi < 0 && (
                <p className="mt-3 text-sm text-red-200">
                  Tip: Increase your close rate or deal value, or reduce cost per lead to reach profitability.
                </p>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="mt-1 grid grid-cols-2 gap-px bg-gray-200">
              <MetricCard label="Total Investment" value={fmt(aged.investment)} />
              <MetricCard label="Contacts Made" value={fmtNum(aged.contacts)} />
              <MetricCard label="Appointments Set" value={fmtNum(aged.appointments)} />
              <MetricCard label="Deals Closed" value={fmtNum(aged.deals)} />
              <MetricCard label="Cost per Acquisition" value={aged.cpa > 0 ? fmt(aged.cpa) : '--'} />
              <MetricCard label="Revenue per Lead" value={fmtDec(aged.revenuePerLead)} />
            </div>

            {/* Fresh Comparison Toggle */}
            <div className="mt-6 border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-secondary-800">Compare with Fresh Leads</h3>
                  <p className="mt-0.5 text-sm text-gray-500">
                    See how aged leads stack up against fresh lead pricing at {fmtDec(config.freshPrice)}/lead
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowFreshComparison(!showFreshComparison)
                    trackEvent('roi_calc_compare_toggle', { state: showFreshComparison ? 'off' : 'on' })
                  }}
                  className={`relative inline-flex h-7 w-12 items-center transition-colors ${
                    showFreshComparison ? 'bg-brand-yellow' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={showFreshComparison}
                >
                  <span
                    className={`inline-block h-5 w-5 transform bg-white shadow-sm transition-transform ${
                      showFreshComparison ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {showFreshComparison && (
                <div className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="pb-3 text-left font-semibold text-secondary-800">Metric</th>
                          <th className="pb-3 text-right font-semibold text-brand-yellow-hover">
                            Aged Leads
                          </th>
                          <th className="pb-3 text-right font-semibold text-gray-500">
                            Fresh Leads
                          </th>
                          <th className="pb-3 text-right font-semibold text-secondary-800">
                            Savings
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <ComparisonRow
                          label="Cost per Lead"
                          aged={fmtDec(costPerLead)}
                          fresh={fmtDec(config.freshPrice)}
                          savings={`${((1 - costPerLead / config.freshPrice) * 100).toFixed(0)}% less`}
                        />
                        <ComparisonRow
                          label="Total Investment"
                          aged={fmt(aged.investment)}
                          fresh={fmt(fresh.investment)}
                          savings={fmt(fresh.investment - aged.investment)}
                        />
                        <ComparisonRow
                          label="Deals Closed"
                          aged={fmtNum(aged.deals)}
                          fresh={fmtNum(fresh.deals)}
                          savings="Same"
                        />
                        <ComparisonRow
                          label="Total Revenue"
                          aged={fmt(aged.revenue)}
                          fresh={fmt(fresh.revenue)}
                          savings="Same"
                        />
                        <ComparisonRow
                          label="ROI"
                          aged={fmtPct(aged.roi)}
                          fresh={fmtPct(fresh.roi)}
                          savings={`${(aged.roi - fresh.roi).toFixed(0)}pp better`}
                          highlight
                        />
                        <ComparisonRow
                          label="Cost per Acquisition"
                          aged={aged.cpa > 0 ? fmt(aged.cpa) : '--'}
                          fresh={fresh.cpa > 0 ? fmt(fresh.cpa) : '--'}
                          savings={aged.cpa > 0 && fresh.cpa > 0 ? fmt(fresh.cpa - aged.cpa) : '--'}
                        />
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 border-l-4 border-brand-yellow bg-primary-50 p-4">
                    <p className="text-sm text-secondary-800">
                      <strong>Bottom line:</strong> At the same conversion rates, aged leads save you{' '}
                      <strong>{fmt(fresh.investment - aged.investment)}</strong> on a batch of {fmtNum(numLeads)} leads
                      while generating the same {fmt(aged.revenue)} in revenue.
                      Your ROI jumps from {fmtPct(fresh.roi)} to{' '}
                      <strong className="text-brand-yellow-hover">{fmtPct(aged.roi)}</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Supporting Content ─── */}
        <div className="prose-custom mx-auto mt-16 max-w-3xl">
          <h2>How to Interpret Your Results</h2>
          <p>
            <strong>200%+ ROI is the target.</strong> This means for every $1 you invest in aged leads,
            you&apos;re generating $3 or more in revenue. Most agents with a working system &mdash; scripts,
            cadence, CRM &mdash; hit this range consistently.
          </p>
          <p>
            <strong>Cost per acquisition (CPA) matters more than cost per lead.</strong> A $3 lead that
            converts at 2% gives you a $150 CPA. A $0.50 lead that converts at 0.3% gives you a $167 CPA.
            Cheaper leads aren&apos;t always better &mdash; focus on the total cost to close a deal.
          </p>
          <p>
            <strong>The break-even insight:</strong> Even closing ONE deal from a batch of aged leads is
            often profitable. If your average commission is $1,000 and you spent $500 on 500 leads at $1
            each, one closed deal puts you $500 ahead. Everything after that is pure profit.
          </p>

          <h2>How to Improve Your Aged Lead ROI</h2>
          <p>
            <strong>Increase your close rate</strong> with better{' '}
            <Link href="/blog/aged-lead-scripts-templates">scripts</Link>, more follow-up touches through a{' '}
            <Link href="/blog/aged-lead-follow-up-cadence">proven cadence</Link>, and automated{' '}
            <Link href="/blog/aged-lead-email-drip-campaigns">email drip sequences</Link>.
          </p>
          <p>
            <strong>Decrease your cost per lead</strong> by buying in larger volumes (most vendors offer
            10-30% discounts), using slightly older leads (60-180 days instead of 30-60), or negotiating
            with your vendor. See our{' '}
            <Link href="/blog/aged-lead-pricing-guide">pricing guide</Link> for current rates.
          </p>
          <p>
            <strong>Increase your deal value</strong> through upsells, cross-sells, and bundled products.
            An insurance agent who sells a final expense policy AND an annuity on the same lead doubles
            their revenue per conversion.
          </p>

          <h2>FAQ</h2>

          <h3>What&apos;s a good ROI on aged leads?</h3>
          <p>
            200-500% ROI is common with a good system &mdash; meaning for every $1 you spend on aged leads, you
            generate $3-$6 in revenue. Some top-performing agents see 1,000%+ ROI. The key factors are
            your close rate, deal value, and cost per lead. Use the calculator above to see where you stand.
          </p>

          <h3>How much cheaper are aged leads than fresh leads?</h3>
          <p>
            Aged leads typically cost 10-20x less than fresh leads. For example, a fresh mortgage lead
            costs $35 while an aged mortgage lead costs $1.50. Toggle the &quot;Compare with Fresh Leads&quot;
            switch above to see the exact difference for your vertical.
          </p>

          <h3>Why is my ROI negative?</h3>
          <p>
            A negative ROI usually means your close rate is too low or your average deal value is too small
            relative to your lead cost. Before blaming the leads, check your system: Are you completing your
            full follow-up cadence? Are your scripts optimized? Is your CRM automating touches? Most
            negative ROI is a system problem, not a lead quality problem.
          </p>
        </div>

        {/* ─── ALS CTA ─── */}
        <div className="mx-auto mt-16 max-w-4xl bg-secondary-800 p-8 text-center text-white md:p-12">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            Ready to Test Your ROI? Get{' '}
            <span className="text-brand-yellow">{vertical}</span> Leads Now
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            DNC-scrubbed, compliant data. No contracts &mdash; buy what you need, when you need it.
            Use your ROI numbers above to set your budget and volume.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={alsLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('cta_click', {
                  link_url: alsLink,
                  link_text: `Buy ${vertical} Leads`,
                  is_als: 'true',
                  utm_campaign: 'tools-roi-calculator-cta',
                })
              }
              className="inline-flex items-center justify-center bg-brand-yellow px-8 py-4 text-sm font-semibold uppercase tracking-wide text-black transition-all duration-200 hover:scale-[1.02] hover:bg-brand-yellow-hover focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
            >
              Buy {vertical} Leads
            </a>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              All Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Sub-Components ─── */

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-secondary-800">{value}</p>
    </div>
  )
}

function ComparisonRow({
  label,
  aged,
  fresh,
  savings,
  highlight = false,
}: {
  label: string
  aged: string
  fresh: string
  savings: string
  highlight?: boolean
}) {
  return (
    <tr className={highlight ? 'bg-primary-50 font-semibold' : ''}>
      <td className="py-3 pr-4 text-secondary-800">{label}</td>
      <td className="py-3 text-right text-secondary-800">{aged}</td>
      <td className="py-3 text-right text-gray-500">{fresh}</td>
      <td className="py-3 text-right text-green-700">{savings}</td>
    </tr>
  )
}
