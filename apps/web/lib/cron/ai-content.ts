import Anthropic from "@anthropic-ai/sdk";
import type { MasterContentEntry } from "@/data/master-content-calendar";
import type {
  ContentPlan,
  WeeklyBrief,
  GeneratedArticle,
  ArticleSection,
} from "./types";
import { parseJsonResponse } from "./parse-json";

function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return new Anthropic({ apiKey });
}

const SYSTEM_CONTEXT = `You are the AI content strategist for HowToWorkLeads (howtoworkleads.com), an SEO-driven education site that teaches sales professionals how to buy, manage, and convert internet leads into revenue.

ICP (Ideal Customer Profile):
- Insurance agents (life, health, P&C, final expense, Medicare)
- Mortgage brokers and loan officers
- Solar sales representatives
- Home improvement contractors and salespeople
- Financial advisors (IUL, retirement planning)
- Personal injury attorneys and legal intake teams
- Debt settlement and tax resolution firms
- Any sales professional who buys and works internet leads

Competitors:
- AgedLeadStore.com — the lead vendor's own content (product-focused, not strategy-focused)
- AgedLeadSales.com — aged-lead specific education (narrower scope, aged leads only)

Content Pillars:
1. LEAD MANAGEMENT — Lead follow-up, contact strategies, pipeline management, speed-to-lead
2. SALES PROCESS — Scripts, objection handling, closing techniques, appointment setting
3. CRM SYSTEMS — Setup, automation, integrations, workflow optimization
4. BUYING LEADS — Vendor evaluation, cost analysis, lead quality assessment, ROI calculation
5. INDUSTRY STRATEGIES — Vertical-specific lead working (insurance, mortgage, solar, home improvement)

Content Rules:
- Rotate pillars so no two consecutive posts use the same pillar
- Every post links to 2+ relevant blog posts and 1+ landing page
- Every post has a unique angle NOT covered on AgedLeadStore.com or AgedLeadSales.com
- All content is authored by Bill Rice with 30+ years of internet lead experience
- Posts are 2,000-3,500 words with practical, actionable advice
- Tone: authoritative but conversational

CRITICAL CONTENT INTEGRITY RULES — NEVER VIOLATE THESE:
- NEVER fabricate personal experiences, anecdotes, or case studies attributed to Bill Rice or any named person
- NEVER write "I did X", "I experienced X", "A client of mine...", "I've seen...", or "In my experience..." followed by invented specifics
- NEVER invent specific dollar amounts, penalties, percentages, or statistics and present them as factual
- You MAY use clearly hypothetical examples ("Let's say you buy 500 internet leads...", "Consider a scenario where...")
- You MAY cite publicly available data WITH source URLs
- You MAY reference Bill's verifiable background: 30+ years, coined "lead management", worked millions of leads
- You MAY use general industry patterns: "Many agents find...", "A common pattern is..."
- When in doubt, frame as hypothetical rather than as personal experience
- Making up stories and presenting them as real experiences is LYING — it destroys credibility

Compliance & Legal Content Rules:
1. FCC 1:1 Consent Rule: The FCC's "one-to-one consent" rule was VACATED by the 11th Circuit Court of Appeals in January 2025 and NEVER took effect. NEVER state or imply this rule is active, in effect, or current law. The correct framing: "The FCC proposed a 1:1 consent rule, but it was vacated by the 11th Circuit Court of Appeals in January 2025 before it could take effect. The multi-company consent model remains legally permissible."
2. DNC Scrubbing Frequency: The legal requirement is to scrub lead lists against the National DNC Registry at least every 31 days. NEVER say "quarterly" or any other frequency — 31 days is the law.
3. DNC Exemption Windows: Inquiry-based DNC exemption expires 3 months after the consumer's inquiry. Transaction-based exemption expires 18 months after the last transaction.
4. TCPA Penalties: Standard violations: $500 per call/text. Willful violations: $1,500 per call/text. Federal DNC violations: up to $43,280 per call. Average class action settlement: $6.6 million.
5. Consent Tiers: Prior express consent is sufficient for manual dialing. Prior express WRITTEN consent is required for auto-dialers (ATDS), prerecorded voice, AI-generated voice, and marketing text messages.
6. Authoritative Sources: When writing about TCPA, DNC, or lead generation compliance, cite these sources: Henson Legal (henson-legal.com), Mac Murray & Shuster LLP (mslawgroup.com), DNC.com (Contact Center Compliance).
7. Disclaimer: Every article that discusses legal or compliance topics MUST include this disclaimer: "This is educational guidance, not legal advice. Compliance requirements vary by state and change frequently. Consult a licensed attorney for legal questions specific to your situation."
8. No fabricated case law or settlement amounts. Only reference real cases. If unsure about a specific case or amount, do not include it.`;

