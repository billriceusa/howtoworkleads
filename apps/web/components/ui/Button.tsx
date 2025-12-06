import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'ghost-dark'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  isLoading?: boolean
}

// Brand-compliant button styles
const variantStyles: Record<ButtonVariant, string> = {
  // Yellow background, black text - primary CTA
  primary: 'bg-brand-yellow text-black hover:bg-brand-yellow-hover hover:scale-[1.02] focus:ring-brand-yellow',
  // Black border, transparent background - secondary action
  secondary: 'border-2 border-black bg-transparent text-black hover:bg-black hover:text-white focus:ring-black',
  // Same as secondary - outline style
  outline: 'border-2 border-black bg-transparent text-black hover:bg-black hover:text-white focus:ring-black',
  // Ghost for light backgrounds
  ghost: 'bg-transparent text-black hover:bg-secondary-100 focus:ring-secondary-300',
  // Ghost for dark backgrounds
  'ghost-dark': 'border-2 border-white bg-transparent text-white hover:bg-white hover:text-black focus:ring-white',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      href,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Brand-compliant base styles: square corners, uppercase, letter-spacing
    const baseStyles = cn(
      'inline-flex items-center justify-center font-semibold transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'uppercase tracking-wide',
      'rounded-none' // Square corners per brand guide
    )

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    )

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="-ml-1 mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
