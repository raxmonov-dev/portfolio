import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/PostEditor";
import { postInclude } from "@/lib/posts";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    prisma.post.findUnique({ where: { id }, include: postInclude }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!post) notFound();

  return (
    <PostEditor
      categories={categories}
      initial={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        categoryId: post.categoryId,
        tagNames: post.tags.map((item) => item.tag.name),
        status: post.status,
        featured: post.featured,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        canonicalUrl: post.canonicalUrl,
        updatedAt: post.updatedAt.toISOString(),
      }}
    />
  );
}
