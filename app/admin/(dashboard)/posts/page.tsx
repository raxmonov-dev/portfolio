import Link from "next/link";
import { PostsTable } from "@/components/admin/PostsTable";
import { postInclude, serializePost } from "@/lib/posts";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    include: postInclude,
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Posts</p>
          <h1 className="mt-2 text-3xl font-medium tracking-[-0.03em]">All articles.</h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="h-10 bg-foreground px-4 text-[12px] leading-10 tracking-[0.1em] text-background uppercase"
        >
          New post
        </Link>
      </div>
      <PostsTable posts={posts.map(serializePost)} />
    </div>
  );
}
