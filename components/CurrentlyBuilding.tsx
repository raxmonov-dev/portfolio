import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { nowItems } from "@/data/site";

export function CurrentlyBuilding() {
  return (
    <section id="currently" className="scroll-mt-24 border-t border-border py-24 md:py-32 lg:py-36">
      <Container>
        <Reveal>
          <SectionHeader
            number="03"
            label="Currently"
            title="What I'm working on now."
          />
        </Reveal>

        <div className="mt-12 md:mt-16">
          {nowItems.map((item, index) => {
            const content = (
              <div className="grid items-start gap-2 py-7 md:grid-cols-[160px_minmax(0,1fr)_minmax(0,1.2fr)_20px] md:items-center md:gap-8">
                <p className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground" />
                  {item.status}
                </p>
                <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-[28px]">
                  {item.title}
                </h3>
                <p className="text-sm text-muted md:text-[15px]">{item.detail}</p>
                {item.href ? (
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.4}
                    className="hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:block"
                    aria-hidden
                  />
                ) : (
                  <span className="hidden md:block" />
                )}
              </div>
            );

            return (
              <Reveal key={item.title} delay={index * 0.04}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group block border-t border-border transition-colors duration-300 last:border-b hover:bg-surface"
                  >
                    <div className="md:px-3">{content}</div>
                  </Link>
                ) : (
                  <div className="border-t border-border last:border-b">
                    <div className="md:px-3">{content}</div>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
