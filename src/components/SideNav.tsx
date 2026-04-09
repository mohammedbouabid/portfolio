"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const navLinks = [
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/about#experience", label: "Chapters" },
  { href: "/about#skills", label: "Skills" }
];

const CARD_BASE =
  "group/card relative w-40 h-14 flex items-center justify-center border-4 border-[#1a1c1c] dark:border-[#f0f1f1] bg-[#f9f9f9] dark:bg-[#1a1c1c] text-[#1a1c1c] dark:text-[#f0f1f1] shadow-[6px_6px_0px_0px_#1a1c1c] dark:shadow-[6px_6px_0px_0px_#f0f1f1] transition-all duration-150 ease-out hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-[0px_0px_0px_0px_#1a1c1c] dark:hover:shadow-[0px_0px_0px_0px_#f0f1f1]";

const CARD_ACTIVE =
  "!bg-primary !text-white !border-[#1a1c1c] dark:!border-[#f0f1f1]";

function CornerChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={`absolute top-1 left-1 font-label text-[9px] uppercase tracking-widest font-black ${
        active ? "text-white" : "text-primary"
      }`}
    >
      {label}
    </span>
  );
}

function Screentone() {
  return <span aria-hidden="true" className="absolute inset-0 screentone opacity-[0.06] pointer-events-none" />;
}

export default function SideNav({ email: _email }: { email: string }) {
  const pathname = usePathname();

  function isActive(href: string) {
    const path = href.split("#")[0];
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(path + "/");
  }

  return (
    <>
    {/* Logo — top-left */}
    <Link
      href="/"
      aria-label="Home"
      className="hidden md:flex fixed top-6 left-6 z-50 items-center justify-center transition-transform duration-200 hover:rotate-[8deg] hover:scale-110 active:scale-95"
    >
      <img src="/favicon-light/android-chrome-192x192.png" alt="" className="w-20 h-20 object-contain block dark:hidden" />
      <img src="/android-chrome-192x192.png" alt="" className="w-20 h-20 object-contain hidden dark:block" />
    </Link>

    {/* Nav cards — centered top */}
    <nav className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-50 items-center gap-4">
      {navLinks.map((l, i) => {
        const active = isActive(l.href);
        return (
          <Link
            key={l.label}
            href={l.href}
            className={`${CARD_BASE} ${active ? CARD_ACTIVE : ""}`}
          >
            <Screentone />
            <CornerChip label={`0${i + 1}`} active={active} />
            <span className="relative z-10 font-headline font-black uppercase text-base tracking-tight">{l.label}</span>
          </Link>
        );
      })}
    </nav>

    {/* Top-right utility icons */}
    <div className="hidden md:flex fixed top-8 right-6 z-50 h-14 items-center gap-3">
      <ThemeToggle className="w-14 h-14 flex items-center justify-center text-[#1a1c1c] dark:text-[#f0f1f1] hover:text-primary dark:hover:text-primary transition-colors" />
      <a
        href="/resume.pdf"
        download
        target="_blank"
        rel="noreferrer"
        aria-label="Download resume"
        className="w-14 h-14 flex items-center justify-center text-[#1a1c1c] dark:text-[#f0f1f1] hover:text-primary dark:hover:text-primary transition-colors"
      >
        <Icon d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
      </a>
    </div>
    </>
  );
}
