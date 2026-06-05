/**
 * FAQ CTR Expansion — June 2026
 *
 * Both /buying-leads/buy-iul-leads and /buying-leads/buy-life-insurance-leads
 * rank page-1 for high-intent queries they don't yet answer in their FAQ —
 * specifically COST ("how much do iul/life leads cost", "iul leads for sale")
 * and DEFINITION ("what are aged X leads"). Those queries trigger People-Also-Ask
 * / FAQ rich results; adding matching Q&As targets that SERP real estate.
 *
 * Appends 2 FAQs to each page's existing faqSection. Idempotent: skips a question
 * if it already exists (by normalized text).
 *
 * Run:
 *   node scripts/faq-ctr-expansion-2026-06.mjs            # dry run
 *   node scripts/faq-ctr-expansion-2026-06.mjs --apply    # apply
 */
import { randomBytes } from 'crypto'

const TOKEN = process.env.SANITY_API_TOKEN
const PROJECT = 'e9k38j42'
const DATASET = 'production'
const API_QUERY = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}`
const API_MUTATE = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`
const APPLY = process.argv.includes('--apply')

if (!TOKEN) { console.error('SANITY_API_TOKEN env var required'); process.exit(1) }
const key = () => randomBytes(6).toString('hex')
const faq = (question, answer) => ({ _type: 'faq', _key: key(), question, answer })
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const ADDITIONS = {
  'buy-iul-leads': [
    faq(
      'How much do aged IUL leads cost?',
      'Aged IUL leads typically run $0.50 to $5 each, depending on lead age and order volume — roughly 90 to 95 percent cheaper than real-time exclusive IUL leads, which can run $25 to $100 or more apiece. Leads aged 30 to 60 days cost more than 90-plus-day leads, and larger orders earn volume-tier discounts. Because you can buy 20 to 50 aged leads for the price of one fresh lead, the cost per closed policy is usually far lower despite a lower contact rate.'
    ),
    faq(
      'What are aged IUL leads?',
      'Aged IUL leads are prospects who previously inquired about indexed universal life insurance — typically 30, 60, or 90-plus days ago — resold at a steep discount to their original real-time price. They are real people who raised their hand for cash-accumulation life coverage and have simply aged past the window when the first buyer worked them. Worked with a disciplined multi-channel cadence, they convert at a fraction of the cost of fresh exclusive leads.'
    ),
  ],
  'buy-life-insurance-leads': [
    faq(
      'How much do aged life insurance leads cost?',
      'Aged life insurance leads generally cost $0.50 to $2 each, compared with $15 to $50 or more for real-time exclusive life leads — a 90-percent-plus discount. Pricing depends on lead age (30 vs 60 vs 90-plus days), exclusivity, and order volume, with larger orders earning tier discounts. The low per-lead price is why aged leads typically produce a lower cost per issued policy even at a lower contact rate.'
    ),
    faq(
      'What are aged life insurance leads?',
      'Aged life insurance leads are consumers who previously requested life insurance information — usually 30 to 90-plus days ago — resold at a discount once they pass their real-time window. They span term, whole, and final-expense intent. They are validated, opt-in prospects with contact data; the value is buying genuine interest at a fraction of fresh-lead pricing and reaching them with a structured follow-up cadence.'
    ),
  ],
}

async function sanity(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  return res.json()
}

async function run() {
  for (const [slug, newFaqs] of Object.entries(ADDITIONS)) {
    const q = `*[_type=="landingPage" && slug.current=="${slug}"][0]{_id, content}`
    const { result } = await sanity(API_QUERY, { query: q })
    if (!result) { console.error(`  ✗ ${slug}: not found`); continue }
    const faqBlockIndex = (result.content || []).findIndex((b) => b._type === 'faqSection')
    if (faqBlockIndex < 0) { console.error(`  ✗ ${slug}: no faqSection`); continue }
    const faqBlock = result.content[faqBlockIndex]
    const existing = new Set((faqBlock.faqs || []).map((f) => norm(f.question)))
    const toAdd = newFaqs.filter((f) => !existing.has(norm(f.question)))
    console.log(`\n${slug}: faqSection _key=${faqBlock._key}, ${faqBlock.faqs.length} existing FAQs`)
    toAdd.forEach((f) => console.log(`   + ${f.question}`))
    if (!toAdd.length) { console.log('   (all already present — skip)'); continue }
    if (!APPLY) continue
    const mutations = [{
      patch: {
        id: result._id,
        insert: { after: `content[_key=="${faqBlock._key}"].faqs[-1]`, items: toAdd },
      },
    }]
    await sanity(API_MUTATE, { mutations })
    console.log(`   ✓ applied (${toAdd.length} added)`)
  }
  if (!APPLY) console.log('\n(dry run — re-run with --apply)')
}
run().catch((e) => { console.error(e); process.exit(1) })
