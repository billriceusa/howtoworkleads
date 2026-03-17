/**
 * Differentiate "buy X leads" landing pages by replacing generic/template
 * content with industry-specific paragraphs.
 *
 * Targets 3 types of duplication:
 *   1. Identical boilerplate CTA/cross-link sentences (6 mortgage pages)
 *   2. Generic AgedLeadStore "Key advantages" bullet points (9 pages)
 *   3. Generic ROI/cost paragraphs that lack industry-specific data
 *
 * Usage:
 *   node scripts/differentiate-buy-pages.mjs              # dry run
 *   node scripts/differentiate-buy-pages.mjs --apply       # apply changes
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../apps/web/.env.local') })

const client = createClient({
  projectId: 'e9k38j42',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const apply = process.argv.includes('--apply')
const dryRun = !apply

// ── Helpers ─────────────────────────────────────────────────────────────────

function getBlockText(block) {
  if (!block?.children) return ''
  return block.children
    .filter((c) => c._type === 'span')
    .map((s) => s.text || '')
    .join('')
}

function makeSpan(text) {
  return {
    _type: 'span',
    _key: randomKey(),
    marks: [],
    text,
  }
}

function makeBlock(text, style = 'normal') {
  return {
    _type: 'block',
    _key: randomKey(),
    style,
    markDefs: [],
    children: [makeSpan(text)],
  }
}

function randomKey() {
  return Math.random().toString(36).slice(2, 14)
}

// ── Industry-specific content ───────────────────────────────────────────────

/**
 * For each slug, define replacement content for 3 categories:
 *   - alsAdvantages: replaces the generic AgedLeadStore "Key advantages" bullets
 *   - roiParagraph: replaces generic ROI/cost math paragraph
 *   - crossLinks: replaces the 3 identical CTA/cross-link sentences (mortgage pages)
 */
