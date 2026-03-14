"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";
import { ProductCard } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/queries";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { CATEGORIES } from "@/lib/types";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const { data, isLoading } = useProduct(id);
  const { addItem } = useCartStore();
  
  const product = data?.product;
  const relatedProducts = data?.related || [];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Sync initial size and color once product loads
  if (product && !selectedSize && !selectedColor) {
    setSelectedSize(product.sizes?.[0] || "");
    setSelectedColor(product.colors?.[0] || "");
  }

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, selectedSize, selectedColor, quantity);
    toast.success("Added to cart", {
      description: `${product.name} - ${selectedSize} / ${selectedColor}`,
      icon: <Check className="h-4 w-4" />,
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const categoryLabel = CATEGORIES.find(
    (c) => c.value === product.category?.slug || c.value === (product.category as unknown as string),
  )?.label || product.category?.name || "Category";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-10">
        <ol className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <li>
            <Link
              href="/collections"
              className="transition-colors hover:text-foreground"
            >
              Collections
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <Link
              href={`/collections?category=${product.category?.slug || product.category}`}
              className="transition-colors hover:text-foreground"
            >
              {categoryLabel}
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li className="truncate text-foreground">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {Number(product.stock) < 10 && Number(product.stock) > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            {categoryLabel}
          </span>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-black text-foreground">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Size
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`cursor-pointer rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                    selectedSize === size
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-border text-foreground hover:border-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Color
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors?.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`cursor-pointer rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                    selectedColor === color
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-border text-foreground hover:border-foreground"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Quantity
            </h3>
            <div className="mt-3 flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 cursor-pointer rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg font-bold">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 cursor-pointer rounded-full"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= Number(product.stock)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-10">
            <Button
              className="h-14 w-full cursor-pointer gap-3 rounded-full bg-black text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
              onClick={handleAddToCart}
              disabled={Number(product.stock) === 0}
            >
              <ShoppingBag className="h-5 w-5" />
              {Number(product.stock) === 0 ? "Sold Out" : "Add to Cart"}
            </Button>
          </div>

          {/* Product Details */}
          <div className="mt-10 border-t border-border pt-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Details
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Premium quality materials</li>
              <li>Comfortable fit for everyday wear</li>
              <li>Machine washable</li>
              <li>Free shipping on orders over $50</li>
              <li>30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            More to Explore
          </span>
          <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            You May Also Like
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {relatedProducts.slice(0, 3).map((relatedProduct: any) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
