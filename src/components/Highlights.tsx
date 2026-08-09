import Reveal from "./Reveal";

const ITEMS = [
  { value: "1,000+", label: "Guest capacity" },
  { value: "Two", label: "Grand halls, one venue" },
  { value: "Valet", label: "Attended parking" },
  { value: "Custom", label: "Catering menus" },
];

export default function Highlights() {
  return (
    <section className="relative border-t border-line bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 px-4 text-center lg:border-l lg:border-line lg:first:border-l-0"
              >
                <dt className="order-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
                  {item.label}
                </dt>
                <dd className="order-1 font-display text-5xl italic text-gold-brushed sm:text-6xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
