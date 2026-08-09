import Image from "next/image";
import {
  Users,
  Buildings,
  Car,
  ForkKnife,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { IMAGES, WELCOME } from "@/lib/site";

const FEATURES = [
  {
    icon: Users,
    title: "Up to 1,000 guests",
    text: "A venue that comfortably holds large families and big guest lists.",
  },
  {
    icon: Buildings,
    title: "Separate grand halls",
    text: "Dedicated men's and women's halls, each with its own entrance and lobby.",
  },
  {
    icon: Car,
    title: "Valet & free parking",
    text: "Ample attended parking so every guest arrives and leaves with ease.",
  },
  {
    icon: ForkKnife,
    title: "In-house catering",
    text: "Pakistani, continental and custom menus built around your occasion.",
  },
];

export default function Venue() {
  return (
    <section id="hall" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <Reveal>
              <h2 className="max-w-lg font-display text-4xl font-normal leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-[3.4rem]">
                A venue that hosts a thousand, yet feels like home.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory-dim sm:text-lg">
                Separate halls for men and women, each with its own entrance and
                lobby, together seating up to 1,000 guests. A considered layout
                keeps families close while the celebration runs effortlessly.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {FEATURES.map((feature, i) => (
                <Reveal key={feature.title} delay={0.08 + i * 0.08}>
                  <div className="group flex gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-t-full rounded-b-lg border border-gold/30 bg-gold/10 text-gold-deep transition-colors duration-500 group-hover:bg-brick group-hover:text-paper">
                      <feature.icon size={20} weight="light" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ivory">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-taupe">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="order-1 lg:order-2" y={30}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-t-full rounded-b-[1.75rem] ring-1 ring-line-strong shadow-[0_30px_80px_rgba(42,32,20,0.18)]">
                <Image
                  src={IMAGES.hallMain}
                  alt="Grand hall interior at Orbal Shadi Hall"
                  width={1200}
                  height={900}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 hidden w-44 overflow-hidden rounded-[1.25rem] ring-4 ring-ink sm:block lg:-left-8 lg:w-56">
                <Image
                  src={IMAGES.hallDetail}
                  alt="Elegant table setting detail"
                  width={600}
                  height={700}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div className="absolute -top-5 right-2 rounded-2xl border border-line-strong bg-ink-2/95 px-5 py-4 shadow-[0_14px_40px_rgba(42,32,20,0.14)] backdrop-blur-md sm:-right-4">
                <p className="font-display text-3xl italic text-gold-deep">
                  1,000+
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-taupe">
                  Guest capacity
                </p>
              </div>
              <span className="font-nastaliq absolute -right-3 bottom-8 rotate-90 origin-bottom-right text-2xl text-brick/70">
                {WELCOME.pashto}
              </span>
              <div
                className="absolute -bottom-5 -right-5 -z-10 h-40 w-40 rounded-full border border-gold/40"
                aria-hidden="true"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
