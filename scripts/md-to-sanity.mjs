/**
 * Convert markdown to Sanity Portable Text blocks and patch a document.
 * Usage: node scripts/md-to-sanity.mjs <markdown-file> <document-id>
 */
import { readFileSync } from 'fs';
import { randomBytes } from 'crypto';

const TOKEN = 'skis2pqTY12KO007aXXT1RQs8p5MYNYIW1LNYj593TEpl2KUKqkL9KAvcISd72ljeb1jbYFqT5LMeEjjm';
const PROJECT = 'e9k38j42';
const DATASET = 'production';
const API = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;

function key() {
  return randomBytes(6).toString('hex');
}

function span(text, marks = []) {
  return { _type: 'span', _key: key(), text, marks };
}

function block(style, children, extra = {}) {
  return { _type: 'block', _key: key(), style, markDefs: [], children, ...extra };
}

/**
 * Parse inline markdown (bold, italic, links) into spans
 */
function parseInline(text, markDefs = []) {
  const spans = [];
  let remaining = text;

  // Process bold, italic, and links
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(remaining)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      spans.push(span(remaining.slice(lastIndex, match.index)));
    }

    if (match[2]) {
      // Bold: **text**
      spans.push(span(match[2], ['strong']));
    } else if (match[3]) {
      // Italic: *text*
      spans.push(span(match[3], ['em']));
    } else if (match[4] && match[5]) {
      // Link: [text](url)
      const linkKey = key();
      markDefs.push({ _type: 'link', _key: linkKey, href: match[5] });
      spans.push(span(match[4], ['strong', linkKey]));
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < remaining.length) {
    spans.push(span(remaining.slice(lastIndex)));
  }

  if (spans.length === 0) {
    spans.push(span(text));
  }

  return { spans, markDefs };
}

function convertMarkdownToBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let i = 0;
  let inBlockquote = false;
  let blockquoteLines = [];

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      // Flush blockquote if we were in one
      if (inBlockquote && blockquoteLines.length > 0) {
        const text = blockquoteLines.join(' ').trim();
        const { spans, markDefs } = parseInline(text);
        blocks.push({ _type: 'block', _key: key(), style: 'blockquote', markDefs, children: spans });
        blockquoteLines = [];
        inBlockquote = false;
      }
      i++;
      continue;
    }

    // Skip HR lines
    if (line.trim() === '---') {
      i++;
      continue;
    }

    // Skip pipe tables (we'll insert comparisonTable objects separately)
    if (line.trim().startsWith('|')) {
      i++;
      continue;
    }

    // Headings
    const h2Match = line.match(/^## (.+)/);
    const h3Match = line.match(/^### (.+)/);

    if (h2Match) {
      const { spans, markDefs } = parseInline(h2Match[1]);
      blocks.push({ _type: 'block', _key: key(), style: 'h2', markDefs, children: spans });
      i++;
      continue;
    }

    if (h3Match) {
      const { spans, markDefs } = parseInline(h3Match[1]);
      blocks.push({ _type: 'block', _key: key(), style: 'h3', markDefs, children: spans });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ') || line.startsWith('>')) {
      const quoteLine = line.replace(/^>\s?/, '');
      if (!inBlockquote) {
        inBlockquote = true;
        blockquoteLines = [];
      }
      blockquoteLines.push(quoteLine);
      i++;
      continue;
    } else if (inBlockquote) {
      // Flush blockquote
      const text = blockquoteLines.join(' ').trim();
      const { spans, markDefs } = parseInline(text);
      blocks.push({ _type: 'block', _key: key(), style: 'blockquote', markDefs, children: spans });
      blockquoteLines = [];
      inBlockquote = false;
      // Don't increment - process current line
      continue;
    }

    // Bullet list
    const bulletMatch = line.match(/^- (.+)/);
    if (bulletMatch) {
      const { spans, markDefs } = parseInline(bulletMatch[1]);
      blocks.push({ _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs, children: spans });
      i++;
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^\d+\.\s+(.+)/);
    if (numMatch) {
      const { spans, markDefs } = parseInline(numMatch[1]);
      blocks.push({ _type: 'block', _key: key(), style: 'normal', listItem: 'number', level: 1, markDefs, children: spans });
      i++;
      continue;
    }

    // Normal paragraph
    const { spans, markDefs } = parseInline(line.trim());
    blocks.push({ _type: 'block', _key: key(), style: 'normal', markDefs, children: spans });
    i++;
  }

  // Flush remaining blockquote
  if (inBlockquote && blockquoteLines.length > 0) {
    const text = blockquoteLines.join(' ').trim();
    const { spans, markDefs } = parseInline(text);
    blocks.push({ _type: 'block', _key: key(), style: 'blockquote', markDefs, children: spans });
  }

  return blocks;
}

// Main
const [mdFile, docId] = process.argv.slice(2);
if (!mdFile || !docId) {
  console.error('Usage: node scripts/md-to-sanity.mjs <markdown-file> <document-id>');
  process.exit(1);
}

const markdown = readFileSync(mdFile, 'utf-8');

// Strip YAML frontmatter, title line (H1), and trailing checklist/metadata sections
const cleanMd = markdown
  .replace(/^---\n[\s\S]*?\n---\n+/, '') // Remove YAML frontmatter block
  .replace(/^# .+\n+/, '') // Remove H1 title
  .replace(/---\n+## Internal Linking Checklist[\s\S]*$/, '') // Remove checklist section
  .replace(/---\n+## Structured Data Needed[\s\S]*$/, '') // Remove structured data section
  .trim();

const blocks = convertMarkdownToBlocks(cleanMd);
console.log(`Generated ${blocks.length} blocks`);

// Patch the document
const response = await fetch(API, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mutations: [{
      patch: {
        id: docId,
        set: { content: blocks }
      }
    }]
  })
});

const result = await response.json();
if (result.error) {
  console.error('Error:', result.error);
  process.exit(1);
}
console.log('Success:', JSON.stringify(result.results));
