"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
	{
		href: "/projects",
		text: "Projects",
	},
	{
		href: "/posts",
		text: "Writing",
	},
	{
		href: "/songs",
		text: "Music",
	},
];

export default function Navbar() {
	const pathname = usePathname();
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
          border-white/[0.08]
          bg-[#050505]/85
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
					{/* Brand */}
					<Link
						href="/"
						onClick={closeMenu}
						className="group flex items-center gap-3"
					>
						{/* DL mark */}
						<div
							className="
                relative
                flex
                h-7
                w-7
                items-center
                justify-center
                overflow-hidden
                border
                border-white/15
                bg-white/[0.03]
                text-[10px]
                font-semibold
                tracking-[-0.08em]
                text-white
                transition-all
                duration-300
                group-hover:border-[#7c9cff]/50
                group-hover:text-[#7c9cff]
              "
						>
							DL
						</div>

						<div className="flex items-center gap-2">
							<span
								className="
                  text-sm
                  font-medium
                  tracking-[-0.02em]
                  text-white
                "
							>
								Dibbu.dev
							</span>

							{/* tiny status/accent */}
							<span
								className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#7c9cff]
                  opacity-60
                  transition-opacity
                  group-hover:opacity-100
                "
							/>
						</div>
					</Link>

					{/* Desktop navigation */}
					<div className="hidden items-center md:flex">
						{links.map((link) => {
							const isActive =
								pathname === link.href ||
								Boolean(pathname?.startsWith(`${link.href}/`));

							return (
								<Link
									key={link.href}
									href={link.href}
									className={`
                    group
                    relative
                    ml-9
                    flex
                    items-center
                    gap-1.5
                    py-2
                    text-[10px]
                    uppercase
                    tracking-[0.14em]
                    transition-colors
                    ${isActive ? "text-white" : "text-white/35 hover:text-white"}
                  `}
								>
									{link.text}

									<ArrowUpRight
										size={10}
										strokeWidth={1.5}
										className={`
                      -translate-y-0.5
                      transition-all
                      duration-200
                      ${
												isActive
													? "translate-x-0.5 opacity-70"
													: "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-70"
											}
                    `}
									/>

									{/* underline */}
									<span
										className={`
                      absolute
                      bottom-0
                      left-0
                      h-px
                      bg-[#7c9cff]
                      transition-all
                      duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
									/>
								</Link>
							);
						})}

						{/* Contact */}
						<Link
							href="/#contact"
							className="
                group
                ml-9
                flex
                items-center
                gap-2
                border
                border-white/10
                px-4
                py-2
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-white/50
                transition-all
                duration-300
                hover:border-white/25
                hover:bg-white/[0.03]
                hover:text-white
              "
						>
							Contact
							<ArrowUpRight
								size={10}
								strokeWidth={1.5}
								className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
							/>
						</Link>
					</div>

					{/* Mobile */}
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
              text-white/50
              transition-colors
              hover:text-white
              md:hidden
            "
					>
						{open ? (
							<X size={19} strokeWidth={1.5} />
						) : (
							<Menu size={19} strokeWidth={1.5} />
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
							initial={{ y: -15, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -15, opacity: 0 }}
							transition={{ duration: 0.25 }}
							className="flex h-full flex-col"
						>
							<div className="px-6">
								{links.map((link, index) => {
									const isActive =
										pathname === link.href ||
										Boolean(pathname?.startsWith(`${link.href}/`));

									return (
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
													className={`
                            text-4xl
                            font-medium
                            tracking-[-0.04em]
                            transition-colors
                            ${isActive ? "text-white" : "text-white/90 group-hover:text-white"}
                          `}
												>
													{link.text}
												</span>
											</div>

											<ArrowUpRight
												size={20}
												strokeWidth={1.5}
												className={`
                          transition-all
                          ${
														isActive
															? "translate-x-1 text-white"
															: "text-white/20 group-hover:translate-x-1 group-hover:text-white"
													}
                        `}
											/>
										</Link>
									);
								})}

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
