import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { listModels, pickFields, type ListModelKey } from "@/lib/listModels";

export async function PUT(req: Request, { params }: { params: { model: string; id: string } }) {
  const m = listModels[params.model as ListModelKey];
  if (!m) return NextResponse.json({ error: "unknown model" }, { status: 404 });
  const body = await req.json();
  const data = { ...pickFields(body, m.fields), order: body.order ?? 999 };
  // @ts-expect-error dynamic delegate
  await m.delegate().update({ where: { id: Number(params.id) }, data });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { model: string; id: string } }) {
  const m = listModels[params.model as ListModelKey];
  if (!m) return NextResponse.json({ error: "unknown model" }, { status: 404 });
  // @ts-expect-error dynamic delegate
  await m.delegate().delete({ where: { id: Number(params.id) } });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
