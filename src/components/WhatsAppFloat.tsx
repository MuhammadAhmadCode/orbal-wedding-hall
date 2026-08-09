"use client";

import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { WHATSAPP_LINK } from "@/lib/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
        "Assalam o Alaikum, I have a question about Orbal Shadi Hall.",
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Orbal Shadi Hall on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-ink-2 px-4 py-2 text-sm font-medium text-ivory opacity-0 ring-1 ring-line-strong shadow-[0_8px_24px_rgba(42,32,20,0.14)] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-transform duration-300 group-hover:scale-105 active:scale-95">
        <WhatsappLogo size={28} weight="fill" />
      </span>
    </a>
  );
}
