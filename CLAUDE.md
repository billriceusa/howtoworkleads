# CLAUDE.md - AI Assistant Guide for HowToWorkLeads

## Project Overview

**HowToWorkLeads.com** is an SEO-optimized content website designed to help sales professionals improve their conversion rates when working internet leads. The platform provides comprehensive guides, best practices, and resources for lead management, sales processes, CRM systems, and lead purchasing strategies.

**Live URL:** https://howtoworkleads.com

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | Next.js (App Router) | 14.2.15 |
| UI Framework | React | 18.3.1 |
| Styling | Tailwind CSS | 3.3.6 |
| CMS | Sanity.io | 6.21.0 |
| Email Service | Resend | 6.5.2 |
| Monorepo | Turborepo | 1.11.0 |
| Deployment | Vercel | - |

## Project Structure

```
howtoworkleads/
├── apps/
│   ├── web/                    # Next.js frontend application
│   │   ├── app/                # App Router pages
│   │   │   ├── [category]/     # Dynamic category routes
│   │   │   │   └── [slug]/     # Landing page routes
│   │   │   ├── api/            # API routes (newsletter, lead-order)
│   │   │   ├── blog/           # Blog section
│   │   │   ├── llms.txt/       # LLM-friendly site summary (route handler)
│   │   │   ├── llms-full.txt/  # Full content for AI systems
│   │   │   ├── robots.ts       # Robots.txt configuration
│   │   │   ├── sitemap.ts      # Dynamic sitemap generation
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Homepage
│   │   ├── components/
│   │   │   ├── analytics/      # Google Analytics components
│   │   │   ├── content/        # Content display components
│   │   │   ├── layout/         # Header, Footer, Breadcrumbs
│   │   │   ├── seo/            # JSON-LD structured data components
│   │   │   └── ui/             # Base UI components (Button, Card, etc.)
│   │   └── lib/
│   │       ├── sanity/         # Sanity client, queries, image utilities
│   │       └── utils.ts        # Helper functions
│   │
│   └── studio/                 # Sanity Studio CMS
│       ├── schemas/
│       │   ├── documents/      # Content types (landingPage, blogPost, etc.)
│       │   └── objects/        # Reusable content blocks
│       └── structure/          # Desk structure configuration
│
├── packages/
│   └── shared/                 # Shared TypeScript types
│       └── src/
│           ├── types.ts        # Content and component type definitions
│           └── constants.ts    # Shared constants
│
├── PRD.md                      # Product Requirements Document
├── SEO-LLM-OPTIMIZATION-PLAN.md # SEO and AI optimization strategy
├── turbo.json                  # Turborepo configuration
└── package.json                # Root monorepo configuration
```

## Development Commands

```bash
# Install dependencies
npm install

# Development
npm run dev           # Run all apps (web + studio)
npm run dev:web       # Run only Next.js web app
npm run dev:studio    # Run only Sanity Studio

# Building
npm run build         # Production build
npm run lint          # ESLint check
npm run type-check    # TypeScript validation

# Utilities
npm run format        # Format code with Prettier
npm run clean         # Remove build artifacts and node_modules
```

## Environment Variables

