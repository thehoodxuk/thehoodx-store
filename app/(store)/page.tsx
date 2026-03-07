import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroBanner } from "@/components/store/hero-banner";
import { ProductCard } from "@/components/store/product-card";
import { products } from "@/lib/data";

export default function Home() {
  const latestProducts = products.slice(-3).reverse();

  return (
    <div>
      <HeroBanner />

      {/* Latest Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              New Arrivals
            </span>
            <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
              Latest Drops
            </h2>
          </div>
          <Link
            href="/collections"
            className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
