import { NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { postInclude, savePost, serializePost } from "@/lib/posts";
import { postInputSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
    const posts = await prisma.post.findMany({
      include: postInclude,
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ posts: posts.map(serializePost) });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    const input = postInputSchema.parse(await request.json());
    const existing = await prisma.post.findUnique({ where: { slug: input.slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists." }, { status: 409 });
    }
    const post = await savePost(input, session.id);
    return NextResponse.json({ post: serializePost(post) });
  } catch (error) {
    return apiError(error);
  }
}
