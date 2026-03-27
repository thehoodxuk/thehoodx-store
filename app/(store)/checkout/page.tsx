"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

const shippingSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone number is required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    mode: "onChange",
  });

  const address = useWatch({ control, name: "address" });
  const city = useWatch({ control, name: "city" });
  const postalCode = useWatch({ control, name: "postalCode" });
  const country = useWatch({ control, name: "country" });

  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [isCalculatingTax, setIsCalculatingTax] = useState(false);

  useEffect(() => {
    // Only fetch if we have enough address data to calculate tax
    const hasLocation = Boolean(address?.trim() && city?.trim() && postalCode?.trim() && country?.trim());
    
    console.log("Tax Calc Check: ", { hasLocation, address, city, postalCode, country });

    if (hasLocation && items.length > 0) {
      const timer = setTimeout(async () => {
        setIsCalculatingTax(true);
        try {
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
          console.log("Fetching tax from:", `${backendUrl}/calculate-tax`);
          const res = await fetch(`${backendUrl}/calculate-tax`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: items.map((item) => ({
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
              })),
              shipping_address: {
                line1: address,
                city: city,
                postal_code: postalCode,
                country: country,
              },
            }),
          });
          const data = await res.json();
          if (data.tax_amount_exclusive !== undefined) {
             setTaxAmount(data.tax_amount_exclusive / 100);
          } else {
             setTaxAmount(0);
          }
        } catch (error) {
          console.error("Failed to calculate tax:", error);
          setTaxAmount(0);
        } finally {
          setIsCalculatingTax(false);
        }
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setTaxAmount(0);
    }
  }, [address, city, postalCode, country, items]);

  // ── Empty Cart ─────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="text-2xl font-black uppercase tracking-tight">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-muted-foreground">
          Add some items before checking out.
        </p>
        <Link href="/collections">
          <Button className="h-12 rounded-full bg-black px-8 text-xs font-bold uppercase tracking-widest text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
            Browse Collections
          </Button>
        </Link>
      </div>
    );
  }

  // ── Stripe Checkout Handler ────────────────────────────────
  const onSubmit = async () => {
    setIsProcessing(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${backendUrl}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Mapping our items structure into what the backend expects
        body: JSON.stringify({
          items: items.map((item) => ({
            name: `${item.product.name} (Size: ${item.size}, Color: ${item.color})`,
            price: item.product.price,
            quantity: item.quantity,
          })),
        }),
      });
      
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        toast.error(data.error || "Failed to initiate payment processor.");
        setIsProcessing(false);
      }
    } catch (e: any) {
      toast.error("An error occurred during checkout setup.");
      console.error(e);
      setIsProcessing(false);
    }
  };

  const shippingCost = 0;
  const total = totalPrice + shippingCost + taxAmount;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back */}
      <Link
        href="/collections"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>

      <h1 className="mb-8 text-3xl font-black uppercase tracking-tight">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 lg:grid-cols-5"
      >
        {/* ── Left: Shipping Form ──────────────────────────── */}
        <div className="space-y-8 lg:col-span-3">
          {/* Shipping fields */}
          <div className="space-y-5 rounded-xl border border-border/50 p-6">
            <h2 className="text-lg font-bold uppercase tracking-wide">
              Shipping Address
            </h2>

            <div className="space-y-4">
              {/* Full name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="h-12 rounded-lg border-border bg-muted/30 text-sm focus-visible:border-foreground focus-visible:ring-foreground/20"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label
                  htmlFor="address"
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Address
                </label>
                <Input
                  id="address"
                  placeholder="123 Street Name"
                  className="h-12 rounded-lg border-border bg-muted/30 text-sm focus-visible:border-foreground focus-visible:ring-foreground/20"
                  aria-invalid={!!errors.address}
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-xs text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* City / Postal */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="city"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    City
                  </label>
                  <Input
                    id="city"
                    placeholder="New York"
                    className="h-12 rounded-lg border-border bg-muted/30 text-sm focus-visible:border-foreground focus-visible:ring-foreground/20"
                    aria-invalid={!!errors.city}
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="postalCode"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Postal Code
                  </label>
                  <Input
                    id="postalCode"
                    placeholder="10001"
                    className="h-12 rounded-lg border-border bg-muted/30 text-sm focus-visible:border-foreground focus-visible:ring-foreground/20"
                    aria-invalid={!!errors.postalCode}
                    {...register("postalCode")}
                  />
                  {errors.postalCode && (
                    <p className="text-xs text-red-500">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Country / Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="country"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Country
                  </label>
                  <Input
                    id="country"
                    placeholder="United States"
                    className="h-12 rounded-lg border-border bg-muted/30 text-sm focus-visible:border-foreground focus-visible:ring-foreground/20"
                    aria-invalid={!!errors.country}
                    {...register("country")}
                  />
                  {errors.country && (
                    <p className="text-xs text-red-500">
                      {errors.country.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="h-12 rounded-lg border-border bg-muted/30 text-sm focus-visible:border-foreground focus-visible:ring-foreground/20"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Secure Checkout
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Powered by Stripe
            </span>
          </div>
        </div>

        {/* ── Right: Order Summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-8 space-y-6 rounded-2xl border border-border bg-muted/20 p-6">
            <h2 className="text-lg font-bold uppercase tracking-wide">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-3"
                >
                  <div className="relative h-16 w-16 shrink-0 bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      src={item.product.image || "/placeholder.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background ring-2 ring-background">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.size} / {item.color}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-border" />

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-semibold text-foreground">
                  {isCalculatingTax ? (
                    <span className="flex h-5 w-5 items-center justify-center">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </span>
                  ) : taxAmount > 0 ? (
                    formatPrice(taxAmount)
                  ) : (
                    "Pending detail"
                  )}
                </span>
              </div>
            </div>

            <hr className="border-border" />

            <div className="flex justify-between text-base font-black uppercase">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            {/* Pay button */}
            <Button
              type="submit"
              disabled={isProcessing}
              className="h-14 w-full cursor-pointer rounded-full bg-black text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Pay {formatPrice(total)}
                </span>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
