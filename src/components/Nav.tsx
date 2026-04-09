import Link from "next/link";
import { getProfile } from "@/lib/content";

const links = [
  { href: "/works", label: "WORKS" },
  { href: "/about", label: "ABOUT" },
  { href: "/about#experience", label: "CHAPTERS" },
  { href: "/about#skills", label: "SKILLS" }
];

export default async function Nav() {
  const profile = await getProfile();
  return (
    <nav className="fixed top-0 w-full border-b-4 border-on-surface bg-white/80 backdrop-blur-xl shadow-[6px_6px_0px_0px_rgba(26,28,28,1)] z-50 flex justify-between items-center px-4 md:px-6 py-4">
      <Link
        href="/"
        className="text-xl md:text-3xl font-black italic tracking-tighter text-on-surface underline decoration-4 decoration-primary underline-offset-4 font-headline uppercase"
      >
        {profile.alias}
      </Link>
      <div className="hidden md:flex items-center gap-8 font-headline uppercase tracking-tighter font-bold">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="text-on-surface hover:text-primary hover:skew-x-[-12deg] transition-transform duration-75">
            {l.label}
          </Link>
        ))}
      </div>
      <a
        href={`mailto:${profile.email}`}
        className="bg-primary text-white px-3 md:px-6 py-2 text-xs md:text-base border-2 border-on-surface font-headline font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(26,28,28,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
      >
        CONTACT_ME
      </a>
    </nav>
  );
}
