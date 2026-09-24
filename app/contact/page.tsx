import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageFade } from "@/components/PageFade";

export const metadata: Metadata = {
  title: "Contact",
  description: "Open to interesting ideas, collaborations and ambitious projects.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageFade>
        <Contact />
        <Footer />
      </PageFade>
    </main>
  );
}
