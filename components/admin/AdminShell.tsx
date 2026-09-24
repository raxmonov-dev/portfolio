"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/posts/new", label: "New post" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-white px-4 md:hidden">
        <p className="text-[12px] font-medium tracking-[0.16em] uppercase">Admin</p>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open admin menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <div className="md:grid md:grid-cols-[220px_minmax(0,1fr)]">
        <aside
          className={cn(
            "border-border bg-white md:sticky md:top-0 md:flex md:h-screen md:flex-col md:border-r md:px-5 md:py-6",
            open ? "border-b px-4 py-4" : "hidden md:flex",
          )}
        >
          <p className="text-[12px] font-medium tracking-[0.18em] uppercase">Admin</p>
          <p className="mt-2 truncate text-[12px] text-muted">{email}</p>
          <nav className="mt-6 flex flex-col gap-1" aria-label="Admin">
            {links.map((link) => {
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-2 py-2 text-sm",
                    active ? "bg-foreground text-background" : "text-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={logout}
            className="mt-6 text-left text-sm text-muted hover:text-foreground md:mt-auto"
          >
            Log out
          </button>
        </aside>
        <div className="min-w-0 px-4 py-6 md:px-8 md:py-8">{children}</div>
      </div>
    </div>
  );
}
