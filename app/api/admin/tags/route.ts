import { NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { tagSchema } from "@/lib/validations";

export async function GET() {
  try {
    await requireAdmin();
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    });
    return NextResponse.json({ tags });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const { name } = tagSchema.parse(await request.json());
    const tag = await prisma.tag.create({
      data: { name, slug: slugify(name) },
    });
    return NextResponse.json({ tag });
  } catch (error) {
    return apiError(error);
  }
}