export async function analyzeAndPlan(
  existingPosts: { slug: string; title: string }[],
  editorialCalendar: MasterContentEntry[],
  weekDates: { monday: string; wednesday: string; friday: string }
): Promise<ContentPlan> {
  const existingSlugs = new Set(existingPosts.map((p) => p.slug));
  const unpublishedBriefs = editorialCalendar.filter(
    (b) => b.status !== "published" && !existingSlugs.has(b.slug)
  );

  const publishedSlugs = editorialCalendar
    .filter((b) => b.status === "published" || existingSlugs.has(b.slug))
    .map((b) => b.slug);

  const prompt = `Analyze the current state of our content strategy and create a plan for this week.

## Current Content State
- Published posts (${existingPosts.length} total). Recent titles: ${existingPosts.slice(-40).map((p) => `"${p.title}"`).join("; ")}
- Editorial calendar briefs not yet published (${unpublishedBriefs.length}): ${unpublishedBriefs.map((b) => `"${b.title}" [${b.pillar}]`).join("; ")}
- Already published from calendar: ${publishedSlugs.join(", ")}

## CRITICAL: Avoid Duplicate Content
You MUST NOT propose any brief whose title substantially overlaps with an existing post above. "Substantial overlap" means covering the same primary topic, even with different wording. If your first instinct is a topic near a published one, pick a different angle, a sub-topic, or a narrower case study. Published posts listed above are OFF-LIMITS as topics.

## This Week's Publishing Dates
- Monday: ${weekDates.monday}
- Wednesday: ${weekDates.wednesday}
- Friday: ${weekDates.friday}

## Your Tasks
1. **SEO Strategy Review**: Assess current content gaps and strengths based on our published content vs the full editorial plan.
2. **Competitive Research**: Identify keyword opportunities, trending topics, or new angles in the internet lead space that we haven't covered. Think about what insurance agents, mortgage brokers, solar reps, and home improvement salespeople are searching for RIGHT NOW.
3. **Content Plan**: Select 3 content briefs for this week. Prefer existing unpublished briefs from the editorial calendar when they're timely and relevant. Create new briefs only if you identify a compelling opportunity that outranks existing options.

Respond with valid JSON matching this structure exactly:
{
  "analysis": {
    "strategyReview": "2-3 paragraph assessment of current content strategy strengths and gaps",
    "competitiveInsights": "2-3 paragraph competitive analysis with specific keyword and topic opportunities",
    "newOpportunities": ["opportunity 1", "opportunity 2", ...],
    "trendingTopics": ["topic 1", "topic 2", ...],
    "recommendedUpdates": ["update 1", "update 2", ...]
  },
  "briefs": [
    {
      "day": "Mon",
      "publishDate": "${weekDates.monday}",
      "slug": "slug-here",
      "title": "Title Here",
      "pillar": "Pillar Name",
      "primaryKeyword": "keyword",
      "secondaryKeywords": ["kw1", "kw2", "kw3"],
      "targetCategories": ["lead-management", "sales-process"],
      "wordCount": "2,500-3,000",
      "competitiveAngle": "What makes this unique vs competitors",
      "outline": ["Section 1 topic", "Section 2 topic", ...],
      "internalLinks": ["/blog/related-post", "/guides/landing-page"]
    },
    { "day": "Wed", ... },
    { "day": "Fri", ... }
  ],
  "calendarNotes": "Summary of calendar decisions and reasoning"
}`;

  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: SYSTEM_CONTEXT,
    messages: [
      { role: "user", content: prompt + "\n\nRespond ONLY with valid JSON, no other text." },
    ],
    temperature: 0.7,
  });

  const content = response.content[0]?.type === "text" ? response.content[0].text : null;
  if (!content) throw new Error("No response from AI for content planning");

  return parseJsonResponse<ContentPlan>(content);
}

