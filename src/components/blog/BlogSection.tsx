"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon, SearchIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Post } from "@/lib/types";

interface BlogSectionProps {
	posts: Post[];
}

interface PagefindResultData {
	url: string;
	excerpt: string;
	meta: {
		title: string;
		description?: string;
		slug?: string;
		image?: string;
		published_at?: string;
		tags?: string;
	};
}

interface PagefindSearchResult {
	id: string;
	data: () => Promise<PagefindResultData>;
}

interface PagefindInstance {
	init?: () => Promise<void>;
	search: (query: string) => Promise<{ results: PagefindSearchResult[] }>;
}

function formatDate(date: string | Date) {
	const value = new Date(date);

	return value
		.toLocaleDateString("en-US", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		})
		.toUpperCase();
}

export default function BlogSection({ posts }: BlogSectionProps) {
	const [search, setSearch] = useState("");
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [pagefind, setPagefind] = useState<PagefindInstance | null>(null);
	const [isSearching, setIsSearching] = useState(false);
	const [pagefindResults, setPagefindResults] = useState<
		{ slug: string; excerpt?: string }[] | null
	>(null);

	// Load Pagefind search engine client-side
	useEffect(() => {
		let mounted = true;
		async function initPagefind() {
			try {
				// @ts-expect-error - dynamic import of static pagefind bundle from public directory
				const pf = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js");
				if (mounted && pf) {
					if (typeof pf.init === "function") {
						await pf.init();
					}
					setPagefind(pf);
				}
			} catch {
				// Pagefind static bundle might be loading or offline
			}
		}

		initPagefind();
		return () => {
			mounted = false;
		};
	}, []);

	// Query Pagefind when search text changes
	useEffect(() => {
		const query = search.trim();
		if (!query) {
			setPagefindResults(null);
			setIsSearching(false);
			return;
		}

		let active = true;

		if (pagefind) {
			setIsSearching(true);
			pagefind
				.search(query)
				.then(async (response) => {
					if (!active) return;
					const dataList = await Promise.all(
						response.results.slice(0, 30).map((r) => r.data())
					);
					if (!active) return;
					const mapped = dataList.map((d) => {
						const slug =
							d.meta?.slug ||
							d.url.replace(/^\/posts\//, "").replace(/\/$/, "");
						return {
							slug,
							excerpt: d.excerpt,
						};
					});
					setPagefindResults(mapped);
					setIsSearching(false);
				})
				.catch(() => {
					if (active) {
						setPagefindResults(null);
						setIsSearching(false);
					}
				});
		} else {
			setPagefindResults(null);
		}

		return () => {
			active = false;
		};
	}, [search, pagefind]);

	/*
	 * Collect only tags that appear in more than one article.
	 */
	const tags = useMemo(() => {
		const tagCounts = new Map<string, number>();

		for (const post of posts) {
			const postTags = new Set(post.tags ?? []);
			for (const tag of postTags) {
				if (tag) {
					tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
				}
			}
		}

		return Array.from(tagCounts.entries())
			.filter(([, count]) => count > 1)
			.map(([tag]) => tag)
			.sort((a, b) => a.localeCompare(b));
	}, [posts]);

	/*
	 * Filter and rank posts based on Pagefind search (or fallback) + selected tag.
	 */
	const filteredPosts = useMemo(() => {
		const query = search.trim().toLowerCase();
		let resultList: (Post & { searchExcerpt?: string })[] = [];

		if (pagefindResults !== null) {
			// Pagefind full-content search results (ranked by relevance)
			const postMap = new Map(posts.map((p) => [p.slug, p]));
			for (const item of pagefindResults) {
				// Exact slug match or fallback search
				let post = postMap.get(item.slug);
				if (!post) {
					post = posts.find(
						(p) =>
							p.slug.toLowerCase() === item.slug.toLowerCase() ||
							p.slug.toLowerCase().startsWith(`${item.slug.toLowerCase()}-`)
					);
				}
				if (post) {
					resultList.push({ ...post, searchExcerpt: item.excerpt });
				}
			}
		} else if (query) {
			// In-memory fallback across title, description, tags, and body content
			resultList = posts.filter((post) => {
				const inTitle = post.title?.toLowerCase().includes(query);
				const inDesc = post.description?.toLowerCase().includes(query);
				const inTags = post.tags?.some((tag) =>
					tag.toLowerCase().includes(query)
				);
				const inBody = post.body_markdown?.toLowerCase().includes(query);
				return inTitle || inDesc || inTags || inBody;
			});
		} else {
			resultList = [...posts];
		}

		// Filter by tag if selected
		if (selectedTag) {
			resultList = resultList.filter((post) =>
				post.tags?.some(
					(t) => t.toLowerCase() === selectedTag.toLowerCase()
				)
			);
		}

		return resultList;
	}, [posts, search, selectedTag, pagefindResults]);

	return (
		<main className="min-h-screen">
			<div className="mx-auto max-w-[1180px] px-6 md:px-10">
				{/* Header */}
				<motion.header
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="
            border-b
            border-white/10
            pb-12
            md:pb-16
          "
				>
					<div className="flex items-end justify-between gap-8">
						<div>
							<h1
								className="
                  text-6xl
                  font-medium
                  leading-[0.9]
                  tracking-[-0.055em]
                  md:text-8xl
                "
							>
								Writing
							</h1>
						</div>

						<span
							className="
                hidden
                text-[10px]
                uppercase
                tracking-[0.15em]
                text-white/25
                md:block
              "
						>
							{posts.length} {posts.length === 1 ? "Post" : "Posts"}
						</span>
					</div>

					<p
						className="
              mt-8
              max-w-xl
              text-sm
              leading-6
              text-white/40
              md:text-base
            "
					>
						Notes on things I build, problems I run into, engineering
						experiments, and whatever else survives the process.
					</p>
				</motion.header>

				{/* Search + filters */}
				<section className="border-b border-white/10 py-8">
					{/* Search Input with Pagefind */}
					<div className="relative flex items-center">
						<SearchIcon className="pointer-events-none absolute left-0 h-5 w-5 text-white/30" />

						<input
							type="text"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder="Search article content, tags, or topics..."
							className="
                w-full
                border-none
                bg-transparent
                py-3
                pl-8
                pr-8
                text-lg
                text-white
                outline-none
                placeholder:text-white/25
              "
						/>

						{isSearching && (
							<Loader2Icon className="absolute right-0 h-4 w-4 animate-spin text-sky-400" />
						)}
					</div>

					{/* Tags */}
					{tags.length > 0 && (
						<div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
							<button
								onClick={() => setSelectedTag(null)}
								className={`
                  text-[10px]
                  uppercase
                  tracking-[0.12em]
                  transition-colors
                  ${
										selectedTag === null
											? "text-white"
											: "text-white/30 hover:text-white/70"
									}
                `}
							>
								All
							</button>

							{tags.map((tag) => (
								<button
									key={tag}
									onClick={() =>
										setSelectedTag(selectedTag === tag ? null : tag)
									}
									className={`
                    text-[10px]
                    uppercase
                    tracking-[0.12em]
                    transition-colors
                    ${
											selectedTag === tag
												? "text-white"
												: "text-white/30 hover:text-white/70"
										}
                  `}
								>
									{tag}
								</button>
							))}
						</div>
					)}
				</section>

				{/* Results metadata */}
				<section>
					<div className="flex items-center justify-between py-6">
						<span
							className="
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-white/25
              "
						>
							{filteredPosts.length}{" "}
							{filteredPosts.length === 1 ? "article" : "articles"}
							{pagefindResults !== null && " · Indexed by Pagefind"}
						</span>

						{(search || selectedTag) && (
							<button
								onClick={() => {
									setSearch("");
									setSelectedTag(null);
								}}
								className="
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-white/30
                  transition-colors
                  hover:text-white
                "
							>
								Clear filters
							</button>
						)}
					</div>

					{/* Article list */}
					<div className="border-t border-white/10">
						{filteredPosts.map((post, index) => (
							<motion.article
								key={post.slug}
								initial={{ opacity: 0, y: 12 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{
									once: true,
									amount: 0.1,
								}}
								transition={{
									duration: 0.4,
									delay: Math.min(index * 0.04, 0.2),
								}}
							>
								<Link
									href={`/posts/${post.slug}`}
									className="
                    group
                    block
                    border-b
                    border-white/10
                    py-8
                    transition-all
                    duration-300
                    hover:bg-white/[0.02]
                    hover:px-4
                  "
								>
									<div
										className="
                      grid
                      grid-cols-1
                      gap-5
                      md:grid-cols-[110px_1fr_40px]
                      md:gap-8
                    "
									>
										{/* Date */}
										<div>
											<span
												className="
                          text-[10px]
                          uppercase
                          tracking-[0.08em]
                          text-white/30
                        "
											>
												{formatDate(post.published_at)}
											</span>
										</div>

										{/* Content */}
										<div>
											<h2
												className="
                          max-w-3xl
                          text-2xl
                          font-normal
                          leading-tight
                          tracking-[-0.03em]
                          text-white/90
                          transition-colors
                          group-hover:text-white
                          md:text-3xl
                        "
											>
												{post.title}
											</h2>

											{/* Search Excerpt from Pagefind or fallback description */}
											{post.searchExcerpt ? (
												<p
													className="
                            mt-3
                            max-w-2xl
                            text-sm
                            leading-6
                            text-white/50
                            [&_mark]:rounded
                            [&_mark]:bg-sky-500/25
                            [&_mark]:px-1
                            [&_mark]:py-0.5
                            [&_mark]:text-sky-300
                          "
													dangerouslySetInnerHTML={{
														__html: post.searchExcerpt,
													}}
												/>
											) : (
												(post.description || post.excerpt) && (
													<p
														className="
                              mt-3
                              max-w-2xl
                              text-sm
                              leading-6
                              text-white/35
                            "
													>
														{post.description || post.excerpt}
													</p>
												)
											)}

											{/* Tags */}
											{post.tags && post.tags.length > 0 && (
												<div className="mt-5 flex flex-wrap gap-2">
													{post.tags.map((tag) => (
														<span
															key={tag}
															className="
                                border
                                border-white/10
                                px-2.5
                                py-1
                                text-[9px]
                                uppercase
                                tracking-[0.08em]
                                text-white/30
                              "
														>
															{tag}
														</span>
													))}
												</div>
											)}

											{/* Reading time */}
											{post.readingTime && (
												<span
													className="
                            mt-5
                            block
                            text-[10px]
                            uppercase
                            tracking-[0.1em]
                            text-white/20
                          "
												>
													{post.readingTime}
												</span>
											)}
										</div>

										{/* Arrow */}
										<span
											className="
                        hidden
                        text-lg
                        text-white/20
                        transition-all
                        duration-200
                        group-hover:translate-x-1
                        group-hover:text-white/70
                        md:block
                      "
										>
											<ArrowUpRightIcon className="h-5 w-5" />
										</span>
									</div>
								</Link>
							</motion.article>
						))}
					</div>

					{/* Empty state */}
					{filteredPosts.length === 0 && (
						<div
							className="
                border-b
                border-white/10
                py-24
                text-center
              "
						>
							<p className="text-lg text-white/50">No articles found.</p>

							<p className="mt-2 text-sm text-white/25">
								Apparently nothing here matched your search query.
							</p>

							<button
								onClick={() => {
									setSearch("");
									setSelectedTag(null);
								}}
								className="
                  mt-6
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-white/40
                  hover:text-white
                "
							>
								Clear filters
							</button>
						</div>
					)}
				</section>
			</div>
		</main>
	);
}
