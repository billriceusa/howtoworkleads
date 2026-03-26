/**
 * Master Content Calendar — Single source of truth for ALL howtoworkleads.com content.
 *
 * Merges two previously separate inventories:
 *   1. content-briefs/ (81 items, numbered 01-81) — original site build content
 *   2. editorial-calendar.ts (36 items, weeks 1-12) — weekly cron content
 *
 * The weekly-content cron reads from this file to decide what to write next.
 * Status is updated here as content moves through the pipeline.
 *
 * Last consolidated: 2026-03-25
 */

export type ContentStatus =
  | "published"       // Live on site in Sanity
  | "content-written" // CONTENT.md exists, not yet in Sanity
  | "scheduled"       // Queued for cron to write & publish
  | "brief"           // Has outline/brief, no content yet
  | "idea";           // Topic identified, no brief yet

export type ContentType = "blog" | "landing" | "hub" | "tool" | "reference";

export interface MasterContentEntry {
  /** Unique ID. Briefs 1-81, editorial calendar 101-136 */
  id: number;
  slug: string;
  title: string;
  pillar: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  contentType: ContentType;
  status: ContentStatus;
  /** Phase from original content briefs (1=Foundation, 2=Depth, 3=Authority) */
  phase?: number;
  /** Path to brief file in content-briefs/ (if exists) */
  briefFile?: string;
  /** Path to CONTENT.md file in content-briefs/ (if exists) */
  contentFile?: string;
  /** For cron-scheduled items: target publish date */
  publishDate?: string;
  /** For cron-scheduled items: day of week */
  day?: "Mon" | "Wed" | "Fri";
  /** For cron-scheduled items: week number */
  week?: number;
  /** Competitive angle or unique value prop */
  competitiveAngle?: string;
  /** Section outline */
  outline?: string[];
  /** Internal links to include */
  internalLinks?: string[];
  /** Target word count range */
  wordCount?: string;
  /** Where this entry originated */
  source: "content-brief" | "editorial-calendar";
}

// ═══════════════════════════════════════════════════════════════════
// CONTENT BRIEFS (Original site build — items 1-81)
// ═══════════════════════════════════════════════════════════════════

