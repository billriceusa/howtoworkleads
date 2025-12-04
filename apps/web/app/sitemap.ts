import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://howtoworkleads.com'

// Static pages that always exist
const staticPages = [
  '',
  '/lead-management',
  '/lead-management/buying-leads',
  '/lead-management/cleaning-verifying-data',
  '/lead-management/email-sequences',
  '/lead-management/building-email-list',
  '/lead-management/effective-call-campaigns',
  '/sales-process',
  '/sales-process/working-real-time-leads',
  '/sales-process/warming-aged-leads',
  '/sales-process/managing-pipeline',
  '/sales-process/omni-channel-sequences',
  '/crm-systems',
  '/crm-systems/highlevel-close-sales-system',
  '/buying-leads',
  '/buying-leads/aged-leads',
  '/buying-leads/mortgage-leads',
  '/buying-leads/insurance-leads',
  '/buying-leads/insurance-leads/life-insurance-leads',
  '/buying-leads/insurance-leads/iul-leads',
  '/buying-leads/insurance-leads/auto-insurance-leads',
  '/buying-leads/insurance-leads/health-insurance-leads',
  '/buying-leads/solar-leads',
  '/buying-leads/how-to-buy-leads',
  '/buying-leads/lead-buying-checklist',
  '/buying-leads/lead-roi-calculator',
  '/buying-leads/compliance-checklist',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: path === '' ? 1 : path.split('/').length <= 2 ? 0.8 : 0.6,
  }))
}
