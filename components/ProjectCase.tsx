import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { PageFade } from "@/components/PageFade";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal } from "@/components/Reveal";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import type { Project } from "@/data/projects";
import type { PostWithRelations } from "@/lib/posts";

function StatusLabel({ status }: { status: Project["status"] }) {
  const labels = {
    building: "Building",
    exploring: "Exploring",
    concept: "Concept",
  } as const;

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground" />
      {labels[status]}
    </span>
  );
}

export function ProjectCase({
  project,
  nextProject,
  relatedWriting = [],
}: {
  project: Project;
  nextProject: Project;
  relatedWriting?: PostWithRelations[];
}) {
  const links = [
    project.website ? { label: "Website", href: project.website } : null,
    project.github ? { label: "GitHub", href: project.github } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <main id="main">
      <PageFade>
        <article>
          <header className="pt-[120px] pb-12 md:pt-[140px] md:pb-16">
            <Container>
              <Link
                href="/#work"
                className="link-underline inline-flex items-center gap-2 text-[13px] text-muted"
              >
                <ArrowLeft size={14} strokeWidth={1.5} aria-hidden />
                Selected work
              </Link>

              <p className="mt-10 font-mono text-[11px] tracking-[0.18em] text-muted">
                {project.number}
              </p>
              <h1 className="mt-3 text-5xl leading-[0.95] font-medium tracking-[-0.045em] uppercase sm:text-6xl md:text-7xl lg:text-[84px]">
                {project.title}
              </h1>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
                <p>{project.category}</p>
                <p className="font-mono text-[12px] tracking-[0.08em]">{project.year}</p>
                <StatusLabel status={project.status} />
              </div>

              <p className="mt-8 max-w-2xl text-[17px] leading-8 text-foreground/80 md:text-xl md:leading-9">
                {project.introduction}
              </p>
            </Container>
          </header>

          <Container>
            <Reveal>
              <ProjectVisual
                project={project}
                priority
                className="aspect-[16/9] w-full md:aspect-[16/8]"
                sizes="(min-width: 1400px) 1400px, 100vw"
              />
            </Reveal>
          </Container>

          <Container className="py-16 md:py-24">
            <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
              <Reveal>
                <section>
                  <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                    Overview
                  </h2>
                  <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted md:text-base md:leading-8">
                    {project.overview}
                  </p>
                </section>
              </Reveal>

              <div className="grid gap-12">
                <Reveal>
                  <section>
                    <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                      Problem
                    </h2>
                    <p className="mt-4 text-[15px] leading-7 md:text-base md:leading-8">
                      {project.problem}
                    </p>
                  </section>
                </Reveal>
                <Reveal delay={0.04}>
                  <section>
                    <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                      Solution
                    </h2>
                    <p className="mt-4 text-[15px] leading-7 md:text-base md:leading-8">
                      {project.solution}
                    </p>
                  </section>
                </Reveal>
              </div>
            </div>
          </Container>

          <section className="border-t border-border py-16 md:py-24">
            <Container>
              <Reveal>
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                  Features
                </h2>
              </Reveal>
              <ul className="mt-10">
                {project.features.map((feature, index) => (
                  <Reveal key={feature.title} delay={index * 0.03}>
                    <li className="grid gap-3 border-t border-border py-8 last:border-b md:grid-cols-[80px_minmax(0,280px)_minmax(0,1fr)] md:gap-10">
                      <p className="font-mono text-[11px] tracking-[0.16em] text-muted">
                        0{index + 1}
                      </p>
                      <h3 className="text-xl font-medium tracking-[-0.025em]">
                        {feature.title}
                      </h3>
                      <p className="text-[15px] leading-7 text-muted">
                        {feature.description}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Container>
          </section>

          <section className="border-t border-border py-16 md:py-24">
            <Container>
              <Reveal>
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                  Technology
                </h2>
                <p className="mt-8 max-w-3xl text-2xl leading-snug font-medium tracking-[-0.03em] md:text-3xl">
                  {project.technologies.map((tech, index) => (
                    <span key={tech}>
                      {tech}
                      {index < project.technologies.length - 1 ? (
                        <span className="font-normal text-muted"> / </span>
                      ) : null}
                    </span>
                  ))}
                </p>
              </Reveal>
            </Container>
          </section>

          <section className="border-t border-border py-16 md:py-24">
            <Container>
              <Reveal>
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                  Visuals
                </h2>
                <p className="mt-3 max-w-xl text-sm text-muted">
                  Monochrome studies for the product language. Screenshots will
                  replace these as the work ships.
                </p>
              </Reveal>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <Reveal>
                  <ProjectVisual
                    project={project}
                    className="aspect-[4/3] w-full"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </Reveal>
                <Reveal delay={0.05}>
                  <div className="relative aspect-[4/3] overflow-hidden border border-border bg-foreground">
                    <div className="absolute inset-0 opacity-90">
                      <ProjectVisual
                        project={project}
                        className="h-full w-full border-0 invert"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>

          <section className="border-t border-border py-16 md:py-24">
            <Container className="grid gap-10 md:grid-cols-[200px_minmax(0,1fr)]">
              <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                Outcome
              </h2>
              <Reveal>
                <p className="max-w-2xl text-[17px] leading-8 md:text-xl md:leading-9">
                  {project.outcome}
                </p>
                {links.length > 0 ? (
                  <div className="mt-8 flex flex-wrap gap-4">
                    {links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-medium transition-colors duration-300 hover:bg-foreground hover:text-background"
                      >
                        {link.label}
                        <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
                      </a>
                    ))}
                  </div>
                ) : null}
              </Reveal>
            </Container>
          </section>

          {relatedWriting.length >= 2 ? (
            <Container>
              <RelatedPosts posts={relatedWriting} />
            </Container>
          ) : null}

          <section className="bg-foreground text-background">
            <Container className="py-16 md:py-20">
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/40 uppercase">
                Next project
              </p>
              <Link
                href={`/work/${nextProject.slug}`}
                className="group mt-5 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
              >
                <div>
                  <p className="font-mono text-[11px] text-white/40">
                    {nextProject.number}
                  </p>
                  <h2 className="mt-2 text-4xl font-medium tracking-[-0.04em] uppercase transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl md:text-6xl">
                    {nextProject.title}
                  </h2>
                  <p className="mt-3 text-sm text-white/50">{nextProject.category}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm">
                  View project
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </Container>
          </section>
        </article>
        <Footer />
      </PageFade>
    </main>
  );
}