### Web App (`apps/web/.env.local`)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=https://howtoworkleads.com
RESEND_API_KEY=your-resend-api-key
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga4-id
```

### Sanity Studio (`apps/studio/.env.local`)

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

## Content Architecture

### URL Structure

```
/                           # Homepage
├── /lead-management/       # Category hub page
│   └── /[slug]/           # Landing pages (articles)
├── /sales-process/        # Category hub page
│   └── /[slug]/           # Landing pages
├── /crm-systems/          # Category hub page
│   └── /[slug]/           # Landing pages
├── /buying-leads/         # Category hub page
│   └── /[slug]/           # Landing pages
│       └── /insurance-leads/[slug]/  # Nested category
├── /blog/                 # Blog index
│   └── /[slug]/           # Blog posts
├── /resources/            # Resources page
├── /about/                # About page
└── /lead-order/           # Lead order form
```

### Sanity Document Types

| Type | Description | File |
|------|-------------|------|
| `landingPage` | SEO-optimized long-form content | `schemas/documents/landingPage.ts` |
| `categoryPage` | Hub pages linking to related content | `schemas/documents/categoryPage.ts` |
| `blogPost` | Time-sensitive articles and updates | `schemas/documents/blogPost.ts` |
| `author` | Author profiles for E-E-A-T signals | `schemas/documents/author.ts` |

### Sanity Object Types (Reusable Blocks)

| Type | Description |
|------|-------------|
| `heroSection` | Page hero with headline, subheadline, CTAs |
| `contentBlock` | Rich text with embedded media (Portable Text) |
| `ctaSection` | Call-to-action blocks |
| `faqSection` | FAQ accordions for featured snippets |
| `comparisonTable` | Product/service comparison tables |
| `testimonial` | Customer testimonials |
| `leadMagnet` | Email capture forms |
| `seoMetadata` | Title, description, OG image, canonical URL |

## Code Conventions

### TypeScript

- Use TypeScript for all code
- Shared types are in `packages/shared/src/types.ts`
- Use `interface` for object shapes, `type` for unions

### Styling

- Use Tailwind CSS with custom configuration
- Brand colors defined in `tailwind.config.ts`:
  - Primary: `brand-yellow` (#FFD500)
  - Text: `secondary-800` (#1A1A1A)
  - Background: `secondary-100` (#F5F5F5)
- Square corners (`rounded-none`) for buttons per brand guide
- Typography plugin enabled with custom styles
- Use `cn()` utility from `lib/utils.ts` for conditional classes

### Components

- UI components in `components/ui/` are base building blocks
- Use barrel exports (`index.ts`) for clean imports
- Components use `forwardRef` when wrapping native elements
- Button supports `href` prop for link styling

### Sanity Content

- Use GROQ for queries (defined in `lib/sanity/queries.ts`)
- Use `sanityFetch` helper for safe data fetching
- ISR enabled with 60-second revalidation
- Images served from Sanity CDN via `urlForImage` helper

### SEO

- All pages include JSON-LD structured data
- Use components from `components/seo/`:
  - `ArticleJsonLd` - For articles/landing pages
  - `FAQJsonLd` - For FAQ sections
  - `HowToJsonLd` - For step-by-step guides
  - `BreadcrumbJsonLd` - For breadcrumb navigation
  - `WebPageJsonLd` - Generic web pages
  - `OrganizationJsonLd` - Organization info
  - `WebSiteJsonLd` - Site-level info
- Meta tags generated via Next.js Metadata API
- `SpeakableSpecification` schema for AI/voice assistants

## Key Files Reference

| Purpose | File Path |
|---------|-----------|
| Root layout | `apps/web/app/layout.tsx` |
| Homepage | `apps/web/app/page.tsx` |
| Landing page template | `apps/web/app/[category]/[slug]/page.tsx` |
| Category page template | `apps/web/app/[category]/page.tsx` |
| Sanity client | `apps/web/lib/sanity/client.ts` |
| GROQ queries | `apps/web/lib/sanity/queries.ts` |
| JSON-LD components | `apps/web/components/seo/JsonLd.tsx` |
| Button component | `apps/web/components/ui/Button.tsx` |
| Tailwind config | `apps/web/tailwind.config.ts` |
| Newsletter API | `apps/web/app/api/newsletter/route.ts` |
| Sitemap | `apps/web/app/sitemap.ts` |
| Robots.txt | `apps/web/app/robots.ts` |
| llms.txt | `apps/web/app/llms.txt/route.ts` |

## API Routes

### POST `/api/newsletter`

Subscribe email to newsletter via Resend.

```typescript
// Request body
{ email: string }

// Response
{ success: boolean, message: string }
```

### POST `/api/lead-order`

Submit lead order form (sends email notification).

## Common Tasks

### Adding a New Landing Page

1. Create content in Sanity Studio under "Landing Pages"
2. Assign a category and slug
3. Content will automatically appear at `/{category}/{slug}`
4. ISR will regenerate the page within 60 seconds

### Adding a New UI Component

1. Create component in `apps/web/components/ui/`
2. Export from `apps/web/components/ui/index.ts`
3. Use Tailwind with brand colors from config

### Adding New Sanity Schema

1. Create document in `apps/studio/schemas/documents/` or object in `objects/`
2. Add to exports in `apps/studio/schemas/index.ts`
3. Create corresponding TypeScript type in `packages/shared/src/types.ts`
4. Add GROQ query in `apps/web/lib/sanity/queries.ts`

### Updating SEO Metadata

- Page-level: Update in Sanity CMS (seoTitle, seoDescription, ogImage)
- Site-level: Update `apps/web/app/layout.tsx` metadata export
- Structured data: Modify components in `apps/web/components/seo/`

## Deployment

### Vercel (Web App)

- Connected to GitHub repository
- Auto-deploys on push to main branch
- Environment variables set in Vercel dashboard
- Preview deploys for pull requests

### Sanity Studio

```bash
cd apps/studio
npx sanity deploy
```

## AI/LLM Optimization

The site implements several LLM-friendly features:

1. **llms.txt** (`/llms.txt`) - Markdown summary of site content for AI systems
2. **llms-full.txt** (`/llms-full.txt`) - Comprehensive content export
3. **Robots.txt** - Explicitly allows AI crawlers (GPTBot, Claude-Web, PerplexityBot)
4. **SpeakableSpecification** schema - Marks content for voice/AI assistants
5. **Answer-first content** - FAQ sections with clear Q&A formatting

## Performance Targets

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 100
- Lighthouse SEO: 100
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1

## Important Notes

1. **Images**: Always use `next/image` with Sanity CDN for optimized delivery
2. **Links**: External links automatically open in new tabs with `rel="noopener noreferrer"`
3. **ISR**: Pages revalidate every 60 seconds - changes may take up to a minute to appear
4. **Sanity**: If Sanity is not configured, the app gracefully handles missing data
5. **Canonical domain**: Production URLs use `howtoworkleads.com` (non-www); `www` 308-redirects via Vercel
