import { NextResponse } from "next/server";
import { apiError } from "@/lib/api";
import { hashPassword, requireAdmin, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { passwordSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    const body = passwordSchema.parse(await request.json());
    const user = await prisma.user.findUnique({ where: { id: session.id } });
    if (!user || !(await verifyPassword(body.currentPassword, user.passwordHash))) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: await hashPassword(body.newPassword) },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
