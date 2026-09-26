import { getBlogPosts } from "@/lib/data";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

const DOMAIN = "https://divyanshulohani.xyz";

function escapeXml(str: string): string {
	if (!str) return "";
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export async function GET() {
	let posts: Post[] = [];
	try {
		posts = await getBlogPosts();
	} catch (error) {
		console.error("Error fetching blog posts for RSS feed:", error);
	}

	const itemsXml = posts
		.map((post) => {
			const postUrl = `${DOMAIN}/posts/${post.slug}`;
			const pubDate = post.published_at
				? new Date(post.published_at).toUTCString()
				: new Date().toUTCString();
			const description = post.description || post.title || "";
			const categoriesXml = Array.isArray(post.tags)
				? post.tags
						.map((t: string) => `      <category>${escapeXml(t)}</category>`)
						.join("\n")
				: "";

			return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
${categoriesXml ? categoriesXml + "\n" : ""}    </item>`;
		})
		.join("\n");

	const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Divyanshu Lohani</title>
    <link>${DOMAIN}</link>
    <description>Divyanshu Lohani - Fullstack Developer &amp; Software Developer Blog and Updates</description>
    <language>en-us</language>
    <atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

	return new Response(rssXml, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "s-maxage=3600, stale-while-revalidate",
		},
	});
}
