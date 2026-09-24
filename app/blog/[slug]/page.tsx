import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { PageFade } from "@/components/PageFade";
import { siteConfig } from "@/data/site";
import { getSession } from "@/lib/auth";
import { formatArticleDate } from "@/lib/format";
import { MarkdownBody } from "@/lib/markdown";
import {
  getAdjacentPosts,
  getPostBySlug,
  getRelatedPosts,
  isPublicPost,
} from "@/lib/posts";
import { readingTimeLabel } from "@/lib/reading-time";
import { extractToc } from "@/lib/toc";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !isPublicPost(post)) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`;

  return {
    title,
    description,
    authors: [{ name: siteConfig.name }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [siteConfig.name],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const session = await getSession();
  if (!isPublicPost(post) && !session) notFound();

  const [{ previous, next }, related] = await Promise.all([
    getAdjacentPosts(post),
    getRelatedPosts(post),
  ]);
  const toc = extractToc(post.content);
  const url = post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`;

  return (
    <main id="main">
      <ReadingProgress />
      <PageFade>
        <article className="pt-[120px] pb-20 md:pt-[140px]">
          <Container>
            <div className="mx-auto max-w-[760px]">
              <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                {post.category.name}
                {!isPublicPost(post) ? " · Preview" : ""}
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-muted">
                {post.publishedAt ? formatArticleDate(post.publishedAt) : "Draft"} ·{" "}
                {readingTimeLabel(post.readingTime).toUpperCase()}
              </p>
              <h1 className="mt-5 text-4xl leading-[0.98] font-medium tracking-[-0.04em] md:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 text-[17px] leading-8 text-muted md:text-xl md:leading-9">
                {post.excerpt}
              </p>
              {post.isDemo ? (
                <p className="mt-4 text-[13px] text-muted">Sample journal entry.</p>
              ) : null}
            </div>

            {post.coverImage ? (
              <div className="mx-auto mt-10 max-w-[760px] overflow-hidden border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt=""
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            ) : null}

            <div className="relative mx-auto mt-14 max-w-[1100px] lg:grid lg:grid-cols-[200px_minmax(0,760px)] lg:gap-16">
              <TableOfContents items={toc} />
              <div>
                <div id="article-body" className="article-prose">
                  <MarkdownBody content={post.content} />
                </div>
                <div className="mt-12 border-t border-border pt-8">
                  <ShareLinks title={post.title} url={url} />
                </div>
              </div>
            </div>
          </Container>

          <Container className="mt-20 max-w-[1100px]">
            <div className="grid gap-6 border-t border-border py-10 text-sm md:grid-cols-2">
              {previous ? (
                <Link href={`/blog/${previous.slug}`} className="group">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                    ← Previous
                  </p>
                  <p className="mt-2 text-lg font-medium tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1">
                    {previous.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/blog/${next.slug}`} className="group md:text-right">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                    Next →
                  </p>
                  <p className="mt-2 text-lg font-medium tracking-[-0.02em] transition-transform duration-300 group-hover:-translate-x-1">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </div>
            <RelatedPosts posts={related} />
          </Container>
        </article>
        <Footer />
      </PageFade>
    </main>
  );
}
