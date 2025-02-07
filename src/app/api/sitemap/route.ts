import { getBlogPosts } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://divyanshulohani.xyz";
  const posts = await getBlogPosts();

  const staticLinks = [
    { href: "/projects", updatedAt: "2025-02-01" },
    { href: "/experience", updatedAt: "2025-02-01" },
    { href: "/posts", updatedAt: "2025-02-01" },
    { href: "/songs", updatedAt: "2025-02-01" },
    { href: "/about", updatedAt: "2025-02-01" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

    ${staticLinks
      .map(
        (link) => `
    <url>
      <loc>${baseUrl}${link.href}</loc>
      <lastmod>${link.updatedAt}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    `
      )
      .join("")}


    ${posts
      .map(
        (post) => `
    <url>
      <loc>${baseUrl}/blog/${post.slug}</loc>
      <lastmod>${post.published_at}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `
      )
      .join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
