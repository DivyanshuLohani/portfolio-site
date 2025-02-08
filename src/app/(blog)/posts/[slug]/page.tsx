import { getBlogPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);
  if (!post) return;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: post.canonical_url || post.url,
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.edited_at || post.published_at,
      images: [
        {
          url: post.social_image || post.cover_image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: post.description,
      title: post.title,
      description: post.description,
      images: [post.social_image || post.cover_image],
    },
  };
}

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

          <div className="flex gap-3 text-sm flex-wrap">
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
            dangerouslySetInnerHTML={{
              __html: post.body_html.replaceAll(
                "https://dev.to/divyanshulohani", "/posts"
              ),
            }}
          />
        </article>
      </div>
    </>
  );
}
