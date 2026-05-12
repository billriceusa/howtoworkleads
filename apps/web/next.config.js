const path = require('path');

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
  // Trace from the monorepo root so hoisted node_modules resolve.
  outputFileTracingRoot: path.join(__dirname, '../../'),
  // sharp v0.33+ ships its native binary in separate @img/sharp-{platform}-{arch}
  // packages, so trace those too — otherwise Vercel's serverless bundle can't
  // load the linux-x64 binary at runtime.
  outputFileTracingIncludes: {
    '/api/generate-featured-image': [
      './node_modules/sharp/**/*',
      './node_modules/@img/**/*',
    ],
    '/api/cron/weekly-content': [
      './node_modules/sharp/**/*',
      './node_modules/@img/**/*',
    ],
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
