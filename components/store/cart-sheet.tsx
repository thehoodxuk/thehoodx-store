"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
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
import { ReactNode } from "react";

interface CartSheetProps {
  children: ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-[90vw] max-w-lg flex-col p-6 sm:w-full">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Link href="/collections">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 py-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4 rounded-lg border border-border p-3"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-medium text-foreground line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {item.size} / {item.color}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() =>
                            removeItem(item.product.id, item.size, item.color)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(
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
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(
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
                        <p className="text-sm font-medium text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="flex-col gap-4 border-t border-border pt-4 sm:flex-col">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <Link href="/checkout" className="w-full">
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
