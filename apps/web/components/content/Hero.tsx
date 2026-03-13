import { Button, Markdown } from '@/components/ui'
import { cn } from '@/lib/utils'

interface HeroProps {
  headline: string
  subheadline?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  subtext?: string
  downloadText?: string
  downloadLink?: string
  centered?: boolean
  size?: 'sm' | 'md' | 'lg'
  utmCampaign?: string
  className?: string
}

export function Hero({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  subtext,
  downloadText,
  downloadLink,
  centered = true,
  size = 'lg',
  utmCampaign,
  className,
}: HeroProps) {
  const sizeStyles = {
    sm: 'py-12 sm:py-16',
    md: 'py-16 sm:py-20 lg:py-24',
    lg: 'py-20 sm:py-28 lg:py-32',
  }

  const headlineSizes = {
    sm: 'text-3xl sm:text-4xl',
    md: 'text-4xl sm:text-5xl',
    lg: 'text-4xl sm:text-5xl lg:text-6xl',
  }

  return (
    <section
      className={cn(
        // Brand-compliant: white-dominant background
        'bg-white',
        sizeStyles[size],
        className
      )}
    >
      <div className={cn('container-wide', centered && 'text-center')}>
        <h1
          className={cn(
            // Brand-compliant: Georgia font for headlines, black text
            'font-bold tracking-tight text-black font-serif',
            headlineSizes[size],
            centered && 'mx-auto max-w-4xl'
          )}
        >
          {headline}
        </h1>
        {subheadline && (
          <div
            className={cn(
              // Brand-compliant: dark gray body text
              'mt-6 text-lg text-secondary-800 sm:text-xl',
              centered && 'mx-auto max-w-2xl'
            )}
          >
            <Markdown content={subheadline} />
          </div>
        )}
        {(ctaText || secondaryCtaText) && (
          <div
            className={cn(
              'mt-10 flex flex-col gap-4',
              centered && 'items-center'
            )}
          >
            <div
              className={cn(
                'flex flex-wrap gap-4',
                centered && 'justify-center'
              )}
            >
              {ctaText && ctaLink && (
                <Button href={ctaLink} variant="primary" size="lg" utmCampaign={utmCampaign}>
                  {ctaText}
                </Button>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <Button href={secondaryCtaLink} variant="outline" size="lg">
                  {secondaryCtaText}
                </Button>
              )}
            </div>
            {subtext && (
              <p className="text-sm font-bold text-secondary-600">{subtext}</p>
            )}
            {downloadText && downloadLink && (
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-800 underline hover:text-primary-900 transition-colors"
              >
                {downloadText}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
