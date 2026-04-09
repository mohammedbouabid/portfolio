"use client";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/about#experience", label: "Chapters" },
  { href: "/about#skills", label: "Skills" }
];

export default function Nav({ email, position = "top" }: { email: string; position?: "top" | "bottom" }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  const positionCls = position === "top" ? "top-6" : "bottom-6";

  return (
    <nav className={`hidden md:flex fixed ${positionCls} left-0 right-0 z-50 justify-center pointer-events-none`}>
      <div className="pointer-events-auto relative bg-[#1a1c1c] dark:bg-[#f0f1f1] rounded-full p-2 flex items-center gap-2 border-2 border-[#1a1c1c] dark:border-[#f0f1f1] shadow-[6px_6px_0px_0px_#ba0029] transition-transform duration-200 hover:translate-y-[-2px]">
        {/* Logo (favicon) */}
        <Link
          href="/"
          aria-label="Home"
          className="group flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-[#1a1c1c] border-2 border-[#1a1c1c] dark:border-[#f0f1f1] shrink-0 overflow-hidden transition-transform duration-200 hover:rotate-[8deg] active:scale-90"
        >
          <img src="/android-chrome-192x192.png" alt="" className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110" />
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1 px-2 font-headline font-bold text-base">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="relative px-3 py-2 rounded-full text-white/80 dark:text-[#1a1c1c]/70 hover:text-white dark:hover:text-[#1a1c1c] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <span aria-hidden="true" className="w-px h-6 bg-white/20 dark:bg-[#1a1c1c]/20" />

        {/* Theme toggle */}
        <ThemeToggle className="w-11 h-11 rounded-full text-white/80 dark:text-[#1a1c1c]/70 hover:text-white dark:hover:text-[#1a1c1c] transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 active:scale-90" />

        {/* Resume download */}
        <a
          href="/resume.pdf"
          download
          target="_blank"
          rel="noreferrer"
          aria-label="Download resume"
          className="flex items-center justify-center w-11 h-11 rounded-full text-white/80 dark:text-[#1a1c1c]/70 hover:text-white dark:hover:text-[#1a1c1c] transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 active:scale-90"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
          </svg>
        </a>

        {/* Contact pill — click to copy */}
        <button
          type="button"
          onClick={copyEmail}
          className="ml-1 flex items-center gap-2 h-11 px-5 rounded-full bg-white dark:bg-[#1a1c1c] text-[#1a1c1c] dark:text-[#f0f1f1] border-2 border-[#1a1c1c] dark:border-[#f0f1f1] font-headline font-bold text-sm tracking-tight transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:border-primary active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 5h18v14H3zM3 5l9 7 9-7" />
          </svg>
          {email}
        </button>

        {/* Toast */}
        <div
          aria-live="polite"
          className={`absolute left-1/2 -translate-x-1/2 ${
            position === "top" ? "top-full mt-3" : "bottom-full mb-3"
          } bg-primary text-white font-headline font-black uppercase text-xs tracking-widest px-4 py-2 border-2 border-[#1a1c1c] dark:border-[#f0f1f1] shadow-[4px_4px_0px_0px_#1a1c1c] dark:shadow-[4px_4px_0px_0px_#f0f1f1] whitespace-nowrap pointer-events-none transition-all duration-300 ${
            copied ? "opacity-100 translate-y-0" : "opacity-0 " + (position === "top" ? "-translate-y-2" : "translate-y-2")
          }`}
        >
          ✓ Email copied!
        </div>
      </div>
    </nav>
  );
}
