"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, RotateCcw, Shield, Headphones } from "lucide-react";
import { HeroBanner } from "@/components/store/hero-banner";
import { ProductCard } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/queries";

const features = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over $50" },
  { icon: RotateCcw, label: "Free Returns", desc: "Within 30 days" },
  { icon: Shield, label: "Secure Payment", desc: "SSL encrypted" },
  { icon: Headphones, label: "24/7 Support", desc: "We got you" },
];

export default function Home() {
  const { data, isLoading } = useProducts({ sort: "newest", limit: 3 });
  const latestProducts = data?.products || [];

  return (
    <div>
      <HeroBanner />

      {/* Features Bar */}
      <section className="border-y border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-4 text-center sm:text-left"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {feature.label}
                </p>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
          {isLoading ? (
            <p className="col-span-full text-center text-muted-foreground">Loading latest drops...</p>
          ) : (
            latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* Brand Story / Culture Section */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&h=800&fit=crop"
            alt="Street culture"
            fill
            className="object-cover opacity-15"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Our Philosophy
            </span>
            <h2 className="mb-6 text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Built for the Streets.
              <br />
              <span className="text-white/40">Worn by Royalty.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/60">
              Every piece we create is a statement. Rooted in street culture,
              crafted with premium materials, and designed for those who refuse
              to blend in. The-Hoodx isn&apos;t just a brand — it&apos;s a
              movement.
            </p>
            <Link href="/collections">
              <Button className="cursor-pointer rounded-full border border-white bg-transparent px-8 py-6 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black">
                Explore the Culture
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Split Content Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
            <Image
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=800&fit=crop"
              alt="Streetwear details"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              Quality First
            </span>
            <h2 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
              Premium Fabrics.
              <br />
              Unmatched Comfort.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              We source only the finest materials — heavyweight cotton, brushed
              fleece, and custom blends engineered for durability and softness.
              Every stitch is intentional. Every detail matters.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="space-y-1">
                <p className="text-2xl font-black">100%</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Premium Cotton
                </p>
              </div>
              <div className="mx-4 w-px bg-border" />
              <div className="space-y-1">
                <p className="text-2xl font-black">300+</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  GSM Weight
                </p>
              </div>
              <div className="mx-4 w-px bg-border" />
              <div className="space-y-1">
                <p className="text-2xl font-black">0%</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Compromise
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-black px-4 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2
            className="text-3xl font-black uppercase tracking-tight sm:text-4xl"
            style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
          >
            Join the Movement
          </h2>
          <p className="text-base text-white/60">
            Be the first to know about new drops, exclusive releases, and
            members-only offers.
          </p>
          <div className="mx-auto flex max-w-md items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-full border border-white/20 bg-white/5 px-5 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
            />
            <Button className="h-12 cursor-pointer rounded-full bg-white px-6 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
