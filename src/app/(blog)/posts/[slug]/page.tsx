import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	getAdjacentBlogPosts,
	getBlogPost,
	getBlogPosts,
	getRelatedBlogPosts,
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
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: [post.social_image || post.cover_image],
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: { slug: string };
}) {
	const post = await getBlogPost(params.slug);

	if (!post) {
		return notFound();
	}

	const { prev, next } = await getAdjacentBlogPosts(params.slug);

	const relatedPosts = await getRelatedBlogPosts(params.slug, 2);

	return (
		<main className="min-h-screen">
			<article itemScope itemType="https://schema.org/Article">
				<div className="mx-auto max-w-3xl px-6 md:px-10">
					{/* Article header */}
					<header className="">
						{/* Category / date */}
						{post.cover_image && (
							<div
								className="
                relative
                mt-12
                border
                overflow-hidden
                border-white/10
                rounded-lg
                bg-white/[0.02]
              "
							>
								<Image
									src={post.cover_image}
									width={1600}
									height={900}
									alt={post.description || post.title}
									priority
									className="
                  h-auto
                  w-full
                  object-fit
                "
								/>
							</div>
						)}

						{/* Title */}
						<h1
							itemProp="headline"
							className="
                max-w-[1050px]
                mt-10
                text-3xl
                font-medium
                leading-[0.95]
                tracking-[-0.055em]
                text-white
                md:text-4xl
                lg:text-5xl
              "
						>
							{post.title}
						</h1>

						{/* Tags */}
						{post.tags && post.tags.length > 0 && (
							<div className="mt-8 flex flex-wrap gap-2">
								{post.tags.map((tag) => (
									<Link
										key={tag}
										href={`/posts?tag=${encodeURIComponent(tag)}`}
										className="
                      border
                      border-white/10
                      px-3
                      py-1.5
                      text-[9px]
                      uppercase
                      tracking-[0.1em]
                      text-white/35
                      transition-colors
                      hover:border-white/25
                      hover:text-white
                    "
									>
										#{tag}
									</Link>
								))}
							</div>
						)}

						{/* Author metadata */}
						<div
							className="
                mt-10
                flex
                flex-wrap
                items-center
                gap-x-4
                gap-y-3
                border-y
                border-white/10
                py-5
              "
						>
							{post.user?.profile_image && (
								<Image
									src={post.user.profile_image}
									width={32}
									height={32}
									alt={post.user.name || "Author"}
									className="h-8 w-8 rounded-full object-cover"
								/>
							)}

							<span className="text-sm text-white/65">
								{post.user?.name || "Divyanshu Lohani"}
							</span>

							<span className="h-1 w-1 rounded-full bg-white/20" />

							<time
								dateTime={post.published_at}
								className="text-sm text-white/35"
							>
								{formatDate(post.published_at)}
							</time>

							<span className="h-1 w-1 rounded-full bg-white/20" />

							<span className="text-sm text-white/35">
								{post.reading_time_minutes} min read
							</span>

							{post.user?.github_username && (
								<>
									<span className="h-1 w-1 rounded-full bg-white/20" />

									<a
										href={`https://github.com/${post.user.github_username}`}
										target="_blank"
										rel="noopener noreferrer"
										className="
                      text-sm
                      text-white/35
                      transition-colors
                      hover:text-white
                    "
									>
										GitHub
									</a>
								</>
							)}

							{post.user?.website_url && (
								<>
									<span className="h-1 w-1 rounded-full bg-white/20" />

									<a
										href={post.user.website_url}
										target="_blank"
										rel="noopener noreferrer"
										className="
                      text-sm
                      text-white/35
                      transition-colors
                      hover:text-white
                    "
									>
										Website
									</a>
								</>
							)}
						</div>
					</header>

					{/* Body */}
					<div className="mx-auto max-w-[820px]">
						<PostBody body_markdown={post.body_markdown} />

						{/* Previous / next */}
						{(prev || next) && (
							<nav
								aria-label="Post navigation"
								className="
                  mt-20
                  border-t
                  border-white/10
                  not-prose
                "
							>
								<div className="grid grid-cols-1 md:grid-cols-2">
									{prev ? (
										<Link
											href={`/posts/${prev.slug}`}
											className="
                        group
                        border-b
                        border-white/10
                        py-7
                        md:border-b-0
                        md:border-r
                        md:pr-8
                      "
										>
											<span
												className="
                          text-[9px]
                          uppercase
                          tracking-[0.14em]
                          text-white/25
                        "
											>
												← Previous
											</span>

											<h3
												className="
                          mt-3
                          text-lg
                          leading-snug
                          tracking-[-0.025em]
                          text-white/70
                          transition-colors
                          group-hover:text-white
                        "
											>
												{prev.title}
											</h3>
										</Link>
									) : (
										<div />
									)}

									{next && (
										<Link
											href={`/posts/${next.slug}`}
											className="
                        group
                        py-7
                        md:pl-8
                        md:text-right
                      "
										>
											<span
												className="
                          text-[9px]
                          uppercase
                          tracking-[0.14em]
                          text-white/25
                        "
											>
												Next →
											</span>

											<h3
												className="
                          mt-3
                          text-lg
                          leading-snug
                          tracking-[-0.025em]
                          text-white/70
                          transition-colors
                          group-hover:text-white
                        "
											>
												{next.title}
											</h3>
										</Link>
									)}
								</div>
							</nav>
						)}

						{/* Related */}
						{relatedPosts.length > 0 && (
							<section
								className="
                  mt-20
                  border-t
                  border-white/10
                  pt-8
                  not-prose
                "
							>
								<div className="mb-8 flex items-baseline justify-between">
									<h2
										className="
                      text-[10px]
                      uppercase
                      tracking-[0.16em]
                      text-white/30
                    "
									>
										Related writing
									</h2>

									<Link
										href="/posts"
										className="
                      text-[10px]
                      uppercase
                      tracking-[0.14em]
                      text-white/25
                      hover:text-white
                      flex
                      items-center
                    "
									>
										All articles <ArrowUpRight
											size={20}
											strokeWidth={1.5}
										/>{" "}
									</Link>
								</div>

								<div className="border-t border-white/10">
									{relatedPosts.map((related) => (
										<Link
											key={related.slug}
											href={`/posts/${related.slug}`}
											className="
                        group
                        grid
                        grid-cols-[100px_1fr_25px]
                        items-center
                        gap-5
                        border-b
                        border-white/10
                        py-6
                        transition-all
                        hover:bg-white/[0.02]
                        hover:px-3
                      "
										>
											<span className="text-[10px] uppercase tracking-[0.08em] text-white/25">
												{related.readable_publish_date ||
													formatDate(related.published_at)}
											</span>

											<span className="text-lg tracking-[-0.025em] text-white/65 transition-colors group-hover:text-white">
												{related.title.length > 50
													? related.title.slice(0, 50) + "..."
													: related.title}
											</span>

											<span className="text-white/20 transition-all group-hover:translate-x-1 group-hover:text-white/70">
												<ArrowUpRight size={20} strokeWidth={1.5} />
											</span>
										</Link>
									))}
								</div>
							</section>
						)}

						<div className="h-24 md:h-32" />
					</div>
				</div>
			</article>
		</main>
	);
}
