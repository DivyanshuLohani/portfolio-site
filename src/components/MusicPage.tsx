"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

type Release = {
	title: string;
	description: string;
	spotifyId: string;
};

const releases: Release[] = [
	{
		title: "Mohabbat",
		description:
			"My new release, Mohabbat, is out now. Give it a listen and let me know what you think!",
		spotifyId: "1oemXKNsAhkxCjnBZM3gmG",
	},
	{
		title: "Debut Release",
		description:
			"My first single, created with a friend, pouring our passion for music into every note.",
		spotifyId: "4TxXfXrmlOlkOopl70zmtQ",
	},
];

export default function MusicContent() {
	return (
		<main className="min-h-screen bg-[#050505] text-[#f2f2f0]">
			{/* Header */}
			<header className="border-b border-white/10">
				<div className="flex h-[108px] items-center justify-between px-6 md:px-10">
					{/* Back to main site */}
					<Link
						href="/"
						className="
              group
              flex
              items-start
              gap-3
              transition-opacity
              hover:opacity-70
            "
					>
						<span className="mt-1 text-2xl leading-none text-[#7c9cff]">♫</span>

						<div>
							<h1 className="text-3xl font-semibold leading-none tracking-[-0.035em] md:text-4xl">
								My Music Journey
							</h1>

							<p className="mt-2 text-sm text-white/45">
								Developer by day, artist by passion
							</p>
						</div>
					</Link>

					{/* Back link */}
					<Link
						href="/"
						className="
              group
              flex
              items-center
              gap-2
              text-[10px]
              uppercase
              tracking-[0.14em]
              text-white/35
              transition-colors
              hover:text-white
            "
					>
						<span>Back to portfolio</span>

						<span
							className="
                text-sm
                transition-transform
                duration-200
                group-hover:-translate-x-1
              "
						>
							<ArrowRightIcon className="h-3 w-3" />
						</span>
					</Link>
				</div>
			</header>

			{/* Releases */}
			<div className="mx-auto w-full max-w-[700px] px-6 py-20 md:py-24">
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-4xl font-medium tracking-[-0.045em] md:text-5xl">
						All Releases
					</h2>
				</motion.div>

				<div className="mt-12 space-y-16">
					{releases.map((release, index) => (
						<motion.article
							key={release.spotifyId}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								delay: 0.1 + index * 0.1,
							}}
						>
							<h3 className="text-3xl font-normal tracking-[-0.035em]">
								{release.title}
							</h3>

							<p className="mt-3 max-w-[600px] text-base leading-6 text-white/40">
								{release.description}
							</p>

							<div className="mt-6 overflow-hidden rounded-xl">
								<iframe
									src={`https://open.spotify.com/embed/track/${release.spotifyId}?utm_source=generator&theme=0`}
									width="100%"
									height="152"
									frameBorder="0"
									allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
									loading="lazy"
									className="block"
								/>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</main>
	);
}
