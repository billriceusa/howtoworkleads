#!/usr/bin/env node
/**
 * Configure CORS origins for Sanity project
 * Run with: SANITY_API_TOKEN=your_token node scripts/configure-cors.js
 */

const https = require('https')

const PROJECT_ID = 'e9k38j42'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('Error: SANITY_API_TOKEN environment variable is required')
  console.error('Usage: SANITY_API_TOKEN=your_token node scripts/configure-cors.js')
  process.exit(1)
}

const CORS_ORIGINS = [
  { origin: 'http://localhost:3000', allowCredentials: true },
  { origin: 'https://howtoworkleads.com', allowCredentials: true },
  { origin: 'https://howtoworkleads.com', allowCredentials: true },
]

async function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.sanity.io',
      port: 443,
      path: `/v2021-06-07/projects/${PROJECT_ID}${path}`,
      method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    }

    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => body += chunk)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body ? JSON.parse(body) : {})
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`))
        }
      })
    })

    req.on('error', reject)
    if (data) req.write(JSON.stringify(data))
    req.end()
  })
}

async function getCurrentCors() {
  try {
    return await makeRequest('GET', '/cors')
  } catch (error) {
    console.error('Failed to get current CORS origins:', error.message)
    return []
  }
}

async function addCorsOrigin(origin, allowCredentials) {
  try {
    await makeRequest('POST', '/cors', { origin, allowCredentials })
    console.log(`✓ Added CORS origin: ${origin}`)
    return true
  } catch (error) {
    if (error.message.includes('already exists') || error.message.includes('409')) {
      console.log(`○ CORS origin already exists: ${origin}`)
      return true
    }
    console.error(`✗ Failed to add ${origin}:`, error.message)
    return false
  }
}

async function main() {
  console.log('Configuring CORS for Sanity project:', PROJECT_ID)
  console.log('')

  // Get current CORS origins
  const current = await getCurrentCors()
  console.log('Current CORS origins:', current.length ? current.map(c => c.origin).join(', ') : 'none')
  console.log('')

  // Add each origin
  for (const { origin, allowCredentials } of CORS_ORIGINS) {
    await addCorsOrigin(origin, allowCredentials)
  }

  console.log('')
  console.log('Done! Your website should now be able to fetch from Sanity.')
}

main().catch(console.error)
