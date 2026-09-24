import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { aboutDetails } from "@/data/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border py-24 md:py-32 lg:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <Reveal>
            <SectionHeader
              number="02"
              label="About"
              title="Builder by curiosity. Founder by choice."
            />
            <div className="mt-8 max-w-xl space-y-5 text-[15px] leading-7 text-muted md:text-base md:leading-8">
              <p>
                I&apos;m Ruslan Raxmonov, a young builder interested in
                artificial intelligence, startups, product design and
                technology.
              </p>
              <p>
                I like taking ideas from a simple thought to something people
                can actually use.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-8 border-t border-border pt-8 sm:grid-cols-2 lg:border-t-0 lg:pt-2">
              {aboutDetails.map((item) => (
                <div key={item.label} className="border-t border-border pt-4">
                  <dt className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-6 tracking-[-0.01em]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
