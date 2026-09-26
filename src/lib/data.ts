"use server";

import blogPostsData from "../../blog.json";
import type { Post } from "./types";

const posts: Post[] = (blogPostsData as unknown as Post[]) || [];

function normalizeSlug(slug: string): string {
	return slug
		.toLowerCase()
		.trim()
		.replace(/-[a-z0-9]{4,6}$/, "");
}

function findPostIndexAndItem(slugOrId: string | number): {
	index: number;
	post: Post | null;
} {
	if (!posts.length) return { index: -1, post: null };

	const idNum = typeof slugOrId === "number" ? slugOrId : Number(slugOrId);
	const hasValidId = !Number.isNaN(idNum) && typeof slugOrId === "number";

	if (hasValidId) {
		const idx = posts.findIndex((p) => p.id === idNum);
		if (idx !== -1) return { index: idx, post: posts[idx] };
	}

	const query = String(slugOrId).toLowerCase().trim();
	const queryNormalized = normalizeSlug(query);

	const idx = posts.findIndex((p) => {
		const pSlug = p.slug.toLowerCase();
		if (pSlug === query) return true;
		if (normalizeSlug(pSlug) === queryNormalized) return true;
		if (pSlug.startsWith(`${query}-`)) return true;
		if (p.path && p.path.toLowerCase().endsWith(`/${query}`)) return true;
		if (String(p.id) === query) return true;
		return false;
	});

	if (idx !== -1) {
		return { index: idx, post: posts[idx] };
	}

	return { index: -1, post: null };
}

export async function getBlogPosts(n?: number): Promise<Post[]> {
	return n ? posts.slice(0, n) : [...posts];
}

export async function getBlogPost(slug: string): Promise<Post | null> {
	const { post } = findPostIndexAndItem(slug);
	return post;
}

export async function getBlogPostById(id: number): Promise<Post | null> {
	const { post } = findPostIndexAndItem(id);
	return post;
}

export async function getNextBlogPost(
	slugOrId: string | number,
): Promise<Post | null> {
	const { index } = findPostIndexAndItem(slugOrId);
	if (index > 0) {
		return posts[index - 1];
	}
	return null;
}

export async function getPrevBlogPost(
	slugOrId: string | number,
): Promise<Post | null> {
	const { index } = findPostIndexAndItem(slugOrId);
	if (index !== -1 && index < posts.length - 1) {
		return posts[index + 1];
	}
	return null;
}

export async function getAdjacentBlogPosts(
	slugOrId: string | number,
): Promise<{ prev: Post | null; next: Post | null }> {
	const { index } = findPostIndexAndItem(slugOrId);
	if (index === -1) {
		return { prev: null, next: null };
	}

	return {
		prev: index < posts.length - 1 ? posts[index + 1] : null,
		next: index > 0 ? posts[index - 1] : null,
	};
}

export async function getRelatedBlogPosts(
	slugOrId: string | number,
	limit = 3,
): Promise<Post[]> {
	const { post: currentPost } = findPostIndexAndItem(slugOrId);
	if (!currentPost || !currentPost.tags || currentPost.tags.length === 0) {
		return posts
			.filter((p) => (currentPost ? p.id !== currentPost.id : true))
			.slice(0, limit);
	}

	const currentTags = new Set(
		currentPost.tags.map((t) => t.toLowerCase().trim()),
	);

	const scored = posts
		.filter((p) => p.id !== currentPost.id)
		.map((p) => {
			const matchingTags = (p.tags || []).filter((t) =>
				currentTags.has(t.toLowerCase().trim()),
			);
			return { post: p, score: matchingTags.length };
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score);

	if (scored.length < limit) {
		// Fill remaining with latest posts if needed
		const existingIds = new Set([
			currentPost.id,
			...scored.map((s) => s.post.id),
		]);
		const fillers = posts.filter((p) => !existingIds.has(p.id));
		return [...scored.map((s) => s.post), ...fillers].slice(0, limit);
	}

	return scored.slice(0, limit).map((s) => s.post);
}

export async function getAllBlogTags(minCount = 2): Promise<string[]> {
	const counts = await getTagCounts();
	return Object.entries(counts)
		.filter(([, count]) => count >= minCount)
		.map(([tag]) => tag)
		.sort((a, b) => a.localeCompare(b));
}

export async function getTagCounts(): Promise<Record<string, number>> {
	const counts: Record<string, number> = {};
	for (const post of posts) {
		if (Array.isArray(post.tags)) {
			for (const tag of post.tags) {
				if (tag) {
					counts[tag] = (counts[tag] || 0) + 1;
				}
			}
		}
	}
	return counts;
}

export async function getBlogPostsByTag(
	tag: string,
	n?: number,
): Promise<Post[]> {
	const normalized = tag.toLowerCase().trim();
	const filtered = posts.filter((p) =>
		p.tags?.some((t) => t.toLowerCase().trim() === normalized),
	);
	return n ? filtered.slice(0, n) : filtered;
}

export async function getRecentBlogPosts(limit = 5): Promise<Post[]> {
	return posts.slice(0, limit);
}

export async function searchBlogPosts(
	query: string,
	limit?: number,
): Promise<Post[]> {
	const q = query.toLowerCase().trim();
	if (!q) return getBlogPosts(limit);

	const matches = posts.filter((post) => {
		const inTitle = post.title?.toLowerCase().includes(q);
		const inDesc = post.description?.toLowerCase().includes(q);
		const inTags = post.tags?.some((t) => t.toLowerCase().includes(q));
		const inBody = post.body_markdown?.toLowerCase().includes(q);
		return inTitle || inDesc || inTags || inBody;
	});

	return limit ? matches.slice(0, limit) : matches;
}

export async function getAllBlogSlugs(): Promise<string[]> {
	return posts.map((p) => p.slug);
}

export async function getFeaturedBlogPosts(limit = 3): Promise<Post[]> {
	const sorted = [...posts].sort(
		(a, b) =>
			(b.public_reactions_count || 0) +
			(b.positive_reactions_count || 0) -
			((a.public_reactions_count || 0) + (a.positive_reactions_count || 0)),
	);
	return sorted.slice(0, limit);
}
