import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { listModels, pickFields, type ListModelKey } from "@/lib/listModels";

export async function POST(req: Request, { params }: { params: { model: string } }) {
  const m = listModels[params.model as ListModelKey];
  if (!m) return NextResponse.json({ error: "unknown model" }, { status: 404 });
  const body = await req.json();
  const data = { ...pickFields(body, m.fields), order: body.order ?? 999 };
  // @ts-expect-error dynamic delegate
  const created = await m.delegate().create({ data });
  revalidatePath("/", "layout");
  return NextResponse.json(created);
}
