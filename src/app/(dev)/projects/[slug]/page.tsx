import { getProject } from "@/lib/github";
import { notFound } from "next/navigation";
import Image from "next/image";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { CodeBlock } from "@/app/(blog)/posts/[slug]/components/PostBody";
import { FaGithub } from "react-icons/fa";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}) {
    const project = await getProject(params.slug);

    if (!project) return;

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

export default async function Page({
    params,
}: {
    params: { slug: string };
}) {
    const project = await getProject(params.slug);

    if (!project) return notFound();

    return (
        <div className="container mx-auto px-4 py-12">
            <article className="prose prose-invert max-w-4xl mx-auto">
                <Image
                    src={project.imageUrl}
                    width={1600}
                    height={900}
                    alt={project.name}
                    className="rounded-xl w-full mb-10"
                />

                <header className="mb-12">
                    <h1 className="text-5xl font-bold mb-4">
                        {project.name}
                    </h1>

                    <p className="text-white/70 text-lg">
                        {project.description}
                    </p>

                    <div className="flex gap-3 flex-wrap mt-6">
                        {project.icons.map((icon) => (
                            <div
                                key={icon}
                                className="border border-white/10 rounded-full px-3 py-1 flex items-center gap-2"
                            >
                                <i className={icon} />
                                <span>
                                    {icon
                                        .split("-")[1]
                                        .replace("reactnavigation", "react-native")}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 mt-8">
                        <a
                            href={`https://github.com/DivyanshuLohani/${project.slug}`}
                            target="_blank"
                            className="px-5 py-2 rounded-lg bg-white text-black font-medium decoration-none flex items-center gap-2"
                        >
                            <FaGithub size={15} />
                            <span>
                                GitHub
                            </span>
                        </a>

                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                className="px-5 py-2 rounded-lg border border-white/20"
                            >
                                Live Demo
                            </a>
                        )}
                    </div>
                </header>

                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSanitize, rehypeRaw]}
                    components={
                        { code: CodeBlock, }
                    }
                >
                    {project.markdown}
                </ReactMarkdown>
            </article>
        </div>
    );
}