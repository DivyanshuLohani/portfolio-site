import React from "react";
import BlockSection from "@/components/blog/BlogSection";
import { getBlogPosts } from "@/lib/data";

export default async function page() {
  const posts = await getBlogPosts();
  return <BlockSection posts={posts} />;
}
