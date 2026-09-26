import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as pagefind from "pagefind";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const blogJsonPath = path.resolve(rootDir, "blog.json");
const publicPagefindPath = path.resolve(rootDir, "public", "pagefind");

export async function buildPagefindSearchIndex() {
	if (!fs.existsSync(blogJsonPath)) {
		console.warn("⚠️ [pagefind] blog.json not found, skipping search indexing.");
		return;
	}

	try {
		console.log("🔍 [pagefind] Building search index from blog.json...");
		const blogsRaw = fs.readFileSync(blogJsonPath, "utf-8");
		const blogs = JSON.parse(blogsRaw);

		if (!Array.isArray(blogs) || blogs.length === 0) {
			console.warn("⚠️ [pagefind] No blog posts found in blog.json to index.");
			return;
		}

		const { index, errors: initErrors } = await pagefind.createIndex();
		if (initErrors && initErrors.length > 0) {
			console.error("❌ [pagefind] Failed to create index:", initErrors);
			return;
		}

		let indexedCount = 0;
		for (const post of blogs) {
			const tagsArray = Array.isArray(post.tags) ? post.tags : [];
			const tagsStr = tagsArray.join(", ");
			const fullContent = [
				post.title,
				post.description,
				tagsStr,
				post.body_markdown || "",
			].join("\n\n");

			const { errors: recordErrors } = await index.addCustomRecord({
				url: `/posts/${post.slug}`,
				content: fullContent,
				language: "en",
				meta: {
					title: post.title,
					description: post.description || "",
					slug: post.slug,
					image: post.cover_image || post.social_image || "",
					published_at: post.published_at || "",
					reading_time: post.reading_time_minutes ? `${post.reading_time_minutes} min read` : "1 min read",
					tags: tagsStr,
				},
				filters: {
					tag: tagsArray,
				},
			});

			if (recordErrors && recordErrors.length > 0) {
				console.warn(`⚠️ [pagefind] Errors indexing post ${post.slug}:`, recordErrors);
			} else {
				indexedCount++;
			}
		}

		const { outputPath, errors: writeErrors } = await index.writeFiles({
			outputPath: publicPagefindPath,
		});

		if (writeErrors && writeErrors.length > 0) {
			console.error("❌ [pagefind] Errors writing index files:", writeErrors);
		} else {
			console.log(`✅ [pagefind] Successfully indexed ${indexedCount} blog posts to ${outputPath}`);
		}

		await pagefind.close();
	} catch (err) {
		console.error("❌ [pagefind] Search indexing failed:", err);
	}
}

// Run directly if executed as main
if (process.argv[1] === __filename) {
	buildPagefindSearchIndex();
}
