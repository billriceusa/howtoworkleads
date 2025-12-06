import { cn } from '@/lib/utils'

type BadgeVariant = 'primary' | 'secondary' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: React.ReactNode
}

// Brand-compliant badge styles: square corners, brand yellow as primary
const variantStyles: Record<BadgeVariant, string> = {
  // Brand yellow background - used for category tags
  primary: 'bg-brand-yellow text-black',
  // Light gray background - used for secondary/muted tags
  secondary: 'bg-secondary-100 text-secondary-800',
  // Neutral gray
  neutral: 'bg-secondary-100 text-secondary-800',
}

export function Badge({ variant = 'primary', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        // Brand-compliant: square corners, uppercase, consistent sizing
        'inline-flex items-center rounded-none px-3 py-1.5 text-xs font-semibold uppercase tracking-wide',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
