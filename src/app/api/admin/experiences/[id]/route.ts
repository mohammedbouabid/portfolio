import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const d = await req.json();
  await prisma.experience.update({
    where: { id: Number(params.id) },
    data: {
      company: d.company,
      role: d.role,
      period: d.period,
      location: d.location,
      bullets: JSON.stringify(d.bullets || []),
      stack: JSON.stringify(d.stack || []),
      order: d.order ?? 999
    }
  });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.experience.delete({ where: { id: Number(params.id) } });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
