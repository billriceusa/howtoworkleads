const path = require('path');

// Generated from agedlead-sales/data/migration/url-map.csv by
// scripts/export-cross-host-redirects.mjs in that repo. Do not hand-edit —
// re-run the generator and commit the result in both repos.
const crossHost = require('./data/migration/cross-host-redirects.json');

const RETIRING_HOST = [
  { type: 'host', value: '(www\\.)?howtoworkleads\\.com' },
];

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
  // NOTE (2026-06-08): in this npm-workspaces monorepo the @img/* native-binary
  // packages are hoisted to the ROOT node_modules, while sharp's JS resolves from
  // apps/web. Tracing only ./node_modules/@img missed the hoisted binaries, so the
  // lambda threw "Could not load the sharp module using the linux-x64 runtime" and
  // the featured-image webhook failed silently. Trace both locations.
  outputFileTracingIncludes: {
    '/api/generate-featured-image': [
      './node_modules/sharp/**/*',
      './node_modules/@img/**/*',
      '../../node_modules/sharp/**/*',
      '../../node_modules/@img/**/*',
    ],
    '/api/cron/weekly-content': [
      './node_modules/sharp/**/*',
      './node_modules/@img/**/*',
      '../../node_modules/sharp/**/*',
      '../../node_modules/@img/**/*',
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
      // /crm-systems/b2c-vs-b2b-crm used to be normalised here, on this host,
      // and then cross over — two hops. It is now a MERGE row in url-map.csv,
      // so the generated cross-host table below sends it straight to its final
      // URL in one. Rules above the cutover line win on first match, so this
      // one had to go for that to take effect.
      {
        source: '/crm-systems/operational-analytical-and-collaborative-crm',
        destination: '/crm-systems',
        permanent: true,
      },
      // 2026-06-05 — rescue an inbound ALS backlink that was placed with a typo'd
      // singular slug (buy-iul-lead → 404). 301 forwards the link equity to the
      // real IUL page. Source link on agedleadstore.com should also be corrected.
      {
        source: '/buying-leads/buy-iul-lead',
        destination: '/buying-leads/buy-iul-leads',
        permanent: true,
      },
      // 2026-06-05 — consolidate cron-generated near-duplicates (all 0 impressions
      // except the kept canonical) to concentrate authority and kill cannibalization.
      {
        source: '/blog/closing-techniques-internet-leads-10-methods-work',
        destination: '/blog/closing-techniques-internet-leads',
        permanent: true,
      },
      {
        source: '/blog/pipeline-management-framework-leads',
        destination: '/blog/pipeline-management-framework',
        permanent: true,
      },
      {
        source: '/blog/pipeline-management-framework-never-lose-track-lead',
        destination: '/blog/pipeline-management-framework',
        permanent: true,
      },
      {
        source: '/blog/lead-attribution-multi-touch-tracking',
        destination: '/blog/cross-channel-lead-attribution-tracking',
        permanent: true,
      },
      {
        source: '/blog/multi-vendor-lead-performance-dashboard',
        destination: '/blog/managing-multiple-lead-vendors',
        permanent: true,
      },
      // 2026-06-08 — word-order duplicate of buy-refinance-mortgage-leads (the
      // canonical that carries the optimized title/meta). Loser unpublished in Sanity.
      {
        source: '/buying-leads/buy-mortgage-refinance-leads',
        destination: '/buying-leads/buy-refinance-mortgage-leads',
        permanent: true,
      },
      // ─── CUTOVER 2026-08-03 ────────────────────────────────────────────────
      // howtoworkleads.com is retired into workagedleads.com. Everything above
      // this line runs FIRST and normalises the path on the old host — the
      // typo rescue, the near-duplicate consolidations — so the request that
      // crosses over is the corrected one. Keep these LAST.

      // The 52 rows whose path ALSO changes on the target (FOLD + MERGE).
      //
      // These must precede the catch-all: first match wins, and the catch-all
      // only preserves the path. Without them a folded URL crossed over to
      // workagedleads.com/<old path> and took a SECOND hop through that repo's
      // migrationRedirects() to reach its real destination — two hops from the
      // apex and three from www. Sending the final path from here makes it one.
      //
      // The `has` host guard matters: these paths only mean this on the
      // retiring host. Vercel preview URLs and localhost must not match.
      ...crossHost.pathChanges.map(({ source, destination }) => ({
        source,
        has: RETIRING_HOST,
        destination,
        permanent: true,
      })),

      // Path is preserved for everything else — MIGRATE and REHOST rows keep
      // their path, so the catch-all below is already a single hop for them.
      //
      // /api is deliberately excluded. A 301 turns a POST into a GET, so
      // redirecting the capture routes would silently drop a form submitted
      // from a page a visitor already had open — lost leads, no error anywhere.
      {
        source: '/',
        has: [{ type: 'host', value: '(www\\.)?howtoworkleads\\.com' }],
        destination: 'https://workagedleads.com/',
        permanent: true,
      },
      {
        source: '/:path((?!api$|api/).*)',
        has: [{ type: 'host', value: '(www\\.)?howtoworkleads\\.com' }],
        destination: 'https://workagedleads.com/:path',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
