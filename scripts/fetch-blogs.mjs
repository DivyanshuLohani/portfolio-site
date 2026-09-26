import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildPagefindSearchIndex } from "./build-search-index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const blogJsonPath = path.resolve(rootDir, "blog.json");

// Load .env if present
function loadEnv() {
	if (typeof process.loadEnvFile === "function") {
		try {
			process.loadEnvFile(path.resolve(rootDir, ".env"));
		} catch {
			// Ignore if .env doesn't exist
		}
	}
}

loadEnv();

const DEV_TO_API_KEY = process.env.DEV_TO_API_KEY || "";
const DEV_TO_USERNAME = process.env.DEV_TO_USERNAME || "divyanshulohani";

const headers = {
	accept: "application/vnd.forem.api-v1+json",
	"User-Agent": "portfolio-site-build-script",
};

if (DEV_TO_API_KEY) {
	headers["api-key"] = DEV_TO_API_KEY;
}

async function fetchPublishedArticles() {
	console.log("Fetching published articles list from Dev.to...");
	const url = DEV_TO_API_KEY
		? "https://dev.to/api/articles/me/published?per_page=1000"
		: `https://dev.to/api/articles?username=${encodeURIComponent(DEV_TO_USERNAME)}&per_page=1000`;

	const res = await fetch(url, { headers });
	if (!res.ok) {
		throw new Error(`Failed to fetch articles list: ${res.status} ${res.statusText}`);
	}
	const data = await res.json();
	if (!Array.isArray(data)) {
		throw new Error(`Expected array of articles, received: ${JSON.stringify(data)}`);
	}
	return data;
}

async function fetchArticleDetails(articleId) {
	const url = `https://dev.to/api/articles/${articleId}`;
	const res = await fetch(url, { headers });
	if (!res.ok) {
		console.warn(`[fetch-blogs] Warning: Failed to fetch full details for article ${articleId}: ${res.status}`);
		return null;
	}
	return await res.json();
}

function normalizePost(item, fullDetails) {
	const source = fullDetails || item;

	let tags = [];
	if (Array.isArray(source.tags)) {
		tags = source.tags;
	} else if (Array.isArray(source.tag_list)) {
		tags = source.tag_list;
	} else if (typeof source.tag_list === "string") {
		tags = source.tag_list
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean);
	}

	const readingTimeMinutes =
		source.reading_time_minutes ?? item.reading_time_minutes ?? 1;

	return {
		type_of: source.type_of || item.type_of || "article",
		id: source.id || item.id,
		title: source.title || item.title || "",
		description: source.description || item.description || "",
		readable_publish_date:
			source.readable_publish_date || item.readable_publish_date || "",
		slug: source.slug || item.slug || "",
		path: source.path || item.path || "",
		url: source.url || item.url || "",
		comments_count: source.comments_count ?? item.comments_count ?? 0,
		public_reactions_count:
			source.public_reactions_count ?? item.public_reactions_count ?? 0,
		collection_id: source.collection_id ?? item.collection_id ?? null,
		published_timestamp:
			source.published_timestamp ||
			item.published_timestamp ||
			source.published_at ||
			item.published_at ||
			new Date().toISOString(),
		positive_reactions_count:
			source.positive_reactions_count ?? item.positive_reactions_count ?? 0,
		cover_image: source.cover_image || item.cover_image || "",
		social_image:
			source.social_image ||
			item.social_image ||
			source.cover_image ||
			item.cover_image ||
			"",
		canonical_url: source.canonical_url || item.canonical_url || "",
		created_at: source.created_at || item.created_at || "",
		edited_at: source.edited_at ?? item.edited_at ?? null,
		crossposted_at: source.crossposted_at ?? item.crossposted_at ?? null,
		published_at:
			source.published_at ||
			item.published_at ||
			source.published_timestamp ||
			item.published_timestamp ||
			new Date().toISOString(),
		last_comment_at: source.last_comment_at || item.last_comment_at || "",
		reading_time_minutes: readingTimeMinutes,
		tag_list: tags,
		tags: tags,
		body_html: source.body_html || item.body_html || "",
		body_markdown: source.body_markdown || item.body_markdown || "",
		user: source.user || item.user || {
			name: "Divyanshu Lohani",
			username: "divyanshulohani",
			twitter_username: "DivyanshuLohani",
			github_username: "DivyanshuLohani",
			user_id: 0,
			website_url: "https://divyanshulohani.xyz",
			profile_image: "/Profile.png",
			profile_image_90: "/Profile.png",
		},
		readingTime: `${readingTimeMinutes} min read`,
		excerpt:
			source.description ||
			item.description ||
			(source.body_markdown
				? source.body_markdown
						.replace(/#+\s+/g, "")
						.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
						.replace(/[`*_~]/g, "")
						.slice(0, 160)
				: ""),
	};
}

async function fetchAllBlogs() {
	try {
		const articlesList = await fetchPublishedArticles();
		console.log(`Found ${articlesList.length} published articles. Fetching full details...`);

		const fullArticles = [];
		// Fetch with concurrency of 5 and small delay to avoid rate limits
		const CONCURRENCY = 5;
		for (let i = 0; i < articlesList.length; i += CONCURRENCY) {
			const chunk = articlesList.slice(i, i + CONCURRENCY);
			const results = await Promise.all(
				chunk.map(async (item) => {
					try {
						const details = await fetchArticleDetails(item.id);
						return normalizePost(item, details);
					} catch (err) {
						console.warn(`[fetch-blogs] Error fetching details for article ${item.id}:`, err);
						return normalizePost(item, null);
					}
				})
			);
			fullArticles.push(...results);
			process.stdout.write(`Processed ${fullArticles.length}/${articlesList.length} articles\r`);
			if (i + CONCURRENCY < articlesList.length) {
				await new Promise((r) => setTimeout(r, 60));
			}
		}

		console.log("\nNormalizing and sorting articles...");
		// Sort newest to oldest
		fullArticles.sort(
			(a, b) =>
				new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
		);

		// Write to blog.json
		fs.writeFileSync(blogJsonPath, JSON.stringify(fullArticles, null, 2), "utf-8");
		console.log(`✅ [fetch-blogs] Successfully saved ${fullArticles.length} blog posts to ${blogJsonPath}`);

		// Build Pagefind search index
		await buildPagefindSearchIndex();
	} catch (error) {
		console.error("❌ [fetch-blogs] Error fetching blog posts:", error.message);
		if (fs.existsSync(blogJsonPath)) {
			console.log("ℹ️ [fetch-blogs] Keeping existing blog.json file.");
			await buildPagefindSearchIndex();
		} else {
			console.warn("⚠️ [fetch-blogs] Writing empty array to blog.json as fallback.");
			fs.writeFileSync(blogJsonPath, "[]", "utf-8");
		}
	}
}

fetchAllBlogs();
