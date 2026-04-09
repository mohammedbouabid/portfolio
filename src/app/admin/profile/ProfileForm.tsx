"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextArea, ImageUpload, SaveBar } from "@/components/admin/Field";

export default function ProfileForm({ initial }: { initial: any }) {
  const [data, setData] = useState(initial);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const set = (k: string) => (e: any) => setData({ ...data, [k]: e.target ? e.target.value : e });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await fetch("/api/admin/profile", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    setBusy(false);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Full name" value={data.name} onChange={set("name")} />
        <Field label="Alias / Logo" value={data.alias} onChange={set("alias")} />
        <Field label="Title" value={data.title} onChange={set("title")} />
        <Field label="Location" value={data.location} onChange={set("location")} />
        <Field label="Email" value={data.email} onChange={set("email")} />
        <Field label="Phone" value={data.phone} onChange={set("phone")} />
        <Field label="GitHub username" value={data.github} onChange={set("github")} />
        <Field label="LinkedIn username" value={data.linkedin} onChange={set("linkedin")} />
      </div>
      <TextArea label="Summary" rows={4} value={data.summary} onChange={set("summary")} />
      <TextArea label="Manifesto quote" rows={3} value={data.manifesto} onChange={set("manifesto")} />
      <ImageUpload label="Portrait" value={data.portrait} onChange={(url) => setData({ ...data, portrait: url })} />
      <SaveBar busy={busy} />
    </form>
  );
}
