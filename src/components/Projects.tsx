"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/projects";

interface ProjectsPageProps {
	projects: Project[];
}

const techNames: Record<string, string> = {
	"devicon-react-plain": "React",
	"devicon-react-original": "React",
	"devicon-typescript-plain": "TypeScript",
	"devicon-javascript-plain": "JavaScript",
	"devicon-nodejs-plain": "Node.js",
	"devicon-nextjs-plain": "Next.js",
	"devicon-tailwindcss-plain": "Tailwind",
	"devicon-socketio-original": "Socket.IO",
	"devicon-python-plain": "Python",
	"devicon-django-plain": "Django",
	"devicon-postgresql-plain": "PostgreSQL",
	"devicon-mongodb-plain": "MongoDB",
	"devicon-flutter-plain": "Flutter",
	"devicon-dart-plain": "Dart",
};

function getTechName(icon: string) {
	return (
		techNames[icon] ||
		icon.replace("devicon-", "").replace("-plain", "").replace("-original", "")
	);
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
	const projectUrl = project.url || project.liveUrl || "#";

	return (
		<motion.article
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.1 }}
			transition={{
				duration: 0.5,
				delay: Math.min(index * 0.04, 0.2),
			}}
			className="
        group
        border-b
        border-white/10
        py-10
        md:py-12
      "
		>
			<div
				className="
          grid
          grid-cols-1
          gap-8
          md:grid-cols-[55px_1fr_390px]
          md:gap-8
          lg:grid-cols-[65px_1fr_450px]
        "
			>
				{/* Number */}
				<div className="hidden md:block">
					<span className="text-[11px] text-[#7c9cff]">
						{String(index + 1).padStart(2, "0")}
					</span>
				</div>

				{/* Information */}
				<div className="flex min-w-0 flex-col justify-between">
					<div>
						<div className="mb-4 flex items-center gap-4">
							<span
								className="
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-white/25
                "
							>
								{project.year.getFullYear()}
							</span>

							{project.category && (
								<>
									<span className="h-px w-5 bg-white/10" />

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
								</>
							)}
						</div>

						<Link href={projectUrl}>
							<h2
								className="
                  max-w-2xl
                  text-3xl
                  font-medium
                  leading-[0.95]
                  tracking-[-0.045em]
                  text-white
                  transition-opacity
                  duration-200
                  group-hover:opacity-70
                  md:text-4xl
                  lg:text-5xl
                "
							>
								{project.name}
							</h2>
						</Link>

						<p
							className="
                mt-5
                max-w-xl
                text-sm
                leading-6
                text-white/40
                md:text-[15px]
              "
						>
							{project.description}
						</p>
					</div>

					{/* Bottom metadata */}
					<div className="mt-8 flex flex-wrap items-center gap-2">
						{project.icons.map((icon) => (
							<span
								key={icon}
								className="
                  border
                  border-white/10
                  px-3
                  py-1.5
                  text-[9px]
                  uppercase
                  tracking-[0.08em]
                  text-white/30
                "
							>
								{getTechName(icon)}
							</span>
						))}
					</div>
				</div>

				{/* Image */}
				<div className="flex flex-col">
					<Link
						href={projectUrl}
						className="
              relative
              block
              overflow-hidden
              border
              border-white/10
              bg-white/[0.02]
            "
					>
						<div className="aspect-[16/10] w-full overflow-hidden">
							<img
								src={project.imageUrl}
								alt={project.name}
								loading="lazy"
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
					</Link>

					{/* Links */}
					<div className="mt-5 flex items-center justify-between">
						<span
							className="
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-white/20
              "
						>
							Project {String(index + 1).padStart(2, "0")}
						</span>

						{project.liveUrl && (
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="
                  text-sm
                  text-white/40
                  transition-colors
                  hover:text-white
                "
							>
								Visit <ArrowUpRightIcon className="ml-1 inline h-3 w-3" />
							</a>
						)}
					</div>
				</div>
			</div>
		</motion.article>
	);
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
	const [search, setSearch] = useState("");
	const [selectedTech, setSelectedTech] = useState<string | null>(null);

	const technologies = useMemo(() => {
		const all = projects.flatMap((project) => project.icons.flat());

		return [...new Set(all)];
	}, [projects]);

	const filteredProjects = useMemo(() => {
		const query = search.trim().toLowerCase();

		return [...projects]
			.sort((a, b) => b.year.getTime() - a.year.getTime())
			.filter((project) => {
				const matchesSearch =
					!query ||
					project.name.toLowerCase().includes(query) ||
					project.description.toLowerCase().includes(query) ||
					project.category?.toLowerCase().includes(query) ||
					project.icons.some((icon) =>
						getTechName(icon).toLowerCase().includes(query),
					);

				const matchesTech =
					!selectedTech || project.icons.includes(selectedTech);

				return matchesSearch && matchesTech;
			});
	}, [projects, search, selectedTech]);

	return (
		<main className="min-h-screen border-b border-white/10">
			<div className="mx-auto max-w-[1298px] px-6 md:px-10">
				{/* Header */}
				<header className="border-b border-white/10 py-12 md:py-16">
					<div className="flex items-end justify-between gap-8">
						<div>
							<h1
								className="
                  text-6xl
                  font-medium
                  leading-[0.88]
                  tracking-[-0.06em]
                  md:text-8xl
                  lg:text-[100px]
                "
							>
								Projects
							</h1>
						</div>

						<span
							className="
                hidden
                text-[10px]
                uppercase
                tracking-[0.15em]
                text-white/25
                md:block
              "
						>
							{projects.length} {projects.length === 1 ? "Project" : "Projects"}
						</span>
					</div>

					<p
						className="
              mt-8
              max-w-xl
              text-sm
              leading-6
              text-white/40
              md:text-base
            "
					>
						Things I&apos;ve built, broken, rebuilt, and occasionally managed to
						ship.
					</p>
				</header>

				{/* Controls */}
				<section className="border-b border-white/10 py-7">
					{/* Search */}
					<div className="flex items-center border-b border-white/10">
						<span className="pb-4 text-sm text-white/20">/</span>

						<input
							type="text"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder="Search projects..."
							className="
                w-full
                bg-transparent
                px-4
                py-4
                text-sm
                text-white
                outline-none
                placeholder:text-white/20
              "
						/>

						{search && (
							<button
								onClick={() => setSearch("")}
								className="
                  pb-4
                  text-[10px]
                  uppercase
                  tracking-[0.1em]
                  text-white/25
                  hover:text-white
                "
							>
								Clear
							</button>
						)}
					</div>

					{/* Technology filters */}
					<div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
						<button
							onClick={() => setSelectedTech(null)}
							className={`
                text-[10px]
                uppercase
                tracking-[0.12em]
                transition-colors
                ${
									selectedTech === null
										? "text-white"
										: "text-white/30 hover:text-white/70"
								}
              `}
						>
							All
						</button>

						{technologies.map((tech, i) => (
							<button
								key={tech ?? i}
								onClick={() =>
									setSelectedTech(selectedTech === tech ? null : tech)
								}
								className={`
                  text-[10px]
                  uppercase
                  tracking-[0.12em]
                  transition-colors
                  ${
										selectedTech === tech
											? "text-white"
											: "text-white/30 hover:text-white/70"
									}
                `}
							>
								{getTechName(tech)}
							</button>
						))}
					</div>
				</section>

				{/* Result count */}
				<div className="flex items-center justify-between py-6">
					<span
						className="
              text-[10px]
              uppercase
              tracking-[0.14em]
              text-white/25
            "
					>
						{filteredProjects.length}{" "}
						{filteredProjects.length === 1 ? "project" : "projects"}
					</span>

					{(search || selectedTech) && (
						<button
							onClick={() => {
								setSearch("");
								setSelectedTech(null);
							}}
							className="
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-white/30
                hover:text-white
              "
						>
							Clear filters
						</button>
					)}
				</div>

				{/* Projects */}
				<section>
					{filteredProjects.map((project, index) => (
						<ProjectRow key={project.slug} project={project} index={index} />
					))}
				</section>

				{/* Empty state */}
				{filteredProjects.length === 0 && (
					<div className="border-b border-white/10 py-32 text-center">
						<p className="text-lg text-white/40">No projects found.</p>

						<p className="mt-2 text-sm text-white/20">
							The search has successfully defeated the portfolio.
						</p>

						<button
							onClick={() => {
								setSearch("");
								setSelectedTech(null);
							}}
							className="
                mt-6
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-white/40
                hover:text-white
              "
						>
							Clear filters
						</button>
					</div>
				)}
			</div>
		</main>
	);
}
