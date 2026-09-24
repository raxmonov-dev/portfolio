"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { ProjectVisual } from "@/components/ProjectVisual";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectRow({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block overflow-hidden border-t border-border last:border-b"
    >
      <article className="relative grid items-start gap-3 px-0 py-8 transition-colors duration-300 group-hover:bg-surface sm:py-10 md:grid-cols-[64px_minmax(0,1fr)_minmax(0,220px)_72px_28px] md:items-center md:gap-6 md:px-4 lg:grid-cols-[80px_minmax(0,1fr)_260px_80px_32px] lg:px-6">
        <span className="font-mono text-[11px] tracking-[0.16em] text-muted">
          {project.number}
        </span>

        <div className="min-w-0">
          <h3
            className={cn(
              "text-[1.75rem] leading-none font-medium tracking-[-0.035em] uppercase transition-transform duration-300 sm:text-4xl md:text-[40px] lg:text-[44px]",
              !reduce && "group-hover:translate-x-1.5",
            )}
          >
            {project.title}
          </h3>
          <p className="mt-3 text-sm text-muted md:hidden">{project.category}</p>
        </div>

        <p className="hidden text-sm text-muted md:block">{project.category}</p>
        <p className="hidden font-mono text-[12px] tracking-[0.08em] text-muted md:block">
          {project.year}
        </p>

        <div className="mt-2 flex items-center justify-between md:mt-0 md:justify-end">
          <span className="text-sm text-muted md:hidden">
            {project.year} · View project
          </span>
          <ArrowUpRight
            size={20}
            strokeWidth={1.4}
            className={cn(
              "transition-transform duration-300",
              !reduce && "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            )}
            aria-hidden
          />
        </div>
      </article>

      <div
        aria-hidden
        data-keep-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 right-36 hidden w-[220px] -translate-y-1/2 transition-all duration-300 xl:block",
          hovered && !reduce ? "translate-y-[-50%] opacity-100" : "translate-y-[calc(-50%+8px)] opacity-0",
        )}
      >
        <ProjectVisual
          project={project}
          className="aspect-[16/10] w-full shadow-sm"
          sizes="260px"
        />
      </div>
    </Link>
  );
}
