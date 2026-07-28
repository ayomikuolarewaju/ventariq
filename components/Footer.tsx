// components/Footer.tsx

import Link from "next/link";
// import { Instagram, Twitter, Mail } from "lucide-react";
import { cities } from "@/lib/cities";

/**
 * Footer — ComfortLifeUS (v2)
 *
 * Builds on the original perforation motif but adds:
 *   - a newsletter capture row (matches the crimson CTA band on the homepage)
 *   - dynamic host-city links pulled from lib/cities, so this stays
 *     accurate without manual edits as cities are added
 *   - social links
 */

const GROUPS = [
  {
    title: "PLAN",
    links: [
      { href: "/world-cup", label: "World Cup Travel Plans" },
      { href: "/cities", label: "Host Cities" },
      { href: "/intake", label: "Start My Intake" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/dashboard", label: "My Travel Plan" },
    ],
  },
];

export default function Footer() {
  const topCities = cities.slice(0, 4);

  return (
    <footer className="mt-24 bg-[#0A1440]">
      {/* newsletter band */}
      <div className="relative overflow-hidden bg-[#E8002D]">
        <div
          aria-hidden
          className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10"
        />
        <div
          aria-hidden
          className="absolute -bottom-16 left-1/4 h-40 w-40 rounded-full bg-white/10"
        />
        <div className="container relative flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-white/70">
              STAY IN THE LOOP
            </p>
            <h3 className="mt-2 font-display text-3xl tracking-wide">
              Get city guide drops before they go live.
            </h3>
          </div>

          {/* <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="w-full rounded px-4 py-3 text-sm text-black outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded bg-[#0D1B4B] px-5 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
            >
              Notify Me
            </button>
          </form> */}
        </div>
      </div>

      <div className="container">
        {/* perforation, punched notches matching CityCard/ProductCard */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -left-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-[#0D1B4B]"
          />
          <div
            aria-hidden
            className="absolute -right-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-[#0D1B4B]"
          />
          <div className="border-t border-dashed border-white/20" />
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-wide">
              COMFORT<span className="text-[#E8002D]">LIFE</span>US
            </p>
            <p className="mt-3 max-w-sm text-sm text-blue-200">
              City-by-city World Cup travel guides and visitor support,
              built so you land knowing exactly where to go.
            </p>

            {/* <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#142050] text-white/70 transition-colors hover:text-white"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#142050] text-white/70 transition-colors hover:text-white"
              >
                <Twitter size={16} />
              </a>
              <a
                href="mailto:hello@comfortlifeus.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#142050] text-white/70 transition-colors hover:text-white"
              >
                <Mail size={16} />
              </a>
            </div> */}
          </div>

          {GROUPS.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-xs tracking-widest text-[#F5B301]">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {topCities.length > 0 && (
            <div>
              <p className="font-mono text-xs tracking-widest text-[#F5B301]">
                HOST CITIES
              </p>
              <ul className="mt-4 space-y-2">
                {topCities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/cities/${city.slug}`}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} ComfortLifeUS. All rights reserved.</span>
          <span className="font-mono tracking-widest">USA · 2026 · MATCH-DAY TRAVEL</span>
        </div>
      </div>
    </footer>
  );
}
