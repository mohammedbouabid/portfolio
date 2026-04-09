import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const d = await req.json();
  const created = await prisma.project.create({
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
  return NextResponse.json(created);
}
