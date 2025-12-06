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
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-none bg-brand-yellow text-black">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="mt-2 text-secondary-500">{description}</p>
      {href && (
        <span className="mt-4 inline-flex items-center text-sm font-medium text-black group-hover:text-brand-yellow">
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

  // Brand-compliant: square corners
  const baseStyles = cn(
    'block rounded-none border border-secondary-300 bg-white p-6 transition-all',
    href && 'group hover:shadow-lg hover:-translate-y-1 hover:border-brand-yellow',
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
