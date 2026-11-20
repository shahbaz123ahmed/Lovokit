"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
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

  // Gallery multi-image handling
  const gallery = product.galleryImages || [
    product.image,
    "/images/featured/oscilloscope-visual.png",
    "/images/categories/oscilloscope-transparent.png",
    "/images/featured/owon-exact-transparent.png",
  ];
  const [selectedImage, setSelectedImage] = useState(product.image || gallery[0]);

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
      <div className="pt-24 sm:pt-28 pb-4 bg-[#08090C] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-gray-400 overflow-x-auto no-scrollbar py-0.5">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <Link href="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <span className="capitalize hover:text-white transition-colors">{product.categoryName}</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <span className="text-[#FFC400] font-bold truncate">{product.model}</span>
          </nav>
        </div>
      </div>

      {/* 3. Product Overview Hero (2 Columns) */}
      <section className="py-8 sm:py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Product Visual Showcase & Multi-Angle Thumbnails */}
            <div className="lg:col-span-6 flex flex-col items-center">
              {/* Main Visual Display */}
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#090B10] border border-gray-800 p-6 sm:p-8 flex items-center justify-center overflow-hidden shadow-xl group">
                {/* Radial Amber Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFC400]/[0.08] rounded-full blur-3xl pointer-events-none" />

                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage}
                    alt={`${product.brand} ${product.model}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain filter contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Brand & Stock Floating Badges */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="bg-[#FFC400] text-black text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                    {product.brand}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {product.model}
                  </span>
                </div>

                {/* In Stock & Lab Ready Badge */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/10 text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>In Stock • Ready to Dispatch</span>
                </div>

                {/* Calibration Standard Badge */}
                <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/10 text-amber-300 text-[10.5px] font-bold px-2.5 py-1 rounded-md">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#FFC400]" />
                  <span>ISO/IEC 17025 Calibrated</span>
                </div>
              </div>

              {/* Multi-angle Gallery Thumbnails */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full mt-3.5">
                {gallery.map((imgUrl, idx) => {
                  const isSelected = selectedImage === imgUrl;
                  const labels = ["Front View", "Display Detail", "Isometric 3D", "Rear Ports"];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(imgUrl)}
                      aria-label={`Select ${labels[idx] || "view"}`}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border-2 transition-all p-2 flex flex-col items-center justify-center ${
                        isSelected
                          ? "border-[#FFC400] ring-2 ring-[#FFC400]/40 shadow-md"
                          : "border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={imgUrl}
                          alt={`${product.model} angle ${idx + 1}`}
                          fill
                          sizes="15vw"
                          className="object-contain"
                        />
                      </div>
                      <span className="absolute bottom-1 text-[8px] sm:text-[9px] font-bold text-white/90 bg-black/70 px-1 rounded truncate max-w-[90%]">
                        {labels[idx] || `View ${idx + 1}`}
                      </span>
                    </button>
                  );
                })}
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

            {/* Right Column: Title, Ratings, Pricing, Specs & RFQ Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {product.categoryName}
                  </span>
                  <span className="text-xs text-gray-500 font-mono font-bold">
                    SKU: LVK-{product.model}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-black tracking-tight text-slate-950 leading-tight">
                  <span className="text-black font-black block sm:inline">
                    {product.brand} {product.model}
                  </span>{" "}
                  <span className="font-bold text-gray-700 block text-lg sm:text-xl lg:text-2xl mt-1">
                    {product.title}
                  </span>
                </h1>

                {/* Rating & Procurement Verification */}
                <div className="flex items-center gap-3 mt-2.5">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {product.rating || 5.0}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {product.reviews || 48} Laboratory Audits &amp; Reviews
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 hidden sm:inline-block">
                    Procurement Verified
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* B2B Industrial Pricing Box */}
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFC400] block mb-0.5">
                        INSTITUTIONAL &amp; B2B RATE
                      </span>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {product.price || "₹1,25,000"}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm font-semibold text-gray-400 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
                          Save 15%
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-gray-300 font-medium block">
                        MOQ: 1 Unit
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        Bulk volume discounts available
                      </span>
                    </div>
                  </div>

                  {/* GST Invoice Assurance */}
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC400]" />
                      <span>Excl. 18% GST • Input Tax Credit (ITC) Invoice Provided</span>
                    </span>
                    <span className="text-[#FFC400] font-bold text-[10.5px]">
                      GeM Portal Available
                    </span>
                  </div>
                </div>

                {/* Technical Highlights 4-Grid */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 my-5 p-4 rounded-xl bg-gray-50 border border-gray-200/80">
                  {product.specs?.slice(0, 4).map((spec, sIdx) => (
                    <div key={sIdx} className="flex flex-col">
                      <span className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 truncate">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quantity & Primary Action Buttons */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-3 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3.5 py-3 text-xs font-bold text-slate-900 min-w-[36px] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3.5 py-3 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Button (Yellow) */}
                    <button
                      type="button"
                      onClick={() => addToCart(product, quantity, true)}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wide py-3.5 px-4 rounded-xl transition-all shadow-[0_4px_16px_rgba(255,196,0,0.35)] hover:shadow-[0_6px_22px_rgba(255,196,0,0.5)] active:scale-[0.98] cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                      <span>Add to Cart</span>
                    </button>

                    {/* Buy Now / Checkout Button (Black) */}
                    <button
                      type="button"
                      onClick={handleBuyNow}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-black text-white font-extrabold text-xs sm:text-sm uppercase tracking-wide py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      <span>Buy Now</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Secondary Actions: RFQ Modal, Datasheet, Wishlist & Share */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(true)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 border border-gray-300 hover:border-black text-slate-900 font-bold text-xs py-3 px-3 rounded-xl transition-colors bg-white shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <span>Official RFQ</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadDatasheet()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 border border-gray-300 hover:border-black text-gray-800 hover:text-black font-bold text-xs py-3 px-3 rounded-xl transition-colors bg-white shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-600" />
                      <span>Datasheet</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      aria-label="Wishlist"
                      className="p-3 rounded-xl border border-gray-300 hover:border-rose-400 text-gray-600 hover:text-rose-600 transition-colors bg-white shadow-xs cursor-pointer"
                      title={isInWishlist(product.id) ? "Saved in Wishlist" : "Save to Wishlist"}
                    >
                      <Heart
                        className={`w-4 h-4 transition-all ${
                          isInWishlist(product.id)
                            ? "fill-rose-500 text-rose-500 scale-110"
                            : "text-gray-600"
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={handleShareClick}
                      aria-label="Share product"
                      className="p-3 rounded-xl border border-gray-300 hover:border-black text-gray-600 hover:text-black transition-colors bg-white shadow-xs cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Specialist Direct Hotline */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs text-amber-950 mt-1">
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-amber-700 flex-shrink-0" />
                      <span className="font-semibold">
                        Need Custom Sizing or GeM Support? Speak to an Engineer:
                      </span>
                    </div>
                    <a
                      href="tel:+919747745544"
                      className="font-black text-slate-950 hover:text-amber-800 underline ml-2 whitespace-nowrap"
                    >
                      +91 97477 45544
                    </a>
                  </div>
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
