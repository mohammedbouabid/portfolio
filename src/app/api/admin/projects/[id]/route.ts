import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const d = await req.json();
  await prisma.project.update({
    where: { id: Number(params.id) },
    data: {
      slug: d.slug,
      title: d.title,
      category: d.category,
      role: d.role,
      period: d.period,
      stack: JSON.stringify(d.stack || []),
      summary: d.summary,
      problem: d.problem || "",
      approach: d.approach || "",
      outcome: d.outcome || "",
      cover: d.cover,
      comingSoon: !!d.comingSoon,
      order: d.order ?? 999
    }
  });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.project.delete({ where: { id: Number(params.id) } });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
