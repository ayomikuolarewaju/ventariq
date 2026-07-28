// lib/supabase.ts
//
// Replaces your current lib/supabase.ts. Use this everywhere you were
// using the old `supabase` client in "use client" components (Login,
// PurchaseButton, IntakeForm, etc). Public server-rendered reads that
// don't need a session (cities, products) can keep using this too.

import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
