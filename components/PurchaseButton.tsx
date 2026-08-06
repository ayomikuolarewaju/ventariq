"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * PurchaseButton — ComfortLifeUS
 *
 * No auth step at all now -- straight to Stripe. Stripe Checkout
 * collects the buyer's email itself, and the webhook already
 * creates/matches a customers row by that email, so a Supabase Auth
 * account was never actually required to fulfill an order.
 */

export default function PurchaseButton({ sku }: { sku: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleBuyClick() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku }),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error ?? "Could not start checkout.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <motion.button
        onClick={handleBuyClick}
        disabled={loading}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="rounded bg-[#E8002D] px-6 py-3 font-bold transition-shadow hover:shadow-lg hover:shadow-[#E8002D]/30 disabled:opacity-50"
      >
        {loading ? "…" : "Buy Now"}
      </motion.button>

      {error && <p className="mt-2 text-sm text-[#E8002D]">{error}</p>}
    </div>
  );
}
