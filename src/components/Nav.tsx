"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, SITE, WELCOME } from "@/lib/site";

function Monogram() {
  return (
    <a
      href="#top"
      className="flex items-center gap-3"
      aria-label={`${SITE.name} home`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-t-full rounded-b-lg border border-brick/30 bg-brick text-paper shadow-[0_8px_20px_rgba(165,73,63,0.25)]">
        <span className="font-display text-xl italic text-paper">O</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg italic tracking-wide text-ivory">
          Orbal
        </span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.32em] text-gold-deep">
          Shadi Hall
        </span>
      </span>
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
          <nav
            className={`anim-nav flex items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6 ${
              scrolled
                ? "border-line-strong/80 bg-ink/90 shadow-[0_12px_40px_rgba(42,32,20,0.12)] backdrop-blur-xl"
                : "border-line bg-ink/60 backdrop-blur-md"
            }`}
          >
            <Monogram />

            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-ivory-dim transition-colors duration-300 hover:text-brick"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#availability"
                className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-on-gold transition-all duration-500 hover:bg-gold-soft active:translate-y-px sm:inline-flex"
              >
                Reserve a Date
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-ink-2 text-ivory lg:hidden"
              >
                <span className="relative block h-3.5 w-5">
                  <span
                    className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${
                      open ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 bg-current transition-all duration-300 ${
                      open ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 bottom-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${
                      open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-ink/95 backdrop-blur-2xl transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-between px-8 pb-12 pt-28">
          <div>
            <p
              className="font-nastaliq text-right text-4xl leading-[1.6] text-brick"
              style={{ opacity: open ? 1 : 0 }}
            >
              {WELCOME.pashto}
            </p>
            <nav className="mt-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl italic text-ivory transition-all duration-500 hover:text-brick"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(24px)",
                    transitionDelay: open ? `${0.08 + i * 0.07}s` : "0s",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <a
              href="#availability"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-4 text-center text-base font-semibold text-on-gold"
            >
              Reserve a Date
            </a>
            <p className="text-center text-sm text-taupe">
              {SITE.phoneDisplay} &middot; {SITE.city}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
