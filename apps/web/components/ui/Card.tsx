import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
  href?: string
  bordered?: boolean
}

export function Card({ className, children, href, bordered = false }: CardProps) {
  // Brand-compliant: square corners (rounded-none), consistent shadows
  const baseStyles = cn(
    'rounded-none bg-white p-6 shadow-md transition-all duration-200',
    bordered && 'border border-secondary-300',
    href && 'hover:shadow-lg hover:-translate-y-1',
    className
  )

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, 'block')}>
        {children}
      </Link>
    )
  }

  return <div className={baseStyles}>{children}</div>
}

interface CardHeaderProps {
  className?: string
  children: React.ReactNode
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

interface CardTitleProps {
  className?: string
  children: React.ReactNode
  as?: 'h2' | 'h3' | 'h4'
}

export function CardTitle({ className, children, as: Tag = 'h3' }: CardTitleProps) {
  return (
    <Tag className={cn('text-xl font-semibold text-black', className)}>
      {children}
    </Tag>
  )
}

interface CardDescriptionProps {
  className?: string
  children: React.ReactNode
}

export function CardDescription({ className, children }: CardDescriptionProps) {
  return <p className={cn('text-secondary-500', className)}>{children}</p>
}

interface CardContentProps {
  className?: string
  children: React.ReactNode
}

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cn(className)}>{children}</div>
}

interface CardFooterProps {
  className?: string
  children: React.ReactNode
}

export function CardFooter({ className, children }: CardFooterProps) {
  return <div className={cn('mt-4 pt-4 border-t border-secondary-300', className)}>{children}</div>
}
