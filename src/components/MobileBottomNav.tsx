"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const navItems = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" }
];

const CARD =
  "flex-1 h-12 flex items-center justify-center border-4 border-[#1a1c1c] dark:border-[#f0f1f1] bg-[#f9f9f9] dark:bg-[#1a1c1c] text-[#1a1c1c] dark:text-[#f0f1f1] shadow-[4px_4px_0px_0px_#1a1c1c] dark:shadow-[4px_4px_0px_0px_#f0f1f1] transition-all duration-150 ease-out active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_#1a1c1c] dark:active:shadow-[0px_0px_0px_0px_#f0f1f1]";

const CARD_ACTIVE =
  "!bg-primary !text-white !border-[#1a1c1c] dark:!border-[#f0f1f1]";

export default function MobileBottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* Top-right utility icons (mobile) */}
      <div className="md:hidden fixed top-4 right-4 z-50 h-12 flex items-center gap-2">
        <ThemeToggle className="w-10 h-10 flex items-center justify-center text-[#1a1c1c] dark:text-[#f0f1f1] hover:text-primary dark:hover:text-primary transition-colors" />
        <a
          href="/resume.pdf"
          download
          target="_blank"
          rel="noreferrer"
          aria-label="Download resume"
          className="w-10 h-10 flex items-center justify-center text-[#1a1c1c] dark:text-[#f0f1f1] hover:text-primary dark:hover:text-primary transition-colors"
        >
          <Icon d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
        </a>
      </div>

      {/* Top-left nav cards (mobile) */}
      <nav className="md:hidden fixed top-4 left-4 z-50 flex items-center gap-2">
        {navItems.map((it) => {
          const active = isActive(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`${CARD} !flex-none w-20 ${active ? CARD_ACTIVE : ""}`}
            >
              <span className="font-headline font-black uppercase text-xs tracking-tight">{it.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
