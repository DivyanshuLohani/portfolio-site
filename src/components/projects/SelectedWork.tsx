"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/projects";

function getTechName(icon: string) {
	const names: Record<string, string> = {
		"devicon-react-plain": "React",
		"devicon-typescript-plain": "TypeScript",
		"devicon-nodejs-plain": "Node.js",
		"devicon-nextjs-plain": "Next.js",
		"devicon-tailwindcss-plain": "Tailwind",
		"devicon-socketio-original": "Socket.IO",
		"devicon-python-plain": "Python",
		"devicon-django-plain": "Django",
		"devicon-postgresql-plain": "PostgreSQL",
		"devicon-mongodb-plain": "MongoDB",
	};

	return names[icon] ?? icon.split("-")[1] ?? icon;
}

function SelectedWork() {
	const selectedProjects = [...projects]
		.sort((a, b) => b.year.getTime() - a.year.getTime())
		.slice(0, 3);

	return (
		<section id="projects">
			<div className="mx-auto max-w-[1298px] px-6 md:px-10">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="
            flex
            items-baseline
            justify-between
            py-12
            md:py-16
          "
				>
					<h2
						className="
              text-5xl
              font-medium
              leading-none
              tracking-[-0.055em]
              md:text-6xl
              lg:text-[58px]
            "
					>
						Selected work
					</h2>
				</motion.div>

				{/* Projects */}
				<div className="border-t border-white/10">
					{selectedProjects.map((project, index) => {
						const projectUrl =
							project.url || project.liveUrl || `/projects/${project.slug}`;

						return (
							<motion.article
								key={project.slug}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.1 }}
								transition={{
									duration: 0.6,
									delay: index * 0.08,
								}}
								className="
                  border-b
                  border-white/10
                  py-10
                  md:py-10
                "
							>
								{/* Main project */}
								<div
									className="
                    grid
                    grid-cols-1
                    gap-8
                    md:grid-cols-[70px_430px_1fr]
                    md:gap-10
                    lg:grid-cols-[70px_440px_1fr]
                    lg:gap-10
                  "
								>
									{/* Number */}
									<span
										className="
                      hidden
                      text-[11px]
                      tracking-wide
                      text-[#7c9cff]
                      md:block
                    "
									>
										{String(index + 1).padStart(2, "0")}
									</span>

									{/* Information */}
									<div className="flex flex-col">
										<Link href={projectUrl} className="group">
											<h3
												className="
                          max-w-[400px]
                          text-4xl
                          font-medium
                          leading-[0.92]
                          tracking-[-0.045em]
                          text-white
                          transition-opacity
                          duration-200
                          group-hover:opacity-70
                          md:text-5xl
                        "
											>
												{project.name.replace(" - ", "\n")}
											</h3>
										</Link>

										<p
											className="
                        mt-6
                        max-w-[390px]
                        text-sm
                        leading-6
                        text-white/45
                        md:text-[15px]
                      "
										>
											{project.description}
										</p>

										{/* Tech */}
										<div className="mt-7 flex flex-wrap gap-2">
											{project.icons.slice(0, 3).map((icon) => (
												<span
													key={icon}
													className="
                            rounded-full
                            border
                            border-white/10
                            px-3
                            py-1.5
                            text-[10px]
                            text-white/35
                          "
												>
													{getTechName(icon)}
												</span>
											))}
										</div>
									</div>

									{/* Image */}
									<Link
										href={projectUrl}
										className="
                      group
                      relative
                      block
                      overflow-hidden
                      border
                      border-white/10
                      bg-white/[0.02]
                    "
									>
										<div className="aspect-[16/9] w-full">
											<img
												src={project.imageUrl}
												alt={project.name}
												className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-[1.025]
                        "
											/>
										</div>

										{/* subtle hover overlay */}
										<div
											className="
                        absolute
                        inset-0
                        bg-black/0
                        transition-colors
                        duration-500
                        group-hover:bg-black/10
                      "
										/>
									</Link>
								</div>

								{/* Bottom metadata */}
								<div
									className="
                    mt-10
                    grid
                    grid-cols-2
                    items-center
                    gap-4
                    pl-0
                    md:grid-cols-[90px_1fr_auto]
                    md:pl-[80px]
                  "
								>
									<span
										className="
                      text-[10px]
                      uppercase
                      tracking-[0.14em]
                      text-white/25
                    "
									>
										{project.category}
									</span>

									<span className="hidden md:block" />

									{project.liveUrl && (
										<a
											href={project.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="
                        justify-self-end
                        text-sm
                        text-white/50
                        transition-colors
                        hover:text-white
                      "
										>
											View project{" "}
											<ArrowUpRight className="ml-1 inline-block h-3 w-3" />
										</a>
									)}
								</div>
							</motion.article>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default SelectedWork;
