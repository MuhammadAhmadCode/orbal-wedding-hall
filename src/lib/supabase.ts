"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Orbal's tables are namespaced (orbal_*) so its data stays fully isolated
// from every other client's data in this Supabase project.
export const DB = {
  bookings: "orbal_bookings",
  bookedDates: "orbal_booked_dates",
} as const;

let client: SupabaseClient | null = null;

export function supabase() {
  if (!client) {
    client = createClient(url, anonKey);
  }
  return client;
}
