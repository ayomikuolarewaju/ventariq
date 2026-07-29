"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Location } from "@/lib/events";
import { EASE_OUT } from "@/lib/motion";

/**
 * LocationCard — ComfortLifeUS
 *
 * Generalized version of the old CityCard: works for World Cup host
 * cities and US Open venues alike, since both are just "a place within
 * an event that has its own purchasable guide."
 */

export default function LocationCard({
  eventSlug,
  location,
}: {
  eventSlug: string;
  location: Location;
}) {
  const code = location.slug.slice(0, 3).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-xl bg-[#142050] shadow-lg shadow-black/20"
    >
      <Link href={`/events/${eventSlug}/locations/${location.slug}`}>
        <div className="relative h-48 w-full overflow-hidden">
          {location.image && (
            <Image
              src={location.image}
              alt={location.name}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#142050] via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded bg-black/40 px-2 py-1 font-mono text-[11px] tracking-widest text-[#F5B301] backdrop-blur-sm">
            {code}
          </span>
        </div>

        <div className="relative">
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

        <div className="p-5">
          <h3 className="font-display text-2xl tracking-wide">
            {location.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-blue-200">
            {location.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs tracking-widest text-[#E8002D] transition-transform group-hover:translate-x-1">
            VIEW GUIDE →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
