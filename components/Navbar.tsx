"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BuildingIndicator } from "@/components/BuildingIndicator";
import { Container } from "@/components/Container";
import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "enter-fade fixed inset-x-0 top-0 z-50 h-[72px] transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-border bg-white/95 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-full items-center justify-between">
          <Link
            href="/"
            className="text-[13px] font-medium tracking-[0.18em] uppercase"
          >
            {siteConfig.name}
          </Link>

          <BuildingIndicator className="absolute left-1/2 hidden -translate-x-1/2 lg:inline-flex" />

          <nav className="hidden items-center gap-5 lg:gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline text-[13px] font-medium tracking-[-0.01em]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </Container>
      </header>

      {open ? (
        <div id="mobile-nav" className="fixed inset-0 z-40 bg-white pt-[72px] md:hidden">
          <nav className="flex h-full flex-col justify-between px-5 pb-10" aria-label="Mobile">
            <div className="flex flex-col gap-2 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-4xl font-medium tracking-[-0.03em]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <BuildingIndicator />
          </nav>
        </div>
      ) : null}
    </>
  );
}
