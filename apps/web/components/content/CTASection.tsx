import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

interface CTASectionProps {
  headline: string
  description?: string
  ctaText: string
  ctaLink: string
  variant?: 'primary' | 'secondary' | 'accent'
  className?: string
}

export function CTASection({
  headline,
  description,
  ctaText,
  ctaLink,
  variant = 'primary',
  className,
}: CTASectionProps) {
  const variantStyles = {
    primary: 'bg-primary-800 text-white',
    secondary: 'bg-secondary-700 text-white',
    accent: 'bg-accent-600 text-white',
  }

  const buttonVariant = variant === 'primary' ? 'outline' : 'primary'

  return (
    <section
      className={cn(
        'rounded-2xl p-8 sm:p-12 text-center',
        variantStyles[variant],
        className
      )}
    >
      <h2 className="text-2xl font-bold sm:text-3xl">{headline}</h2>
      {description && (
        <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">{description}</p>
      )}
      <div className="mt-8">
        <Button
          href={ctaLink}
          variant={buttonVariant}
          size="lg"
          className={cn(
            variant !== 'primary' && 'bg-white text-gray-900 hover:bg-gray-100'
          )}
        >
          {ctaText}
        </Button>
      </div>
    </section>
  )
}
