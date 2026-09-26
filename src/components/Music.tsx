"use client";

import { motion } from "framer-motion";
import React from "react";

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

interface MusicContentProps {
	showList?: boolean;
}

export default function MusicContent({ showList = false }: MusicContentProps) {
	const displayedReleases = showList ? releases : [releases[0]];

	return (
		<motion.main
			className="border-white/10"
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="max-w-3xl mx-auto px-6 py-24">
				{/* Header */}
				<div className="mb-12">
					<h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
						{showList ? "All Releases" : "New Release — Mohabbat"}
					</h1>
				</div>

				{/* Releases */}
				<div className="space-y-16">
					{displayedReleases.map((release, index) => (
						<motion.article
							key={release.spotifyId}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: index * 0.1,
								duration: 0.5,
							}}
						>
							<h2 className="text-2xl md:text-3xl font-medium tracking-tight">
								{release.title}
							</h2>

							<p className="mt-3 mb-6 max-w-xl text-sm md:text-base text-white/45 leading-6">
								{release.description}
							</p>

							<div className="overflow-hidden rounded-xl border border-white/10">
								<iframe
									src={`https://open.spotify.com/embed/track/${release.spotifyId}?utm_source=generator&theme=1`}
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
		</motion.main>
	);
}
