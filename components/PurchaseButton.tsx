"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import AuthModal from "@/components/AuthModal";

/**
 * PurchaseButton — ComfortLifeUS
 *
 * Never gates browsing. Only checks auth at the exact moment someone
 * clicks Buy — if they're not signed in, AuthModal opens; once
 * authenticated, checkout starts automatically.
 *
 * Assumes an existing /api/checkout route (proxying to your payment
 * backend) that returns { url } to redirect to. Adjust the request body
 * shape if your checkout route expects something different.
 */

export default function PurchaseButton({ sku }: { sku?: string }) {
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout() {
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

  async function handleBuyClick() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setShowAuth(true);
      return;
    }

    startCheckout();
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
        {loading ? "Starting checkout…" : "Buy Now"}
      </motion.button>

      {error && <p className="mt-2 text-sm text-[#E8002D]">{error}</p>}

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onAuthenticated={() => {
            setShowAuth(false);
            startCheckout();
          }}
        />
      )}
    </div>
  );
}
