import { CrownSimple, Star } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

const PACKAGES = [
  {
    numeral: "I",
    name: "The Mehfil",
    guests: "Intimate ceremonies · up to 300 guests",
    description:
      "A single, beautifully dressed hall for engagements, mehndis and close-family celebrations. Quietly elegant, impeccably managed.",
    includes: [
      "Single grand hall",
      "Classic decor & stage",
      "Sound system",
      "Event coordinator",
    ],
    price: "Rs 450,000",
    featured: false,
  },
  {
    numeral: "II",
    name: "The Shaadi",
    guests: "The signature celebration · up to 700 guests",
    description:
      "Our most-loved package: two halls for men and women, themed decor, screens and lighting, and a full in-house catering service.",
    includes: [
      "Twin halls & entrances",
      "Themed decor & stage",
      "LED screens & lighting",
      "In-house catering",
      "Bridal getting-ready room",
      "Dedicated event team",
    ],
    price: "Rs 850,000",
    featured: false,
  },
  {
    numeral: "III",
    name: "The Royal Orbal",
    guests: "A grand affair · up to 1,000+ guests",
    description:
      "The full venue at its finest — luxury themed decor, premium multi-course dining with live stations, and a planner from your first enquiry to the last guest.",
    includes: [
      "Entire venue",
      "Luxury themed decor",
      "Premium catering & live stations",
      "Valet & dedicated security",
      "Bridal suites",
      "Lighting, sound & LED",
      "Dedicated wedding planner",
    ],
    price: "Rs 1,350,000",
    featured: true,
  },
];

export default function Packages() {
  return (
    <section
      id="packages"
      className="relative border-t border-line bg-ink-2/50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
              The Packages
            </p>
            <h2 className="mt-4 font-display text-4xl font-normal leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-[3.4rem]">
              A menu of celebrations, priced with care.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory-dim sm:text-lg">
              Three ways to celebrate, each dressed to the occasion. Every
              package includes venue hire, decor and on-site coordination.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14" delay={0.1}>
          <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-line-strong bg-ink-2">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.numeral}
                className={`group relative grid gap-6 px-6 py-9 transition-colors duration-500 sm:px-10 sm:py-11 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-10 ${
                  pkg.featured
                    ? "border-y border-gold/25 bg-[radial-gradient(90%_120%_at_0%_0%,rgba(168,118,45,0.14),transparent_60%)]"
                    : "border-t border-line first:border-t-0"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-gold-soft via-gold to-gold-deep" />
                )}
                <span className="font-display text-5xl italic text-gold/50 transition-colors duration-500 group-hover:text-gold-deep sm:text-6xl">
                  {pkg.numeral}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-3xl font-normal text-ivory sm:text-4xl">
                      {pkg.name}
                    </h3>
                    {pkg.featured && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                        <CrownSimple size={12} weight="fill" />
                        Most Celebrated
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-taupe">
                    {pkg.guests}
                  </p>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ivory-dim">
                    {pkg.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-ink px-3 py-1.5 text-xs font-medium text-ivory-dim"
                      >
                        <Star
                          size={10}
                          weight="fill"
                          className="text-gold-deep"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:pt-1 lg:text-right">
                  <p
                    className={`font-display text-3xl italic sm:text-4xl ${
                      pkg.featured ? "text-gold-brushed" : "text-ivory"
                    }`}
                  >
                    {pkg.price}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-taupe">
                    Per event
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-[1.75rem] border border-line-strong bg-ink-2 px-7 py-7 sm:flex-row sm:items-center sm:px-9">
            <div>
              <h3 className="font-display text-2xl italic text-ivory">
                Prefer your own menu?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-taupe">
                Catering is priced per head, on your menu or ours — with live
                cooking stations on request. Prices are indicative; the final
                quote depends on guest count, menu and season.
              </p>
            </div>
            <a
              href="#availability"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-on-gold transition-all duration-500 hover:bg-gold-soft active:scale-[0.98]"
            >
              Check Availability
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
