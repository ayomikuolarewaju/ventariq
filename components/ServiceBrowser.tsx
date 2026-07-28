"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PurchaseButton from "@/components/PurchaseButton";

/**
 * ServiceBrowser — ComfortLifeUS
 *
 * The in-app alternative to opening the PDF: category tabs (mono ticket
 * labels, same family as Hero/CityCard) with an animated switch. If the
 * guide hasn't been purchased, only the first item per category shows in
 * full — the rest render as locked stubs to preview scope without giving
 * away the content.
 */

type Service = {
  category: string;
  name: string;
  description: string;
};

export default function ServiceBrowser({
  services,
  isUnlocked,
  citySlug,
}: {
  services: Service[];
  isUnlocked: boolean;
  citySlug: string;
}) {
  const categories = Array.from(new Set(services.map((s) => s.category)));
  const [active, setActive] = useState(categories[0]);

  const activeServices = services.filter((s) => s.category === active);

  return (
    <div>
      {/* tab strip, ticket-code styling */}
      <div className="flex flex-wrap gap-2 border-b border-dashed border-white/20 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`relative rounded-full px-4 py-2 font-mono text-xs tracking-widest transition-colors ${
              active === cat
                ? "bg-[#E8002D] text-white"
                : "bg-[#142050] text-white/60 hover:text-white"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          {activeServices.map((service, i) => {
            const locked = !isUnlocked && i > 0;

            return (
              <div
                key={service.name}
                className="relative overflow-hidden rounded-lg bg-[#142050] p-5"
              >
                <h4 className="font-display text-lg tracking-wide">
                  {service.name}
                </h4>
                <p
                  className={`mt-2 text-sm text-blue-200 ${
                    locked ? "blur-sm select-none" : ""
                  }`}
                >
                  {service.description}
                </p>

                {locked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0D1B4B]/70 backdrop-blur-[1px]">
                    <span className="font-mono text-[10px] tracking-widest text-[#F5B301]">
                      LOCKED
                    </span>
                    <span className="text-xs text-white/70">
                      Purchase the guide to unlock
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {!isUnlocked && (
        <div className="mt-8 rounded-lg border border-dashed border-white/25 p-5">
          <p className="text-sm text-blue-200">
            You&apos;re seeing a preview. Purchase the full guide for every
            service across all categories, plus the downloadable PDF.
          </p>
          <div className="mt-4">
            <PurchaseButton sku={`${citySlug}_city_guide`} />
          </div>
        </div>
      )}
    </div>
  );
}
