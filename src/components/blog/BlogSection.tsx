import React from "react";
import Link from "next/link";
import { Post } from "@/lib/types";
import BlogCard from "./BlogCard";

interface BlogSectionProps {
  posts: Post[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="flex items-center justify-center py-16">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            From the Blog
          </h2>
        </div>
        <div className="grid gap-6 py-12 md:grid-cols-3 md:gap-8">
          {posts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link
            href={"/posts"}
            className="px-5 py-2 border rounded-full hover:text-black hover:bg-white duration-300 transition-colors mb-5"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
