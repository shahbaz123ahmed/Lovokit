"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  ArrowRight,
  ArrowLeftRight,
  ShoppingCart,
  Star,
  Check,
  CheckCircle2,
  Sparkles,
  Heart,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";

// =============================================================================
// CATEGORIES & BEST SELLERS DATA
// =============================================================================
export const categoryTabs = [
  { id: "all", label: "ALL BEST SELLERS" },
  { id: "oscilloscopes", label: "DIGITAL OSCILLOSCOPES" },
  { id: "power-supply", label: "DC POWER SUPPLY" },
  { id: "waveform", label: "WAVEFORM GENERATORS" },
  { id: "multimeters", label: "DIGITAL MULTIMETERS" },
  { id: "ac-power", label: "AC POWER SOURCE" },
  { id: "lcr-meter", label: "LCR METER" },
];

export const bestSellersProducts = [
  {
    id: "xds3302",
    model: "XDS3302",
    brand: "OWON",
    category: "oscilloscopes",
    title: "14-bit High-Resolution Digital Storage Oscilloscope",
    badgeTitle: "14 bits",
    badgeSubtitle: "High resolution ADC",
    badgeType: "ribbon-adc",
    image: "/images/featured/owon-exact-transparent.png",
    specs: "300 MHz • 2 Channels • 14-bit ADC",
    price: "₹1,45,000",
    originalPrice: "₹1,75,000",
    rating: 5.0,
    reviews: 38,
    inStock: true,
  },
  {
    id: "xds3204e",
    model: "XDS3204E",
    brand: "OWON",
    category: "oscilloscopes",
    title: "4-Channel Touchscreen Color Display Benchtop Scope",
    badgeTitle: "4 Channels",
    badgeSubtitle: "Touchscreen LCD",
    badgeType: "ribbon-channels",
    image: "/images/categories/oscilloscope-transparent.png",
    specs: "200 MHz • 4 Channels • 1 GSa/s",
    price: "₹1,82,000",
    originalPrice: "₹2,15,000",
    rating: 5.0,
    reviews: 52,
    inStock: true,
  },
  {
    id: "xds3204ae",
    model: "XDS3204AE",
    brand: "OWON",
    category: "oscilloscopes",
    title: "Touchscreen Multi-Signal Oscilloscope with Waveform Gen",
    badgeTitle: "4 Channels",
    badgeSubtitle: "Touchscreen LCD",
    badgeType: "ribbon-channels",
    image: "/images/featured/oscilloscope-visual.png",
    specs: "200 MHz • 4 Channels • Touch LCD",
    price: "₹2,10,000",
    originalPrice: "₹2,45,000",
    rating: 5.0,
    reviews: 29,
    inStock: true,
  },
  {
    id: "xds3202e",
    model: "XDS3202E",
    brand: "OWON",
    category: "oscilloscopes",
    title: "200MHz Dual Channel High-Speed Precision Oscilloscope",
    badgeTitle: "14 bits",
    badgeSubtitle: "High resolution ADC",
    badgeType: "ribbon-adc",
    image: "/images/featured/owon-exact-transparent.png",
    specs: "200 MHz • 2 Channels • 1 GSa/s",
    price: "₹1,25,000",
    originalPrice: "₹1,48,000",
    rating: 4.9,
    reviews: 64,
    inStock: true,
  },
  {
    id: "xds3202a",
    model: "XDS3202A",
    brand: "OWON",
    category: "oscilloscopes",
    title: "200MHz 2GSa/s Deep Memory Laboratory Scope",
    badgeTitle: "14 bits",
    badgeSubtitle: "High resolution ADC",
    badgeType: "ribbon-adc",
    image: "/images/categories/oscilloscope-transparent.png",
    specs: "200 MHz • 2 GSa/s • 40M Depth",
    price: "₹1,38,000",
    originalPrice: "₹1,62,000",
    rating: 5.0,
    reviews: 41,
    inStock: true,
  },
  {
    id: "xds3202",
    model: "XDS3202",
    brand: "OWON",
    category: "oscilloscopes",
    title: "14-bit High-Resolution Dual Channel Digital Scope",
    badgeTitle: "14 bits",
    badgeSubtitle: "High resolution ADC",
    badgeType: "ribbon-adc",
    image: "/images/featured/owon-exact-transparent.png",
    specs: "200 MHz • 2 Channels • 14-bit ADC",
    price: "₹1,18,000",
    originalPrice: "₹1,39,000",
    rating: 5.0,
    reviews: 35,
    inStock: true,
  },
  {
    id: "xds3104e",
    model: "XDS3104E",
    brand: "OWON",
    category: "oscilloscopes",
    title: "100MHz 4-Channel Economical Touchscreen Scope",
    badgeTitle: "4 Channels",
    badgeSubtitle: "Touchscreen LCD",
    badgeType: "ribbon-channels",
    image: "/images/categories/oscilloscope-transparent.png",
    specs: "100 MHz • 4 Channels • 1 GSa/s",
    price: "₹96,000",
    originalPrice: "₹1,15,000",
    rating: 4.9,
    reviews: 48,
    inStock: true,
  },
  {
    id: "xds3104ae",
    model: "XDS3104AE",
    brand: "OWON",
    category: "oscilloscopes",
    title: "100MHz 4-Channel Arbitrary Generator Built-In Scope",
    badgeTitle: "4 Channels",
    badgeSubtitle: "Touchscreen LCD",
    badgeType: "ribbon-channels",
    image: "/images/featured/oscilloscope-visual.png",
    specs: "100 MHz • 4 Channels • 25MHz Gen",
    price: "₹1,08,000",
    originalPrice: "₹1,28,000",
    rating: 5.0,
    reviews: 22,
    inStock: true,
  },
  {
    id: "xds3102",
    model: "XDS3102",
    brand: "OWON",
    category: "oscilloscopes",
    title: "100MHz 2-Channel 14-bit High Resolution Storage Scope",
    badgeTitle: "14 bits",
    badgeSubtitle: "High resolution ADC",
    badgeType: "ribbon-adc",
    image: "/images/featured/owon-exact-transparent.png",
    specs: "100 MHz • 2 Channels • 14-bit ADC",
    price: "₹84,000",
    originalPrice: "₹98,000",
    rating: 5.0,
    reviews: 37,
    inStock: true,
  },
  {
    id: "xds3064e",
    model: "XDS3064E",
    brand: "OWON",
    category: "oscilloscopes",
    title: "60MHz 4-Channel Touchscreen Multi-Display Bench Scope",
    badgeTitle: "4 Channels",
    badgeSubtitle: "Touchscreen LCD",
    badgeType: "ribbon-channels",
    image: "/images/categories/oscilloscope-transparent.png",
    specs: "60 MHz • 4 Channels • 1 GSa/s",
    price: "₹76,000",
    originalPrice: "₹89,000",
    rating: 4.9,
    reviews: 28,
    inStock: true,
  },
  {
    id: "spd3303x-e",
    model: "SPD3303X-E",
    brand: "SIGLENT",
    category: "power-supply",
    title: "Programmable Linear DC Power Supply Triple Output",
    badgeTitle: "Triple Output",
    badgeSubtitle: "Isolated 220W",
    badgeType: "ribbon-channels",
    image: "/images/categories/power-supply-transparent.png",
    specs: "32V / 3.2A x 2, 2.5V/3.3V/5V x 1 • 220W",
    price: "₹54,000",
    originalPrice: "₹62,000",
    rating: 5.0,
    reviews: 31,
    inStock: true,
  },
  {
    id: "sp3051",
    model: "SP3051",
    brand: "OWON",
    category: "power-supply",
    title: "Single Channel 30V / 5A DC Regulated Power Supply",
    badgeTitle: "30V / 5A",
    badgeSubtitle: "Linear Regulated",
    badgeType: "ribbon-channels",
    image: "/images/3rd.png",
    specs: "0-30V • 0-5A • <1mV Low Ripple",
    price: "₹18,500",
    originalPrice: "₹22,000",
    rating: 4.9,
    reviews: 36,
    inStock: true,
  },
  {
    id: "odp3033",
    model: "ODP3033",
    brand: "OWON",
    category: "power-supply",
    title: "Triple Output Programmable High Precision DC Power Supply",
    badgeTitle: "Triple Output",
    badgeSubtitle: "Isolated 198W",
    badgeType: "ribbon-channels",
    image: "/images/categories/power-supply-transparent.png",
    specs: "30V / 3A x 2, 6V / 3A x 1 • 198W",
    price: "₹48,000",
    originalPrice: "₹56,000",
    rating: 5.0,
    reviews: 42,
    inStock: true,
  },
  {
    id: "utg962e",
    model: "UTG962E",
    brand: "UNI-T",
    category: "waveform",
    title: "60MHz Dual-Channel Function / Arbitrary Waveform Generator",
    badgeTitle: "60 MHz Gen",
    badgeSubtitle: "200 MSa/s DDS",
    badgeType: "ribbon-channels",
    image: "/images/2nd.png",
    specs: "60 MHz • 2 Channels • 200 MSa/s • DDS",
    price: "₹24,500",
    originalPrice: "₹28,000",
    rating: 4.9,
    reviews: 47,
    inStock: true,
  },
  {
    id: "dge2035",
    model: "DGE2035",
    brand: "OWON",
    category: "waveform",
    title: "35MHz Single-Channel Arbitrary Function Waveform Generator",
    badgeTitle: "35 MHz Gen",
    badgeSubtitle: "125 MSa/s DDS",
    badgeType: "ribbon-channels",
    image: "/images/featured/oscilloscope-visual.png",
    specs: "35 MHz • 1 Channel • 125 MSa/s • DDS",
    price: "₹14,500",
    originalPrice: "₹17,000",
    rating: 4.8,
    reviews: 29,
    inStock: true,
  },
  {
    id: "xdg3102",
    model: "XDG3102",
    brand: "OWON",
    category: "waveform",
    title: "100MHz Dual-Channel Arbitrary Waveform Generator Touch LCD",
    badgeTitle: "100 MHz Gen",
    badgeSubtitle: "500 MSa/s DDS",
    badgeType: "ribbon-adc",
    image: "/images/2nd.png",
    specs: "100 MHz • 2 Channels • 500 MSa/s • 1.2M Pts",
    price: "₹46,000",
    originalPrice: "₹54,000",
    rating: 5.0,
    reviews: 38,
    inStock: true,
  },
  {
    id: "xdm3051",
    model: "XDM3051",
    brand: "OWON",
    category: "multimeters",
    title: "5½ Digits True-RMS Precision Benchtop Digital Multimeter",
    badgeTitle: "5½ Digits",
    badgeSubtitle: "True RMS DMM",
    badgeType: "ribbon-adc",
    image: "/images/4th.png",
    specs: "480k rdg/s • 0.015% DCV • Trend Plot",
    price: "₹38,000",
    originalPrice: "₹44,000",
    rating: 5.0,
    reviews: 45,
    inStock: true,
  },
  {
    id: "xdm1041",
    model: "XDM1041",
    brand: "OWON",
    category: "multimeters",
    title: "55,000 Counts High-Precision Economical Bench Digital Multimeter",
    badgeTitle: "55,000 Counts",
    badgeSubtitle: "Compact Bench DMM",
    badgeType: "ribbon-channels",
    image: "/images/categories/multimeter-transparent.png",
    specs: "55,000 Counts • 0.05% DCV • True RMS",
    price: "₹18,500",
    originalPrice: "₹22,000",
    rating: 4.9,
    reviews: 33,
    inStock: true,
  },
  {
    id: "ut61e-plus",
    model: "UT61E+",
    brand: "UNI-T",
    category: "multimeters",
    title: "22,000 Counts Professional True-RMS Digital Industrial Multimeter",
    badgeTitle: "22,000 Counts",
    badgeSubtitle: "CAT III 1000V",
    badgeType: "ribbon-channels",
    image: "/images/categories/multimeter-transparent.png",
    specs: "1000V AC/DC • 220mF • USB PC Connect",
    price: "₹12,800",
    originalPrice: "₹15,000",
    rating: 5.0,
    reviews: 58,
    inStock: true,
  },
  {
    id: "aps3005",
    model: "APS3005",
    brand: "MATRIX",
    category: "ac-power",
    title: "300W Programmable Variable Frequency AC Power Source",
    badgeTitle: "300 VA",
    badgeSubtitle: "45-500 Hz AC",
    badgeType: "ribbon-channels",
    image: "/images/3rd.png",
    specs: "0-300V • 45-500 Hz • Low Distortion",
    price: "₹68,000",
    originalPrice: "₹79,000",
    rating: 4.9,
    reviews: 24,
    inStock: true,
  },
  {
    id: "aps7050",
    model: "APS7050",
    brand: "MATRIX",
    category: "ac-power",
    title: "500VA High-Stability Benchtop AC Power Source Converter",
    badgeTitle: "500 VA",
    badgeSubtitle: "Precision AC Source",
    badgeType: "ribbon-channels",
    image: "/images/categories/power-supply-transparent.png",
    specs: "0-300V • 4.2A • High Inrush Capability",
    price: "₹92,000",
    originalPrice: "₹1,08,000",
    rating: 5.0,
    reviews: 19,
    inStock: true,
  },
  {
    id: "odp6152",
    model: "ODP6152",
    brand: "OWON",
    category: "ac-power",
    title: "150W Linear AC/DC Dual Output Regulated Laboratory Source",
    badgeTitle: "150 W",
    badgeSubtitle: "Isolated Dual AC",
    badgeType: "ribbon-channels",
    image: "/images/3rd.png",
    specs: "0-60V / 0-2.5A • USB/LAN Remote",
    price: "₹34,000",
    originalPrice: "₹39,000",
    rating: 4.8,
    reviews: 17,
    inStock: true,
  },
  {
    id: "lcr-8210",
    model: "LCR-8210",
    brand: "MATRIX",
    category: "lcr-meter",
    title: "100kHz High-Precision Digital Laboratory LCR Component Meter",
    badgeTitle: "100 kHz LCR",
    badgeSubtitle: "0.05% Basic Accuracy",
    badgeType: "ribbon-adc",
    image: "/images/6th.png",
    specs: "10 Hz - 100 kHz • 0.05% • SMD Fixture",
    price: "₹72,000",
    originalPrice: "₹85,000",
    rating: 5.0,
    reviews: 26,
    inStock: true,
  },
  {
    id: "lcr-8010",
    model: "LCR-8010",
    brand: "MATRIX",
    category: "lcr-meter",
    title: "10kHz Digital Auto-Ranging Component LCR Bridge Tester",
    badgeTitle: "10 kHz LCR",
    badgeSubtitle: "Auto Bench Bridge",
    badgeType: "ribbon-channels",
    image: "/images/categories/oscilloscope-transparent.png",
    specs: "100 Hz - 10 kHz • 0.1% • Dual Display",
    price: "₹42,000",
    originalPrice: "₹49,000",
    rating: 4.9,
    reviews: 21,
    inStock: true,
  },
  {
    id: "ut612",
    model: "UT612",
    brand: "UNI-T",
    category: "lcr-meter",
    title: "20kHz Handheld Precision Smart Component LCR Meter with USB",
    badgeTitle: "20 kHz LCR",
    badgeSubtitle: "Handheld Smart LCR",
    badgeType: "ribbon-channels",
    image: "/images/4th.png",
    specs: "100 Hz - 20 kHz • Auto L/C/R/D/Q • USB",
    price: "₹16,500",
    originalPrice: "₹19,000",
    rating: 4.8,
    reviews: 35,
    inStock: true,
  },
];

