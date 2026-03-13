/**
 * Generate favicon files from the SVG icon.
 * Usage: npx tsx scripts/generate-favicon.ts
 */
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const publicDir = path.resolve(__dirname, '../apps/web/public')
const svgPath = path.join(publicDir, 'icon.svg')

async function main() {
  const svg = fs.readFileSync(svgPath)

  // favicon.ico (32x32 PNG — browsers accept PNG as .ico)
  await sharp(svg)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'))
  console.log('Created favicon.ico (32x32)')

  // favicon-16x16.png
  await sharp(svg)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'))
  console.log('Created favicon-16x16.png')

  // favicon-32x32.png
  await sharp(svg)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'))
  console.log('Created favicon-32x32.png')

  // apple-touch-icon.png (180x180)
  await sharp(svg)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'))
  console.log('Created apple-touch-icon.png (180x180)')

  // og-default.jpg (1200x630 branded default OG image)
  const ogSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#1A1A1A"/>
    <rect x="0" y="0" width="1200" height="8" fill="#FFD500"/>
    <text x="600" y="280" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#fff" text-anchor="middle">How To Work Leads</text>
    <text x="600" y="350" font-family="Arial, sans-serif" font-size="28" fill="#FFD500" text-anchor="middle">Master the Art of Converting Internet Leads</text>
    <text x="600" y="520" font-family="Arial, sans-serif" font-size="20" fill="#999" text-anchor="middle">www.howtoworkleads.com</text>
  </svg>`)

  await sharp(ogSvg)
    .resize(1200, 630)
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'og-default.jpg'))
  console.log('Created og-default.jpg (1200x630)')

  console.log('\nDone!')
}

main().catch(console.error)
