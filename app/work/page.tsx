import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageFade } from "@/components/PageFade";
import { ProjectList } from "@/components/ProjectList";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work by Ruslan Raxmonov — AI products, startups and digital experiences.",
};

export default function WorkIndexPage() {
  return (
    <main id="main">
      <PageFade>
        <div className="pt-8 md:pt-10">
          <ProjectList />
        </div>
        <Footer />
      </PageFade>
    </main>
  );
}
