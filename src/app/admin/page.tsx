"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { DB, supabase } from "@/lib/supabase";
import { SITE } from "@/lib/site";
import {
  SignOut,
  WhatsappLogo,
  ArrowLeft,
  ArrowCounterClockwise,
} from "@phosphor-icons/react/dist/ssr";

type Booking = {
  id: string;
  name: string;
  phone: string;
  guest_count: string | null;
  event_type: string;
  date: string;
  status: string;
  advance_paid: boolean;
  full_paid: boolean;
  created_at: string;
};

const inputCls =
  "w-full rounded-xl border border-line-strong bg-ink-2/70 px-4 py-3.5 text-base text-ivory placeholder:text-taupe/60 transition-colors duration-300 focus:border-gold focus:outline-none";

const types: { value: string; label: string }[] = [
  { value: "requested", label: "Requested" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase()
      .auth.getSession()
      .then(({ data }) => {
        setSession(data.session);
        setLoadingAuth(false);
      });
    const {
      data: { subscription },
    } = supabase().auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoadingAuth(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    loadBookings();
  }, [session]);

  async function loadBookings() {
    setBusy(true);
    const { data, error } = await supabase()
      .from(DB.bookings)
      .select("*")
      .order("date", { ascending: true });
    setBusy(false);
    if (error) return;
    setBookings((data ?? []) as Booking[]);
  }

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setAuthBusy(true);
    setAuthError(null);
    const { error } = await supabase().auth.signInWithPassword({ email, password });
    setAuthBusy(false);
    if (error) setAuthError("Sign-in failed. Check your email or password.");
  }

  async function signOut() {
    await supabase().auth.signOut();
    setSession(null);
  }

  async function update(id: string, patch: Partial<Booking>) {
    await supabase().from(DB.bookings).update(patch).eq("id", id);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    );
  }

  if (loadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-ivory">
        Loading…
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-5 py-16">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-taupe hover:text-gold"
          >
            <ArrowLeft size={16} /> Back to site
          </Link>
          <div className="rounded-3xl border border-line-strong bg-ink p-8 ring-1 ring-gold/25">
            <h1 className="font-display text-3xl italic text-ivory">
              Admin
            </h1>
            <p className="mt-2 text-sm text-taupe">
              Sign in to view and manage bookings.
            </p>
            <form onSubmit={signIn} className="mt-7 space-y-4" noValidate>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-ivory-dim">
                  Email
                </span>
                <input
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  placeholder="admin@orbal.pk"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-ivory-dim">
                  Password
                </span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                  placeholder="••••••••"
                />
              </label>
              {authError && (
                <p className="text-sm text-brick">{authError}</p>
              )}
              <button
                type="submit"
                disabled={authBusy}
                className="w-full rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-on-gold transition-all duration-300 hover:bg-gold-soft disabled:opacity-70"
              >
                {authBusy ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-14 text-ivory sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
              {SITE.name}
            </p>
            <h1 className="mt-1 font-display text-3xl italic sm:text-4xl">
              Bookings
            </h1>
            <p className="mt-1 text-sm text-taupe">
              {bookings.length} request{bookings.length === 1 ? "" : "s"} —{" "}
              {bookings.filter((b) => b.status !== "cancelled").length} active
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadBookings}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ivory transition-colors hover:border-gold hover:text-gold-deep"
            >
              <ArrowCounterClockwise size={14} /> Refresh
            </button>
            <Link
              href="/"
              className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-taupe transition-colors hover:border-gold hover:text-gold-deep"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-taupe transition-colors hover:border-gold hover:text-gold-deep"
            >
              <SignOut size={16} /> Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-line-strong bg-ink-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-taupe">
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Event</th>
                  <th className="px-5 py-4 font-semibold">Guests</th>
                  <th className="px-5 py-4 font-semibold">Customer</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Advance</th>
                  <th className="px-5 py-4 font-semibold">Full</th>
                </tr>
              </thead>
              <tbody>
                {busy && bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-taupe">
                      Loading bookings…
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-taupe">
                      No bookings yet. Share the site link to start collecting
                      requests.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b border-line align-top last:border-0"
                    >
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-gold-deep">
                        {new Date(`${b.date}T00:00:00`).toLocaleDateString(
                          "en-GB",
                          { weekday: "short", day: "numeric", month: "short", year: "numeric" },
                        )}
                      </td>
                      <td className="px-5 py-4">{b.event_type}</td>
                      <td className="px-5 py-4">{b.guest_count ?? "—"}</td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-ivory">{b.name}</p>
                        <div className="mt-0.5 flex items-center gap-1.5 text-sm text-taupe">
                          {b.phone}
                          <a
                            href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
                              `Assalam o Alaikum ${b.name}, regarding your booking (${b.event_type}) at ${SITE.name}.`,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold-deep hover:text-gold"
                            aria-label={`WhatsApp ${b.name}`}
                          >
                            <WhatsappLogo size={13} weight="fill" />
                          </a>
                        </div>
                        <p className="text-xs text-taupe/70">
                          {new Date(b.created_at).toLocaleString("en-GB")}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {types.map((t) => (
                            <button
                              key={t.value}
                              type="button"
                              onClick={() => update(b.id, { status: t.value })}
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                                b.status === t.value
                                  ? t.value === "cancelled"
                                    ? "bg-brick/15 text-brick"
                                    : t.value === "confirmed"
                                      ? "bg-gold text-on-gold"
                                      : "bg-ink-3 text-ivory"
                                  : "bg-transparent text-taupe hover:text-ivory"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => update(b.id, { advance_paid: !b.advance_paid })}
                          aria-pressed={b.advance_paid}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                            b.advance_paid
                              ? "bg-gold text-on-gold"
                              : "border border-line-strong text-taupe hover:border-gold hover:text-gold-deep"
                          }`}
                        >
                          {b.advance_paid ? "Recorded" : "Record"}
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => update(b.id, { full_paid: !b.full_paid })}
                          aria-pressed={b.full_paid}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                            b.full_paid
                              ? "bg-gold text-on-gold"
                              : "border border-line-strong text-taupe hover:border-gold hover:text-gold-deep"
                          }`}
                        >
                          {b.full_paid ? "Paid" : "Mark paid"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
