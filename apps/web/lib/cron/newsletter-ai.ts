import Anthropic from "@anthropic-ai/sdk";
import type { NewsletterPlan } from "@/data/newsletter-calendar";

function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return new Anthropic({ apiKey });
}

export interface RecentPost {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  pillar?: string;
}

export interface NewsletterContent {
  subject: string;
  previewText: string;
  personalIntro: string;
  featuredArticle: {
    title: string;
    slug: string;
    spotlight: string;
  };
  quickTips: {
    title: string;
    body: string;
  }[];
  industryInsight: {
    headline: string;
    body: string;
  };
  weeklyDigest: {
    title: string;
    slug: string;
    oneLiner: string;
  }[];
  closingNote: string;
  ctaText: string;
  ctaUrl: string;
}

const NEWSLETTER_SYSTEM = `You are Bill Rice, a 20+ year veteran of internet lead generation and conversion, and the author of the How To Work Leads weekly newsletter. You write with authority, warmth, and specificity.

Newsletter Context:
- Audience: insurance agents, mortgage brokers, solar reps, home improvement salespeople, financial advisors, PI attorneys, and other sales professionals who buy and work internet leads
- Goal: deliver weekly value that keeps readers engaged, drives traffic to howtoworkleads.com blog content, and positions HowToWorkLeads as the go-to resource for internet lead conversion strategies
- Tone: direct, practical, conversational — never salesy or generic
- Every tip should be actionable with specific frameworks, scripts, or publicly verifiable data points

CRITICAL CONTENT INTEGRITY RULES — NEVER VIOLATE THESE:
- NEVER fabricate personal experiences, anecdotes, or case studies attributed to Bill Rice or any named person
- NEVER write "I did X", "I experienced X", "A client of mine...", "I've seen...", or "In my experience..." followed by invented specifics
- NEVER invent specific dollar amounts, penalties, percentages, or statistics and present them as factual
- You MAY use clearly hypothetical examples ("Let's say you buy 500 leads...", "Consider a scenario where...")
- You MAY cite publicly available data WITH source URLs
- You MAY reference Bill's verifiable background: 20+ years, coined "lead management", worked millions of leads
- You MAY use general industry patterns: "Many agents find...", "A common pattern is..."
- When in doubt, frame as hypothetical rather than as personal experience
- Making up stories and presenting them as real experiences is LYING — it destroys credibility

Compliance Guardrails:
- The FCC's "one-to-one consent" rule was VACATED by the 11th Circuit Court of Appeals in January 2025 and NEVER took effect. NEVER state or imply it is active or current law. The multi-company consent model remains legally permissible.
- DNC scrubbing is required at least every 31 days. NEVER say "quarterly" or any other frequency — 31 days is the law.
- No fabricated case law, settlement amounts, or penalty figures. If unsure, do not include it.`;

export async function generateNewsletterContent(
  plan: NewsletterPlan | null,
  recentPosts: RecentPost[],
  siteUrl: string,
  weekLabel: string
): Promise<NewsletterContent> {
  const client = getAnthropicClient();

  const postsContext = recentPosts
    .map(
      (p) =>
        `- "${p.title}" (${p.publishedAt}) — ${p.excerpt} [slug: ${p.slug}]`
    )
    .join("\n");

  const planContext = plan
    ? `
## Newsletter Calendar Plan for This Week
- Theme: ${plan.theme}
- Focus Vertical: ${plan.focusVertical}
- Planned Exclusive Tip Topics: ${plan.exclusiveTipTopics.join("; ")}
${plan.specialHook ? `- Special Hook: ${plan.specialHook}` : ""}

Follow this plan as a guide, but feel free to adjust if the blog content this week suggests a stronger angle.`
    : `
## No Pre-Planned Newsletter for This Week
Research what's most relevant for our audience right now and create a compelling theme. Consider seasonal factors, industry trends, or timely topics.`;

  const prompt = `Write the content for this week's How To Work Leads newsletter.

${planContext}

## This Week's Blog Posts (to feature and digest)
${postsContext || "No blog posts published this week yet — focus on exclusive content and evergreen tips."}

## Site URL
${siteUrl}

## Week Of
${weekLabel}

## Requirements
1. Subject line: compelling, specific, under 60 characters — avoid spam triggers
2. Preview text: the snippet shown in inbox previews, under 90 characters
3. Personal intro: 2-3 short paragraphs from Bill, referencing the theme and setting up the newsletter. Be specific about what happened this week or what readers should focus on.
4. Featured article: pick the BEST blog post from this week's content. Write a 2-3 sentence spotlight that makes readers want to click.
5. Quick tips: 3 exclusive, actionable tips NOT published on the blog. Each should be self-contained and immediately useful. Include specific numbers, scripts, or frameworks.
6. Industry insight: a timely data point, trend, or observation about the internet lead market
7. Weekly digest: one-line summaries for each blog post published this week
8. Closing note: 1-2 sentence personal sign-off
9. CTA: text for the main call-to-action button (drives to howtoworkleads.com guides or landing pages)

Respond with valid JSON:
{
  "subject": "Subject line here",
  "previewText": "Preview text here",
  "personalIntro": "Multi-paragraph intro with line breaks as \\n\\n",
  "featuredArticle": {
    "title": "Post Title",
    "slug": "post-slug",
    "spotlight": "2-3 sentence spotlight text"
  },
  "quickTips": [
    { "title": "Short tip title", "body": "2-4 sentence actionable tip" },
    { "title": "...", "body": "..." },
    { "title": "...", "body": "..." }
  ],
  "industryInsight": {
    "headline": "Short headline",
    "body": "2-3 sentence insight with a specific data point or trend"
  },
  "weeklyDigest": [
    { "title": "Post Title", "slug": "post-slug", "oneLiner": "Brief summary" }
  ],
  "closingNote": "Personal sign-off",
  "ctaText": "Button text",
  "ctaUrl": "https://www.howtoworkleads.com/guides?utm_source=newsletter&utm_medium=email&utm_campaign=weekly&utm_content=${weekLabel}"
}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: NEWSLETTER_SYSTEM,
    messages: [
      { role: "user", content: prompt + "\n\nRespond ONLY with valid JSON, no other text." },
    ],
    temperature: 0.8,
  });

  const content = response.content[0]?.type === "text" ? response.content[0].text : null;
  if (!content) throw new Error("No response from AI for newsletter generation");

  return JSON.parse(content) as NewsletterContent;
}
