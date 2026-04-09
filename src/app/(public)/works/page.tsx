import Link from "next/link";
import { getProjects } from "@/lib/content";

const TOC = [
  { code: "01_FULL_STACK", page: "PAGE 012" },
  { code: "02_ODOO_ERP", page: "PAGE 034" },
  { code: "03_E_COMMERCE", page: "PAGE 058" },
  { code: "04_FREELANCE", page: "PAGE 089" }
];

export default async function WorksPage() {
  const projects = await getProjects();
  return (
    <main className="pt-32 pb-20 px-4 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <header className="mb-16 border-l-8 border-primary pl-6 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none -rotate-1 origin-left">
            WORKS<br /><span className="text-primary italic">GALLERY.</span>
          </h1>
          <p className="font-label text-xs tracking-widest uppercase mt-4 text-zinc-500">VOL. 01 // BUILT IN MERN, ODOO &amp; PHP</p>
        </div>
        <div className="bg-surface-container border-4 border-on-surface p-4 manga-panel-shadow flex flex-col gap-2 min-w-[280px]">
          <div className="font-headline font-bold border-b-2 border-on-surface pb-1 text-sm italic">TABLE OF CONTENTS</div>
          <nav className="flex flex-col font-label text-[10px] tracking-tighter font-black">
            {TOC.map((t, i) => (
              <a key={t.code} href={`#${t.code}`} className={`flex justify-between items-center p-1 ${i === 1 ? "bg-on-surface text-surface" : "hover:bg-primary hover:text-white"}`}>
                <span>{t.code}</span>
                <span className="font-bold">{t.page}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {projects.map((p, i) => {
          const layouts = [
            "md:col-span-7 h-[600px]",
            "md:col-span-5 md:ml-[-20px] z-20 h-[400px] -rotate-2",
            "md:col-span-5 h-[300px] perspective-tilt",
            "md:col-span-7 h-[400px]",
            "md:col-span-4 h-[320px]",
            "md:col-span-4 h-[320px] rotate-1",
            "md:col-span-4 h-[320px] -rotate-1",
            "md:col-span-12 h-[260px]"
          ];
          const cls = layouts[i] || "md:col-span-4 h-[320px]";
          const inner = (
            <>
              <div className="absolute -top-3 -left-3 z-10 bg-white border-2 border-on-surface px-3 py-1 font-headline font-extrabold italic text-sm md:text-lg uppercase skew-x-[-12deg]">{p.title}</div>
              <div className="absolute inset-0 overflow-hidden border-[6px] border-on-surface bg-zinc-200 manga-panel-shadow">
                <img src={p.cover} alt={p.title} className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 halftone opacity-30 pointer-events-none" />
                {p.comingSoon ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-on-surface/80">
                    <span className="font-headline font-black text-3xl md:text-5xl text-primary italic uppercase tracking-tighter rotate-[-6deg]">COMING_SOON</span>
                  </div>
                ) : (
                  <div className="absolute bottom-0 right-0 bg-on-surface text-surface px-3 py-1 font-label text-[10px] uppercase font-bold tracking-widest">{p.category} · {p.period}</div>
                )}
              </div>
            </>
          );
          return p.comingSoon ? (
            <div key={p.id} className={`${cls} group relative`}>{inner}</div>
          ) : (
            <Link key={p.id} href={`/works/${p.slug}`} className={`${cls} group relative block`}>{inner}</Link>
          );
        })}
      </section>
    </main>
  );
}
