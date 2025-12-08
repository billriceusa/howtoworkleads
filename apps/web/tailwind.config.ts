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
            lineHeight: '1.75',
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
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h2: {
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: '700',
              color: '#000000',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '600',
              color: '#000000',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            h4: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '600',
              color: '#000000',
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
            },
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            strong: {
              color: '#000000',
              fontWeight: '600',
            },
            em: {
              fontStyle: 'italic',
            },
            blockquote: {
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: 'italic',
              borderLeftColor: '#FFD500',
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              color: '#4B5563',
            },
            // Lists
            ul: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1.625rem',
              listStyleType: 'disc',
            },
            ol: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1.625rem',
              listStyleType: 'decimal',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'li::marker': {
              color: '#1A1A1A',
            },
            'ul > li': {
              paddingLeft: '0.375rem',
            },
            'ol > li': {
              paddingLeft: '0.375rem',
            },
            'ul ul, ul ol, ol ul, ol ol': {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
            },
            // Code
            code: {
              color: '#000000',
              backgroundColor: '#F5F5F5',
              padding: '0.25rem 0.375rem',
              borderRadius: '0',
              fontWeight: '400',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1A1A1A',
              color: '#F5F5F5',
              padding: '1rem 1.25rem',
              borderRadius: '0',
              overflowX: 'auto',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.875rem',
              lineHeight: '1.7',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
            },
            // Tables
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2rem',
              marginBottom: '2rem',
              fontSize: '0.875rem',
              lineHeight: '1.7',
            },
            thead: {
              borderBottomWidth: '2px',
              borderBottomColor: '#E0E0E0',
            },
            'thead th': {
              fontWeight: '600',
              color: '#000000',
              verticalAlign: 'bottom',
              paddingRight: '0.75rem',
              paddingBottom: '0.75rem',
              paddingLeft: '0.75rem',
            },
            'thead th:first-child': {
              paddingLeft: '0',
            },
            'thead th:last-child': {
              paddingRight: '0',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: '#E0E0E0',
            },
            'tbody tr:last-child': {
              borderBottomWidth: '0',
            },
            'tbody td': {
              verticalAlign: 'baseline',
              paddingTop: '0.75rem',
              paddingRight: '0.75rem',
              paddingBottom: '0.75rem',
              paddingLeft: '0.75rem',
            },
            'tbody td:first-child': {
              paddingLeft: '0',
            },
            'tbody td:last-child': {
              paddingRight: '0',
            },
            // Horizontal rule
            hr: {
              borderColor: '#E0E0E0',
              borderTopWidth: '1px',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            // Figure and figcaption
            figure: {
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            'figure > *': {
              marginTop: '0',
              marginBottom: '0',
            },
            figcaption: {
              color: '#666666',
              fontSize: '0.875rem',
              lineHeight: '1.4',
              marginTop: '0.75rem',
            },
            // Video and images
            img: {
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            video: {
              marginTop: '2rem',
              marginBottom: '2rem',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
