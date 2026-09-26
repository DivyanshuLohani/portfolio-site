"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { projects } from "@/lib/projects";
import ProjectItem from "./ProjectItem";

function getTechStacks() {
	const ret: string[] = [];

	projects.forEach((project) => {
		project.icons.forEach((icon) => {
			if (!ret.includes(icon)) {
				ret.push(icon);
			}
		});
	});

	return ret;
}

function Projects({ n }: { n?: number }) {
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

	const techs = useMemo(() => getTechStacks(), []);

	const filteredProjects = useMemo(() => {
		const filtered = selectedFilter
			? projects.filter((project) => project.icons.includes(selectedFilter))
			: projects;

		return [...filtered]
			.sort((a, b) => b.year.getTime() - a.year.getTime())
			.slice(0, n ?? projects.length);
	}, [selectedFilter, n]);

	return (
		<section id="projects" className="border-b border-white/10 py-24 md:py-32">
			<div className="max-w-[1180px] mx-auto px-6 md:px-10">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="
            flex
            flex-col
            md:flex-row
            md:items-baseline
            md:justify-between
            gap-4
            mb-12
            md:mb-14
          "
				>
					<h2
						className="
              text-4xl
              md:text-5xl
              font-medium
              tracking-[-0.045em]
              leading-none
            "
					>
						Projects
					</h2>

					<span
						className="
              text-[10px]
              uppercase
              tracking-[0.12em]
              text-white/25
            "
					>
						02 / Things I&apos;ve built
					</span>
				</motion.div>

				{/* Filters */}
				<div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-10">
					<button
						onClick={() => setSelectedFilter(null)}
						className={`
              text-[10px]
              uppercase
              tracking-[0.12em]
              transition-colors
              ${
								selectedFilter === null
									? "text-white"
									: "text-white/30 hover:text-white/70"
							}
            `}
					>
						All
					</button>

					{techs.map((tech) => (
						<button
							key={tech}
							onClick={() =>
								setSelectedFilter(selectedFilter === tech ? null : tech)
							}
							className={`
                text-[10px]
                uppercase
                tracking-[0.12em]
                transition-colors
                ${
									selectedFilter === tech
										? "text-white"
										: "text-white/30 hover:text-white/70"
								}
              `}
						>
							{tech.split("-")[1]?.replace("reactnavigation", "react-native")}
						</button>
					))}
				</div>

				{/* Project list */}
				<div className="border-t border-white/10">
					{filteredProjects.map((project) => (
						<ProjectItem key={project.name} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}

export default Projects;
