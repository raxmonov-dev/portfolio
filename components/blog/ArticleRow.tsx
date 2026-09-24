"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { readingTimeLabel } from "@/lib/reading-time";
import { cn } from "@/lib/utils";

export function ArticleRow({
  href,
  date,
  title,
  excerpt,
  category,
  readingTime,
  tags,
  preview,
}: {
  href: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  tags: string[];
  preview?: string | null;
}) {
  const reduce = useReducedMotion();

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden border-t border-border last:border-b"
    >
      <article className="grid gap-3 px-0 py-8 transition-colors duration-300 group-hover:bg-surface md:grid-cols-[140px_minmax(0,1fr)_160px_28px] md:items-start md:gap-8 md:px-4 md:py-10">
        <time className="font-mono text-[11px] tracking-[0.12em] text-muted">
          {date}
        </time>
        <div className="min-w-0">
          <h3
            className={cn(
              "text-[1.6rem] leading-[1.05] font-medium tracking-[-0.035em] uppercase transition-transform duration-300 md:text-[32px]",
              !reduce && "group-hover:translate-x-1.5",
            )}
          >
            {title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{excerpt}</p>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.08em] text-muted">
            {tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </p>
        </div>
        <div className="text-sm text-muted">
          <p>{category}</p>
          <p className="mt-1 font-mono text-[11px] tracking-[0.08em]">
            {readingTimeLabel(readingTime)}
          </p>
        </div>
        <ArrowUpRight
          size={18}
          strokeWidth={1.4}
          className={cn(
            "mt-1 hidden transition-transform duration-300 md:block",
            !reduce && "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          )}
          aria-hidden
        />
      </article>
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="pointer-events-none absolute top-1/2 right-28 hidden h-24 w-40 -translate-y-1/2 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 xl:block"
        />
      ) : null}
    </Link>
  );
}
