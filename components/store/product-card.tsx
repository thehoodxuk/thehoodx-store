"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "./add-to-cart-button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/collections/${product.id}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow duration-300 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

        {/* Badges */}
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
            Low Stock
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            Sold Out
          </span>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="text-sm font-medium uppercase tracking-wide text-foreground transition-colors group-hover:text-foreground/70">
            {product.name}
          </h3>
          <p className="text-sm font-bold text-foreground">
            {formatPrice(product.price)}
          </p>
        </div>
        <AddToCartButton product={product} />
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <div className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800" />
        <div className="p-4 space-y-3">
          <div className="h-4 w-3/4 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-1/4 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-10 w-full rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}
