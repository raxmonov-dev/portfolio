"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDotDate } from "@/lib/format";

type Row = {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: { name: string };
  updatedAt: string;
  publishedAt: string | null;
};

export function PostsTable({ posts }: { posts: Row[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  async function act(id: string, action: "delete" | "publish" | "unpublish", slug?: string, categoryId?: string) {
    setError("");
    setBusy(id);
    try {
      if (action === "delete") {
        if (!confirm("Delete this article?")) return;
        const response = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { error?: string } | null;
          setError(data?.error ?? "Unable to delete article.");
          return;
        }
      } else {
        const current = posts.find((post) => post.id === id);
        if (!current) return;
        const detail = await fetch(`/api/admin/posts/${id}`).then((res) => res.json());
        const post = detail.post;
        const response = await fetch(`/api/admin/posts/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage,
            categoryId: post.category.id,
            tagNames: post.tags.map((tag: { name: string }) => tag.name),
            status: action === "publish" ? "published" : "draft",
            featured: post.featured,
            seoTitle: post.seoTitle,
            seoDescription: post.seoDescription,
            canonicalUrl: post.canonicalUrl,
          }),
        });
        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { error?: string } | null;
          setError(data?.error ?? "Unable to save article.");
          return;
        }
        void slug;
        void categoryId;
      }
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  if (!posts.length) {
    return <p className="mt-10 text-sm text-muted">No articles yet.</p>;
  }

  return (
    <div className="mt-8">
      {error ? <p className="mb-4 text-sm">{error}</p> : null}
      <div className="hidden border-t border-border md:block">
        <div className="grid grid-cols-[minmax(0,1.4fr)_100px_120px_110px_110px_220px] gap-3 border-b border-border py-3 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
          <span>Title</span>
          <span>Status</span>
          <span>Category</span>
          <span>Updated</span>
          <span>Published</span>
          <span>Actions</span>
        </div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="grid grid-cols-[minmax(0,1.4fr)_100px_120px_110px_110px_220px] items-center gap-3 border-b border-border py-4 text-sm"
          >
            <p className="truncate font-medium">{post.title}</p>
            <p className="capitalize">{post.status}</p>
            <p>{post.category.name}</p>
            <p className="text-muted">{formatDotDate(post.updatedAt)}</p>
            <p className="text-muted">{post.publishedAt ? formatDotDate(post.publishedAt) : "—"}</p>
            <div className="flex flex-wrap gap-2 text-[12px]">
              <Link href={`/admin/posts/${post.id}/edit`} className="underline-offset-2 hover:underline">
                Edit
              </Link>
              <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="hover:underline">
                Preview
              </a>
              <button
                type="button"
                disabled={busy === post.id}
                onClick={() => act(post.id, post.status === "published" ? "unpublish" : "publish")}
                className="hover:underline"
              >
                {post.status === "published" ? "Unpublish" : "Publish"}
              </button>
              <button type="button" onClick={() => act(post.id, "delete")} className="hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 md:hidden">
        {posts.map((post) => (
          <article key={post.id} className="border border-border p-4">
            <p className="font-medium">{post.title}</p>
            <p className="mt-1 text-[12px] text-muted">
              {post.status} · {post.category.name} · {formatDotDate(post.updatedAt)}
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-[12px]">
              <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
              <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                Preview
              </a>
              <button
                type="button"
                onClick={() => act(post.id, post.status === "published" ? "unpublish" : "publish")}
              >
                {post.status === "published" ? "Unpublish" : "Publish"}
              </button>
              <button type="button" onClick={() => act(post.id, "delete")}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
