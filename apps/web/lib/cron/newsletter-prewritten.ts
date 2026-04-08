import { promises as fs } from "fs";
import path from "path";
import { NEWSLETTER_CALENDAR } from "@/data/newsletter-calendar";
import type { NewsletterContent } from "./newsletter-ai";

/**
 * Check if a pre-written newsletter issue exists for a given send date.
 * Returns the issue filename (e.g., "issue-04.md") or null.
 */
export function getPrewrittenIssueForDate(
  sendDate: string
): { filename: string; week: number } | null {
  // The calendar maps weeks 1-8 to issue-01 through issue-08
  const calendarEntry = NEWSLETTER_CALENDAR.find(
    (entry) => entry.sendDate === sendDate
  );

  if (!calendarEntry || calendarEntry.week > 8) return null;

  const filename = `issue-${String(calendarEntry.week).padStart(2, "0")}.md`;
  return { filename, week: calendarEntry.week };
}

/**
 * Read the raw markdown from a pre-written newsletter issue file.
 * Tries multiple filesystem paths, then falls back to fetching from GitHub.
 * Returns null if the file can't be found anywhere.
 */
export async function readPrewrittenMarkdown(
  filename: string
): Promise<string | null> {
  // Try multiple possible paths (monorepo root, cwd-relative, up-directories)
  const candidatePaths = [
    path.join(process.cwd(), "newsletters", filename),
    path.join(process.cwd(), "..", "newsletters", filename),
    path.join(process.cwd(), "..", "..", "newsletters", filename),
  ];

  for (const filePath of candidatePaths) {
    try {
      const content = await fs.readFile(filePath, "utf-8");
      console.log(`[Newsletter] Found pre-written file at ${filePath}`);
      return content;
    } catch {
      // Try next path
    }
  }

  // Fallback: fetch from GitHub if env vars are set
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (token && repo) {
    try {
      const url = `https://api.github.com/repos/${repo}/contents/newsletters/${filename}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3.raw",
        },
      });
      if (res.ok) {
        const content = await res.text();
        console.log(`[Newsletter] Fetched pre-written file from GitHub`);
        return content;
      }
    } catch {
      // Fall through
    }
  }

  return null;
}

/**
 * Read and parse a pre-written newsletter markdown file into NewsletterContent.
 * Returns null if the file doesn't exist.
 */
export async function loadPrewrittenNewsletter(
  filename: string,
  siteUrl: string,
  weekLabel: string
): Promise<{ content: NewsletterContent; rawMarkdown: string } | null> {
  const markdown = await readPrewrittenMarkdown(filename);
  if (!markdown) return null;

  const content = parseNewsletterMarkdown(markdown, siteUrl, weekLabel);
  return { content, rawMarkdown: markdown };
}

/**
 * Parse newsletter markdown into the NewsletterContent structure.
 *
 * Expected format:
 * ```
 * # The Aged Lead Playbook — Issue #N
 * **Subject:** Subject line here
 * **From:** ...
 * **Send Date:** ...
 * ---
 * ## THIS WEEK'S PLAY: ...
 * ...body...
 * ## THE DATA
 * ...
 * ## FROM THE BLOG
 * ...
 * ## THE STACK
 * ...
 * ## YOUR FIRST MOVE
 * ...
 * ## READY TO PUT THIS INTO PRACTICE?
 * ...
 * ```
 */
function parseNewsletterMarkdown(
  markdown: string,
  siteUrl: string,
  weekLabel: string
): NewsletterContent {
  // Extract subject line
  const subjectMatch = markdown.match(/\*\*Subject:\*\*\s*(.+)/);
  const subject = subjectMatch?.[1]?.trim() || "The Aged Lead Playbook";

  // Split into sections by ## headings
  const sections = splitByHeadings(markdown);

  // Extract each section
  const playSection = sections.find((s) =>
    s.heading.toUpperCase().includes("THIS WEEK")
  );
  const dataSection = sections.find((s) =>
    s.heading.toUpperCase().includes("THE DATA")
  );
  const blogSection = sections.find((s) =>
    s.heading.toUpperCase().includes("FROM THE BLOG")
  );
  const stackSection = sections.find((s) =>
    s.heading.toUpperCase().includes("THE STACK")
  );
  const firstMoveSection = sections.find((s) =>
    s.heading.toUpperCase().includes("YOUR FIRST MOVE")
  );
  const ctaSection = sections.find((s) =>
    s.heading.toUpperCase().includes("READY TO PUT THIS")
  );

  // Build personalIntro from the play section (first 2-3 paragraphs)
  const playBody = playSection?.body || "";
  const playParagraphs = playBody
    .split("\n\n")
    .filter((p) => p.trim().length > 0);
  const personalIntro =
    playParagraphs.slice(0, 3).join("\n\n") ||
    "Welcome to this week's issue of The Aged Lead Playbook.";

  // Build quick tips from THE STACK section
  const quickTips = parseStackSection(stackSection?.body || "");

  // Build industry insight from THE DATA section
  const industryInsight = parseDataSection(dataSection?.body || "");

  // Build featured article from FROM THE BLOG section
  const featuredArticle = parseBlogSection(blogSection?.body || "", siteUrl);

  // Build weekly digest (empty for pre-written — blog links are in featured)
  const weeklyDigest: NewsletterContent["weeklyDigest"] = [];

  // Preview text: first ~90 chars of the play section
  const previewText =
    playParagraphs[0]?.replace(/\*\*/g, "").substring(0, 90).trim() ||
    subject.substring(0, 90);

  // CTA from YOUR FIRST MOVE or READY TO PUT THIS INTO PRACTICE
  const ctaBody = firstMoveSection?.body || ctaSection?.body || "";
  const ctaLinkMatch = ctaBody.match(
    /\[([^\]]+)\]\(([^)]+)\)/
  );
  const ctaText = ctaLinkMatch?.[1] || "Browse Aged Leads by Vertical";
  const ctaUrl =
    ctaLinkMatch?.[2] ||
    `${siteUrl}/guides?utm_source=newsletter&utm_medium=email&utm_campaign=weekly&utm_content=${weekLabel}`;

  // Closing note from the play section (last paragraph) or a default
  const closingParagraph = playParagraphs[playParagraphs.length - 1] || "";
  const closingNote =
    closingParagraph.length > 200
      ? "Put this week's strategies to work — the math is on your side."
      : closingParagraph.replace(/\*\*/g, "") ||
        "Put this week's strategies to work — the math is on your side.";

  return {
    subject,
    previewText,
    personalIntro,
    featuredArticle,
    quickTips,
    industryInsight,
    weeklyDigest,
    closingNote,
    ctaText,
    ctaUrl,
  };
}

interface Section {
  heading: string;
  body: string;
}

function splitByHeadings(markdown: string): Section[] {
  const sections: Section[] = [];
  // Split on ## headings (but not # top-level)
  const parts = markdown.split(/^## /m);

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const newlineIndex = part.indexOf("\n");
    if (newlineIndex === -1) {
      sections.push({ heading: part.trim(), body: "" });
    } else {
      const heading = part.substring(0, newlineIndex).trim();
      const body = part
        .substring(newlineIndex + 1)
        .replace(/^---\s*$/m, "")
        .trim();
      sections.push({ heading, body });
    }
  }

  return sections;
}

function parseStackSection(
  body: string
): NewsletterContent["quickTips"] {
  if (!body) {
    return [
      {
        title: "Weekly Insight",
        body: "Check out this week's full issue for actionable tips.",
      },
    ];
  }

  const tips: NewsletterContent["quickTips"] = [];
  // Stack items are formatted as: - **Label:** Content
  const bulletPattern = /- \*\*([^*]+)\*\*[:\s]*(.+)/g;
  let match;

  while ((match = bulletPattern.exec(body)) !== null) {
    const title = match[1].trim().replace(/:$/, "");
    // Strip markdown links but keep text
    const tipBody = match[2]
      .trim()
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    tips.push({ title, body: tipBody });
  }

  if (tips.length === 0) {
    // Fallback: split by list items
    const lines = body
      .split("\n")
      .filter((l) => l.trim().startsWith("-"));
    for (const line of lines.slice(0, 3)) {
      tips.push({
        title: "Tip",
        body: line
          .replace(/^-\s*/, "")
          .replace(/\*\*/g, "")
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
      });
    }
  }

  return tips.length > 0
    ? tips
    : [
        {
          title: "Weekly Insight",
          body: "Check out this week's full issue for actionable tips.",
        },
      ];
}

function parseDataSection(
  body: string
): NewsletterContent["industryInsight"] {
  if (!body) {
    return {
      headline: "Industry Data",
      body: "See this week's issue for the latest industry data and trends.",
    };
  }

  // Try to extract the bold intro line as headline
  const boldMatch = body.match(/\*\*([^*]+)\*\*/);
  const headline = boldMatch
    ? boldMatch[1].trim().replace(/:$/, "")
    : "Industry Data This Week";

  // Use the full section body, stripped of markdown formatting
  const cleanBody = body
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\|[^\n]+\|/g, "") // remove table rows
    .replace(/^[-|:\s]+$/gm, "") // remove table separators
    .split("\n")
    .filter((l) => l.trim().length > 0)
    .slice(0, 5)
    .join(" ")
    .trim();

  return {
    headline,
    body:
      cleanBody ||
      "See this week's issue for the latest industry data and trends.",
  };
}

function parseBlogSection(
  body: string,
  siteUrl: string
): NewsletterContent["featuredArticle"] {
  if (!body) {
    return {
      title: "This Week on the Blog",
      slug: "blog",
      spotlight:
        "Visit howtoworkleads.com/blog for this week's latest articles.",
    };
  }

  // Extract the linked blog post title and URL
  const linkMatch = body.match(/\[([^\]]+)\]\(([^)]+)\)/);
  const title = linkMatch?.[1] || "This Week on the Blog";
  const url = linkMatch?.[2] || "";

  // Try to extract slug from URL
  const slugMatch = url.match(/\/blog\/([^?]+)/);
  const slug = slugMatch?.[1] || "blog";

  // The rest of the body is the spotlight
  const spotlight = body
    .replace(/\*\*\[.*?\]\(.*?\)\*\*/, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "")
    .split("\n")
    .filter((l) => l.trim().length > 0)
    .join(" ")
    .trim();

  return {
    title,
    slug,
    spotlight:
      spotlight ||
      "Read the full article on howtoworkleads.com for the complete breakdown.",
  };
}

/**
 * Convert markdown to simple HTML for email rendering.
 * Handles: bold, links, lists, paragraphs, tables, horizontal rules.
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Remove the metadata header (everything before first ---)
  const firstHrIndex = html.indexOf("---");
  if (firstHrIndex !== -1) {
    html = html.substring(firstHrIndex + 3).trim();
  }

  // Convert ## headings to styled h2
  html = html.replace(
    /^## (.+)$/gm,
    '<h2 style="margin: 24px 0 12px 0; font-size: 18px; color: #1e40af; font-weight: 700;">$1</h2>'
  );

  // Convert bold
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Convert italic
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Convert links (auto-append UTM params to howtoworkleads.com links missing them)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match: string, text: string, url: string) => {
      let href = url
      if (href.includes('howtoworkleads.com') && !href.includes('utm_source')) {
        const sep = href.includes('?') ? '&' : '?'
        href = `${href}${sep}utm_source=newsletter&utm_medium=email&utm_campaign=aged-lead-playbook`
      }
      return `<a href="${href}" style="color: #1e40af; text-decoration: underline;">${text}</a>`
    }
  );

  // Convert markdown tables to HTML tables
  html = html.replace(
    /(\|.+\|\n)((?:\|[-:\s|]+\|\n))((?:\|.+\|\n?)+)/g,
    (_match, headerRow: string, _separator: string, bodyRows: string) => {
      const headers = headerRow
        .split("|")
        .filter((c: string) => c.trim())
        .map(
          (c: string) =>
            `<th style="padding: 8px 12px; text-align: left; border-bottom: 2px solid #e5e7eb; font-weight: 700;">${c.trim()}</th>`
        )
        .join("");

      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row: string) => {
          const cells = row
            .split("|")
            .filter((c: string) => c.trim())
            .map(
              (c: string) =>
                `<td style="padding: 8px 12px; border-bottom: 1px solid #f3f4f6;">${c.trim()}</td>`
            )
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");

      return `<table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    }
  );

  // Convert unordered lists
  html = html.replace(
    /((?:^- .+\n?)+)/gm,
    (_match: string, listBlock: string) => {
      const items = listBlock
        .trim()
        .split("\n")
        .map((line: string) => {
          const content = line.replace(/^- /, "").trim();
          return `<li style="margin-bottom: 6px; line-height: 1.6;">${content}</li>`;
        })
        .join("");
      return `<ul style="margin: 12px 0; padding-left: 20px;">${items}</ul>`;
    }
  );

  // Convert horizontal rules
  html = html.replace(
    /^---$/gm,
    '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">'
  );

  // Convert paragraphs (double newlines)
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      // Don't wrap blocks that are already HTML elements
      if (
        trimmed.startsWith("<h2") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<p")
      ) {
        return trimmed;
      }
      return `<p style="margin: 0 0 16px 0; line-height: 1.7; color: #374151; font-size: 15px;">${trimmed.replace(/\n/g, "<br>")}</p>`;
    })
    .filter(Boolean)
    .join("\n");

  return html;
}
