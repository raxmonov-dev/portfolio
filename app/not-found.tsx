import Link from "next/link";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen flex-col">
      <Container className="flex flex-1 flex-col justify-center pt-[120px] pb-20">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          404
        </p>
        <h1 className="mt-4 max-w-xl text-5xl leading-[0.95] font-medium tracking-[-0.04em] md:text-7xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-md text-muted">
          The page might have moved, or the link is incomplete.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex w-fit items-center gap-2 bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors duration-300 hover:bg-foreground/90"
        >
          ← Back home
        </Link>
      </Container>
      <Footer />
    </main>
  );
}
