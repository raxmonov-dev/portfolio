import { NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { postInclude, savePost, serializePost } from "@/lib/posts";
import { postInputSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id }, include: postInclude });
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
    return NextResponse.json({ post: serializePost(post) });
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await requireAdmin();
    const { id } = await params;
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    const input = postInputSchema.parse(await request.json());
    const clash = await prisma.post.findFirst({
      where: { slug: input.slug, id: { not: id } },
    });
    if (clash) {
      return NextResponse.json({ error: "Slug already exists." }, { status: 409 });
    }

    const post = await savePost(input, session.id, id);
    return NextResponse.json({ post: serializePost(post) });
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
