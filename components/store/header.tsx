"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { CartSheet } from "./cart-sheet";

export function Header() {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Marquee banner */}
      <div className="overflow-hidden bg-primary text-primary-foreground py-1.5">
        <div className="animate-marquee whitespace-nowrap text-xs font-medium tracking-widest uppercase">
          WE DON&apos;T FOLLOW TRENDS. WE SET THEM. — NO THRONE GIVEN. ONLY
          TAKEN.
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-sm p-6">
            <nav className="flex flex-col gap-4 pt-8">
              <Link
                href="/"
                className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/collections"
                className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collection
              </Link>
              <hr className="my-4" />
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      className="text-lg font-medium text-primary transition-colors hover:text-primary/80"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-thehoodx.png"
            alt="The-Hoodx"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
          <span
            className="text-sm sm:text-xl font-black uppercase tracking-[0.15em] text-foreground"
            style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
          >
            THE-HØØDX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/collections"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Collections
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search */}
          {searchOpen ? (
            <div className="absolute inset-x-0 top-0 z-50 flex h-16 items-center gap-2 bg-background px-4 sm:px-6 lg:px-8">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/collections?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {/* User */}
          <Link href={user ? "/account" : "/login"}>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <User className="h-5 w-5" />
              <span className="sr-only">{user ? "Account" : "Sign in"}</span>
            </Button>
          </Link>

          {/* Cart */}
          <CartSheet>
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
          </CartSheet>
        </div>
      </div>
    </header>
  );
}
