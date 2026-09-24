import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const errorCopy: Record<string, string> = {
  invalid: "Invalid email or password.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getSession()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Admin</p>
        <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em]">Sign in.</h1>
        <p className="mt-3 text-sm text-muted">
          Private writing room. No public registration.
        </p>
        <LoginForm error={error ? errorCopy[error] ?? "Unable to sign in." : undefined} />
      </div>
    </main>
  );
}
