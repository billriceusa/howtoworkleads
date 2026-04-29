/**
 * Shared Portable Text type renderers for HowToWorkLeads.
 *
 * Used across the three route files that render blockContent:
 *   - app/blog/[slug]/page.tsx
 *   - app/[category]/page.tsx
 *   - app/[category]/[slug]/page.tsx
 *
 * Route-specific renderers (e.g. comparisonTable on the blog post page,
 * which is a different shape than the generic kit `table`) stay inline
 * in their respective route files and merge into `types` via spread.
 *
 * Pattern:
 *   const portableTextComponents = {
 *     types: { ...sharedRendererTypes, comparisonTable: routeSpecific },
 *     // ... other layers
 *   }
 */
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const imageRenderer = ({ value }: any) => {
  if (!value?.asset) return null
  return (
    <figure className="my-8">
      <Image
        src={urlForImage(value).width(800).url()}
        alt={value.alt || ''}
        width={800}
        height={450}
        className="rounded-lg"
      />
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}

export const tableRenderer = ({ value }: any) => {
  const rows: { cells?: string[] }[] = value?.rows || []
  if (rows.length === 0) return null
  const [headerRow, ...bodyRows] = rows
  return (
    <figure className="not-prose my-8">
      {value?.caption && (
        <figcaption className="mb-2 text-sm font-medium text-gray-700">{value.caption}</figcaption>
      )}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-sm">
          {headerRow?.cells && (
            <thead className="bg-gray-50">
              <tr>
                {headerRow.cells.map((cell, i) => (
                  <th
                    key={i}
                    className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-900"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {bodyRows.map((row, ri) => (
              <tr key={ri} className="border-b border-gray-100 last:border-0">
                {(row.cells || []).map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 align-top text-gray-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}

export const codeBlockRenderer = ({ value }: any) => {
  const code = (value?.code as string) || ''
  const label = (value?.filename as string | undefined) || (value?.language as string | undefined)
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-lg border border-gray-200 bg-zinc-900">
      {label && (
        <figcaption className="border-b border-zinc-800 bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-400">
          {label}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-zinc-100">{code}</code>
      </pre>
    </figure>
  )
}

/**
 * Convenience export — the standard set of `types:` renderers shared
 * across all blockContent-rendering routes.
 *
 * Each route can spread this into its own components.types object and
 * add route-specific renderers (e.g. comparisonTable) without
 * duplicating the shared ones.
 */
export const sharedRendererTypes = {
  image: imageRenderer,
  table: tableRenderer,
  codeBlock: codeBlockRenderer,
}
