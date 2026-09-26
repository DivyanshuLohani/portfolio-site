import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import {
	getBlogPost,
	getAdjacentBlogPosts,
	getRelatedBlogPosts,
	getBlogPosts,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";
import PostBody from "./components/PostBody";

export async function generateStaticParams() {
	const posts = await getBlogPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}) {
	const post = await getBlogPost(params.slug);
	if (!post) {
		notFound();
	}

	return {
		title: post.title,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			url: post.canonical_url || post.url,
			type: "article",
			publishedTime: post.published_at,
			modifiedTime: post.edited_at || post.published_at,
			images: [
				{
					url: post.social_image || post.cover_image,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: post.description,
			title: post.title,
			description: post.description,
			images: [post.social_image || post.cover_image],
		},
	};
}

export default async function page({ params }: { params: { slug: string } }) {
	const post = await getBlogPost(params.slug);
	if (!post) return notFound();

	const { prev, next } = await getAdjacentBlogPosts(params.slug);
	const relatedPosts = await getRelatedBlogPosts(params.slug, 2);

	return (
		<div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-5 backdrop-blur-sm">
			<article
				className="prose prose-gray max-w-3xl mx-auto prose-invert"
				itemType="article"
			>
				{post.cover_image && (
					<Image
						src={post.cover_image}
						width={1600}
						height={900}
						alt={post.description || post.title}
						className="w-full object-contain rounded-md"
					/>
				)}
				<header className="mb-12">
					<h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 text-white">
						{post.title}
					</h1>

					{/* Tags */}
					{post.tags && post.tags.length > 0 && (
						<div className="flex gap-2 flex-wrap mb-4 not-prose">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="px-3 py-1.5 text-sm rounded-full border border-white/20 text-white/70"
								>
									#{tag}
								</span>
							))}
						</div>
					)}

					{/* Meta Information & Author */}
					<div className="flex items-center gap-4 text-sm text-white/60 border-y border-white/10 py-3 not-prose">
						{post.user?.profile_image && (
							<Image
								src={post.user.profile_image}
								width={40}
								height={40}
								alt={post.user.name}
								className="rounded-full object-cover"
							/>
						)}
						<div className="flex items-center gap-3 flex-wrap">
							<span className="font-medium text-white/80">
								{post.user?.name || "Divyanshu Lohani"}
							</span>
							<span className="w-1 h-1 rounded-full bg-white/40" />
							<time>{formatDate(post.published_at)}</time>
							<span className="w-1 h-1 rounded-full bg-white/40" />
							<span>{post.reading_time_minutes} min read</span>
							{post.user?.twitter_username && (
								<>
									<span className="w-1 h-1 rounded-full bg-white/40" />
									<a
										href={`https://twitter.com/${post.user.twitter_username}`}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-white/90 transition-colors"
									>
										@{post.user.twitter_username}
									</a>
								</>
							)}
							{post.user?.github_username && (
								<>
									<span className="w-1 h-1 rounded-full bg-white/40" />
									<a
										href={`https://github.com/${post.user.github_username}`}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-white/90 transition-colors"
									>
										{post.user.github_username}
									</a>
								</>
							)}
							{post.user?.website_url && (
								<>
									<span className="w-1 h-1 rounded-full bg-white/40" />
									<a
										href={post.user.website_url}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-white/90 transition-colors"
									>
										Website
									</a>
								</>
							)}
						</div>
					</div>
				</header>

				<PostBody body_markdown={post.body_markdown} />

				{/* Adjacent Post Navigation (Prev / Next) */}
				{(prev || next) && (
					<nav
						aria-label="Post navigation"
						className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose"
					>
						{prev ? (
							<Link
								href={`/posts/${prev.slug}`}
								className="group p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col items-start gap-1 text-left"
							>
								<span className="text-[11px] uppercase tracking-wider text-white/40 group-hover:text-sky-400/80 transition-colors">
									← Previous Article
								</span>
								<span className="text-sm font-medium text-white/90 group-hover:text-white line-clamp-2">
									{prev.title}
								</span>
							</Link>
						) : (
							<div className="hidden sm:block" />
						)}

						{next ? (
							<Link
								href={`/posts/${next.slug}`}
								className="group p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col items-end gap-1 text-right sm:col-start-2"
							>
								<span className="text-[11px] uppercase tracking-wider text-white/40 group-hover:text-sky-400/80 transition-colors">
									Next Article →
								</span>
								<span className="text-sm font-medium text-white/90 group-hover:text-white line-clamp-2">
									{next.title}
								</span>
							</Link>
						) : null}
					</nav>
				)}

				{/* Related Posts */}
				{relatedPosts.length > 0 && (
					<section className="mt-12 pt-8 border-t border-white/10 not-prose">
						<h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 font-semibold">
							Related Articles
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{relatedPosts.map((rPost) => (
								<Link
									key={rPost.slug}
									href={`/posts/${rPost.slug}`}
									className="group p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col justify-between gap-3"
								>
									<div>
										<span className="text-[10px] uppercase tracking-wider text-sky-400/70 block mb-1">
											{rPost.readable_publish_date || formatDate(rPost.published_at)}
										</span>
										<h4 className="text-sm font-medium text-white/90 group-hover:text-white line-clamp-2">
											{rPost.title}
										</h4>
									</div>
									<span className="text-[11px] text-white/40 group-hover:text-white/70 transition-colors">
										Read article →
									</span>
								</Link>
							))}
						</div>
					</section>
				)}
			</article>
		</div>
	);
}
