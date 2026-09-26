"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SocialLinks from "./common/SocialLinks";

export default function Home() {
	return (
		<section
			id="home"
			className="relative min-h-screen border-b border-white/10 flex items-center"
		>
			<div className="w-full max-w-[1180px] mx-auto px-6 md:px-10 py-24">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					{/* Eyebrow */}
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.15, duration: 0.5 }}
						className="mb-7 text-[11px] uppercase tracking-[0.18em] text-white/30"
					>
						Developer · Builder · Music
					</motion.p>

					{/* Main heading */}
					<h1 className="text-[18vw] sm:text-[15vw] md:text-[11vw] lg:text-[9.5rem] leading-[0.82] tracking-[-0.075em] font-bold">
						<motion.span
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.15, duration: 0.7 }}
							className="block text-white"
						>
							Divyanshu
						</motion.span>

						<motion.span
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.25, duration: 0.7 }}
							className="block text-transparent [-webkit-text-stroke:1px_#666]"
						>
							LOHANI
						</motion.span>
					</h1>

					{/* Bottom hero content */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:items-end"
					>
						{/* Description */}
						<div className="max-w-lg">
							<p className="text-base md:text-lg leading-7 text-white/55">
								I build things for the web, experiment with game engines, write
								about the stuff I learn, and occasionally make music.
							</p>

							<p className="mt-3 text-sm text-white/30">
								Some of it is useful. Some of it probably didn&apos;t need to
								exist.
							</p>
						</div>

						{/* Actions */}
						<div className="flex flex-wrap gap-2">
							<Link
								href="/projects"
								className="
                  rounded-full
                  border border-white
                  bg-white
                  px-5 py-2.5
                  text-xs font-medium
                  text-black
                  transition-all duration-200
                  hover:bg-transparent
                  hover:text-white
                "
							>
								Explore work ↓
							</Link>

							<Link
								href="#contact"
								className="
                  rounded-full
                  border border-white/15
                  bg-white/[0.02]
                  px-5 py-2.5
                  text-xs
                  text-white/70
                  transition-all duration-200
                  hover:border-white/40
                  hover:text-white
                "
							>
								Get in touch
							</Link>
						</div>
					</motion.div>

					{/* Socials */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6, duration: 0.5 }}
						className="mt-8"
					>
						<SocialLinks />
					</motion.div>
				</motion.div>
			</div>

			{/* Small scroll indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 0.6 }}
				className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          flex
          flex-col
          items-center
          gap-2
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-white/25
        "
			>
				<span>Scroll</span>

				<motion.span
					animate={{ y: [0, 5, 0] }}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="text-white/40"
				>
					↓
				</motion.span>
			</motion.div>
		</section>
	);
}
