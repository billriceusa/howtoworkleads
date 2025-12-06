import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  showEndorsement?: boolean
  className?: string
}

// Logo Icon - 3x3 grid with zigzag arrow path
function LogoIcon({ variant = 'light', size = 'md' }: { variant?: 'light' | 'dark'; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const circleStroke = variant === 'dark' ? '#FFFFFF' : '#000000'
  const arrowFill = '#FFD500' // Brand yellow

  return (
    <svg
      className={cn(sizeClasses[size])}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 3x3 Grid of circles */}
      {/* Row 1 */}
      <circle cx="20" cy="20" r="10" fill={arrowFill} /> {/* Top-left filled - starting point */}
      <circle cx="50" cy="20" r="10" stroke={circleStroke} strokeWidth="3" fill="none" />
      <circle cx="80" cy="20" r="10" stroke={circleStroke} strokeWidth="3" fill="none" />

      {/* Row 2 */}
      <circle cx="20" cy="50" r="10" stroke={circleStroke} strokeWidth="3" fill="none" />
      <circle cx="50" cy="50" r="10" fill={arrowFill} /> {/* Middle-center on path */}
      <circle cx="80" cy="50" r="10" fill={arrowFill} /> {/* Middle-right on path - exit point base */}

      {/* Row 3 */}
      <circle cx="20" cy="50" r="10" stroke={circleStroke} strokeWidth="3" fill="none" />
      <circle cx="50" cy="80" r="10" stroke={circleStroke} strokeWidth="3" fill="none" />
      <circle cx="80" cy="80" r="10" stroke={circleStroke} strokeWidth="3" fill="none" />

      {/* Arrow path - zigzag from top-left through middle to right */}
      <path
        d="M20 20 L20 50 L50 50 L80 50"
        stroke={arrowFill}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Arrow head pointing right */}
      <polygon
        points="90,50 78,42 78,58"
        fill={arrowFill}
      />
    </svg>
  )
}

// Full Logo with wordmark and endorsement
export function Logo({
  variant = 'light',
  size = 'md',
  showWordmark = true,
  showEndorsement = true,
  className,
}: LogoProps) {
  const textColor = variant === 'dark' ? 'text-white' : 'text-black'
  const endorsementColor = variant === 'dark' ? 'text-white/70' : 'text-secondary-500'

  const wordmarkSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  const endorsementSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  }

  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <LogoIcon variant={variant} size={size} />
      {showWordmark && (
        <div className="flex flex-col">
          <span className={cn('font-bold font-serif leading-tight', wordmarkSizes[size], textColor)}>
            HowToWorkLeads
          </span>
          {showEndorsement && (
            <span className={cn('leading-tight', endorsementSizes[size], endorsementColor)}>
              A Bill Rice Strategy Group Resource
            </span>
          )}
        </div>
      )}
    </Link>
  )
}

// Icon-only export for favicons and small uses
export function LogoIconOnly({ variant = 'light', size = 'md' }: { variant?: 'light' | 'dark'; size?: 'sm' | 'md' | 'lg' }) {
  return <LogoIcon variant={variant} size={size} />
}

Logo.displayName = 'Logo'
