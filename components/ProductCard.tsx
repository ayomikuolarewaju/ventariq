"use client";

import { motion } from "framer-motion";
import PurchaseButton from "@/components/PurchaseButton";
import { EASE_OUT } from "@/lib/motion";

/**
 * ProductCard — ComfortLifeUS
 *
 * Continues the boarding-pass language from Hero/CityCard: a "FARE" stub
 * with a perforated divider separating what you get (features) from the
 * purchase action. Keeps the family consistent across the funnel — the
 * traveller sees the same visual grammar from browsing to buying.
 *
 * Expects `product` to come from lib/products. If your Product type
 * doesn't have `price` or `features` yet, add them:
 *   price: number        -> in whole dollars, e.g. 49
 *   features?: string[]  -> short bullet list, e.g. ["City guide PDF", ...]
 */

type Product = {
  sku?: string;
  name: string;
  description: string;
  price?: number;
  features?: string[];
};

export default function ProductCard({ sku,name,description,price,features }: Product) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      whileHover={{ y: -6 }}
      className="relative overflow-hidden rounded-xl bg-[#142050] shadow-lg shadow-black/20"
    >
      <div className="flex items-start justify-between p-6">
        <div>
          <span className="font-mono text-[11px] tracking-widest text-[#F5B301]">
            FARE / {(sku)?.toUpperCase()}
          </span>
          <h3 className="mt-2 font-display text-2xl tracking-wide">
            {name}
          </h3>
        </div>
        {price != null && (
          <div className="text-right">
            <span className="font-display text-3xl text-[#E8002D]">
              ${price}
            </span>
          </div>
        )}
      </div>

      <p className="px-6 text-sm text-blue-200">{description}</p>

      {features && features.length > 0 && (
        <ul className="mt-4 space-y-2 px-6">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-white/80">
              <span className="mt-0.5 text-[#F5B301]">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}

      {/* perforation with punched notches, same grammar as CityCard */}
      <div className="relative mt-6">
        <div
          aria-hidden
          className="absolute -left-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-[#0D1B4B]"
        />
        <div
          aria-hidden
          className="absolute -right-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-[#0D1B4B]"
        />
        <div className="border-t border-dashed border-white/25" />
      </div>

      <div className="p-6">
        <PurchaseButton sku={sku} />
      </div>
    </motion.div>
  );
}
