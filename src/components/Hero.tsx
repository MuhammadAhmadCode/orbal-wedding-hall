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
      <div className="relative w-full max-w-[460px]">
        {/* echoed arch silhouette */}
        <div
          aria-hidden="true"
          className="absolute -right-8 -top-10 h-[590px] w-[440px] rounded-t-full rounded-b-[3rem] border-2 border-gold/25"
        />

        {/* drifting gold + brick dust */}
        <span
          aria-hidden="true"
          className="anim-float absolute -top-3 right-24 h-2.5 w-2.5 rounded-full bg-gold"
          style={{ animationDuration: "5s" }}
        />
        <span
          aria-hidden="true"
          className="anim-float absolute top-44 -right-4 h-1.5 w-1.5 rounded-full bg-brick"
          style={{ animationDuration: "7s", animationDelay: "1.2s" }}
        />

        {/* main arch photo with double frame + keystone */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[3rem] ring-1 ring-line-strong shadow-[0_30px_80px_rgba(42,32,20,0.25)]">
          <Image
            src={IMAGES.hero}
            alt="Grand banquet hall at Orbal Shadi Hall"
            fill
            priority
            sizes="440px"
            className="anim-zoom object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-t-full rounded-b-[2.5rem] border border-gold/50"
          />
          <div
            aria-hidden="true"
            className="absolute -top-3.5 left-1/2 flex h-8 w-8 -translate-x-1/2 rotate-45 items-center justify-center rounded-lg border border-gold-soft bg-ink shadow-md"
          >
            <span className="-rotate-45 font-display text-base italic leading-none text-gold-deep">
              O
            </span>
          </div>
        </div>

        {/* scalloped bunting garland */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-8 flex items-start justify-between px-2"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={`h-0 w-0 border-l-[7px] border-r-[7px] border-t-[11px] border-l-transparent border-r-transparent ${
                i % 2 ? "border-t-gold" : "border-t-brick"
              }`}
            />
          ))}
        </div>

        {/* floating amenity chips */}
        <div
          className="anim-float absolute -left-6 top-14 rounded-full border border-line-strong bg-ink/85 px-4 py-2.5 shadow-[0_10px_30px_rgba(42,32,20,0.12)] backdrop-blur-md"
          style={{ animationDuration: "6.5s" }}
        >
          <span className="flex items-center gap-2 text-xs font-semibold text-ivory">
            <StarFour size={13} weight="fill" className="text-gold" />
            In-house decor
          </span>
        </div>
        <div
          className="anim-float absolute -right-5 bottom-32 rounded-full border border-line-strong bg-ink/85 px-4 py-2.5 shadow-[0_10px_30px_rgba(42,32,20,0.12)] backdrop-blur-md"
          style={{ animationDuration: "7.5s", animationDelay: "0.8s" }}
        >
          <span className="flex items-center gap-2 text-xs font-semibold text-ivory">
            <span className="h-1.5 w-1.5 rounded-full bg-brick" />
            Valet parking
          </span>
        </div>

        {/* rotating welcome ring */}
        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2">
          <div className="relative h-36 w-36 sm:h-40 sm:w-40">
            <svg
              viewBox="0 0 200 200"
              aria-hidden="true"
              className="anim-spin-slow absolute inset-0 h-full w-full"
              style={{ transformOrigin: "50% 50%" }}
            >
              <defs>
                <path
                  id="orbal-ring"
                  d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
                />
              </defs>
              <text
                fill="var(--color-gold-deep)"
                fontSize="12"
                letterSpacing="2"
                fontWeight="600"
              >
                <textPath href="#orbal-ring" textAnchor="middle" startOffset="50%">
                  ORBAL SHADI HALL • THE ART OF THE WELCOME •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-brick text-center shadow-[0_18px_45px_rgba(165,73,63,0.45)]">
              <span className="font-nastaliq text-2xl leading-none text-paper">
                {WELCOME.urdu}
              </span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.28em] text-paper/85">
                Welcome
              </span>
            </div>
          </div>
        </div>

        {/* vertical nastaliq badge */}
        <div className="absolute -left-12 bottom-24 origin-bottom-left rotate-90 rounded-full border border-line-strong bg-ink/85 px-4 py-2.5 backdrop-blur-md">
          <span className="font-nastaliq text-lg leading-none text-brick">
            {WELCOME.pashto}
          </span>
        </div>
      </div>
    </div>
  );
}
