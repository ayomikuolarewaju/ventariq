// components/PlanDetailLayout.tsx
"use client";

import { motion } from "framer-motion";
import PurchaseButton from "@/components/PurchaseButton";

/**
 * PlanDetailLayout — ComfortLifeUS
 *
 * Shared shell for the world-cup/* product detail pages (match-day-plan,
 * family-muslim-plan, group-concierge). Keeps them visually identical
 * and means a future 4th plan is just a content object, not a new page
 * layout to design.
 */

type PlanDetailProps = {
  eyebrow: string;
  title: string;
  description: string;
  sku: string;
  features: string[];
};

export default function PlanDetailLayout({
  eyebrow,
  title,
  description,
  sku,
  features,
}: PlanDetailProps) {
  return (
    <main className="container py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-xs tracking-[0.3em] text-[#9DB2FF]">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-6xl leading-[0.95] tracking-wide">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-xl text-blue-200">{description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 max-w-xl rounded-xl bg-[#142050] p-8"
      >
        <p className="font-mono text-xs tracking-widest text-[#F5B301]">
          WHAT&apos;S INCLUDED
        </p>
        <ul className="mt-5 space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-white/80">
              <span className="mt-0.5 text-[#F5B301]">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="relative my-7">
          <div
            aria-hidden
            className="absolute -left-3 top-0 h-5 w-5 -translate-y-1/2 rounded-full bg-[#0D1B4B]"
          />
          <div
            aria-hidden
            className="absolute -right-3 top-0 h-5 w-5 -translate-y-1/2 rounded-full bg-[#0D1B4B]"
          />
          <div className="border-t border-dashed border-white/20" />
        </div>

        <PurchaseButton sku={sku} />
      </motion.div>
    </main>
  );
}
