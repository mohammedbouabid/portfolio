"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, SaveBar } from "@/components/admin/Field";
import { SortableList, SortableItem, persistOrder } from "@/components/admin/Sortable";

type FieldDef = { name: string; label: string };

function emptyFor(fields: FieldDef[]) {
  const o: any = {};
  for (const f of fields) o[f.name] = "";
  return o;
}

function Row({
  model,
  fields,
  item,
  draggable,
  onCreated,
  onDeleted,
  onCancel
}: {
  model: string;
  fields: FieldDef[];
  item: any;
  draggable: boolean;
  onCreated?: (created: any) => void;
  onDeleted?: () => void;
  onCancel?: () => void;
}) {
  const [d, setD] = useState(item);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const set = (k: string) => (e: any) => setD({ ...d, [k]: e.target ? e.target.value : e });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const url = item.id ? `/api/admin/list/${model}/${item.id}` : `/api/admin/list/${model}`;
    const method = item.id ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "content-type": "application/json" }, body: JSON.stringify(d) });
    setBusy(false);
    if (!res.ok) return;
    if (!item.id) {
      const created = await res.json();
      onCreated?.(created);
    }
    router.refresh();
  }

  async function del() {
    if (!item.id || !confirm("Delete?")) return;
    await fetch(`/api/admin/list/${model}/${item.id}`, { method: "DELETE" });
    onDeleted?.();
    router.refresh();
  }

  return (
    <form onSubmit={save} className={`border-4 border-on-surface bg-white p-4 ${draggable ? "pl-24" : ""} space-y-3`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fields.map((f) => (
          <Field key={f.name} label={f.label} value={d[f.name] || ""} onChange={set(f.name)} required={f.name === "label" || f.name === "name" || f.name === "title"} />
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <SaveBar busy={busy} onDelete={item.id ? del : undefined} />
        {!item.id && onCancel && (
          <button type="button" onClick={onCancel} className="font-label text-xs uppercase tracking-widest text-zinc-500 hover:text-primary">cancel</button>
        )}
      </div>
    </form>
  );
}

export default function ListEditor({ model, fields, items }: { model: string; fields: FieldDef[]; items: any[] }) {
  const [list, setList] = useState(items);
  const [adding, setAdding] = useState(false);

  async function reorder(next: any[]) {
    setList(next);
    await persistOrder(model, next.map((i) => i.id));
  }

  return (
    <div className="space-y-4">
      <SortableList items={list} onReorder={reorder}>
        {(item) => (
          <SortableItem key={item.id} id={item.id!}>
            <Row
              model={model}
              fields={fields}
              item={item}
              draggable
              onDeleted={() => setList((cur) => cur.filter((x) => x.id !== item.id))}
            />
          </SortableItem>
        )}
      </SortableList>

      {adding ? (
        <Row
          model={model}
          fields={fields}
          item={emptyFor(fields)}
          draggable={false}
          onCreated={(created) => {
            setList((cur) => [...cur, created]);
            setAdding(false);
          }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button onClick={() => setAdding(true)} className="bg-primary text-white font-headline font-black uppercase px-6 py-3 border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c]">
          + ADD
        </button>
      )}
    </div>
  );
}
