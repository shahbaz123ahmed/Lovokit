"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  Award,
  Truck,
  FileText,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Eye,
  ShoppingCart,
  Heart,
  Wrench,
  Search,
  ExternalLink,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { productsData } from "@/data/products";
import { useShop } from "@/context/ShopContext";

// Comprehensive Brand Catalogs Config matching and exceeding user's reference
const brandCatalogsData = {
  matrix: {
    id: "matrix",
    name: "Matrix",
    brandParam: "MATRIX",
    tag: "AUTHORIZED CHANNEL PARTNER",
    logo: "/images/partners/matrix_color.png",
    logoWidth: 160,
    logoHeight: 50,
    catalogTitle: "MATRIX INDUSTRIAL CATALOG",
    description:
      "Browse original Matrix power tools, test instruments, replacement parts, and accessories with serialized authenticity tags.",
    categories: [
      {
        id: "ac-power-source",
        name: "AC Power Source",
        image: "/images/3rd.png",
        filterQuery: "AC Power Source",
      },
      {
        id: "dc-power-supply",
        name: "DC Power Supply",
        image: "/images/categories/power-supply-transparent.png",
        filterQuery: "Power Supplies",
      },
      {
        id: "digital-multimeter",
        name: "Digital Multimeter",
        image: "/images/4th.png",
        filterQuery: "Multimeters",
      },
      {
        id: "digital-oscilloscope",
        name: "Digital Oscilloscope",
        image: "/images/featured/oscilloscope-visual.png",
        filterQuery: "Oscilloscopes",
      },
      {
        id: "discontinued-products",
        name: "Discontinued Products",
        image: "/images/4th.png",
        filterQuery: "Multimeters",
      },
      {
        id: "electrical-safety-tester",
        name: "Electrical Safety Tester",
        image: "/images/categories/data-acquisition-transparent.png",
        filterQuery: "Data Acquisition",
      },
      {
        id: "electronic-load",
        name: "Electronic Load",
        image: "/images/2nd.png",
        filterQuery: "Power Supplies",
      },
      {
        id: "function-generator",
        name: "Function Generator",
        image: "/images/2nd.png",
        filterQuery: "Waveform Generators",
      },
      {
        id: "lcr-meter",
        name: "LCR Meter",
        image: "/images/6th.png",
        filterQuery: "LCR Meter",
      },
      {
        id: "power-meter",
        name: "Power Meter",
        image: "/images/3rd.png",
        filterQuery: "AC Power Source",
      },
      {
        id: "spectrum-analyzer",
        name: "Spectrum Analyzers & RF",
        image: "/images/categories/spectrum-analyzer-transparent.png",
        filterQuery: "Spectrum Analyzers",
      },
    ],
  },
  lovosis: {
    id: "lovosis",
    name: "Lovosis",
    brandParam: "LOVOSIS",
    tag: "AUTHORIZED CHANNEL PARTNER",
    logo: "/images/partners/lovosis_color.webp",
    logoWidth: 160,
    logoHeight: 50,
    catalogTitle: "LOVOSIS INDUSTRIAL CATALOG",
    description:
      "Browse original Lovosis power tools, test automation platforms, replacement parts, and accessories with serialized authenticity tags.",
    categories: [
      {
        id: "digital-oscilloscope",
        name: "Digital Oscilloscope",
        image: "/images/featured/owon-exact-transparent.png",
        filterQuery: "Oscilloscopes",
      },
      {
        id: "industrial-test-automation",
        name: "Industrial Test Automation",
        image: "/images/categories/data-acquisition-transparent.png",
        filterQuery: "Data Acquisition",
      },
      {
        id: "electronic-hardware-platforms",
        name: "Electronic Hardware Platforms",
        image: "/images/categories/trainer-kit-transparent.png",
        filterQuery: "Trainer Kits",
      },
      {
        id: "sensors-signal-interfaces",
        name: "Sensors & Signal Interfaces",
        image: "/images/categories/spectrum-analyzer-transparent.png",
        filterQuery: "Data Acquisition",
      },
      {
        id: "smart-measurement-solutions",
        name: "Smart Measurement Solutions",
        image: "/images/4th.png",
        filterQuery: "Multimeters",
      },
      {
        id: "benchtop-power-modules",
        name: "Benchtop Power Modules",
        image: "/images/categories/power-supply-transparent.png",
        filterQuery: "Power Supplies",
      },
    ],
  },
  owon: {
    id: "owon",
    name: "Owon",
    brandParam: "OWON",
    tag: "AUTHORIZED CHANNEL PARTNER",
    logo: "/images/partners/owon_color.png",
    logoWidth: 140,
    logoHeight: 45,
    catalogTitle: "OWON INDUSTRIAL CATALOG",
    description:
      "Browse original Owon digital oscilloscopes, benchtop multimeters, waveform generators, and accessories with serialized authenticity tags.",
    categories: [
      {
        id: "digital-storage-oscilloscopes",
        name: "Digital Storage Oscilloscopes",
        image: "/images/featured/oscilloscope-visual.png",
        filterQuery: "Oscilloscopes",
      },
      {
        id: "handheld-multi-instruments",
        name: "Handheld Multi-Instruments",
        image: "/images/featured/owon-exact-transparent.png",
        filterQuery: "Oscilloscopes",
      },
      {
        id: "benchtop-multimeters",
        name: "Benchtop Multimeters",
        image: "/images/4th.png",
        filterQuery: "Multimeters",
      },
      {
        id: "arbitrary-waveform-generators",
        name: "Arbitrary Waveform Generators",
        image: "/images/2nd.png",
        filterQuery: "Waveform Generators",
      },
      {
        id: "dc-power-supplies",
        name: "DC Power Supplies",
        image: "/images/categories/power-supply-transparent.png",
        filterQuery: "Power Supplies",
      },
      {
        id: "ac-power-sources",
        name: "AC Power Sources",
        image: "/images/3rd.png",
        filterQuery: "AC Power Source",
      },
      {
        id: "spectrum-analyzers",
        name: "Spectrum Analyzers",
        image: "/images/categories/spectrum-analyzer-transparent.png",
        filterQuery: "Spectrum Analyzers",
      },
      {
        id: "pc-usb-virtual-scopes",
        name: "PC USB Virtual Scopes",
        image: "/images/featured/owon-exact-crop.png",
        filterQuery: "Oscilloscopes",
      },
    ],
  },
};

