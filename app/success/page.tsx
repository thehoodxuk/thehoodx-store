"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

export default function OrderSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Clear cart upon successful return from Stripe
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="mt-6 text-3xl font-black uppercase tracking-tight">
        Order Confirmed!
      </h1>

      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Thank you for your purchase. Your order has been placed successfully and
        is being processed. You will receive a confirmation email shortly.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/collections">
          <Button className="h-12 min-w-[180px] cursor-pointer rounded-full bg-black text-xs font-bold uppercase tracking-widest text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant="outline"
            className="h-12 min-w-[180px] cursor-pointer rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <Package className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
