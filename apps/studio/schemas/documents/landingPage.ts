import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // Basic Info
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'categoryPage' }],
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'heroSection',
      group: 'content',
    }),

    // Content
    defineField({
      name: 'tableOfContents',
      title: 'Show Table of Contents',
      type: 'boolean',
      group: 'content',
      initialValue: true,
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      group: 'content',
      of: [
        { type: 'contentBlock' },
        { type: 'ctaSection' },
        { type: 'faqSection' },
        { type: 'comparisonTable' },
        { type: 'testimonial' },
        { type: 'leadMagnet' },
      ],
    }),

    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Recommended: 50-60 characters',
      validation: (Rule) => Rule.max(70).warning('SEO title should be under 60 characters'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Recommended: 150-160 characters',
      validation: (Rule) => Rule.max(170).warning('Meta description should be under 160 characters'),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      group: 'seo',
      description: 'The primary keyword this page should rank for',
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      group: 'seo',
      description: 'Recommended: 1200x630px',
      options: {
        hotspot: true,
      },
    }),

    // Related Content
    defineField({
      name: 'relatedPages',
      title: 'Related Pages',
      type: 'array',
      group: 'settings',
      of: [
        {
          type: 'reference',
          to: [{ type: 'landingPage' }],
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // Publishing
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'settings',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'settings',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      media: 'ogImage',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media,
      }
    },
  },
})
