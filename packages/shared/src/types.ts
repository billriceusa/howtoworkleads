// Sanity Document Types
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  alt?: string
}

// Content Types
export interface Author extends SanityDocument {
  _type: 'author'
  name: string
  slug: SanitySlug
  image?: SanityImage
  bio?: string
  role?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
}

export interface CategoryPage extends SanityDocument {
  _type: 'categoryPage'
  title: string
  slug: SanitySlug
  description?: string
  icon?: string
  order?: number
  heroSection?: HeroSection
  seoTitle?: string
  seoDescription?: string
  ogImage?: SanityImage
}

export interface LandingPage extends SanityDocument {
  _type: 'landingPage'
  title: string
  slug: SanitySlug
  category: CategoryPage
  heroSection?: HeroSection
  tableOfContents?: boolean
  content?: ContentBlock[]
  seoTitle?: string
  seoDescription?: string
  focusKeyword?: string
  secondaryKeywords?: string[]
  ogImage?: SanityImage
  relatedPages?: LandingPage[]
  author?: Author
  publishedAt?: string
  updatedAt?: string
}

export interface BlogPost extends SanityDocument {
  _type: 'blogPost'
  title: string
  slug: SanitySlug
  excerpt?: string
  mainImage?: SanityImage
  content?: any[]
  categories?: CategoryPage[]
  author?: Author
  publishedAt?: string
  updatedAt?: string
  seoTitle?: string
  seoDescription?: string
}

// Component Types
export interface HeroSection {
  _type: 'heroSection'
  headline: string
  subheadline?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: SanityImage
}

export interface ContentBlock {
  _type: 'contentBlock'
  content: any[]
}

export interface CTASection {
  _type: 'ctaSection'
  headline: string
  description?: string
  ctaText: string
  ctaLink: string
  variant?: 'primary' | 'secondary' | 'accent'
}

export interface FAQSection {
  _type: 'faqSection'
  title?: string
  faqs: FAQ[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface ComparisonTable {
  _type: 'comparisonTable'
  title?: string
  columns: string[]
  rows: TableRow[]
}

export interface TableRow {
  cells: string[]
  isHighlighted?: boolean
}

export interface Testimonial {
  _type: 'testimonial'
  quote: string
  authorName: string
  authorTitle?: string
  authorCompany?: string
  authorImage?: SanityImage
  rating?: number
}

export interface LeadMagnet {
  _type: 'leadMagnet'
  title: string
  description?: string
  image?: SanityImage
  buttonText?: string
  formId?: string
  downloadUrl?: string
  variant?: 'inline' | 'card' | 'banner'
}

// Navigation Types
export interface NavigationItem {
  title: string
  href: string
  children?: NavigationItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

// SEO Types
export interface SEOMetadata {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: SanityImage
  noIndex?: boolean
}
