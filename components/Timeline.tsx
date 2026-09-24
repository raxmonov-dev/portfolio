import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { timeline } from "@/data/site";

export function Timeline() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-border py-24 md:py-32 lg:py-36">
      <Container>
        <Reveal>
          <SectionHeader
            number="05"
            label="Experience"
            title="A short timeline."
          />
        </Reveal>

        <ol className="mt-12 md:mt-16">
          {timeline.map((item, index) => (
            <Reveal key={`${item.period}-${item.title}`} delay={index * 0.04}>
              <li className="grid gap-2 border-t border-border py-8 last:border-b md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:py-10">
                <p className="font-mono text-[12px] tracking-[0.12em] text-muted">
                  {item.period}
                </p>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.025em] md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted md:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
