import { createClient } from "next-sanity";
import type { GeneratedArticle } from "./types";
import { sectionsToPortableText } from "./ai-content";
import { notifyIndexNow } from "@/lib/indexnow";

function getSanityWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = (process.env.SANITY_API_TOKEN || "").trim();

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

export type ExistingPost = { id: string; slug: string; title: string };

export async function getExistingPosts(): Promise<ExistingPost[]> {
  const client = getSanityWriteClient();
  return client.fetch<ExistingPost[]>(
    `*[_type == "blogPost"]{ "id": _id, "slug": slug.current, title }`
  );
}

export async function getExistingPostSlugs(): Promise<string[]> {
  const posts = await getExistingPosts();
  return posts.map((p) => p.slug);
}

const TITLE_STOP_WORDS = new Set([
  "the","a","an","and","or","but","for","of","to","in","on","at","by","with",
  "is","are","be","how","what","your","you","this","that","from","as","it",
  "2024","2025","2026","guide","complete","ultimate","beginner","beginners",
  "lead","leads","work",
]);

function normalizeTitleTokens(title: string): Set<string> {
  const normalized = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return new Set(
    normalized
      .split(" ")
      .filter((w) => w.length > 2 && !TITLE_STOP_WORDS.has(w))
  );
}

export function titleSimilarity(a: string, b: string): number {
  const ta = normalizeTitleTokens(a);
  const tb = normalizeTitleTokens(b);
  if (ta.size === 0 || tb.size === 0) return 0;
  let shared = 0;
  ta.forEach((t) => {
    if (tb.has(t)) shared++;
  });
  const union = new Set<string>();
  ta.forEach((t) => union.add(t));
  tb.forEach((t) => union.add(t));
  return shared / union.size;
}

export function findSimilarPost(
  title: string,
  existing: ExistingPost[],
  threshold = 0.7
): ExistingPost | null {
  for (const p of existing) {
    if (titleSimilarity(title, p.title) >= threshold) return p;
  }
  return null;
}

export type PublishOutcome =
  | { status: "created"; id: string; slug: string }
  | { status: "skipped"; id: string; slug: string; reason: string };

export async function publishArticle(
  article: GeneratedArticle,
  existingPosts?: ExistingPost[]
): Promise<PublishOutcome> {
  const client = getSanityWriteClient();
  const postId = `blogPost-${article.brief.slug}`;
  const posts = existingPosts ?? (await getExistingPosts());

  const idMatch = posts.find((p) => p.id === postId);
  if (idMatch) {
    return {
      status: "skipped",
      id: postId,
      slug: article.brief.slug,
      reason: `ID already exists: ${postId}`,
    };
  }

  const slugMatch = posts.find((p) => p.slug === article.brief.slug);
  if (slugMatch) {
    return {
      status: "skipped",
      id: postId,
      slug: article.brief.slug,
      reason: `Slug already used by post "${slugMatch.title}" (${slugMatch.id})`,
    };
  }

  const similar = findSimilarPost(article.brief.title, posts);
  if (similar) {
    return {
      status: "skipped",
      id: postId,
      slug: article.brief.slug,
      reason: `Title too similar to existing post "${similar.title}" (${similar.slug})`,
    };
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

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://howtoworkleads.com";
  await notifyIndexNow(`${siteUrl}/blog/${article.brief.slug}`);

  return { status: "created", id: postId, slug: article.brief.slug };
}
