// app/events/page.tsx

import EventCard from "@/components/EventCard";
import { events } from "@/lib/events";

export default function EventsPage() {
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");

  return (
    <main className="container py-24">
      <p className="font-mono text-xs tracking-[0.3em] text-[#9DB2FF]">
        EVENTS
      </p>
      <h1 className="mt-4 font-display text-6xl tracking-wide">
        Travel guides, <span className="text-[#E8002D]">event by event.</span>
      </h1>

      {upcoming.length > 0 && (
        <section className="mt-16">
          <h2 className="font-mono text-xs tracking-widest text-[#F5B301]">
            UPCOMING
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="mt-16">
          <h2 className="font-mono text-xs tracking-widest text-white/40">
            PAST EVENTS
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
