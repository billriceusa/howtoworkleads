/**
 * Life Insurance Pillar Expansion — appends pricing, filters, vendor checklist,
 * and FAQ schema block to /buying-leads/buy-life-insurance-leads.
 *
 * Target: the 3,674 impression / pos 28.8 page is the biggest untapped ranking
 * opportunity on the site. Same playbook as IUL pillar (shipped April 14).
 *
 * Run:
 *   node scripts/life-pillar-expansion.mjs              # dry run
 *   node scripts/life-pillar-expansion.mjs --apply      # apply
 */
import { randomBytes } from 'crypto'

const TOKEN = process.env.SANITY_API_TOKEN
const PROJECT = 'e9k38j42'
const DATASET = 'production'
const API_QUERY = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}`
const API_MUTATE = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`

if (!TOKEN) { console.error('SANITY_API_TOKEN required'); process.exit(1) }

const key = () => randomBytes(6).toString('hex')
const span = (text, marks = []) => ({ _type: 'span', _key: key(), text, marks })
const paragraph = (text) => ({
  _type: 'block', _key: key(), style: 'normal', markDefs: [], children: [span(text)],
})
const bulletItem = (text) => ({
  _type: 'block', _key: key(), style: 'normal', markDefs: [],
  listItem: 'bullet', level: 1, children: [span(text)],
})
const numberedItem = (text) => ({
  _type: 'block', _key: key(), style: 'normal', markDefs: [],
  listItem: 'number', level: 1, children: [span(text)],
})

const PRICING_SECTION = [
  paragraph('## Life Insurance Lead Pricing 2026: What You\'ll Actually Pay'),
  paragraph(
    'Life insurance lead pricing varies more than almost any other vertical because "life" covers everything from $50,000 term policies to $250,000+ permanent cases. Here\'s what you should expect to pay in 2026, broken down by freshness tier:'
  ),
  bulletItem('Real-time / fresh (0 to 7 days old): $12 to $40 per lead — useful for specific final-expense or mortgage protection campaigns where speed matters.'),
  bulletItem('15 to 30 days aged: $1.50 to $4 per lead — the most common sweet spot for life insurance aged lead buyers. Contact rates still strong, price dramatically lower.'),
  bulletItem('30 to 60 days aged: $0.75 to $1.50 per lead — profitable with a structured multi-channel cadence across calls, texts, and email.'),
  bulletItem('60 to 90 days aged: $0.40 to $0.80 per lead — bulk-buy tier for volume-focused operations. Contact rates drop but conversion is still achievable.'),
  bulletItem('90+ days aged: $0.10 to $0.40 per lead — deep aged. Best as list-wash, skip-trace source material, or for a final-attempt campaign with tight qualification.'),
  paragraph(
    'Product-specific pulls — term-only, IUL, whole life, final expense, mortgage protection — generally price 15 to 30 percent above a generic "life insurance" pull because the underlying intent is cleaner.'
  ),
  paragraph(
    'Compare this with self-generated life leads from paid search or Facebook where agents routinely spend $40 to $200+ per qualified lead before ad-to-opportunity conversion. Aged life leads deliver meaningfully lower cost-per-policy when worked with discipline.'
  ),
]

