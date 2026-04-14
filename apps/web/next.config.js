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
    ];
  },
}

module.exports = nextConfig
