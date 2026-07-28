// app/api/guides/[slug]/route.ts
//
// GET /api/guides/miami  -> { url: "https://...signed-url..." }
//
// Flow:
//   1. Confirm there's a logged-in user (via the session cookie).
//   2. Confirm that user has a completed order for this city/event.
//   3. If a PDF was already generated for this user+city, just re-sign
//      and return it (cheap — no re-render).
//   4. Otherwise render it with @react-pdf/renderer, upload to a
//      private Supabase Storage bucket, and sign it.
//
// Requires:
//   - A private Storage bucket named "guides"
//   - An `orders` table with columns roughly: user_id, product_sku,
//     fulfillment_status (or similar "paid"/"completed" marker)
//   - A `city_services` table (or equivalent) with: city_slug, category,
//     name, description
// Adjust the query below to match your actual schema/product_sku values.

import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase-server";
import { CityGuideDocument } from "@/lib/pdf/CityGuideDocument";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  // 1. verify purchase
  const { data: order } = await supabase
    .from("orders")
    .select("id")
    .eq("customer_id", user.id)
    .eq("product_sku", `${params.slug}_city_guide`)
    .eq("fulfillment_status", "completed")
    .maybeSingle();

  if (!order) {
    return NextResponse.json(
      { error: "No completed purchase found for this guide" },
      { status: 403 }
    );
  }

  const storagePath = `${params.slug}/${user.id}.pdf`;

  // 2. return a cached copy if it already exists
  const { data: existing } = await supabase.storage
    .from("guides")
    .createSignedUrl(storagePath, 60 * 10); // 10 minutes

  if (existing?.signedUrl) {
    return NextResponse.json({ url: existing.signedUrl });
  }

  // 3. otherwise fetch content and generate the PDF
  const { data: city } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!city) {
    return NextResponse.json({ error: "City not found" }, { status: 404 });
  }

  const { data: services } = await supabase
    .from("city_services")
    .select("category, name, description")
    .eq("city_slug", params.slug);

  const buffer = await renderToBuffer(
    <CityGuideDocument
      cityName={city.name}
      tagline={city.description}
      heroImage={city.image}
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
