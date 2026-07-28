// app/about/page.tsx

import { Compass, HeartHandshake, Globe2 } from "lucide-react";
import InfoCard from "@/components/InfoCard";

const VALUES = [
  {
    icon: "Compass",
    title: "Local Expertise",
    description:
      "Every guide is built city-by-city, sourced from people who actually know the ground — not generic listicles.",
  },
  {
    icon: "HeartHandshake",
    title: "Traveller-First",
    description:
      "We plan around your trip, not a template — families, solo fans, groups, and match-day-only visitors all need different things.",
  },
  {
    icon: "Globe2",
    title: "Built for Big Events",
    description:
      "Host cities get crowded and chaotic fast. Our guides exist to cut through that the moment you land.",
  },
];

const STATS = [
  { value: "16+", label: "Host Cities Covered" },
  { value: "1,000+", label: "Services Mapped" },
  { value: "24/7", label: "Visitor Support" },
];

export default function AboutPage() {
  return (
    <main>
      {/* header banner */}
      <section className="border-b border-dashed border-white/10 bg-[#0D1B4B]">
        <div className="container py-24">
          <p className="font-mono text-xs tracking-[0.3em] text-[#9DB2FF]">
            ABOUT COMFORTLIFEUS
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-6xl leading-[0.95] tracking-wide">
            Travel support built for the chaos of{" "}
            <span className="text-[#E8002D]">big events.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-blue-200">
            We started ComfortLifeUS because the hardest part of a trip
            isn&apos;t the flight — it&apos;s everything after you land.
            Where to stay, how to move, who to trust. We turn that into
            one guide per city, ready before you go.
          </p>
        </div>
      </section>

      {/* mission */}
      <section className="container py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-xs tracking-widest text-[#F5B301]">
              OUR MISSION
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-wide">
              Land knowing exactly where to go.
            </h2>
            <p className="mt-5 text-blue-200">
              Major events like the World Cup pull thousands of visitors
              into cities they&apos;ve never navigated, on a timeline
              that leaves no room for guesswork. We build the guide we
              wish existed — hotels, transport, food, and visitor
              support, organized around your actual match-day plan.
            </p>
          </div>

          <div className="rounded-xl bg-[#142050] p-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl text-[#E8002D]">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] tracking-widest text-white/60">
                    {stat.label.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="container py-16">
        <p className="font-mono text-xs tracking-[0.3em] text-[#F5B301]">
          WHAT WE VALUE
        </p>
        <h2 className="mt-3 max-w-lg font-display text-4xl tracking-wide">
          The principles behind every guide.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <InfoCard key={v.title} index={i} {...v} />
          ))}
        </div>
      </section>

      {/* closing CTA */}
      <section className="container pb-24 pt-8">
        <div className="rounded-xl border border-dashed border-white/20 p-10 text-center">
          <h2 className="font-display text-3xl tracking-wide">
            Ready to plan your trip?
          </h2>
          <a
            href="/world-cup"
            className="mt-6 inline-block rounded bg-[#E8002D] px-7 py-3 font-bold transition-transform hover:-translate-y-0.5"
          >
            Get Started
          </a>
        </div>
      </section>
    </main>
  );
}
