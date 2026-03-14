/**
 * Scan all blog posts for frontmatter leaked into content blocks and remove them.
 * Usage: node scripts/cleanup-frontmatter.mjs [--dry-run]
 */

const TOKEN = 'skis2pqTY12KO007aXXT1RQs8p5MYNYIW1LNYj593TEpl2KUKqkL9KAvcISd72ljeb1jbYFqT5LMeEjjm';
const PROJECT = 'e9k38j42';
const DATASET = 'production';
const QUERY_API = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/${DATASET}`;
const MUTATE_API = `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;

const FRONTMATTER_PATTERN = /^(slug|seo_title|meta_description|excerpt|category|title|date|author|tags|layout|published|draft|image|description|permalink):\s/i;

const dryRun = process.argv.includes('--dry-run');

async function main() {
  // Fetch all blog posts with their content
  const query = encodeURIComponent('*[_type == "blogPost"]{ _id, title, slug, content }');
  const res = await fetch(`${QUERY_API}?query=${query}`, {
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  });
  const { result: posts } = await res.json();

  console.log(`Found ${posts.length} blog posts`);

  let affected = 0;
  const mutations = [];

  for (const post of posts) {
    if (!post.content || !Array.isArray(post.content)) continue;

    const frontmatterBlocks = post.content.filter((block) => {
      if (block._type !== 'block') return false;
      const text = (block.children || [])
        .filter((c) => c._type === 'span')
        .map((c) => c.text || '')
        .join('')
        .trim();
      return FRONTMATTER_PATTERN.test(text);
    });

    if (frontmatterBlocks.length > 0) {
      affected++;
      const removedTexts = frontmatterBlocks.map((b) =>
        (b.children || []).map((c) => c.text || '').join('').trim()
      );
      console.log(`\n[AFFECTED] "${post.title}" (${post._id})`);
      console.log(`  Slug: ${post.slug?.current}`);
      console.log(`  Frontmatter blocks to remove (${frontmatterBlocks.length}):`);
      removedTexts.forEach((t) => console.log(`    - ${t}`));

      const cleanContent = post.content.filter((block) => {
        if (block._type !== 'block') return true;
        const text = (block.children || [])
          .filter((c) => c._type === 'span')
          .map((c) => c.text || '')
          .join('')
          .trim();
        return !FRONTMATTER_PATTERN.test(text);
      });

      mutations.push({
        patch: {
          id: post._id,
          set: { content: cleanContent }
        }
      });
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`Total posts: ${posts.length}`);
  console.log(`Affected posts: ${affected}`);

  if (affected === 0) {
    console.log('No cleanup needed!');
    return;
  }

  if (dryRun) {
    console.log('\n[DRY RUN] No changes made. Run without --dry-run to apply fixes.');
    return;
  }

  console.log(`\nApplying ${mutations.length} patches...`);
  const patchRes = await fetch(MUTATE_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations })
  });
  const patchResult = await patchRes.json();
  if (patchResult.error) {
    console.error('Error:', patchResult.error);
    process.exit(1);
  }
  console.log(`Successfully cleaned ${affected} posts.`);
}

main().catch(console.error);
