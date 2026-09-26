"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
	{
		href: "/projects",
		text: "Projects",
	},
	{
		href: "/posts",
		text: "Blog",
	},
	{
		href: "/songs",
		text: "Music",
	},
];

export default function Navbar() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";

		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	const closeMenu = () => setOpen(false);

	return (
		<>
			<nav
				className="
          fixed
          inset-x-0
          top-0
          z-50
          border-b
          border-white/10
          bg-[#050505]/80
          backdrop-blur-md
        "
			>
				<div
					className="
            mx-auto
            flex
            h-[72px]
            max-w-[1298px]
            items-center
            justify-between
            px-6
            md:px-10
          "
				>
					{/* Logo */}
					<Link
						href="/"
						onClick={closeMenu}
						className="
              group
              flex
              items-center
              gap-2
              text-sm
              font-medium
              tracking-[-0.02em]
              text-white
            "
					>
						<span className="text-white/40 transition-colors group-hover:text-[#7c9cff]">
							/
						</span>

						<span>Dibbu.dev</span>
					</Link>

					{/* Desktop navigation */}
					<div className="hidden items-center md:flex">
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="
                  group
                  ml-8
                  flex
                  items-center
                  gap-1.5
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-white/40
                  transition-colors
                  hover:text-white
                "
							>
								{link.text}

								<ArrowUpRight
									size={11}
									strokeWidth={1.5}
									className="
                    opacity-0
                    -translate-x-1
                    transition-all
                    duration-200
                    group-hover:translate-x-0
                    group-hover:opacity-100
                  "
								/>
							</Link>
						))}

						<Link
							href="/#contact"
							className="
                ml-10
                border-l
                border-white/10
                pl-8
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-white/60
                transition-colors
                hover:text-white
              "
						>
							Contact
						</Link>
					</div>

					{/* Mobile button */}
					<button
						type="button"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						onClick={() => setOpen((value) => !value)}
						className="
              flex
              h-9
              w-9
              items-center
              justify-center
              text-white/60
              transition-colors
              hover:text-white
              md:hidden
            "
					>
						{open ? (
							<X size={20} strokeWidth={1.5} />
						) : (
							<Menu size={20} strokeWidth={1.5} />
						)}
					</button>
				</div>
			</nav>

			{/* Mobile menu */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="
              fixed
              inset-0
              z-40
              bg-[#050505]
              pt-[72px]
              md:hidden
            "
					>
						<motion.div
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -20, opacity: 0 }}
							transition={{ duration: 0.25 }}
							className="flex h-full flex-col"
						>
							{/* Links */}
							<div className="px-6">
								{links.map((link, index) => (
									<Link
										key={link.href}
										href={link.href}
										onClick={closeMenu}
										className="
                      group
                      flex
                      items-center
                      justify-between
                      border-b
                      border-white/10
                      py-7
                    "
									>
										<div className="flex items-baseline gap-5">
											<span
												className="
                          text-[10px]
                          tracking-[0.12em]
                          text-[#7c9cff]
                        "
											>
												{String(index + 1).padStart(2, "0")}
											</span>

											<span
												className="
                          text-4xl
                          font-medium
                          tracking-[-0.04em]
                          text-white/90
                          transition-colors
                          group-hover:text-white
                        "
											>
												{link.text}
											</span>
										</div>

										<ArrowUpRight
											size={20}
											strokeWidth={1.5}
											className="
                        text-white/20
                        transition-all
                        group-hover:translate-x-1
                        group-hover:text-white
                      "
										/>
									</Link>
								))}

								<Link
									href="/#contact"
									onClick={closeMenu}
									className="
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    py-7
                  "
								>
									<div className="flex items-baseline gap-5">
										<span
											className="
                        text-[10px]
                        tracking-[0.12em]
                        text-[#7c9cff]
                      "
										>
											04
										</span>

										<span
											className="
                        text-4xl
                        font-medium
                        tracking-[-0.04em]
                        text-white/90
                      "
										>
											Contact
										</span>
									</div>

									<ArrowUpRight
										size={20}
										strokeWidth={1.5}
										className="text-white/20"
									/>
								</Link>
							</div>

							{/* Bottom */}
							<div className="mt-auto px-6 pb-8">
								<p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
									Developer · Builder · Music
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
