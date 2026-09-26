"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Project {
	imageUrl: string;
	liveUrl: string | null;
	url: string | null;
	slug: string;
	year: Date;
	name: string;
	description: string;
	icons: string[];
}

interface ProjectCardProps {
	project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	const href = project.url || `/projects/${project.slug}`;

	return (
		<motion.article
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
			transition={{ duration: 0.5 }}
			className="group"
		>
			{/* Image */}
			<Link href={href} className="block">
				<div className="relative overflow-hidden bg-white/[0.03] aspect-[16/10]">
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
              group-hover:scale-[1.03]
            "
					/>

					{/* subtle overlay */}
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
				</div>
			</Link>

			{/* Meta */}
			<div className="pt-5">
				<div className="flex items-start justify-between gap-6">
					<div>
						<Link href={href}>
							<h3
								className="
                  text-xl
                  md:text-2xl
                  font-normal
                  tracking-[-0.03em]
                  text-white/90
                  transition-colors
                  group-hover:text-white
                "
							>
								{project.name}
							</h3>
						</Link>

						<p className="mt-2 max-w-xl text-sm leading-6 text-white/35">
							{project.description}
						</p>
					</div>

					<span
						className="
              shrink-0
              text-[10px]
              uppercase
              tracking-[0.12em]
              text-white/25
            "
					>
						{project.year.getFullYear()}
					</span>
				</div>

				{/* Technologies */}
				<div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
					{project.icons.slice(0, 3).map((icon) => (
						<span
							key={icon}
							className="
                text-[10px]
                uppercase
                tracking-[0.1em]
                text-white/25
              "
						>
							{icon.split("-")[1]?.replace("reactnavigation", "react-native")}
						</span>
					))}
				</div>
			</div>
		</motion.article>
	);
}
