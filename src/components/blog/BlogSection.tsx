import { Post } from "@/lib/types";
import BlogCard from "./BlogCard";

interface BlogSectionProps {
  posts: Post[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <div className="px-4 md:px-6">
      <div className="text-center md:py-5 py-24">
        <h1 className="text-3xl font-bold mb-4 ">From the blog</h1>
      </div>
      <div className="grid gap-6 py-12 grid-cols-1 md:grid-cols-2 md:gap-8">
        {posts.map((post) => (
          <BlogCard key={post.title} post={post} />
        ))}
      </div>
    </div>
  );
}
