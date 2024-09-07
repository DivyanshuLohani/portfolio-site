import { Post } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href="#" className="group" prefetch={false}>
      <div className="overflow-hidden rounded-lg">
        <Image
          src={post.main_image}
          width={400}
          height={225}
          alt="Blog post image"
          className="aspect-video w-full object-cover transition-all group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 pt-4">
        <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="text-muted-foreground line-clamp-2">
          {post.body_markdown}
        </p>
      </div>
    </Link>
  );
}
