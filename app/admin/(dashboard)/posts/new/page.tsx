import { PostEditor } from "@/components/admin/PostEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <PostEditor
      categories={categories}
      initial={{
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        categoryId: categories[0]?.id ?? "",
        tagNames: [],
        status: "draft",
        featured: false,
      }}
    />
  );
}
