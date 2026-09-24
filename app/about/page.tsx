import type { Metadata } from "next";
import { About } from "@/components/About";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { Footer } from "@/components/Footer";
import { PageFade } from "@/components/PageFade";
import { Stack } from "@/components/Stack";
import { Timeline } from "@/components/Timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ruslan Raxmonov — a student and builder exploring AI, startups, cybersecurity and products.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageFade>
        <div className="pt-8 md:pt-10">
          <About />
          <CurrentlyBuilding />
          <Stack />
          <Timeline />
        </div>
        <Footer />
      </PageFade>
    </main>
  );
}
