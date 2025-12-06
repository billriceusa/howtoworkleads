/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      // Redirect buy-* URLs to correct pages
      {
        source: '/buying-leads/buy-aged-leads',
        destination: '/buying-leads/aged-leads',
        permanent: true,
      },
      {
        source: '/buying-leads/buy-iul-leads',
        destination: '/buying-leads/iul-leads',
        permanent: true,
      },
      {
        source: '/buying-leads/buy-life-insurance-leads',
        destination: '/buying-leads/life-insurance-leads',
        permanent: true,
      },
      {
        source: '/buying-leads/buy-mortgage-leads',
        destination: '/buying-leads/mortgage-leads',
        permanent: true,
      },
      {
        source: '/buying-leads/buy-solar-leads',
        destination: '/buying-leads/solar-leads',
        permanent: true,
      },
      {
        source: '/buying-leads/buy-auto-insurance-leads',
        destination: '/buying-leads/auto-insurance-leads',
        permanent: true,
      },
      {
        source: '/buying-leads/buy-health-insurance-leads',
        destination: '/buying-leads/health-insurance-leads',
        permanent: true,
      },
      {
        source: '/buying-leads/buy-insurance-leads',
        destination: '/buying-leads/insurance-leads',
        permanent: true,
      },
      // Redirect old nested insurance URLs to flat structure
      {
        source: '/buying-leads/insurance-leads/life-insurance-leads',
        destination: '/buying-leads/life-insurance-leads',
        permanent: true,
      },
      {
        source: '/buying-leads/insurance-leads/iul-leads',
        destination: '/buying-leads/iul-leads',
        permanent: true,
      },
      {
        source: '/buying-leads/insurance-leads/auto-insurance-leads',
        destination: '/buying-leads/auto-insurance-leads',
        permanent: true,
      },
      {
        source: '/buying-leads/insurance-leads/health-insurance-leads',
        destination: '/buying-leads/health-insurance-leads',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
