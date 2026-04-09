import Link from "next/link";
import { getProfile, getProjects } from "@/lib/content";

export default async function HomePage() {
  const [profile, allProjects] = await Promise.all([getProfile(), getProjects()]);
  const featured = allProjects.filter((p) => !p.comingSoon).slice(0, 4);
  if (featured.length < 4) {
    while (featured.length < 4) featured.push(allProjects[0]);
  }

  return (
    <main>
      <header className="relative min-h-screen flex items-end pt-32 pb-20 px-6 md:px-12 overflow-hidden border-b-[12px] border-on-surface">
        <div className="absolute top-1/4 left-10 text-[8rem] md:text-[12rem] font-headline font-black text-on-surface opacity-5 select-none -rotate-12 pointer-events-none">BUILD</div>
        <div className="absolute bottom-1/4 right-10 text-[6rem] md:text-[10rem] font-headline font-black text-primary opacity-10 select-none rotate-6 pointer-events-none">SHIP</div>
        <div className="absolute inset-0 z-0 screentone opacity-10 pointer-events-none" />
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-4xl">
            <div className="inline-block bg-primary text-white font-headline font-bold uppercase text-xs px-3 py-1 mb-6 -rotate-1">
              {profile.title} // EST. 2022
            </div>
            <h1 className="font-headline font-black text-6xl md:text-[9rem] leading-none tracking-tighter uppercase mb-6 -rotate-2">
              {profile.name.split(" ")[0]}
              <br />
              <span className="text-primary italic inline-block translate-x-4 md:translate-x-12">
                {profile.name.split(" ").slice(1).join(" ")}.
              </span>
            </h1>
            <p className="font-body text-base md:text-2xl font-bold max-w-xl bg-on-surface text-surface p-4 border-l-8 border-primary">{profile.summary}</p>
          </div>
          <div className="flex flex-col gap-4 items-end">
            <div className="text-vertical hidden md:block font-headline font-black text-3xl uppercase tracking-[0.2em] border-r-4 border-on-surface pr-4">VOL. 01 / 2026</div>
            <Link href="/works" className="bg-primary text-white px-6 md:px-10 py-4 md:py-6 text-lg md:text-2xl font-headline font-black uppercase border-4 border-on-surface shadow-[8px_8px_0px_0px_rgba(26,28,28,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              VIEW WORKS →
            </Link>
          </div>
        </div>
      </header>

      <section className="py-24 px-6 md:px-12 bg-surface-container">
        <div className="flex items-center gap-6 mb-16 overflow-hidden">
          <h2 className="font-headline font-black text-4xl md:text-6xl uppercase shrink-0">SELECTED_WORKS</h2>
          <div className="w-full h-2 bg-on-surface" />
          <div className="font-label font-bold text-primary tracking-widest shrink-0 hidden md:block">ARCHIVE</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <Link href={`/works/${featured[0].slug}`} className="md:col-span-8 group relative overflow-hidden border-[6px] border-on-surface bg-white block">
            <div className="absolute top-4 left-4 z-20 bg-primary text-white px-4 py-1 font-label font-black italic">FEATURED_01</div>
            <img src={featured[0].cover} alt={featured[0].title} className="w-full h-[400px] md:h-[500px] object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 screentone opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-surface/90 backdrop-blur-md border-t-4 border-on-surface md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-headline font-black text-2xl md:text-3xl mb-2">{featured[0].title}</h3>
              <p className="font-body text-sm font-semibold text-secondary">{featured[0].summary}</p>
            </div>
          </Link>
          <Link href={`/works/${featured[1].slug}`} className="md:col-span-4 group relative border-[6px] border-on-surface bg-on-surface text-surface overflow-hidden block">
            <div className="screentone absolute inset-0 opacity-20" />
            <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[400px]">
              <div className="font-headline font-bold text-7xl text-surface/10 leading-none">ERP</div>
              <div>
                <h3 className="font-headline font-black text-3xl md:text-4xl mb-4 italic text-primary">{featured[1].title}</h3>
                <p className="font-body text-base font-medium">{featured[1].summary}</p>
                <span className="mt-8 inline-block border-b-4 border-primary text-primary font-headline font-black text-xl group-hover:skew-x-[-10deg] transition-all">VIEW_PROJECT →</span>
              </div>
            </div>
          </Link>
          <Link href={`/works/${featured[2].slug}`} className="md:col-span-4 group relative border-[6px] border-on-surface overflow-hidden aspect-square block">
            <img src={featured[2].cover} alt={featured[2].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t-2 border-on-surface">
              <h4 className="font-headline font-bold text-sm uppercase">{featured[2].title}</h4>
            </div>
          </Link>
          <Link href={`/works/${featured[3].slug}`} className="md:col-span-8 group relative border-[6px] border-on-surface overflow-hidden block">
            <div className="absolute inset-0 bg-on-surface screentone opacity-5" />
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="flex-1">
                <div className="bg-primary text-white px-2 py-1 inline-block font-label text-xs font-black mb-4">CASE_STUDY_04</div>
                <h3 className="font-headline font-black text-3xl md:text-5xl tracking-tighter uppercase mb-4 leading-none">{featured[3].title}</h3>
                <p className="font-body text-on-surface/70 leading-relaxed font-semibold">{featured[3].summary}</p>
              </div>
              <div className="w-full md:w-1/3 h-48 border-4 border-dashed border-on-surface-variant overflow-hidden">
                <img src={featured[3].cover} alt={featured[3].title} className="w-full h-full object-cover grayscale" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-on-surface text-surface overflow-hidden">
        <div className="absolute top-0 right-0 p-12 text-[10rem] md:text-[15rem] font-headline font-black text-surface/5 leading-none pointer-events-none select-none">SHIP</div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <blockquote className="max-w-5xl mx-auto">
            <p className="font-headline font-black text-3xl md:text-6xl leading-tight uppercase italic mb-12">
              &ldquo;{profile.manifesto}&rdquo;
            </p>
            <cite className="font-label tracking-[0.4em] font-bold text-primary not-italic">— {profile.alias} MANIFESTO</cite>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
