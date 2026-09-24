import { ArticleRow } from "@/components/blog/ArticleRow";
import { formatDotDate } from "@/lib/format";
import type { PostWithRelations } from "@/lib/posts";

export function RelatedPosts({ posts }: { posts: PostWithRelations[] }) {
  if (posts.length < 2) return null;

  return (
    <section className="border-t border-border py-16">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
        You might also like
      </p>
      <div className="mt-6">
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
      </div>
    </section>
  );
}
