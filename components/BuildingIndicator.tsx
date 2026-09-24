"use client";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function BuildingIndicator({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <a
      href={siteConfig.currentProject.href}
      className={cn(
        "group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase",
        inverted ? "text-white/70 hover:text-white" : "text-muted hover:text-foreground",
        className,
      )}
      aria-label={`Currently building ${siteConfig.currentProject.name}`}
    >
      <span
        className={cn(
          "motion-pulse inline-block h-1.5 w-1.5 rounded-full",
          inverted ? "bg-white" : "bg-foreground",
        )}
        aria-hidden
      />
      <span className="relative">
        Building
        <span className="pointer-events-none invisible absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 whitespace-nowrap bg-foreground px-2 py-1 text-[10px] tracking-[0.12em] text-background opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100">
          Currently building {siteConfig.currentProject.name}
        </span>
      </span>
    </a>
  );
}
