import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title/Role',
      type: 'string',
    }),
    defineField({
      name: 'authorCompany',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'authorName',
      media: 'authorImage',
    },
    prepare({ quote, author, media }) {
      return {
        title: quote?.slice(0, 50) + (quote?.length > 50 ? '...' : ''),
        subtitle: `— ${author || 'Unknown'}`,
        media,
      }
    },
  },
})