export const CONTENT_BRIEFS: MasterContentEntry[] = [
  // ── PHASE 1: FOUNDATION (1-10) ──
  { id: 1, slug: "aged-vs-fresh-leads", title: "Aged Leads vs Fresh Leads: Which Converts Better?", pillar: "Buying Leads", primaryKeyword: "aged vs fresh leads", secondaryKeywords: ["aged leads vs real time leads", "old leads worth buying"], contentType: "blog", status: "published", phase: 1, briefFile: "01-aged-vs-fresh.md", contentFile: "01-aged-vs-fresh-CONTENT.md", source: "content-brief" },
  { id: 2, slug: "how-to-work-insurance-leads", title: "How to Work Aged Insurance Leads", pillar: "Industry Strategies", primaryKeyword: "how to work insurance leads", secondaryKeywords: ["insurance lead follow up", "aged insurance leads"], contentType: "blog", status: "published", phase: 1, briefFile: "02-work-insurance-leads.md", contentFile: "02-work-insurance-leads-CONTENT.md", source: "content-brief" },
  { id: 3, slug: "aged-lead-scripts-templates", title: "Aged Lead Scripts and Templates", pillar: "Sales Process", primaryKeyword: "aged lead scripts templates", secondaryKeywords: ["lead calling scripts", "aged lead voicemail scripts"], contentType: "blog", status: "published", phase: 1, briefFile: "03-scripts-templates.md", contentFile: "03-scripts-templates-CONTENT.md", source: "content-brief" },
  { id: 4, slug: "aged-lead-follow-up-cadence", title: "7-Day Follow-Up Cadence for Aged Leads", pillar: "Lead Management", primaryKeyword: "aged lead follow up cadence", secondaryKeywords: ["lead follow up schedule", "how many times to call a lead"], contentType: "blog", status: "published", phase: 1, briefFile: "04-follow-up-cadence.md", contentFile: "04-follow-up-cadence-CONTENT.md", source: "content-brief" },
  { id: 5, slug: "how-to-work-final-expense-leads", title: "How to Work Final Expense Leads", pillar: "Industry Strategies", primaryKeyword: "final expense leads conversion", secondaryKeywords: ["final expense lead scripts", "aged final expense leads"], contentType: "blog", status: "published", phase: 1, briefFile: "05-final-expense-leads.md", contentFile: "05-final-expense-leads-CONTENT.md", source: "content-brief" },
  { id: 6, slug: "how-to-work-medicare-leads", title: "How to Work Medicare Leads", pillar: "Industry Strategies", primaryKeyword: "medicare leads conversion", secondaryKeywords: ["medicare supplement leads", "aged medicare leads"], contentType: "blog", status: "published", phase: 1, briefFile: "06-medicare-leads.md", contentFile: "06-medicare-leads-CONTENT.md", source: "content-brief" },
  { id: 7, slug: "how-to-work-auto-insurance-leads", title: "How to Work Auto Insurance Leads", pillar: "Industry Strategies", primaryKeyword: "auto insurance leads", secondaryKeywords: ["aged auto insurance leads", "auto insurance lead conversion"], contentType: "blog", status: "published", phase: 1, briefFile: "07-auto-insurance-leads.md", contentFile: "07-auto-insurance-leads-CONTENT.md", source: "content-brief" },
  { id: 8, slug: "mortgage-protection-insurance-leads", title: "How to Work Mortgage Protection Leads", pillar: "Industry Strategies", primaryKeyword: "mortgage protection leads", secondaryKeywords: ["mortgage protection insurance leads", "MP leads"], contentType: "blog", status: "published", phase: 1, briefFile: "08-mortgage-protection.md", contentFile: "08-mortgage-protection-CONTENT.md", source: "content-brief" },
  { id: 9, slug: "buy-aged-leads", title: "The Complete Guide to Buying Leads", pillar: "Buying Leads", primaryKeyword: "buying aged leads", secondaryKeywords: ["where to buy leads", "buy internet leads"], contentType: "hub", status: "published", phase: 1, briefFile: "09-buying-leads-pillar.md", contentFile: "09-buying-leads-pillar-CONTENT.md", source: "content-brief" },
  { id: 10, slug: "aged-lead-conversion-rates", title: "Lead Conversion Rate Benchmarks", pillar: "Buying Leads", primaryKeyword: "lead conversion rates", secondaryKeywords: ["aged lead conversion rates", "internet lead benchmarks"], contentType: "blog", status: "published", phase: 1, briefFile: "10-conversion-rates.md", contentFile: "10-conversion-rates-CONTENT.md", source: "content-brief" },

  // ── PHASE 2: DEPTH (11-20) ──
  { id: 11, slug: "how-to-work-aged-mortgage-leads", title: "How to Work Mortgage Leads", pillar: "Industry Strategies", primaryKeyword: "how to work mortgage leads", secondaryKeywords: ["mortgage lead follow up", "aged mortgage leads"], contentType: "blog", status: "published", phase: 2, briefFile: "11-work-mortgage-leads.md", contentFile: "11-work-mortgage-leads-CONTENT.md", source: "content-brief" },
  { id: 12, slug: "how-to-work-aged-solar-leads", title: "How to Work Solar Leads", pillar: "Industry Strategies", primaryKeyword: "solar lead conversion", secondaryKeywords: ["aged solar leads", "solar lead scripts"], contentType: "blog", status: "published", phase: 2, briefFile: "12-work-solar-leads.md", contentFile: "12-work-solar-leads-CONTENT.md", source: "content-brief" },
  { id: 13, slug: "how-to-work-final-expense-leads", title: "How to Work Final Expense Leads (Advanced)", pillar: "Industry Strategies", primaryKeyword: "final expense lead conversion", secondaryKeywords: ["final expense scripts", "aged final expense"], contentType: "blog", status: "published", phase: 2, briefFile: "13-work-final-expense.md", contentFile: "13-work-final-expense-CONTENT.md", source: "content-brief" },
  { id: 14, slug: "best-crm-aged-leads", title: "Best CRM for Working Aged Leads", pillar: "CRM Systems", primaryKeyword: "CRM aged leads", secondaryKeywords: ["best CRM for leads", "lead management CRM"], contentType: "blog", status: "published", phase: 2, briefFile: "14-crm-aged-leads.md", contentFile: "14-crm-aged-leads-CONTENT.md", source: "content-brief" },
  { id: 15, slug: "gohighlevel-aged-leads-setup", title: "GoHighLevel Setup for Lead Management", pillar: "CRM Systems", primaryKeyword: "GoHighLevel aged leads", secondaryKeywords: ["GHL lead setup", "GoHighLevel automation"], contentType: "blog", status: "published", phase: 2, briefFile: "15-ghl-setup.md", contentFile: "15-ghl-setup-CONTENT.md", source: "content-brief" },
  { id: 16, slug: "how-to-work-annuity-leads", title: "How to Work Annuity Leads", pillar: "Industry Strategies", primaryKeyword: "annuity leads", secondaryKeywords: ["aged annuity leads", "annuity lead conversion"], contentType: "blog", status: "published", phase: 2, briefFile: "16-annuity-leads.md", contentFile: "16-annuity-leads-CONTENT.md", source: "content-brief" },
  { id: 17, slug: "how-to-work-pc-insurance-leads", title: "How to Work P&C Insurance Leads", pillar: "Industry Strategies", primaryKeyword: "property casualty insurance leads", secondaryKeywords: ["P&C leads", "home and auto leads"], contentType: "blog", status: "published", phase: 2, briefFile: "17-pc-insurance.md", contentFile: "17-pc-insurance-CONTENT.md", source: "content-brief" },
  { id: 18, slug: "lead-management", title: "Lead Management Hub", pillar: "Lead Management", primaryKeyword: "lead management", secondaryKeywords: ["what is lead management", "lead management process"], contentType: "hub", status: "published", phase: 2, briefFile: "18-lead-mgmt-pillar.md", contentFile: "18-lead-mgmt-pillar-CONTENT.md", source: "content-brief" },
  { id: 19, slug: "sales-process", title: "Sales Process Hub", pillar: "Sales Process", primaryKeyword: "sales process", secondaryKeywords: ["what is a sales process", "B2C sales process"], contentType: "hub", status: "published", phase: 2, briefFile: "19-sales-process-pillar.md", contentFile: "19-sales-process-pillar-CONTENT.md", source: "content-brief" },
  { id: 20, slug: "aged-leads-dnc-compliance", title: "DNC Compliance for Aged Leads", pillar: "Compliance", primaryKeyword: "aged leads DNC compliance", secondaryKeywords: ["DNC scrubbing leads", "TCPA aged leads", "can I call aged leads"], contentType: "blog", status: "published", phase: 2, briefFile: "20-dnc-compliance.md", contentFile: "20-dnc-compliance-CONTENT.md", source: "content-brief" },

  // ── PHASE 3: AUTHORITY (21-30) ──
  { id: 21, slug: "aged-lead-roi-calculator", title: "Aged Lead ROI Calculator", pillar: "Buying Leads", primaryKeyword: "aged lead ROI calculator", secondaryKeywords: ["lead ROI tool", "calculate lead ROI"], contentType: "tool", status: "idea", phase: 3, briefFile: "21-roi-calculator.md", source: "content-brief" },
  { id: 22, slug: "compliance-checklist", title: "Lead Buying Compliance Checklist", pillar: "Compliance", primaryKeyword: "lead buying compliance checklist", secondaryKeywords: ["TCPA checklist", "DNC checklist"], contentType: "tool", status: "idea", phase: 3, briefFile: "22-compliance-checklist.md", source: "content-brief" },
  { id: 23, slug: "aged-lead-pricing-guide", title: "Aged Lead Pricing 2026", pillar: "Buying Leads", primaryKeyword: "aged lead pricing", secondaryKeywords: ["how much do aged leads cost", "lead pricing guide"], contentType: "blog", status: "published", phase: 3, briefFile: "23-pricing-guide.md", contentFile: "23-pricing-guide-CONTENT.md", source: "content-brief" },
  { id: 24, slug: "insurance-agent-lead-budget", title: "Insurance Agent Lead Budget", pillar: "Buying Leads", primaryKeyword: "insurance lead budget", secondaryKeywords: ["how much to spend on leads", "lead budget planning"], contentType: "blog", status: "published", phase: 3, briefFile: "24-lead-budget.md", contentFile: "24-lead-budget-CONTENT.md", source: "content-brief" },
  { id: 25, slug: "aged-lead-vendor-comparison", title: "Aged Lead Vendor Comparison", pillar: "Buying Leads", primaryKeyword: "aged lead vendors comparison", secondaryKeywords: ["best aged lead vendors", "lead vendor review"], contentType: "blog", status: "published", phase: 3, briefFile: "25-vendor-comparison.md", contentFile: "25-vendor-comparison-CONTENT.md", source: "content-brief" },
  { id: 26, slug: "fcc-consent-rule-lead-buying", title: "The FCC 1:1 Consent Rule and Lead Buying", pillar: "Compliance", primaryKeyword: "FCC 1:1 consent leads", secondaryKeywords: ["FCC one to one consent rule", "FCC lead generation rule"], contentType: "blog", status: "published", phase: 3, briefFile: "26-fcc-rule.md", contentFile: "26-fcc-rule-CONTENT.md", source: "content-brief" },
  { id: 27, slug: "aged-lead-case-studies", title: "Aged Lead Success Stories", pillar: "Buying Leads", primaryKeyword: "aged lead success stories", secondaryKeywords: ["aged lead case studies", "lead conversion stories"], contentType: "blog", status: "published", phase: 3, briefFile: "27-case-studies.md", contentFile: "27-case-studies-CONTENT.md", source: "content-brief" },
  { id: 28, slug: "aged-lead-email-drip-campaigns", title: "Aged Lead Email Drip Campaigns", pillar: "Lead Management", primaryKeyword: "aged lead email drip campaign", secondaryKeywords: ["email drip for leads", "aged lead email sequence"], contentType: "blog", status: "published", phase: 3, briefFile: "28-email-drips.md", contentFile: "28-email-drips-CONTENT.md", source: "content-brief" },
  { id: 29, slug: "aged-leads", title: "The Complete Guide to Aged Leads", pillar: "Buying Leads", primaryKeyword: "aged leads", secondaryKeywords: ["what are aged leads", "aged lead guide"], contentType: "hub", status: "published", phase: 3, briefFile: "29-aged-leads-hub.md", contentFile: "29-aged-leads-hub-CONTENT.md", source: "content-brief" },
  { id: 30, slug: "speed-to-lead-aged-leads", title: "Speed to Lead for Aged Leads", pillar: "Lead Management", primaryKeyword: "speed to lead aged leads", secondaryKeywords: ["lead response time", "how fast to call leads"], contentType: "blog", status: "published", phase: 3, briefFile: "30-speed-to-lead.md", contentFile: "30-speed-to-lead-CONTENT.md", source: "content-brief" },

  // ── MORTGAGE EXPANSION (31-42) ──
  { id: 31, slug: "buy-purchase-mortgage-leads", title: "Buy Purchase Mortgage Leads", pillar: "Buying Leads", primaryKeyword: "buy purchase mortgage leads", secondaryKeywords: [], contentType: "landing", status: "published", briefFile: "31-purchase-mortgage-leads.md", contentFile: "31-purchase-mortgage-leads-CONTENT.md", source: "content-brief" },
  { id: 32, slug: "buy-refinance-mortgage-leads", title: "Buy Refinance Mortgage Leads", pillar: "Buying Leads", primaryKeyword: "buy refinance mortgage leads", secondaryKeywords: [], contentType: "landing", status: "published", briefFile: "32-refinance-mortgage-leads.md", contentFile: "32-refinance-mortgage-leads-CONTENT.md", source: "content-brief" },
  { id: 33, slug: "buy-non-qm-mortgage-leads", title: "Buy Non-QM Mortgage Leads", pillar: "Buying Leads", primaryKeyword: "buy non-QM mortgage leads", secondaryKeywords: [], contentType: "landing", status: "published", briefFile: "33-non-qm-leads.md", contentFile: "33-non-qm-leads-CONTENT.md", source: "content-brief" },
  { id: 34, slug: "buy-dscr-loan-leads", title: "Buy DSCR Loan Leads", pillar: "Buying Leads", primaryKeyword: "buy DSCR loan leads", secondaryKeywords: [], contentType: "landing", status: "published", briefFile: "34-dscr-leads.md", contentFile: "34-dscr-leads-CONTENT.md", source: "content-brief" },
  { id: 35, slug: "buy-bank-statement-loan-leads", title: "Buy Bank Statement Loan Leads", pillar: "Buying Leads", primaryKeyword: "buy bank statement loan leads", secondaryKeywords: [], contentType: "landing", status: "published", briefFile: "35-bank-statement-leads.md", contentFile: "35-bank-statement-leads-CONTENT.md", source: "content-brief" },
  { id: 36, slug: "buy-heloc-leads", title: "Buy HELOC Leads", pillar: "Buying Leads", primaryKeyword: "buy HELOC leads", secondaryKeywords: [], contentType: "landing", status: "published", briefFile: "36-heloc-leads.md", contentFile: "36-heloc-leads-CONTENT.md", source: "content-brief" },
  { id: 37, slug: "how-to-work-purchase-mortgage-leads", title: "How to Work Purchase Mortgage Leads", pillar: "Industry Strategies", primaryKeyword: "how to work purchase mortgage leads", secondaryKeywords: [], contentType: "blog", status: "published", briefFile: "37-work-mortgage-purchase-leads.md", contentFile: "37-work-mortgage-purchase-leads-CONTENT.md", source: "content-brief" },
  { id: 38, slug: "how-to-work-refinance-mortgage-leads", title: "How to Work Refinance Mortgage Leads", pillar: "Industry Strategies", primaryKeyword: "how to work refinance mortgage leads", secondaryKeywords: [], contentType: "blog", status: "published", briefFile: "38-work-refinance-leads.md", contentFile: "38-work-refinance-leads-CONTENT.md", source: "content-brief" },
  { id: 39, slug: "how-to-work-non-qm-mortgage-leads", title: "How to Work Non-QM Mortgage Leads", pillar: "Industry Strategies", primaryKeyword: "how to work non-QM mortgage leads", secondaryKeywords: [], contentType: "blog", status: "published", briefFile: "39-work-non-qm-leads.md", contentFile: "39-work-non-qm-leads-CONTENT.md", source: "content-brief" },
  { id: 40, slug: "how-to-work-dscr-loan-leads", title: "How to Work DSCR Loan Leads", pillar: "Industry Strategies", primaryKeyword: "how to work DSCR loan leads", secondaryKeywords: [], contentType: "blog", status: "published", briefFile: "40-work-dscr-leads.md", contentFile: "40-work-dscr-leads-CONTENT.md", source: "content-brief" },
  { id: 41, slug: "how-to-work-bank-statement-loan-leads", title: "How to Work Bank Statement Loan Leads", pillar: "Industry Strategies", primaryKeyword: "how to work bank statement loan leads", secondaryKeywords: [], contentType: "blog", status: "published", briefFile: "41-work-bank-statement-leads.md", contentFile: "41-work-bank-statement-leads-CONTENT.md", source: "content-brief" },
  { id: 42, slug: "how-to-work-heloc-leads", title: "How to Work HELOC Leads", pillar: "Industry Strategies", primaryKeyword: "how to work HELOC leads", secondaryKeywords: [], contentType: "blog", status: "published", briefFile: "42-work-heloc-leads.md", contentFile: "42-work-heloc-leads-CONTENT.md", source: "content-brief" },

  // ── INSURANCE + VERTICAL EXPANSION (43-50) ──
  { id: 43, slug: "how-to-work-medicare-leads", title: "How to Work Medicare Leads (AEP Guide)", pillar: "Industry Strategies", primaryKeyword: "how to work medicare leads", secondaryKeywords: [], contentType: "blog", status: "published", briefFile: "43-work-medicare-leads.md", contentFile: "43-work-medicare-leads-CONTENT.md", source: "content-brief" },
  { id: 44, slug: "how-to-work-auto-insurance-leads", title: "How to Work Auto Insurance Leads (Advanced)", pillar: "Industry Strategies", primaryKeyword: "how to work auto insurance leads", secondaryKeywords: [], contentType: "blog", status: "published", briefFile: "44-work-auto-insurance-leads.md", contentFile: "44-work-auto-insurance-leads-CONTENT.md", source: "content-brief" },
  { id: 45, slug: "how-to-work-life-insurance-leads", title: "How to Work Life Insurance Leads", pillar: "Industry Strategies", primaryKeyword: "how to work life insurance leads", secondaryKeywords: [], contentType: "blog", status: "published", briefFile: "45-work-life-insurance-leads.md", contentFile: "45-work-life-insurance-leads-CONTENT.md", source: "content-brief" },
  { id: 46, slug: "how-to-work-home-improvement-leads", title: "How to Work Home Improvement Leads", pillar: "Industry Strategies", primaryKeyword: "how to work home improvement leads", secondaryKeywords: [], contentType: "blog", status: "published", briefFile: "46-work-home-improvement-leads.md", contentFile: "46-work-home-improvement-leads-CONTENT.md", source: "content-brief" },
  { id: 47, slug: "how-to-work-pc-insurance-leads", title: "How to Work P&C Insurance Leads (Bundling)", pillar: "Industry Strategies", primaryKeyword: "P&C insurance leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "47-work-pc-insurance-leads-CONTENT.md", source: "content-brief" },
  { id: 48, slug: "how-to-work-iul-leads", title: "How to Work IUL Leads", pillar: "Industry Strategies", primaryKeyword: "IUL leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "48-work-iul-leads-CONTENT.md", source: "content-brief" },
  { id: 49, slug: "how-to-work-annuity-leads", title: "How to Work Annuity Leads (Producer's Playbook)", pillar: "Industry Strategies", primaryKeyword: "annuity leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "49-work-annuity-leads-CONTENT.md", source: "content-brief" },
  { id: 50, slug: "how-to-work-health-insurance-leads", title: "How to Work Health Insurance Leads", pillar: "Industry Strategies", primaryKeyword: "health insurance leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "50-work-health-insurance-leads-CONTENT.md", source: "content-brief" },

  // ── COMPLIANCE & REGULATORY (51-53) ──
  { id: 51, slug: "tcpa-compliance-lead-buyers", title: "TCPA Compliance for Lead Buyers: Complete Guide", pillar: "Compliance", primaryKeyword: "TCPA compliance lead buyers", secondaryKeywords: ["TCPA rules leads", "auto-dialer restrictions", "DNC requirements"], contentType: "blog", status: "published", contentFile: "51-tcpa-compliance-CONTENT.md", source: "content-brief" },
  { id: 52, slug: "state-by-state-lead-compliance-guide", title: "State-by-State Lead Compliance Guide", pillar: "Compliance", primaryKeyword: "state telemarketing laws", secondaryKeywords: ["mini-TCPA laws", "state DNC lists"], contentType: "blog", status: "published", contentFile: "52-state-compliance-guide-CONTENT.md", source: "content-brief" },
  { id: 53, slug: "trigger-lead-ban-mortgage-buyers", title: "What the Trigger Lead Ban Means for Mortgage Lead Buyers", pillar: "Compliance", primaryKeyword: "trigger lead ban", secondaryKeywords: ["Homebuyers Privacy Protection Act", "trigger leads mortgage"], contentType: "blog", status: "published", contentFile: "53-trigger-lead-ban-CONTENT.md", source: "content-brief" },

  // ── AI & TECH TOOLS (54-58) ──
  { id: 54, slug: "ai-voice-sms-tools-working-leads", title: "AI Voice and SMS Tools for Working Leads", pillar: "CRM Systems", primaryKeyword: "AI voice tools leads", secondaryKeywords: ["AI SMS leads", "AI sales tools"], contentType: "blog", status: "published", contentFile: "54-ai-voice-sms-tools-CONTENT.md", source: "content-brief" },
  { id: 55, slug: "how-to-evaluate-lead-vendor", title: "How to Evaluate a Lead Vendor in 2026", pillar: "Buying Leads", primaryKeyword: "evaluate lead vendor", secondaryKeywords: ["lead vendor checklist", "lead vendor due diligence"], contentType: "blog", status: "published", contentFile: "55-evaluate-lead-vendor-CONTENT.md", source: "content-brief" },
  { id: 56, slug: "ai-text-followup-aged-leads", title: "AI Text Follow-Up for Aged Leads", pillar: "CRM Systems", primaryKeyword: "AI text follow up leads", secondaryKeywords: ["automated text leads", "AI SMS aged leads"], contentType: "blog", status: "published", contentFile: "56-ai-text-followup-CONTENT.md", source: "content-brief" },
  { id: 57, slug: "real-cost-aged-vs-fresh-leads-2026", title: "The Real Cost of Aged Leads vs Fresh Leads in 2026", pillar: "Buying Leads", primaryKeyword: "cost aged vs fresh leads", secondaryKeywords: ["aged lead cost comparison", "fresh lead pricing"], contentType: "blog", status: "published", contentFile: "57-real-cost-aged-fresh-2026-CONTENT.md", source: "content-brief" },
  { id: 58, slug: "power-dialer-comparison-lead-workers", title: "Power Dialer Comparison for Lead Workers", pillar: "CRM Systems", primaryKeyword: "power dialer comparison", secondaryKeywords: ["best dialer for leads", "sales dialer review"], contentType: "blog", status: "published", contentFile: "58-power-dialer-comparison-CONTENT.md", source: "content-brief" },

  // ── REGULATORY REFERENCE (59) ──
  { id: 59, slug: "lead-buyer-regulatory-cheat-sheet", title: "Lead Buyer's Regulatory Cheat Sheet (2026)", pillar: "Compliance", primaryKeyword: "lead buyer regulatory cheat sheet", secondaryKeywords: ["TCPA cheat sheet", "lead compliance quick reference"], contentType: "reference", status: "published", contentFile: "59-regulatory-cheat-sheet-CONTENT.md", source: "content-brief" },

  // ── REAL ESTATE (60-62) ──
  { id: 60, slug: "buy-real-estate-leads", title: "Buy Real Estate Leads", pillar: "Buying Leads", primaryKeyword: "buy real estate leads", secondaryKeywords: [], contentType: "landing", status: "published", contentFile: "60-buy-real-estate-leads-CONTENT.md", source: "content-brief" },
  { id: 61, slug: "how-to-work-real-estate-leads", title: "How to Work Real Estate Leads", pillar: "Industry Strategies", primaryKeyword: "how to work real estate leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "61-work-real-estate-leads-CONTENT.md", source: "content-brief" },
  { id: 62, slug: "real-estate-lead-generation-strategies", title: "Real Estate Lead Generation Strategies", pillar: "Industry Strategies", primaryKeyword: "real estate lead generation", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "62-real-estate-lead-gen-CONTENT.md", source: "content-brief" },

  // ── CRM REVIEWS (63-65) ──
  { id: 63, slug: "close-crm-aged-leads-review", title: "Close CRM for Working Aged Leads: Review", pillar: "CRM Systems", primaryKeyword: "Close CRM review", secondaryKeywords: ["Close CRM leads", "Close CRM aged leads"], contentType: "blog", status: "published", contentFile: "63-close-crm-review-CONTENT.md", source: "content-brief" },
  { id: 64, slug: "hubspot-crm-leads-review", title: "HubSpot CRM for Working Leads: Review", pillar: "CRM Systems", primaryKeyword: "HubSpot CRM leads review", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "64-hubspot-crm-review-CONTENT.md", source: "content-brief" },
  { id: 65, slug: "salesforce-leads-review", title: "Salesforce for Lead-Based Sales Teams: Review", pillar: "CRM Systems", primaryKeyword: "Salesforce leads review", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "65-salesforce-crm-review-CONTENT.md", source: "content-brief" },

  // ── TEAM BUILDING & REFERENCE (66-67) ──
  { id: 66, slug: "building-lead-based-sales-team", title: "Building a Lead-Based Sales Team", pillar: "Lead Management", primaryKeyword: "build lead sales team", secondaryKeywords: ["scaling sales team", "hiring sales agents"], contentType: "blog", status: "published", contentFile: "66-building-lead-sales-team-CONTENT.md", source: "content-brief" },
  { id: 67, slug: "lead-generation-glossary", title: "Lead Generation Glossary: 60+ Terms", pillar: "Lead Management", primaryKeyword: "lead generation glossary", secondaryKeywords: ["lead gen terms", "sales glossary"], contentType: "reference", status: "published", contentFile: "67-lead-generation-glossary-CONTENT.md", source: "content-brief" },

  // ── LEGAL VERTICALS (68-70) ──
  { id: 68, slug: "how-to-work-mva-leads", title: "How to Work MVA Leads", pillar: "Industry Strategies", primaryKeyword: "how to work MVA leads", secondaryKeywords: ["motor vehicle accident leads", "personal injury leads"], contentType: "blog", status: "published", contentFile: "68-work-mva-leads-CONTENT.md", source: "content-brief" },
  { id: 69, slug: "how-to-work-mass-tort-leads", title: "How to Work Mass Tort Leads", pillar: "Industry Strategies", primaryKeyword: "how to work mass tort leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "69-work-mass-tort-leads-CONTENT.md", source: "content-brief" },
  { id: 70, slug: "how-to-work-ssdi-leads", title: "How to Work SSDI Leads", pillar: "Industry Strategies", primaryKeyword: "how to work SSDI leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "70-work-ssdi-leads-CONTENT.md", source: "content-brief" },

  // ── MORE INSURANCE & HOME SERVICES (71-77) ──
  { id: 71, slug: "how-to-work-aca-leads", title: "How to Work ACA Leads", pillar: "Industry Strategies", primaryKeyword: "how to work ACA leads", secondaryKeywords: ["health insurance agent leads", "ACA enrollment leads"], contentType: "blog", status: "published", contentFile: "71-work-aca-leads-CONTENT.md", source: "content-brief" },
  { id: 72, slug: "how-to-work-home-services-leads", title: "How to Work Home Services Leads (Pillar)", pillar: "Industry Strategies", primaryKeyword: "home services leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "72-work-home-services-leads-CONTENT.md", source: "content-brief" },
  { id: 73, slug: "how-to-work-roofing-leads", title: "How to Work Roofing Leads", pillar: "Industry Strategies", primaryKeyword: "how to work roofing leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "73-work-roofing-leads-CONTENT.md", source: "content-brief" },
  { id: 74, slug: "how-to-work-hvac-leads", title: "How to Work HVAC Leads", pillar: "Industry Strategies", primaryKeyword: "how to work HVAC leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "74-work-hvac-leads-CONTENT.md", source: "content-brief" },
  { id: 75, slug: "how-to-work-pest-control-leads", title: "How to Work Pest Control Leads", pillar: "Industry Strategies", primaryKeyword: "how to work pest control leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "75-work-pest-control-leads-CONTENT.md", source: "content-brief" },
  { id: 76, slug: "how-to-work-plumbing-leads", title: "How to Work Plumbing Leads", pillar: "Industry Strategies", primaryKeyword: "how to work plumbing leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "76-work-plumbing-leads-CONTENT.md", source: "content-brief" },
  { id: 77, slug: "how-to-work-window-replacement-leads", title: "How to Work Window Replacement Leads", pillar: "Industry Strategies", primaryKeyword: "window replacement leads", secondaryKeywords: [], contentType: "blog", status: "published", contentFile: "77-work-window-replacement-leads-CONTENT.md", source: "content-brief" },

  // ── DEBT, AI, SCORING (78-81) ──
  { id: 78, slug: "how-to-work-debt-leads", title: "How to Work Debt Leads", pillar: "Industry Strategies", primaryKeyword: "how to work debt leads", secondaryKeywords: ["debt relief leads", "debt consolidation leads"], contentType: "blog", status: "published", contentFile: "78-work-debt-leads-CONTENT.md", source: "content-brief" },
  { id: 79, slug: "ai-sales-stack-lead-followup", title: "Building Your AI Sales Stack", pillar: "CRM Systems", primaryKeyword: "AI sales stack", secondaryKeywords: ["AI tools for leads", "sales technology stack"], contentType: "blog", status: "published", contentFile: "79-ai-sales-stack-CONTENT.md", source: "content-brief" },
  { id: 80, slug: "right-way-to-use-ai-lead-followup", title: "The Right Way to Use AI in Lead Follow-Up", pillar: "CRM Systems", primaryKeyword: "AI lead follow up", secondaryKeywords: ["AI in sales", "AI best practices leads"], contentType: "blog", status: "published", contentFile: "80-right-way-ai-sales-CONTENT.md", source: "content-brief" },
  { id: 81, slug: "ai-lead-scoring-prioritization", title: "AI Lead Scoring for Sales Teams", pillar: "CRM Systems", primaryKeyword: "AI lead scoring", secondaryKeywords: ["lead scoring AI", "AI lead prioritization"], contentType: "blog", status: "published", contentFile: "81-ai-lead-scoring-CONTENT.md", source: "content-brief" },
];

// ═══════════════════════════════════════════════════════════════════
// EDITORIAL CALENDAR (Weekly cron content — items 101-136)
// ═══════════════════════════════════════════════════════════════════

export const EDITORIAL_CALENDAR: MasterContentEntry[] = [
  // ── WEEK 1 (Mar 17-21) — PUBLISHED ──
  { id: 101, slug: "speed-to-lead-response-time-guide", title: "Speed to Lead: Why Your Response Time Is Killing Your Conversion Rate", pillar: "Lead Management", primaryKeyword: "speed to lead", secondaryKeywords: ["lead response time", "how fast to call internet leads"], contentType: "blog", status: "published", week: 1, day: "Mon", publishDate: "2026-03-17", wordCount: "2,500-3,000", competitiveAngle: "Data-backed analysis of response time vs conversion rates with specific benchmarks by industry.", outline: ["The 5-minute rule", "Response time vs contact rate by industry", "Instant lead alerts", "Auto-responder sequences", "First 60 seconds script", "Building speed-to-lead culture"], internalLinks: ["/blog/follow-up-sequence-templates", "/blog/crm-lead-routing"], source: "editorial-calendar" },
  { id: 102, slug: "follow-up-sequence-templates", title: "7 Follow-Up Sequence Templates That Turn Cold Internet Leads Into Appointments", pillar: "Sales Process", primaryKeyword: "lead follow up sequence", secondaryKeywords: ["internet lead follow up", "lead nurture sequence"], contentType: "blog", status: "published", week: 1, day: "Wed", publishDate: "2026-03-19", wordCount: "3,000-3,500", competitiveAngle: "Complete copy-paste sequences with exact timing, scripts, and channel mix.", outline: ["21-touch framework", "48-hour blitz", "Warm drip for aged leads", "Reactivation sequence", "Multi-channel approach", "Insurance sequence", "Mortgage rate-trigger", "Solar savings sequence", "A/B testing"], internalLinks: ["/blog/speed-to-lead-response-time-guide"], source: "editorial-calendar" },
  { id: 103, slug: "crm-setup-guide-internet-leads", title: "CRM Setup Guide: Configure Your System to Convert Internet Leads", pillar: "CRM Systems", primaryKeyword: "crm setup for leads", secondaryKeywords: ["crm for internet leads", "lead management crm"], contentType: "blog", status: "published", week: 1, day: "Fri", publishDate: "2026-03-21", wordCount: "2,500-3,000", source: "editorial-calendar" },

  // ── WEEK 2 (Mar 24-28) — PUBLISHED ──
  { id: 104, slug: "how-to-evaluate-lead-vendors", title: "How to Evaluate Lead Vendors: A Buyer's Checklist", pillar: "Buying Leads", primaryKeyword: "evaluate lead vendors", secondaryKeywords: ["best lead vendors", "lead quality checklist"], contentType: "blog", status: "published", week: 2, day: "Mon", publishDate: "2026-03-24", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 105, slug: "insurance-lead-conversion-strategies", title: "Insurance Lead Conversion: Strategies for Life, Health, and P&C", pillar: "Industry Strategies", primaryKeyword: "insurance lead conversion", secondaryKeywords: ["life insurance leads", "health insurance leads"], contentType: "blog", status: "published", week: 2, day: "Wed", publishDate: "2026-03-26", wordCount: "3,000-3,500", source: "editorial-calendar" },
  { id: 106, slug: "voicemail-scripts-that-get-callbacks", title: "15 Voicemail Scripts That Actually Get Callbacks", pillar: "Sales Process", primaryKeyword: "voicemail scripts for leads", secondaryKeywords: ["sales voicemail scripts", "voicemail drop scripts"], contentType: "blog", status: "published", week: 2, day: "Fri", publishDate: "2026-03-28", wordCount: "2,000-2,500", source: "editorial-calendar" },

  // ── WEEK 3 (Mar 31 - Apr 4) — SCHEDULED ──
  { id: 107, slug: "cost-per-lead-analysis", title: "Cost Per Lead Analysis: How to Calculate Your True Lead Acquisition Cost", pillar: "Buying Leads", primaryKeyword: "cost per lead", secondaryKeywords: ["lead cost analysis", "cost per acquisition"], contentType: "blog", status: "scheduled", week: 3, day: "Mon", publishDate: "2026-03-31", wordCount: "2,500-3,000", outline: ["CPL vs CPA vs CAC", "Hidden costs", "Industry benchmarks", "Tracking spreadsheet", "Quality premium", "Aged vs fresh cost trade-off", "Setting max CPL"], internalLinks: ["/blog/how-to-evaluate-lead-vendors"], source: "editorial-calendar" },
  { id: 108, slug: "text-messaging-compliance-guide", title: "Text Message Lead Follow-Up: Compliance Guide and Best Practices", pillar: "Lead Management", primaryKeyword: "text message leads compliance", secondaryKeywords: ["sms lead follow up", "tcpa compliance leads"], contentType: "blog", status: "scheduled", week: 3, day: "Wed", publishDate: "2026-04-02", wordCount: "2,500-3,000", outline: ["TCPA basics", "Express written consent", "10DLC requirements", "Opt-in/opt-out", "Text templates", "Common mistakes", "SMS + calls + email strategy"], source: "editorial-calendar" },
  { id: 109, slug: "objection-handling-scripts", title: "Objection Handling Scripts: 25 Responses for Common Pushbacks", pillar: "Sales Process", primaryKeyword: "objection handling scripts", secondaryKeywords: ["sales objection responses", "overcoming objections"], contentType: "blog", status: "scheduled", week: 3, day: "Fri", publishDate: "2026-04-04", wordCount: "3,000-3,500", source: "editorial-calendar" },

  // ── WEEK 4 (Apr 7-11) — SCHEDULED ──
  { id: 110, slug: "crm-automation-workflows", title: "10 CRM Automation Workflows Every Lead Buyer Needs", pillar: "CRM Systems", primaryKeyword: "crm automation workflows", secondaryKeywords: ["crm lead automation", "automated lead follow up"], contentType: "blog", status: "scheduled", week: 4, day: "Mon", publishDate: "2026-04-07", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 111, slug: "mortgage-lead-conversion-playbook", title: "Mortgage Lead Conversion: The Complete Playbook for Loan Officers", pillar: "Industry Strategies", primaryKeyword: "mortgage lead conversion", secondaryKeywords: ["mortgage leads", "loan officer lead strategy"], contentType: "blog", status: "scheduled", week: 4, day: "Wed", publishDate: "2026-04-09", wordCount: "3,000-3,500", source: "editorial-calendar" },
  { id: 112, slug: "multi-channel-outreach-strategy", title: "Multi-Channel Lead Outreach: Calls, Texts, Email, and Social", pillar: "Lead Management", primaryKeyword: "multi-channel lead outreach", secondaryKeywords: ["omnichannel lead follow up"], contentType: "blog", status: "scheduled", week: 4, day: "Fri", publishDate: "2026-04-11", wordCount: "2,500-3,000", source: "editorial-calendar" },

  // ── WEEK 5 (Apr 14-18) — BRIEF ──
  { id: 113, slug: "lead-scoring-models", title: "Lead Scoring Models: Prioritize Internet Leads for Maximum ROI", pillar: "CRM Systems", primaryKeyword: "lead scoring model", secondaryKeywords: ["lead scoring system", "lead prioritization"], contentType: "blog", status: "brief", week: 5, day: "Mon", publishDate: "2026-04-14", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 114, slug: "solar-lead-conversion-guide", title: "Solar Lead Conversion: Close More Deals From Internet Solar Leads", pillar: "Industry Strategies", primaryKeyword: "solar lead conversion", secondaryKeywords: ["solar leads", "solar sales leads"], contentType: "blog", status: "brief", week: 5, day: "Wed", publishDate: "2026-04-16", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 115, slug: "lead-quality-metrics", title: "Lead Quality Metrics: 8 KPIs Every Lead Buyer Should Track", pillar: "Buying Leads", primaryKeyword: "lead quality metrics", secondaryKeywords: ["lead kpis", "lead quality assessment"], contentType: "blog", status: "brief", week: 5, day: "Fri", publishDate: "2026-04-18", wordCount: "2,000-2,500", source: "editorial-calendar" },

  // ── WEEK 6 (Apr 21-25) — BRIEF ──
  { id: 116, slug: "appointment-setting-scripts", title: "Appointment Setting Scripts: Internet Lead to Booked Meeting in One Call", pillar: "Sales Process", primaryKeyword: "appointment setting scripts", secondaryKeywords: ["book appointments from leads"], contentType: "blog", status: "brief", week: 6, day: "Mon", publishDate: "2026-04-21", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 117, slug: "crm-integration-checklist", title: "CRM Integration Checklist: Connect Your Lead Tools", pillar: "CRM Systems", primaryKeyword: "crm integration for leads", secondaryKeywords: ["crm integrations", "crm tool stack"], contentType: "blog", status: "brief", week: 6, day: "Wed", publishDate: "2026-04-23", wordCount: "2,000-2,500", source: "editorial-calendar" },
  { id: 118, slug: "home-improvement-lead-strategies", title: "Home Improvement Lead Conversion: Internet Leads to Signed Contracts", pillar: "Industry Strategies", primaryKeyword: "home improvement lead conversion", secondaryKeywords: ["contractor leads"], contentType: "blog", status: "brief", week: 6, day: "Fri", publishDate: "2026-04-25", wordCount: "2,500-3,000", source: "editorial-calendar" },

  // ── WEEK 7 (Apr 28 - May 2) — BRIEF ──
  { id: 119, slug: "aged-leads-buying-guide", title: "Aged Leads Buying Guide: Profit From Leads Other Reps Gave Up On", pillar: "Buying Leads", primaryKeyword: "aged leads buying guide", secondaryKeywords: ["buy aged leads", "working aged leads"], contentType: "blog", status: "brief", week: 7, day: "Mon", publishDate: "2026-04-28", wordCount: "3,000-3,500", source: "editorial-calendar" },
  { id: 120, slug: "pipeline-management-framework", title: "Pipeline Management Framework: Never Lose Track of a Lead", pillar: "Lead Management", primaryKeyword: "lead pipeline management", secondaryKeywords: ["sales pipeline management"], contentType: "blog", status: "brief", week: 7, day: "Wed", publishDate: "2026-04-30", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 121, slug: "closing-techniques-internet-leads", title: "Closing Techniques for Internet Leads: 10 Methods That Work", pillar: "Sales Process", primaryKeyword: "closing techniques for leads", secondaryKeywords: ["phone closing techniques"], contentType: "blog", status: "brief", week: 7, day: "Fri", publishDate: "2026-05-02", wordCount: "2,500-3,000", source: "editorial-calendar" },

  // ── WEEK 8 (May 5-9) — BRIEF ──
  { id: 122, slug: "lead-nurture-email-campaigns", title: "Lead Nurture Email Campaigns: Automated Sequences That Keep Leads Warm", pillar: "Lead Management", primaryKeyword: "lead nurture email", secondaryKeywords: ["email nurture sequence", "drip campaign leads"], contentType: "blog", status: "brief", week: 8, day: "Mon", publishDate: "2026-05-05", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 123, slug: "real-time-vs-aged-leads-comparison", title: "Real-Time vs Aged Leads: Which Is Right for Your Operation?", pillar: "Buying Leads", primaryKeyword: "real-time vs aged leads", secondaryKeywords: ["fresh leads vs aged leads"], contentType: "blog", status: "brief", week: 8, day: "Wed", publishDate: "2026-05-07", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 124, slug: "team-lead-management-scaling", title: "Scaling Your Lead Operation: Solo Agent to 10-Person Team", pillar: "Lead Management", primaryKeyword: "scale lead operation", secondaryKeywords: ["scaling sales team"], contentType: "blog", status: "brief", week: 8, day: "Fri", publishDate: "2026-05-09", wordCount: "3,000-3,500", source: "editorial-calendar" },

  // ── WEEK 9 (May 12-16) — BRIEF ──
  { id: 125, slug: "lead-source-roi-tracking", title: "Lead Source ROI Tracking: Know Which Sources Make You Money", pillar: "Buying Leads", primaryKeyword: "lead source roi tracking", secondaryKeywords: ["track lead roi", "lead attribution"], contentType: "blog", status: "brief", week: 9, day: "Mon", publishDate: "2026-05-12", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 126, slug: "cold-calling-internet-leads", title: "Cold Calling Internet Leads: It's Not Cold When They Filled Out a Form", pillar: "Sales Process", primaryKeyword: "calling internet leads", secondaryKeywords: ["call internet leads", "phone sales leads"], contentType: "blog", status: "brief", week: 9, day: "Wed", publishDate: "2026-05-14", wordCount: "2,000-2,500", source: "editorial-calendar" },
  { id: 127, slug: "lead-recycling-strategies", title: "Lead Recycling: Get More Value From Leads Already in Your CRM", pillar: "Lead Management", primaryKeyword: "lead recycling strategy", secondaryKeywords: ["recycle old leads", "revive dead leads"], contentType: "blog", status: "brief", week: 9, day: "Fri", publishDate: "2026-05-16", wordCount: "2,000-2,500", source: "editorial-calendar" },

  // ── WEEK 10 (May 19-23) — BRIEF ──
  { id: 128, slug: "exclusive-vs-shared-leads", title: "Exclusive vs Shared Internet Leads: Which Delivers Better ROI?", pillar: "Buying Leads", primaryKeyword: "exclusive vs shared leads", secondaryKeywords: ["exclusive leads", "shared leads"], contentType: "blog", status: "brief", week: 10, day: "Mon", publishDate: "2026-05-19", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 129, slug: "daily-lead-working-routine", title: "The Daily Lead Working Routine: A Productivity System", pillar: "Lead Management", primaryKeyword: "daily lead working routine", secondaryKeywords: ["daily sales routine"], contentType: "blog", status: "brief", week: 10, day: "Wed", publishDate: "2026-05-21", wordCount: "2,000-2,500", source: "editorial-calendar" },
  { id: 130, slug: "crm-reporting-dashboards", title: "CRM Reporting Dashboards: Build Views That Drive Conversion", pillar: "CRM Systems", primaryKeyword: "crm reporting dashboards", secondaryKeywords: ["crm dashboard for leads"], contentType: "blog", status: "brief", week: 10, day: "Fri", publishDate: "2026-05-23", wordCount: "2,000-2,500", source: "editorial-calendar" },

  // ── WEEK 11 (May 26-30) — BRIEF ──
  { id: 131, slug: "referral-strategy-internet-leads", title: "Building a Referral Engine From Your Internet Lead Clients", pillar: "Sales Process", primaryKeyword: "referral strategy leads", secondaryKeywords: ["get referrals from clients"], contentType: "blog", status: "brief", week: 11, day: "Mon", publishDate: "2026-05-26", wordCount: "2,000-2,500", source: "editorial-calendar" },
  { id: 132, slug: "lead-vendor-negotiation-tactics", title: "Lead Vendor Negotiation: Better Pricing, Terms, and Quality", pillar: "Buying Leads", primaryKeyword: "negotiate with lead vendors", secondaryKeywords: ["lead vendor pricing"], contentType: "blog", status: "brief", week: 11, day: "Wed", publishDate: "2026-05-28", wordCount: "2,000-2,500", source: "editorial-calendar" },
  { id: 133, slug: "email-deliverability-lead-follow-up", title: "Email Deliverability for Lead Follow-Up: Stop Landing in Spam", pillar: "Lead Management", primaryKeyword: "email deliverability leads", secondaryKeywords: ["email spam filter leads"], contentType: "blog", status: "brief", week: 11, day: "Fri", publishDate: "2026-05-30", wordCount: "2,000-2,500", source: "editorial-calendar" },

  // ── WEEK 12 (Jun 1-5) — BRIEF ──
  { id: 134, slug: "internet-lead-conversion-benchmarks", title: "Internet Lead Conversion Benchmarks: How Do Your Numbers Stack Up?", pillar: "Buying Leads", primaryKeyword: "lead conversion benchmarks", secondaryKeywords: ["lead conversion rates", "industry conversion rates"], contentType: "blog", status: "brief", week: 12, day: "Mon", publishDate: "2026-06-01", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 135, slug: "ai-tools-lead-management", title: "AI Tools for Lead Management: What Actually Works in 2026", pillar: "CRM Systems", primaryKeyword: "ai tools lead management", secondaryKeywords: ["ai for sales leads", "ai crm tools"], contentType: "blog", status: "brief", week: 12, day: "Wed", publishDate: "2026-06-03", wordCount: "2,500-3,000", source: "editorial-calendar" },
  { id: 136, slug: "lead-conversion-mistakes", title: "12 Internet Lead Conversion Mistakes Costing You Sales", pillar: "Sales Process", primaryKeyword: "lead conversion mistakes", secondaryKeywords: ["common lead mistakes", "why leads don't convert"], contentType: "blog", status: "brief", week: 12, day: "Fri", publishDate: "2026-06-05", wordCount: "2,500-3,000", source: "editorial-calendar" },
];

// ═══════════════════════════════════════════════════════════════════
// COMBINED MASTER CALENDAR
// ═══════════════════════════════════════════════════════════════════

export const MASTER_CONTENT_CALENDAR: MasterContentEntry[] = [
  ...CONTENT_BRIEFS,
  ...EDITORIAL_CALENDAR,
];

// ═══════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS (used by the weekly-content cron)
// ═══════════════════════════════════════════════════════════════════

/** Get all items the cron should consider writing next */
export function getUnpublishedItems(): MasterContentEntry[] {
  return MASTER_CONTENT_CALENDAR.filter(
    (item) => item.status !== "published" && item.contentType === "blog"
  );
}

/** Get items with content written but not yet published to Sanity */
export function getContentWrittenItems(): MasterContentEntry[] {
  return MASTER_CONTENT_CALENDAR.filter(
    (item) => item.status === "content-written" && item.contentFile
  );
}

/** Get scheduled items for the cron to write */
export function getScheduledItems(): MasterContentEntry[] {
  return MASTER_CONTENT_CALENDAR.filter(
    (item) => item.status === "scheduled"
  ).sort((a, b) => (a.publishDate || "").localeCompare(b.publishDate || ""));
}

/** Get brief-only items available for the cron to pick from */
export function getBriefItems(): MasterContentEntry[] {
  return MASTER_CONTENT_CALENDAR.filter(
    (item) => item.status === "brief"
  );
}

/** Get all items by pillar */
export function getItemsByPillar(pillar: string): MasterContentEntry[] {
  return MASTER_CONTENT_CALENDAR.filter(
    (item) => item.pillar === pillar
  );
}

/** Summary stats */
export function getCalendarStats() {
  const total = MASTER_CONTENT_CALENDAR.length;
  const published = MASTER_CONTENT_CALENDAR.filter(i => i.status === "published").length;
  const contentWritten = MASTER_CONTENT_CALENDAR.filter(i => i.status === "content-written").length;
  const scheduled = MASTER_CONTENT_CALENDAR.filter(i => i.status === "scheduled").length;
  const brief = MASTER_CONTENT_CALENDAR.filter(i => i.status === "brief").length;
  const idea = MASTER_CONTENT_CALENDAR.filter(i => i.status === "idea").length;
  return { total, published, contentWritten, scheduled, brief, idea };
}
