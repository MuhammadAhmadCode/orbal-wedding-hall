"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowDown, StarFour } from "@phosphor-icons/react/dist/ssr";
import { IMAGES, WELCOME } from "@/lib/site";

const TRIO = [
  { text: WELCOME.pashto, script: "nastaliq" as const },
  { text: WELCOME.urdu, script: "nastaliq" as const },
  { text: WELCOME.english, script: "latin" as const },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pb-20 pt-36 sm:pt-40"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(70% 60% at 85% 0%, rgba(200,159,86,0.28), transparent 60%), radial-gradient(55% 50% at 5% 100%, rgba(165,73,63,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <div
            className="anim-rise inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-line-strong bg-ink-2/70 px-4 py-2.5"
            style={{ animationDelay: "0.15s" }}
          >
            {TRIO.map((w, i) => (
              <span key={w.text} className="flex items-center gap-2.5">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-gold" />}
                <span
                  className={
                    w.script === "nastaliq"
                      ? "font-nastaliq text-[15px] leading-none text-brick"
                      : "text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep"
                  }
                >
                  {w.text}
                </span>
              </span>
            ))}
          </div>

          <h1 className="anim-rise mt-7 font-display text-[clamp(2.9rem,8vw,5.6rem)] font-normal leading-[1.02] tracking-tight text-ivory">
            <span className="block" style={{ animationDelay: "0.25s" }}>
              Every great
            </span>
            <span className="block" style={{ animationDelay: "0.35s" }}>
              wedding begins
            </span>
            <span className="block" style={{ animationDelay: "0.45s" }}>
              with a <em className="text-brick">welcome.</em>
            </span>
          </h1>

          <p
            className="anim-rise mt-7 max-w-xl text-base leading-relaxed text-ivory-dim sm:text-lg"
            style={{ animationDelay: "0.58s" }}
          >
            Orbal Shadi Hall hosts up to 1,000 guests in two grand, separate
            halls — with in-house decor, fine catering and valet parking
            handled end to end. Pick a free date and lock it online in minutes.
          </p>

          <div
            className="anim-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.68s" }}
          >
            <a
              href="#availability"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 text-base font-semibold text-on-gold transition-all duration-500 hover:bg-gold-soft active:scale-[0.98]"
            >
              Check Availability
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-on-gold/15 text-on-gold transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight size={16} weight="bold" />
              </span>
            </a>
            <a
              href="#packages"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line-strong bg-ink-2/60 px-7 text-base font-medium text-ivory transition-all duration-500 hover:border-brick/50 hover:text-brick active:scale-[0.98]"
            >
              Explore Packages
            </a>
          </div>

          <dl
            className="anim-rise mt-12 flex flex-wrap gap-x-10 gap-y-4"
            style={{ animationDelay: "0.8s" }}
          >
            {[
              ["1,000+", "Guest capacity"],
              ["Two", "Grand halls"],
              ["Valet", "Attended parking"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <dt className="order-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-taupe">
                  {label}
                </dt>
                <dd className="order-1 font-display text-3xl italic text-gold-deep">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <RevealHeroImage />
      </div>

      <a
        href="#hall"
        aria-label="Scroll to explore"
        className="anim-rise absolute bottom-6 left-1/2 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-line-strong text-ivory-dim transition-colors duration-300 hover:border-brick/50 hover:text-brick sm:flex"
        style={{ animationDelay: "0.95s" }}
      >
        <ArrowDown size={18} weight="light" />
      </a>
    </section>
  );
}

function RevealHeroImage() {
  return (
    <div className="anim-rise relative hidden justify-center sm:flex" style={{ animationDelay: "0.4s" }}>
      <div className="relative w-full max-w-[420px]">
        <div
          className="absolute -right-8 -top-8 -z-10 h-56 w-56 rounded-full border border-gold/40"
          aria-hidden="true"
        />
        <div
          className="absolute -left-10 bottom-16 -z-10 h-40 w-40 rounded-full border border-brick/30"
          aria-hidden="true"
        />
        <div className="relative overflow-hidden rounded-t-full rounded-b-[2rem] ring-1 ring-line-strong shadow-[0_30px_80px_rgba(42,32,20,0.25)]">
          <Image
            src={IMAGES.hero}
            alt="Grand banquet hall at Orbal Shadi Hall"
            fill
            priority
            sizes="420px"
            className="object-cover"
          />
        </div>
        <div className="absolute -left-8 bottom-10 rotate-90 origin-bottom-left rounded-full border border-line-strong bg-ink/85 px-4 py-2.5 backdrop-blur-md">
          <span className="font-nastaliq text-lg leading-none text-brick">
            {WELCOME.pashto}
          </span>
        </div>
        <div className="absolute -right-4 top-1/2 flex h-24 w-24 -translate-y-1/2 items-center justify-center rounded-full bg-brick shadow-[0_16px_40px_rgba(165,73,63,0.4)]">
          <div className="flex flex-col items-center gap-0.5 text-center text-paper">
            <StarFour size={14} weight="fill" className="opacity-80" />
            <span className="font-display text-3xl italic leading-none">
              1,000
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.16em]">
              Guests
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
