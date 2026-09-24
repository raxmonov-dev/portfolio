import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { readingTimeMinutes } from "@/lib/reading-time";
import { slugify } from "@/lib/slug";
import type { PostInput } from "@/lib/validations";

export const postInclude = {
  category: true,
  author: { select: { id: true, email: true } },
  tags: { include: { tag: true } },
} satisfies Prisma.PostInclude;

export type PostWithRelations = Prisma.PostGetPayload<{ include: typeof postInclude }>;

export function isPublicPost(post: { status: string; publishedAt: Date | null }) {
  if (!post.publishedAt || post.publishedAt > new Date()) return false;
  return post.status === "published" || post.status === "scheduled";
}

export function serializePost(post: PostWithRelations) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    author: post.author.email,
    category: post.category,
    tags: post.tags.map((item) => item.tag),
    status: post.status,
    featured: post.featured,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    readingTime: post.readingTime,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    canonicalUrl: post.canonicalUrl,
    isDemo: post.isDemo,
  };
}

function publicWhere(): Prisma.PostWhereInput {
  const now = new Date();
  return {
    OR: [
      { status: "published", publishedAt: { lte: now } },
      { status: "scheduled", publishedAt: { lte: now } },
    ],
  };
}

export async function listPublishedPosts(filters?: {
  query?: string;
  category?: string;
  tag?: string;
}) {
  const where: Prisma.PostWhereInput = { ...publicWhere() };

  if (filters?.category) {
    where.category = { slug: filters.category };
  }
  if (filters?.tag) {
    where.tags = { some: { tag: { slug: filters.tag } } };
  }
  if (filters?.query) {
    const query = filters.query.trim();
    where.AND = [
      {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { excerpt: { contains: query, mode: "insensitive" } },
          { category: { name: { contains: query, mode: "insensitive" } } },
          { tags: { some: { tag: { name: { contains: query, mode: "insensitive" } } } } },
        ],
      },
    ];
  }

  return prisma.post.findMany({
    where,
    include: postInclude,
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });
}

export async function getPublishedPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: postInclude,
  });
  if (!post || !isPublicPost(post)) return null;
  return post;
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: postInclude,
  });
}

export async function getLatestPosts(take = 3) {
  return prisma.post.findMany({
    where: publicWhere(),
    include: postInclude,
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export async function getRelatedPosts(post: PostWithRelations, take = 3) {
  const tagIds = post.tags.map((item) => item.tagId);
  const related = await prisma.post.findMany({
    where: {
          ...publicWhere(),
      id: { not: post.id },
      OR: [
        { categoryId: post.categoryId },
        tagIds.length ? { tags: { some: { tagId: { in: tagIds } } } } : undefined,
      ].filter(Boolean) as Prisma.PostWhereInput[],
    },
    include: postInclude,
    orderBy: { publishedAt: "desc" },
    take,
  });
  return related;
}

export async function getAdjacentPosts(post: PostWithRelations) {
  if (!post.publishedAt) return { previous: null, next: null };

  const [previous, next] = await Promise.all([
    prisma.post.findFirst({
      where: {
          ...publicWhere(),
        publishedAt: { lt: post.publishedAt },
      },
      include: postInclude,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.post.findFirst({
      where: {
          ...publicWhere(),
        publishedAt: { gt: post.publishedAt },
      },
      include: postInclude,
      orderBy: { publishedAt: "asc" },
    }),
  ]);

  return { previous, next };
}

export async function getRelatedWriting(keywords: string[], take = 2) {
  if (!keywords.length) return [];
  return prisma.post.findMany({
    where: {
          ...publicWhere(),
      OR: keywords.flatMap((keyword) => [
        { title: { contains: keyword, mode: "insensitive" as const } },
        { excerpt: { contains: keyword, mode: "insensitive" as const } },
        { category: { name: { contains: keyword, mode: "insensitive" as const } } },
        { tags: { some: { tag: { name: { contains: keyword, mode: "insensitive" as const } } } } },
      ]),
    },
    include: postInclude,
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export async function uniqueSlug(base: string, ignoreId?: string) {
  let slug = slugify(base) || "article";
  let i = 2;
  while (
    await prisma.post.findFirst({
      where: { slug, ...(ignoreId ? { id: { not: ignoreId } } : {}) },
      select: { id: true },
    })
  ) {
    slug = `${slugify(base) || "article"}-${i}`;
    i += 1;
  }
  return slug;
}

export async function upsertTags(names: string[]) {
  const tags = [];
  for (const raw of names) {
    const name = raw.replace(/^#/, "").trim();
    if (!name) continue;
    const slug = slugify(name);
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
    tags.push(tag);
  }
  return tags;
}

export async function savePost(input: PostInput, authorId: string, existingId?: string) {
  const tags = await upsertTags(input.tagNames);
  const readingTime = readingTimeMinutes(input.content);
  const publishedAt =
    input.status === "draft"
      ? input.publishedAt
        ? new Date(input.publishedAt)
        : null
      : input.publishedAt
        ? new Date(input.publishedAt)
        : new Date();

  const data = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    coverImage: input.coverImage || null,
    categoryId: input.categoryId,
    status: input.status,
    featured: input.featured,
    publishedAt,
    seoTitle: input.seoTitle || null,
    seoDescription: input.seoDescription || null,
    canonicalUrl: input.canonicalUrl || null,
    readingTime,
    authorId,
  };

  if (existingId) {
    return prisma.post.update({
      where: { id: existingId },
      data: {
        ...data,
        tags: {
          deleteMany: {},
          create: tags.map((tag) => ({ tagId: tag.id })),
        },
      },
      include: postInclude,
    });
  }

  return prisma.post.create({
    data: {
      ...data,
      tags: {
        create: tags.map((tag) => ({ tagId: tag.id })),
      },
    },
    include: postInclude,
  });
}

export async function getAdminStats() {
  const [total, published, drafts, tags] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "published" } }),
    prisma.post.count({ where: { status: "draft" } }),
    prisma.tag.count(),
  ]);
  return { total, published, drafts, tags };
}
