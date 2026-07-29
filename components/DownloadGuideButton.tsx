"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * DownloadGuideButton — ComfortLifeUS
 *
 * Generalized to take eventSlug + locationSlug and call
 * /api/guides/[eventSlug]/[locationSlug] — works for any event's
 * locations (World Cup cities, US Open venues, whatever's next).
 */

export default function DownloadGuideButton({
  eventSlug,
  locationSlug,
}: {
  eventSlug?: string;
  locationSlug?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleDownload() {
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`/api/guides/${eventSlug}/${locationSlug}`);
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          res.status === 403
            ? "Purchase this guide to download it."
            : data.error ?? "Something went wrong."
        );
        return;
      }

      window.open(data.url, "_blank");
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again.");
    }
  }

  return (
    <div>
      <motion.button
        onClick={handleDownload}
        disabled={status === "loading"}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="rounded border border-white/25 px-6 py-3 font-mono text-xs tracking-widest text-white/90 transition-colors hover:border-white/60 disabled:opacity-50"
      >
        {status === "loading" ? "PREPARING GUIDE…" : "DOWNLOAD PDF GUIDE"}
      </motion.button>

      {status === "error" && (
        <p className="mt-2 text-sm text-[#E8002D]">{errorMsg}</p>
      )}
    </div>
  );
}
