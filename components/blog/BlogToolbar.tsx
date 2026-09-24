"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function BlogToolbar({
  categories,
  activeCategory,
  query,
}: {
  categories: { name: string; slug: string }[];
  activeCategory?: string;
  query?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function replace(next: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });
    const suffix = params.toString();
    router.replace(suffix ? `${pathname}?${suffix}` : pathname, { scroll: false });
  }

  return (
    <div className="mt-10 flex flex-col gap-6">
      <label className="block border-b border-border">
        <span className="sr-only">Search articles</span>
        <input
          ref={inputRef}
          type="search"
          defaultValue={query}
          placeholder="Search articles..."
          onChange={(event) => {
            const value = event.target.value;
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
              replace({ q: value || undefined, category: activeCategory });
            }, 280);
          }}
          className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-muted"
        />
      </label>

      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2 md:w-full md:flex-wrap">
          <FilterChip
            active={!activeCategory}
            onClick={() => replace({ category: undefined, q: query })}
          >
            All
          </FilterChip>
          {categories.map((category) => (
            <FilterChip
              key={category.slug}
              active={activeCategory === category.slug}
              onClick={() =>
                replace({
                  category: activeCategory === category.slug ? undefined : category.slug,
                  q: query,
                })
              }
            >
              {category.name}
            </FilterChip>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 shrink-0 px-3 text-[12px] tracking-[0.08em] uppercase transition-colors duration-300",
        active
          ? "bg-foreground text-background"
          : "border border-border text-muted hover:border-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
