import { Star, ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { REVIEWS } from "@/lib/site";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.74-2.1-6.68-4.93H1.3v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.32 14.31a7.19 7.19 0 0 1 0-4.62v-3.1H1.3a12 12 0 0 0 0 10.82l4.02-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.76c1.76 0 3.35.6 4.6 1.8l3.45-3.45A11.98 11.98 0 0 0 1.3 6.59l4.02 3.1C6.26 6.86 8.89 4.76 12 4.76Z"
      />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ReviewCard({
  review,
  index,
  className,
}: {
  review: (typeof REVIEWS)[number];
  index: number;
  className?: string;
}) {
  const dark = index === 0;
  return (
    <figure
      className={`flex flex-col break-inside-avoid rounded-[1.75rem] border p-7 transition-colors duration-500 ${
        dark
          ? "border-brick bg-brick text-paper shadow-[0_24px_60px_rgba(165,73,63,0.35)]"
          : "border-line-strong bg-ink-2 hover:border-gold/50"
      } ${className ?? ""}`}
    >
      <figcaption className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm italic ${
            dark ? "bg-paper/15 text-paper" : "bg-ink text-gold-deep ring-1 ring-line-strong"
          }`}
        >
          {initials(review.name)}
        </span>
        <div className="min-w-0">
          <p className={`truncate text-sm font-semibold ${dark ? "text-paper" : "text-ivory"}`}>
            {review.name}
          </p>
          <p className={`truncate text-[11px] ${dark ? "text-paper/75" : "text-taupe"}`}>
            {review.meta} &middot; {review.time}
          </p>
        </div>
        <GoogleG className="ml-auto h-5 w-5 shrink-0" />
      </figcaption>

      <div
        className={`mt-4 flex gap-1 ${dark ? "text-gold-soft" : "text-gold-deep"}`}
        aria-label="5 out of 5 stars"
      >
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} size={13} weight="fill" />
        ))}
      </div>

      <blockquote
        className={`mt-4 flex-1 font-display text-[16px] italic leading-relaxed ${
          dark ? "text-paper/95" : "text-ivory-dim"
        }`}
      >
        &ldquo;{review.quote}&rdquo;
      </blockquote>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink-2/50 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full border border-gold/15"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
                <Star size={13} weight="fill" className="text-gold" />
                Guest reviews
              </p>
              <h2 className="mt-3 max-w-xl font-display text-4xl font-normal leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-[3.4rem]">
                Kind words, <em className="text-brick">straight from Google.</em>
              </h2>
            </div>
            <div className="flex w-fit items-center gap-2 rounded-full border border-line-strong bg-ink-2/80 px-4 py-2 text-xs font-semibold text-ivory-dim shadow-[0_6px_20px_rgba(42,32,20,0.06)]">
              <GoogleG className="h-4 w-4" />
              Google reviews
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* mobile swipe carousel */}
          <div className="mt-10 sm:hidden">
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {REVIEWS.map((r, i) => (
                <ReviewCard key={i} review={r} index={i} className="w-[82vw] max-w-sm shrink-0 snap-start" />
              ))}
            </div>
            <p className="mt-3 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe">
              <ArrowLeft size={12} weight="bold" />
              Swipe for more
              <ArrowRight size={12} weight="bold" />
            </p>
          </div>

          {/* desktop masonry */}
          <div className="mt-14 hidden gap-4 sm:block sm:columns-2 lg:columns-3">
            {REVIEWS.map((r, i) => (
              <ReviewCard key={i} review={r} index={i} className="mb-4" />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
