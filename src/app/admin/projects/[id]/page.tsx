import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProject({ params }: { params: { id: string } }) {
  const p = await prisma.project.findUnique({ where: { id: Number(params.id) } });
  if (!p) notFound();
  return (
    <div className="space-y-6">
      <h1 className="font-headline font-black text-4xl uppercase italic">EDIT: {p.title}</h1>
      <ProjectForm initial={p} id={p.id} />
    </div>
  );
}
