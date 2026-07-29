// app/api/guides/[eventSlug]/[locationSlug]/route.tsx
//
// GET /api/guides/us-open/arthur-ashe -> { url: "...signed-url..." }
//
// Generalized version of the earlier /api/guides/[slug] route — scoped by
// event + location so it works for World Cup cities and US Open venues
// alike. Reuses CityGuideDocument for rendering (its props were already
// generic: cityName/tagline/heroImage/services — no rename needed).
//
// Requires a `location_services` table: event_slug, location_slug,
// category, name, description. Replaces the earlier city_services table.

import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase-server";
import { CityGuideDocument } from "@/lib/pdf/CityGuideDocument";
import { getLocation } from "@/lib/events";

export async function GET(
  _req: Request,
  { params }: { params: { eventSlug: string; locationSlug: string } }
) {
  const found = getLocation(params.eventSlug, params.locationSlug);

  if (!found) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 });
  }

  const { event, location } = found;
  const guideSku = `${event.slug}_${location.slug}_guide`;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { data: order } = await supabase
    .from("orders")
    .select("id")
    .eq("customer_id", user.id)
    .eq("product_sku", guideSku)
    .eq("fulfillment_status", "completed")
    .maybeSingle();

  if (!order) {
    return NextResponse.json(
      { error: "No completed purchase found for this guide" },
      { status: 403 }
    );
  }

  const storagePath = `${event.slug}/${location.slug}/${user.id}.pdf`;

  const { data: existing } = await supabase.storage
    .from("guides")
    .createSignedUrl(storagePath, 60 * 10);

  if (existing?.signedUrl) {
    return NextResponse.json({ url: existing.signedUrl });
  }

  const { data: services } = await supabase
    .from("location_services")
    .select("category, name, description")
    .eq("event_slug", event.slug)
    .eq("location_slug", location.slug);

  const buffer = await renderToBuffer(
    <CityGuideDocument
      cityName={location.name}
      tagline={location.description}
      heroImage={location.image}
      services={services ?? []}
    />
  );

  const { error: uploadError } = await supabase.storage
    .from("guides")
    .upload(storagePath, buffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: signed, error: signError } = await supabase.storage
    .from("guides")
    .createSignedUrl(storagePath, 60 * 10);

  if (signError || !signed) {
    return NextResponse.json(
      { error: signError?.message ?? "Could not sign URL" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signed.signedUrl });
}
