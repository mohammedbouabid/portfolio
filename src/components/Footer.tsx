import { getProfile } from "@/lib/content";

export default async function Footer() {
  const profile = await getProfile();
  return (
    <footer className="w-full border-t-8 border-on-surface relative overflow-hidden bg-zinc-100 px-6 md:px-8 py-12 after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(#000_1px,transparent_0)] after:[background-size:4px_4px] after:opacity-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="font-label text-[10px] uppercase tracking-widest font-bold text-zinc-600">
          © {new Date().getFullYear()} {profile.alias} | ALL RIGHTS RESERVED
        </div>
        <div className="flex gap-6 md:gap-8 font-label text-[10px] uppercase tracking-widest font-bold">
          <a className="text-zinc-600 hover:text-on-surface hover:italic" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="text-zinc-600 hover:text-on-surface hover:italic" href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">GITHUB</a>
          <a className="text-zinc-600 hover:text-on-surface hover:italic" href={`https://www.linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noreferrer">LINKEDIN</a>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-on-surface" />
          <div className="w-8 h-8 bg-primary" />
        </div>
      </div>
    </footer>
  );
}
