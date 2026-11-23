"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Flame,
  Zap,
  Clock,
  Sparkles,
  ShieldCheck,
  Truck,
  FileText,
  Search,
  ShoppingCart,
  Heart,
  Eye,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  TrendingDown,
  Award,
  RefreshCw,
  X,
  Mail,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { productsData } from "@/data/products";
import { useShop, parseNumericPrice } from "@/context/ShopContext";

// =============================================================================
// 📸 HOT DEALS HERO BANNER IMAGES (Add or change your banner images here)
// =============================================================================
// Aap yahan apni banner images add ya change kar sakte hain.
// Format: ["/images/your-image.jpg", "/images/another-image.png", ...]
// Agar 1 se zyada images hongi to ye automatically slider ki tarah swap/slide hongi.
// =============================================================================
export const hotDealsBannerImages = [
  "/images/hotdeals.png",
];

// Enrich products with Hot Deal metrics (discounts, units claimed, urgency badges)
const hotDealsList = productsData
  .filter((p) => p.originalPrice && p.price)
  .map((p, index) => {
    const numPrice = parseNumericPrice(p.price);
    const numOrig = parseNumericPrice(p.originalPrice);
    const savings = Math.max(0, numOrig - numPrice);
    const discountPct = Math.round((savings / numOrig) * 100);

    // Realistic warehouse clearance metrics
    const claimedPcts = [82, 74, 91, 68, 85, 77, 93, 62, 88, 70, 84, 79];
    const unitsRemaining = [3, 4, 2, 5, 3, 4, 1, 6, 2, 5, 3, 4];
    const claimed = claimedPcts[index % claimedPcts.length];
    const remaining = unitsRemaining[index % unitsRemaining.length];

    return {
      ...p,
      numPrice,
      numOrig,
      savings,
      discountPct,
      claimedPct: claimed,
      unitsLeft: remaining,
      dealTag:
        discountPct >= 20
          ? "MEGA DEAL"
          : remaining <= 2
            ? "CRITICAL STOCK"
            : "WAREHOUSE CLEARANCE",
    };
  });