export default function DynamicBrandPage() {
  const router = useRouter();
  const params = useParams();
  const rawBrand = (params?.brand || "matrix").toString().toLowerCase();

  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  // Find or generate brand data
  const brand = useMemo(() => {
    if (brandCatalogsData[rawBrand]) {
      return brandCatalogsData[rawBrand];
    }
    // Dynamic Fallback for any brand (e.g. rigol, siglent, uni-t)
    const upperName = rawBrand.toUpperCase();
    const matchingProducts = productsData.filter(
      (p) => p.brand.toLowerCase() === rawBrand
    );
    const uniqueCats = Array.from(
      new Set(matchingProducts.map((p) => p.categoryName || p.category))
    );

    return {
      id: rawBrand,
      name: upperName,
      brandParam: upperName,
      tag: "AUTHORIZED CHANNEL PARTNER",
      logo:
        rawBrand === "matrix"
          ? "/images/partners/matrix_color.png"
          : rawBrand === "owon"
          ? "/images/partners/owon_color.png"
          : "/images/partners/lovosis_color.webp",
      logoWidth: 150,
      logoHeight: 45,
      catalogTitle: `${upperName} INDUSTRIAL CATALOG`,
      description: `Browse original ${upperName} power tools, test instruments, replacement parts, and accessories with serialized authenticity tags.`,
      categories:
        uniqueCats.length > 0
          ? uniqueCats.map((c, idx) => ({
              id: `cat-${idx}`,
              name: c,
              image:
                matchingProducts.find(
                  (p) => (p.categoryName || p.category) === c
                )?.image || "/images/featured/oscilloscope-visual.png",
              filterQuery: c,
            }))
          : [
              {
                id: "digital-oscilloscope",
                name: "Digital Oscilloscope",
                image: "/images/featured/oscilloscope-visual.png",
                filterQuery: "Oscilloscopes",
              },
              {
                id: "dc-power-supply",
                name: "DC Power Supply",
                image: "/images/categories/power-supply-transparent.png",
                filterQuery: "Power Supplies",
              },
            ],
    };
  }, [rawBrand]);

  // Filter actual products for this brand
  const brandProducts = useMemo(() => {
    return productsData.filter(
      (p) => p.brand.toLowerCase() === brand.id.toLowerCase()
    );
  }, [brand.id]);

  // Toast notification
  const [toastMsg, setToastMsg] = useState("");
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Newsletter State
  const [digestEmail, setDigestEmail] = useState("");
  const [digestSubscribed, setDigestSubscribed] = useState(false);

  const handleDigestSubmit = (e) => {
    e.preventDefault();
    if (digestEmail.trim()) {
      setDigestSubscribed(true);
      setTimeout(() => setDigestEmail(""), 3500);
    }
  };

  const handleOpenCheckout = (product) => {
    addToCart(product, 1, false);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* Floating Notification Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#FFC400]" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. OFFICIAL BRAND HERO BANNER (MATCHING & ELEVATING REFERENCE IMAGES) */}
      {/* ===================================================================== */}
      <section className="relative w-full bg-[#0A0D13] text-white pt-28 pb-14 sm:pt-36 sm:pb-20 border-b border-white/10 overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute -top-24 right-1/4 w-[500px] h-[350px] bg-[#FFC400]/[0.08] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[250px] bg-red-500/[0.05] rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:36px_36px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumb row: @ HOME > BRANDS > [BRAND] */}
          <nav className="flex items-center gap-2 text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-6 sm:mb-8">
            <Link
              href="/"
              className="hover:text-[#FFC400] transition-colors flex items-center gap-1"
            >
              <span>@ HOME</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link
              href="/brands"
              className="hover:text-[#FFC400] transition-colors"
            >
              BRANDS
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-black">{brand.name}</span>
          </nav>

          {/* Main Hero Card with Logo Box & Metadata */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            {/* White Rounded Brand Logo Box */}
            <div className="w-36 sm:w-44 h-24 sm:h-28 bg-white rounded-2xl shadow-lg border border-slate-200/90 flex items-center justify-center p-4 flex-shrink-0">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.logoWidth}
                height={brand.logoHeight}
                className="object-contain max-h-14 sm:max-h-16 w-auto"
                priority
              />
            </div>

            {/* Brand Title, Badges, Description & Counter */}
            <div className="flex-1 min-w-0">
              {/* Badges Strip */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {/* Red Channel Partner Badge matching reference */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-[11px] font-black uppercase tracking-wider shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                  <span>AUTHORIZED CHANNEL PARTNER</span>
                </span>

                {/* Green OEM Supply Badge matching reference */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Direct OEM Supply</span>
                </span>

                {/* Gold Serialized Authenticity Tag */}
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC400]/15 border border-[#FFC400]/30 text-[#FFC400] text-[11px] font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>Serialized Authenticity Tags</span>
                </span>
              </div>

              {/* Catalog Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                {brand.name}{" "}
                <span className="text-[#FFC400]">INDUSTRIAL CATALOG</span>
              </h1>

              {/* Subtitle Description */}
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-normal">
                {brand.description}
              </p>

              {/* Counter Strip & Action Link */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-extrabold">
                <div className="flex items-center gap-3 text-slate-300">
                  <span>
                    Total Categories:{" "}
                    <strong className="text-white font-black text-sm">
                      {brand.categories.length}
                    </strong>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span>
                    In-Stock Units:{" "}
                    <strong className="text-[#FFC400] font-black text-sm">
                      {brandProducts.length > 0 ? brandProducts.length : "Available on RFQ"}
                    </strong>
                  </span>
                </div>

                <Link
                  href={`/products?brand=${brand.brandParam}`}
                  className="inline-flex items-center gap-1.5 text-[#FFC400] hover:text-white transition-colors cursor-pointer"
                >
                  <span>View All {brand.name} Products</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. AUTHORIZED TOOLING DIVISIONS - CATEGORIES UNDER BRAND              */}
      {/* ===================================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header matching reference with premium styling */}
          <div className="mb-8 sm:mb-12">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block mb-1">
              AUTHORIZED TOOLING DIVISIONS
            </span>
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 text-red-600 flex items-center justify-center shadow-2xs">
                <Wrench className="w-4 h-4 stroke-[2.5]" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
                CATEGORIES UNDER {brand.name}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl">
              Inspect verified divisions and testing instrumentation engineered by {brand.name}. Click View to browse models.
            </p>
          </div>

          {/* 5-Column Responsive Category Cards Grid (Matching & Elevating Reference) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {brand.categories.map((cat, idx) => (
              <div
                key={cat.id || idx}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#FFC400] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Image Box */}
                  <Link
                    href={`/products?brand=${brand.brandParam}&search=${encodeURIComponent(cat.filterQuery || cat.name)}`}
                    className="h-36 sm:h-40 w-full bg-gradient-to-b from-slate-50 via-[#F8FAFC] to-white rounded-xl flex items-center justify-center p-3 mb-3 relative overflow-hidden group-hover:bg-amber-50/20 transition-colors block cursor-pointer"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-contain p-2 group-hover:scale-108 transition-transform duration-500 filter contrast-[1.02]"
                    />
                  </Link>

                  {/* Label CATEGORY */}
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
                    CATEGORY
                  </div>

                  {/* Category Title */}
                  <Link
                    href={`/products?brand=${brand.brandParam}&search=${encodeURIComponent(cat.filterQuery || cat.name)}`}
                    className="block group-hover:text-amber-600 transition-colors"
                  >
                    <h3 className="text-xs sm:text-sm font-black text-slate-950 group-hover:text-amber-600 leading-tight line-clamp-2 min-h-[32px] sm:min-h-[36px]">
                      {cat.name}
                    </h3>
                  </Link>
                </div>

                {/* Bottom Bar: EXPLORE on left, Red VIEW button on right matching reference */}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-400 group-hover:text-slate-700 transition-colors">
                    EXPLORE
                  </span>

                  <Link
                    href={`/products?brand=${brand.brandParam}&search=${encodeURIComponent(cat.filterQuery || cat.name)}`}
                    className="inline-flex items-center gap-1 bg-[#E02424] hover:bg-[#C81E1E] text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>VIEW</span>
                    <ArrowRight className="w-3 h-3 stroke-[3]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. ACTIVE BRAND INSTRUMENTS IN STOCK (HIGH-CONVERTING E-COMMERCE HUB) */}
      {/* ===================================================================== */}
      {brandProducts.length > 0 && (
        <section className="py-14 sm:py-20 bg-[#F8F9FA] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#B38600] block mb-1">
                  DIRECT FACTORY INVENTORY
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  FEATURED <span className="text-[#B38600]">{brand.name}</span> INSTRUMENTS
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Ready to dispatch from Pune warehouse with 100% genuine factory warranty and GST tax invoice.
                </p>
              </div>

              <Link
                href={`/products?brand=${brand.brandParam}`}
                className="inline-flex items-center gap-2 bg-[#FFC400] hover:bg-[#E6B000] text-black font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                <span>Browse All {brand.name} Catalog</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>

            {/* Product Cards Grid with Gold Border & 3 Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandProducts.slice(0, 6).map((product) => {
                const inWish = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-3xl border border-amber-300/80 hover:border-[#FFC400] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-[#FFC400] text-black text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                          {product.brand}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>In Stock</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              toggleWishlist(product);
                              showToast(
                                inWish
                                  ? `Removed ${product.model} from Wishlist`
                                  : `Saved ${product.model} to Wishlist!`
                              );
                            }}
                            aria-label="Save to Wishlist"
                            className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          >
                            <Heart
                              className={`w-4 h-4 transition-all ${
                                inWish ? "fill-rose-500 text-rose-500 scale-110" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Product Image */}
                      <Link
                        href={`/products/${product.id}`}
                        className="relative w-full h-44 sm:h-48 flex items-center justify-center my-3 p-2 block cursor-pointer"
                      >
                        <Image
                          src={product.image}
                          alt={`${product.brand} ${product.model}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain filter contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Category Label */}
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                        {product.categoryName}
                      </div>

                      {/* Title */}
                      <Link
                        href={`/products/${product.id}`}
                        className="group/title block hover:text-amber-600 transition-colors"
                      >
                        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover/title:text-amber-600 leading-snug">
                          <span className="text-[#B38600] font-black mr-1.5">
                            {product.model}
                          </span>
                          {product.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Specs Matrix */}
                      <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-slate-100">
                        {product.specs &&
                          product.specs.slice(0, 4).map((spec, sIdx) => (
                            <div
                              key={sIdx}
                              className="bg-slate-50 rounded-xl p-2 sm:p-2.5 border border-slate-100"
                            >
                              <div className="text-[10px] text-slate-500 font-medium leading-none">
                                {spec.label}
                              </div>
                              <div className="text-[11.5px] font-bold text-slate-900 truncate mt-1">
                                {spec.value}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Pricing & Actions */}
                    <div>
                      {product.price && (
                        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-baseline justify-between">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-slate-400 block -mb-0.5">
                              B2B CONTRACTOR
                            </span>
                            <span className="text-base sm:text-lg font-black text-slate-950">
                              {product.price}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">
                            Excl. 18% GST
                          </span>
                        </div>
                      )}

                      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenCheckout(product)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#FFC400] hover:bg-[#e6b000] text-black text-xs font-black uppercase tracking-wider py-2.5 px-3 rounded-xl transition-all shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>CHECKOUT</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            addToCart(product, 1, true);
                            showToast(`Added ${product.model} to Cart!`);
                          }}
                          className="p-2.5 rounded-xl border border-slate-200 hover:border-[#FFC400] hover:bg-amber-50 text-slate-700 hover:text-amber-800 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                          title="Add to Shopping Cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>

                        <Link
                          href={`/products/${product.id}`}
                          aria-label={`View ${product.model} detailed page`}
                          className="p-2.5 rounded-xl border border-slate-200 hover:border-black hover:bg-slate-50 text-slate-700 hover:text-black transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                          title="View Details Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 5. AUTHORIZED CHANNEL PARTNER ASSURANCE STRIP                         */}
      {/* ===================================================================== */}
      <section className="bg-white border-b border-slate-200 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-[#FFC400] flex items-center justify-center mb-3 shadow-xs text-black">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1">
                Authorized Distribution
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct authorized agreements with {brand.name} guaranteeing genuine OEM components and firmware.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center mb-3 shadow-xs text-[#FFC400]">
                <FileText className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1">
                NABL 17025 Calibrated
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every bench scope and power source comes with laboratory-grade NABL traceable calibration certificates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-[#FFC400] flex items-center justify-center mb-3 shadow-xs text-black">
                <Truck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1">
                24h Express Dispatch
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Physical warehouse stock in Pune, dispatched within 24 business hours with insured cargo freight.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center mb-3 shadow-xs text-[#FFC400]">
                <Award className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1">
                3 Years OEM Warranty
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full factory warranty coverage with repair, firmware updates, and replacement support in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. SUBSCRIBE TO WHOLESALE DIGEST NEWSLETTER                           */}
      {/* ===================================================================== */}
      <section className="bg-[#090B0F] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFC400]/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Mail className="w-5 h-5 text-[#FFC400]" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
            SUBSCRIBE TO {brand.name}{" "}
            <span className="text-[#FFC400]">WHOLESALE DIGEST</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mt-3 mb-8 leading-relaxed">
            Receive priority notifications on {brand.name} clearance lots, newly released instruments, and tender specifications.
          </p>

          <form
            onSubmit={handleDigestSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
          >
            <div className="relative w-full sm:flex-1">
              <input
                type="email"
                required
                value={digestEmail}
                onChange={(e) => setDigestEmail(e.target.value)}
                placeholder="Enter corporate email for wholesale rates..."
                className="w-full bg-[#12151D] border border-white/15 focus:border-[#FFC400] text-xs sm:text-sm text-white placeholder-gray-500 rounded-full px-5 py-3.5 focus:outline-none transition-colors shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {digestSubscribed && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold animate-in fade-in duration-200">
              <Check className="w-4 h-4" />
              <span>Thank you! You are subscribed to {brand.name} wholesale updates.</span>
            </div>
          )}

          <div className="mt-6 text-[10px] sm:text-[11px] font-bold text-gray-500 tracking-widest uppercase">
            <span>NO SPAM</span>
            <span className="mx-2 text-gray-700">•</span>
            <span>UNSUBSCRIBE ANYTIME</span>
            <span className="mx-2 text-gray-700">•</span>
            <span>SECURE DATA STORAGE</span>
          </div>
        </div>
      </section>

      {/* 7. Global Footer */}
      <Footer />
    </div>
  );
}
