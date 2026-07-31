// components/Footer.tsx

import Link from "next/link";
import {  Mail } from "lucide-react";
import { getFeaturedEvent } from "@/lib/events";

const GROUPS = [
  {
    title: "PLAN",
    links: [
      { href: "/events", label: "All Events" },
      { href: "/about", label: "About" },
      { href: "/intake", label: "Start My Intake" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/dashboard", label: "My Travel Plan" },
    ],
  },
];

export default async function Footer() {
  const featured = await getFeaturedEvent();
  const topLocations = featured.locations?.slice(0, 4);

  return (
    <footer className="mt-24 bg-[#0A1440]">
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
              Get {featured.name} guide drops before they go live.
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
              Event-by-event travel guides and visitor support, built so
              you land knowing exactly where to go.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#142050] text-white/70 transition-colors hover:text-white"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#142050] text-white/70 transition-colors hover:text-white"
              >
                <Mail size={16} />
              </a>
              <a
                href="mailto:hello@comfortlifeus.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#142050] text-white/70 transition-colors hover:text-white"
              >
                <Mail size={16} />
              </a>
            </div>
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

          {topLocations.length > 0 && (
            <div>
              <p className="font-mono text-xs tracking-widest text-[#F5B301]">
                {featured.name.toUpperCase()}
              </p>
              <ul className="mt-4 space-y-2">
                {topLocations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/events/${featured.slug}/locations/${location.slug}`}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} ComfortLifeUS. All rights reserved.</span>
          <span className="font-mono tracking-widest">{featured.eyebrow}</span>
        </div>
      </div>
    </footer>
  );
}
