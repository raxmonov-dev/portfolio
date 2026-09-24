"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { MarkdownBody } from "@/lib/markdown";
import { countWords, readingTimeLabel, readingTimeMinutes } from "@/lib/reading-time";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";

export type EditorPost = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  categoryId: string;
  tagNames: string[];
  status: "draft" | "published" | "scheduled";
  featured: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  canonicalUrl?: string | null;
  updatedAt?: string;
};

type Category = { id: string; name: string };

export function PostEditor({
  initial,
  categories,
}: {
  initial: EditorPost;
  categories: Category[];
}) {
  const router = useRouter();
  const [post, setPost] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));
  const [saveState, setSaveState] = useState<"saved" | "saving" | "unsaved" | "error">(
    initial.id ? "saved" : "unsaved",
  );
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState(initial.tagNames.join(", "));
  const dirty = useRef(false);
  const postRef = useRef(post);
  postRef.current = post;

  function update<K extends keyof EditorPost>(key: K, value: EditorPost[K]) {
    dirty.current = true;
    setSaveState("unsaved");
    setPost((current) => ({ ...current, [key]: value }));
  }

  useEffect(() => {
    const onLeave = (event: BeforeUnloadEvent) => {
      if (!dirty.current) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, []);

  useEffect(() => {
    if (!post.id) return;
    const timer = window.setTimeout(() => {
      if (dirty.current) void persist(postRef.current, postRef.current.status);
    }, 1600);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, post.id]);

  const words = useMemo(() => countWords(post.content), [post.content]);
  const minutes = useMemo(() => readingTimeMinutes(post.content), [post.content]);

  async function persist(next: EditorPost, status: EditorPost["status"]) {
    setSaveState("saving");
    setError("");
    const payload = {
      ...next,
      status,
      tagNames: tagInput.split(",").map((item) => item.trim()).filter(Boolean),
      coverImage: next.coverImage || null,
      seoTitle: next.seoTitle || null,
      seoDescription: next.seoDescription || null,
      canonicalUrl: next.canonicalUrl || null,
    };

    const response = await fetch(next.id ? `/api/admin/posts/${next.id}` : "/api/admin/posts", {
      method: next.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as
      | { post?: { id: string; slug: string; updatedAt: string; status: EditorPost["status"] }; error?: string }
      | null;

    if (!response.ok || !data?.post) {
      setSaveState("error");
      setError(data?.error ?? "Unable to save article.");
      return null;
    }

    dirty.current = false;
    setSaveState("saved");
    setPost((current) => ({
      ...current,
      id: data.post!.id,
      slug: data.post!.slug,
      status: data.post!.status,
      updatedAt: data.post!.updatedAt,
    }));
    if (!next.id) {
      router.replace(`/admin/posts/${data.post.id}/edit`);
    }
    return data.post;
  }

  async function upload(file: File) {
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const data = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
    setUploading(false);
    if (!response.ok || !data?.url) {
      setError(data?.error ?? "Unable to upload image.");
      return;
    }
    update("coverImage", data.url);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-center">
        <Link href="/admin/posts" className="text-sm text-muted hover:text-foreground">
          ← Posts
        </Link>
        <input
          value={post.title}
          onChange={(event) => {
            const title = event.target.value;
            setPost((current) => ({
              ...current,
              title,
              slug: slugTouched ? current.slug : slugify(title),
            }));
            dirty.current = true;
            setSaveState("unsaved");
          }}
          placeholder="Article title"
          className="min-w-0 flex-1 border-0 bg-transparent text-2xl font-medium tracking-[-0.03em] outline-none md:text-3xl"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => persist(post, "draft")}
            className="h-9 border border-border px-3 text-[12px] tracking-[0.08em] uppercase"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={async () => {
              const saved = await persist(post, post.status);
              if (saved) window.open(`/blog/${saved.slug}`, "_blank");
            }}
            className="h-9 border border-border px-3 text-[12px] tracking-[0.08em] uppercase"
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => persist(post, "published")}
            className="h-9 bg-foreground px-3 text-[12px] tracking-[0.08em] text-background uppercase"
          >
            Publish
          </button>
        </div>
      </div>

      {error ? <p className="mt-3 text-sm">{error}</p> : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Field label="Slug">
          <input
            className="admin-input"
            value={post.slug}
            onChange={(event) => {
              setSlugTouched(true);
              update("slug", slugify(event.target.value));
            }}
          />
        </Field>
        <Field label="Category">
          <select
            className="admin-input"
            value={post.categoryId}
            onChange={(event) => update("categoryId", event.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tags">
          <input
            className="admin-input"
            value={tagInput}
            onChange={(event) => {
              dirty.current = true;
              setSaveState("unsaved");
              setTagInput(event.target.value);
            }}
            placeholder="AI, Product"
          />
        </Field>
        <Field label="Status">
          <select
            className="admin-input"
            value={post.status}
            onChange={(event) => update("status", event.target.value as EditorPost["status"])}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </Field>
        <Field label="Cover image URL">
          <input
            className="admin-input"
            value={post.coverImage ?? ""}
            onChange={(event) => update("coverImage", event.target.value)}
            placeholder="https:// or /uploads/..."
          />
        </Field>
        <Field label="Upload cover">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="block w-full text-sm"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
            }}
          />
          {uploading ? <p className="mt-1 text-[12px] text-muted">Uploading...</p> : null}
        </Field>
        <label className="flex items-end gap-2 pb-2 text-sm">
          <input
            type="checkbox"
            checked={post.featured}
            onChange={(event) => update("featured", event.target.checked)}
          />
          Featured
        </label>
      </div>

      <Field label="Excerpt" className="mt-4">
        <textarea
          className="admin-textarea min-h-20"
          value={post.excerpt}
          onChange={(event) => update("excerpt", event.target.value)}
        />
      </Field>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="SEO title">
          <input
            className="admin-input"
            value={post.seoTitle ?? ""}
            onChange={(event) => update("seoTitle", event.target.value)}
          />
        </Field>
        <Field label="SEO description">
          <input
            className="admin-input"
            value={post.seoDescription ?? ""}
            onChange={(event) => update("seoDescription", event.target.value)}
          />
        </Field>
        <Field label="Canonical URL">
          <input
            className="admin-input"
            value={post.canonicalUrl ?? ""}
            onChange={(event) => update("canonicalUrl", event.target.value)}
            placeholder="https://"
          />
        </Field>
      </div>

      <div className="mt-6 flex gap-2 md:hidden">
        {(["write", "preview"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={cn(
              "h-9 flex-1 text-[12px] tracking-[0.12em] uppercase",
              tab === value ? "bg-foreground text-background" : "border border-border",
            )}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-4 grid min-h-[520px] flex-1 border border-border md:grid-cols-2">
        <label className={cn("flex min-h-[420px] flex-col", tab === "preview" && "hidden md:flex")}>
          <span className="border-b border-border px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            Markdown
          </span>
          <textarea
            value={post.content}
            onChange={(event) => update("content", event.target.value)}
            className="min-h-[420px] flex-1 resize-none border-0 bg-transparent p-4 font-mono text-[13px] leading-6 outline-none"
            spellCheck
          />
        </label>
        <div className={cn("flex min-h-[420px] flex-col border-t border-border md:border-t-0 md:border-l", tab === "write" && "hidden md:flex")}>
          <span className="border-b border-border px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            Preview
          </span>
          <div className="article-prose min-h-[420px] overflow-auto p-4">
            {post.content.trim() ? (
              <MarkdownBody content={post.content} />
            ) : (
              <p className="text-muted">The preview will appear here.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.08em] text-muted">
        <span>{words} words</span>
        <span>{readingTimeLabel(minutes)}</span>
        <span>
          {saveState === "saving"
            ? "Saving..."
            : saveState === "saved"
              ? "Saved"
              : saveState === "error"
                ? "Unable to save article."
                : "Unsaved changes"}
        </span>
        {post.updatedAt ? <span>Last saved {new Date(post.updatedAt).toLocaleTimeString()}</span> : null}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
