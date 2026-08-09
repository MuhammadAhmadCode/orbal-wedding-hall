import {
  MapPin,
  Phone,
  Clock,
  InstagramLogo,
  FacebookLogo,
  EnvelopeSimple,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { SITE, NAV_LINKS, WELCOME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line-strong bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1.1fr]">
          <div>
            <p className="font-display text-2xl italic tracking-wide text-ivory">
              Orbal
              <span className="ml-2 font-normal text-gold-deep">Shadi Hall</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-taupe">
              A grand wedding and event venue in Pakistan for up to 1,000
              guests, with separate halls, fine catering and valet parking.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ivory-dim transition-colors duration-300 hover:border-brick hover:text-brick"
              >
                <InstagramLogo size={18} weight="light" />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ivory-dim transition-colors duration-300 hover:border-brick hover:text-brick"
              >
                <FacebookLogo size={18} weight="light" />
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center gap-2 rounded-full border border-gold px-4 text-sm font-medium text-gold-deep transition-colors duration-300 hover:bg-gold hover:text-on-gold"
              >
                <MapPin size={16} weight="light" />
                Google Maps
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-taupe">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ivory-dim transition-colors duration-300 hover:text-brick"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-taupe">
              Contact
            </p>
            <ul className="mt-5 space-y-4 text-sm text-ivory-dim">
              <li className="flex items-start gap-3">
                <MapPin size={18} weight="light" className="mt-0.5 shrink-0 text-gold-deep" />
                <span>{SITE.addressLine}</span>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeSimple size={18} weight="light" className="shrink-0 text-gold-deep" />
                <a href={`mailto:${SITE.email}`} className="hover:text-brick">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} weight="light" className="shrink-0 text-gold-deep" />
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-brick">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} weight="light" className="mt-0.5 shrink-0 text-gold-deep" />
                <span>{SITE.hours}</span>
              </li>
              <li>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gold-deep transition-colors hover:text-brick"
                >
                  Get directions
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-line-strong pt-8 sm:flex-row">
          <p className="text-sm text-taupe">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-nastaliq text-xl leading-none text-brick">
              {WELCOME.pashto}
            </span>
            <span className="h-4 w-px bg-line-strong" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
              Welcome, always.
            </span>
          </div>
          <p className="text-sm text-taupe">{SITE.city}</p>
        </div>
      </div>
    </footer>
  );
}
