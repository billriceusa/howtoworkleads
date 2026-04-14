/**
 * IUL Pillar Expansion — appends 3 authoritative sections + FAQ to /buying-leads/buy-iul-leads.
 *
 * New sections target high-impression/low-CTR IUL queries:
 *  - "iul leads for sale" (21 impr, pos 8.3)
 *  - "best iul leads" (8 impr, pos 13.9)
 *  - "cheap iul leads" (2 impr, pos 4)
 *  - "iul lead vendors" (2 impr, pos 11)
 *  - AI Overview capture via FAQ schema
 *
 * Run:
 *   node scripts/iul-pillar-expansion.mjs              # dry run
 *   node scripts/iul-pillar-expansion.mjs --apply      # apply
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

// Section 1: IUL Lead Pricing 2026
const PRICING_SECTION = [
  paragraph('## IUL Lead Pricing 2026: What You\'ll Actually Pay'),
  paragraph(
    'Most agents overpay for IUL leads because they don\'t know the going rates. Here\'s what Indexed Universal Life leads actually cost in 2026, broken down by freshness tier:'
  ),
  bulletItem('Real-time / fresh (0 to 7 days old): $15 to $50 per lead — highest contact rate but steep CPA when close rates are honest about the 3-to-5 percent range.'),
  bulletItem('15 to 30 days aged: $2 to $5 per lead — often the sweet spot for IUL, since prospects have had time to research and still remember they requested info.'),
  bulletItem('30 to 60 days aged: $1 to $2 per lead — lower contact rates but profitable with a structured multi-channel cadence.'),
  bulletItem('60 to 90 days aged: $0.50 to $1 per lead — the bulk-buy tier where seasoned agents run volume plays with SMS and ringless voicemail.'),
  bulletItem('90+ days aged: $0.15 to $0.50 per lead — deep aged, works best as list-wash and skip-trace source material.'),
  paragraph(
    'Volume discounts typically kick in at 500-lead and 1,000-lead tiers. Pricing also varies by filter stringency — a state-specific, income-qualified IUL pull will run 20 to 40 percent above the base-tier price for the same age.'
  ),
  paragraph(
    'Compared with self-generated IUL leads — where agents often spend $50 to $300 per qualified prospect between ad spend, landing pages, and time — aged IUL leads deliver 10x to 200x more pipeline per dollar when worked with a proper system.'
  ),
]

// Section 2: Which IUL Lead Filters Actually Matter
const FILTERS_SECTION = [
  paragraph('## Which IUL Lead Filters Actually Matter'),
  paragraph(
    'Most IUL lead platforms advertise dozens of filter options. In practice, only a handful meaningfully improve close rates. Focus your filter spend here:'
  ),
  bulletItem('State — non-negotiable. Licensure matches must be exact. Order only states where you hold an active life license.'),
  bulletItem('Age — the IUL sweet spot is 35 to 60. Prospects under 35 often can\'t afford meaningful premium; over 65 the underwriting math works against IUL vs final expense.'),
  bulletItem('Income — $75,000+ household income filters for prospects with enough discretionary cash to fund a meaningful IUL premium. Below that, the case economics rarely work.'),
  bulletItem('Homeowner status — correlates with financial stability and often with the life-stage where IUL sells (kids, mortgage, estate concerns).'),
  bulletItem('Non-smoker preference — drives underwriting outcomes and simplifies the quote conversation. Smokers can still convert but require a different pitch.'),
  bulletItem('Existing life coverage — a prospect who already has term coverage is far more receptive to the IUL conversation than someone cold to the concept.'),
  bulletItem('Lead source / reason code — know how the prospect raised their hand. "Retirement planning" intent converts differently than "life insurance quote" intent, even though both can land in the IUL bucket.'),
  paragraph(
    'Layering 4 to 5 of these filters typically raises lead cost 25 to 50 percent but can double or triple close rates compared with a generic-state-only pull.'
  ),
]

// Section 3: 7-Point Vendor Evaluation Checklist
const VENDOR_CHECKLIST_SECTION = [
  paragraph('## The 7-Point IUL Lead Vendor Evaluation Checklist'),
  paragraph(
    'Not all IUL lead sources are created equal. Before you place an order with a new vendor, run them through these seven checks — it will save you from the bad batches that have sunk more aged lead programs than any other single factor.'
  ),
  numberedItem('Opt-in verification and sourcing transparency. Ask where the leads originated. Reputable vendors can point to specific consumer-facing properties — comparison sites, quote forms, landing pages. If they can\'t or won\'t describe sourcing, assume the worst.'),
  numberedItem('Data freshness transparency. A real vendor labels age accurately. If the "30 to 60 day" batch turns out to have 200-day-old leads, that is fraud. Test-order 50 to 100 leads and skip-trace a sample before scaling.'),
  numberedItem('Advanced filtering at the API or dashboard level. If you have to call a rep to change state filters, you will not build a repeatable buying operation.'),
  numberedItem('Delivery speed. Same-day self-service beats 24 to 48 hour batch delivery. Every hour a lead sits in the vendor\'s system is an hour your competition may be calling the same prospect.'),
  numberedItem('Replacement and return policy. Disconnected numbers, wrong persons, and consumer opt-outs should be replaced free. Vendors without a clear policy are hiding something.'),
  numberedItem('Volume pricing that scales. If the price per lead stays flat whether you buy 100 or 10,000, that vendor is not optimized for serious operators.'),
  numberedItem('Compliance posture. Ask about TCPA, DNC scrubbing cadence (31 days minimum by law), and consent records. Reputable vendors can produce the audit trail. Cheap vendors often cannot.'),
  paragraph(
    'Order a small test batch — 50 to 100 leads — before scaling with any new vendor. A test batch costs less than one bad month with a sloppy source.'
  ),
]

// FAQ section — structured object triggers FAQPage JSON-LD in the template
const FAQ_SECTION = {
  _type: 'faqSection',
  _key: key(),
  title: 'IUL Lead Buying — Frequently Asked Questions',
  faqs: [
    {
      _key: key(),
      _type: 'faq',
      question: 'How are IUL leads different from whole life or term leads?',
      answer: 'IUL (Indexed Universal Life) leads are prospects specifically interested in or quoted for cash-accumulation life insurance tied to market indexes — not pure death-benefit products. The conversation is longer, more financial-planning oriented, and the premium size is often 3 to 5 times a comparable term policy. IUL leads typically over-index on ages 35 to 60 and household incomes above $75,000.',
    },
    {
      _key: key(),
      _type: 'faq',
      question: 'How many IUL leads should I buy per month to hit my production goals?',
      answer: 'A realistic math: assume 10 to 15 percent contact rate on aged IUL leads, 20 to 30 percent of contacts become real conversations, and 3 to 6 percent of prospects close. To write 2 IUL policies per month, plan on 200 to 400 aged leads per month with a disciplined multi-channel follow-up cadence. Agents without a cadence need 3 to 5 times that volume to produce the same outcome.',
    },
    {
      _key: key(),
      _type: 'faq',
      question: 'What is a realistic close rate on aged IUL leads?',
      answer: 'Industry benchmarks for aged IUL leads: 3 to 5 percent close rate against total leads purchased when worked with a proper 7-day multi-channel cadence. Agents who only call once typically see under 1 percent. Close rate is the wrong metric to chase — cost per closed policy is the number that matters, and aged leads usually produce a CPA 5 to 10 times lower than fresh exclusive leads.',
    },
    {
      _key: key(),
      _type: 'faq',
      question: 'Do aged IUL leads create DNC or TCPA compliance risk?',
      answer: 'Properly sourced aged leads come with consent records and an opt-in trail. You are still responsible for scrubbing against the National Do-Not-Call Registry every 31 days (that is the legal minimum) and respecting the 3-month inquiry window and 18-month transaction window for DNC exemptions. Ask vendors for their consent documentation before you buy. This is educational guidance, not legal advice. Compliance requirements vary by state and change frequently. Consult a licensed attorney for legal questions specific to your situation.',
    },
    {
      _key: key(),
      _type: 'faq',
      question: 'How do I know if an IUL lead vendor is reputable?',
      answer: 'Use the 7-point checklist in this guide: sourcing transparency, accurate age labeling, API-level filtering, same-day delivery, a clear replacement policy, volume-tier pricing, and documented TCPA/DNC compliance. Reputable vendors can answer all seven. Opaque vendors cannot. Always test a new vendor with 50 to 100 leads before scaling.',
    },
    {
      _key: key(),
      _type: 'faq',
      question: 'What is the minimum order to test a new IUL lead vendor?',
      answer: 'Test with 50 to 100 leads minimum. That is enough volume to evaluate contact rate, data accuracy, and replacement responsiveness without a full month of exposure to a bad source. Expect to pay a modest premium on small test orders — that is normal. If a vendor refuses to take a small order at all, take that as a signal about how they will treat you as a mid-size customer.',
    },
  ],
}

async function fetchDoc() {
  const query = encodeURIComponent(
    '*[_type=="landingPage" && slug.current=="buy-iul-leads"][0]{_id,content}'
  )
  const res = await fetch(`${API_QUERY}?query=${query}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
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
  console.log(`IUL Pillar Expansion — ${dryRun ? 'DRY RUN' : 'APPLYING'}`)
  console.log('─'.repeat(60))
  const doc = await fetchDoc()
  if (!doc) { console.error('buy-iul-leads not found'); process.exit(1) }
  console.log(`Doc: ${doc._id}`)
  console.log(`Existing blocks: ${(doc.content || []).length}`)
  console.log()

  const pricingBlock = { _type: 'contentBlock', _key: key(), content: PRICING_SECTION }
  const filtersBlock = { _type: 'contentBlock', _key: key(), content: FILTERS_SECTION }
  const vendorBlock = { _type: 'contentBlock', _key: key(), content: VENDOR_CHECKLIST_SECTION }

  const newBlocks = [pricingBlock, filtersBlock, vendorBlock, FAQ_SECTION]
  const ok = await patch(doc._id, newBlocks, dryRun)
  console.log('─'.repeat(60))
  console.log(ok ? 'Done.' : 'Failed.')
  if (dryRun) console.log('Run with --apply to patch Sanity.')
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
