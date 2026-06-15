// Plain-node (no deps) markdown -> branded HTML for the gated PDF. Chrome prints it.
import fs from 'fs'

const WT = '/Users/billrice/Code/sites/brsg/owned/howtoworkleads.com/.claude/worktrees/content-session'
const md = fs.readFileSync(`${WT}/content-briefs/97-real-time-lead-team-CONTENT.md`, 'utf-8')
const CHART_DIR = `file://${WT}/scripts/charts/out`

const CAPTIONS = {} // captions come from markers

function inline(s) {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/—/g, '&mdash;')
}

let body = md
  .replace(/^# .+\n+/, '')
  .replace(/^> \*\*Sanity CMS Fields\*\*\n(?:> .*\n?)*/m, '')
  .replace(/^##\s*\[ARTICLE CONTENT BEGINS\]\s*$/m, '')
  .replace(/---\n+## Internal Linking Checklist[\s\S]*$/, '')
  .replace(/## Frequently Asked Questions[\s\S]*?(?=\n## |\n$)/, '') // FAQ handled separately below if desired
  .trim()

const lines = body.split('\n')
let html = ''
let i = 0
let listType = null
const closeList = () => { if (listType) { html += `</${listType}>\n`; listType = null } }

while (i < lines.length) {
  const line = lines[i]
  const t = line.trim()
  if (t === '') { closeList(); i++; continue }
  if (t === '---') { closeList(); i++; continue }
  // chart
  const cm = t.match(/^\[\[CHART:([\w-]+)\|([\s\S]+)\]\]$/)
  if (cm) { closeList(); html += `<figure><img src="${CHART_DIR}/${cm[1]}.png"><figcaption>${inline(cm[2].trim())}</figcaption></figure>\n`; i++; continue }
  // table
  if (t.startsWith('|')) {
    closeList()
    const tl = []
    while (i < lines.length && lines[i].trim().startsWith('|')) { tl.push(lines[i].trim()); i++ }
    const cells = (row) => row.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length).map(c => c.replace(/\*\*/g, ''))
    const head = tl[0].split('|').slice(1, -1).map(c => c.trim().replace(/\*\*/g, ''))
    html += '<table><thead><tr>' + head.map(h => `<th>${inline(h)}</th>`).join('') + '</tr></thead><tbody>'
    for (let r = 2; r < tl.length; r++) {
      const row = tl[r].split('|').slice(1, -1).map(c => c.trim().replace(/\*\*/g, ''))
      html += '<tr>' + row.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>'
    }
    html += '</tbody></table>\n'; continue
  }
  let m
  if ((m = t.match(/^#### (.+)/))) { closeList(); html += `<h4>${inline(m[1])}</h4>\n`; i++; continue }
  if ((m = t.match(/^### (.+)/))) { closeList(); html += `<h3>${inline(m[1])}</h3>\n`; i++; continue }
  if ((m = t.match(/^## (.+)/))) { closeList(); html += `<h2>${inline(m[1])}</h2>\n`; i++; continue }
  if (t.startsWith('> ')) {
    closeList(); const q = []
    while (i < lines.length && lines[i].trim().startsWith('>')) { q.push(lines[i].trim().replace(/^>\s?/, '')); i++ }
    html += `<blockquote>${inline(q.join(' '))}</blockquote>\n`; continue
  }
  if ((m = t.match(/^[-*]\s+(.+)/))) { if (listType !== 'ul') { closeList(); html += '<ul>\n'; listType = 'ul' } html += `<li>${inline(m[1])}</li>\n`; i++; continue }
  if ((m = t.match(/^\d+\.\s+(.+)/))) { if (listType !== 'ol') { closeList(); html += '<ol>\n'; listType = 'ol' } html += `<li>${inline(m[1])}</li>\n`; i++; continue }
  closeList(); html += `<p>${inline(t)}</p>\n`; i++
}
closeList()

const out = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@page { size: letter; margin: 22mm 18mm; }
* { box-sizing: border-box; }
body { font-family: Georgia, 'Times New Roman', serif; color: #1A1A1A; font-size: 11.5pt; line-height: 1.62; margin: 0; }
.cover { page-break-after: always; padding-top: 60mm; border-left: 10px solid #FFD500; padding-left: 14px; }
.cover .kicker { font-family: Arial, sans-serif; font-size: 11pt; letter-spacing: 2px; text-transform: uppercase; color: #9097A0; }
.cover h1 { font-family: Arial, sans-serif; font-size: 34pt; line-height: 1.1; margin: 14px 0 18px; letter-spacing: -0.5px; }
.cover .sub { font-size: 13pt; color: #444; max-width: 150mm; }
.cover .meta { margin-top: 26mm; font-family: Arial, sans-serif; font-size: 11pt; color: #555; }
.cover .brand { font-weight: 800; color: #1A1A1A; }
.cover .brand span { color: #C9A800; }
h2 { font-family: Arial, sans-serif; font-size: 17pt; margin: 22px 0 8px; padding-top: 6px; border-top: 2px solid #FFD500; }
h3 { font-family: Arial, sans-serif; font-size: 13pt; margin: 16px 0 6px; }
h4 { font-family: Arial, sans-serif; font-size: 11.5pt; margin: 12px 0 4px; }
p { margin: 0 0 9px; }
a { color: #1A1A1A; text-decoration: underline; }
ul, ol { margin: 0 0 10px; padding-left: 20px; }
li { margin: 0 0 4px; }
blockquote { margin: 12px 0; padding: 10px 14px; background: #FBF7E0; border-left: 4px solid #FFD500; font-family: Arial, sans-serif; font-size: 10.5pt; }
figure { margin: 14px 0; page-break-inside: avoid; }
figure img { width: 100%; border: 1px solid #EAEAEA; }
figcaption { font-family: Arial, sans-serif; font-size: 8.5pt; color: #6B7280; margin-top: 4px; }
table { width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 8.8pt; margin: 12px 0; page-break-inside: avoid; }
th { background: #1A1A1A; color: #fff; text-align: left; padding: 6px 8px; }
td { border-bottom: 1px solid #E5E5E5; padding: 6px 8px; vertical-align: top; }
</style></head><body>
<div class="cover">
  <div class="kicker">HowToWorkLeads.com &middot; Research Report</div>
  <h1>How to Build a Real-Time Internet Lead Team</h1>
  <div class="sub">A sales director's research-backed operating system for converting real-time internet leads in mortgage, insurance, solar, and education.</div>
  <div class="meta">By Bill Rice &nbsp;|&nbsp; 2026 &nbsp;|&nbsp; <span class="brand">howtoworkleads<span>.com</span></span></div>
</div>
${html}
</body></html>`

fs.writeFileSync(`${WT}/scripts/pdf/print.html`, out)
console.log('wrote print.html', out.length, 'bytes')
