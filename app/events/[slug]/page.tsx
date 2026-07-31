// app/events/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import LocationCard from "@/components/LocationCard";
import { getEvent } from "@/lib/events";

export default async function EventLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-dashed border-white/10 bg-[#0D1B4B]">
        <div className="container py-24 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-[#9DB2FF]">
            {event.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-6xl tracking-wide">
            {event.name} <span className="text-[#E8002D]">Travel Plans</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-lg text-blue-200">
            {event.description}
          </p>
          {event.status === "past" && (
            <span className="mt-6 inline-block rounded bg-white/10 px-4 py-2 font-mono text-xs tracking-widest text-white/60">
              THIS EVENT HAS CONCLUDED — GUIDES SHOWN FOR REFERENCE
            </span>
          )}
        </div>
      </section>

      <section className="container py-20">
        {event.locations.length > 0 && (
          <div className="mb-20">
            <p className="font-mono text-xs tracking-[0.3em] text-[#F5B301]">
              {event.status === "upcoming" ? "VENUES" : "HOST CITIES"}
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-wide">
              Browse by location.
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {event.locations.map((location) => (
                <LocationCard
                  key={location.slug}
                  eventSlug={event.slug}
                  location={location}
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {event.plans.map((plan) => (
            <div key={plan.sku}>
              <ProductCard
                product={{
                  sku: plan.sku,
                  name: plan.name,
                  description: plan.description,
                  features: plan.features,
                  price: plan.price,
                }}
              />
              <Link
                href={`/events/${event.slug}/${plan.sku}`}
                className="mt-3 inline-block font-mono text-xs tracking-widest text-white/60 transition-colors hover:text-white"
              >
                VIEW FULL DETAILS →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
