import { z } from "zod";

export const postInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(180),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers and dashes"),
  excerpt: z.string().trim().max(400).default(""),
  content: z.string().default(""),
  coverImage: z.string().trim().max(500).optional().nullable(),
  categoryId: z.string().min(1, "Category is required"),
  tagNames: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
  status: z.enum(["draft", "published", "scheduled"]).default("draft"),
  featured: z.boolean().default(false),
  publishedAt: z
    .union([z.string().datetime(), z.literal("")])
    .optional()
    .nullable()
    .transform((value) => (value ? value : null)),
  seoTitle: z.string().trim().max(180).optional().nullable(),
  seoDescription: z.string().trim().max(300).optional().nullable(),
  canonicalUrl: z.string().trim().max(500).optional().nullable(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(3, "Enter a valid email")
    .refine((value) => /^[^\s@]+@[^\s@]+$/.test(value), "Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const categorySchema = z.object({
  name: z.string().trim().min(1).max(40),
});

export const tagSchema = z.object({
  name: z.string().trim().min(1).max(40),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export type PostInput = z.infer<typeof postInputSchema>;
