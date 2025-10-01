import { getBlogPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import PostBody from "./components/PostBody";

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
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-5 backdrop-blur-sm">
      <article
        className="prose prose-gray max-w-3xl mx-auto prose-invert"
        itemType="article"
      >
        <Image
          src={post.cover_image}
          width={1600}
          height={900}
          alt={post.description}
          className="w-full object-contain rounded-md"
        />
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-6 text-white">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm rounded-full border border-white/20 text-white/70"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Meta Information & Author - Blended in one line */}
          <div className="flex items-center gap-4 text-sm text-white/60 py-4 border-y border-white/10">
            <Image
              src={post.user.profile_image}
              width={40}
              height={40}
              alt={post.user.name}
              className="rounded-full object-cover"
            />
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-medium text-white/80">{post.user.name}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <time>{formatDate(post.published_at)}</time>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>{post.reading_time_minutes} min read</span>
              {post.user.twitter_username && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <a
                    href={`https://twitter.com/${post.user.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/90 transition-colors"
                  >
                    @{post.user.twitter_username}
                  </a>
                </>
              )}
              {post.user.github_username && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <a
                    href={`https://github.com/${post.user.github_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/90 transition-colors"
                  >
                    {post.user.github_username}
                  </a>
                </>
              )}
              {post.user.website_url && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <a
                    href={post.user.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/90 transition-colors"
                  >
                    Website
                  </a>
                </>
              )}
            </div>
          </div>
        </header>

        <PostBody body_markdown={post.body_markdown} />
      </article>
    </div>
  );
}
