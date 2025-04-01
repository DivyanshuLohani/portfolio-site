"use client";
import { Post } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedDate = formatter.format(new Date(post.published_at));
  const year = new Date(post.published_at).getFullYear();

  return (
    <motion.article
      className="flex flex-col overflow-hidden rounded-xl black backdrop-blur-lg border border-white/10 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Link
          href={`/posts/${post.slug}`}
          prefetch={false}
          className="block h-full"
        >
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-70" />
        </Link>
      </div>

      <div className="flex flex-col justify-between flex-1 p-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="px-3 py-1.5 bg-gray-800 rounded-md text-white/80 text-xs font-medium">
              {`${formattedDate}, ${year}`}
            </div>

            <div className="px-3 py-1.5 bg-gray-800 rounded-md text-white/80 text-xs font-medium flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {`${post.reading_time_minutes} min read`}
            </div>
          </div>

          <Link
            href={`/posts/${post.slug}`}
            prefetch={false}
            className="group-hover:text-white/90"
          >
            <h3 className="font-bold text-xl text-white mb-3 transition-colors group-hover:underline">
              {post.title}
            </h3>
          </Link>

          <p className="text-sm/relaxed text-white/60 line-clamp-3">
            {post.body_markdown.slice(0, 160)}...
          </p>
        </div>

        <Link
          href={`/posts/${post.slug}`}
          prefetch={false}
          className="inline-flex items-center font-medium text-white mt-4 group-hover:text-white/80 transition-colors"
        >
          <span>Read article</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
