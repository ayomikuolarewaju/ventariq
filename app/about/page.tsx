// app/about/page.tsx

import { Compass, HeartHandshake, Globe2 } from "lucide-react";
import InfoCard from "@/components/InfoCard";

const VALUES = [
  {
    icon: "Compass" as const,
    title: "Local Expertise",
    description:
      "Every guide is built city-by-city, sourced from people who actually know the ground — not generic listicles.",
  },
  {
    icon: "HeartHandshake" as const,
    title: "Traveller-First",
    description:
      "We plan around your trip, not a template — families, solo fans, groups, and event-day-only visitors all need different things.",
  },
  {
    icon: "Globe2" as const,
    title: "Built for Big Events",
    description:
      "Host cities and venues get crowded and chaotic fast. Our guides exist to cut through that the moment you land.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* header banner */}
      <section className="border-b border-dashed border-white/10 bg-[#0D1B4B]">
        <div className="container py-24">
          <p className="font-mono text-xs tracking-[0.3em] text-[#9DB2FF]">
            ABOUT US
          </p>
          <p className="mt-6 max-w-2xl text-lg text-blue-200">
            StratX Solutions, founded by Dr. Mojeed Oyeniyi, develops
            intelligent digital solutions that simplify real-world
            experiences. Through thoughtful technology and practical
            innovation, we build trusted solutions that create
            convenience for people, help them save time, and ultimately
            enhance their decisions and experiences.
          </p>
        </div>
      </section>

      {/* Ventariq */}
      <section className="container py-20">
        <p className="font-mono text-xs tracking-widest text-[#F5B301]">
          VENTARIQ
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-6xl leading-[0.95] tracking-wide">
          Plan Less. <span className="text-[#E8002D]">Experience More.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-blue-200">
          Ventariq is an Event Travel Intelligence solution developed by
          StratX. We help travelers confidently attend major events
          without the fear of uncertainties about the event destination,
          safety, and other logistics. Rather than engaging in
          time-consuming planning and searches across various platforms,
          Ventariq brings relevant information together in one organized
          experience, helping travelers spend less time planning and
          more time enjoying their events.
        </p>

        <div className="mt-10 rounded-xl bg-[#142050] p-8">
          <p className="font-mono text-xs tracking-widest text-[#F5B301]">
            OUR ORIGIN
          </p>
          <p className="mt-3 max-w-2xl text-blue-200">
            Ventariq started as ComfortLifeUS during the 2026 FIFA World
            Cup, when it provided valuable electronic Planners to fans
            that saved them ample planning time and delivered a great
            experience during the games.
          </p>
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
            href="/events"
            className="mt-6 inline-block rounded bg-[#E8002D] px-7 py-3 font-bold transition-transform hover:-translate-y-0.5"
          >
            Get Started
          </a>
        </div>
      </section>
    </main>
  );
}