export default function HotDealsPage() {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  // Search & Filter State
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("discount-high");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  // Wholesale Digest Newsletter State
  const [digestEmail, setDigestEmail] = useState("");
  const [digestSubscribed, setDigestSubscribed] = useState(false);

  const handleDigestSubmit = (e) => {
    e.preventDefault();
    if (digestEmail.trim()) {
      setDigestSubscribed(true);
      setTimeout(() => {
        setDigestEmail("");
      }, 3500);
    }
  };

  // Live Countdown Timer (Ends at midnight / dynamic tick)
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Banner Image Slider State & Auto-Slide Effect
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  useEffect(() => {
    if (!hotDealsBannerImages || hotDealsBannerImages.length <= 1 || isBannerHovered) return;
    const interval = setInterval(() => {
      setCurrentBannerIdx((prev) => (prev + 1) % hotDealsBannerImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isBannerHovered]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2800);
  };

  // Buy Now Handler (Adds to cart and goes directly to checkout)
  const handleBuyNow = (product, e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    addToCart(product, 1, false);
    router.push("/checkout");
  };

  // Filter & Sort Logic
  const filteredDeals = useMemo(() => {
    let list = [...hotDealsList];

    // Filter by category
    if (activeCategory === "mega-savings") {
      list = list.filter((item) => item.savings >= 25000);
    } else if (activeCategory !== "all") {
      list = list.filter((item) => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.model.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q)
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "discount-high") return b.discountPct - a.discountPct;
      if (sortBy === "savings-high") return b.savings - a.savings;
      if (sortBy === "price-low") return a.numPrice - b.numPrice;
      if (sortBy === "price-high") return b.numPrice - a.numPrice;
      return 0;
    });

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  // Display deals (show all matching deals)
  const displayedDeals = useMemo(() => {
    return filteredDeals;
  }, [filteredDeals]);

  // Deal of the Day: Highest savings product
  const dealOfTheDay = useMemo(() => {
    return (
      hotDealsList.find((p) => p.id === "xds3302") ||
      hotDealsList[0]
    );
  }, []);

  const categories = [
    { id: "all", label: "All Hot Deals", count: hotDealsList.length },
    {
      id: "mega-savings",
      label: "🔥 Mega Savings (>₹25k Off)",
      count: hotDealsList.filter((p) => p.savings >= 25000).length,
    },
    {
      id: "oscilloscopes",
      label: "⚡ Oscilloscopes",
      count: hotDealsList.filter((p) => p.category === "oscilloscopes").length,
    },
    {
      id: "power-supply",
      label: "🔌 DC Power Supplies",
      count: hotDealsList.filter((p) => p.category === "power-supply").length,
    },
    {
      id: "waveform",
      label: "📈 Signal Generators",
      count: hotDealsList.filter((p) => p.category === "waveform").length,
    },
    {
      id: "multimeters",
      label: "🧪 Multimeters",
      count: hotDealsList.filter((p) => p.category === "multimeters").length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#FFC400]" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. FULL-SECTION STUDIO HERO BANNER (MATCHING CONTACT PAGE STYLE)     */}
      {/* ===================================================================== */}
      <section
        className="relative w-full overflow-hidden bg-white flex items-center border-b border-slate-100 min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] py-10 sm:py-14 lg:py-16 group"
        onMouseEnter={() => setIsBannerHovered(true)}
        onMouseLeave={() => setIsBannerHovered(false)}
      >
        {/* Full-Width Background Studio Banner Image / Auto-Slider */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          {hotDealsBannerImages && hotDealsBannerImages.length > 0 ? (
            hotDealsBannerImages.map((imgSrc, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${idx === currentBannerIdx ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
                  }`}
              >
                <Image
                  src={imgSrc}
                  alt={`Hot Deals Featured Hero Banner ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  unoptimized
                  sizes="100vw"
                  className="object-cover object-center sm:object-right select-none"
                />
              </div>
            ))
          ) : null}
        </div>

        {/* Hero Content Container - Flush aligned with black & yellow branding */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-text">
          <div className="max-w-xl sm:max-w-2xl flex flex-col justify-center space-y-3.5 sm:space-y-4 text-left select-text">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FFC400] text-black text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md w-fit">
              <Flame className="w-3.5 h-3.5 fill-black" />
              <span>LOVOKIT WAREHOUSE CLEARANCE • 24H DISPATCH</span>
            </div>

            {/* Headline in Black & Yellow */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-950">
              DIRECT OEM <span className="text-[#FFB800] drop-shadow-xs">HOT DEALS.</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-[#FFB800] mt-1 sm:mt-1.5 font-extrabold drop-shadow-xs">
                UP TO 40% OFF FACTORY STOCK.
              </span>
            </h1>

            {/* Description in Clean Slate */}
            <p className="text-xs sm:text-sm text-slate-700 sm:text-slate-600 max-w-xl leading-relaxed font-medium">
              Brand-new, factory-sealed oscilloscopes, precision DC benches, and signal generators from OWON, RIGOL, MATRIX, and SIGLENT. With 100% genuine OEM warranty and instant 18% GST invoice.
            </p>

            {/* Trust Features Strip in Black & Yellow */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] sm:text-xs font-bold text-slate-800">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
                <span>NABL 17025 Calibrated</span>
              </div>
              <span className="text-slate-400">•</span>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#FFB800]" />
                <span>24h Pune Express Dispatch</span>
              </div>
              <span className="text-slate-400">•</span>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#FFB800]" />
                <span>18% GST Input Credit</span>
              </div>
            </div>

            {/* Live Flash Timer Strip */}
            <div className="pt-2">
              <div className="inline-flex flex-wrap items-center gap-3 sm:gap-4 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                    FLASH EVENT CLOSING IN:
                  </span>
                </div>

                {/* Digital Clock Badges */}
                <div className="flex items-center gap-1.5 font-mono font-black text-xs">
                  <span className="bg-slate-950 px-2.5 py-1 rounded-lg text-white border border-slate-800 shadow-inner">
                    {String(timeLeft.hours).padStart(2, "0")}h
                  </span>
                  <span className="text-slate-400 font-bold">:</span>
                  <span className="bg-[#FFC400] px-2.5 py-1 rounded-lg text-black border border-amber-400 shadow-inner">
                    {String(timeLeft.minutes).padStart(2, "0")}m
                  </span>
                  <span className="text-slate-400 font-bold">:</span>
                  <span className="bg-slate-950 px-2.5 py-1 rounded-lg text-red-400 border border-slate-800 shadow-inner">
                    {String(timeLeft.seconds).padStart(2, "0")}s
                  </span>
                </div>

                <div className="h-4 w-[1px] bg-slate-300 hidden sm:block" />

                <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="text-slate-500">Lots:</span>
                  <span className="text-amber-600 font-black">84% Exhausted</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Prev / Next Slide Controls (Visible if > 1 image) */}
        {hotDealsBannerImages && hotDealsBannerImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentBannerIdx(
                  (prev) => (prev - 1 + hotDealsBannerImages.length) % hotDealsBannerImages.length
                );
              }}
              aria-label="Previous Banner Image"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-xl cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentBannerIdx(
                  (prev) => (prev + 1) % hotDealsBannerImages.length
                );
              }}
              aria-label="Next Banner Image"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-xl cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Indicators in bottom right */}
            <div className="absolute bottom-5 right-6 sm:right-10 z-20 flex items-center gap-2">
              {hotDealsBannerImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentBannerIdx(dotIdx);
                  }}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${dotIdx === currentBannerIdx
                      ? "w-7 h-2 bg-[#FFC400]"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-500"
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 3. "DEAL OF THE DAY" SPOTLIGHT HERO CARD                             */}
      {/* ===================================================================== */}
      {dealOfTheDay && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="rounded-3xl bg-white border-2 border-[#FFC400] shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Product Preview Image */}
              <div className="lg:col-span-5 relative w-full h-56 sm:h-72 bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 flex items-center justify-center border border-slate-100">
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-white" />
                    <span>DEAL OF THE DAY</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10.5px] font-black">
                    SAVE ₹{dealOfTheDay.savings.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="relative w-full h-full">
                  <Image
                    src={dealOfTheDay.image}
                    alt={dealOfTheDay.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
              </div>

              {/* Product Details & Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                      {dealOfTheDay.brand} • {dealOfTheDay.model}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {dealOfTheDay.categoryName}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight leading-snug">
                    {dealOfTheDay.title}
                  </h2>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {dealOfTheDay.description}
                  </p>

                  {/* Specs Chips */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {dealOfTheDay.specs.slice(0, 4).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg"
                      >
                        {spec.label}: <strong className="text-slate-900">{spec.value}</strong>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Stock Urgency */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl sm:text-3xl font-black text-slate-950">
                        {dealOfTheDay.price}
                      </span>
                      <span className="text-base text-slate-400 line-through font-bold">
                        {dealOfTheDay.originalPrice}
                      </span>
                      <span className="text-xs font-black text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        -{dealOfTheDay.discountPct}% OFF
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Net Savings: ₹{dealOfTheDay.savings.toLocaleString("en-IN")} + GST Input Credit</span>
                    </div>
                  </div>

                  {/* Stock Bar */}
                  <div className="sm:text-right">
                    <div className="text-xs font-extrabold text-slate-700">
                      🔥 Only <span className="text-red-600 font-black">{dealOfTheDay.unitsLeft} Units Left</span> at this rate!
                    </div>
                    <div className="w-48 h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${dealOfTheDay.claimedPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={(e) => handleBuyNow(dealOfTheDay, e)}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>CHECKOUT NOW</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(dealOfTheDay, 1, true);
                      showToast(`Added ${dealOfTheDay.model} to Cart!`);
                    }}
                    className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>

                  <Link
                    href={`/products/${dealOfTheDay.id}`}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-400 bg-white text-slate-700 hover:text-black transition-colors"
                    title="View Full Technical Specifications"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* 4. CATEGORY PILL SELECTORS & LIVE SEARCH CONTROLS                     */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              EXCLUSIVE WAREHOUSE <span className="text-[#FFB800]">DEALS.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing <strong className="text-slate-900">{displayedDeals.length}</strong> authenticated instruments on clearance discount.
            </p>
          </div>

          {/* Search within Deals */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deal model or brand..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#FFC400] shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2.5 px-4 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#FFC400] shadow-2xs cursor-pointer"
            >
              <option value="discount-high">Highest Discount (%)</option>
              <option value="savings-high">Highest Savings (₹)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal Scroll) */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer ${isActive
                    ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                    : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive
                      ? "bg-[#FFC400] text-black"
                      : "bg-slate-100 text-slate-500"
                    }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. HOT DEALS PRODUCTS GRID (CUSTOM DEAL CARD LAYOUT)                  */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        {displayedDeals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
            <Flame className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-black text-slate-900">
              No Hot Deals Found Matching Your Filter
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try clearing your search term or switching to &quot;All Hot Deals&quot; to inspect all clearance lots.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#FFC400] text-black text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedDeals.map((product) => {
              const inWish = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="rounded-3xl bg-white border border-amber-300/80 hover:border-[#FFC400] shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Header: Brand Yellow Pill (Left) & In-Stock + Wishlist (Right) */}
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
                            className={`w-4 h-4 ${inWish ? "fill-rose-500 text-rose-500" : ""
                              }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Centered Product Image */}
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

                    {/* Model & Title */}
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

                    {/* Description */}
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Key Technical Highlights Specs Matrix (2x2 Grid) */}
                    <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-slate-100">
                      {product.specs && product.specs.slice(0, 4).map((spec, sIdx) => (
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

                  {/* Bottom: Pricing & Action Buttons */}
                  <div>
                    {/* Pricing Row */}
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

                    {/* Action Buttons: Yellow CHECKOUT + Cart Icon + Eye Icon */}
                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2">
                      {/* CHECKOUT Button (Yellow) */}
                      <button
                        type="button"
                        onClick={(e) => handleBuyNow(product, e)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#FFC400] hover:bg-[#e6b000] text-black text-xs font-black uppercase tracking-wider py-2.5 px-3 rounded-xl transition-all shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>CHECKOUT</span>
                      </button>

                      {/* Quick Add To Cart Button */}
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

                      {/* EYE Icon Button -> Navigates to Product Details Page */}
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
        )}
      </section>

      {/* ===================================================================== */}
      {/* 6. WHY BUY LOVOKIT CLEARANCE LOTS - TRUST ASSURANCE STRIP             */}
      {/* ===================================================================== */}
      <section className="bg-white py-16 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10.5px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              WAREHOUSE CLEARANCE GUARANTEE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-2.5">
              WHY PROCURE THROUGH <span className="text-[#FFB800]">LOVOKIT HOT DEALS?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Clearance pricing does not mean compromise. Every discounted instrument is backed by our full manufacturer warranties and rigorous testing standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-[#FFC400] flex items-center justify-center mb-3 shadow-xs text-black">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1">
                100% Brand-New Factory Sealed
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct procurement from OEM factories with serial numbers verified before Pune depot intake.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center mb-3 shadow-xs text-[#FFC400]">
                <Award className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1">
                NABL 17025 Calibrated
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every scope and multimeter comes with NABL traceable calibration ready for your lab audit.
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
                All deal inventory is physically in stock at our Pune facility, dispatched within 24 business hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center mb-3 shadow-xs text-[#FFC400]">
                <RefreshCw className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1">
                7-Day Replacement Guarantee
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full transit insurance and immediate replacement if any item arrives damaged or non-operational.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6.5. SUBSCRIBE TO LOVOKIT WHOLESALE DIGEST (YELLOW & BLACK THEME)     */}
      {/* ===================================================================== */}
      <section className="bg-[#090B0F] text-white py-16 sm:py-20 border-t border-white/10 relative overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFC400]/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Mail Icon in Circle */}
          <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Mail className="w-5 h-5 text-[#FFC400]" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
            SUBSCRIBE TO LOVOKIT <span className="text-[#FFC400]">WHOLESALE DIGEST</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mt-3 mb-8 leading-relaxed">
            Receive priority updates on new tool arrivals, clearance events, and OSHA compliance documents.
          </p>

          {/* Form */}
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
                placeholder="Enter corporate or business email..."
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
              <span>Thank you! You are now subscribed to the Lovokit Wholesale Digest.</span>
            </div>
          )}

          {/* Trust Footer Notes */}
          <div className="mt-6 text-[10px] sm:text-[11px] font-bold text-gray-500 tracking-widest uppercase">
            <span>NO SPAM</span>
            <span className="mx-2 text-gray-700">•</span>
            <span>UNSUBSCRIBE ANYTIME</span>
            <span className="mx-2 text-gray-700">•</span>
            <span>SECURE DATA STORAGE</span>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 7. GLOBAL FOOTER                                                      */}
      {/* ===================================================================== */}
      <Footer />
    </div>
  );
}
