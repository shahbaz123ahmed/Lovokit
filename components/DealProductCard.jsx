"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";

// =========================================================================
// DEFAULT PRODUCT DATA
// Fully editable via props:
// <DealProductCard product={{ image: "/...", brand: "...", name: "...", ... }} />
// =========================================================================
export const defaultDealProduct = {
  id: "owon-owh6522-s",
  brand: "OWON",
  name: "OWH6522-S",
  discountBadge: "-15% OFF",
  stockBadge: "Low Stock",
  image: "/images/featured/owon-exact-transparent.png",
  price: "₹1,92,000",
  originalPrice: "₹2,25,000",
  taxNote: "GST not included",
  ctaText: "BUY DEAL",
  ctaLink: "/products",
};

export default function DealProductCard({
  product = defaultDealProduct,
  className = "",
  isVisible = true,
}) {
  const p = { ...defaultDealProduct, ...product };

  return (
    /**
     * OUTER CARD SHELL
     * — Pure white, large rounded corners (40px), no skew/transform.
     * — Subtle light-grey border + layered soft shadow.
     * — The yellow left-top partial border is painted as two absolute divs.
     * — overflow-hidden keeps everything inside the rounded corners.
     */
    <div
      className={`
        relative w-full
        rounded-[32px] sm:rounded-[40px]
        bg-white
        border border-slate-200
        shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]
        overflow-hidden
        shrink-0
        transition-all duration-300
        ${isVisible ? "animate-about-cards-appear" : "opacity-0"}
        ${className}
      `}
    >
      {/* ── YELLOW TOP-LEFT CORNER ACCENT ──────────────────────────────── */}
      {/* Top horizontal bar: left → fades right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[3.5px] w-[38%] bg-gradient-to-r from-[#FFC400] via-[#FFC400]/70 to-transparent z-30"
      />
      {/* Left vertical bar: top → fades downward */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[3.5px] h-[40%] bg-gradient-to-b from-[#FFC400] via-[#FFC400]/60 to-transparent z-30"
      />

      {/* ── ALL CARD CONTENT — no skew, fully straight ─────────────────── */}
      <div className="relative z-10 p-5 sm:p-7 flex flex-col gap-0">

        {/* ── TOP BADGES ROW ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3 mb-4">
          {/* Left: yellow discount badge */}
          {p.discountBadge && (
            <span
              className="
                inline-flex items-center justify-center
                px-4 py-1.5
                rounded-full
                bg-[#FFC400] text-black
                font-black text-sm
                tracking-tight
                shadow-[0_4px_14px_rgba(255,196,0,0.45)]
                select-none
              "
            >
              {p.discountBadge}
            </span>
          )}

          {/* Right: white stock badge */}
          {p.stockBadge && (
            <span
              className="
                inline-flex items-center gap-1.5
                px-4 py-1.5
                rounded-full
                bg-white border border-slate-200
                text-slate-700 font-semibold text-sm
                shadow-sm
                select-none
                ml-auto
              "
            >
              <Package className="w-4 h-4 text-slate-600 stroke-[2]" />
              {p.stockBadge}
            </span>
          )}
        </div>

        {/* ── PRODUCT IMAGE AREA (~60 % of card height) ───────────────── */}
        <div className="relative w-full h-[200px] sm:h-[260px] lg:h-[280px] flex items-center justify-center">
          <Image
            src={p.image}
            alt={`${p.brand} ${p.name}`}
            fill
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 55vw, 700px"
            className="object-contain select-none"
          />
        </div>

        {/* ── THIN HORIZONTAL DIVIDER ─────────────────────────────────── */}
        <div className="w-full h-px bg-slate-100 my-5" />

        {/* ── BOTTOM 3-COLUMN INFO BAR ────────────────────────────────── */}
        <div className="flex items-center justify-between gap-0">

          {/* Col 1 — Brand + Model */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Yellow vertical indicator pill */}
            <div className="w-[4px] h-10 bg-[#FFC400] rounded-full shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase block">
                {p.brand}
              </span>
              <span className="text-lg sm:text-xl font-black text-slate-950 tracking-tight block leading-tight mt-0.5">
                {p.name}
              </span>
            </div>
          </div>

          {/* Vertical separator */}
          <div className="w-px h-11 bg-slate-200 mx-5 shrink-0" />

          {/* Col 2 — Price */}
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-none">
                {p.price}
              </span>
            </div>
            {p.originalPrice && (
              <span className="text-sm font-medium text-slate-400 line-through block mt-0.5">
                {p.originalPrice}
              </span>
            )}
            <span className="text-[11px] text-slate-500 block mt-0.5">
              {p.taxNote}
            </span>
          </div>

          {/* Vertical separator */}
          <div className="w-px h-11 bg-slate-200 mx-5 shrink-0" />

          {/* Col 3 — CTA button */}
          <div className="shrink-0">
            <Link
              href={p.ctaLink}
              className="
                inline-flex items-center justify-center gap-2
                bg-[#111111] hover:bg-zinc-900
                text-white font-black text-sm sm:text-[15px]
                px-6 sm:px-8 py-3.5 sm:py-4
                rounded-full
                shadow-lg
                active:scale-95
                transition-all duration-200
                whitespace-nowrap
                tracking-tight
              "
            >
              {p.ctaText}
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
