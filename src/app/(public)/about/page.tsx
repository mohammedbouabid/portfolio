import { getProfile, getExperiences, getEducation, getSkills, getCertifications, getLanguages, getInterests } from "@/lib/content";

export default async function AboutPage() {
  const [profile, experiences, education, skills, certifications, languages, interests] = await Promise.all([
    getProfile(), getExperiences(), getEducation(), getSkills(), getCertifications(), getLanguages(), getInterests()
  ]);

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-24">
      <div className="relative w-full overflow-hidden mb-12">
        <h1 className="font-headline font-black text-7xl md:text-[12rem] uppercase tracking-tighter italic sound-effect -rotate-2 select-none opacity-10">BUILD!</h1>
      </div>

      <section id="experience" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 relative group">
          <div className="absolute -inset-2 bg-on-surface z-0" />
          <div className="relative z-10 bg-surface border-4 border-on-surface p-2 shadow-[12px_12px_0px_0px_#ba0029]">
            <div className="overflow-hidden border-2 border-on-surface aspect-[3/4] bg-surface-container-high">
              <img src={profile.portrait} alt={profile.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105" />
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div className="space-y-1">
                <p className="font-label text-xs uppercase tracking-widest text-primary font-bold">Class: {profile.title}</p>
                <h2 className="font-headline text-3xl font-black uppercase italic leading-none">{profile.alias}</h2>
              </div>
              <div className="font-headline text-4xl font-black text-primary italic opacity-20">LV.02</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-2 bg-on-surface text-surface px-6 py-2 rotate-3 border-2 border-primary z-20">
            <p className="font-label text-sm uppercase font-black">STATUS: AVAILABLE // {profile.location.toUpperCase()}</p>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-10">
          <div className="relative border-4 border-on-surface p-8 bg-surface-container-lowest shadow-[8px_8px_0px_0px_#eeeeee]">
            <h3 className="font-headline text-3xl font-black uppercase italic mb-6">ORIGIN_STORY</h3>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed">{profile.summary}</p>
            <p className="font-body text-base mt-4 text-on-surface-variant leading-relaxed">
              Based in {profile.location}. Reach me at <a className="text-primary underline font-bold" href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-on-surface p-6 bg-white">
              <h4 className="font-headline font-black text-xl uppercase border-b-4 border-primary inline-block mb-4">LANGUAGES</h4>
              <ul className="space-y-2 font-body">
                {languages.map((l) => (
                  <li key={l.id} className="flex justify-between font-bold">
                    <span>{l.name}</span>
                    <span className="text-primary uppercase text-xs tracking-widest">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-4 border-on-surface p-6 bg-white">
              <h4 className="font-headline font-black text-xl uppercase border-b-4 border-primary inline-block mb-4">INTERESTS</h4>
              <ul className="space-y-1 font-body font-bold">
                {interests.map((i) => (<li key={i.id}>// {i.label}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-6">
          <h2 className="font-headline font-black text-4xl md:text-6xl uppercase shrink-0">CHAPTERS</h2>
          <div className="w-full h-2 bg-on-surface" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((e, i) => (
            <div key={e.id} className={`border-4 border-on-surface p-6 bg-surface-container-lowest manga-panel-shadow ${i === 1 ? "md:translate-y-8" : i === 2 ? "md:translate-y-16" : ""}`}>
              <div className="bg-primary text-white inline-block px-2 py-1 font-label text-[10px] font-black uppercase mb-2">CHAPTER 0{i + 1}</div>
              <h3 className="font-headline font-black text-2xl uppercase leading-none">{e.company}</h3>
              <p className="font-label text-xs uppercase tracking-widest text-zinc-500 mt-1">{e.role}</p>
              <p className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mt-1">{e.period} · {e.location}</p>
              <ul className="mt-4 space-y-2 font-body text-sm leading-relaxed">
                {e.bullets.map((b, j) => (<li key={j} className="border-l-4 border-on-surface pl-3">{b}</li>))}
              </ul>
              <div className="flex flex-wrap gap-1 mt-4">
                {e.stack.map((s) => (<span key={s} className="bg-on-surface text-surface text-[10px] font-bold px-2 py-0.5">{s}</span>))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="space-y-8">
        <div className="flex items-center gap-6">
          <h2 className="font-headline font-black text-4xl md:text-6xl uppercase shrink-0">CORE_STATS</h2>
          <div className="w-full h-2 bg-on-surface" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(["languages", "frameworks", "databases", "tools", "ecommerce", "personal"] as const).map((g) => (
            <div key={g} className="border-4 border-on-surface p-6 bg-white">
              <h4 className="font-headline font-black text-lg uppercase border-b-4 border-primary inline-block mb-4">{g.toUpperCase()}</h4>
              <div className="flex flex-wrap gap-2">
                {skills[g].map((s) => (
                  <span key={s} className="px-3 py-1 border-2 border-on-surface font-label text-xs font-bold uppercase italic bg-secondary-container">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border-4 border-on-surface p-6 bg-on-surface text-surface">
          <h3 className="font-headline font-black text-2xl uppercase border-b-4 border-primary inline-block mb-6">EDUCATION</h3>
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.id} className="border-l-4 border-primary pl-4">
                <p className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">{e.period}</p>
                <p className="font-headline font-bold text-lg uppercase leading-tight">{e.title}</p>
                <p className="font-body text-sm italic">{e.school}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-4 border-on-surface p-6 bg-white">
          <h3 className="font-headline font-black text-2xl uppercase border-b-4 border-primary inline-block mb-6">CERTIFICATIONS</h3>
          <ul className="space-y-3 font-body">
            {certifications.map((c, i) => (
              <li key={c.id} className="flex gap-3">
                <span className="text-primary font-black">[{String(i + 1).padStart(2, "0")}]</span>
                <span className="font-medium">
                  {c.label}
                  {c.organization && (
                    <span className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mt-0.5">{c.organization}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-4 border-on-surface p-8 md:p-12 bg-primary text-white shadow-[16px_16px_0px_0px_#1a1c1c] relative overflow-hidden">
        <div className="screentone absolute inset-0 opacity-10" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-headline font-black text-4xl md:text-6xl uppercase italic leading-none mb-4">INITIATE_<br />CONTACT.</h2>
            <p className="font-body font-bold uppercase tracking-widest text-sm">Open to MERN &amp; Odoo 17 missions.</p>
          </div>
          <div className="space-y-3 font-headline font-black uppercase">
            <a href={`mailto:${profile.email}`} className="block bg-white text-on-surface p-4 border-2 border-on-surface shadow-[6px_6px_0px_0px_rgba(26,28,28,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">{profile.email} →</a>
            <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="block bg-on-surface text-white p-4 border-2 border-white">{profile.phone} →</a>
            <a href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer" className="block bg-white text-on-surface p-4 border-2 border-on-surface shadow-[6px_6px_0px_0px_rgba(26,28,28,1)]">GITHUB / {profile.github} →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
