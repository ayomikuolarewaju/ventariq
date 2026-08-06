"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_OUT } from "@/lib/motion";
import Image from "next/image";
import logo from "@/public/hero/logo3.png";

const LINKS = [
  { href: "/events", label: "Events" },
  { href: "/intake", label: "Let's Plan Your Trip" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0D1B4B]/95 backdrop-blur-sm shadow-md shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="font-display text-2xl tracking-wide">
          <Image src={logo} alt="Logo" width={150} height={100} />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`font-mono text-xs tracking-widest transition-colors ${
                    active ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label.toUpperCase()}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 h-[2px] w-full bg-[#E8002D]"
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <Link
          href="/intake"
          className="rounded bg-[#E8002D] px-5 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5"
        >
          Lets Plan Your Trip
        </Link>
      </nav>
    </header>
  );
}
