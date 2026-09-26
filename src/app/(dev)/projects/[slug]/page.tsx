import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/app/(blog)/posts/[slug]/components/PostBody";
import { getProject } from "@/lib/github";

const techNames: Record<string, string> = {
	"devicon-react-plain": "React",
	"devicon-react-original": "React",
	"devicon-typescript-plain": "TypeScript",
	"devicon-javascript-plain": "JavaScript",
	"devicon-nextjs-plain": "Next.js",
	"devicon-tailwindcss-plain": "Tailwind",
	"devicon-socketio-original": "Socket.IO",
	"devicon-nodejs-plain": "Node.js",
	"devicon-python-plain": "Python",
	"devicon-django-plain": "Django",
	"devicon-postgresql-plain": "PostgreSQL",
	"devicon-mongodb-plain": "MongoDB",
	"devicon-flutter-plain": "Flutter",
};

function getTechName(icon: string) {
	return (
		techNames[icon] ||
		icon.replace("devicon-", "").replace("-plain", "").replace("-original", "")
	);
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}) {
	const project = await getProject(params.slug);

	if (!project) notFound();

	return {
		title: project.name,
		description: project.description,

		openGraph: {
			title: project.name,
			description: project.description,
			images: [
				{
					url: project.imageUrl,
				},
			],
		},
	};
}

export default async function Page({ params }: { params: { slug: string } }) {
	const project = await getProject(params.slug);

	if (!project) {
		return notFound();
	}

	return (
		<main className="min-h-screen border-b border-white/10">
			<div className="mx-auto max-w-[1180px] px-6 md:px-10">
				{/* Header */}
				<header className="pt-28 md:pt-36">
					{/* Back */}
					<Link
						href="/projects"
						className="
              group
              inline-flex
              items-center
              gap-2
              text-[10px]
              uppercase
              tracking-[0.14em]
              text-white/30
              transition-colors
              hover:text-white
            "
					>
						<ArrowLeft
							size={12}
							strokeWidth={1.5}
							className="
                transition-transform
                group-hover:-translate-x-1
              "
						/>
						Back to projects
					</Link>

					{/* Meta */}
					<div className="mt-10 flex items-center gap-3">
						<span
							className="
                h-2
                w-2
                bg-[#7c9cff]
              "
						/>

						<span
							className="
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-white/30
              "
						>
							Project
						</span>

						<span className="h-px w-5 bg-white/10" />

						<span
							className="
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-white/25
              "
						>
							{project.year instanceof Date
								? project.year.getFullYear()
								: new Date(project.year).getFullYear()}
						</span>
					</div>

					{/* Title */}
					<h1
						className="
              mt-7
              max-w-[1050px]
              text-5xl
              font-medium
              leading-[0.92]
              tracking-[-0.055em]
              text-white
              md:text-7xl
              lg:text-[88px]
            "
					>
						{project.name}
					</h1>

					{/* Description */}
					<p
						className="
              mt-7
              max-w-[720px]
              text-base
              leading-7
              text-white/40
              md:text-lg
            "
					>
						{project.description}
					</p>

					{/* Technologies */}
					<div className="mt-8 flex flex-wrap gap-2">
						{project.icons.map((icon) => (
							<span
								key={icon}
								className="
                  flex
                  items-center
                  gap-2
                  border
                  border-white/10
                  px-3
                  py-1.5
                  text-[9px]
                  uppercase
                  tracking-[0.1em]
                  text-white/35
                "
							>
								<i className={icon} />

								{getTechName(icon)}
							</span>
						))}
					</div>

					{/* Links */}
					<div
						className="
              mt-10
              flex
              flex-wrap
              items-center
              gap-6
              border-t
              border-white/10
              pt-6
            "
					>
						<a
							href={`https://github.com/DivyanshuLohani/${project.slug}`}
							target="_blank"
							rel="noopener noreferrer"
							className="
                group
                flex
                items-center
                gap-2
                text-sm
                text-white/50
                transition-colors
                hover:text-white
              "
						>
							<FaGithub size={15} />

							<span>GitHub</span>

							<ArrowUpRight
								size={13}
								strokeWidth={1.5}
								className="
                  transition-transform
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
							/>
						</a>

						{project.liveUrl && (
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="
                  group
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-white/50
                  transition-colors
                  hover:text-white
                "
							>
								<span>Live demo</span>

								<ArrowUpRight
									size={13}
									strokeWidth={1.5}
									className="
                    transition-transform
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
								/>
							</a>
						)}
					</div>
				</header>

				{/* Hero image */}
				<div
					className="
            mt-12
            overflow-hidden
            border
            border-white/10
            bg-white/[0.02]
          "
				>
					<Image
						src={project.imageUrl}
						width={1600}
						height={900}
						alt={project.name}
						priority
						className="
              h-auto
              w-full
              object-cover
            "
					/>
				</div>

				{/* Project content */}
				<div className="mx-auto max-w-[820px]">
					<div className="project-body">
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeHighlight, rehypeSanitize, rehypeRaw]}
							components={{
								code: CodeBlock,
							}}
						>
							{project.markdown}
						</ReactMarkdown>
					</div>

					{/* Bottom navigation */}
					<div
						className="
              mt-20
              flex
              items-center
              justify-between
              border-t
              border-white/10
              py-8
            "
					>
						<Link
							href="/projects"
							className="
                group
                flex
                items-center
                gap-2
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-white/30
                transition-colors
                hover:text-white
              "
						>
							<ArrowLeft
								size={12}
								strokeWidth={1.5}
								className="
                  transition-transform
                  group-hover:-translate-x-1
                "
							/>
							All projects
						</Link>

						{project.liveUrl && (
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="
                  group
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  text-white/30
                  transition-colors
                  hover:text-white
                "
							>
								Open project
								<ArrowUpRight
									size={12}
									strokeWidth={1.5}
									className="
                    transition-transform
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
								/>
							</a>
						)}
					</div>

					<div className="h-24 md:h-32" />
				</div>
			</div>
		</main>
	);
}
