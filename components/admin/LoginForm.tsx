import { Button } from "@/components/ui/button";

export function LoginForm({ error }: { error?: string }) {
  return (
    <form action="/api/auth/login" method="post" className="mt-10 space-y-4">
      <label className="block">
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
          Email
        </span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="admin-input mt-2"
        />
      </label>
      <label className="block">
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
          Password
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="admin-input mt-2"
        />
      </label>
      {error ? <p className="text-sm text-foreground">{error}</p> : null}
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
}
