import Link from "next/link";
import { getProfile, getProjects } from "@/lib/content";
import HeroPortrait from "@/components/HeroPortrait";

export default async function HomePage() {
  const [profile, allProjects] = await Promise.all([getProfile(), getProjects()]);
  const featured = allProjects.filter((p) => !p.comingSoon).slice(0, 4);
  if (featured.length < 4) {
    while (featured.length < 4) featured.push(allProjects[0]);
  }

  return (
    <main>
      <header className="relative min-h-[100dvh] flex items-center pt-28 pb-16 md:pt-32 md:pb-24 px-6 md:px-24 lg:px-32 overflow-hidden border-b-[12px] border-on-surface">
        <div className="absolute top-1/4 left-10 text-[8rem] md:text-[12rem] font-headline font-black text-on-surface opacity-5 select-none -rotate-12 pointer-events-none">BUILD</div>
        <div className="absolute bottom-1/4 right-10 text-[6rem] md:text-[10rem] font-headline font-black text-primary opacity-10 select-none rotate-6 pointer-events-none">SHIP</div>
        <div className="absolute inset-0 z-0 screentone opacity-10 pointer-events-none" />

        <HeroPortrait />

        <div className="relative z-20 w-full flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-4xl lg:max-w-2xl">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 mb-6 bg-on-surface text-surface font-label text-[10px] uppercase tracking-[0.3em] font-black px-3 py-1.5 border-2 border-on-surface">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              AVAILABLE FOR HIRE
            </div>

            <div className="inline-block bg-primary text-white font-headline font-bold uppercase text-xs px-3 py-1 mb-6 -rotate-1 ml-3">
              {profile.title} // EST. 2022
            </div>

            <h1 className="font-headline font-black text-6xl md:text-[9rem] leading-none tracking-tighter uppercase mb-8 -rotate-2">
              {profile.name.split(" ")[0]}
              <br />
              <span className="text-primary italic inline-block translate-x-4 md:translate-x-12">
                {profile.name.split(" ").slice(1).join(" ")}.
              </span>
            </h1>

            {/* Action buttons row */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/works"
                className="bg-primary text-white px-6 md:px-8 py-4 md:py-5 text-base md:text-lg font-headline font-black uppercase border-4 border-on-surface shadow-[8px_8px_0px_0px_rgba(26,28,28,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                VIEW WORKS →
              </Link>
              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noreferrer"
                className="bg-surface text-on-surface px-6 md:px-8 py-4 md:py-5 text-base md:text-lg font-headline font-black uppercase border-4 border-on-surface shadow-[8px_8px_0px_0px_rgba(26,28,28,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.66-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0z"/></svg>
                GITHUB
              </a>
              <a
                href="/resume.pdf"
                download
                target="_blank"
                rel="noreferrer"
                className="text-on-surface px-4 py-4 md:py-5 text-base md:text-lg font-headline font-black uppercase border-b-4 border-on-surface hover:text-primary hover:border-primary transition-colors flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>
                CV.PDF
              </a>
            </div>

            {/* Currently building line */}
            <div className="mt-8 font-label text-xs uppercase tracking-widest font-bold text-on-surface/70 flex flex-wrap items-center gap-2">
              <span className="text-primary">&gt;</span>
              <span>CURRENTLY:</span>
              <span className="text-on-surface font-black">ODOO 17 @ YMH INNOVATION</span>
              <span className="opacity-40">·</span>
              <span>📍 {profile.location.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1 font-label text-[10px] uppercase tracking-[0.4em] font-black text-on-surface/60 animate-bounce">
          SCROLL
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m0 0l-6-6m6 6l6-6"/></svg>
        </div>
      </header>

      {/* === ABOUT_ME — manga page intro === */}
      <section className="relative py-24 md:py-32 px-6 md:px-24 lg:px-32 bg-surface border-b-[12px] border-on-surface overflow-hidden">
        <div className="absolute top-10 right-10 text-[10rem] md:text-[14rem] font-headline font-black text-primary opacity-[0.06] select-none rotate-6 pointer-events-none leading-none">INK</div>
        <div className="absolute inset-0 screentone opacity-[0.06] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: heading */}
          <div className="lg:col-span-4">
            <div className="inline-block bg-on-surface text-surface font-label text-[10px] uppercase tracking-[0.4em] font-black px-3 py-1.5 mb-4">
              CHAPTER 00 // ORIGIN
            </div>
            <h2 className="font-headline font-black text-6xl md:text-7xl uppercase italic tracking-tighter leading-[0.9] -rotate-1">
              ABOUT
              <br />
              <span className="text-primary">_ME.</span>
            </h2>
            <div className="mt-6 w-24 h-2 bg-on-surface" />
            <div className="mt-2 w-12 h-2 bg-primary" />
          </div>

          {/* Right: text + pull quote */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body text-base md:text-lg leading-relaxed">
              <p className="border-l-4 border-on-surface pl-4">{profile.summary}</p>
              <div className="relative">
                <div className="speech-bubble p-5 -rotate-1">
                  <p className="font-headline font-black text-lg md:text-xl uppercase italic leading-tight">
                    &ldquo;{profile.manifesto}&rdquo;
                  </p>
                </div>
                <p className="mt-6 font-label text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface/60">
                  — {profile.alias} MANIFESTO
                </p>
              </div>
            </div>

            {/* Stat panels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {[
                { num: "2+", label: "YEARS\nEXPERIENCE" },
                { num: "4+", label: "ODOO 17\nMODULES SHIPPED" },
                { num: "60%", label: "MANUAL TASKS\nELIMINATED" }
              ].map((s, i) => (
                <div
                  key={s.num}
                  className={`relative border-4 border-on-surface bg-surface p-5 shadow-[6px_6px_0px_0px_#1a1c1c] ${
                    i === 1 ? "md:translate-y-3" : i === 2 ? "md:translate-y-6" : ""
                  }`}
                >
                  <div className="font-headline font-black text-5xl md:text-6xl text-primary leading-none">{s.num}</div>
                  <div className="mt-2 font-label text-[10px] uppercase tracking-widest font-black whitespace-pre-line text-on-surface/70">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Stack index strip */}
            <div className="border-t-4 border-on-surface pt-4 mt-4">
              <div className="font-label text-[10px] uppercase tracking-[0.4em] font-black text-on-surface/60 mb-2">
                STACK_INDEX //
              </div>
              <div className="flex flex-wrap gap-2">
                {["Odoo 17", "Python", "MERN", "ReactJS", "Node.js", "PostgreSQL", "MongoDB", "TailwindCSS", "WooCommerce"].map((t) => (
                  <span key={t} className="border-2 border-on-surface px-3 py-1 font-label text-[10px] font-black uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-24 lg:px-32 bg-surface-container">
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
