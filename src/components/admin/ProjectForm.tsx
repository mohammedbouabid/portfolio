"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextArea, Select, ImageUpload, SaveBar } from "./Field";

const CATEGORIES = [
  { value: "FULL_STACK", label: "Full Stack" },
  { value: "ODOO_ERP", label: "Odoo / ERP" },
  { value: "E_COMMERCE", label: "E-commerce" },
  { value: "FREELANCE", label: "Freelance" }
];

export default function ProjectForm({ initial, id }: { initial: any; id?: number }) {
  const [data, setData] = useState({
    slug: initial?.slug || "",
    title: initial?.title || "",
    category: initial?.category || "FULL_STACK",
    role: initial?.role || "",
    period: initial?.period || "",
    stackText: Array.isArray(initial?.stack) ? initial.stack.join(", ") : initial?.stack ? JSON.parse(initial.stack).join(", ") : "",
    summary: initial?.summary || "",
    problem: initial?.problem || "",
    approach: initial?.approach || "",
    outcome: initial?.outcome || "",
    cover: initial?.cover || "",
    comingSoon: !!initial?.comingSoon
  });
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const set = (k: string) => (e: any) => setData({ ...data, [k]: e.target ? (e.target.type === "checkbox" ? e.target.checked : e.target.value) : e });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const payload = {
      ...data,
      stack: data.stackText.split(",").map((s: string) => s.trim()).filter(Boolean)
    };
    const url = id ? `/api/admin/projects/${id}` : "/api/admin/projects";
    const method = id ? "PUT" : "POST";
    await fetch(url, { method, headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    setBusy(false);
    router.push("/admin/projects");
    router.refresh();
  }

  async function onDelete() {
    if (!id || !confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Slug (URL)" value={data.slug} onChange={set("slug")} required />
        <Field label="Title" value={data.title} onChange={set("title")} required />
        <Select label="Category" value={data.category} onChange={set("category")} options={CATEGORIES} />
        <Field label="Role" value={data.role} onChange={set("role")} />
        <Field label="Period" value={data.period} onChange={set("period")} />
      </div>
      <Field label="Tech stack (comma-separated)" value={data.stackText} onChange={set("stackText")} />
      <TextArea label="Summary" rows={2} value={data.summary} onChange={set("summary")} />
      <TextArea label="Problem" rows={3} value={data.problem} onChange={set("problem")} />
      <TextArea label="Approach" rows={3} value={data.approach} onChange={set("approach")} />
      <TextArea label="Outcome" rows={3} value={data.outcome} onChange={set("outcome")} />
      <ImageUpload label="Cover image" value={data.cover} onChange={(url) => setData({ ...data, cover: url })} />
      <label className="flex items-center gap-3 font-label text-xs uppercase tracking-widest font-black">
        <input type="checkbox" checked={data.comingSoon} onChange={set("comingSoon")} />
        Coming soon (placeholder card)
      </label>
      <SaveBar busy={busy} onDelete={id ? onDelete : undefined} />
    </form>
  );
}
