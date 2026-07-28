"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, MessageCircle } from "lucide-react";

/**
 * Contact page — ComfortLifeUS
 *
 * Left: a ticket-styled form (submits nowhere yet — see note below).
 * Right: a contact-info card using the same perforation motif as
 * CityCard/ProductCard, so this page still reads as part of the family
 * instead of a bare form dropped on a page.
 */

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // NOTE: no backend wired yet — see message below the code.
    setStatus("sent");
  }

  return (
    <main className="container py-24">
      <p className="font-mono text-xs tracking-[0.3em] text-[#9DB2FF]">
        GET IN TOUCH
      </p>
      <h1 className="mt-4 max-w-xl font-display text-6xl leading-[0.95] tracking-wide">
        Questions before you <span className="text-[#E8002D]">book?</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg text-blue-200">
        Whether it&apos;s about a specific city, a group trip, or
        something the guide didn&apos;t cover — we read every message.
      </p>

      <div className="mt-16 grid gap-10 md:grid-cols-[3fr_2fr]">
        {/* form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl bg-[#142050] p-8"
        >
          {status === "sent" ? (
            <div className="py-10 text-center">
              <p className="font-display text-3xl tracking-wide text-[#F5B301]">
                Message received.
              </p>
              <p className="mt-3 text-blue-200">
                We typically reply within one business day.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="font-mono text-xs tracking-widest text-white/60">
                  NAME
                </label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded bg-[#0D1B4B] px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-white/30"
                />
              </div>

              <div>
                <label className="font-mono text-xs tracking-widest text-white/60">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded bg-[#0D1B4B] px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-white/30"
                />
              </div>

              <div>
                <label className="font-mono text-xs tracking-widest text-white/60">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-2 w-full rounded bg-[#0D1B4B] px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-white/30"
                />
              </div>

              <button
                type="submit"
                className="rounded bg-[#E8002D] px-7 py-3 font-bold transition-transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </div>
          )}
        </motion.form>

        {/* contact info, ticket-stub styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-fit rounded-xl bg-[#142050] p-8"
        >
          <p className="font-mono text-xs tracking-widest text-[#F5B301]">
            REACH US DIRECTLY
          </p>

          <div className="mt-6 space-y-6">
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 text-[#F5B301]" />
              <div>
                <p className="font-bold">Email</p>
                <a
                  href="mailto:hello@comfortlifeus.com"
                  className="text-sm text-blue-200 transition-colors hover:text-white"
                >
                  hello@comfortlifeus.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 text-[#F5B301]" />
              <div>
                <p className="font-bold">Response Time</p>
                <p className="text-sm text-blue-200">
                  Within 1 business day
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle size={18} className="mt-0.5 text-[#F5B301]" />
              <div>
                <p className="font-bold">Prefer to plan live?</p>
                <a
                  href="/intake"
                  className="text-sm text-blue-200 transition-colors hover:text-white"
                >
                  Start your travel intake →
                </a>
              </div>
            </div>
          </div>

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

          <p className="font-mono text-[10px] tracking-widest text-white/40">
            USA · 2026 · MATCH-DAY TRAVEL
          </p>
        </motion.div>
      </div>
    </main>
  );
}
