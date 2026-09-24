import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleRow } from "@/components/blog/ArticleRow";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { formatDotDate } from "@/lib/format";
import { getLatestPosts } from "@/lib/posts";

export async function LatestWriting() {
  let posts: Awaited<ReturnType<typeof getLatestPosts>> = [];
  try {
    posts = await getLatestPosts(3);
  } catch {
    return null;
  }

  if (!posts.length) return null;

  return (
    <section id="journal" className="scroll-mt-24 border-t border-border py-24 md:py-32 lg:py-36">
      <Container>
        <Reveal>
          <SectionHeader
            number="06"
            label="Journal"
            title="Latest writing."
          />
        </Reveal>
      </Container>
      <div className="mt-12 md:mt-16">
        <Container>
          {posts.map((post) => (
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
          ))}
          <div className="pt-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              Read all articles
              <ArrowUpRight
                size={16}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
