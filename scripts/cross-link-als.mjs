/**
 * One-shot: add editorial cross-links from HTWL → AgedLeadSales.
 * Idempotent — checks for the link before inserting, so re-running is a no-op.
 *
 * Run: node scripts/cross-link-als.mjs
 *
 * Edits:
 *   1. categoryPage /buying-leads — append a sentence with a Markdown link
 *      anchored on "current market pricing benchmarks" → /price-index.
 *   2. landingPage  /buying-leads/buy-mortgage-leads — extend the opening
 *      paragraph with a transitional clause linking
 *      "what mortgage leads cost in 2026" → /price-index/mortgage.
 */

import { config as loadEnv } from "dotenv";
loadEnv({ path: "apps/web/.env.local" });
loadEnv();
import { createClient } from "@sanity/client";

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim();
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();
const token = (
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_WRITE_TOKEN ||
  ""
).trim();

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const BUYING_LEADS_LINK_TEXT = "current market pricing benchmarks";
const BUYING_LEADS_LINK_URL = "https://agedleadsales.com/price-index";
const BUYING_LEADS_APPENDED = `Start with [${BUYING_LEADS_LINK_TEXT}](${BUYING_LEADS_LINK_URL}) to know what you should be paying before you buy.`;

const MORTGAGE_LINK_TEXT = "what mortgage leads cost in 2026";
const MORTGAGE_LINK_URL = "https://agedleadsales.com/price-index/mortgage";
const MORTGAGE_INTRO_TEXT = " Before you spend a dollar, check ";
const MORTGAGE_OUTRO_TEXT = " so you can benchmark whatever the vendor quotes you.";

async function patchBuyingLeadsCategory() {
  const doc = await client.fetch(
    `*[_type == "categoryPage" && slug.current == "buying-leads"][0]{ _id, description }`
  );
  if (!doc) {
    console.warn("[skip] /buying-leads categoryPage not found");
    return;
  }

  const current = doc.description || "";
  if (current.includes(BUYING_LEADS_LINK_URL)) {
    console.log("[ok ] /buying-leads — link already present");
    return;
  }

  const next =
    current.trimEnd().length > 0
      ? `${current.trimEnd()} ${BUYING_LEADS_APPENDED}`
      : BUYING_LEADS_APPENDED;

  await client.patch(doc._id).set({ description: next }).commit();
  console.log(`[edit] /buying-leads — appended Markdown link: "${BUYING_LEADS_LINK_TEXT}"`);
}

async function patchBuyMortgageLeadsLanding() {
  const doc = await client.fetch(
    `*[_type == "landingPage" && slug.current == "buy-mortgage-leads"][0]{ _id, content }`
  );
  if (!doc) {
    console.warn("[skip] /buying-leads/buy-mortgage-leads landingPage not found");
    return;
  }

  // Idempotency check: scan all Portable Text spans and markDefs for the URL.
  const haystack = JSON.stringify(doc.content || []);
  if (haystack.includes(MORTGAGE_LINK_URL)) {
    console.log("[ok ] /buying-leads/buy-mortgage-leads — link already present");
    return;
  }

  // Find the first contentBlock and the first 'block' inside it.
  const blocks = Array.isArray(doc.content) ? doc.content : [];
  const firstContentBlockIdx = blocks.findIndex((b) => b._type === "contentBlock");
  if (firstContentBlockIdx === -1) {
    console.warn("[skip] no contentBlock found in landingPage");
    return;
  }
  const contentBlock = blocks[firstContentBlockIdx];
  const innerBlocks = Array.isArray(contentBlock.content) ? contentBlock.content : [];
  const firstBlockIdx = innerBlocks.findIndex((b) => b._type === "block");
  if (firstBlockIdx === -1) {
    console.warn("[skip] no portable-text block found inside first contentBlock");
    return;
  }

  const block = innerBlocks[firstBlockIdx];
  const markKey = `als-mortgage-pricing-${Date.now().toString(36)}`;

  const introSpan = {
    _key: `${markKey}-intro`,
    _type: "span",
    marks: [],
    text: MORTGAGE_INTRO_TEXT,
  };
  const linkSpan = {
    _key: `${markKey}-link`,
    _type: "span",
    marks: [markKey],
    text: MORTGAGE_LINK_TEXT,
  };
  const outroSpan = {
    _key: `${markKey}-outro`,
    _type: "span",
    marks: [],
    text: MORTGAGE_OUTRO_TEXT,
  };
  const linkMarkDef = {
    _key: markKey,
    _type: "link",
    href: MORTGAGE_LINK_URL,
    openInNewTab: false,
  };

  const updatedBlock = {
    ...block,
    children: [...(block.children || []), introSpan, linkSpan, outroSpan],
    markDefs: [...(block.markDefs || []), linkMarkDef],
  };

  const updatedInner = innerBlocks.map((b, i) =>
    i === firstBlockIdx ? updatedBlock : b
  );
  const updatedContentBlock = { ...contentBlock, content: updatedInner };
  const updatedTopLevel = blocks.map((b, i) =>
    i === firstContentBlockIdx ? updatedContentBlock : b
  );

  await client.patch(doc._id).set({ content: updatedTopLevel }).commit();
  console.log(
    `[edit] /buying-leads/buy-mortgage-leads — extended opening paragraph with link: "${MORTGAGE_LINK_TEXT}"`
  );
}

async function main() {
  console.log(`HTWL → ALS cross-linker → project=${projectId} dataset=${dataset}`);
  await patchBuyingLeadsCategory();
  await patchBuyMortgageLeadsLanding();
  console.log("✅ done");
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
