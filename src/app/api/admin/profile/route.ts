import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  await prisma.profile.upsert({
    where: { id: 1 },
    update: rest,
    create: { id: 1, ...rest }
  });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
