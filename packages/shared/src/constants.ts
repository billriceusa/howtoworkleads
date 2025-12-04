// Site Configuration
export const SITE_NAME = 'HowToWorkLeads'
export const SITE_DESCRIPTION =
  'Expert strategies and resources to help sales professionals convert internet leads into revenue.'
export const SITE_URL = 'https://howtoworkleads.com'

// Navigation Categories
export const CATEGORIES = [
  {
    id: 'lead-management',
    title: 'Lead Management',
    slug: 'lead-management',
    description:
      'Master the art of organizing, tracking, and nurturing your internet leads.',
  },
  {
    id: 'sales-process',
    title: 'Sales Process',
    slug: 'sales-process',
    description:
      'Proven strategies for working real-time and aged leads through effective sales sequences.',
  },
  {
    id: 'crm-systems',
    title: 'CRM Systems',
    slug: 'crm-systems',
    description:
      'Build powerful sales systems using High Level, Close, and other top CRM platforms.',
  },
  {
    id: 'buying-leads',
    title: 'Buying Leads',
    slug: 'buying-leads',
    description:
      'Expert guidance on purchasing quality leads including mortgage, insurance, and solar leads.',
  },
] as const

// Social Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/howtoworkleads',
  linkedin: 'https://linkedin.com/company/howtoworkleads',
  youtube: 'https://youtube.com/@howtoworkleads',
} as const

// SEO Defaults
export const DEFAULT_SEO = {
  titleTemplate: '%s | How To Work Leads',
  defaultTitle: 'How To Work Leads | Master Internet Lead Conversion',
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
  },
} as const

// Lead Types for Buying Leads section
export const LEAD_TYPES = [
  { id: 'aged', name: 'Aged Leads', slug: 'aged-leads' },
  { id: 'mortgage', name: 'Mortgage Leads', slug: 'mortgage-leads' },
  { id: 'insurance', name: 'Insurance Leads', slug: 'insurance-leads' },
  { id: 'solar', name: 'Solar Leads', slug: 'solar-leads' },
] as const

export const INSURANCE_LEAD_TYPES = [
  { id: 'life', name: 'Life Insurance Leads', slug: 'life-insurance-leads' },
  { id: 'iul', name: 'IUL Leads', slug: 'iul-leads' },
  { id: 'auto', name: 'Auto Insurance Leads', slug: 'auto-insurance-leads' },
  { id: 'health', name: 'Health Insurance Leads', slug: 'health-insurance-leads' },
] as const
