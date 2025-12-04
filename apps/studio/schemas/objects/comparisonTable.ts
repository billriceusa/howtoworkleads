import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Table Title',
      type: 'string',
    }),
    defineField({
      name: 'columns',
      title: 'Column Headers',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(2).max(6),
    }),
    defineField({
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'row',
          fields: [
            {
              name: 'cells',
              title: 'Row Cells',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'isHighlighted',
              title: 'Highlight Row',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              cells: 'cells',
            },
            prepare({ cells }) {
              return {
                title: cells?.[0] || 'Row',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      columns: 'columns',
      rows: 'rows',
    },
    prepare({ title, columns, rows }) {
      return {
        title: title || 'Comparison Table',
        subtitle: `${columns?.length || 0} columns, ${rows?.length || 0} rows`,
      }
    },
  },
})
