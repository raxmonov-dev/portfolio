import { Container } from "@/components/Container";

export default function BlogLoading() {
  return (
    <main className="pt-[140px]">
      <Container>
        <div className="h-3 w-28 bg-surface" />
        <div className="mt-6 h-12 w-2/3 max-w-xl bg-surface" />
        <div className="mt-16 space-y-6">
          <div className="h-24 border-t border-border bg-surface/60" />
          <div className="h-24 border-t border-border bg-surface/60" />
          <div className="h-24 border-t border-border bg-surface/60" />
        </div>
      </Container>
    </main>
  );
}
