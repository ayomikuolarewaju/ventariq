// lib/events.ts
//
// Generic events model — replaces the hardcoded "world-cup" pages/products.
// Every major event (World Cup, US Open, future events) is one entry here.
// Event landing + plan-detail pages read from this instead of being
// hand-built per event, so adding the next event is a data change, not a
// new set of page files.

export type Plan = {
  sku: string;
  name: string;
  description: string;
  features: string[];
  price?: number;
};

export type Location = {
  slug: string;
  name: string;
  description: string;
  image?: string;
};

export type EventItem = {
  slug: string;
  name: string;
  sport: string;
  status: "upcoming" | "past";
  eyebrow: string; // e.g. "USA · 2026 · US OPEN TRAVEL"
  tagline: string;
  description: string;
  heroImage?: string;
  routeItems: { code: string; label: string }[];
  locations: Location[];
  plans: Plan[];
};

export const events: EventItem[] = [
  {
    slug: "us-open",
    name: "US Open",
    sport: "Tennis",
    status: "upcoming",
    eyebrow: "USA · 2026 · US OPEN TRAVEL",
    tagline:
      "Grounds passes, session logistics and visitor support for Flushing Meadows.",
    description:
      "A guide built around session times and grounds navigation — so you're courtside without the guesswork on getting there, eating, and moving between matches.",
    heroImage: "/hero/us-open.png",
    routeItems: [
      { code: "USO", label: "Flushing Meadows, NY" },
      { code: "AA", label: "Arthur Ashe Stadium" },
      { code: "LA", label: "Louis Armstrong Stadium" },
      { code: "GS", label: "Grandstand" },
    ],
    locations: [
      {
        slug: "arthur-ashe",
        name: "Arthur Ashe Stadium",
        description:
          "The main show court — biggest sightlines, longest lines. Here's how to move through it without losing time between matches.",
        image: "/cities/arthur-ashe.png",
      },
      {
        slug: "louis-armstrong",
        name: "Louis Armstrong Stadium",
        description:
          "The second stadium court, with a retractable roof and a different crowd flow than Ashe — worth planning separately.",
        image: "/cities/armstrong.png",
      },
      {
        slug: "grandstand",
        name: "Grandstand",
        description:
          "Closer, cheaper, and often better tennis — the Grandstand rewards visitors who know how to get there early.",
        image:  "/cities/grand.png",
      },
    ],
    plans: [
      {
        sku: "session_day_plan",
        name: "Session Day Plan",
        description:
          "Your personalized US Open day — grounds arrival, seating navigation, food, and movement between courts.",
        features: [
          "Grounds arrival + entry gate guidance",
          "Court-to-court navigation for your session",
          "Food and rest stop recommendations on-site",
          "On-the-ground visitor support contact",
        ],
      },
      {
        sku: "group_concierge_plan",
        name: "Group Concierge",
        description:
          "Traveling with a crew? One point of contact coordinates transport, hotels, and session-day logistics for the whole group.",
        features: [
          "Dedicated concierge for group coordination",
          "Group transport and multi-room hotel booking support",
          "Synced session schedule across the group",
          "Priority visitor support during the event",
        ],
      },
    ],
  },
  {
    slug: "world-cup",
    name: "World Cup",
    sport: "Football",
    status: "past",
    eyebrow: "USA · 2026 · MATCH-DAY TRAVEL",
    tagline: "City guides, match-day logistics and visitor support.",
    description:
      "City-by-city guides built for World Cup host cities — hotels, transport, food, and visitor support around your match schedule.",
    heroImage: "/hero/world-cup-2026.png",
    routeItems: [
      { code: "NYC", label: "New York" },
      { code: "LAX", label: "Los Angeles" },
      { code: "MIA", label: "Miami" },
      { code: "DAL", label: "Dallas" },
      { code: "ATL", label: "Atlanta" },
    ],
    locations: [
      {
        slug: "new-york",
        name: "New York",
        description: "Transit, boroughs, and the MetLife match-day route.",
        image: "/cities/new-york-new-jersey.png",
      },
      {
        slug: "los-angeles",
        name: "Los Angeles",
        description: "SoFi Stadium routes, coastline stays, and rideshare tips.",
        image: "/cities/toronto.png",
      },
      {
        slug: "miami",
        name: "Miami",
        description: "Beaches, nightlife, and stadium-day logistics.",
        image: "/cities/vancouver.png",
      },
      {
        slug: "dallas",
        name: "Dallas",
        description: "Match-day transport and host-city visitor support.",
        image: "/cities/dallas.png",
      },
      {
        slug: "atlanta",
        name: "Atlanta",
        description: "Match-day transport and host-city visitor support.",
        image: "/cities/dallas.png",
      },
    ],
    plans: [
      {
        sku: "custom_match_day_plan",
        name: "Custom Match-Day Plan",
        description:
          "Your personalized World Cup experience. We help you plan transport, stadium arrival, food, movement and local support.",
        features: [
          "Stadium arrival + departure route planning",
          "Local transport guidance for match day",
          "Food and rest stop recommendations near the venue",
          "On-the-ground visitor support contact",
        ],
      },
      {
        sku: "family_muslim_plan",
        name: "Family & Muslim Traveller Plan",
        description:
          "Travel support built around family logistics and religious accommodation.",
        features: [
          "Prayer space and mosque locations near your hotel and stadium",
          "Halal food recommendations across your host city",
          "Family-friendly accommodation guidance",
          "Scheduling built around match times and prayer times",
        ],
      },
      {
        sku: "group_concierge_plan",
        name: "Group Concierge",
        description:
          "Traveling with a crew? One point of contact coordinates transport, hotels, and match-day logistics for the whole group.",
        features: [
          "Dedicated concierge for group coordination",
          "Group transport and multi-room hotel booking support",
          "Synced match-day schedule across the group",
          "Priority visitor support during the event",
        ],
      },
    ],
  },
];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getLocation(eventSlug: string, locationSlug: string) {
  const event = getEvent(eventSlug);
  const location = event?.locations.find((l) => l.slug === locationSlug);
  return event && location ? { event, location } : null;
}

export function getFeaturedEvent() {
  return events.find((e) => e.status === "upcoming") ?? events[0];
}
