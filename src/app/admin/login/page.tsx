"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: pw })
    });
    setBusy(false);
    if (!res.ok) {
      setErr("Invalid password");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6">
      <form onSubmit={onSubmit} className="w-full max-w-md border-4 border-on-surface bg-white p-8 shadow-[12px_12px_0px_0px_#1a1c1c] space-y-6">
        <div>
          <h1 className="font-headline font-black text-4xl uppercase italic">ADMIN_LOGIN</h1>
          <p className="font-label text-xs uppercase tracking-widest text-zinc-500 mt-2">Restricted access</p>
        </div>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          className="w-full border-4 border-on-surface p-4 font-body focus:border-primary focus:outline-none"
          autoFocus
        />
        {err && <p className="text-primary font-bold text-sm">{err}</p>}
        <button
          disabled={busy}
          className="w-full bg-primary text-white font-headline font-black uppercase py-4 border-2 border-on-surface shadow-[6px_6px_0px_0px_#1a1c1c] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50"
        >
          {busy ? "..." : "ENTER"}
        </button>
      </form>
    </div>
  );
}
