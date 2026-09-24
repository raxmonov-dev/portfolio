import { Container } from "@/components/Container";
import { ProjectRow } from "@/components/ProjectRow";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { getFeaturedProjects } from "@/data/projects";

export function ProjectList() {
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32 lg:py-36">
      <Container>
        <Reveal>
          <SectionHeader
            number="01"
            label="Selected Work"
            title="Things I've built."
          />
        </Reveal>
      </Container>

      <div className="mt-12 md:mt-16">
        <Container>
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.04}>
              <ProjectRow project={project} />
            </Reveal>
          ))}
        </Container>
      </div>
    </section>
  );
}
