"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextArea, SaveBar } from "@/components/admin/Field";
import { SortableList, SortableItem, persistOrder } from "@/components/admin/Sortable";

type Item = {
  id?: number;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
};

const empty: Item = { company: "", role: "", period: "", location: "", bullets: [], stack: [] };

function Row({
  item,
  draggable,
  onCreated,
  onDeleted,
  onCancel
}: {
  item: Item;
  draggable: boolean;
  onCreated?: (created: any) => void;
  onDeleted?: () => void;
  onCancel?: () => void;
}) {
  const [d, setD] = useState({
    ...item,
    bulletsText: item.bullets.join("\n"),
    stackText: item.stack.join(", ")
  });
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const set = (k: string) => (e: any) => setD({ ...d, [k]: e.target ? e.target.value : e });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const payload = {
      company: d.company,
      role: d.role,
      period: d.period,
      location: d.location,
      bullets: d.bulletsText.split("\n").map((s) => s.trim()).filter(Boolean),
      stack: d.stackText.split(",").map((s) => s.trim()).filter(Boolean)
    };
    const url = item.id ? `/api/admin/experiences/${item.id}` : "/api/admin/experiences";
    const method = item.id ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    setBusy(false);
    if (!res.ok) return;
    if (!item.id) {
      const created = await res.json();
      onCreated?.({ ...created, bullets: payload.bullets, stack: payload.stack });
    }
    router.refresh();
  }

  async function del() {
    if (!item.id || !confirm("Delete this experience?")) return;
    await fetch(`/api/admin/experiences/${item.id}`, { method: "DELETE" });
    onDeleted?.();
    router.refresh();
  }

  return (
    <form onSubmit={save} className={`border-4 border-on-surface bg-white p-6 ${draggable ? "pl-24" : ""} space-y-4`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Company" value={d.company} onChange={set("company")} required />
        <Field label="Role" value={d.role} onChange={set("role")} />
        <Field label="Period" value={d.period} onChange={set("period")} />
        <Field label="Location" value={d.location} onChange={set("location")} />
      </div>
      <TextArea label="Bullets (one per line)" rows={4} value={d.bulletsText} onChange={set("bulletsText")} />
      <Field label="Stack (comma-separated)" value={d.stackText} onChange={set("stackText")} />
      <div className="flex gap-3 items-center">
        <SaveBar busy={busy} onDelete={item.id ? del : undefined} />
        {!item.id && onCancel && (
          <button type="button" onClick={onCancel} className="font-label text-xs uppercase tracking-widest text-zinc-500 hover:text-primary">cancel</button>
        )}
      </div>
    </form>
  );
}

export default function ExperiencesEditor({ initial }: { initial: Item[] }) {
  const [items, setItems] = useState<Item[]>(initial);
  const [adding, setAdding] = useState(false);

  async function reorder(next: Item[]) {
    setItems(next);
    await persistOrder("experiences", next.map((i) => i.id!));
  }

  return (
    <div className="space-y-6">
      <SortableList items={items} onReorder={reorder}>
        {(it) => (
          <SortableItem key={it.id} id={it.id!}>
            <Row
              item={it}
              draggable
              onDeleted={() => setItems((cur) => cur.filter((x) => x.id !== it.id))}
            />
          </SortableItem>
        )}
      </SortableList>

      {adding ? (
        <Row
          item={empty}
          draggable={false}
          onCreated={(created) => {
            setItems((cur) => [...cur, created]);
            setAdding(false);
          }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button onClick={() => setAdding(true)} className="bg-primary text-white font-headline font-black uppercase px-6 py-3 border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c]">
          + ADD EXPERIENCE
        </button>
      )}
    </div>
  );
}
