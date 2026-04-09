"use client";
import Link from "next/link";
import { useState } from "react";
import { SortableList, SortableItem, persistOrder } from "@/components/admin/Sortable";

export default function ProjectsSortable({ initial }: { initial: any[] }) {
  const [list, setList] = useState(initial);

  async function reorder(next: any[]) {
    setList(next);
    await persistOrder("projects", next.map((i) => i.id));
  }

  return (
    <SortableList items={list} onReorder={reorder}>
      {(p) => (
        <SortableItem key={p.id} id={p.id}>
          <Link href={`/admin/projects/${p.id}`} className="block border-4 border-on-surface bg-white p-4 pl-24 hover:bg-primary hover:text-white transition-colors">
            <div className="flex gap-4 items-center">
              <div className="w-24 h-16 bg-zinc-200 border-2 border-on-surface overflow-hidden shrink-0">
                {p.cover && <img src={p.cover} alt="" className="w-full h-full object-cover grayscale" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-headline font-black text-lg uppercase truncate">{p.title}</div>
                <div className="font-label text-[10px] uppercase tracking-widest opacity-60">{p.category} · {p.period}</div>
              </div>
              {p.comingSoon && <div className="text-primary text-xs font-bold">COMING_SOON</div>}
            </div>
          </Link>
        </SortableItem>
      )}
    </SortableList>
  );
}
