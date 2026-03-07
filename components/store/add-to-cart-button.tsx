"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Product } from "@/lib/types";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) return;

    addItem(product, product.sizes[0], product.colors[0]);
    toast.success(`${product.name} added to cart`);
  };

  if (product.stock === 0) return null;

  return (
    <Button
      onClick={handleAddToCart}
      size="sm"
      className="w-full cursor-pointer rounded-full border border-black bg-black px-4 py-5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black"
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
