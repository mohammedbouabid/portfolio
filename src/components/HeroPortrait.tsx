"use client";
import { useState, useRef, useCallback, useEffect } from "react";

const QUOTES = [
  "THE CODE NEVER LIES. COMMENTS SOMETIMES DO.",
  "SHIP FAST. BREAK NOTHING.",
  "EVERY BUG IS A PLOT TWIST.",
  "CTRL+Z IS MY SECOND CHANCE.",
  "FIRST, SOLVE THE PROBLEM. THEN, WRITE THE CODE.",
  "CLEAN CODE READS LIKE A MANGA — PAGE BY PAGE.",
  "THE BEST ERROR MESSAGE IS THE ONE THAT NEVER SHOWS UP.",
  "A DEVELOPER'S SUPERPOWER: TURNING COFFEE INTO MODULES."
];

export default function HeroPortrait() {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const lastIdx = useRef(-1);
  const autoShownRef = useRef(false);

  const pickQuote = useCallback(() => {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * QUOTES.length);
    } while (idx === lastIdx.current && QUOTES.length > 1);
    lastIdx.current = idx;
    return QUOTES[idx];
  }, []);

  function handleClick() {
    setQuote(pickQuote());
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Auto-show on mobile on first visit / refresh
  useEffect(() => {
    if (autoShownRef.current) return;
    // Wait a frame so layout is settled, then check width
    requestAnimationFrame(() => {
      if (window.innerWidth >= 1024) return;
      autoShownRef.current = true;
      setTimeout(() => {
        setQuote(pickQuote());
        setOpen(true);
      }, 400);
    });
  }, [pickQuote]);

  return (
    <>
      {/* Mobile: character as background — clickable */}
      <div
        className="lg:hidden absolute inset-0 z-[1] cursor-pointer"
        onClick={handleClick}
      >
        <img
          src="/hero-anime.png"
          alt=""
          className="w-full h-full object-cover object-top grayscale contrast-125 opacity-15 dark:opacity-20 hover:opacity-25 dark:hover:opacity-30 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f9f9f9] via-[#f9f9f9]/80 to-transparent dark:from-[#0f1010] dark:via-[#0f1010]/80 pointer-events-none" />
      </div>

      {/* Desktop: panel in hero — clickable */}
      <div className="hidden lg:block absolute right-24 xl:right-32 top-24 bottom-24 z-30 select-none">
        <div className="relative h-full aspect-[3/4]">
          <button
            type="button"
            onClick={handleClick}
            className="group relative h-full w-full cursor-pointer -rotate-2 hover:rotate-0 hover:scale-[1.03] transition-all duration-400 ease-out"
          >
            <div className="absolute inset-0 border-[6px] border-[#1a1c1c] dark:border-[#f0f1f1] bg-[#1a1c1c] dark:bg-[#f0f1f1] shadow-[12px_12px_0px_0px_#ba0029] group-hover:shadow-[16px_16px_0px_0px_#ba0029] transition-shadow duration-400 overflow-hidden">
              <img
                src="/hero-anime.png"
                alt="Mohammed Bouabid — manga portrait"
                className="w-full h-full object-cover object-top grayscale contrast-125 group-hover:scale-105 transition-transform duration-400"
              />
              <div className="absolute inset-0 screentone opacity-10 pointer-events-none" />
            </div>
            <div className="absolute -top-4 -left-4 bg-primary text-white font-headline font-black uppercase text-xs px-3 py-1 -rotate-3 border-2 border-[#1a1c1c] dark:border-[#f0f1f1] shadow-[3px_3px_0px_0px_#1a1c1c] dark:shadow-[3px_3px_0px_0px_#f0f1f1]">
              CH.01
            </div>
            <div className="absolute -bottom-3 right-2 bg-[#1a1c1c] dark:bg-[#f0f1f1] text-[#f9f9f9] dark:text-[#1a1c1c] font-label font-black uppercase text-[10px] tracking-widest px-3 py-1 border-2 border-[#1a1c1c] dark:border-[#f0f1f1]">
              FILE_NO. 0001
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-label text-[9px] uppercase tracking-[0.3em] font-black text-white bg-[#1a1c1c]/80 dark:bg-[#f0f1f1]/80 dark:text-[#1a1c1c] px-3 py-1">
              CLICK ME
            </div>
          </button>
        </div>
      </div>

      {/* Fullscreen overlay */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      >
        {/* Backdrop */}
        <div className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />

        {/* Content */}
        <div
          className={`relative z-10 flex flex-col items-center gap-8 max-w-lg mx-6 transition-all duration-500 ease-[cubic-bezier(.7,.0,.2,1)] ${
            open ? "scale-100 translate-y-0" : "scale-75 translate-y-12"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Portrait + speech balloon */}
          <div className="relative -rotate-2">
            <div className="border-[8px] border-[#f0f1f1] dark:border-[#1a1c1c] shadow-[16px_16px_0px_0px_#ba0029] overflow-hidden">
              <img
                src="/hero-anime.png"
                alt="Mohammed Bouabid — manga portrait"
                className="w-72 md:w-96 aspect-[3/4] object-cover object-top grayscale contrast-125"
              />
              <div className="absolute inset-0 screentone opacity-10 pointer-events-none" />
            </div>
            <div className="absolute -top-4 -left-4 bg-primary text-white font-headline font-black uppercase text-sm px-3 py-1.5 -rotate-3 border-2 border-[#f0f1f1] dark:border-[#1a1c1c] shadow-[4px_4px_0px_0px_#ba0029]">
              CH.01
            </div>

            {/* Manga speech balloon — top-right of portrait */}
            <div className={`absolute -top-16 -right-8 md:-top-20 md:-right-12 rotate-2 z-20 transition-all duration-500 delay-200 ${
              open ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}>
              <div className="relative bg-[#f0f1f1] dark:bg-[#1a1c1c] border-[3px] border-[#1a1c1c] dark:border-[#f0f1f1] px-5 py-3 max-w-[220px] md:max-w-[260px]">
                <p className="font-headline font-black text-xs md:text-sm uppercase italic leading-tight text-[#1a1c1c] dark:text-[#f0f1f1]">
                  &ldquo;{quote}&rdquo;
                </p>
                {/* Balloon tail */}
                <div className="absolute -bottom-4 left-6 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-[#1a1c1c] dark:border-t-[#f0f1f1]" />
                <div className="absolute -bottom-[13px] left-[25px] w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-t-[14px] border-t-[#f0f1f1] dark:border-t-[#1a1c1c]" />
              </div>
            </div>
          </div>

          {/* Dismiss hint */}
          <p className={`font-label text-[10px] uppercase tracking-[0.4em] font-black text-white/60 transition-opacity duration-500 delay-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}>
            CLICK ANYWHERE TO CLOSE
          </p>
        </div>
      </div>
    </>
  );
}
