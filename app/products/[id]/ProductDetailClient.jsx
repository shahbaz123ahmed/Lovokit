"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  ShieldCheck,
  Award,
  Truck,
  Layers,
  FileText,
  Share2,
  Box,
  Sliders,
  Check,
  X,
  PhoneCall,
  Star,
  HelpCircle,
  Clock,
  Sparkles,
  Copy,
  ExternalLink,
  ChevronDown,
  Building2,
  FileCheck2,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaBanner from "@/components/CtaBanner";
import { useShop } from "@/context/ShopContext";

export default function ProductDetailClient({ product, relatedProducts }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [activeTab, setActiveTab] = useState("specs"); // "specs" | "features" | "box" | "downloads" | "faq"
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    router.push("/checkout");
  };

  // Gallery multi-image handling (supports 1, 2, 4 or any number of images)
  const rawGallery = (product.galleryImages && product.galleryImages.length > 0)
    ? product.galleryImages
    : [
        product.image,
        "/images/featured/oscilloscope-visual.png",
        "/images/categories/oscilloscope-transparent.png",
        "/images/featured/owon-exact-transparent.png",
      ].filter(Boolean);

  const gallery = rawGallery.length > 0 ? rawGallery : ["/placeholder-product.png"];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  // Auto-swap images dynamically every 3.5s (pauses on user hover)
  useEffect(() => {
    if (gallery.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % gallery.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [gallery.length, isPaused]);

  const handlePrevImage = (e) => {
    e?.stopPropagation?.();
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e?.stopPropagation?.();
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 40) {
      handleNextImage();
    } else if (distance < -40) {
      handlePrevImage();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Toast notification
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Quote Request State
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [generatedQuoteRef, setGeneratedQuoteRef] = useState("");
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    department: "",
    pincode: "",
    notes: "",
  });

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const randomRef = `LVK-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedQuoteRef(randomRef);
    setQuoteSubmitted(true);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.brand} ${product.model} - ${product.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!");
    } else {
      showToast("Product link ready to share!");
    }
  };

  const handleDownloadDatasheet = (docName) => {
    showToast(`Downloading: ${docName || `${product.model} Technical Datasheet.pdf`}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3 rounded-xl shadow-2xl border border-[#FFC400]/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-2 h-2 rounded-full bg-[#FFC400] animate-ping" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* 2. Breadcrumbs Bar */}
      <div className="py-3.5 bg-white border-b border-gray-200 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto no-scrollbar py-0.5 font-medium">
            <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <Link href="/products" className="hover:text-black transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <Link href={`/products?category=${product.category}`} className="capitalize hover:text-black transition-colors">
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-black font-extrabold truncate">{product.model}</span>
          </nav>
        </div>
      </div>

      {/* 3. Product Overview Hero (2 Columns) */}
      <section className="py-8 sm:py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Product Visual Showcase with Auto-Swapping Slider */}
            <div className="lg:col-span-6 flex flex-col items-center">
              {/* Main Visual Display (Studio Light Background + Auto-Carousel) */}
              <div 
                className="relative w-full aspect-[4/3] rounded-3xl bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E9EFF6] border border-slate-200/90 p-6 sm:p-10 flex items-center justify-center overflow-hidden shadow-sm group select-none"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Radial Soft Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/70 rounded-full blur-2xl pointer-events-none" />

                {/* Brand & Model Floating Badges (Top Left) */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="bg-[#FFC400] text-black text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                    {product.brand}
                  </span>
                  <span className="bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 text-[11px] font-black px-2.5 py-1 rounded-md shadow-2xs">
                    {product.model}
                  </span>
                </div>

                {/* Dynamic Image Counter Pill (Top Right) */}
                {gallery.length > 1 && (
                  <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-2xs flex items-center gap-1">
                    <span>{activeImageIndex + 1}</span>
                    <span className="text-slate-400 font-normal">/</span>
                    <span>{gallery.length}</span>
                  </div>
                )}

                {/* Images Layer with Smooth Cross-Fade Animation */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {gallery.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${
                        idx === activeImageIndex
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`${product.brand} ${product.model} - view ${idx + 1}`}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>

                {/* Left Navigation Chevron */}
                {gallery.length > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous product image"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-[#FFC400] text-slate-800 hover:text-black border border-slate-200/90 shadow-md flex items-center justify-center transition-all duration-200 opacity-90 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 -ml-0.5" />
                  </button>
                )}

                {/* Right Navigation Chevron */}
                {gallery.length > 1 && (
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next product image"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-[#FFC400] text-slate-800 hover:text-black border border-slate-200/90 shadow-md flex items-center justify-center transition-all duration-200 opacity-90 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 -mr-0.5" />
                  </button>
                )}

                {/* Bottom Center Dynamic Pill Indicators */}
                {gallery.length > 1 && (
                  <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs">
                    {gallery.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(idx);
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          idx === activeImageIndex
                            ? "w-6 h-2 bg-[#FFC400]"
                            : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* In Stock & Lab Ready Badge (Bottom Left) */}
                <div className="absolute bottom-3.5 left-4 z-10 hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Ready to Dispatch</span>
                </div>

                {/* Calibration Standard Badge (Bottom Right) */}
                <div className="absolute bottom-3.5 right-4 z-10 hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-amber-200 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-2xs">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#B38600]" />
                  <span>ISO/IEC Calibrated</span>
                </div>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full mt-4 pt-1">
                <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <ShieldCheck className="w-5 h-5 text-[#FFC400] flex-shrink-0" />
                  <div className="text-[10.5px] sm:text-[11px] leading-tight">
                    <span className="font-bold text-gray-900 block">3 Years</span>
                    <span className="text-gray-500">Full Warranty</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Award className="w-5 h-5 text-[#FFC400] flex-shrink-0" />
                  <div className="text-[10.5px] sm:text-[11px] leading-tight">
                    <span className="font-bold text-gray-900 block">NABL Traceable</span>
                    <span className="text-gray-500">Calibration Cert</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Truck className="w-5 h-5 text-[#FFC400] flex-shrink-0" />
                  <div className="text-[10.5px] sm:text-[11px] leading-tight">
                    <span className="font-bold text-gray-900 block">Fast Dispatch</span>
                    <span className="text-gray-500">All India Insured</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Ratings, Minimal Pricing, Specs & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-start space-y-4">
              {/* Category, SKU & In-Stock Status */}
              <div className="flex items-center justify-between gap-3 text-xs flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md text-[11px]">
                    {product.categoryName}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    SKU: LVK-{product.model}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock</span>
                </div>
              </div>

              {/* Main Heading & Subtitle */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 leading-tight">
                  {product.brand} {product.model}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-600 mt-1 leading-snug">
                  {product.title}
                </p>
              </div>

              {/* Rating & Procurement Verification (Clean Single Row) */}
              <div className="flex items-center gap-2.5 text-xs">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-900">{product.rating || 5.0}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium">
                  {product.reviews || 48} Audits &amp; Reviews
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-[11px] font-bold text-emerald-700 hidden sm:inline">
                  Verified Lab Supply
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-xl">
                {product.description}
              </p>

              {/* Clean Minimalist Pricing (Borderless & Sleek) */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tight">
                        {product.price || "₹1,25,000"}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm font-medium text-slate-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                        Save 15%
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500 font-medium flex-wrap">
                      <span className="flex items-center gap-1 text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Excl. 18% GST (ITC Eligible)</span>
                      </span>
                      <span>•</span>
                      <span className="text-amber-800 font-bold">GeM Available</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-800 block">
                      MOQ: 1 Unit
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Volume quotes available
                    </span>
                  </div>
                </div>
              </div>

              {/* Sleek Technical Specs Grid (Minimal Divider-based) */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 py-3 border-y border-slate-100 my-1">
                {product.specs?.slice(0, 4).map((spec, sIdx) => (
                  <div key={sIdx} className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {spec.label}
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-slate-800 mt-0.5 truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Primary Actions: Stepper + Add to Cart + Buy Now */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-2.5 text-xs font-bold text-slate-900 min-w-[32px] text-center font-mono">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button (Yellow) */}
                  <button
                    type="button"
                    onClick={() => addToCart(product, quantity, true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wide py-2.5 sm:py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Buy Now / Checkout Button (Black) */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-black text-white font-extrabold text-xs sm:text-sm uppercase tracking-wide py-2.5 sm:py-3 px-4 rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Secondary Actions: RFQ, Datasheet, Wishlist, Share */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuoteModalOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 border border-slate-200 hover:border-slate-400 text-slate-800 font-bold text-xs py-2 px-3 rounded-xl transition-colors bg-white shadow-2xs cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    <span>Official RFQ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadDatasheet()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 border border-slate-200 hover:border-slate-400 text-slate-800 font-bold text-xs py-2 px-3 rounded-xl transition-colors bg-white shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Datasheet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label="Wishlist"
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-rose-400 text-slate-600 hover:text-rose-600 transition-colors bg-white shadow-2xs cursor-pointer"
                    title={isInWishlist(product.id) ? "Saved in Wishlist" : "Save to Wishlist"}
                  >
                    <Heart
                      className={`w-4 h-4 transition-all ${
                        isInWishlist(product.id)
                          ? "fill-rose-500 text-rose-500 scale-110"
                          : "text-slate-600"
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={handleShareClick}
                    aria-label="Share product"
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-400 text-slate-600 hover:text-black transition-colors bg-white shadow-2xs cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Minimalist Hotline (Clean single line, not a bulky card) */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                    <span>Technical &amp; GeM Inquiry:</span>
                  </span>
                  <a
                    href="tel:+919747745544"
                    className="font-bold text-slate-900 hover:text-[#C48F00] transition-colors"
                  >
                    +91 97477 45544
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Deep-Dive Information Tabs Section */}
      <section className="py-10 sm:py-14 bg-[#F8F9FA]" id="product-details-tabs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs Navigation Header */}
          <div className="flex items-center gap-1.5 sm:gap-2 border-b border-gray-200 overflow-x-auto no-scrollbar">
            {[
              { id: "specs", label: "Technical Specifications", icon: Sliders },
              { id: "features", label: "Key Features & Architecture", icon: Layers },
              { id: "box", label: "What's in the Box", icon: Box },
              { id: "downloads", label: "Datasheets & Drivers", icon: FileText },
              { id: "faq", label: "Procurement & GeM FAQ", icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "border-[#FFC400] text-black bg-white rounded-t-xl shadow-xs"
                      : "border-transparent text-gray-500 hover:text-black"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#B38600]" : "text-gray-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panes */}
          <div className="bg-white rounded-b-2xl rounded-tr-2xl border border-gray-200 p-5 sm:p-8 md:p-10 shadow-sm mt-0">
            
            {/* Tab 1: Technical Specifications Table */}
            {activeTab === "specs" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                {/* 1. Vertical / Input System */}
                {product.detailedSpecs?.vertical && (
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 pb-2 border-b border-gray-100 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFC400]" />
                      <span>Input, Channels &amp; Vertical System</span>
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-[13px]">
                        <tbody className="divide-y divide-gray-100">
                          {product.detailedSpecs.vertical.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                              <td className="py-2.5 px-3.5 font-bold text-gray-600 w-1/3 sm:w-2/5">
                                {row.parameter}
                              </td>
                              <td className="py-2.5 px-3.5 text-slate-950 font-semibold">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 2. Horizontal / Acquisition */}
                {product.detailedSpecs?.horizontal && (
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 pb-2 border-b border-gray-100 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFC400]" />
                      <span>Timebase, Sampling &amp; Acquisition Engine</span>
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-[13px]">
                        <tbody className="divide-y divide-gray-100">
                          {product.detailedSpecs.horizontal.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                              <td className="py-2.5 px-3.5 font-bold text-gray-600 w-1/3 sm:w-2/5">
                                {row.parameter}
                              </td>
                              <td className="py-2.5 px-3.5 text-slate-950 font-semibold">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. Trigger & Decoding */}
                {product.detailedSpecs?.trigger && (
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 pb-2 border-b border-gray-100 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFC400]" />
                      <span>Trigger Modes &amp; Protocol Decoding</span>
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-[13px]">
                        <tbody className="divide-y divide-gray-100">
                          {product.detailedSpecs.trigger.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                              <td className="py-2.5 px-3.5 font-bold text-gray-600 w-1/3 sm:w-2/5">
                                {row.parameter}
                              </td>
                              <td className="py-2.5 px-3.5 text-slate-950 font-semibold">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4. General & Physical */}
                {product.detailedSpecs?.general && (
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 pb-2 border-b border-gray-100 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFC400]" />
                      <span>General, Interfaces &amp; Environmental Specifications</span>
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-[13px]">
                        <tbody className="divide-y divide-gray-100">
                          {product.detailedSpecs.general.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                              <td className="py-2.5 px-3.5 font-bold text-gray-600 w-1/3 sm:w-2/5">
                                {row.parameter}
                              </td>
                              <td className="py-2.5 px-3.5 text-slate-950 font-semibold">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Key Features & Applications */}
            {activeTab === "features" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="w-9 h-9 rounded-lg bg-[#FFC400]/20 flex items-center justify-center text-amber-800 font-bold mb-3">
                      01
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2">
                      Ultra-Low Noise Front-End Architecture
                    </h4>
                    <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                      Engineered with dedicated hardware amplifiers and shielded ADC
                      circuits, allowing sensitive signal measurement down to 1 mV/div
                      without signal distortion or background artifacts.
                    </p>
                  </div>

                  <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="w-9 h-9 rounded-lg bg-[#FFC400]/20 flex items-center justify-center text-amber-800 font-bold mb-3">
                      02
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2">
                      Deep Record Memory &amp; Segmented Capture
                    </h4>
                    <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                      Capture long duration transient phenomena at full sample rate
                      without sacrificing resolution, critical for modern embedded serial
                      protocols like I2C, SPI, RS-232, and CAN bus debugging.
                    </p>
                  </div>

                  <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="w-9 h-9 rounded-lg bg-[#FFC400]/20 flex items-center justify-center text-amber-800 font-bold mb-3">
                      03
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2">
                      Automated Laboratory Workflows &amp; SCPI
                    </h4>
                    <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                      Full SCPI command compliance over USB and LAN interfaces. Integrate
                      seamlessly into automated test stations (ATE) using Python PyVISA,
                      LabVIEW, or MATLAB scripting environments.
                    </p>
                  </div>

                  <div className="p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="w-9 h-9 rounded-lg bg-[#FFC400]/20 flex items-center justify-center text-amber-800 font-bold mb-3">
                      04
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2">
                      Education &amp; Industrial Production Ready
                    </h4>
                    <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                      Intuitive physical control knobs combined with one-button auto-setup
                      make it the ideal instrument for vocational training, university
                      engineering laboratories, and high-throughput production testing.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: What's in the Box */}
            {activeTab === "box" && (
              <div className="animate-in fade-in duration-200">
                <h4 className="text-sm sm:text-base font-black text-slate-900 mb-4">
                  Standard Factory Accessories Included with {product.model}:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {product.inTheBox?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-gray-50 border border-gray-200/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] font-semibold text-gray-800">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>
                    All accessories are guaranteed 100% genuine and factory-tested with individual serialized quality check seals.
                  </span>
                </div>
              </div>
            )}

            {/* Tab 4: Documents & Downloads */}
            {activeTab === "downloads" && (
              <div className="animate-in fade-in duration-200 space-y-3">
                <h4 className="text-sm sm:text-base font-black text-slate-900 mb-4">
                  Official Technical Documentation, Guides &amp; Drivers:
                </h4>
                {product.downloads?.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100/80 border border-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 shadow-xs">
                        <FileText className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-[13px] font-bold text-slate-900 block">
                          {doc.name}
                        </span>
                        <span className="text-[10.5px] text-gray-500">
                          {doc.type} Format • {doc.size}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadDatasheet(doc.name)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#FFC400] text-gray-800 hover:text-black font-bold text-xs border border-gray-300 transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 5: Institutional & GeM FAQ */}
            {activeTab === "faq" && (
              <div className="animate-in fade-in duration-200 space-y-4">
                <h4 className="text-sm sm:text-base font-black text-slate-900 mb-4">
                  Institutional Procurement, GeM &amp; Warranty Questions:
                </h4>
                <div className="space-y-3">
                  {product.faqs?.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200"
                    >
                      <h5 className="text-xs sm:text-sm font-extrabold text-slate-950 flex items-start gap-2">
                        <span className="text-[#B38600] font-black">Q.</span>
                        <span>{faq.q}</span>
                      </h5>
                      <p className="mt-2 text-xs sm:text-[13px] text-gray-600 leading-relaxed pl-5">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 5. Compatible Equipment (Related Products) */}
      <section className="py-12 sm:py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#B38600] block mb-1">
                COMPATIBLE EQUIPMENT
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Recommended Benchtop Companions
              </h3>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-slate-800 hover:text-black flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
            >
              <span>View All Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-[#FFC400] p-5 flex flex-col justify-between transition-all hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase bg-slate-900 text-[#FFC400] px-2 py-0.5 rounded-md">
                      {rel.brand}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      In Stock
                    </span>
                  </div>

                  <Link href={`/products/${rel.id}`} className="block relative w-full h-36 my-3">
                    <Image
                      src={rel.image}
                      alt={rel.model}
                      fill
                      sizes="(max-width: 640px) 90vw, 30vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <Link href={`/products/${rel.id}`}>
                    <h4 className="text-sm font-black text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                      <span className="text-black font-black mr-1">{rel.model}</span>
                      <span className="text-gray-600 font-semibold text-xs block truncate mt-0.5">
                        {rel.title}
                      </span>
                    </h4>
                  </Link>

                  {rel.price && (
                    <div className="mt-2 text-xs font-black text-slate-950">
                      {rel.price}
                    </div>
                  )}
                </div>

                <Link
                  href={`/products/${rel.id}`}
                  className="mt-4 inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl bg-gray-50 group-hover:bg-[#FFC400] text-black font-extrabold text-xs transition-colors shadow-xs"
                >
                  <span>Inspect Details</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Formal Quotation (RFQ) Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200 max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setQuoteModalOpen(false);
                setQuoteSubmitted(false);
              }}
              className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {quoteSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-9 h-9 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Official RFQ Submitted!
                </h3>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 inline-block">
                  <span className="text-[10.5px] uppercase font-bold text-gray-400 block">
                    Your RFQ Reference Number
                  </span>
                  <span className="text-base font-mono font-black text-slate-950">
                    {generatedQuoteRef}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your quotation request for{" "}
                  <strong>
                    {product.brand} {product.model}
                  </strong>{" "}
                  (Quantity: {quantity} Unit{quantity > 1 ? "s" : ""}) has been logged. Our Senior Application Specialist will dispatch a signed institutional quotation with applicable discounts within 2 to 4 working hours.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setQuoteModalOpen(false);
                      setQuoteSubmitted(false);
                    }}
                    className="px-6 py-3 bg-[#FFC400] text-black font-extrabold text-xs uppercase tracking-wide rounded-xl shadow-md hover:bg-[#e6b000] transition-colors"
                  >
                    Return to Product Details
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-5 border-b border-gray-100 pb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B38600]">
                    OFFICIAL PRICE ESTIMATE
                  </span>
                  <h3 className="text-xl font-black text-slate-900 leading-tight mt-1">
                    Request Formal Quotation for {product.model}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Direct authorized distributor pricing, NABL calibration certificate, and institutional terms.
                  </p>
                </div>

                <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={quoteForm.name}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, name: e.target.value })
                        }
                        placeholder="Dr. / Prof. / Eng. Name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        Work / College Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={quoteForm.email}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, email: e.target.value })
                        }
                        placeholder="name@institute.edu.in"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        value={quoteForm.phone}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        Required Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        Institution / Company *
                      </label>
                      <input
                        required
                        type="text"
                        value={quoteForm.company}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, company: e.target.value })
                        }
                        placeholder="College of Engineering / R&D Labs"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        Delivery Pincode *
                      </label>
                      <input
                        required
                        type="text"
                        value={quoteForm.pincode}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, pincode: e.target.value })
                        }
                        placeholder="e.g. 560001 / 400001"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Project Notes / Tender Specs
                    </label>
                    <textarea
                      rows={2}
                      value={quoteForm.notes}
                      onChange={(e) =>
                        setQuoteForm({ ...quoteForm, notes: e.target.value })
                      }
                      placeholder="Specify optional probes, battery pack, GST invoice details, or delivery requirements..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      Submit Official Quotation Request
                    </button>
                    <p className="text-[10.5px] text-gray-400 text-center mt-2">
                      Zero obligation. Form GSTR-1 compliant invoice and authorized warranty provided.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. Final Call to Action Banner & Global Footer */}
      <CtaBanner />
      <Footer />
    </div>
  );
}
