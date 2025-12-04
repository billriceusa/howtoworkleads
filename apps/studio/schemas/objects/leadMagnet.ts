import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'leadMagnet',
  title: 'Lead Magnet',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Preview Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Download Free Guide',
    }),
    defineField({
      name: 'formId',
      title: 'Form ID',
      type: 'string',
      description: 'ID for your email marketing platform form',
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      description: 'Direct link to the downloadable asset',
    }),
    defineField({
      name: 'variant',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Inline', value: 'inline' },
          { title: 'Card', value: 'card' },
          { title: 'Banner', value: 'banner' },
        ],
        layout: 'radio',
      },
      initialValue: 'card',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Lead Magnet',
        subtitle: 'Lead Magnet',
        media,
      }
    },
  },
})
