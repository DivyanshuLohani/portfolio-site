import { getBlogPosts } from "@/lib/data";
import { projects } from "@/lib/projects";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
	const DOMAIN = "https://divyanshulohani.xyz";
	let blogPosts: Post[] = [];
	try {
		blogPosts = await getBlogPosts();
	} catch (error) {
		console.error("Error fetching blog posts for llm.txt:", error);
	}

	const projectsMarkdown = projects
		.map((p) => {
			const liveStr = p.liveUrl ? ` [Live](${p.liveUrl})` : "";
			const repoStr = p.url ? ` [Source](${p.url})` : "";
			return `- **${p.name}**: ${p.description}.${liveStr}${repoStr}`;
		})
		.join("\n");

	const blogPostsMarkdown =
		blogPosts.length > 0
			? blogPosts
					.map((post) => {
						const dateStr = post.published_at
							? new Date(post.published_at).toISOString().split("T")[0]
							: "";
						return `- [${post.title}](${DOMAIN}/posts/${post.slug}) (${dateStr}) - ${
							post.description || ""
						}`;
					})
					.join("\n")
			: "- No blog posts available.";

	const content = `# Divyanshu Lohani

> Fullstack Developer & Software Engineer
> Website: ${DOMAIN}

## About
Divyanshu Lohani is a freelance web developer and software engineer with extensive experience in both frontend and backend technologies. He specializes in building custom web applications using React, Next.js, TypeScript, Python, Django, Node.js, and modern databases.

## Quick Links
- [Portfolio](${DOMAIN})
- [Blog Posts](${DOMAIN}/posts)
- [RSS Feed](${DOMAIN}/rss.xml)
- [Sitemap](${DOMAIN}/sitemap.xml)
- [GitHub](https://github.com/DivyanshuLohani)
- [LinkedIn](https://www.linkedin.com/in/divyanshulohani/)
- [Twitter / X](https://x.com/DivyanshuLohani)

## Projects
${projectsMarkdown}

## Blog Posts
${blogPostsMarkdown}

## Technical Skills & Stack
- **Frontend**: React, Next.js, TypeScript, JavaScript, HTML/CSS, Tailwind CSS, Framer Motion
- **Backend**: Python, Django, Node.js, Express, Socket.io, WebSockets
- **Databases & Infrastructure**: PostgreSQL, MongoDB, Git, Bun, Docker, Vercel
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=86400",
		},
	});
}
