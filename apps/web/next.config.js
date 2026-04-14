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
  experimental: {
    serverComponentsExternalPackages: ['sharp', '@anthropic-ai/sdk', 'google-auth-library'],
  },
  // Ensure Vercel can resolve sharp native bindings
  outputFileTracingIncludes: {
    '/api/generate-featured-image': ['./node_modules/sharp/**/*'],
  },
  async redirects() {
    return [
      {
        source: '/crm-systems/crm-vs-lead-management',
        destination: '/lead-management/lead-management-vs-crm',
        permanent: true,
      },
      {
        source: '/crm-systems/what-is-a-crm-system',
        destination: '/crm-systems',
        permanent: true,
      },
      {
        source: '/crm-systems/b2c-vs-b2b-crm',
        destination: '/blog/best-crm-aged-leads',
        permanent: true,
      },
      {
        source: '/crm-systems/operational-analytical-and-collaborative-crm',
        destination: '/crm-systems',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
