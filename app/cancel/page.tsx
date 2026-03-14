"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderFailedPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <XCircle className="h-10 w-10 text-red-600" />
      </div>

      <h1 className="mt-6 text-3xl font-black uppercase tracking-tight">
        Payment Failed
      </h1>

      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Something went wrong while processing your payment. Your cart items have
        been saved. Please try again or use a different payment method.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/checkout">
          <Button className="h-12 min-w-[180px] cursor-pointer rounded-full bg-black text-xs font-bold uppercase tracking-widest text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </Link>
        <Link href="/collections">
          <Button
            variant="outline"
            className="h-12 min-w-[180px] cursor-pointer rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
