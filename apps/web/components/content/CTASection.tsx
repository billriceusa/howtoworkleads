import { Button, Markdown } from '@/components/ui'
import { cn } from '@/lib/utils'

interface CTASectionProps {
  headline: string
  description?: string
  features?: string[]
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  variant?: 'primary' | 'secondary' | 'accent'
  className?: string
}

export function CTASection({
  headline,
  description,
  features,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
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
      <h2 className="text-2xl font-bold sm:text-3xl text-white">{headline}</h2>
      {description && (
        <div className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
          <Markdown content={description} />
        </div>
      )}
      {features && features.length > 0 && (
        <ol className="mt-6 space-y-3 text-left max-w-2xl mx-auto">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-lg opacity-90">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white font-semibold text-sm">
                {index + 1}
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ol>
      )}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
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
        {secondaryCtaText && secondaryCtaLink && (
          <Button
            href={secondaryCtaLink}
            variant="ghost-dark"
            size="lg"
          >
            {secondaryCtaText}
          </Button>
        )}
      </div>
    </section>
  )
}