export default function TrendingBestSellers() {
  const [activeTab, setActiveTab] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  // Scroll Trigger Entrance Observer
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter products by category tab:
  // "all mein sirf six 3 in a row 3 in a row" -> exactly 6 items
  // "individual pe 3 only" -> exactly 3 items
  const filteredProducts =
    activeTab === "all"
      ? bestSellersProducts.slice(0, 6)
      : bestSellersProducts.filter((p) => p.category === activeTab).slice(0, 3);

  const handleCompareClick = (id) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section
      ref={sectionRef}
      id="trending-best-sellers"
      aria-label="Trending Best Sellers"
      className="py-10 sm:py-20 lg:py-24 bg-[#F8F9FA] border-t border-slate-200/70 relative overflow-hidden"
    >
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Soft upper ambient highlight */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[140%] max-w-[1700px] h-[550px] rounded-[100%] bg-gradient-to-b from-white/60 via-transparent to-transparent blur-3xl" />
        {/* Subtle warm corner ambient glow */}
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#FFC400]/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================================= */}
        {/* SECTION HEADER: Title, Description & View All Catalog Link   */}
        {/* ============================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-4 sm:mb-10">
          <div className="max-w-2xl">
            {/* Top Eyebrow Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-[#FFC400]/50 text-slate-900 text-[11px] sm:text-xs font-black tracking-wider uppercase mb-2.5 sm:mb-3.5 shadow-2xs ${
                isVisible ? "animate-hero-badge" : "opacity-0"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
              <span>CONTRACTOR FAVORITES • PROCUREMENT PICKS</span>
            </div>

            {/* Main Section Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.08]">
              <span
                className={`text-slate-950 block ${
                  isVisible ? "animate-hero-heading-1" : "opacity-0"
                }`}
              >
                TRENDING
              </span>
              <span
                className={`text-[#FFB800] block mt-1.5 ${
                  isVisible ? "animate-hero-heading-2" : "opacity-0"
                }`}
              >
                BEST SELLERS.
              </span>
            </h2>

            {/* Sub-description */}
            <p
              className={`mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[14px] text-slate-600 font-normal leading-relaxed max-w-xl ${
                isVisible ? "animate-hero-desc" : "opacity-0"
              }`}
            >
              Highest re-ordered oscilloscopes, DC power supplies, signal
              generators, and testing meters based on monthly laboratory and
              factory procurements.
            </p>
          </div>

          {/* Top-Right "View All Catalog" Button */}
          <div
            className={`flex-shrink-0 ${
              isVisible ? "animate-hero-actions" : "opacity-0"
            }`}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-950 border border-slate-200 hover:border-slate-950 text-xs sm:text-sm font-extrabold text-slate-800 hover:text-white shadow-xs hover:shadow-lg transition-all duration-200"
            >
              <span>VIEW ALL CATALOG</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#FFB800] group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* ============================================================= */}
        {/* CATEGORY TABS (Interactive Filtering with Underline/Pill)    */}
        {/* ============================================================= */}
        <div
          className={`mb-4 sm:mb-8 border-b-0 sm:border-b border-slate-200/80 pb-1 sm:pb-3 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isVisible ? "animate-hero-trust" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
            {categoryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[12.5px] font-black tracking-wider uppercase transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? "bg-slate-950 text-white shadow-md shadow-slate-950/15"
                      : "bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-200/80"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="hidden sm:block absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-[#FFC400] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================= */}
        {/* PRODUCT CARDS GRID (3 in a row Desktop, 2 Tablet, 1 Mobile)  */}
        {/* ALL: 6 items (3 in a row, 3 in a row) | Individual: 3 items   */}
        {/* ============================================================= */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 ${
            isVisible ? "animate-about-cards-appear" : "opacity-0"
          }`}
        >
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className={`group relative rounded-[22px] sm:rounded-[26px] bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(255,196,0,0.14)] hover:border-[#FFC400]/80 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between overflow-hidden ${
                activeTab === "all" && idx >= 4 ? "hidden sm:flex" : "flex"
              }`}
            >
              <div>
                {/* 1. Top Badges & Stock Status */}
                <div className="flex items-start justify-between gap-1.5 mb-2.5 min-h-[32px]">
                  {/* Model Feature Ribbon Badge (matching reference banner with luxury gradient) */}
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-gradient-to-r from-amber-500 via-[#FFB800] to-amber-400 text-slate-950 shadow-xs border border-amber-300/60">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] sm:text-[10.5px] font-black tracking-tight leading-none text-slate-950">
                        {product.badgeTitle}
                      </span>
                      {product.badgeSubtitle && (
                        <span className="text-[7.5px] sm:text-[8px] font-extrabold tracking-tight leading-none text-slate-900/80 mt-0.5">
                          {product.badgeSubtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock status indicator & Wishlist Toggle */}
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-emerald-700 bg-emerald-50/90 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>In Stock</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      aria-label="Save to Wishlist"
                      className="p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-100 transition-colors cursor-pointer"
                      title={isInWishlist(product.id) ? "Saved in Wishlist" : "Save to Wishlist"}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-all ${
                          isInWishlist(product.id)
                            ? "fill-rose-500 text-rose-500 scale-110"
                            : "text-slate-400 hover:text-rose-500"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 2. Product Image Showcase (Clean, high-res centered visual) */}
                <Link
                  href={`/products/${product.id}`}
                  className="relative w-full h-44 sm:h-36 lg:h-40 flex items-center justify-center pt-2 pb-1 overflow-hidden block"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={`${product.brand} ${product.model}`}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 30vw, 18vw"
                      className="object-contain filter drop-shadow-xs select-none transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* 3. Product Info: Brand, Model, Request Quote & Ratings */}
                <div className="pt-2">
                  <span className="text-[9.5px] sm:text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                    {product.brand}
                  </span>

                  <Link href={`/products/${product.id}`} className="block group-hover:text-amber-600 transition-colors">
                    <h3 className="text-base sm:text-[16px] font-black text-slate-950 tracking-tight leading-snug mt-0.5 truncate">
                      {product.model}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between gap-1 mt-1">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-[10px] sm:text-[10.5px] font-black tracking-wider uppercase text-amber-600 hover:text-amber-700"
                    >
                      VIEW DETAILS
                    </Link>

                    {/* 5-Star Rating */}
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-2.5 h-2.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                      <span className="text-[9.5px] font-bold text-slate-500 ml-0.5">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10.5px] sm:text-[11px] text-slate-500 leading-snug truncate mt-1">
                    {product.specs}
                  </p>
                </div>
              </div>

              {/* 4. Pricing & Procurement Row */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-1">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-slate-400 block -mb-0.5">
                      B2B CONTRACTOR
                    </span>
                    <span className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                      {product.price}
                    </span>
                  </div>
                  {product.originalPrice && (
                    <span className="text-[10.5px] sm:text-xs font-semibold text-slate-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Bottom Action Bar: Compare & Buy Button */}
                <div className="flex items-center gap-1.5 pt-1">
                  {/* Compare action button */}
                  <button
                    type="button"
                    onClick={() => handleCompareClick(product.id)}
                    aria-label={`Compare ${product.model}`}
                    className={`flex-1 py-1.5 px-2 rounded-lg border text-[10px] sm:text-[10.5px] font-bold inline-flex items-center justify-center gap-1 transition-all duration-150 cursor-pointer ${
                      copiedId === product.id
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200/90 text-slate-700"
                    }`}
                  >
                    {copiedId === product.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ArrowLeftRight className="w-3 h-3 text-slate-500 stroke-[2]" />
                        <span>Compare</span>
                      </>
                    )}
                  </button>

                  {/* Buy Button (Adds to cart & opens Cart Drawer) */}
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1, true)}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-slate-950 hover:bg-[#FFC400] text-white hover:text-black text-[10.5px] sm:text-[11px] font-black tracking-wide uppercase inline-flex items-center justify-center gap-1 transition-all duration-200 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <ShoppingCart className="w-3 h-3 stroke-[2.5]" />
                    <span>BUY</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-white border border-slate-300 font-extrabold text-xs uppercase tracking-wider text-slate-900 shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
          >
            <span>VIEW ALL CATALOG</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#FFB800]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
