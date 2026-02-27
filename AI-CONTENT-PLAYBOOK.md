# AI-Powered SEO Content Playbook

**Proven process for building a content engine using AI + Sanity CMS + Next.js**

**Origin:** HowToWorkLeads.com (30 articles published in ~3 weeks, Feb 2026)
**Author:** Bill Rice, Kaleidico
**Purpose:** Repeatable system for deploying to client engagements (Defy Mortgage, Mortgage Pipeline, etc.)

---

## What This Playbook Covers

This documents the end-to-end process for using AI (Claude) to plan, research, write, and publish SEO-optimized content at scale. The system produced 30 published articles for HowToWorkLeads.com — a volume that would take a traditional content team 6-12 months — in approximately 3 weeks.

**Results (HowToWorkLeads.com):**
- 30 articles published (19 blog posts, 6 landing pages, 3 pillar upgrades, 2 interactive tools)
- Each article 2,500-4,000+ words, fully optimized
- Complete with structured data (JSON-LD), FAQ schema, comparison tables
- Featured images sourced and uploaded
- Internal linking architecture built across all content
- llms.txt and llms-full.txt for AI crawler optimization

---

## The Tech Stack

| Layer | Tool | Role |
|-------|------|------|
| AI Writer | Claude (Anthropic) | Research, content briefs, full article drafting, CMS operations |
| CMS | Sanity.io | Headless CMS — structured content, Portable Text, image CDN |
| Frontend | Next.js 14 (App Router) | SSR/ISR rendering, SEO-optimized pages, automatic sitemap |
| Styling | Tailwind CSS | Responsive design with brand theming |
| Images | Unsplash API | High-quality stock photos for featured images |
| Hosting | Vercel | Auto-deploy on git push, preview deploys, ISR revalidation |
| Monorepo | Turborepo | Manages web app + Sanity Studio in one repo |
| Markdown→CMS | `md-to-sanity.mjs` | Custom script converting markdown to Sanity Portable Text |

### Why This Stack

- **Sanity + Next.js** = fast, SEO-friendly pages with structured content that Claude can read and write programmatically
- **ISR (60-second revalidation)** = publish in CMS, live on site within a minute, no manual deploys
- **Portable Text** = rich content (headings, lists, links, tables, images) stored as structured JSON, not HTML blobs
- **Claude + MCP tools** = AI can create drafts, patch metadata, upload images, and publish — all from conversation

---

## Phase 0: Foundation (One-Time Setup)

Before content production begins, you need the site infrastructure in place.

### 0.1 Site Architecture

Build the Next.js + Sanity application with:

- **Document types in Sanity:**
  - `blogPost` — time-stamped articles (how-to guides, comparisons, data pieces)
  - `landingPage` — evergreen buying guides and educational content
  - `categoryPage` — pillar/hub pages that aggregate related content
  - `author` — author profiles for E-E-A-T signals

- **URL structure:**
  ```
  /                           # Homepage
  /[category]/                # Category hub (pillar page)
  /[category]/[slug]/         # Landing pages
  /blog/                      # Blog index
  /blog/[slug]/               # Blog posts
  /tools/[slug]/              # Interactive tools
  ```

- **SEO infrastructure:**
  - Dynamic sitemap generation (`sitemap.ts`)
  - Robots.txt with AI crawler permissions (`robots.ts`)
  - JSON-LD structured data components (Article, FAQ, HowTo, Breadcrumb, WebPage, Organization)
  - `llms.txt` and `llms-full.txt` route handlers for AI systems
  - Meta tags via Next.js Metadata API

### 0.2 Sanity Schema Design

Each content document needs these fields for the AI workflow:

```
- title (string)
- slug (slug)
- content (Portable Text / array of blocks)
- seoTitle (string)
- seoDescription (text)
- primaryKeyword (string)
- secondaryKeywords (array of strings)
- mainImage (image with alt text)
- author (reference → author)
- categories (array of references → categoryPage)
- publishedAt (datetime)
- updatedAt (datetime)
- excerpt (text)
- tableOfContents (boolean)
```

### 0.3 Content Conversion Script

The `md-to-sanity.mjs` script is critical infrastructure. It converts markdown files to Sanity Portable Text blocks and patches them directly to a document via the Sanity HTTP API.

**Why it exists:** Sanity's MCP `create_documents_from_markdown` tool truncates at ~50 blocks. Long articles (2,500+ words) need the script for reliable import.

**What it handles:**
- Headings (H2, H3)
- Bold, italic, links (inline formatting)
- Bullet and numbered lists
- Blockquotes
- Paragraph text

