import { Quotes, Star } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { REVIEWS } from "@/lib/site";

export default function Testimonials() {
  return (
    <section className="relative border-t border-line bg-ink-2/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-4xl font-normal leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-[3.4rem]">
            Kind words from our hosts.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-[1.75rem] border border-line-strong bg-ink-2 p-8 transition-colors duration-500 hover:border-gold/50">
                <Quotes size={30} weight="fill" className="text-gold-deep/60" />
                <blockquote className="mt-5 flex-1 font-display text-[17px] italic leading-relaxed text-ivory-dim">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 border-t border-line pt-5">
                  <p className="text-sm font-semibold text-ivory">{t.name}</p>
                  <p className="mt-0.5 text-xs text-taupe">{t.role}</p>
                  <div
                    className="mt-3 flex gap-1 text-gold-deep"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={13} weight="fill" />
                    ))}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
