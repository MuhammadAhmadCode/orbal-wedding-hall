import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { SITE, WHATSAPP_LINK, WELCOME } from "@/lib/site";

export default function ContactCta() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(70% 90% at 50% 100%, rgba(168,118,45,0.16), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="font-nastaliq text-4xl leading-[1.6] text-brick">
            {WELCOME.urdu}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
            {SITE.tagline}
          </p>
          <h2 className="mt-4 font-display text-5xl font-normal leading-[1.02] tracking-tight text-ivory sm:text-6xl">
            Your date is waiting.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ivory-dim sm:text-lg">
            Check availability for your wedding or event and lock your date in
            minutes, not weeks.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#availability"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold px-8 text-base font-semibold text-on-gold transition-all duration-500 hover:bg-gold-soft active:scale-[0.98]"
            >
              Check Availability
            </a>
            <a
              href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
                "Assalam o Alaikum, I would like to ask about Orbal Shadi Hall.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-gold px-8 text-base font-semibold text-gold-deep transition-all duration-500 hover:bg-gold hover:text-on-gold active:scale-[0.98]"
            >
              <WhatsappLogo size={20} weight="fill" />
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
