import Link from "next/link";
import { Container } from "@/components/Container";
import { navLinks, siteConfig } from "@/data/site";

export function Footer() {
  const social = [
    { label: "GitHub", href: siteConfig.links.github },
    { label: "Instagram", href: siteConfig.links.instagram },
    { label: "Telegram", href: siteConfig.links.telegram },
  ];

  return (
    <footer className="bg-foreground text-background">
      <Container className="flex flex-col gap-6 border-t border-white/15 py-6 text-[11px] tracking-[0.04em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {siteConfig.name}</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
          {social.map((link) =>
            link.href ? (
              <a key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ) : (
              <span key={link.label}>{link.label}</span>
            ),
          )}
        </nav>
        <p>{siteConfig.location}</p>
      </Container>
      <Container className="pb-6">
        <p className="text-[11px] tracking-[0.08em] text-white/30">
          Built with curiosity.
        </p>
      </Container>
    </footer>
  );
}
