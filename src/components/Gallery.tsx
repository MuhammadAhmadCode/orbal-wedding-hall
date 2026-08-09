"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  X,
  CaretLeft,
  CaretRight,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { IMAGES, WHATSAPP_LINK } from "@/lib/site";

const RATIOS = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
];

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const photos = IMAGES.gallery;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  );
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? null : (i - 1 + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, next, prev]);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-4xl font-normal leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-[3.4rem]">
            Moments from the hall.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory-dim sm:text-lg">
            A glimpse of how Orbal dresses for a wedding, from golden hour to
            the final dance. Tap any image to view it full-screen.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="columns-2 gap-4 md:columns-3">
            {photos.map((photo, i) => (
              <figure key={photo.src} className="mb-4 break-inside-avoid sm:mb-6">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`View ${photo.caption} full-screen`}
                  className="group block w-full overflow-hidden rounded-[1.25rem] ring-1 ring-line-strong transition-colors duration-500 hover:ring-brick/50"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={900}
                    height={900}
                    className={`${RATIOS[i % RATIOS.length]} w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105`}
                  />
                </button>
                <figcaption className="mt-3 text-[13px] font-medium text-taupe">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-col items-start justify-between gap-5 rounded-[1.75rem] border border-line-strong bg-ink-2 p-7 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="font-display text-2xl italic text-ivory">
                See it in person.
              </h3>
              <p className="mt-2 text-sm text-taupe">
                Private walkthroughs available any day, morning or evening.
              </p>
            </div>
            <a
              href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
                "Assalam o Alaikum, I would like to arrange a private tour of Orbal Shadi Hall.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-gold px-6 text-sm font-semibold text-gold-deep transition-all duration-500 hover:bg-gold hover:text-on-gold active:scale-[0.98]"
            >
              <WhatsappLogo size={18} weight="fill" />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[index].caption}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="anim-fade absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-ink-2 text-ivory transition-colors duration-300 hover:border-brick hover:text-brick"
          >
            <X size={20} weight="light" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="anim-fade absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-ink-2 text-ivory transition-colors duration-300 hover:border-brick hover:text-brick sm:left-6"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="anim-fade absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-ink-2 text-ivory transition-colors duration-300 hover:border-brick hover:text-brick sm:right-6"
          >
            <CaretRight size={20} weight="bold" />
          </button>

          <figure
            key={photos[index].src}
            className="anim-fade flex max-h-full w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              const x = e.touches[0].clientX;
              (e.currentTarget as HTMLElement).dataset.tx = String(x);
            }}
            onTouchEnd={(e) => {
              const el = e.currentTarget as HTMLElement;
              const start = Number(el.dataset.tx ?? 0);
              const end = e.changedTouches[0].clientX;
              const dx = end - start;
              if (dx > 50) prev();
              else if (dx < -50) next();
            }}
          >
            <div className="relative flex max-h-[78vh] w-full items-center justify-center overflow-hidden rounded-2xl ring-1 ring-line-strong bg-ink-2">
              <Image
                src={photos[index].src}
                alt={photos[index].alt}
                width={1400}
                height={1400}
                className="max-h-[78vh] w-auto max-w-full object-contain"
              />
            </div>
            <figcaption className="mt-5 text-center">
              <p className="font-display text-lg italic text-ivory">
                {photos[index].caption}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-taupe">
                {index + 1} of {photos.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
