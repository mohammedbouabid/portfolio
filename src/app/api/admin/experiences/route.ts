import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const d = await req.json();
  const created = await prisma.experience.create({
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
  return NextResponse.json(created);
}
