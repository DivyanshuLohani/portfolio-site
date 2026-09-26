import BlogSection from "@/components/blog/BlogSection";
import { getBlogPosts } from "@/lib/data";

export default async function BlogPage() {
	const posts = await getBlogPosts();

	return <BlogSection posts={posts} />;
}
