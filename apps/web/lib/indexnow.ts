const INDEXNOW_KEY = "a46e202cd2b18ece4502302fa6f4bde7";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://howtoworkleads.com";

/**
 * Notify IndexNow (Bing, Yandex, Naver) about new or updated URLs.
 * Call this after publishing or updating content.
 */
export async function notifyIndexNow(urls: string | string[]): Promise<void> {
  const urlList = Array.isArray(urls) ? urls : [urls];

  if (urlList.length === 0) return;

  try {
    const host = new URL(SITE_URL).host;

    if (urlList.length === 1) {
      const params = new URLSearchParams({
        url: urlList[0],
        key: INDEXNOW_KEY,
      });
      await fetch(`https://api.indexnow.org/IndexNow?${params}`, {
        method: "GET",
      });
    } else {
      await fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host,
          key: INDEXNOW_KEY,
          keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
          urlList,
        }),
      });
    }
  } catch (error) {
    // IndexNow failures should never block publishing
    console.error("[IndexNow] Notification failed:", error);
  }
}
