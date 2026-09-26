"use client";

import { motion } from "framer-motion";
import type { Post } from "@/lib/types";
import BlogItem from "./BlogItem";

interface BlogPostItem {
	title: string;
	date: string;
	href: string;
}

interface BlogSectionProps {
	posts?: Post[];
}

function formatDate(dateString: string | Date) {
	const value = new Date(dateString);
	return value
		.toLocaleDateString("en-US", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		})
		.toUpperCase();
}

export default function BlogSection({ posts }: BlogSectionProps) {
	const displayPosts: BlogPostItem[] =
		posts && posts.length > 0
			? posts.slice(0, 3).map((p) => ({
					title: p.title,
					date: formatDate(p.published_at),
					href: `/posts/${p.slug}`,
			  }))
			: [
					{
						title:
							"How I Built My Own Linktree Clone and Accidentally Found a CSS Injection",
						date: "15 JUN 2026",
						href: "/posts/how-building-my-own-linktree-clone-led-me-to-a-css-injection-discovery-1g8p",
					},
					{
						title:
							"The Hidden Cost of AI Agents: Tracing Tokens, Tool Calls, and Retries in TypeScript",
						date: "03 JUN 2026",
						href: "/posts/the-hidden-cost-of-ai-agents-tracing-tokens-tool-calls-and-retries-in-typescript",
					},
					{
						title: "System Design Is Overrated (When You're a Beginner)",
						date: "25 APR 2026",
						href: "/posts/system-design-is-overrated-when-youre-a-beginner",
					},
			  ];

	return (
		<section id="writing" className="py-24 md:py-32">
			<div className="max-w-[1180px] mx-auto px-6 md:px-10">
				{/* Section header */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="
            flex
            flex-col
            md:flex-row
            md:items-baseline
            md:justify-between
            gap-4
            mb-14
            md:mb-16
          "
				>
					<h2
						className="
              text-4xl
              md:text-5xl
              font-medium
              tracking-[-0.045em]
              leading-none
            "
					>
						Writing
					</h2>
				</motion.div>

				{/* Blog list */}
				<div className="border-t border-white/10">
					{displayPosts.map((post, index) => (
						<BlogItem
							key={post.href}
							index={index + 1}
							title={post.title}
							date={post.date}
							href={post.href}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
