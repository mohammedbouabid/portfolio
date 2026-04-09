"use client";
import { useState } from "react";

export function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block space-y-1">
      <span className="font-label text-[10px] uppercase tracking-widest font-black">{label}</span>
      <input {...props} className="w-full border-4 border-on-surface p-3 font-body focus:border-primary focus:outline-none bg-white" />
    </label>
  );
}

export function TextArea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block space-y-1">
      <span className="font-label text-[10px] uppercase tracking-widest font-black">{label}</span>
      <textarea {...props} className="w-full border-4 border-on-surface p-3 font-body focus:border-primary focus:outline-none bg-white" />
    </label>
  );
}

export function Select({ label, options, ...props }: { label: string; options: { value: string; label: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block space-y-1">
      <span className="font-label text-[10px] uppercase tracking-widest font-black">{label}</span>
      <select {...props} className="w-full border-4 border-on-surface p-3 font-body focus:border-primary focus:outline-none bg-white">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

export function ImageUpload({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  async function upload(file: File) {
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setBusy(false);
    if (r.ok) {
      const { url } = await r.json();
      onChange(url);
    }
  }
  return (
    <div className="space-y-2">
      <span className="font-label text-[10px] uppercase tracking-widest font-black">{label}</span>
      <div className="flex flex-col md:flex-row gap-3 items-start">
        {value && <img src={value} alt="" className="w-32 h-32 object-cover border-4 border-on-surface" />}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or /uploads/..."
            className="w-full border-4 border-on-surface p-3 font-body focus:border-primary focus:outline-none bg-white"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
            className="block text-xs"
          />
          {busy && <p className="text-xs text-primary">Uploading…</p>}
        </div>
      </div>
    </div>
  );
}

export function SaveBar({ busy, onDelete }: { busy: boolean; onDelete?: () => void }) {
  return (
    <div className="flex flex-wrap gap-3 pt-4 border-t-4 border-on-surface">
      <button disabled={busy} type="submit" className="bg-primary text-white font-headline font-black uppercase px-6 py-3 border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50">
        {busy ? "..." : "SAVE"}
      </button>
      {onDelete && (
        <button type="button" onClick={onDelete} className="bg-white text-on-surface font-headline font-black uppercase px-6 py-3 border-2 border-on-surface hover:bg-on-surface hover:text-white">
          DELETE
        </button>
      )}
    </div>
  );
}
