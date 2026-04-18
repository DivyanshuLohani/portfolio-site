"use client";

import { motion } from "framer-motion";
import type { Post } from "@/lib/types"; // ← adjust to your actual path
import Link from "next/link";

interface BentoBlogGridProps {
    blogPosts: Post[];
}

// ── Animation variants ─────────────────────────────────────────────────────
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};



// ── Slot grid classes ──────────────────────────────────────────────────────
// Mobile  (2-col):   col-span-2 = full width,  col-span-1 = half
// Desktop (4-col):   bento layout
//
//  Mobile                Desktop
//  ┌─────────────┐        ┌──────────────┬──────┬──────┐
//  │  HERO  (0)  │        │  HERO  (0)   │  1   │  2   │
//  │  full width │        │  2×2         │      │      │
//  ├──────┬──────┤        ├──────┬───────┴──────┴──────┤ ← wait no:
//  │  1   │  2   │        │  4   │  WIDE  (3)          │
//  ├──────┴──────┤        └──────┴─────────────────────┘
//  │  WIDE (3)   │
//  ├──────┬──────┤
//  │  4   │      │
//  └──────┴──────┘

const BENTO_SLOTS: string[] = [
    // index 0 — hero: full width on mobile, 2×2 on desktop
    "col-span-2 md:col-span-2 md:row-span-2",
    // index 1 — half on mobile, 1×1 on desktop
    "col-span-1 md:col-span-1 md:row-span-1",
    // index 2 — half on mobile, 1×1 on desktop
    "col-span-1 md:col-span-1 md:row-span-1",
    // index 3 — full width on mobile, wide (2×1) on desktop
    "col-span-2 md:col-span-2 md:row-span-1",
    // index 4 — full width on mobile, wide (2×1) on desktop
    "col-span-2 md:col-span-2 md:row-span-1",
];

function getSlotClass(index: number): string {
    return BENTO_SLOTS[index] ?? "col-span-1 md:col-span-1 md:row-span-1";
}

// ── Card variant helpers ───────────────────────────────────────────────────
function isHero(i: number) { return i === 0; }
// function isWide(i: number) { return i === 3 || i === 4; }
function isSmall(i: number) { return i === 1 || i === 2; }

// ── Card ──────────────────────────────────────────────────────────────────
function BentoCard({ post, index }: { post: Post; index: number }) {
    const cover = post.cover_image || post.social_image || "/Profile.png";
    const hero = isHero(index);
    // const wide = isWide(index);
    const small = isSmall(index);

    // Height classes: explicit aspect-ratio on mobile so cards are square-ish,
    // then min-h kicks in on desktop.
    const heightCls = hero
        ? "aspect-[16/9] md:aspect-auto md:min-h-[220px]"
        : small
            ? "aspect-square md:aspect-auto md:min-h-[160px]"
            : "aspect-[16/7] md:aspect-auto md:min-h-[160px]";

    return (
        <Link
            href={`/posts/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className={[
                "group relative overflow-hidden rounded-xl md:rounded-2xl",
                "border border-white/10 bg-white/5",
                "transition-colors duration-300 hover:border-sky-400/40",
                heightCls,
                getSlotClass(index),
            ].join(" ")}
        // whileHover={{ scale: 1.015, transition: { duration: 0.22 } }}
        // variants={itemVariants}
        >
            {/* Cover image */}
            <img
                src={cover}
                alt={post.title}
                className="absolute inset-0 h-full w-full object-cover brightness-[0.72] transition-[transform,brightness] duration-500 group-hover:brightness-[0.55] group-hover:scale-[1.04]"
                loading={index === 0 ? "eager" : "lazy"}
            />

            {/* Gradient scrim — heavier on small cards so title is always readable */}
            <div className={[
                "absolute inset-0 bg-gradient-to-t",
                small
                    ? "from-black/90 via-black/50 to-black/10"
                    : "from-black/80 via-black/20 to-transparent",
            ].join(" ")} />

            {/* Content */}
            <div className={[
                "relative flex h-full flex-col justify-end",
                hero ? "p-3.5 sm:p-5 md:p-6"
                    : small ? "p-2.5 sm:p-3.5"
                        : "p-3 sm:p-4 md:p-5",
            ].join(" ")}>

                {/* Date — hidden on small mobile cards, shown everywhere else */}
                <span className={[
                    "mb-0.5 block text-[9px] uppercase tracking-[0.22em] text-sky-400/80",
                    small ? "hidden sm:block" : "",
                ].join(" ")}>
                    {post.readable_publish_date}
                    {post.reading_time_minutes != null && (
                        <span className="ml-1.5 text-white/35">· {post.reading_time_minutes} min</span>
                    )}
                </span>

                {/* Title */}
                <h3 className={[
                    "font-semibold leading-tight text-white",
                    hero ? "text-base sm:text-xl md:text-2xl"
                        : small ? "text-[11px] sm:text-xs md:text-sm line-clamp-3"
                            : "text-xs sm:text-sm md:text-base line-clamp-2",
                ].join(" ")}>
                    {post.title}
                </h3>

                {/* Description — hero always; wide on sm+; small cards never */}
                {!small && post.description && (
                    <p className={[
                        "mt-1 line-clamp-2 leading-relaxed text-gray-300/75",
                        "text-[10px] sm:text-[11px] md:text-xs",
                        !hero ? "hidden sm:block" : "",
                    ].join(" ")}>
                        {post.description}
                    </p>
                )}
            </div>
        </Link>
    );
}

// ── Grid ──────────────────────────────────────────────────────────────────
export function BentoBlogGrid({ blogPosts }: BentoBlogGridProps) {
    if (!blogPosts?.length) return null;

    const bentoPosts = blogPosts.slice(0, 5);
    const extraPosts = blogPosts.slice(5);

    return (
        <motion.div
            className={[
                "grid gap-2 sm:gap-3",
                // Mobile: 2-col grid  |  Desktop: 4-col bento
                "grid-cols-2 md:grid-cols-4",
                "md:auto-rows-[minmax(160px,1fr)]",
            ].join(" ")}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {bentoPosts.map((post, i) => (
                <BentoCard key={post.id} post={post} index={i} />
            ))}
            {extraPosts.map((post, i) => (
                <BentoCard key={post.id} post={post} index={i + 5} />
            ))}
        </motion.div>
    );
}

export default BentoBlogGrid;
