import { StarFour } from "@phosphor-icons/react/dist/ssr";
import { WELCOME } from "@/lib/site";

const ITEMS = [
  { text: WELCOME.pashto, script: "nastaliq" as const },
  { text: WELCOME.urdu, script: "nastaliq" as const },
  { text: WELCOME.english, script: "latin" as const },
];

function Track() {
  return (
    <div className="flex shrink-0 items-center">
      {[0, 1, 2, 3].map((rep) => (
        <div key={rep} className="flex items-center">
          {ITEMS.map((w, i) => (
            <span key={`${rep}-${w.text}`} className="flex items-center">
              <span
                className={
                  w.script === "nastaliq"
                    ? "font-nastaliq px-6 text-2xl leading-none sm:text-3xl"
                    : "px-6 text-sm font-semibold uppercase tracking-[0.3em] sm:text-base"
                }
              >
                {w.text}
              </span>
              {i < ITEMS.length - 1 && (
                <StarFour size={14} weight="fill" className="opacity-50" />
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-brick bg-brick py-4 text-paper"
    >
      <div className="anim-marquee flex w-max">
        <Track />
        <Track />
      </div>
    </div>
  );
}
