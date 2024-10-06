"use client";
import { Post } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formater = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedDate = formater.format(new Date(post.published_at));

  return (
    <motion.article
      className="flex flex-col md:flex-row border border-white/10 rounded-lg transition hover:shadow-xl backdrop-blur-md group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{
        scale: 1.04,
      }}
    >
      <div className="md:rotate-180 p-2 md:[writing-mode:_vertical-lr]">
        <time
          dateTime="2022-10-10"
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-white/50"
        >
          <span>{new Date(post.published_at).getFullYear()}</span>
          <span className="w-px flex-1 "></span>
          <span>{formattedDate}</span>
        </time>
      </div>

      <div className="sm:block sm:basis-56">
        <Link href={`/posts/${post.slug}`} prefetch={false} className="">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt=""
              src={post.cover_image}
              className="aspect-square h-full w-full object-cover"
            />
          }
        </Link>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="p-4 sm:p-6">
          <Link href={`/posts/${post.slug}`} prefetch={false}>
            <h3 className="font-bold uppercase group-hover:underline text-white text-xl">
              {post.title}
            </h3>
          </Link>

          <p className="mt-2 line-clamp-2 text-sm/relaxed text-white/50">
            {post.body_markdown.slice(0, 200)}
          </p>
        </div>

        <div className="">
          <Link
            href={`/posts/${post.slug}`}
            prefetch={false}
            className="block bg-white px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-white/70 md:rounded-none md:rounded-br-lg rounded-b-lg"
          >
            Read Post
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
