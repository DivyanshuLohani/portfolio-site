import { getBlogPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) return notFound();
  return (
    <>
      <section className="w-full">
        <Image
          src={post.cover_image}
          width={1200}
          height={400}
          alt={post.description}
          className="aspect-[3/1] w-full object-cover"
        />
      </section>
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20 backdrop-blur-sm">
        <article className="prose prose-gray max-w-3xl mx-auto dark:prose-invert">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
            {post.title}
          </h1>

          <div className="flex gap-5 text-sm">
            {post.tags.map((tag) => {
              return (
                <span
                  key={tag}
                  className="px-3 py-2 rounded-full border border-white/20"
                >
                  #{tag}
                </span>
              );
            })}
          </div>
          <div className="text-white/60 pt-3 flex gap-2 items-center">
            <span className="font-semibold">
              Posted on {formatDate(post.published_at)}
            </span>
            <span>&bull;</span>
            <span className="text-white/60 ">
              {post.reading_time_minutes} min read
            </span>
          </div>

          <div
            className="porse"
            dangerouslySetInnerHTML={{ __html: post.body_html }}
          />
        </article>
      </div>
    </>
  );
}
