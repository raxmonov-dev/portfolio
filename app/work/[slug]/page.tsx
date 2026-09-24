import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCase } from "@/components/ProjectCase";
import { getNextProject, getProject, projects } from "@/data/projects";
import { getRelatedWriting } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — Ruslan Raxmonov`,
      description: project.description,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const nextProject = getNextProject(slug);
  let related: Awaited<ReturnType<typeof getRelatedWriting>> = [];
  try {
    related = await getRelatedWriting(
      [project.title, project.category, ...project.technologies].slice(0, 4),
      3,
    );
  } catch {
    related = [];
  }

  return (
    <ProjectCase
      project={project}
      nextProject={nextProject}
      relatedWriting={related}
    />
  );
}
