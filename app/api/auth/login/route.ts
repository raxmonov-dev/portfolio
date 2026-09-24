import { NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import {
  authenticate,
  createSession,
  SESSION_COOKIE,
  sessionCookieOptions,
  signSession,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

async function readCredentials(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return loginSchema.parse(await request.json());
  }
  const form = await request.formData();
  return loginSchema.parse({
    email: String(form.get("email") ?? ""),
    password: String(form.get("password") ?? ""),
  });
}

export async function POST(request: Request) {
  const wantsJson = (request.headers.get("content-type") ?? "").includes("application/json");

  try {
    const body = await readCredentials(request);
    const user = await authenticate(body.email, body.password);

    if (!user) {
      if (wantsJson) {
        return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), 303);
    }

    if (wantsJson) {
      await createSession(user);
      return NextResponse.json({ ok: true });
    }

    const token = await signSession(user);
    const response = NextResponse.redirect(new URL("/admin", request.url), 303);
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    if (wantsJson) return apiError(error);
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url), 303);
  }
}
