"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Project {
	name: string;
	description?: string;
	year: Date;
	icons: string[];
	href?: string;
}

interface ProjectItemProps {
	project: Project;
}

export default function ProjectItem({ project }: ProjectItemProps) {
	const content = (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.45 }}
			className="
        group
        grid
        grid-cols-[70px_1fr_auto_30px]
        md:grid-cols-[110px_1fr_180px_40px]
        gap-4
        md:gap-7
        items-center
        py-8
        border-b
        border-white/10
        transition-all
        duration-300
        hover:bg-white/[0.02]
        hover:px-3
      "
		>
			{/* Year */}
			<span className="text-[10px] md:text-[11px] text-white/30 uppercase tracking-wide">
				{project.year.getFullYear()}
			</span>

			{/* Project */}
			<div className="min-w-0">
				<h3
					className="
            text-xl
            md:text-2xl
            font-normal
            tracking-[-0.03em]
            text-white/90
            transition-colors
            duration-200
            group-hover:text-white
          "
				>
					{project.name}
				</h3>

				{project.description && (
					<p className="mt-2 max-w-2xl text-sm text-white/35 leading-6">
						{project.description}
					</p>
				)}
			</div>

			{/* Technologies */}
			<div className="hidden md:flex justify-end gap-2">
				{project.icons.slice(0, 3).map((icon) => (
					<span
						key={icon}
						className="
              text-[10px]
              uppercase
              tracking-[0.08em]
              text-white/30
            "
					>
						{icon.split("-")[1]?.replace("reactnavigation", "react-native")}
					</span>
				))}
			</div>

			{/* Arrow */}
			<span
				className="
          text-lg
          text-white/25
          text-right
          transition-all
          duration-200
          group-hover:text-white/70
          group-hover:translate-x-1
        "
			>
				↗
			</span>
		</motion.div>
	);

	if (!project.href) {
		return <div>{content}</div>;
	}

	return (
		<Link href={project.href} className="block">
			{content}
		</Link>
	);
}
