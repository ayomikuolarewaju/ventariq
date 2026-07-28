// app/world-cup/page.tsx

import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function WorldCupPage() {
  return (
    <main>
      <section className="border-b border-dashed border-white/10 bg-[#0D1B4B]">
        <div className="container py-24 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-[#9DB2FF]">
            USA · 2026
          </p>
          <h1 className="mt-4 font-display text-6xl tracking-wide">
            World Cup <span className="text-[#E8002D]">Travel Plans</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-lg text-blue-200">
            Choose the travel support package that fits your journey —
            every plan built city-by-city, match-day-ready.
          </p>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.sku} description={product.description} name={product.name} price={product.price} features={product.features} sku={product.sku} />
          ))}
        </div>
      </section>
    </main>
  );
}
