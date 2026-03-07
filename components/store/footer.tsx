"use client";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-[#0A0A0A] text-white">
      {/* Large background brand watermark */}
      <div
        className="pointer-events-none absolute inset-0 hidden items-center justify-center select-none sm:flex"
        aria-hidden
      >
        <span
          className="text-[12rem] font-black uppercase tracking-[0.2em] text-white/[0.03]"
          style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
        >
          HØØDX
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="border-b border-white/10 py-16">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand */}
            <div className="space-y-6 text-center md:text-left">
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/logo-thehoodx.png"
                  alt="The-Hoodx"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
                <span
                  className="text-2xl font-black uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                  }}
                >
                  THE-HØØDX
                </span>
              </Link>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-400 md:mx-0">
                Born from the streets, built for royalty. We don&apos;t follow
                trends — we set them.
              </p>
              <div className="flex items-center justify-center gap-4 md:justify-start">
                <a
                  href="https://instagram.com/thehoodx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:border-white/30 hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="mailto:thehoodxuk@gmail.com"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:border-white/30 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6 text-center md:text-left">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
                Shop
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/collections"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    New Drops
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-6 text-center md:text-left">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
                Get in Touch
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center justify-center gap-3 text-gray-400 md:justify-start">
                  <Mail className="h-4 w-4 shrink-0 text-white/40" />
                  <a
                    href="mailto:thehoodxuk@gmail.com"
                    className="transition-colors hover:text-white"
                  >
                    thehoodxuk@gmail.com
                  </a>
                </li>
                <li className="flex items-center justify-center gap-3 text-gray-400 md:justify-start">
                  <Phone className="h-4 w-4 shrink-0 text-white/40" />
                  <span>+1 (581) 991-6263</span>
                </li>
                <li className="flex items-center justify-center gap-3 text-gray-400 md:justify-start">
                  <MapPin className="h-4 w-4 shrink-0 text-white/40" />
                  <span>Quebec, Canada</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} THE-HØØDX. All rights reserved.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/20">
            Street Royalty
          </p>
        </div>
      </div>
    </footer>
  );
}
