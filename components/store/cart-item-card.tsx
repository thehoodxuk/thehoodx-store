"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "@/lib/types";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (productId: string, size: string, color: string) => void;
  onUpdateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number,
  ) => void;
}

export function CartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
}: CartItemCardProps) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border p-3">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-sm font-semibold text-foreground line-clamp-1">
              {item.product.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              {item.size} / {item.color}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 cursor-pointer text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(item.product.id, item.size, item.color)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 cursor-pointer rounded-full"
              onClick={() =>
                onUpdateQuantity(
                  item.product.id,
                  item.size,
                  item.color,
                  item.quantity - 1,
                )
              }
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-bold">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 cursor-pointer rounded-full"
              onClick={() =>
                onUpdateQuantity(
                  item.product.id,
                  item.size,
                  item.color,
                  item.quantity + 1,
                )
              }
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <p className="shrink-0 text-sm font-bold text-foreground">
            {formatPrice(item.product.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