const FILTERS_SECTION = [
  paragraph('## Which Life Insurance Lead Filters Actually Matter'),
  paragraph(
    'Most platforms offer a dozen filter options. In practice, these are the ones that move close rates:'
  ),
  bulletItem('State — non-negotiable. Match your active life licensure exactly. Carriers enforce this strictly for commission payment.'),
  bulletItem('Age — the economics work best between 30 and 65. Younger prospects lack premium-paying ability; older prospects push toward final-expense products.'),
  bulletItem('Coverage amount requested — a prospect asking for $250,000 versus $25,000 is a completely different conversation and a different product fit.'),
  bulletItem('Income — $50,000+ household income tends to qualify for meaningful term or permanent premium. Below that, final-expense or whole-life-to-$25K usually fits better.'),
  bulletItem('Smoker status — drives underwriting class and rate. Some vendors offer non-smoker-only filters at a premium price.'),
  bulletItem('Product intent — term, whole, universal, IUL, mortgage protection, final expense. Cleaner intent = cleaner conversations = higher close rates.'),
  bulletItem('Homeowner status — high correlation with mortgage protection and estate-related life insurance conversations.'),
  bulletItem('Existing coverage — prospects who already own term coverage are prime for conversions, permanent add-ons, or coverage-gap closures.'),
  paragraph(
    'Layering 3 to 5 filters typically raises cost per lead by 20 to 40 percent but can double or triple close rates versus a generic age-and-state pull.'
  ),
]

const VENDOR_CHECKLIST_SECTION = [
  paragraph('## The 7-Point Life Insurance Lead Vendor Evaluation Checklist'),
  paragraph(
    'Before you place an order with any new life lead vendor, run them through these seven checks. Most bad aged-lead experiences trace back to one of these being ignored.'
  ),
  numberedItem('Opt-in verification and sourcing transparency. Ask where leads originated — comparison sites, quote forms, landing pages. Reputable vendors can describe sourcing clearly. If they can\'t, assume the lead has compliance problems.'),
  numberedItem('Data freshness transparency. A vendor labeling a "30 to 60 day" batch that turns out to be 200+ days old is committing fraud. Test-order 50 to 100 leads and skip-trace a sample before you scale.'),
  numberedItem('Advanced filtering at the dashboard or API level. If you have to call a rep to change state or product filters, you will not build a repeatable buying operation.'),
  numberedItem('Delivery speed. Same-day self-service beats 24 to 48 hour batch delivery. For life insurance specifically, every hour a lead sits in the queue reduces its value.'),
  numberedItem('Replacement and return policy. Disconnected numbers, wrong persons, and consumer opt-outs should be replaced at no charge. Vendors without a clear policy are cutting corners.'),
  numberedItem('Volume pricing that scales. Price per lead should meaningfully drop at 500-lead, 1,000-lead, and 5,000-lead tiers. Flat pricing at any volume is a sign the vendor is not optimized for serious buyers.'),
  numberedItem('Compliance posture. Ask about TCPA compliance, DNC scrubbing cadence (31 days is the legal minimum), and consent record availability. Reputable vendors produce the audit trail on request. Cheap vendors cannot.'),
  paragraph(
    'Order a small test batch — 50 to 100 leads — before committing to any new vendor. A test batch costs less than one bad month with a sloppy lead source.'
  ),
]

