import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

export function ProjectVisual({
  project,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 720px, 100vw",
}: {
  project: Project;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-border bg-surface",
        className,
      )}
    >
      <Image
        src={project.image}
        alt={`${project.title} visual`}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized
        className="object-cover"
      />
    </div>
  );
}
