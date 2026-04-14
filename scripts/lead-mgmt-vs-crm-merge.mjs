/**
 * Append best unique content from the now-redirected /crm-systems/crm-vs-lead-management
 * to the winner /lead-management/lead-management-vs-crm.
 *
 * Adds the Pre-Sale/Post-Sale boundary framing + Bill Rice 20-year perspective,
 * which were the clearest signals from the loser page that weren't already in
 * the winner.
 *
 * Run: node scripts/lead-mgmt-vs-crm-merge.mjs --apply
 */
import { randomBytes } from 'crypto'

const TOKEN = process.env.SANITY_API_TOKEN
const PROJECT = 'e9k38j42'
const API_QUERY = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/production`
const API_MUTATE = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/production`
if (!TOKEN) { console.error('SANITY_API_TOKEN required'); process.exit(1) }

const key = () => randomBytes(6).toString('hex')
const span = (text, marks = []) => ({ _type: 'span', _key: key(), text, marks })
const paragraph = (text) => ({
  _type: 'block', _key: key(), style: 'normal', markDefs: [], children: [span(text)],
})

const MERGE_SECTION = [
  paragraph('## The Pre-Sale / Post-Sale Boundary'),
  paragraph(
    'Here is the cleanest way to think about lead management versus CRM: the boundary is the moment a prospect becomes a customer. Everything before that sale is lead management territory. Everything after is CRM territory.'
  ),
  paragraph(
    'Lead management dominates the pre-sale work: initial contact, qualification, follow-up sequences, objection handling, proposal delivery, and the close itself. CRM dominates the post-sale work: onboarding, service delivery, support tickets, renewal management, cross-sell tracking, and long-term relationship maintenance.'
  ),
  paragraph(
    'Force a comprehensive CRM into pre-sale work and you slow the reps down with data fields they do not need. Force lightweight lead management into post-sale work and you lose the service-history data that drives retention. Match the system to the work.'
  ),
  paragraph('## The Revenue Model Lens'),
  paragraph(
    'Your revenue model tells you which system matters more today. If sales is your core business function — you\'re buying aged leads, working to convert them, and revenue depends on closing new business — lead management is where you invest first. If retention and expansion drive revenue — a large existing book with renewals, service requirements, and cross-sell potential — CRM takes priority.'
  ),
  paragraph(
    'Most lead buyers should start with lead management. It matches the work you are actually doing, costs less, and delivers faster ROI on your lead spend. Add CRM later once you have a customer base worth managing. The inverse mistake — buying enterprise CRM first and bolting lead management on — is how teams end up spending $4,000 a month on software to convert $1,000 a month in leads.'
  ),
  paragraph(
    'The pattern is consistent across 20+ years of watching sales organizations build their stacks: teams that match their tools to their actual work convert more, spend less, and grow faster than teams that buy based on feature lists.'
  ),
]

async function main() {
  const apply = process.argv.includes('--apply')
  const dryRun = !apply
  const q = encodeURIComponent('*[_type=="landingPage" && slug.current=="lead-management-vs-crm"][0]{_id,content}')
  const res = await fetch(`${API_QUERY}?query=${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
  const doc = (await res.json()).result
  if (!doc) { console.error('winner page not found'); process.exit(1) }
  console.log(`Target: ${doc._id} (existing blocks: ${(doc.content || []).length})`)
  const block = { _type: 'contentBlock', _key: key(), content: MERGE_SECTION }
  if (dryRun) { console.log(`DRY: would append 1 contentBlock with ${MERGE_SECTION.length} inner blocks`); return }
  const mres = await fetch(API_MUTATE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations: [{ patch: { id: doc._id, insert: { after: 'content[-1]', items: [block] } } }] }),
  })
  const result = await mres.json()
  if (result.error) { console.error('ERROR:', JSON.stringify(result.error)); process.exit(1) }
  console.log('Applied.')
}
main().catch(err => { console.error(err); process.exit(1) })
