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
    serverComponentsExternalPackages: ['sharp'],
  },
  // Ensure Vercel can resolve sharp native bindings
  outputFileTracingIncludes: {
    '/api/generate-featured-image': ['./node_modules/sharp/**/*'],
  },
}

module.exports = nextConfig
