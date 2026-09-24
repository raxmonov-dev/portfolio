import Link from "next/link";
import { formatDotDate } from "@/lib/format";
import { getAdminStats } from "@/lib/posts";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning, Ruslan.";
  if (hour < 18) return "Good afternoon, Ruslan.";
  return "Good evening, Ruslan.";
}

export default async function AdminDashboardPage() {
  const [stats, recent] = await Promise.all([
    getAdminStats(),
    prisma.post.findMany({
      include: { category: true },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ]);

  const cards = [
    { label: "Total posts", value: stats.total },
    { label: "Published", value: stats.published },
    { label: "Drafts", value: stats.drafts },
    { label: "Tags", value: stats.tags },
  ];

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Admin</p>
      <h1 className="mt-2 text-3xl font-medium tracking-[-0.03em] md:text-4xl">
        {greeting()}
      </h1>
      <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-5">
            <p className="text-3xl font-medium tracking-[-0.03em]">{card.value}</p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-medium">Recent posts</h2>
          <Link href="/admin/posts/new" className="text-sm text-muted hover:text-foreground">
            New post →
          </Link>
        </div>
        {recent.length ? (
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {recent.map((post) => (
              <li key={post.id} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <Link href={`/admin/posts/${post.id}/edit`} className="font-medium">
                    {post.title}
                  </Link>
                  <p className="mt-1 text-[12px] text-muted">
                    {post.status} · {post.category.name} · {formatDotDate(post.updatedAt)}
                  </p>
                </div>
                <Link href={`/admin/posts/${post.id}/edit`} className="text-sm text-muted">
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-muted">Your drafts will appear here.</p>
        )}
      </section>
    </div>
  );
}
