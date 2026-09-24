"use client";

import { useState } from "react";
import type { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  if (items.length < 3) return null;

  return (
    <>
      <nav aria-label="On this page" className="mb-10 border border-border p-5 lg:hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between font-mono text-[11px] tracking-[0.18em] text-muted uppercase"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          On this page
          <span aria-hidden>{open ? "–" : "+"}</span>
        </button>
        {open ? <TocList items={items} className="mt-4" /> : null}
      </nav>

      <nav
        aria-label="On this page"
        className="sticky top-28 hidden lg:block"
      >
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          On this page
        </p>
        <TocList items={items} className="mt-4" />
      </nav>
    </>
  );
}

function TocList({ items, className }: { items: TocItem[]; className?: string }) {
  return (
    <ol className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <li key={item.id} className={item.level === 3 ? "pl-4" : undefined}>
          <a
            href={`#${item.id}`}
            className="link-underline text-[13px] leading-5 text-muted hover:text-foreground"
          >
            <span className="font-mono text-[10px] tracking-[0.12em]">
              {String(index + 1).padStart(2, "0")}
            </span>{" "}
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