export async function writeArticle(
  brief: WeeklyBrief
): Promise<GeneratedArticle> {
  const prompt = `Write a complete blog post based on this content brief.

## Brief
- Title: ${brief.title}
- Primary Keyword: ${brief.primaryKeyword}
- Secondary Keywords: ${brief.secondaryKeywords.join(", ")}
- Pillar: ${brief.pillar}
- Target Word Count: ${brief.wordCount}
- Competitive Angle: ${brief.competitiveAngle}
- Outline: ${brief.outline.map((s, i) => `${i + 1}. ${s}`).join("\n")}
- Internal Links to Include: ${brief.internalLinks.join(", ")}

## Writing Requirements
- Write as Bill Rice, 20+ year internet lead industry veteran
- 2,000-3,500 words of substantive, actionable content
- Use actionable frameworks, publicly verifiable data, and clearly hypothetical examples — never fabricate personal anecdotes or case studies
- Naturally incorporate the primary keyword 3-5 times and secondary keywords 1-2 times each
- Reference internal links naturally within the content
- Include practical templates, scripts, checklists, or frameworks the reader can use immediately
- Tone: authoritative, direct, conversational — like an experienced mentor

Respond with valid JSON matching this structure:
{
  "excerpt": "2-3 sentence compelling excerpt for the post listing (under 200 chars)",
  "seoTitle": "SEO title under 60 characters with primary keyword",
  "seoDescription": "Meta description under 160 characters with primary keyword",
  "contentType": "pillar" or "cluster",
  "sections": [
    { "text": "Opening paragraph text...", "style": "normal" },
    { "text": "Section Heading", "style": "h2" },
    { "text": "Subsection heading", "style": "h3" },
    { "text": "Body paragraph text...", "style": "normal" },
    ...
  ]
}

Write the FULL article with all sections. Each "sections" entry is one paragraph or heading. Use "h2" for main sections, "h3" for subsections, and "normal" for body paragraphs. Include at least 15-25 sections for a complete article.`;

  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8192,
    system: `${SYSTEM_CONTEXT}\n\nYou are now writing as Bill Rice. Write with authority and specificity. Use clearly hypothetical examples, publicly sourced data with citations, and actionable frameworks. Never fabricate personal experiences or case studies. Every paragraph should teach something actionable.`,
    messages: [
      { role: "user", content: prompt + "\n\nRespond ONLY with valid JSON, no other text." },
    ],
    temperature: 0.8,
  });

  const content = response.content[0]?.type === "text" ? response.content[0].text : null;
  if (!content) throw new Error(`No response from AI for article: ${brief.title}`);

  const parsed = parseJsonResponse<{
    excerpt: string;
    seoTitle: string;
    seoDescription: string;
    contentType: "pillar" | "cluster";
    sections: ArticleSection[];
  }>(content);

  return {
    brief,
    ...parsed,
  };
}

export function sectionsToPortableText(
  sections: ArticleSection[]
): Record<string, unknown>[] {
  return sections.map((section) => ({
    _type: "block",
    _key: randomKey(),
    style: section.style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: randomKey(),
        text: section.text,
        marks: [],
      },
    ],
  }));
}

function randomKey(): string {
  return Math.random().toString(36).slice(2, 10);
}
