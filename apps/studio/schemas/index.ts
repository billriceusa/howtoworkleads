// Document types
import landingPage from './documents/landingPage'
import categoryPage from './documents/categoryPage'
import blogPost from './documents/blogPost'
import author from './documents/author'
import cronHeartbeat from './documents/cronHeartbeat'

// Object types
import seoMetadata from './objects/seoMetadata'
import heroSection from './objects/heroSection'
import contentBlock from './objects/contentBlock'
import ctaSection from './objects/ctaSection'
import faqSection from './objects/faqSection'
import comparisonTable from './objects/comparisonTable'
import testimonial from './objects/testimonial'
import leadMagnet from './objects/leadMagnet'
import { table, tableRow } from './objects/table'
import codeBlock from './objects/codeBlock'

export const schemaTypes = [
  // Documents
  landingPage,
  categoryPage,
  blogPost,
  author,
  cronHeartbeat,
  // Objects
  seoMetadata,
  heroSection,
  contentBlock,
  ctaSection,
  faqSection,
  comparisonTable,
  testimonial,
  leadMagnet,
  table,
  tableRow,
  codeBlock,
]
