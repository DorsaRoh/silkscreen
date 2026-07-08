// Pulls new image posts from r/Hiddenpcbeggs so they show up here
// automatically. Reddit's JSON API 403s server-side traffic; the Atom
// feed doesn't, so we parse that.

import type { Board } from "./boards";

const FEED = "https://www.reddit.com/r/Hiddenpcbeggs/new.rss";

// Feed posts to keep out of the gallery, matched by exact title.
const HIDDEN_TITLES = new Set([
  "Old 486 HDD",
  "Don't pry.",
  "Friendly reminder on a 1998 Terratec soundcard",
]);

function unescapeXml(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

// A stable key for a post: the comment id from a reddit permalink, or the
// i.redd.it filename. Used to dedupe feed posts against curated boards.
export function postKeys(link?: string): string[] {
  if (!link) return [];
  const keys: string[] = [];
  const comment = link.match(/\/comments\/([a-z0-9]+)/i);
  if (comment) keys.push(comment[1]);
  const media = link.match(/(?:i|preview)\.redd\.it\/(?:.*-)?([a-z0-9]+)\.\w+/i);
  if (media) keys.push(media[1]);
  return keys;
}

// Reddit rate-limits aggressively (429s); keep the last good result so a
// failed refresh degrades to slightly stale instead of empty.
let lastGood: Board[] = [];

export async function fetchRedditBoards(): Promise<Board[]> {
  let xml: string;
  try {
    const res = await fetch(FEED, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) silkscreen-gallery/1.0",
      },
      next: { revalidate: 1800 },
    });
    if (!res.ok) return lastGood;
    xml = await res.text();
  } catch {
    return lastGood;
  }

  const out: Board[] = [];
  for (const entry of xml.split("<entry>").slice(1)) {
    const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const link = entry.match(/<link href="([^"]+)"/)?.[1];
    const author = entry.match(/<name>\/u\/([^<]+)<\/name>/)?.[1];
    const content = unescapeXml(
      entry.match(/<content[^>]*>([\s\S]*?)<\/content>/)?.[1] ?? ""
    );
    const image = content.match(
      /href="(https:\/\/(?:i|preview)\.redd\.it\/[^"]+?\.(?:jpe?g|png|webp)[^"]*)"/i
    )?.[1];
    if (!title || !link || !image) continue;
    if (HIDDEN_TITLES.has(unescapeXml(title))) continue;
    out.push({
      image,
      message: unescapeXml(title),
      credit: author ? `found by u/${author} on r/Hiddenpcbeggs` : undefined,
      link,
    });
  }
  if (out.length) lastGood = out;
  return out.length ? out : lastGood;
}
