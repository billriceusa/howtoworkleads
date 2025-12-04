# HowToWorkLeads.com

SEO-optimized content website for sales professionals working internet leads. Built with Next.js 14, Tailwind CSS, and Sanity CMS.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **CMS**: Sanity.io
- **Deployment**: Vercel (recommended)
- **Monorepo**: Turborepo

## Project Structure

```
howtoworkleads/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── studio/       # Sanity Studio CMS
├── packages/
│   └── shared/       # Shared types and utilities
├── PRD.md            # Product Requirements Document
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm 10+
- Sanity.io account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/howtoworkleads.git
cd howtoworkleads
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

For the web app (`apps/web/.env.local`):
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For Sanity Studio (`apps/studio/.env.local`):
```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

4. Create a Sanity project:
```bash
cd apps/studio
npx sanity init
```

### Development

Run all apps in development mode:
```bash
npm run dev
```

Run only the web app:
```bash
npm run dev:web
```

Run only Sanity Studio:
```bash
npm run dev:studio
```

### Building

```bash
npm run build
```

## Content Structure

### Categories (Pillar Pages)
- Lead Management
- Sales Process
- CRM Systems
- Buying Leads

### Article Pages
See `PRD.md` for the complete sitemap and content plan.

## Features

- **SEO Optimized**: Server-side rendering, dynamic meta tags, JSON-LD structured data
- **Performance**: Core Web Vitals optimized, image optimization, code splitting
- **Content Management**: Sanity CMS with live preview
- **Design System**: Custom Tailwind configuration with consistent theming
- **Responsive**: Mobile-first responsive design

## Key Components

### UI Components (`apps/web/components/ui/`)
- Button, Card, Badge, Input, Accordion

### Layout Components (`apps/web/components/layout/`)
- Header, Footer, Breadcrumbs

### Content Components (`apps/web/components/content/`)
- Hero, ArticleCard, FeatureCard, CTASection, NewsletterForm, TableOfContents

### SEO Components (`apps/web/components/seo/`)
- ArticleJsonLd, FAQJsonLd, HowToJsonLd, OrganizationJsonLd, WebSiteJsonLd

## Sanity Schemas

### Document Types
- `landingPage` - SEO-optimized content pages
- `categoryPage` - Hub/pillar pages
- `blogPost` - Blog articles
- `author` - Content authors

### Object Types
- `heroSection`, `contentBlock`, `ctaSection`, `faqSection`, `comparisonTable`, `testimonial`, `leadMagnet`

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Sanity Studio

Deploy Sanity Studio to Sanity's hosting:
```bash
cd apps/studio
npx sanity deploy
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

Private - All rights reserved
