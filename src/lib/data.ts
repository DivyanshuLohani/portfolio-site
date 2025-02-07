"use server";

import { unstable_noStore } from "next/cache";
import { Post } from "./types";

const headers = new Headers();
headers.append("api-key", process.env.DEV_TO_API_KEY || "");
headers.append("accept", "application/vnd.forem.api-v1+json");

export async function getBlogPosts(n?: number): Promise<Post[]> {
  unstable_noStore();
  const articles = await fetch("https://dev.to/api/articles/me/published/", {
    headers,
    cache: "no-store",
  });

  if (articles.ok) {
    const posts = await articles.json();
    return n ? posts.slice(0, n) : posts;
  }
  return [];
}
export async function getBlogPost(slug: string): Promise<Post | null> {
  const articles = await fetch(
    `https://dev.to/api/articles/divyanshulohani/${slug}`,
    {
      headers,
    }
  );
  if (articles.ok) {
    return await articles.json();
  }
  return null;
}
