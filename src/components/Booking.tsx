"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CaretLeft,
  CaretRight,
  WhatsappLogo,
  CheckCircle,
  Phone,
  Calendar,
  HandCoins,
  Bank,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { SITE, WHATSAPP_LINK } from "@/lib/site";
import { DB, supabase } from "@/lib/supabase";

/* ---------- helpers ---------- */

function startOfToday() {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

function dayKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function prettyDate(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Fallback only used if the database is unreachable, so the calendar never
// shows a broken/empty page. Real availability comes from Supabase.
function fallbackBooked(y: number, m: number, d: number) {
  const dow = new Date(y, m, d).getDay();
  const weekend = dow === 0 || dow === 5 || dow === 6;
  let seed = y * 10000 + (m + 1) * 100 + d;
  seed = (seed ^ ((seed << 13) & 0xffffffff)) >>> 0;
  seed = (seed ^ ((seed * 0x9e3779b9) >>> 1)) >>> 0;
  const r = (seed & 0xffff) / 0xffff;
  return r < (weekend ? 0.4 : 0.2);
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function bookingRef(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  let n = ((y % 100) * 31 + m) * 31 + d;
  n = (n * 9301 + 49297) % 233280;
  return `ORB-${1000 + (n % 9000)}`;
}

/* ---------- calendar board ---------- */

function CalendarBoard({
  date,
  onChange,
  bookedSet,
  availError,
}: {
  date: string;
  onChange: (key: string) => void;
  bookedSet: Set<string>;
  availError: boolean;
}) {
  const today = startOfToday();
  const [monthOffset, setMonthOffset] = useState(0);

  const view = useMemo(
    () => new Date(today.getFullYear(), today.getMonth() + monthOffset, 1),
    [monthOffset, today],
  );

  const y = view.getFullYear();
  const m = view.getMonth();
  const firstDow = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const monthLabel = view.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDow }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const canGoBack = monthOffset > 0;

  return (
    <div className="rounded-[2rem] bg-ink-2 p-2 ring-1 ring-line-strong">
      <div className="rounded-[calc(2rem-0.5rem)] bg-ink p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl italic text-ivory">
            {monthLabel}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMonthOffset((o) => Math.max(0, o - 1))}
              disabled={!canGoBack}
              aria-label="Previous month"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ivory transition-all duration-300 hover:border-gold hover:text-gold-deep disabled:cursor-not-allowed disabled:opacity-30"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => setMonthOffset((o) => o + 1)}
              aria-label="Next month"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ivory transition-all duration-300 hover:border-gold hover:text-gold-deep"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1.5 text-center">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="pb-1 text-[11px] font-semibold uppercase tracking-wider text-taupe"
            >
              {w}
            </div>
          ))}
          {cells.map((d, i) => {
            if (d === null) {
              return <div key={`blank-${i}`} aria-hidden="true" />;
            }
            const key = dayKey(y, m, d);
            const todayKey = dayKey(
              today.getFullYear(),
              today.getMonth(),
              today.getDate(),
            );
            const isToday = key === todayKey;
            const isPast = new Date(y, m, d) < today;
            const booked =
              !isPast &&
              (availError ? fallbackBooked(y, m, d) : bookedSet.has(key));
            const selected = key === date;
            const available = !isPast && !booked;

            let cls =
              "relative flex aspect-square w-full items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ";
            if (selected) {
              cls += "bg-gold font-semibold text-on-gold";
            } else if (booked) {
              cls += "cursor-not-allowed text-taupe/50 line-through decoration-taupe/40";
            } else if (isToday) {
              cls += "text-ivory ring-1 ring-inset ring-gold/60 hover:bg-gold/10";
            } else if (available) {
              cls += "text-ivory hover:bg-gold/15";
            } else {
              cls += "text-line-strong";
            }

            return available ? (
              <button
                key={key}
                type="button"
                onClick={() => onChange(key)}
                title={prettyDate(key)}
                className={`${cls} active:scale-90`}
              >
                {d}
              </button>
            ) : (
              <div
                key={key}
                title={booked ? `${prettyDate(key)} - booked` : prettyDate(key)}
                aria-disabled={!available}
                className={cls}
              >
                {d}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-[13px] text-taupe">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gold" />
            Available
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brick" />
            Booked
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-gold/60" />
            Today
          </span>
          <span className="ml-auto hidden text-xs text-taupe sm:inline">
            {freeCountLabel(freeThisMonth(view, today, bookedSet, availError))}
          </span>
        </div>
      </div>
    </div>
  );
}

function freeThisMonth(
  view: Date,
  today: Date,
  bookedSet: Set<string>,
  availError: boolean,
) {
  let count = 0;
  const y = view.getFullYear();
  const m = view.getMonth();
  const days = new Date(y, m + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    const dt = new Date(y, m, d);
    const key = dayKey(y, m, d);
    const booked = availError ? fallbackBooked(y, m, d) : bookedSet.has(key);
    if (dt >= today && !booked) count++;
  }
  return count;
}

function freeCountLabel(n: number) {
  return `${n} free ${n === 1 ? "day" : "days"} this month`;
}

/* ---------- payment row ---------- */

function PaymentRow({
  icon: Icon,
  title,
  subtitle,
  done,
  action,
  onToggle,
  accent,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  done: boolean;
  action: string;
  onToggle: () => void;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border p-4 transition-colors duration-300 ${
        done
          ? "border-gold/40 bg-gold/10"
          : accent
            ? "border-gold/25 bg-ink-3/50"
            : "border-line-strong bg-ink-2"
      }`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <span
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            done ? "bg-gold text-on-gold" : "bg-ink-3 text-gold-deep"
          }`}
        >
          <Icon size={20} weight={done ? "fill" : "light"} />
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-semibold text-ivory">
            {title}
            {done && (
              <span className="anim-pop text-gold">
                <CheckCircle size={15} weight="fill" />
              </span>
            )}
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-taupe">
            {subtitle}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={done}
        className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 active:scale-95 ${
          done
            ? "border border-gold/40 text-gold-deep"
            : "bg-gold text-on-gold hover:bg-gold-soft"
        }`}
      >
        {done ? "Edit" : action}
      </button>
    </div>
  );
}

/* ---------- booking form + confirmation ---------- */

type FormValues = {
  name: string;
  phone: string;
  guests: string;
  eventType: string;
};

const GUEST_OPTIONS = ["100 - 250", "250 - 500", "500 - 750", "750 - 1,000"];
const EVENT_OPTIONS = [
  "Walima",
  "Barat / Shaadi",
  "Mehndi",
  "Engagement",
  "Corporate Event",
  "Birthday / Party",
];

const inputCls =
  "w-full rounded-xl border border-line-strong bg-ink-2/70 px-4 py-3.5 text-base text-ivory placeholder:text-taupe/60 transition-colors duration-300 focus:border-gold focus:outline-none";

function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ivory-dim">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-[13px] text-brick">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-taupe">{hint}</span>
      ) : null}
    </label>
  );
}

function buildMessage(values: {
  name: string;
  phone: string;
  guests: string;
  eventType: string;
  date: string;
  ref: string;
}) {
  const lines = [
    "Assalam o Alaikum, I would like to book a date at Orbal Shadi Hall.",
    `Booking reference: ${values.ref}`,
    `Event date: ${prettyDate(values.date)}`,
    `Event type: ${values.eventType}`,
    `Guest count: ${values.guests}`,
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    "",
    "Kindly confirm the advance to lock this date.",
  ];
  return lines.join("\n");
}

function BookingForm({
  date,
  onDateChange,
  bookedSet,
  availError,
  onBooked,
}: {
  date: string;
  onDateChange: (v: string) => void;
  bookedSet: Set<string>;
  availError: boolean;
  onBooked: (key: string) => void;
}) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    phone: "",
    guests: GUEST_OPTIONS[1],
    eventType: EVENT_OPTIONS[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [booking, setBooking] = useState<null | {
    ref: string;
    link: string;
  }>(null);
  const [advance, setAdvance] = useState(false);
  const [full, setFull] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (k: keyof FormValues) => (v: string) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const ref = date ? bookingRef(date) : null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const errs: Record<string, string> = {};
    if (!values.name.trim()) errs.name = "Please add your name.";
    const digits = values.phone.replace(/\D/g, "").replace(/^92/, "");
    if (digits.length < 10) errs.phone = "Enter a valid phone number.";
    if (!date) {
      errs.date = "Pick a date from the calendar.";
    } else {
      const [y, mo, d] = date.split("-").map(Number);
      const taken = availError ? fallbackBooked(y, mo - 1, d) : bookedSet.has(date);
      if (taken) {
        errs.date = "That date is already booked — please pick another.";
      }
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0 || !ref) return;

    setSubmitting(true);
    const { error } = await supabase().from(DB.bookings).insert({
      name: values.name.trim(),
      phone: values.phone.trim(),
      guest_count: values.guests,
      event_type: values.eventType,
      date,
    });
    setSubmitting(false);

    if (error) {
      setSubmitError(
        "We couldn't save your request right now. Please try again or call us directly.",
      );
      return;
    }

    onBooked(date);
    const msg = buildMessage({ ...values, date, ref });
    const link = `${WHATSAPP_LINK}?text=${encodeURIComponent(msg)}`;
    setBooking({ ref, link });
    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (booking) {
    return (
      <div className="flex h-full flex-col rounded-[20px] bg-ink-2 p-2 ring-1 ring-gold/30">
        <div className="flex flex-1 flex-col rounded-[calc(2rem-0.5rem)] bg-ink p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
                Booking request
              </p>
              <h3 className="mt-2 font-display text-3xl italic text-ivory">
                {date ? prettyDate(date).split(", ").slice(1).join(", ") : ""}
              </h3>
            </div>
            <span className="font-mono text-sm text-gold-deep">{booking.ref}</span>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-line-strong bg-ink-2 p-5 text-sm">
            <div>
              <dt className="text-xs text-taupe">Event type</dt>
              <dd className="mt-0.5 font-medium text-ivory">
                {values.eventType}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-taupe">Guests</dt>
              <dd className="mt-0.5 font-medium text-ivory">{values.guests}</dd>
            </div>
            <div>
              <dt className="text-xs text-taupe">Name</dt>
              <dd className="mt-0.5 truncate font-medium text-ivory">
                {values.name}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-taupe">Phone</dt>
              <dd className="mt-0.5 font-medium text-ivory">
                {values.phone}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-taupe">
              Payment status
            </p>            <div className="mt-3 space-y-3">
              <PaymentRow
                icon={HandCoins}
                title="Advance, to lock this date"
                subtitle="A small advance confirms and holds your booking."
                done={advance}
                action="Record advance"
                onToggle={() => setAdvance((v) => !v)}
                accent
              />
              <PaymentRow
                icon={Bank}
                title="Full payment"
                subtitle="Cleared closer to the event, on your confirmed date."
                done={full}
                action="Mark paid"
                onToggle={() => setFull((v) => !v)}
              />
            </div>
          </div>

          <div className="mt-7 grid gap-3">
            <a
              href={booking.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-4 text-base font-semibold text-on-gold transition-colors duration-300 hover:bg-gold-soft"
            >
              <WhatsappLogo size={20} weight="fill" />
              Send via WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                setBooking(null);
                setAdvance(false);
                setFull(false);
                setErrors({});
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-ivory transition-colors duration-300 hover:border-gold hover:text-gold-deep"
            >
              Start another booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="flex h-full flex-col rounded-[20px] bg-ink-2 p-2 ring-1 ring-line-strong"
    >
      <div className="flex flex-1 flex-col rounded-[calc(2rem-0.5rem)] bg-ink p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Full name" error={errors.name}>
              <input
                type="text"
                value={values.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder="e.g. Bilal Ahmed"
                autoComplete="name"
                className={inputCls}
              />
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field
              label="Phone number"
              error={errors.phone}
              hint="We'll confirm on WhatsApp."
            >
              <div className="relative">
                <input
                  type="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                  placeholder="321 1234567"
                  autoComplete="tel"
                  className={`${inputCls} pl-16`}
                />
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-base text-taupe">
                  +92
                </span>
              </div>
            </Field>
          </div>

          <Field label="Guest count">
            <select
              value={values.guests}
              onChange={(e) => set("guests")(e.target.value)}
              className={`${inputCls} ${BookingArrow}`}
            >
              {GUEST_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g} guests
                </option>
              ))}
            </select>
          </Field>

          <Field label="Event type">
            <select
              value={values.eventType}
              onChange={(e) => set("eventType")(e.target.value)}
              className={`${inputCls} ${BookingArrow}`}
            >
              {EVENT_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </Field>

          <div className="sm:col-span-2">
            <Field label="Event date" error={errors.date}>
              <div className="grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  type="date"
                  value={date}
                  min={dayKey(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                  )}
                  onChange={(e) => {
                    onDateChange(e.target.value);
                    setErrors((prev) => ({ ...prev, date: "" }));
                  }}
                  className={inputCls}
                />
                <span className="flex items-center gap-2 whitespace-nowrap text-sm text-taupe">
                  <Calendar size={16} className="text-gold" />
                  <span className="hidden sm:inline">Pick a date</span>
                </span>
              </div>
              <span className="mt-1.5 block text-xs text-taupe">
                {date
                  ? prettyDate(date)
                  : "Tap the calendar on the left, or pick the date here."}
              </span>
            </Field>
          </div>
        </div>

        {submitError && (
          <p className="mt-6 rounded-xl border border-brick/40 bg-brick/10 px-4 py-3 text-sm leading-relaxed text-brick">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-4 text-base font-semibold text-on-gold transition-all duration-300 hover:bg-gold-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Calendar size={20} weight="light" />
          {submitting ? "Saving…" : "Submit Booking Request"}
        </button>

        <p className="mt-4 text-center text-[13px] leading-relaxed text-taupe">
          A small advance locks your date; the balance is settled closer to the
          event. Prefer to talk?{" "}
          <a href={`tel:${SITE.phoneTel}`} className="text-gold-deep hover:underline">
            Call {SITE.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}

const BookingArrow =
  "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%3E%3Cpath%20d%3D%22M3%205l4%204%204-4%22%20stroke%3D%22%237c6a51%22%20stroke-width%3D%222%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10";

/* ---------- section ---------- */

export default function Booking() {
  const [date, setDate] = useState("");
  const [bookedSet, setBookedSet] = useState<Set<string>>(() => new Set());
  const [availError, setAvailError] = useState(false);

  useEffect(() => {
    let alive = true;
    supabase()
      .from(DB.bookedDates)
      .select("booked_date")
      .then(({ data, error }) => {
        if (!alive) return;
        if (error) {
          setAvailError(true);
          return;
        }
        setBookedSet(new Set((data ?? []).map((r) => r.booked_date)));
      });
    return () => {
      alive = false;
    };
  }, []);

  const onBooked = (key: string) =>
    setBookedSet((prev) => new Set(prev).add(key));

  return (
    <section
      id="availability"
      className="relative overflow-hidden border-t border-line bg-ink-2/40 py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(168,118,45,0.10), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
              Availability &amp; Booking
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ivory sm:text-5xl lg:text-[3.4rem]">
              Reserve your date in minutes.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-taupe sm:text-lg">
              Pick a free date, submit your request, and secure it with a small
              advance. The balance is settled closer to your event.
              {` No more double-booking.`}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <CalendarBoard
              date={date}
              onChange={setDate}
              bookedSet={bookedSet}
              availError={availError}
            />
            <div className="mt-4 rounded-[1.75rem] bg-ink-2 p-6 ring-1 ring-line-strong">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
                How booking works
              </p>
              <ol className="mt-4 space-y-3 text-sm text-ivory-dim">
                {[
                  "Choose a free date from the calendar.",
                  "Submit your booking request in seconds.",
                  "The advance locks your date on our records.",
                  "Full payment is cleared closer to the event.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 text-xs font-semibold text-gold-deep">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-xs leading-relaxed text-taupe">
                Availability is a live preview. Our team confirms the final date
                and records the payment on WhatsApp.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <BookingForm
              date={date}
              onDateChange={setDate}
              bookedSet={bookedSet}
              availError={availError}
              onBooked={onBooked}
            />
          </Reveal>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center text-sm text-taupe sm:flex-row sm:justify-center sm:gap-6">
          <span className="flex items-center gap-2">
            <Phone size={16} className="text-gold-deep" />
            <a href={`tel:${SITE.phoneTel}`} className="hover:text-gold-deep">
              {SITE.phoneDisplay}
            </a>
          </span>
          <span className="hidden text-gold sm:inline">&middot;</span>
          <span>{SITE.hours}</span>
        </div>
      </div>
    </section>
  );
}
