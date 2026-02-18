import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

interface NewsletterFormProps {
  title?: string
  description?: string
  className?: string
  variant?: 'inline' | 'stacked'
}

export function NewsletterForm({
  title = 'Get sales tips delivered to your inbox',
  description = 'Join The Lead Brief — weekly insights for sales professionals on converting leads into customers.',
  className,
  variant = 'stacked',
}: NewsletterFormProps) {
  return (
    <div
      className={cn(
        'rounded-none bg-secondary-100 p-8 sm:p-10',
        className
      )}
    >
      <div className={cn(variant === 'inline' ? 'sm:flex sm:items-center sm:justify-between sm:gap-8' : 'text-center')}>
        <div className={cn(variant === 'inline' ? 'sm:flex-1' : '')}>
          <h3 className="text-xl font-bold text-black sm:text-2xl font-serif">{title}</h3>
          <p className="mt-2 text-secondary-500">{description}</p>
        </div>
        <div className={cn(variant === 'inline' ? 'mt-6 sm:mt-0' : 'mt-6')}>
          <Button
            href="https://www.theleadbrief.com/"
            variant="primary"
            size="lg"
          >
            Subscribe to The Lead Brief
          </Button>
        </div>
      </div>
    </div>
  )
}
