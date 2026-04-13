import { createClient } from "next-sanity";
import type { GeneratedArticle } from "./types";
import { sectionsToPortableText } from "./ai-content";

function getSanityWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId || !token) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN"
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: "2026-03-14",
    token,
    useCdn: false,
  });
}

function randomKey(): string {
  return Math.random().toString(36).slice(2, 10);
}

function ref(id: string) {
  return { _type: "reference", _ref: id, _key: randomKey() };
}

const PILLAR_CATEGORY_SLUG: Record<string, string> = {
  "Lead Management": "lead-management",
  "Sales Process": "sales-process",
  "CRM Systems": "crm-systems",
  "Buying Leads": "buying-leads",
  "Industry Strategies": "lead-management",
};

const AUTHOR_SLUG = "bill-rice";
const FALLBACK_CATEGORY_SLUG = "lead-management";

async function resolveCategoryId(
  client: ReturnType<typeof getSanityWriteClient>,
  pillar: string
): Promise<string> {
  const slug = PILLAR_CATEGORY_SLUG[pillar] || FALLBACK_CATEGORY_SLUG;
  const id = await client.fetch<string | null>(
    `*[_type == "categoryPage" && slug.current == $slug][0]._id`,
    { slug }
  );
  if (!id) {
    throw new Error(
      `No categoryPage found for slug "${slug}" (pillar "${pillar}")`
    );
  }
  return id;
}

async function resolveAuthorId(
  client: ReturnType<typeof getSanityWriteClient>
): Promise<string> {
  const id = await client.fetch<string | null>(
    `*[_type == "author" && slug.current == $slug][0]._id`,
    { slug: AUTHOR_SLUG }
  );
  if (!id) {
    throw new Error(`No author found for slug "${AUTHOR_SLUG}"`);
  }
  return id;
}

export async function getExistingPostSlugs(): Promise<string[]> {
  const client = getSanityWriteClient();
  const posts = await client.fetch<{ slug: string }[]>(
    `*[_type == "blogPost"]{ "slug": slug.current }`
  );
  return posts.map((p) => p.slug);
}

export async function publishArticle(
  article: GeneratedArticle
): Promise<{ id: string; slug: string }> {
  const client = getSanityWriteClient();
  const postId = `blogPost-${article.brief.slug}`;

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "blogPost" && _id == $id][0]{ _id }`,
    { id: postId }
  );
  if (existing) {
    console.log(`Post already exists: ${postId}, skipping`);
    return { id: postId, slug: article.brief.slug };
  }

  const [categoryId, authorId] = await Promise.all([
    resolveCategoryId(client, article.brief.pillar),
    resolveAuthorId(client),
  ]);

  const publishedAt = new Date(
    article.brief.publishDate + "T09:00:00Z"
  ).toISOString();

  const doc = {
    _id: postId,
    _type: "blogPost" as const,
    title: article.brief.title,
    slug: { _type: "slug" as const, current: article.brief.slug },
    excerpt: article.excerpt,
    publishedAt,
    updatedAt: publishedAt,
    contentType: article.contentType,
    isFeatured: false,
    author: ref(authorId),
    categories: [ref(categoryId)],
    seo: {
      metaTitle: article.seoTitle,
      metaDescription: article.seoDescription,
    },
    content: sectionsToPortableText(article.sections),
  };

  await client.createOrReplace(doc);
  console.log(`Published: ${article.brief.title}`);

  return { id: postId, slug: article.brief.slug };
}
