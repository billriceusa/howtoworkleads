import type { Metadata } from 'next'
import { Hero, CTASection, NewsletterForm } from '@/components/content'
import { Button } from '@/components/ui'
import { HowToJsonLd } from '@/components/seo'
import { Breadcrumbs, BreadcrumbsJsonLd } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Consumer Data Email Starter Stack',
  description:
    'Step-by-step guide to emailing consumer leads with maximum deliverability and response. Set up in one afternoon for ~$40/month.',
  alternates: {
    canonical: 'https://howtoworkleads.com/resources/email-starter-stack',
  },
  openGraph: {
    title: 'Consumer Data Email Starter Stack | How To Work Leads',
    description:
      'Step-by-step guide to emailing consumer leads with maximum deliverability and response. Set up in one afternoon for ~$40/month.',
    url: 'https://howtoworkleads.com/resources/email-starter-stack',
    siteName: 'How To Work Leads',
    type: 'article',
  },
}

const breadcrumbs = [
  { label: 'Resources', href: '/resources' },
  { label: 'Email Starter Stack' },
]

export default function EmailStarterStackPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <HowToJsonLd
        name="Consumer Data Email Starter Stack"
        description="Your step-by-step guide to emailing consumer leads with maximum deliverability and response."
        steps={[
          { name: 'Buy a Separate Outreach Domain', text: 'Purchase a separate outreach domain to protect your main business domain from spam filters.' },
          { name: 'Set Up Google Workspace', text: 'Set up Google Workspace on your outreach domain for a professional email address with SPF and DKIM.' },
          { name: 'Verify Your Lead Emails', text: 'Use ZeroBounce or NeverBounce to verify email addresses before sending. Remove invalid addresses.' },
          { name: 'Install GMass', text: 'Install the GMass Chrome extension and connect your verified lead list via Google Sheets.' },
          { name: 'Write Your Email', text: 'Write short, plain-text, personalized emails with one link maximum and a clear subject line.' },
          { name: 'Set Your Sending Speed', text: 'Start with 10-15 emails per day and gradually increase to 30-50 per day over three weeks.' },
          { name: 'Set Up Your Unsubscribe Link', text: 'Enable auto-append unsubscribe link in GMass settings. This is legally required by CAN-SPAM.' },
          { name: 'Hit Send and Track Results', text: 'Send your campaign and track open rates, reply rates, bounce rates, and unsubscribe rates.' },
        ]}
      />

      {/* Hero */}
      <Hero
        headline="Consumer Data Email Starter Stack"
        subheadline="Your step-by-step guide to emailing consumer leads with maximum deliverability and response. Set up in one afternoon for ~$40/month."
        ctaText="Buy Aged Leads"
        ctaLink="https://agedleadstore.com/all-lead-types/"
        downloadText="Download the Free PDF Guide"
        downloadLink="/downloads/Consumer-Data-Email-Starter-Stack-Guide.pdf"
        utmCampaign="email-starter-stack-hero"
        size="md"
      />

      <div className="container-wide py-8">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <div className="prose-custom">

              {/* Quick Stats */}
              <div className="not-prose mb-12 grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Monthly Cost', value: '~$40/month' },
                  { label: 'Daily Send Volume', value: '20-50 emails' },
                  { label: 'Setup Time', value: 'One afternoon' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="border-2 border-black p-4 text-center"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wide text-secondary-500">
                      {stat.label}
                    </div>
                    <div className="mt-1 text-lg font-bold text-black">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* PDF Download Banner */}
              <div className="not-prose mb-12 flex items-center justify-between border-2 border-brand-yellow bg-brand-yellow/10 p-6">
                <div>
                  <p className="font-semibold text-black">
                    Want this guide as a PDF?
                  </p>
                  <p className="text-sm text-secondary-500">
                    Download and print it out or share it with your team.
                  </p>
                </div>
                <Button
                  href="/downloads/Consumer-Data-Email-Starter-Stack-Guide.pdf"
                  variant="primary"
                  size="md"
                >
                  Download PDF
                </Button>
              </div>

              {/* Why This Guide Exists */}
              <h2 id="why-this-guide-exists">Why This Guide Exists</h2>

              <p>
                You&apos;ve got a list of consumer leads — people who previously
                expressed interest in insurance, mortgage, financial, or similar
                products. Whether those leads are fresh or aged, the opportunity
                is real.
              </p>

              <p>
                But the opportunity only converts if your emails actually land in
                inboxes and get opened.
              </p>

              <p>
                This guide gives you a dead-simple, low-cost system to email
                consumer data with the highest possible delivery rate and
                response rate. No marketing degree required. No expensive
                software. Just a proven process any insurance agent or mortgage
                broker can set up in a single afternoon.
              </p>

              {/* CAN-SPAM Box */}
              <div className="not-prose my-8 border-l-4 border-brand-yellow bg-brand-yellow/10 p-6">
                <h3 className="mb-2 text-lg font-bold text-black">
                  Know the Rules (It&apos;s Simpler Than You Think)
                </h3>
                <p className="mb-4 text-secondary-800">
                  <strong>CAN-SPAM says cold commercial email is legal</strong>{' '}
                  in the US on an opt-out basis. You do NOT need prior consent to
                  email. But you MUST follow these rules:
                </p>
                <ul className="mb-4 space-y-2 text-secondary-800">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-brand-yellow">&#9632;</span>
                    Use your real name and business name in the &quot;From&quot;
                    field
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-brand-yellow">&#9632;</span>
                    Write honest, non-deceptive subject lines
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-brand-yellow">&#9632;</span>
                    Include your physical mailing address (P.O. Box is fine)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-brand-yellow">&#9632;</span>
                    Include a working unsubscribe link in every email
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-brand-yellow">&#9632;</span>
                    Honor unsubscribe requests within 10 business days
                  </li>
                </ul>
                <p className="text-sm font-semibold text-red-600">
                  Violations can cost $50,000+ per email. Follow these rules and
                  you&apos;re fully legal.
                </p>
              </div>

              {/* Email Starter Stack */}
              <h2 id="your-email-starter-stack">Your Email Starter Stack</h2>

              <p>
                You only need four things. Total cost: about $40/month plus a
                few dollars per batch for email verification.
              </p>

              <div className="not-prose my-8 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="px-4 py-3 text-left font-semibold">
                        Tool
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        What It Does
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="px-4 py-3 font-medium">
                        Outreach domain (via GoDaddy)
                      </td>
                      <td className="px-4 py-3">
                        Separate domain that protects your main business website
                      </td>
                      <td className="px-4 py-3">~$12/year</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        Google Workspace
                      </td>
                      <td className="px-4 py-3">
                        Professional email on your outreach domain
                      </td>
                      <td className="px-4 py-3">$7/month</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="px-4 py-3 font-medium">
                        ZeroBounce or NeverBounce
                      </td>
                      <td className="px-4 py-3">
                        Verifies email addresses before you send
                      </td>
                      <td className="px-4 py-3">~$8 per 1,000 emails</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-medium">GMass</td>
                      <td className="px-4 py-3">
                        Sends personalized emails from your Gmail inbox
                      </td>
                      <td className="px-4 py-3">$25/month</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Step-by-Step Setup */}
              <h2 id="step-by-step-setup">Step-by-Step Setup</h2>

              {/* Step 1 */}
              <div className="not-prose my-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-brand-yellow text-black font-bold text-lg">
                    1
                  </span>
                  <h3 className="text-xl font-bold text-black">
                    Buy a Separate Outreach Domain
                  </h3>
                </div>
              </div>

              <p>
                This is the single smartest thing you can do before sending a
                single email.{' '}
                <strong>
                  Never send cold outreach from your main business domain.
                </strong>{' '}
                If your emails trigger spam filters or get reported, it&apos;s
                your outreach domain that takes the hit — not the domain where
                your website, business email, and reputation live.
              </p>

              <h3>How to pick your outreach domain name:</h3>

              <p>
                Use a variation of your business name that&apos;s clearly
                associated with you but separate. Add a prefix like
                &quot;go&quot;, &quot;get&quot;, &quot;try&quot;,
                &quot;meet&quot;, or &quot;hello&quot; to your business name.
              </p>

              <div className="not-prose my-8 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="px-4 py-3 text-left font-semibold">
                        Your Business
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Main Domain
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Outreach Domain
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="px-4 py-3 font-medium">Smith Insurance</td>
                      <td className="px-4 py-3">smithinsurance.com</td>
                      <td className="px-4 py-3">gosmithinsurance.com</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-medium">Apex Mortgage</td>
                      <td className="px-4 py-3">apexmortgage.com</td>
                      <td className="px-4 py-3">getapexmortgage.com</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="px-4 py-3 font-medium">
                        Premier Financial
                      </td>
                      <td className="px-4 py-3">premierfinancial.com</td>
                      <td className="px-4 py-3">meetpremierfinancial.com</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-medium">Davis Agency</td>
                      <td className="px-4 py-3">davisagency.com</td>
                      <td className="px-4 py-3">trydavisagency.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="not-prose my-8 border-l-4 border-blue-500 bg-blue-50 p-6">
                <h4 className="mb-2 text-base font-bold text-black">
                  Buying Your Domain
                </h4>
                <p className="mb-3 text-sm font-semibold text-secondary-800">
                  How to buy your domain on GoDaddy (5 minutes):
                </p>
                <ol className="mb-3 list-decimal space-y-1 pl-5 text-sm text-secondary-800">
                  <li>
                    Go to <strong>godaddy.com</strong> and search for your
                    chosen domain name.
                  </li>
                  <li>
                    Pick a <strong>.com</strong> domain if available. If not,{' '}
                    <strong>.co</strong> or <strong>.net</strong> work too.
                  </li>
                  <li>
                    Add to cart and check out. Decline all add-ons and upsells.
                  </li>
                  <li>
                    Total cost should be around{' '}
                    <strong>$12-15/year</strong>.
                  </li>
                </ol>
                <p className="text-xs italic text-secondary-500">
                  Don&apos;t build a website on this domain. You just need it
                  for email. A simple one-page landing page with your business
                  info is fine but not required.
                </p>
              </div>

              {/* Step 2 */}
              <div className="not-prose my-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-brand-yellow text-black font-bold text-lg">
                    2
                  </span>
                  <h3 className="text-xl font-bold text-black">
                    Set Up Google Workspace on Your Outreach Domain
                  </h3>
                </div>
              </div>

              <p>
                Google Workspace gives you a professional email address on your
                outreach domain (like mike@gosmithinsurance.com). It costs
                $7/month and takes about 15 minutes.
              </p>

              <h3>Here&apos;s exactly what to do:</h3>

              <ol>
                <li>
                  Go to <strong>workspace.google.com</strong> and click
                  &quot;Get Started.&quot;
                </li>
                <li>
                  Enter your business name and select your outreach domain (the
                  one you just bought on GoDaddy).
                </li>
                <li>
                  Create your email address. Use your real first name:{' '}
                  <strong>mike@gosmithinsurance.com</strong> or{' '}
                  <strong>sarah@getapexmortgage.com</strong>.
                </li>
                <li>
                  Google will ask you to verify domain ownership. Follow the
                  instructions — you&apos;ll add a small code to your GoDaddy
                  DNS settings. Google walks you through it step by step.
                </li>
                <li>
                  Once verified, Google automatically configures{' '}
                  <strong>SPF</strong> and <strong>DKIM</strong> — these are
                  email authentication records that prove you&apos;re a
                  legitimate sender.
                </li>
              </ol>

              <ProTip>
                Add a <strong>DMARC</strong> record too. In your GoDaddy DNS
                settings, add a TXT record with the name{' '}
                <strong>_dmarc</strong> and the value{' '}
                <strong>
                  v=DMARC1; p=none; rua=mailto:your@email.com
                </strong>
                . This is a one-time 5-minute task that further protects your
                deliverability.
              </ProTip>

              {/* Step 3 */}
              <div className="not-prose my-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-brand-yellow text-black font-bold text-lg">
                    3
                  </span>
                  <h3 className="text-xl font-bold text-black">
                    Verify Your Lead Emails Before Sending
                  </h3>
                </div>
              </div>

              <p>
                This is the most important step for deliverability. Consumer
                lead data — especially aged leads — contains email addresses
                where people have changed jobs, switched providers, or abandoned
                old accounts. Sending to dead addresses destroys your sender
                reputation and gets you flagged as spam.
              </p>

              <h3>Here&apos;s exactly what to do:</h3>

              <ol>
                <li>
                  Go to <strong>zerobounce.net</strong> or{' '}
                  <strong>neverbounce.com</strong> and create a free account.
                </li>
                <li>Upload your CSV file of leads.</li>
                <li>
                  The tool checks every email address and flags which ones are
                  valid, invalid, or risky.
                </li>
                <li>
                  Download the cleaned list — only keep the &quot;valid&quot;
                  addresses.
                </li>
                <li>
                  For aged data, expect to remove 20-40% of addresses.
                  That&apos;s normal and exactly why this step matters.
                </li>
              </ol>

              <ProTip>
                ZeroBounce gives you 100 free verifications to start. After
                that, it&apos;s about $8 per 1,000 emails. This small investment
                saves your domain reputation.
              </ProTip>

              {/* Step 4 */}
              <div className="not-prose my-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-brand-yellow text-black font-bold text-lg">
                    4
                  </span>
                  <h3 className="text-xl font-bold text-black">
                    Install GMass and Connect Your Google Sheet
                  </h3>
                </div>
              </div>

              <p>
                GMass is a Chrome extension that turns your Gmail into a mail
                merge and outreach tool. It&apos;s the simplest way to send
                personalized emails from a real inbox.
              </p>

              <ol>
                <li>
                  Go to <strong>gmass.co</strong> and install the Chrome
                  extension.
                </li>
                <li>
                  Open Google Sheets and paste your verified lead list (from Step
                  3) into a new spreadsheet. Make sure you have columns for
                  First Name, Last Name, and Email at minimum.
                </li>
                <li>
                  Open Gmail (logged into your outreach domain account).
                  You&apos;ll see a new GMass button next to the Send button.
                </li>
                <li>
                  Click the GMass icon, connect your Google Sheet, and GMass will
                  pull in your lead list automatically.
                </li>
              </ol>

              <ProTip>
                GMass has a free tier that lets you send 50 emails/day. Perfect
                for testing before you commit to the $25/month plan.
              </ProTip>

              {/* Step 5 */}
              <div className="not-prose my-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-brand-yellow text-black font-bold text-lg">
                    5
                  </span>
                  <h3 className="text-xl font-bold text-black">
                    Write Your Email (Keep It Human)
                  </h3>
                </div>
              </div>

              <p>
                Gmail&apos;s spam filters use AI to detect mass marketing
                emails. The secret to landing in the inbox is to write emails
                that look and feel like a real person wrote them — because you
                did.
              </p>

              <h3>Rules for your email:</h3>

              <ul>
                <li>
                  <strong>Plain text only.</strong> No images, no HTML
                  formatting, no colored text, no logos.
                </li>
                <li>
                  <strong>Short.</strong> 3-5 sentences max. Respect their time.
                </li>
                <li>
                  <strong>One link maximum.</strong> Your calendar link or
                  website. That&apos;s it.
                </li>
                <li>
                  <strong>Personalize.</strong> Use {'{FirstName}'} merge tags.
                  Reference the type of product they were interested in.
                </li>
                <li>
                  <strong>Clear subject line.</strong> &quot;Quick question about
                  your life insurance options&quot; beats &quot;EXCLUSIVE OFFER
                  INSIDE!!!&quot;
                </li>
              </ul>

              {/* Email Template */}
              <div className="not-prose my-8 border-2 border-gray-200 bg-gray-50 p-6">
                <h4 className="mb-4 text-base font-bold text-black">
                  Sample Email Template
                </h4>
                <div className="border-b border-gray-300 pb-3 mb-4">
                  <p className="text-sm">
                    <strong>Subject:</strong> Quick question, {'{FirstName}'}
                  </p>
                </div>
                <div className="space-y-3 text-sm text-secondary-800">
                  <p>Hi {'{FirstName}'},</p>
                  <p>
                    I noticed you were exploring life insurance options a while
                    back. I&apos;m a licensed agent in [your state] and I help
                    people find coverage that fits their budget.
                  </p>
                  <p>
                    Would it be worth a quick 5-minute call to see if I can help?
                    No pressure at all.
                  </p>
                  <p>
                    Best,
                    <br />
                    [Your Name]
                    <br />
                    [Your Phone Number]
                    <br />
                    [Your Company]
                    <br />
                    [Your Address]
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="not-prose my-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-brand-yellow text-black font-bold text-lg">
                    6
                  </span>
                  <h3 className="text-xl font-bold text-black">
                    Set Your Sending Speed (Small Batches Win)
                  </h3>
                </div>
              </div>

              <p>
                This is where most people mess up. They try to blast hundreds of
                emails at once and immediately get flagged as spam. The right
                approach is the opposite: <strong>slow and steady</strong>.
              </p>

              <h3>Recommended sending schedule:</h3>

              <ul>
                <li>
                  <strong>Week 1:</strong> Send 10-15 emails per day
                </li>
                <li>
                  <strong>Week 2:</strong> Increase to 20-25 per day
                </li>
                <li>
                  <strong>Week 3+:</strong> Settle at 30-50 per day
                </li>
              </ul>

              <p>
                In GMass, go to Settings and set your daily sending limit. GMass
                will automatically space your emails throughout the day so they
                don&apos;t all go out at once.
              </p>

              <ProTip>
                50 emails/day = 250/week = 1,000/month. That&apos;s a very
                solid outreach volume for a solo agent. And because you&apos;re
                sending from a real Gmail account at human speed, your delivery
                rate stays above 95%.
              </ProTip>

              {/* Mid-page CTA */}
              <div className="not-prose my-12">
                <CTASection
                  headline="Need Leads to Email?"
                  description="Get high-quality aged consumer leads — insurance, mortgage, solar, and more."
                  ctaText="Buy Aged Leads"
                  ctaLink="https://agedleadstore.com/all-lead-types/"
                            utmCampaign="email-starter-stack-mid"
                />
              </div>

              {/* Step 7 */}
              <div className="not-prose my-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-brand-yellow text-black font-bold text-lg">
                    7
                  </span>
                  <h3 className="text-xl font-bold text-black">
                    Set Up Your Unsubscribe Link
                  </h3>
                </div>
              </div>

              <p>
                This is legally required and GMass makes it automatic.
              </p>

              <p>
                In GMass settings, enable the &quot;Auto-append unsubscribe
                link&quot; option. GMass adds a small, clean unsubscribe link at
                the bottom of every email. When someone clicks it, they&apos;re
                automatically removed from future sends.
              </p>

              <p>
                Don&apos;t hide it or make it hard to find. A visible unsubscribe
                link actually <strong>helps</strong> your deliverability — it
                tells Gmail you&apos;re a legitimate sender who respects
                recipients.
              </p>

              {/* Step 8 */}
              <div className="not-prose my-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-brand-yellow text-black font-bold text-lg">
                    8
                  </span>
                  <h3 className="text-xl font-bold text-black">
                    Hit Send and Track Your Results
                  </h3>
                </div>
              </div>

              <p>
                Once everything is set up, click the GMass button to send your
                campaign. GMass will show you real-time stats:
              </p>

              <ul>
                <li>
                  <strong>Open rate</strong> — aim for 30%+ (great for cold
                  email)
                </li>
                <li>
                  <strong>Reply rate</strong> — aim for 3-8% (excellent for
                  consumer leads)
                </li>
                <li>
                  <strong>Bounce rate</strong> — should be under 2% if you
                  verified in Step 3
                </li>
                <li>
                  <strong>Unsubscribe rate</strong> — under 1% is healthy
                </li>
              </ul>

              <p>
                Reply to every response personally and promptly. These are warm
                conversations — treat them like gold.
              </p>

              <ProTip>
                Send a follow-up email 3-4 days later to people who opened but
                didn&apos;t reply. GMass can automate this with its built-in
                sequence feature. A simple &quot;Just bumping this to the top of
                your inbox&quot; can double your response rate.
              </ProTip>

              {/* Deliverability Checklist */}
              <h2 id="deliverability-checklist">Deliverability Checklist</h2>

              <p>
                Before you send your first campaign, run through this checklist:
              </p>

              <div className="not-prose my-8">
                <ul className="space-y-3">
                  {[
                    'Separate outreach domain purchased (not your main business domain)',
                    'Google Workspace set up on outreach domain',
                    'SPF, DKIM, and DMARC configured (SPF/DKIM are auto with Google Workspace)',
                    'Email list verified through ZeroBounce or NeverBounce',
                    'Plain text email written (no images, no HTML formatting)',
                    'Subject line is honest and specific',
                    'Physical mailing address included in email (P.O. Box works)',
                    'Unsubscribe link enabled in GMass',
                    'Daily send limit set to 20-50',
                    'Follow-up sequence created (optional but recommended)',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-b border-gray-200 pb-3"
                    >
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center border-2 border-brand-yellow text-xs">
                        &nbsp;
                      </span>
                      <span className="text-sm text-secondary-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Do's and Don'ts */}
              <h2 id="dos-and-donts">Do&apos;s and Don&apos;ts</h2>

              <div className="not-prose my-8 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-4 text-lg font-bold text-green-700">
                    DO
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Use a separate outreach domain',
                      'Verify emails before every send',
                      'Write short, conversational emails',
                      'Send 20-50 emails per day',
                      'Use plain text formatting',
                      'Include a clear unsubscribe link',
                      'Follow up 1-2 times politely',
                      'Respond to replies within hours',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 border-b border-gray-200 pb-2 text-sm"
                      >
                        <span className="mt-0.5 text-green-600 font-bold">
                          &#10003;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-lg font-bold text-red-700">
                    DON&apos;T
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Send cold email from your main domain',
                      'Send to unverified, raw lists',
                      'Write long marketing newsletters',
                      'Blast 500+ emails at once',
                      'Use images, logos, or HTML templates',
                      'Hide or omit the unsubscribe option',
                      'Send 10 follow-ups to non-responders',
                      'Let warm leads sit for days',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 border-b border-gray-200 pb-2 text-sm"
                      >
                        <span className="mt-0.5 text-red-600 font-bold">
                          &#10007;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ready to Level Up */}
              <h2 id="ready-to-level-up">Ready to Level Up?</h2>

              <p>
                Once you&apos;re comfortable with the Starter Stack and want
                more automation, tracking, and pipeline management, consider
                upgrading to a CRM with built-in email outreach. Here are the
                best options for insurance agents and mortgage brokers:
              </p>

              <div className="not-prose my-8 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="px-4 py-3 text-left font-semibold">CRM</th>
                      <th className="px-4 py-3 text-left font-semibold">Best For</th>
                      <th className="px-4 py-3 text-left font-semibold">Email Features</th>
                      <th className="px-4 py-3 text-left font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { crm: 'Instantly.ai', best: 'Cold email at scale', features: 'Unlimited accounts, warmup, AI writing, auto follow-ups', price: 'From $30/mo' },
                      { crm: 'GoHighLevel', best: 'All-in-one marketing for insurance/mortgage', features: 'Email + SMS + CRM + landing pages + automation', price: 'From $97/mo' },
                      { crm: 'Mailshake', best: 'Simple cold email with phone dialer', features: 'Email sequences, A/B testing, built-in phone dialer', price: 'From $29/mo' },
                      { crm: 'Woodpecker', best: 'Small teams doing B2C cold email', features: 'Auto follow-ups, bounce shield, deliverability monitor', price: 'From $29/mo' },
                      { crm: 'Close CRM', best: 'Sales-focused CRM with calling built in', features: 'Email sequences, power dialer, SMS, pipeline mgmt', price: 'From $29/mo' },
                      { crm: 'HubSpot CRM', best: 'Growing teams who want a free CRM base', features: 'Email tracking, templates, sequences (paid tier)', price: 'Free CRM; Email from $20/mo' },
                    ].map((row, i) => (
                      <tr
                        key={row.crm}
                        className={`border-b border-gray-200 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="px-4 py-3 font-medium">{row.crm}</td>
                        <td className="px-4 py-3">{row.best}</td>
                        <td className="px-4 py-3">{row.features}</td>
                        <td className="px-4 py-3">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recommendation */}
              <div className="not-prose my-8 bg-black p-8 text-white">
                <h4 className="mb-2 text-base font-bold text-brand-yellow">
                  Our Recommendation
                </h4>
                <p className="mb-3 text-sm font-semibold">
                  For most agents and brokers:
                </p>
                <p className="mb-3 text-sm opacity-90">
                  Start with the{' '}
                  <strong>Starter Stack</strong> (outreach domain + Google
                  Workspace + ZeroBounce + GMass) for your first 30 days. This
                  lets you learn the process, refine your messaging, and see real
                  results with minimal investment.
                </p>
                <p className="text-sm opacity-90">
                  Once you&apos;re consistently getting replies and booking
                  appointments, upgrade to <strong>Instantly.ai</strong> (if you
                  want to scale email volume) or{' '}
                  <strong>GoHighLevel</strong> (if you want an all-in-one system
                  with SMS, landing pages, and appointment booking).
                </p>
              </div>

              {/* Final CTA */}
              <div className="not-prose my-12">
                <CTASection
                  headline="Get Started with Aged Leads Today"
                  description="Insurance, mortgage, solar, and more — verified and ready to work."
                  ctaText="Buy Aged Leads"
                  ctaLink="https://agedleadstore.com/all-lead-types/"
                            downloadText="Download the Free PDF Guide"
                  downloadLink="/downloads/Consumer-Data-Email-Starter-Stack-Guide.pdf"
                  utmCampaign="email-starter-stack-bottom"
                />
              </div>

              {/* Disclaimer */}
              <div className="not-prose mt-12 border-t border-gray-200 pt-6">
                <p className="text-xs italic text-secondary-500">
                  Disclaimer: This guide is for informational purposes only and
                  does not constitute legal advice. Consult with a qualified
                  attorney regarding email marketing compliance in your specific
                  jurisdiction. Tool pricing and features are subject to change.
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-12">
              <NewsletterForm />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="mt-12 lg:col-span-4 lg:mt-0">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div className="border border-gray-200 p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  In This Guide
                </h3>
                <nav>
                  <ul className="space-y-2">
                    {[
                      { id: 'why-this-guide-exists', label: 'Why This Guide Exists' },
                      { id: 'your-email-starter-stack', label: 'Your Email Starter Stack' },
                      { id: 'step-by-step-setup', label: 'Step-by-Step Setup' },
                      { id: 'deliverability-checklist', label: 'Deliverability Checklist' },
                      { id: 'dos-and-donts', label: "Do's and Don'ts" },
                      { id: 'ready-to-level-up', label: 'Ready to Level Up?' },
                    ].map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-gray-600 hover:text-black transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Download Box */}
              <div className="border-2 border-brand-yellow bg-brand-yellow/10 p-6 text-center">
                <h3 className="mb-2 text-base font-bold text-black">
                  Download This Guide
                </h3>
                <p className="mb-4 text-sm text-secondary-500">
                  Get the PDF version to print or share with your team.
                </p>
                <Button
                  href="/downloads/Consumer-Data-Email-Starter-Stack-Guide.pdf"
                  variant="primary"
                  size="md"
                >
                  Download PDF
                </Button>
              </div>

              {/* Buy Leads Box */}
              <div className="bg-black p-6 text-center text-white">
                <h3 className="mb-2 text-base font-bold text-brand-yellow">
                  Need Leads?
                </h3>
                <p className="mb-4 text-sm opacity-80">
                  Get aged consumer leads at a fraction of real-time prices.
                </p>
                <Button
                  href="https://agedleadstore.com/all-lead-types/"
                  variant="ghost-dark"
                  size="md"
                  utmCampaign="email-starter-stack-sidebar"
                >
                  Buy Aged Leads
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 border-l-4 border-green-500 bg-green-50 p-5">
      <p className="mb-1 text-sm font-bold text-green-800">Pro Tip</p>
      <p className="text-sm text-secondary-800">{children}</p>
    </div>
  )
}
