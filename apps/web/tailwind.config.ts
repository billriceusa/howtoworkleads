import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Yellow - Primary accent color
        brand: {
          yellow: '#FFD500',
          'yellow-hover': '#E6C000',
        },
        // Neutrals based on brand guide
        primary: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#FFD500', // Brand Yellow
          600: '#E6C000', // Yellow hover
          700: '#A16207',
          800: '#000000', // Black for text/headlines
          900: '#000000',
          950: '#000000',
        },
        secondary: {
          50: '#F5F5F5',
          100: '#F5F5F5', // Light gray
          200: '#E5E5E5',
          300: '#E0E0E0', // Border gray
          400: '#A3A3A3',
          500: '#666666', // Medium gray
          600: '#525252',
          700: '#404040',
          800: '#1A1A1A', // Dark gray (body text)
          900: '#000000',
          950: '#000000',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#FFD500', // Brand Yellow
          600: '#E6C000',
          700: '#B45309',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'none': '0px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1A1A1A', // Dark gray for body
            a: {
              color: '#000000',
              textDecoration: 'underline',
              '&:hover': {
                color: '#FFD500',
              },
            },
            h1: {
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: '700',
              color: '#000000',
            },
            h2: {
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: '700',
              color: '#000000',
            },
            h3: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '600',
              color: '#000000',
            },
            h4: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '600',
              color: '#000000',
            },
            strong: {
              color: '#000000',
            },
            blockquote: {
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: 'italic',
              borderLeftColor: '#FFD500',
              borderLeftWidth: '4px',
            },
            code: {
              color: '#000000',
              backgroundColor: '#F5F5F5',
              padding: '0.25rem 0.375rem',
              borderRadius: '0',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
