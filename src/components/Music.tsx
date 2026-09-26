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
			className="flex-grow flex flex-col items-center justify-center px-4"
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
		>
			<section className="w-full max-w-2xl">
				<motion.h2
					className="text-3xl font-semibold mb-4"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					{showList ? "All Releases" : "New Release — Mohabbat"}
				</motion.h2>

				{showList ? (
					<div className="flex flex-col gap-8">
						{displayedReleases.map((release, index) => (
							<motion.article
								key={release.spotifyId}
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{
									delay: 0.3 + index * 0.1,
									duration: 0.5,
								}}
							>
								<h3 className="text-xl font-semibold mb-2">{release.title}</h3>

								<p className="text-gray-400 mb-4">{release.description}</p>

								<motion.iframe
									src={`https://open.spotify.com/embed/track/${release.spotifyId}?utm_source=generator&theme=1`}
									width="100%"
									height="152"
									frameBorder="0"
									allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
									loading="lazy"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5 }}
								/>
							</motion.article>
						))}
					</div>
				) : (
					<motion.article
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}
					>
						<p className="text-gray-400 max-w-xl mb-6">
							{releases[0].description}
						</p>

						<motion.iframe
							src={`https://open.spotify.com/embed/track/${releases[0].spotifyId}?utm_source=generator&theme=1`}
							width="100%"
							height="152"
							frameBorder="0"
							allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
							loading="lazy"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.5 }}
						/>
					</motion.article>
				)}
			</section>
		</motion.main>
	);
}
