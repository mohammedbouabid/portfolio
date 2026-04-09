import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const DELEGATES: Record<string, any> = {
  projects: () => prisma.project,
  experiences: () => prisma.experience,
  education: () => prisma.education,
  skills: () => prisma.skill,
  certifications: () => prisma.certification,
  languages: () => prisma.language,
  interests: () => prisma.interest
};

export async function POST(req: Request) {
  const { model, ids } = (await req.json()) as { model: string; ids: number[] };
  const get = DELEGATES[model];
  if (!get || !Array.isArray(ids)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const delegate = get();
  await prisma.$transaction(
    ids.map((id, order) => delegate.update({ where: { id }, data: { order } }))
  );
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
