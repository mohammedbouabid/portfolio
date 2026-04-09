import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const ps = await getProjects();
  return ps.filter((p) => !p.comingSoon).map((p) => ({ slug: p.slug }));
}

export const dynamic = "force-dynamic";

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project || project.comingSoon) notFound();

  const all = (await getProjects()).filter((p) => !p.comingSoon);
  const idx = all.findIndex((p) => p.slug === project.slug);
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];

  return (
    <main className="pt-24 pb-20 max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 space-y-16">
        <section className="relative">
          <div className="absolute -top-4 -left-4 bg-primary text-white font-headline font-black text-3xl md:text-6xl p-4 z-10 -rotate-2 border-4 border-on-surface shadow-[8px_8px_0px_0px_rgba(26,28,28,1)]">{project.title}</div>
          <div className="w-full aspect-[16/9] border-8 border-on-surface bg-surface-container overflow-hidden relative manga-panel">
            <img src={project.cover} alt={project.title} className="w-full h-full object-cover grayscale contrast-125 brightness-75" />
            <div className="absolute inset-0 screentone opacity-20" />
          </div>
          <div className="absolute bottom-4 right-4 word-balloon p-4 md:p-6 max-w-sm hidden md:block">
            <p className="font-headline font-bold text-base md:text-xl leading-tight uppercase italic">&ldquo;{project.summary}&rdquo;</p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-on-surface text-surface p-4 inline-block font-headline font-black uppercase tracking-widest">SCENE 01: THE PROBLEM</div>
            <div className="relative p-6 border-4 border-on-surface shadow-[8px_8px_0px_0px_rgba(186,0,41,1)] bg-surface-container-lowest">
              <div className="screentone-light absolute inset-0 pointer-events-none" />
              <p className="font-body text-lg leading-relaxed relative z-10">{project.problem}</p>
            </div>
          </div>
          <div className="manga-panel-alt overflow-hidden border-4 border-on-surface bg-zinc-200 min-h-[260px]">
            <img src={project.cover} alt="" className="w-full h-full object-cover grayscale" />
          </div>
        </div>

        <section className="relative py-12">
          <div className="action-lines absolute inset-0 -z-10" />
          <div className="border-y-8 border-on-surface py-8">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="bg-primary text-white px-3 py-1 inline-block font-headline font-black uppercase text-sm">SCENE 02: THE APPROACH</div>
              <h2 className="font-headline font-black text-3xl md:text-5xl uppercase tracking-tighter italic">BREAKING THE_GRID</h2>
              <p className="font-body font-medium text-base md:text-lg px-4 md:px-8">{project.approach}</p>
            </div>
          </div>
        </section>

        <div className="border-4 border-on-surface p-6 md:p-8 bg-on-surface text-surface manga-panel-shadow">
          <div className="bg-primary text-white p-2 inline-block font-headline font-black uppercase tracking-widest mb-4">SCENE 03: THE OUTCOME</div>
          <p className="font-body text-lg md:text-xl leading-relaxed">{project.outcome}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-8 border-t-4 border-on-surface">
          <Link href={`/works/${prev.slug}`} className="flex-1 border-4 border-on-surface p-4 hover:bg-on-surface hover:text-surface transition-colors">
            <div className="font-label text-[10px] uppercase font-black opacity-60">← PREV CHAPTER</div>
            <div className="font-headline font-black text-xl uppercase">{prev.title}</div>
          </Link>
          <Link href={`/works/${next.slug}`} className="flex-1 border-4 border-on-surface p-4 text-right hover:bg-on-surface hover:text-surface transition-colors">
            <div className="font-label text-[10px] uppercase font-black opacity-60">NEXT CHAPTER →</div>
            <div className="font-headline font-black text-xl uppercase">{next.title}</div>
          </Link>
        </div>
      </div>

      <aside className="lg:col-span-4 space-y-8">
        <div className="sticky top-28 space-y-8">
          <div className="border-8 border-on-surface bg-white shadow-[12px_12px_0px_0px_rgba(26,28,28,1)] relative overflow-hidden">
            <div className="bg-on-surface text-surface p-4 font-headline font-black text-xl md:text-2xl uppercase italic tracking-widest flex justify-between items-center">
              FILE_NO: {String(idx + 1).padStart(4, "0")}
              <span className="text-primary">★</span>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="font-label font-bold text-[10px] uppercase text-zinc-500">ROLE</label><p className="font-headline font-bold uppercase text-sm">{project.role}</p></div>
                <div className="space-y-1"><label className="font-label font-bold text-[10px] uppercase text-zinc-500">PERIOD</label><p className="font-headline font-bold uppercase text-sm">{project.period}</p></div>
                <div className="space-y-1"><label className="font-label font-bold text-[10px] uppercase text-zinc-500">CATEGORY</label><p className="font-headline font-bold uppercase text-sm">{project.category}</p></div>
                <div className="space-y-1"><label className="font-label font-bold text-[10px] uppercase text-zinc-500">STATUS</label><p className="font-headline font-bold uppercase text-sm text-primary">SHIPPED</p></div>
              </div>
              <div className="bg-surface-container p-4 border-l-8 border-primary">
                <label className="font-label font-black text-[10px] uppercase block mb-2">TECH_STACK</label>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (<span key={s} className="bg-on-surface text-surface text-[10px] font-bold px-2 py-0.5">{s}</span>))}
                </div>
              </div>
            </div>
          </div>
          <div className="border-4 border-on-surface p-6 bg-primary text-white space-y-4">
            <h5 className="font-headline font-black text-2xl uppercase tracking-tighter leading-none italic">NEED A DEV?</h5>
            <p className="font-body text-sm font-medium">Available for new MERN / Odoo missions.</p>
            <a href="mailto:mo.bouabid.dev@gmail.com" className="block w-full text-center bg-white text-on-surface font-headline font-black py-3 uppercase tracking-widest border-2 border-on-surface shadow-[4px_4px_0px_0px_rgba(26,28,28,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">INITIATE_CONTACT</a>
          </div>
        </div>
      </aside>
    </main>
  );
}
