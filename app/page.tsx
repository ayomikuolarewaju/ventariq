// app/page.tsx


import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import CityCard from "@/components/CityCard";
import { cities } from "@/lib/cities";

const FEATURES = [
  {
    icon: "MapPin",
    title: "City Guides",
    description:
      "Explore World Cup host cities — transport, food, culture, and everything in between.",
  },
  {
    icon: "UserCheck",
    title: "Personal Plans",
    description:
      "Custom match-day and family travel assistance, built around your itinerary.",
  },
  {
    icon: "ShieldCheck",
    title: "Visitor Support",
    description:
      "Hotels, transportation, language and prayer support — on the ground when you need it.",
  },
];

export default function Home() {
  const featuredCities = cities.slice(0, 3);

  return (
    <main>
      <Hero />

      {/* value props */}
      <section className="container py-24">
        <p className="font-mono text-xs tracking-[0.3em] text-[#F5B301]">
          WHY COMFORTLIFEUS
        </p>
        <h2 className="mt-3 max-w-lg font-display text-4xl tracking-wide">
          Everything you need, nothing you don&apos;t.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <InfoCard key={f.title} index={i}  description={f.description} icon={f.icon} title={f.title} />
          ))}
        </div>
      </section>

      {/* featured cities */}
      {featuredCities.length > 0 && (
        <section className="container py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-[#F5B301]">
                HOST CITIES
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-wide">
                Start with a city.
              </h2>
            </div>
            <a
              href="/cities"
              className="font-mono text-xs tracking-widest text-white/70 transition-colors hover:text-white"
            >
              VIEW ALL CITIES →
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredCities.map((city) => (
              <CityCard key={city.slug} city={city} />
            ))}
          </div>
        </section>
      )}

      {/* closing CTA band */}
      <section className="relative mt-24 overflow-hidden bg-[#E8002D] py-20">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"
        />
        <div
          aria-hidden
          className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-white/10"
        />
        <div className="container relative">
          <p className="font-mono text-xs tracking-[0.3em] text-white/70">
            READY WHEN YOU ARE
          </p>
          <h2 className="mt-3 max-w-xl font-display text-5xl tracking-wide">
            Land knowing exactly where to go.
          </h2>
          <a
            href="/world-cup"
            className="mt-8 inline-block rounded bg-white px-7 py-3 font-bold text-[#E8002D] transition-transform hover:-translate-y-0.5"
          >
            Plan My Trip
          </a>
        </div>
      </section>
    </main>
  );
}
