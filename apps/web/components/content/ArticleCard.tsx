import Link from 'next/link'
import { Badge } from '@/components/ui'
import { formatDate } from '@/lib/utils'

interface ArticleCardProps {
  title: string
  description?: string
  href: string
  category?: string
  categoryHref?: string
  publishedAt?: string
  readTime?: string
}

export function ArticleCard({
  title,
  description,
  href,
  category,
  categoryHref,
  publishedAt,
  readTime,
}: ArticleCardProps) {
  return (
    <article className="group relative flex flex-col rounded-none border border-secondary-300 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
      {category && (
        <div className="mb-3">
          {categoryHref ? (
            <Link href={categoryHref}>
              <Badge variant="primary">{category}</Badge>
            </Link>
          ) : (
            <Badge variant="primary">{category}</Badge>
          )}
        </div>
      )}

      <h3 className="text-xl font-semibold text-black group-hover:text-brand-yellow transition-colors">
        <Link href={href}>
          <span className="absolute inset-0" />
          {title}
        </Link>
      </h3>

      {description && (
        <p className="mt-3 text-secondary-500 line-clamp-3">{description}</p>
      )}

      {(publishedAt || readTime) && (
        <div className="mt-4 flex items-center gap-4 text-sm text-secondary-500">
          {publishedAt && <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>}
          {publishedAt && readTime && <span>&middot;</span>}
          {readTime && <span>{readTime}</span>}
        </div>
      )}
    </article>
  )
}
