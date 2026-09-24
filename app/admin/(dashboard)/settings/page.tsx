import { SettingsForm } from "@/components/admin/SettingsForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    }),
    prisma.tag.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    }),
  ]);

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Settings</p>
      <h1 className="mt-2 text-3xl font-medium tracking-[-0.03em]">The publishing system.</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Categories and tags are editable. Image files are stored as uploads; you can also paste any image URL.
      </p>
      <SettingsForm categories={categories} tags={tags} />
    </div>
  );
}
