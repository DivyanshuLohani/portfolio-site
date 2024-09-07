"use client";
import { Post } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="group" prefetch={false}>
      <motion.div
        className="flex flex-col rounded-lg shadow-lg text-white bg-black/10 backdrop-blur-sm border border-white/10 group pb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="overflow-hidden rounded-lg">
          <Image
            src={post.cover_image}
            width={400}
            height={225}
            alt="Blog post image"
            className="aspect-video w-full object-cover transition-all group-hover:scale-105"
          />
        </div>
        <div className="space-y-2 pt-4 px-4">
          <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <motion.div
            className="border-t border-gray-600 my-4"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
          />
          <motion.p className="text-muted-foreground line-clamp-2">
            {post.body_markdown}
          </motion.p>
        </div>
      </motion.div>
    </Link>
  );
}