**What it skips (handled separately):**
- Pipe tables → inserted as `comparisonTable` objects via API
- Images → uploaded and patched via Sanity Assets API
- FAQ sections → structured as native FAQ schema objects

**Usage:**
```bash
node scripts/md-to-sanity.mjs content-briefs/01-aged-vs-fresh-CONTENT.md bf4d6d3d-8a68-4b8a-87b3-e4d750fbbd36
```

---

## Phase 1: SEO Strategy & Content Planning

### 1.1 Site Audit

Before writing anything, audit the current state:

- Total indexed pages (run `site:domain.com` in Google)
- Existing content inventory (what topics are covered, what's thin)
- Technical SEO baseline (Lighthouse scores, Core Web Vitals)
- Competitor content analysis (who ranks for your target keywords, what they cover)

**Output:** `SEO-GROWTH-STRATEGY.md` — a comprehensive strategy doc covering:
- Current state analysis
- Competitive landscape and content gaps
- Strategic pillars (what categories of content to build)
- Phased content plan (30 pieces across 3 phases)
- Internal linking architecture rules
- Link building strategy
- Success metrics and milestones

### 1.2 Content Brief Creation

For each planned article, create a structured brief in `/content-briefs/`:

**Brief template:**
```markdown
# Content Brief: [Title]

## Target
- Primary Keyword: [keyword]
- Secondary Keywords: [list]
- Search Intent: Informational / Commercial / Transactional
- Target Word Count: [range]
- Content Type: Blog Post / Landing Page / Tool / Pillar Upgrade

## Competitive Analysis
- Top 3 ranking pages for primary keyword
  - What they cover, word count, strengths, weaknesses
- Content gap (what they miss that we should cover)

## Outline
- H1: [title]
- H2: [sections with H3 subsections]

## Required Elements
- FAQ section (3-5 questions) with FAQ schema
- CTAs (affiliate, strategy call, newsletter, free guide)
- Internal links to [3-5 related pages]
- External links to [1-2 authoritative sources]
- Meta title and description drafts

## Writing Notes
- Tone, angle, unique data to include
```

**Naming convention:**
- `XX-topic-slug.md` — the brief
- `XX-topic-slug-CONTENT.md` — the written article

### 1.3 Content Brief Index

Maintain a `README.md` in the content-briefs directory tracking status:

| Status | Meaning |
|--------|---------|
| Not Started | Brief written, content not yet created |
| In Progress | Content being written |
| Content Written | Article drafted, not yet in CMS |
| Published | Live on site |

---

## Phase 2: AI Content Production (Per Article)

This is the core loop. Each article follows 7 steps.

### Step 1: Write Content

**Input:** Content brief (`XX-topic.md`)
**Output:** Full article (`XX-topic-CONTENT.md`)

Claude reads the brief and writes a complete article:

- Follows the outline structure (H1 → H2 → H3)
- Matches tone: conversational, authoritative, uses "you", actionable
- Includes comparison data with real numbers (not vague claims)
- Writes FAQ section with 3-5 questions
- Adds internal link anchor text naturally within body copy
- Includes a metadata header block for CMS fields:

```markdown
> **Sanity CMS Fields**
> - **Slug:** `topic-slug`
> - **SEO Title:** `Title with Keyword (2026)`
> - **Meta Description:** `150-160 char description with keyword and CTA.`
> - **Excerpt:** `2-3 sentence summary for cards and social.`
> - **Category:** [Category Name]
```

**Quality standards:**
- 2,500-4,000 words for blog posts
- Every H2 section has substantive content (not just 2-3 sentences)
- Real data points and benchmarks cited
- No filler — every paragraph adds value
- Actionable takeaways throughout

### Step 2: Create Draft in Sanity

**Method A (preferred for long articles):** Two-step process

1. Create a minimal draft via Sanity MCP:
```
Use create_documents_from_json with:
- _type: "blogPost"
- title: "Article Title"
- slug: { current: "article-slug" }
```

2. Patch content using the script:
```bash
node scripts/md-to-sanity.mjs content-briefs/XX-topic-CONTENT.md [document-id]
```

**Method B (for shorter content <50 blocks):** Direct MCP
```
Use create_documents_from_markdown with the full markdown content
```

### Step 3: Patch Metadata

Use Sanity MCP `patch_document_from_json` to set:

```json
{
  "slug": { "current": "article-slug" },
  "seoTitle": "SEO Title with Primary Keyword (2026)",
  "seoDescription": "150-160 char description...",
  "primaryKeyword": "primary keyword phrase",
  "secondaryKeywords": ["keyword 2", "keyword 3"],
  "excerpt": "2-3 sentence summary...",
  "publishedAt": "2026-02-17T12:00:00Z",
  "updatedAt": "2026-02-17T12:00:00Z",
  "author": { "_type": "reference", "_ref": "author-doc-id" },
  "categories": [{ "_type": "reference", "_ref": "category-doc-id" }]
}
```

### Step 4: Select & Upload Featured Image

Use the Unsplash API for high-quality, royalty-free images:

```bash
# 1. Search for relevant image
curl -s "https://api.unsplash.com/search/photos?query=SEARCH_TERMS&per_page=5&orientation=landscape&client_id=ACCESS_KEY"

# 2. Trigger download tracking (required by Unsplash API guidelines)
curl -s "https://api.unsplash.com/photos/PHOTO_ID/download?client_id=ACCESS_KEY"

# 3. Download at OG image dimensions (1200x630)
curl -s -L "https://images.unsplash.com/photo-ID?w=1200&h=630&fit=crop&fm=jpg&q=85" -o /tmp/article-image.jpg

# 4. Upload to Sanity CDN
curl -s -X POST "https://PROJECT.api.sanity.io/v2024-01-01/assets/images/DATASET?filename=SLUG.jpg" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: image/jpeg" \
  --data-binary @/tmp/article-image.jpg

# 5. Patch document with image reference
# (use the asset ID returned from step 4)
```

### Step 5: Insert Comparison Tables

Markdown pipe tables don't import into Sanity's Portable Text. Insert them as `comparisonTable` objects via HTTP API:

```bash
# Write JSON payload to file (avoids bash escaping issues)
# Use Sanity HTTP API with insert operation:
# insert after content[_key=="LAST_BLOCK_KEY"]
```

**comparisonTable structure:**
```json
{
  "_type": "comparisonTable",
  "_key": "unique-key",
  "title": "Table Title",
  "headers": ["Column 1", "Column 2", "Column 3"],
  "rows": [
    { "_key": "row1", "cells": ["data", "data", "data"] }
  ]
}
```

### Step 6: QC & Fix Missing Content

After import, verify:

- `count(content)` matches expected block count
- All H2/H3 sections present
- No truncation (common with long articles + tables)
- Links render correctly
- FAQ section intact

If content was truncated, use HTTP API with `insert after content[_key=="LAST_KEY"]` to append remaining blocks.

### Step 7: Publish

```
Use publish_documents MCP tool with document IDs (without "drafts." prefix)
```

The page goes live within 60 seconds (ISR revalidation).

---

## Phase 3: Post-Publish Optimization

### 3.1 Internal Linking Audit

After each batch of articles, audit internal links:

**Rules:**
- Every buying guide links to: pillar page, corresponding "how to work" post, 2+ related guides, lead order page
- Every "how to work" post links to: pillar page, specific buying guide, scripts post, cadence post, CRM guide
- Every scripts/templates post links to: all vertical guides, cadence post, buying guides
- Pillar pages link to: every child page, key blog posts, other pillar pages

**Anchor text:** Keyword-rich, varied, placed naturally in body content (not just "related articles" sections).

### 3.2 Google Search Console Submission

After publishing, submit new URLs to GSC for faster indexing:
```bash
# Via GSC MCP or manual submission in Search Console
```

### 3.3 Update llms.txt

When adding significant pillar content, update the `/llms.txt` and `/llms-full.txt` route handlers to include new pages.

### 3.4 Promotion

- Share on LinkedIn (matches daily content rhythm)
- Mention in The Lead Brief newsletter where relevant
- Cross-link from partner sites (AgedLeadStore, etc.)

---

## Adapting This Playbook for Clients

### What Changes Per Client

| Element | HowToWorkLeads | Client Adaptation |
|---------|---------------|-------------------|
| Domain/site | howtoworkleads.com | Client's domain |
| Sanity project | e9k38j42 | New Sanity project per client |
| Content verticals | Aged leads, insurance, mortgage | Client-specific topics |
| Author | Bill Rice | Client SME or ghostwritten |
| Affiliate CTAs | AgedLeadStore | Client's conversion goals |
| Brand styling | Yellow/dark theme | Client's brand guide |
| Image strategy | Unsplash stock | Client photos + Unsplash |

### What Stays the Same

- **The 7-step per-article workflow** (write → draft → metadata → image → tables → QC → publish)
- **Content brief template** (keyword targets, competitive analysis, outline, required elements)
- **Phased content strategy** (foundation → depth → authority)
- **Internal linking architecture** (hub-and-spoke model)
- **Technical SEO infrastructure** (sitemap, robots, JSON-LD, llms.txt)
- **The md-to-sanity script** (works with any Sanity project — just change project ID + token)

### Client Deployment Checklist

1. **Set up Next.js + Sanity site** (fork howtoworkleads repo as template)
2. **Configure Sanity project** (new project ID, dataset, deploy schema)
3. **Run SEO audit** of client's current content state
4. **Build SEO growth strategy** with phased content plan
5. **Write content briefs** (30-piece batches work well)
6. **Execute the 7-step loop** for each article
7. **Deploy to Vercel** with client's domain
8. **Monitor GSC** for indexing and ranking signals

### Estimated Timeline

| Phase | Duration | Output |
|-------|----------|--------|
| Site setup (if new build) | 1-2 weeks | Next.js + Sanity site live |
| SEO strategy + briefs | 2-3 days | Strategy doc + 30 briefs |
| Phase 1 content (10 articles) | 1 week | 10 published articles |
| Phase 2 content (10 articles) | 1 week | 20 total published |
| Phase 3 content (10 articles) | 1 week | 30 total published |
| **Total (new site)** | **~4-5 weeks** | **Full site + 30 articles** |
| **Total (existing site)** | **~3 weeks** | **30 articles added** |

---

## Key Lessons Learned

### What Works

1. **Brief-first workflow.** Writing without a brief leads to unfocused content. The brief (keyword, competitive analysis, outline, required elements) keeps every article targeted.

2. **Batch processing.** Write 10 articles, then publish 10 — faster than one-at-a-time because you build momentum and context.

3. **Script over MCP for long content.** The `md-to-sanity.mjs` script handles any article length reliably. The MCP markdown tool truncates at ~50 blocks.

4. **Separate the writing from the CMS operations.** Write content as clean markdown files first. Import to CMS second. This keeps the content portable and versionable.

5. **Comparison tables as structured data.** Using Sanity's `comparisonTable` object type (not inline HTML) means tables render consistently and are queryable.

6. **FAQ sections on everything.** FAQ schema drives featured snippets. Include 3-5 questions on every article.

7. **AI-crawler optimization pays off early.** `llms.txt`, explicit bot permissions in robots.txt, and `SpeakableSpecification` schema position content for AI answer engines (ChatGPT, Perplexity, etc.).

### Common Pitfalls

1. **Markdown tables won't import.** Always plan to insert comparison tables separately via API.

2. **Image asset references.** Always check `.asset` exists before calling `urlForImage()` — content imported from markdown may have `alt` text but no image asset.

3. **MCP truncation.** Long articles (100+ Portable Text blocks) truncate via `create_documents_from_markdown`. Always use the script.

4. **Publish step is explicit.** Creating a document in Sanity creates a *draft*. You must explicitly publish for it to appear on the live site.

5. **ISR cache.** Changes take up to 60 seconds to appear on the live site after publishing. Don't panic if the page doesn't update immediately.

---

## File Reference

| File | Location | Purpose |
|------|----------|---------|
| SEO Growth Strategy | `SEO-GROWTH-STRATEGY.md` | Master strategy doc — audit, competitors, content plan, metrics |
| Content Briefs Index | `content-briefs/README.md` | Status tracker for all 30 briefs |
| Content Briefs | `content-briefs/XX-topic.md` | Individual article specifications |
| Written Content | `content-briefs/XX-topic-CONTENT.md` | Completed article drafts |
| MD→Sanity Script | `scripts/md-to-sanity.mjs` | Converts markdown to Portable Text + patches Sanity |
| GROQ Queries | `apps/web/lib/sanity/queries.ts` | All content queries for the frontend |
| Sanity Schemas | `apps/studio/schemas/` | Content type definitions (documents + objects) |
| SEO Components | `apps/web/components/seo/JsonLd.tsx` | JSON-LD structured data components |
| Publishing Workflow | Memory: `howtoworkleads-publishing.md` | Detailed per-article publishing steps + document IDs |
| Project CLAUDE.md | `CLAUDE.md` | Full tech stack reference for dev sessions |
| SEO/LLM Optimization | `SEO-LLM-OPTIMIZATION-PLAN.md` | Technical SEO + AI optimization details |
| This Playbook | `AI-CONTENT-PLAYBOOK.md` | You're reading it |

---

*This playbook is a living document. Update as the process evolves and new client deployments reveal improvements.*
