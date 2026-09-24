"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Item = { id: string; name: string; slug: string; _count?: { posts: number } };

export function SettingsForm({
  categories,
  tags,
}: {
  categories: Item[];
  tags: Item[];
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function create(kind: "categories" | "tags", name: string) {
    const response = await fetch(`/api/admin/${kind}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setMessage(data?.error ?? "Unable to save.");
      return;
    }
    setMessage("");
    router.refresh();
  }

  async function remove(kind: "categories" | "tags", id: string) {
    const response = await fetch(`/api/admin/${kind}/${id}`, { method: "DELETE" });
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setMessage(data?.error ?? "Unable to delete.");
      return;
    }
    setMessage("");
    router.refresh();
  }

  async function changePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: form.get("currentPassword"),
        newPassword: form.get("newPassword"),
      }),
    });
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    setMessage(response.ok ? "Password updated." : (data?.error ?? "Unable to update password."));
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <div className="mt-10 max-w-3xl space-y-12">
      {message ? <p className="text-sm">{message}</p> : null}

      <section>
        <h2 className="text-xl font-medium tracking-[-0.02em]">Categories</h2>
        <CreateRow placeholder="New category" onCreate={(name) => create("categories", name)} />
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {categories.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-3 text-sm">
              <span>
                {item.name}{" "}
                <span className="text-muted">/{item.slug}</span>
              </span>
              <button type="button" onClick={() => remove("categories", item.id)} className="text-muted hover:text-foreground">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-medium tracking-[-0.02em]">Tags</h2>
        <CreateRow placeholder="New tag" onCreate={(name) => create("tags", name)} />
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {tags.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-3 text-sm">
              <span>#{item.name}</span>
              <button type="button" onClick={() => remove("tags", item.id)} className="text-muted hover:text-foreground">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-medium tracking-[-0.02em]">Password</h2>
        <form onSubmit={changePassword} className="mt-4 max-w-md space-y-3">
          <input
            name="currentPassword"
            type="password"
            required
            placeholder="Current password"
            className="admin-input"
          />
          <input
            name="newPassword"
            type="password"
            required
            minLength={8}
            placeholder="New password"
            className="admin-input"
          />
          <button type="submit" className="h-10 bg-foreground px-4 text-[12px] tracking-[0.1em] text-background uppercase">
            Update password
          </button>
        </form>
      </section>
    </div>
  );
}

function CreateRow({
  placeholder,
  onCreate,
}: {
  placeholder: string;
  onCreate: (name: string) => void;
}) {
  return (
    <form
      className="mt-4 flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const name = String(form.get("name") ?? "").trim();
        if (name) onCreate(name);
        event.currentTarget.reset();
      }}
    >
      <input name="name" className="admin-input" placeholder={placeholder} />
      <button type="submit" className="h-10 shrink-0 border border-foreground px-4 text-[12px] uppercase">
        Add
      </button>
    </form>
  );
}
