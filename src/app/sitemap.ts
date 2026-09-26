import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

// Root domain - replace with your actual domain
const DOMAIN = "https://dibbu.dev";

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
			url: `${DOMAIN}/posts`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${DOMAIN}/rss.xml`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.8,
		},
		{
			url: `${DOMAIN}/llm.txt`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${DOMAIN}/robots.txt`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.3,
		},
	] as MetadataRoute.Sitemap;

	// Dynamic routes for blog posts
	const blogRoutes = blogPosts.map((post) => ({
		url: `${DOMAIN}/posts/${post.slug}`,
		lastModified: new Date(post.published_at), // Using publishedDate instead of updatedAt
		changeFrequency: "monthly",
		priority: 0.7,
	})) as MetadataRoute.Sitemap;
	// Combine static and dynamic routes
	return [...staticRoutes, ...blogRoutes];
}
