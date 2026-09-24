import { NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { categorySchema } from "@/lib/validations";

export async function GET() {
  try {
    await requireAdmin();
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const { name } = categorySchema.parse(await request.json());
    const category = await prisma.category.create({
      data: { name, slug: slugify(name) },
    });
    return NextResponse.json({ category });
  } catch (error) {
    return apiError(error);
  }
}
