"use server";

import { projects } from "./projects";

const headers = new Headers();

// headers.append("Authorization", `Bearer ${process.env.GITHUB_TOKEN}`);

export async function getProject(slug: string) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) return null;

  const readme = await fetch(
    `https://api.github.com/repos/DivyanshuLohani/${project.slug}/readme`,
    {
      headers,
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!readme.ok) {
    console.error(readme);
    return null;
  }

  const data = await readme.json();

  const markdown = Buffer.from(data.content, "base64").toString("utf-8");

  return {
    ...project,
    markdown,
  };
}
