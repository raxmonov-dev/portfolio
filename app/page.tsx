import { About } from "@/components/About";
import { LatestWriting } from "@/components/blog/LatestWriting";
import { Contact } from "@/components/Contact";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProjectList } from "@/components/ProjectList";
import { Stack } from "@/components/Stack";
import { Timeline } from "@/components/Timeline";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ProjectList />
      <About />
      <CurrentlyBuilding />
      <Stack />
      <Timeline />
      <LatestWriting />
      <Contact />
      <Footer />
    </main>
  );
}
