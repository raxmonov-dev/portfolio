import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { contactLinks } from "@/data/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="dark-section scroll-mt-0 bg-foreground text-background"
    >
      <Container className="py-24 md:py-32 lg:py-40">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-white/45 uppercase">
            07 — Contact
          </p>
          <h2 className="mt-5 text-[2.6rem] leading-[0.95] font-medium tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[88px]">
            Have an idea?
            <br />
            Let&apos;s build it.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-white/60 md:text-base">
            Open to interesting ideas, collaborations and ambitious projects.
          </p>
        </Reveal>

        <ul className="mt-14 border-t border-white/15 md:mt-20">
          {contactLinks.map((link, index) => {
            const href = link.href;
            const available = Boolean(href);

            const inner = (
              <>
                <span className="font-mono text-[11px] tracking-[0.16em] text-white/40">
                  0{index + 1}
                </span>
                <span className="text-2xl font-medium tracking-[-0.03em] md:text-4xl">
                  {link.label}
                </span>
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.4}
                  className="ml-auto transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </>
            );

            return (
              <li key={link.label} className="border-b border-white/15">
                {available ? (
                  <a
                    href={href}
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group grid grid-cols-[48px_minmax(0,1fr)_24px] items-center gap-4 py-6 transition-colors duration-300 hover:bg-white/5 md:grid-cols-[72px_minmax(0,1fr)_28px] md:px-3"
                  >
                    {inner}
                  </a>
                ) : (
                  <span
                    className="group grid grid-cols-[48px_minmax(0,1fr)_24px] items-center gap-4 py-6 md:grid-cols-[72px_minmax(0,1fr)_28px] md:px-3"
                    title={`${link.label} link coming soon`}
                  >
                    {inner}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
