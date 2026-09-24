import { siteConfig } from "@/data/site";
import { listPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

function escape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function GET() {
  const posts = await listPublishedPosts();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      return `<item>
        <title>${escape(post.title)}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${(post.publishedAt ?? post.createdAt).toUTCString()}</pubDate>
        <description>${escape(post.excerpt)}</description>
      </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(siteConfig.name)} — Journal</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escape(siteConfig.description)}</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate",
    },
  });
}
