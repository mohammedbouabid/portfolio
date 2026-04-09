import Link from "next/link";
import { prisma } from "@/lib/db";
import ProjectsSortable from "./ProjectsSortable";

export const dynamic = "force-dynamic";

export default async function ProjectsList() {
  const ps = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-headline font-black text-4xl uppercase italic">PROJECTS</h1>
        <Link href="/admin/projects/new" className="bg-primary text-white font-headline font-black uppercase px-4 py-2 border-2 border-on-surface shadow-[4px_4px_0px_0px_#1a1c1c]">+ NEW</Link>
      </div>
      <p className="font-label text-xs uppercase tracking-widest text-zinc-500">Drag cards to reorder. Click a card to edit.</p>
      <ProjectsSortable initial={ps} />
    </div>
  );
}