const FAQ_SECTION = {
  _type: 'faqSection',
  _key: key(),
  title: 'Life Insurance Lead Buying — Frequently Asked Questions',
  faqs: [
    {
      _key: key(),
      _type: 'faq',
      question: 'What is the difference between life insurance leads and final expense leads?',
      answer: 'Life insurance leads cover a broad intent set — term, whole life, universal, IUL — often with coverage amounts of $100,000 or more. Final expense leads are specifically for small whole-life policies (typically $5,000 to $25,000) designed to cover burial and end-of-life costs. Final expense prospects skew older (60+), price-sensitive, and product-aware; general life prospects are younger, more income-driven, and often price-shopping multiple products.',
    },
    {
      _key: key(),
      _type: 'faq',
      question: 'How many life insurance leads should I buy per month to hit my production goals?',
      answer: 'Typical economics on aged life leads: 10 to 18 percent contact rate, 25 to 40 percent of contacts become real conversations, and 4 to 8 percent of prospects close. To write 4 life policies per month, plan on 200 to 400 aged leads monthly with a disciplined 7-day multi-channel cadence. Agents without a cadence need 3 to 5 times that volume to produce the same outcome.',
    },
    {
      _key: key(),
      _type: 'faq',
      question: 'What is a realistic close rate on aged life insurance leads?',
      answer: 'Industry benchmarks: 4 to 8 percent close rate against total leads purchased when worked with a proper multi-channel cadence across calls, texts, voicemails, and email. One-call-and-done campaigns typically see under 1 percent. The metric that matters is cost per issued policy, not close rate — and aged life leads routinely produce a cost per policy 5 to 10 times lower than fresh exclusive leads at the same agent skill level.',
    },
    {
      _key: key(),
      _type: 'faq',
      question: 'Do aged life insurance leads create DNC or TCPA compliance risk?',
      answer: 'Properly sourced aged leads include consent records and an opt-in trail. You remain responsible for scrubbing against the National Do-Not-Call Registry every 31 days (the legal minimum) and respecting the 3-month inquiry and 18-month transaction exemption windows. Always ask vendors for consent documentation before buying. This is educational guidance, not legal advice. Compliance requirements vary by state and change frequently. Consult a licensed attorney for questions specific to your situation.',
    },
    {
      _key: key(),
      _type: 'faq',
      question: 'How do I know if a life insurance lead vendor is reputable?',
      answer: 'Use the 7-point checklist in this guide: sourcing transparency, accurate age labeling, API-level filtering, same-day delivery, a clear replacement policy, volume-tier pricing, and documented TCPA/DNC compliance. Reputable vendors answer all seven. Opaque vendors cannot. Always test a new vendor with 50 to 100 leads before scaling any order.',
    },
    {
      _key: key(),
      _type: 'faq',
      question: 'What is the minimum order to test a new life insurance lead vendor?',
      answer: 'Test with 50 to 100 leads minimum. That is enough volume to evaluate contact rate, data accuracy, and replacement responsiveness without a full month of exposure to a bad source. Expect a modest premium on small test orders — that is normal. If a vendor refuses to take a small test order at all, take that as a signal about how they will treat you as a mid-size customer later.',
    },
  ],
}

async function fetchDoc() {
  const q = encodeURIComponent('*[_type=="landingPage" && slug.current=="buy-life-insurance-leads"][0]{_id,content}')
  const res = await fetch(`${API_QUERY}?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
  return (await res.json()).result
}

async function patch(docId, newBlocks, dryRun) {
  if (dryRun) {
    console.log(`  DRY: would append ${newBlocks.length} blocks to ${docId}`)
    newBlocks.forEach((b, i) => {
      console.log(`    ${i + 1}. [${b._type}] ${b._type === 'faqSection' ? `${b.faqs.length} FAQs` : `${b.content?.length || 0} inner blocks`}`)
    })
    return true
  }
  const res = await fetch(API_MUTATE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mutations: [{ patch: { id: docId, insert: { after: 'content[-1]', items: newBlocks } } }],
    }),
  })
  const result = await res.json()
  if (result.error) { console.error('ERROR:', JSON.stringify(result.error)); return false }
  return true
}

async function main() {
  const apply = process.argv.includes('--apply')
  const dryRun = !apply
  console.log(`Life Insurance Pillar Expansion — ${dryRun ? 'DRY RUN' : 'APPLYING'}`)
  console.log('─'.repeat(60))
  const doc = await fetchDoc()
  if (!doc) { console.error('buy-life-insurance-leads not found'); process.exit(1) }
  console.log(`Doc: ${doc._id}`)
  console.log(`Existing blocks: ${(doc.content || []).length}`)
  console.log()

  const blocks = [
    { _type: 'contentBlock', _key: key(), content: PRICING_SECTION },
    { _type: 'contentBlock', _key: key(), content: FILTERS_SECTION },
    { _type: 'contentBlock', _key: key(), content: VENDOR_CHECKLIST_SECTION },
    FAQ_SECTION,
  ]
  const ok = await patch(doc._id, blocks, dryRun)
  console.log('─'.repeat(60))
  console.log(ok ? 'Done.' : 'Failed.')
  if (dryRun) console.log('Run with --apply to patch Sanity.')
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
