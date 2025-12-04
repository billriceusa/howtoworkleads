import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  title: string
  description: string
  href?: string
  icon?: React.ReactNode
  className?: string
}

export function FeatureCard({
  title,
  description,
  href,
  icon,
  className,
}: FeatureCardProps) {
  const content = (
    <>
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-800">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      {href && (
        <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-800 group-hover:text-primary-600">
          Learn more
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      )}
    </>
  )

  const baseStyles = cn(
    'block rounded-xl border border-gray-200 bg-white p-6 transition-all',
    href && 'group hover:shadow-lg hover:-translate-y-1 hover:border-primary-200',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    )
  }

  return <div className={baseStyles}>{content}</div>
}
