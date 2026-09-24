"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center pt-[108px] pb-28 md:pt-[72px]">
      <Container>
        <div className="max-w-5xl">
          <p className="enter-1 font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
            {siteConfig.label}
          </p>

          <h1 className="enter-2 mt-5 text-[2.35rem] leading-[0.98] font-medium tracking-[-0.045em] text-balance sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px]">
            I build AI products, startups & digital experiences.
          </h1>

          <p className="enter-3 mt-6 max-w-xl text-[15px] leading-7 text-muted sm:text-base md:text-lg md:leading-8">
            I&apos;m Ruslan Raxmonov — a student and builder exploring AI,
            startups, cybersecurity and products that solve real problems.
          </p>

          <div className="enter-4 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/#work"
              className={cn(buttonVariants({ size: "default" }), "w-full sm:w-auto")}
            >
              View selected work
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "w-full sm:w-auto",
              )}
            >
              Let&apos;s talk
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
            </Link>
          </div>

          <div className="enter-5 mt-10">
            <Link
              href={siteConfig.currentProject.href}
              className="group inline-flex items-center gap-3 border-t border-border pt-5 text-sm"
            >
              <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.14em] text-muted uppercase">
                <span className="motion-pulse inline-block h-1.5 w-1.5 rounded-full bg-foreground" />
                Currently building
              </span>
              <span className="font-medium tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-0.5">
                {siteConfig.currentProject.name}
              </span>
            </Link>
          </div>
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-7">
        <Container>
          <Link
            href="/#work"
            className="enter-6 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-muted uppercase"
          >
            Scroll to explore
            <span aria-hidden className="scroll-arrow inline-block">
              <ArrowDown size={12} strokeWidth={1.5} />
            </span>
          </Link>
        </Container>
      </div>
    </section>
  );
}
