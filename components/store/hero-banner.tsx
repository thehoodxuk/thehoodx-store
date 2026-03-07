"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=800&fit=crop"
          alt="Streetwear collection"
          fill
          className="object-cover object-center sm:object-[center_25%] opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black sm:bg-gradient-to-r sm:from-black sm:via-black/85 sm:to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Nouvelle Collection 2026
          </span>

          <h1 className="mb-6 text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            Streetwear
            <br />
            <span className="text-white/40">Redefined.</span>
          </h1>

          <p className="mb-10 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
            Essential pieces designed for comfort and built for style. Discover
            our collection of tees, hoodies, shorts &amp; caps.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/collections">
              <Button className="rounded-none bg-white px-8 py-6 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-white/90">
                Shop the Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
