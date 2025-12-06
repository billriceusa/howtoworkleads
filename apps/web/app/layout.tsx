import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GoogleAnalytics } from '@/components/analytics'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://howtoworkleads.com'
  ),
  title: {
    default: 'How To Work Leads | Master Internet Lead Conversion',
    template: '%s | How To Work Leads',
  },
  description:
    'Learn proven strategies to convert internet leads into sales. Expert guides on lead management, sales processes, CRM systems, and buying leads.',
  keywords: [
    'internet leads',
    'lead conversion',
    'sales leads',
    'lead management',
    'how to work leads',
    'buy leads',
    'sales process',
    'CRM',
  ],
  authors: [{ name: 'How To Work Leads' }],
  creator: 'How To Work Leads',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://howtoworkleads.com',
    siteName: 'How To Work Leads',
    title: 'How To Work Leads | Master Internet Lead Conversion',
    description:
      'Learn proven strategies to convert internet leads into sales. Expert guides on lead management, sales processes, CRM systems, and buying leads.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How To Work Leads | Master Internet Lead Conversion',
    description:
      'Learn proven strategies to convert internet leads into sales.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Georgia is a system font, no need to load */}
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <GoogleAnalytics />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
