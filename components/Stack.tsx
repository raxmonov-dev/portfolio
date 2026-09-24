import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { stack } from "@/data/site";

export function Stack() {
  return (
    <section id="tools" className="scroll-mt-24 border-t border-border py-24 md:py-32 lg:py-36">
      <Container>
        <Reveal>
          <SectionHeader number="04" label="Tools" title="Tools I use to build." />
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-12 max-w-4xl text-[1.65rem] leading-[1.25] font-medium tracking-[-0.03em] text-balance sm:text-3xl md:mt-16 md:text-4xl lg:text-[44px] lg:leading-[1.2]">
            {stack.map((item, index) => (
              <span key={item}>
                <span className="text-foreground transition-colors duration-300 hover:text-muted">
                  {item}
                </span>
                {index < stack.length - 1 ? (
                  <span className="font-normal text-muted"> / </span>
                ) : null}
              </span>
            ))}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
