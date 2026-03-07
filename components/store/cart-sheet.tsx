"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { CartItemCard } from "./cart-item-card";
import { ReactNode, useState } from "react";

interface CartSheetProps {
  children: ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col p-6 sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Link href="/collections" onClick={() => setOpen(false)}>
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 py-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <CartItemCard
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    item={item}
                    onRemove={removeItem}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="flex-col gap-4 border-t border-border pt-4 sm:flex-col">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