const INDUSTRY_DATA = {
  // ══════════════════════════════════════════════════════════════════════════
  // INSURANCE VERTICALS
  // ══════════════════════════════════════════════════════════════════════════
  'buy-life-insurance-leads': {
    alsAdvantages: null, // only 1 content block, no ALS section
    roiParagraph:
      'Life insurance has one of the longest sales cycles in the industry — agents typically need 15+ contact attempts to close a policy. That makes lead cost critical. At $20-$50 per fresh lead, most agents can only afford 50-100 leads per month. With aged life leads at $1-$5 each, that same budget buys 500-2,500 prospects. With average policies running $40-$60/month in premium and first-year commissions of 80-110%, even a 2% close rate on aged leads produces strong ROI. The trust-building nature of life insurance actually favors aged leads — prospects who have had time to reflect on their coverage gap are often more receptive than those in the initial "just browsing" phase.',
  },

  'buy-final-expense-leads': {
    alsAdvantages: [
      'Largest aged final expense lead database — millions of records targeting seniors 50-85 who have expressed interest in burial and simplified issue coverage',
      'Age-specific filtering lets you target the 65-75 sweet spot where final expense conversion rates peak',
      'Geographic precision down to zip code level — essential for agents who door-knock or do in-home appointments in specific territories',
      'DNC scrubbing on every order — critical for the senior demographic where TCPA compliance is heavily enforced',
      'No minimums and volume pricing — start with 200 leads to test your script, then scale to thousands as you dial in your approach',
    ],
    roiParagraph:
      'Final expense math is uniquely favorable for aged leads. Average face amounts run $5,000-$25,000 with first-year commissions of 80-110% on average premiums of $50-$80/month. At $1-$3 per aged lead, buying 1,000 leads costs $1,000-$3,000. Even at a conservative 1-2% close rate, that is 10-20 policies generating $4,000-$16,000 in first-year commission. Fresh leads at $25+ each would require a 6%+ close rate just to match that return. The emotional nature of the final expense sale also works in your favor with aged leads — seniors who have been thinking about end-of-life planning for 30-90 days are often more ready to act than those who just filled out a form impulsively.',
  },

  'buy-medicare-leads': {
    alsAdvantages: [
      'Massive aged Medicare lead database with turning-65 and enrollment-period filtering — target prospects at the exact life stage when they need coverage',
      'Prospect age filtering lets you isolate the turning-65 market (highest conversion) or the 65+ market for plan switches during AEP',
      'State and zip code precision for territory-based agents managing books in specific counties',
      'DNC scrubbing included — essential for Medicare where CMS marketing compliance is heavily monitored',
      'No contracts and instant delivery — critical during AEP (Oct 15-Dec 7) when every day of the 54-day window counts',
    ],
    roiParagraph:
      'Medicare lead economics are driven by enrollment period timing. During AEP (October 15 - December 7), fresh Medicare leads spike to $30-$50+ each. Aged Medicare leads purchased in the off-season (April-September) at $1-$3 each give you a massive database to activate when enrollment opens. With average first-year commissions of $300+ per Medicare Advantage enrollment and $500+ per Medigap policy, a 2-3% close rate on aged leads purchased at $2 each delivers 15-25x ROI. The key timing insight: prospects who turned 65 during the off-season and missed their Initial Enrollment Period are especially motivated during AEP — and nobody else is calling them because their lead data is "old."',
  },

  'buy-auto-insurance-leads': {
    alsAdvantages: [
      'Largest aged auto insurance lead database — auto is the highest-volume insurance vertical with the most active shoppers at any given time',
      'Filter by lead age, state, zip code, and coverage type to match your carrier appetite and geographic footprint',
      'DNC scrubbing on every order — important for the high-volume outbound cadences auto leads require',
      'No contracts — auto insurance has 6-month renewal cycles, so you can time your lead purchases around peak shopping seasons',
      'Volume pricing that makes large-batch purchasing feasible — at $0.50-$2 per aged lead, 5,000-lead orders are common for P&C agencies',
    ],
    roiParagraph:
      'Auto insurance is the most price-shopped product in the industry — consumers compare rates at every renewal, rate increase, or life change. That high churn rate is your advantage with aged leads. A prospect who shopped 60-90 days ago has likely experienced a renewal or rate adjustment since then, making them receptive to a new quote. At $0.50-$2 per aged auto lead versus $8-$15 for fresh leads, you can blanket your territory with outbound quotes. Average auto premiums of $1,500-$2,000/year with 10-15% commission mean each closed policy generates $150-$300 in annual revenue — but the real value is the multi-policy bundle. Agents who lead with auto and cross-sell home, umbrella, and life see average account values of $3,000-$5,000/year, transforming a low-margin auto lead into a high-value relationship.',
  },

  'buy-pc-insurance-leads': {
    alsAdvantages: [
      'Extensive P&C lead inventory covering homeowners, renters, condo, and landlord policies across all 50 states',
      'Property type and geography filtering lets you target specific neighborhoods where your carrier appetites are strongest',
      'Lead age filtering from 30 to 365+ days — P&C prospects on 12-month renewal cycles often re-enter the market at predictable intervals',
      'DNC scrubbing included — essential when running high-volume quote campaigns across residential prospects',
      'No minimum orders — test specific markets or property types before committing to volume',
    ],
    roiParagraph:
      'P&C leads are among the most affordable in the insurance market, but the real economics are in the bundle. Average homeowners premiums run $1,500-$2,000/year, and agents who pair home with auto see combined premiums of $3,500-$5,000/year with retention rates above 85%. Aged P&C leads at $1-$3 each let you run high-volume quote campaigns — buying 2,000 leads for $2,000-$6,000. At a 3-5% close rate, that yields 60-100 new households. With average annual premium per household of $3,500+ and 10-15% commission, that is $21,000-$52,500 in first-year revenue. Seasonal timing amplifies results: spring (home purchases peak) and hurricane season (policy shopping spikes) create natural windows where P&C prospects are most responsive to outreach.',
  },

  'buy-annuity-leads': {
    alsAdvantages: [
      'Aged annuity lead database with retirement-focused prospect profiles — average deposit size of $50,000+ makes each conversion significant',
      'Geographic and age filtering to target retirement-ready demographics in your state',
      'Lead age selection from 30 to 365+ days — annuity decisions take 3-12 months, so even older leads remain viable',
      'DNC scrubbing included — critical for the affluent senior demographic where compliance violations carry steep penalties',
      'No contracts or minimums — test market response in specific regions before scaling your annuity practice',
    ],
    roiParagraph:
      'Annuity economics make aged leads one of the highest-ROI investments in insurance. Average annuity deposits of $50,000+ generate first-year commissions of 3-7% ($1,500-$3,500 per sale) depending on product type. At $3-$8 per aged lead, buying 500 leads costs $1,500-$4,000. Even at a 1% close rate (5 sales), that is $7,500-$17,500 in commission on a $1,500-$4,000 lead investment. The annuity sales cycle actually works in your favor: because prospects take 3-12 months to make a decision, aged leads are often further along in their research than fresh leads. Suitability requirements mean you need time for discovery conversations anyway — and prospects who have been researching for 60-90 days arrive at that conversation better informed and more committed.',
  },

  'buy-iul-leads': {
    alsAdvantages: null, // 1-block format, no ALS section
    roiParagraph:
      'IUL economics are compelling for agents who master the aged lead approach. Average IUL premiums of $300-$500/month generate first-year commissions of 80-100% of target premium — meaning a single $400/month policy yields $3,840-$4,800 in first-year commission. At $2-$5 per aged IUL lead versus $50-$300 for exclusive fresh leads, buying 500 aged leads at $3 each ($1,500) only needs a single close to deliver a 2.5-3x return. IUL requires an education-first approach — these are complex products where trust and understanding drive the sale. Aged leads give you time to nurture with educational content about cash value accumulation, market participation rates, and floor protection. The wealthier demographic that considers IUL (household income $100K+) also tends to respond well to persistent, professional follow-up rather than aggressive speed-to-lead tactics.',
  },

  'buy-health-insurance-leads': {
    alsAdvantages: null,
    roiParagraph: null,
  },

  'buy-mortgage-protection-leads': {
    alsAdvantages: [
      'Extensive mortgage protection lead inventory with home purchase recency filtering — target homeowners in the first 90 days after closing when conversion rates peak',
      'State and zip code precision for agents who work specific territories and want to match their door-knock or direct mail zones',
      'Lead age selection lets you buy deep-aged trigger data at $0.25-$1 for volume campaigns, or newer leads at $3-$8 for higher contact rates',
      'DNC scrubbing on every order — non-negotiable for the residential homeowner market where TCPA enforcement is active',
      'Instant delivery — when a new development closes or a seasonal surge hits, you can get leads working the same day',
    ],
    roiParagraph:
      'Mortgage protection economics are driven by timing and the new homeowner mindset. The first 90 days after closing is prime — homeowners are already thinking about protecting their new investment. Average mortgage protection premiums run $50-$100/month with 80-100% first-year commissions, meaning each policy generates $480-$1,200 in first-year commission. Trigger data leads (compiled from public records of recent home purchases) cost $0.25-$1 each, making volume campaigns extremely cost-effective. Buying 5,000 trigger leads for $1,250-$5,000, with a 1-2% close rate, yields 50-100 policies and $24,000-$120,000 in first-year commission. The simplified underwriting on most mortgage protection products also shortens the sales cycle — once a homeowner says yes, getting them issued is typically faster than traditional life insurance.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MORTGAGE VERTICALS
  // ══════════════════════════════════════════════════════════════════════════
  'buy-purchase-mortgage-leads': {
    alsAdvantages: [
      'Largest aged purchase mortgage lead database — homebuyers who submitted inquiries but may not have found their home or locked a rate yet',
      'Filter by state, zip code, loan type (conventional, FHA, VA, jumbo), and lead age to match your licensing and product mix',
      'Seasonal buying advantage — stock up on spring/summer leads at lower per-lead costs to build pipeline year-round',
      'DNC scrubbing included on every order — essential for TCPA compliance in mortgage marketing',
      'No minimums and instant delivery — test a market with 200 leads before committing to a 5,000-lead campaign',
    ],
    roiParagraph:
      'Purchase mortgage lead ROI is driven by loan size and conversion volume. Average purchase loans of $300,000+ generate $3,000-$6,000 in origination revenue per closed loan. At $2-$5 per aged lead, a $5,000 monthly budget buys 1,000-2,500 prospects. At a 1-2% close rate, that is 10-50 closed loans — $30,000-$300,000 in revenue on a $5,000 investment. Purchase leads have distinct seasonal patterns: spring (March-June) generates the highest volume and freshest intent, but fall and winter leads purchased at discounted aged pricing often convert better because there is less competition. The key insight for purchase leads: many buyers need 3-6 months from first inquiry to actual purchase — an aged lead is often a buyer who is now closer to being ready than when they first submitted their information.',
    crossLinks:
      'For a guide to all mortgage lead types including refinance, HELOC, and non-QM, explore our complete guide to buying mortgage leads. Purchase leads pair especially well with real estate agent referral strategies — see our guide on lead management best practices for building a realtor partner pipeline. Ready to get started? Place your lead order here and start working purchase mortgage leads today.',
  },

  'buy-refinance-mortgage-leads': {
    alsAdvantages: [
      'Massive aged refinance lead database — borrowers who inquired when rates were different and may be ready for a new look as market conditions shift',
      'Filter by state, zip code, lead age, and loan type to separate rate-and-term from cash-out refinance prospects',
      'Counter-cyclical pricing advantage — refinance leads are cheapest when rates are high and lead generators produce fewer, meaning you build your database at the lowest cost',
      'DNC scrubbing included — essential for compliant outbound refinance campaigns',
      'Instant delivery and no contracts — scale up quickly when rate drops create urgency, scale down during quiet periods',
    ],
    roiParagraph:
      'Refinance lead ROI is uniquely tied to interest rate movements. When rates drop even 0.5%, aged refinance leads become gold — borrowers who inquired at higher rates now have a compelling savings story. Average refinance savings of $200-$400/month translates to $2,400-$4,800/year for the borrower, making your outreach immediately relevant. Loan officer revenue per refi of $3,000-$5,000 means a 1% close rate on 1,000 aged leads ($2,000-$5,000 investment at $2-$5/lead) produces $30,000-$50,000 in revenue. The counter-cyclical strategy: buy aged refi leads at rock-bottom prices when rates are rising (fewer buyers = lower prices), then activate them when rates drop. Your cost basis of $1-$2 per lead becomes a massive competitive advantage over LOs scrambling to buy fresh leads at $50-$100 each during a rate drop rally.',
    crossLinks:
      'For a broader look at all mortgage lead types, explore our complete guide to buying mortgage leads. Refinance leads complement a cash-out and HELOC strategy — see our HELOC leads guide for building a home equity pipeline alongside your refi campaigns. Ready to get started? Place your lead order here and start working refinance mortgage leads today.',
  },

  'buy-heloc-leads': {
    alsAdvantages: [
      'Aged mortgage leads with home equity and HELOC-specific prospect filtering — tap into the $35 trillion home equity market',
      'State and zip code targeting to focus on high-equity markets where home values have appreciated 30-50% since 2020',
      'Lead age selection from 30 to 365+ days — HELOC borrowers often research for months before acting, making older leads viable',
      'DNC scrubbing on every order — critical for compliant outreach to homeowners',
      'Affordable volume pricing — HELOC campaigns require higher lead volumes because borrowers often comparison-shop 3-5 lenders before choosing',
    ],
    roiParagraph:
      'HELOC lead economics are driven by the massive equity position American homeowners hold — over $35 trillion collectively. Average HELOC lines of $50,000-$150,000 generate origination revenue of $1,500-$4,000 per funded line. At $1-$5 per aged lead, a $3,000 investment buys 600-3,000 prospects. A 2-3% close rate produces 12-90 funded HELOCs — $18,000-$360,000 in revenue. HELOC leads age well because the underlying equity does not disappear — a homeowner who inquired about a HELOC 90 days ago still has the same equity and likely the same need. The renovation use case is especially strong: homeowners choosing to renovate rather than move (avoiding trading a 3% mortgage for a 6.5% mortgage) create sustained HELOC demand regardless of the rate environment.',
    crossLinks:
      'For a complete overview of mortgage lead types including purchase and refinance, explore our complete guide to buying mortgage leads. HELOC leads pair well with cash-out refinance leads for a complete home equity lending strategy. Ready to get started? Place your lead order here and start working HELOC leads today.',
  },

  'buy-dscr-loan-leads': {
    alsAdvantages: [
      'Aged mortgage leads with investment property and investor profile filtering — isolate the real estate investor audience that buys multiple properties',
      'State and zip code targeting for investor-friendly markets where DSCR products have the best terms',
      'Lead age selection to match your budget — DSCR investors are repeat buyers, so even 180+ day leads convert when the right deal appears',
      'DNC scrubbing included on every order — investors receive high call volumes and appreciate compliant, professional outreach',
      'Volume pricing for building large investor databases — the repeat business model means your lead investment compounds over time',
    ],
    roiParagraph:
      'DSCR lead ROI is fundamentally different from other mortgage verticals because of the repeat business model. Real estate investors do not buy one property — they build portfolios. Average DSCR loan amounts of $250,000-$500,000 generate $5,000-$12,500 in origination revenue per transaction. At $3-$8 per aged lead, a $5,000 investment buys 625-1,667 investor contacts. A 2% close rate yields 12-33 initial loans — $60,000-$412,500 in first-transaction revenue. But the real value is lifetime: each investor client averages 2-3 additional properties over the next 24 months, and they refer other investors. One DSCR client acquired for $3-$8 in lead cost can generate $20,000-$40,000+ in lifetime origination revenue. No other mortgage lead type offers this compounding return.',
    crossLinks:
      'For a guide to all mortgage lead types, explore our complete guide to buying mortgage leads. DSCR leads pair well with our non-QM mortgage leads guide for building a complete investor and non-traditional lending practice. Ready to get started? Place your lead order here and start working DSCR loan leads today.',
  },

  'buy-non-qm-mortgage-leads': {
    alsAdvantages: [
      'Large inventory of aged mortgage leads with self-employment, bank statement, and non-traditional borrower profile filtering',
      'State and zip code targeting so you only buy leads in markets where your non-QM lender partners operate',
      'Lead age selection from 30 to 365+ days — non-QM borrowers have longer decision cycles (60-90 days), making aged leads especially effective',
      'DNC scrubbing included on every order — critical for professional outreach to self-employed and high-net-worth prospects',
      'Volume pricing that brings per-lead costs down — non-QM is a niche market, so larger orders ensure consistent pipeline flow',
    ],
    roiParagraph:
      'Non-QM lead economics reflect the premium nature of these borrowers and loans. Average non-QM loan amounts of $400,000-$600,000 (often higher for asset depletion and jumbo bank statement loans) generate $6,000-$15,000 in origination revenue per closed loan. At $3-$8 per aged lead, a $4,000 investment buys 500-1,333 prospects. A 1.5-2% close rate yields 7-27 funded loans — $42,000-$405,000 in revenue. Non-QM leads age better than conventional mortgage leads because the underlying qualification challenge does not go away. A self-employed borrower who could not qualify with traditional documentation 90 days ago still faces the same documentation challenge today. Bank statement loans require 12-24 months of statements, so the product solution is the same regardless of when the borrower first inquired.',
    crossLinks:
      'For a complete overview of mortgage lead types and pricing, explore our complete guide to buying mortgage leads. Non-QM leads work well alongside our bank statement loan leads guide for specializing in the self-employed borrower market. Ready to get started? Place your lead order here and start working non-QM mortgage leads today.',
  },

  'buy-bank-statement-loan-leads': {
    alsAdvantages: [
      'Aged mortgage leads filterable by self-employment indicators — target the specific borrower profile that needs bank statement programs',
      'State and zip code targeting for markets where your bank statement lender partners offer the best rates and terms',
      'Lead age selection from 30 to 365+ — self-employed borrowers often research mortgage options for months before committing',
      'DNC scrubbing included — professional outreach is critical when working with business owners who value their time',
      'Volume pricing for building a specialized self-employed borrower database — this niche rewards deep market penetration',
    ],
    roiParagraph:
      'Bank statement loan lead economics are driven by the growing self-employed segment (now 16+ million Americans) and the premium loan sizes these borrowers carry. Average bank statement loan amounts of $350,000-$500,000 generate $5,000-$12,000 in origination revenue. At $3-$8 per aged lead, a $3,000 investment buys 375-1,000 self-employed prospects. A 2% close rate yields 7-20 funded loans — $35,000-$240,000 in revenue. The critical insight: self-employed borrowers do not stop being self-employed. Their documentation challenge persists, making them loyal to loan officers who understand their situation. Referral rates among self-employed borrowers are exceptionally high — business owners know other business owners, and a successful bank statement loan closes an entire referral network.',
    crossLinks:
      'For a broader look at all mortgage lead types, explore our complete guide to buying mortgage leads. Bank statement leads pair naturally with our non-QM mortgage leads guide for building a complete self-employed lending practice. Ready to get started? Place your lead order here and start working bank statement loan leads today.',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // OTHER VERTICALS
  // ══════════════════════════════════════════════════════════════════════════
  'buy-solar-leads': {
    alsAdvantages: null, // 1-block format
    roiParagraph:
      'Solar lead economics reward volume strategies. Average residential solar systems cost $15,000-$25,000 with installer margins of 15-25%, generating $2,250-$6,250 in gross profit per installation. At $1.50-$8 per aged solar lead versus $50-$300 for fresh leads, a $3,000 budget buys 375-2,000 prospects. A 3-5% close rate yields 11-100 installations — $24,750-$625,000 in gross profit. Solar leads age differently than other verticals because of the federal Investment Tax Credit (30% ITC) — as long as the tax credit exists, the economic argument remains compelling. Spring and summer are peak seasons for solar installation interest, but leads generated during those months and worked in fall/winter often convert because homeowners have had time to review their utility bills and see the savings potential. The 25-year panel warranty also means this is a one-time purchase decision prospects take seriously — the extra consideration time that makes a lead "aged" is simply part of the natural solar buying cycle.',
  },

  'buy-home-improvement-leads': {
    alsAdvantages: null, // 1-block format
    roiParagraph:
      'Home improvement lead economics vary dramatically by project type, and that is your strategic advantage with aged leads. A roofing project averages $8,000-$15,000, a window replacement $10,000-$20,000, an HVAC system $5,000-$12,000, and siding $8,000-$18,000. At $1-$3 per aged lead versus $50-$200 for exclusive fresh leads, buying 1,000 aged leads for $1,000-$3,000 gives you massive outreach volume. At a conservative 3-5% close rate, that produces 30-50 jobs. Even at the low end ($5,000 average project), that is $150,000-$250,000 in revenue on a $1,000-$3,000 lead investment. Home improvement leads age particularly well because projects are often seasonal and planned months in advance — a homeowner who requested a roofing quote in January is likely planning a spring installation. Financing options (same-as-cash promotions, low monthly payments) give you additional hooks when following up with aged leads who may have delayed due to budget concerns.',
  },

  'buy-mortgage-refinance-leads': {
    alsAdvantages: null, // 1-block format
    roiParagraph:
      'The refinance lead opportunity is tied directly to rate movements — and that creates a counter-cyclical advantage for aged leads. When rates are high, fresh refi lead volume drops and aged lead prices fall to $2-$5 each. When rates drop, those same borrowers suddenly have a compelling savings story. Average refinance savings of $200-$400/month and origination revenue of $3,000-$5,000 per funded refi make the math straightforward. A $5,000 investment in 1,000-2,500 aged leads at $2-$5 each, activated when rates drop, can yield 10-25 funded loans at a 1% close rate — $30,000-$125,000 in revenue. Loan officers who build an aged refi database during high-rate periods and nurture those contacts position themselves for massive volume when the market shifts.',
  },

  'buy-mortgage-leads': {
    alsAdvantages: null, // 1-block format
    roiParagraph: null, // already has specific content as the hub page
  },

  'buy-aged-leads': {
    alsAdvantages: null, // hub page, leave as-is
    roiParagraph: null,
  },
}

// ── Matching & Patching Logic ───────────────────────────────────────────────

function findAlsAdvantagesBlock(content) {
  /**
   * Finds the AgedLeadStore "Key advantages" paragraph and the next 5 bullet-style
   * blocks that follow it. Returns { cbIndex, startBlkIndex, endBlkIndex } or null.
   */
  if (!content) return null
  for (let cbIdx = 0; cbIdx < content.length; cbIdx++) {
    const cb = content[cbIdx]
    if (cb?._type !== 'contentBlock') continue
    const inner = cb?.content || []
    for (let i = 0; i < inner.length; i++) {
      const text = getBlockText(inner[i]).toLowerCase()
      // Match "Key advantages" pattern OR "largest database" pattern
      const isAlsIntro =
        (text.includes('key advantages') &&
          (text.includes('agedleadstore') || text.includes('aged lead store'))) ||
        (text.includes('largest database') &&
          (text.includes('agedleadstore') || text.includes('aged lead store')) &&
          text.length > 60)
      if (isAlsIntro) {
        // Found the intro paragraph. Now find the next 5 blocks (bullets).
        let endIdx = i + 1
        let bulletCount = 0
        while (endIdx < inner.length && bulletCount < 5) {
          const nextText = getBlockText(inner[endIdx])
          // Bullets are short-ish (under 200 chars usually) and don't start with ##
          if (nextText.startsWith('##') || nextText.startsWith('### ')) break
          if (nextText.length > 20) bulletCount++
          if (bulletCount >= 5) {
            endIdx++ // include this block
            break
          }
          endIdx++
        }
        return { cbIndex: cbIdx, startBlkIndex: i, endBlkIndex: endIdx }
      }
    }
  }
  return null
}

function findRoiParagraph(content, slug) {
  /**
   * Finds the primary ROI/cost paragraph — the first normal paragraph that
   * discusses cost comparisons, aged lead pricing, or ROI math.
   */
  if (!content) return null

  const roiPatterns = [
    /aged .{0,20}leads?.{0,30}(cost|price|fraction|cheaper|afford)/i,
    /fresh leads?.{0,30}(cost|\$\d+)/i,
    /at \$\d+.{0,20}per (aged |)lead/i,
    /(roi|return on investment).{0,30}(aged|lead)/i,
    /cost.{0,20}(per|each).{0,20}lead.{0,30}\$/i,
  ]

  for (let cbIdx = 0; cbIdx < content.length; cbIdx++) {
    const cb = content[cbIdx]
    if (cb?._type !== 'contentBlock') continue
    const inner = cb?.content || []
    for (let i = 0; i < inner.length; i++) {
      const block = inner[i]
      if (block?._type !== 'block') continue
      if (block?.style !== 'normal') continue
      const text = getBlockText(block)
      if (text.length < 80) continue // skip short blocks

      const matches = roiPatterns.some((p) => p.test(text))
      if (matches) {
        // Safety: skip if this block is the entire page content (single-block pages
        // where all content is in one giant span). Only replace paragraphs < 2000 chars.
        if (text.length > 2000) {
          continue // skip this match, try to find a shorter one
        }
        return { cbIndex: cbIdx, blkIndex: i, currentText: text }
      }
    }
  }
  return null
}

function findCrossLinkBoilerplate(content) {
  /**
   * Finds the 3 identical cross-link/CTA sentences on the 6 mortgage pages:
   * 1. "For a complete overview of aged lead types..."
   * 2. "New to aged leads? Start with..."
   * 3. "Ready to get started? Place your lead order..."
   */
  if (!content) return null
  const targets = [
    'for a complete overview of aged lead types and pricing',
    'new to aged leads? start with our aged leads buying guide',
    'ready to get started? place your lead order here',
  ]

  const found = []
  for (let cbIdx = 0; cbIdx < content.length; cbIdx++) {
    const cb = content[cbIdx]
    if (cb?._type !== 'contentBlock') continue
    const inner = cb?.content || []
    for (let i = 0; i < inner.length; i++) {
      const text = getBlockText(inner[i]).toLowerCase()
      for (const target of targets) {
        if (text.includes(target)) {
          found.push({ cbIndex: cbIdx, blkIndex: i, target })
        }
      }
    }
  }
  return found.length >= 2 ? found : null
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n${'═'.repeat(70)}\n  Differentiate "buy X leads" pages — ${dryRun ? 'DRY RUN' : 'APPLYING CHANGES'}\n${'═'.repeat(70)}\n`
  )

  // Fetch all buy-* landing pages
  const pages = await client.fetch(
    `*[_type == "landingPage" && slug.current match "buy-*"]{_id, title, "slug": slug.current, content}`
  )

  console.log(`Found ${pages.length} buy-* landing pages\n`)

  let totalPatches = 0
  let totalPages = 0

  for (const page of pages.sort((a, b) => a.slug.localeCompare(b.slug))) {
    const slug = page.slug
    const config = INDUSTRY_DATA[slug]

    if (!config) {
      console.log(`⊘ ${slug} — no differentiation config, skipping`)
      continue
    }

    const content = page.content || []
    let patchOps = []
    let changes = []

    // ── 1. Replace AgedLeadStore "Key advantages" bullets ──
    if (config.alsAdvantages) {
      const als = findAlsAdvantagesBlock(content)
      if (als) {
        // Build the replacement blocks: 1 intro paragraph + 5 bullet blocks
        const introText = getBlockText(content[als.cbIndex].content[als.startBlkIndex])
        // Keep the intro paragraph as-is (it already mentions the specific product)
        // Replace just the 5 bullet items
        const newBullets = config.alsAdvantages.map((text) => makeBlock(text))

        // We need to replace blocks from startBlkIndex+1 to endBlkIndex
        const innerPath = `content[_key=="${content[als.cbIndex]._key}"].content`
        const oldBlocks = content[als.cbIndex].content.slice(
          als.startBlkIndex + 1,
          als.endBlkIndex
        )

        changes.push(
          `  ALS advantages: replacing ${oldBlocks.length} generic bullets with ${newBullets.length} industry-specific bullets`
        )

        // Build new content array with replacements
        const newInner = [...content[als.cbIndex].content]
        newInner.splice(als.startBlkIndex + 1, oldBlocks.length, ...newBullets)

        patchOps.push({
          type: 'set',
          path: `content[_key=="${content[als.cbIndex]._key}"].content`,
          value: newInner,
        })
      } else {
        changes.push('  ALS advantages: section not found (no changes)')
      }
    }

    // ── 2. Replace ROI paragraph ──
    if (config.roiParagraph) {
      const roi = findRoiParagraph(content, slug)
      if (roi) {
        const cb = content[roi.cbIndex]
        const block = cb.content[roi.blkIndex]

        changes.push(
          `  ROI paragraph: replacing "${roi.currentText.slice(0, 60)}..." (${roi.currentText.length} chars -> ${config.roiParagraph.length} chars)`
        )

        // Update the block's children to have the new text
        patchOps.push({
          type: 'set',
          path: `content[_key=="${cb._key}"].content[_key=="${block._key}"].children`,
          value: [makeSpan(config.roiParagraph)],
        })
      } else {
        changes.push('  ROI paragraph: no matching generic paragraph found (no changes)')
      }
    }

    // ── 3. Replace cross-link boilerplate (mortgage pages) ──
    if (config.crossLinks) {
      const crossLinks = findCrossLinkBoilerplate(content)
      if (crossLinks) {
        // Replace all 3 boilerplate sentences with industry-specific cross-links
        // Split the replacement into 3 paragraphs
        const newSentences = config.crossLinks
          .split(/\.\s+/)
          .map((s) => s.replace(/\.$/, '').trim())
          .filter((s) => s.length > 0)

        for (let idx = 0; idx < crossLinks.length && idx < newSentences.length; idx++) {
          const cl = crossLinks[idx]
          const cb = content[cl.cbIndex]
          const block = cb.content[cl.blkIndex]

          changes.push(
            `  Cross-link ${idx + 1}: replacing "${getBlockText(block).slice(0, 50)}..." with new link`
          )

          patchOps.push({
            type: 'set',
            path: `content[_key=="${cb._key}"].content[_key=="${block._key}"].children`,
            value: [makeSpan(newSentences[idx] + '.')],
          })
        }
      } else {
        changes.push('  Cross-links: boilerplate not found (no changes)')
      }
    }

    // ── Apply patches ──
    if (patchOps.length > 0) {
      totalPages++
      totalPatches += patchOps.length

      console.log(`\n${'─'.repeat(60)}`)
      console.log(`PAGE: ${slug} (${page.title})`)
      console.log(`${'─'.repeat(60)}`)
      for (const c of changes) console.log(c)

      if (!dryRun) {
        try {
          let tx = client.patch(page._id)
          for (const op of patchOps) {
            tx = tx.set({ [op.path]: op.value })
          }
          await tx.commit()
          console.log(`  ✓ Patched successfully`)
        } catch (err) {
          console.error(`  ✗ Error patching: ${err.message}`)
        }
      } else {
        console.log(`  [DRY RUN — would apply ${patchOps.length} patch operations]`)
      }
    } else if (config.roiParagraph || config.alsAdvantages || config.crossLinks) {
      console.log(`\n  ${slug}: config exists but no matching content found to patch`)
    }
  }

  console.log(`\n${'═'.repeat(70)}`)
  console.log(
    `  Summary: ${totalPatches} patch operations across ${totalPages} pages ${dryRun ? '(DRY RUN)' : '(APPLIED)'}`
  )
  console.log(`${'═'.repeat(70)}\n`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
