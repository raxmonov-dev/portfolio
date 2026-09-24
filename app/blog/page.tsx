import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArticleRow } from "@/components/blog/ArticleRow";
import { BlogToolbar } from "@/components/blog/BlogToolbar";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { PageFade } from "@/components/PageFade";
import { SectionHeader } from "@/components/SectionHeader";
import { formatDotDate } from "@/lib/format";
import { listPublishedPosts } from "@/lib/posts";
import { prisma } from "@/lib/prisma";
import { readingTimeLabel } from "@/lib/reading-time";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Writing about AI, startups, technology, building products and learning in public.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; tag?: string }>;
}) {
  const { q, category, tag } = await searchParams;
  const [posts, categories] = await Promise.all([
    listPublishedPosts({ query: q, category, tag }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const featured = !q && !category && !tag ? posts.find((post) => post.featured) : undefined;
  const rest = featured ? posts.filter((post) => post.id !== featured.id) : posts;

  return (
    <main id="main">
      <PageFade>
        <section className="pt-[120px] pb-16 md:pt-[140px] md:pb-20">
          <Container>
            <SectionHeader
              number="05"
              label="Journal"
              title="Thoughts, experiments & things I'm learning."
            />
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-muted md:text-base">
              Writing about AI, startups, technology, building products and
              learning in public.
            </p>
            <Suspense>
              <BlogToolbar
                categories={categories}
                activeCategory={category}
                query={q}
              />
            </Suspense>
          </Container>
        </section>

        {featured ? (
          <section className="border-t border-border">
            <Container className="py-12 md:py-16">
              <Link href={`/blog/${featured.slug}`} className="group block">
                <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                  Featured
                </p>
                <h2 className="mt-4 max-w-4xl text-4xl leading-[0.98] font-medium tracking-[-0.04em] uppercase transition-transform duration-300 group-hover:translate-x-1 md:text-6xl">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted md:text-lg">
                  {featured.excerpt}
                </p>
                <p className="mt-6 font-mono text-[11px] tracking-[0.12em] text-muted">
                  {featured.publishedAt ? formatDotDate(featured.publishedAt) : ""} ·{" "}
                  {featured.category.name} · {readingTimeLabel(featured.readingTime)}
                </p>
              </Link>
            </Container>
          </section>
        ) : null}

        <section className="pb-24">
          <Container>
            {rest.length ? (
              rest.map((post) => (
                <ArticleRow
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  date={post.publishedAt ? formatDotDate(post.publishedAt) : ""}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category.name}
                  readingTime={post.readingTime}
                  tags={post.tags.map((item) => item.tag.name)}
                  preview={post.coverImage}
                />
              ))
            ) : (
              <p className="border-t border-border py-16 text-muted">
                {q || category || tag ? "No articles found." : "No articles yet."}
              </p>
            )}
          </Container>
        </section>
        <Footer />
      </PageFade>
    </main>
  );
}
