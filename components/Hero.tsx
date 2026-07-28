"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EASE_OUT } from "@/lib/motion";

/**
 * Hero — ComfortLifeUS
 *
 * Visual idea: the hero reads like the top half of a match ticket / boarding
 * pass — a mono "route code" eyebrow, a big condensed headline, and a
 * bottom "route strip" listing host cities like gate codes on a stub.
 */

const HERO_IMAGE = "/hero/world-cup-2026.png";

const ROUTE_CODES = [
  { code: "NYC", label: "New York" },
  { code: "LAX", label: "Los Angeles" },
  { code: "MIA", label: "Miami" },
  { code: "DAL", label: "Dallas" },
  { code: "ATL", label: "Atlanta" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0D1B4B]">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="hero image"
          width={1920}
          height={1080}
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B4B]/40 via-[#0D1B4B]/85 to-[#0D1B4B]" />
      </div>

      <div
        aria-hidden
        className="absolute -right-24 top-0 h-[140%] w-[45%] rotate-[8deg] bg-[#E8002D]/90"
        style={{ clipPath: "polygon(40% 0, 60% 0, 30% 100%, 10% 100%)" }}
      />
      <div
        aria-hidden
        className="absolute -right-10 top-0 h-[140%] w-[45%] rotate-[8deg] bg-[#F5B301]/70"
        style={{ clipPath: "polygon(40% 0, 48% 0, 18% 100%, 10% 100%)" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative py-28 md:py-36"
      >
        <motion.p
          variants={rise}
          className="font-mono text-sm tracking-[0.3em] text-[#9DB2FF]"
        >
          USA · 2026 · MATCH-DAY TRAVEL
        </motion.p>

        <motion.h1
          variants={rise}
          className="mt-4 max-w-3xl font-display text-6xl leading-[0.95] tracking-wide md:text-8xl"
        >
          YOUR ROUTE
          <br />
          <span className="text-[#E8002D]">INTO THE CUP.</span>
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-6 max-w-xl text-lg text-blue-200"
        >
          City guides, match-day logistics and visitor support — built
          city-by-city, so you land knowing exactly where to go.
        </motion.p>

        <motion.div variants={rise} className="mt-9 flex flex-wrap gap-4">
          <a
            href="/world-cup"
            className="rounded bg-[#E8002D] px-7 py-3 font-bold transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#E8002D]/30"
          >
            Plan My Trip
          </a>
          <a
            href="/cities"
            className="rounded border border-white/25 px-7 py-3 font-bold text-white/90 transition-colors hover:border-white/60"
          >
            Browse Host Cities
          </a>
        </motion.div>

        <motion.div
          variants={rise}
          className="mt-16 border-t border-dashed border-white/20 pt-6"
        >
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs tracking-widest text-white/50">
            {ROUTE_CODES.map((c) => (
              <span key={c.code} className="flex items-center gap-2">
                <span className="text-[#F5B301]">{c.code}</span>
                <span className="text-white/30">/</span>
                <span>{c.label}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
