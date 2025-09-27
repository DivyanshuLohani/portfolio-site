import { getBlogPosts } from "@/lib/data";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

// Root domain - replace with your actual domain
const DOMAIN = "https://divyanshulohani.xyz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts for dynamic routes
  const blogPosts = await getBlogPosts();

  // Static routes with their last modified date
  const staticRoutes = [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${DOMAIN}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ] as MetadataRoute.Sitemap;

  // Dynamic routes for blog posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${DOMAIN}/blogs/${post.slug}`,
    lastModified: new Date(post.published_at), // Using publishedDate instead of updatedAt
    changeFrequency: "monthly",
    priority: 0.7,
  })) as MetadataRoute.Sitemap;
  // Combine static and dynamic routes
  return [...staticRoutes, ...blogRoutes];
}
