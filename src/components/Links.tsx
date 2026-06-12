"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FaTree } from "react-icons/fa";
import {
	FaCode,
	FaEnvelope,
	FaLink as FaExternalLinkAlt,
	FaFire,
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaXTwitter,
} from "react-icons/fa6";
import type { Post } from "@/lib/types";
import BentoBlogGrid from "./BentoBlog";

interface LinkItem {
	title: string;
	url: string;
	icon: ReactNode;
	category: string;
	isExternal?: boolean;
}

interface SocialLink {
	title: string;
	url: string;
	icon: ReactNode;
}

interface LinksProps {
	posts: Post[];
}

const socialLinks: SocialLink[] = [
	{
		title: "Email",
		url: "mailto:divyanshu@divyanshulohani.xyz",
		icon: <FaEnvelope />,
	},
	{
		title: "Twitter / X",
		url: "https://x.com/DivyanshuLohani",
		icon: <FaXTwitter />,
	},
	{
		title: "GitHub",
		url: "https://github.com/DivyanshuLohani",
		icon: <FaGithub />,
	},
	{
		title: "LinkedIn",
		url: "https://www.linkedin.com/in/divyanshulohani/",
		icon: <FaLinkedin />,
	},
	{
		title: "Instagram",
		url: "https://instagram.com/divyanshulohani_",
		icon: <FaInstagram />,
	},
	{
		title: "Portfolio",
		url: "/",
		icon: <FaCode />,
	},
];

const links: LinkItem[] = [
	{
		title: "Nexus - Live",
		url: "nexus.divyanshulohani.xyz",
		icon: <FaFire />,
		category: "Featured Projects",
		isExternal: true,
	},
	{
		title: "Sync Draw Guess - Live",
		url: "https://guessdoodle.com",
		icon: <FaFire />,
		category: "Featured Projects",
		isExternal: true,
	},
	{
		title: "FinFlow - Live",
		url: "https://finflow.divyanshulohani.xyz",
		icon: <FaFire />,
		category: "Featured Projects",
		isExternal: true,
	},
	{
		title: "Grocery Delivery App",
		url: "https://github.com/DivyanshuLohani/GroceryDeliveryApp",
		icon: <FaGithub />,
		category: "More Projects",
		isExternal: true,
	},
	{
		title: "Classroom To Cloud",
		url: "https://github.com/DivyanshuLohani/ClassToCloud",
		icon: <FaGithub />,
		category: "More Projects",
		isExternal: true,
	},
	{
		title: "Lapata",
		url: "/songs",
		icon: <span className="text-lg">🎵</span>,
		category: "Music",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: "easeOut",
		},
	},
};

export default function Links({ posts }: LinksProps) {
	const categories = Array.from(new Set(links.map((link) => link.category)));
	const blogPosts = posts.slice(0, 4);

	return (
		<div className="min-h-screen bg-black text-white">
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
			</div>

			<div className="relative z-10">
				<motion.div
					className="pt-12 pb-8 text-center"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="mb-4">
						<div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-2 border-blue-400/30">
							<img
								src="/Profile.png"
								alt="Divyanshu Lohani"
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
						Divyanshu Lohani
					</h1>
					<p className="text-gray-400 text-lg">
						Fullstack Developer & Software Developer
					</p>
					<p className="text-gray-500 text-sm mt-2">
						Latest writing, featured work, and project links.
					</p>

					<motion.div
						className="flex justify-center gap-6 mt-6"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						{socialLinks.map((link, index) => (
							<motion.a
								key={index}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.95 }}
								title={link.title}
							>
								<div className="text-2xl">{link.icon}</div>
							</motion.a>
						))}
					</motion.div>
				</motion.div>

				<section className="max-w-5xl mx-auto px-4 pb-12">
					<div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
						{/* <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Latest Articles</p>

                        </div> */}
						{/* <a href="/posts" className="text-sm text-blue-300 hover:text-white transition-colors">
                            See all posts
                        </a> */}
					</div>

					<BentoBlogGrid blogPosts={blogPosts} />
				</section>

				<motion.div
					className="max-w-2xl mx-auto px-4 pb-20"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{categories.map((category, categoryIndex) => {
						const categoryLinks = links.filter(
							(link) => link.category === category,
						);
						return (
							<div key={categoryIndex} className="mb-10">
								<motion.h2
									className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 px-4"
									variants={itemVariants}
								>
									{category}
								</motion.h2>

								<div className="space-y-3">
									{categoryLinks.map((link, linkIndex) => (
										<motion.a
											key={`${categoryIndex}-${linkIndex}`}
											href={link.url}
											target={link.isExternal ? "_blank" : "_self"}
											rel={link.isExternal ? "noopener noreferrer" : ""}
											variants={itemVariants}
											whileHover={{
												scale: 1.02,
												boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
											}}
											whileTap={{ scale: 0.98 }}
											className="group relative block"
										>
											<div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-white/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
											<div className="relative px-6 py-4 rounded-lg border border-white/10 bg-white/3 backdrop-blur-sm group-hover:bg-white/8 group-hover:border-blue-400/40 transition-all duration-300">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-4">
														<div className="text-xl text-blue-400 group-hover:text-blue-300 transition-colors">
															{link.icon}
														</div>
														<span className="text-white font-medium group-hover:text-white transition-colors">
															{link.title}
														</span>
													</div>
													{link.isExternal && (
														<FaExternalLinkAlt className="text-gray-500 text-xs group-hover:text-blue-400 transition-colors" />
													)}
												</div>
											</div>
										</motion.a>
									))}
								</div>
							</div>
						);
					})}
				</motion.div>
			</div>
		</div>
	);
}
