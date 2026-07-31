// app/events/[slug]/locations/[locationSlug]/page.tsx

import { notFound } from "next/navigation";
import PurchaseButton from "@/components/PurchaseButton";
import ServiceBrowser from "@/components/ServiceBrowser";
import DownloadGuideButton from "@/components/DownloadGuideButton";
import { createClient } from "@/lib/supabase-server";
import { getLocation, getLocationServices } from "@/lib/events";

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string; locationSlug: string }>;
}) {
  const { slug, locationSlug } = await params;
  const found = await getLocation(slug, locationSlug);

  if (!found) {
    notFound();
  }

  const { event, location } = found;
  const guideSku = `${event.slug}_${location.slug}_guide`;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isUnlocked = false;

  if (user) {
    const { data: order } = await supabase
      .from("orders")
      .select("id")
      .eq("customer_id", user.id)
      .eq("product_sku", guideSku)
      .eq("fulfillment_status", "completed")
      .maybeSingle();

    isUnlocked = !!order;
  }

  const services = await getLocationServices(location.id);

  return (
    <main className="container py-20">
      <p className="font-mono text-xs tracking-[0.3em] text-[#9DB2FF]">
        {event.eyebrow}
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-wide">
        {location.name}
      </h1>

      <p className="mt-6 text-xl text-blue-200">{location.description}</p>

      {location.basePrice > 0 && (
        <p className="mt-2 font-mono text-sm text-[#F5B301]">
          FROM ${location.basePrice.toFixed(2)}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-4">
        {!isUnlocked && <PurchaseButton sku={guideSku} />}
        {isUnlocked && (
          <DownloadGuideButton
            eventSlug={event.slug}
            locationSlug={location.slug}
          />
        )}
      </div>

      <section className="mt-16">
        {services.length > 0 ? (
          <ServiceBrowser
            services={services}
            isUnlocked={isUnlocked}
            guideSku={guideSku}
          />
        ) : (
          <p className="text-blue-200">
            Service details for {location.name} are coming soon.
          </p>
        )}
      </section>
    </main>
  );
}
