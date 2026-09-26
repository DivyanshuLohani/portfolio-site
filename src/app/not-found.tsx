"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";

export default function NotFoundPage() {
	return (
		<div className="min-h-screen bg-[#050505] text-[#f2f2f0]">
			<Navbar />

			<main className="relative flex min-h-screen items-center overflow-hidden px-6 pt-[72px] md:px-10">
				{/* Very subtle background detail */}
				<div
					className="
            pointer-events-none
            absolute
            right-[8%]
            top-[25%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#7c9cff]/[0.025]
            blur-[120px]
          "
				/>

				<div className="mx-auto w-full max-w-[1298px]">
					<div className="max-w-[900px]">
						{/* Label */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="mb-8 flex items-center gap-3"
						>
							<span className="h-2 w-2 bg-[#7c9cff]" />

							<span
								className="
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-white/30
                "
							>
								Error / 404
							</span>
						</motion.div>

						{/* 404 */}
						<motion.h1
							initial={{ opacity: 0, y: 25 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.7,
								ease: "easeOut",
							}}
							className="
                select-none
                text-[clamp(8rem,25vw,22rem)]
                font-medium
                leading-[0.72]
                tracking-[-0.09em]
                text-white/[0.07]
              "
						>
							404
						</motion.h1>

						{/* Message */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.15,
								duration: 0.6,
							}}
							className="
                relative
                -mt-4
                md:-mt-12
                md:ml-[12%]
              "
						>
							<h2
								className="
                  max-w-2xl
                  text-4xl
                  font-medium
                  leading-[0.95]
                  tracking-[-0.045em]
                  md:text-6xl
                "
							>
								This page doesn't
								<br />
								exist.
							</h2>

							<p
								className="
                  mt-6
                  max-w-md
                  text-sm
                  leading-6
                  text-white/40
                  md:text-base
                "
							>
								The URL you're looking for couldn't be found. It may have moved,
								been deleted, or perhaps never existed in the first place.
							</p>
						</motion.div>

						{/* Actions */}
						<motion.div
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.3,
								duration: 0.5,
							}}
							className="
                mt-10
                flex
                flex-wrap
                items-center
                gap-3
                md:ml-[12%]
              "
						>
							<Link
								href="/"
								className="
                  group
                  flex
                  items-center
                  gap-2
                  bg-[#f2f2f0]
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-[#050505]
                  transition-transform
                  hover:-translate-y-0.5
                "
							>
								Back home
								<ArrowUpRight
									size={15}
									strokeWidth={1.5}
									className="
                    transition-transform
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
								/>
							</Link>

							<button
								type="button"
								onClick={() => window.history.back()}
								className="
                  group
                  flex
                  items-center
                  gap-2
                  border
                  border-white/10
                  px-5
                  py-3
                  text-sm
                  text-white/50
                  transition-all
                  hover:border-white/25
                  hover:text-white
                "
							>
								<ArrowLeft
									size={15}
									strokeWidth={1.5}
									className="
                    transition-transform
                    group-hover:-translate-x-1
                  "
								/>
								Go back
							</button>
						</motion.div>
					</div>

					{/* Bottom metadata */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}
						className="
              absolute
              bottom-8
              left-6
              right-6
              flex
              items-center
              justify-between
              border-t
              border-white/10
              pt-5
              md:left-10
              md:right-10
            "
					>
						<span
							className="
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-white/20
              "
						>
							Dibbu.dev
						</span>

						<span
							className="
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-white/20
              "
						>
							Developer · Builder · Music
						</span>
					</motion.div>
				</div>
			</main>
		</div>
	);
}
