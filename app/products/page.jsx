"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Download,
  Eye,
  X,
  FileText,
  Layers,
  Sparkles,
  Grid3X3,
  List,
  ShoppingCart,
  ShieldCheck,
  Truck,
  CreditCard,
  Building2,
  Check,
  Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { productsData, categoriesData, brandsData } from "@/data/products";
import { useShop } from "@/context/ShopContext";

function ProductsCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";
  const brandFromUrl = searchParams.get("brand") || "";
  const categoryFromUrl = searchParams.get("category") || "";

  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  useEffect(() => {
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchFromUrl]);

  useEffect(() => {
    if (brandFromUrl) {
      setSelectedBrand(brandFromUrl);
    }
  }, [brandFromUrl]);

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    const qClean = searchQuery.trim().toLowerCase();
    const qAlpha = qClean.replace(/[^a-z0-9]/g, "");

    return productsData
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        const matchesBrand =
          selectedBrand === "All Brands" || product.brand === selectedBrand;

        const pAlpha = (product.id + product.model).toLowerCase().replace(/[^a-z0-9]/g, "");

        const matchesSearch =
          qClean === "" ||
          product.id.toLowerCase().includes(qClean) ||
          product.model.toLowerCase().includes(qClean) ||
          product.title.toLowerCase().includes(qClean) ||
          product.brand.toLowerCase().includes(qClean) ||
          (product.categoryName || product.category || "").toLowerCase().includes(qClean) ||
          product.description.toLowerCase().includes(qClean) ||
          (qAlpha.length >= 2 && pAlpha.includes(qAlpha));

        return matchesCategory && matchesBrand && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "featured") {
          return b.featured ? 1 : -1;
        }
        if (sortBy === "name-asc") {
          return a.model.localeCompare(b.model);
        }
        if (sortBy === "name-desc") {
          return b.model.localeCompare(a.model);
        }
        return 0;
      });
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  const handleOpenCheckout = (product) => {
    addToCart(product, 1, false);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Premium Hero Catalog Header (Studio Light Enterprise Theme) */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 bg-gradient-to-b from-white via-slate-50/80 to-[#F8F9FA] text-slate-900 overflow-hidden border-b border-slate-200/80">
        {/* Soft Ambient Studio Lighting & Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute -top-24 right-1/4 w-[500px] h-[350px] bg-[#FFC400]/[0.08] rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-10 w-[350px] h-[250px] bg-blue-500/[0.04] rounded-full blur-[90px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-black text-amber-900 tracking-wider uppercase mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>OFFICIAL INDUSTRIAL &amp; LABORATORY CATALOG</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-950">
              Test &amp; Measurement{" "}
              <span className="text-[#B38600] underline decoration-[#FFC400]/50 decoration-4">
                Instruments.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Direct OEM inventory of professional oscilloscopes, bench DC &amp; AC power sources,
              signal generators, spectrum analyzers, and precision multimeters. Fully backed by manufacturer warranties, NABL ISO/IEC 17025 traceable calibration, and Pan-India dispatch.
            </p>

            {/* Micro Highlights Badges Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 bg-white/90 border border-slate-200/90 px-3 py-1.5 rounded-full shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>100% Genuine OEM Warranty</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 border border-slate-200/90 px-3 py-1.5 rounded-full shadow-2xs">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Express Pan-India Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 border border-slate-200/90 px-3 py-1.5 rounded-full shadow-2xs">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>18% GST Input Tax Credit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Catalog Controls Bar: Glassmorphic Search, Category Pills, Quick Filters */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by model, brand, or parameter (e.g. XDS3204E, Rigol, 200MHz)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/20 transition-all font-medium text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filters: Brand Selector & Sort */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {/* Brand Filter */}
              <div className="relative flex-shrink-0">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="text-xs font-bold bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-[#FFC400] cursor-pointer text-slate-800 transition-colors"
                >
                  {brandsData.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="relative flex-shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-bold bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-[#FFC400] cursor-pointer text-slate-800 transition-colors"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="name-asc">Model: A to Z</option>
                  <option value="name-desc">Model: Z to A</option>
                </select>
              </div>

              {/* Reset filter button if any active */}
              {(selectedCategory !== "all" || selectedBrand !== "All Brands" || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedBrand("All Brands");
                    setSearchQuery("");
                  }}
                  className="px-3 py-2 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors cursor-pointer flex-shrink-0 flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Horizontal Category Pill Bar */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 overflow-x-auto no-scrollbar">
            {categoriesData.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-950 text-[#FFC400] shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-black"
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Products Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Results Counter & View Mode Switcher */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="text-xs font-semibold text-gray-500">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong>{" "}
            laboratory instruments
          </div>

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-black shadow-xs font-bold"
                  : "text-gray-400 hover:text-black"
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-white text-black shadow-xs font-bold"
                  : "text-gray-400 hover:text-black"
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. Product Grid / List Display */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm animate-in fade-in">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900">
              {searchQuery ? `No products found for "${searchQuery}"` : "No instruments found"}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              No matching instruments found in catalog. Try adjusting your search term, model ID, or filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedBrand("All Brands");
                setSearchQuery("");
                router.push("/products");
              }}
              className="mt-4 px-5 py-2.5 bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs rounded-full uppercase tracking-wider transition-colors cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-amber-300/80 hover:border-[#FFC400] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Brand Yellow Pill & In-Stock + Wishlist */}
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
                        onClick={() => toggleWishlist(product)}
                        className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                        title={isInWishlist(product.id) ? "Saved in Wishlist" : "Save to Wishlist"}
                      >
                        <Heart
                          className={`w-4 h-4 transition-all ${
                            isInWishlist(product.id)
                              ? "fill-rose-500 text-rose-500 scale-110"
                              : "text-slate-400"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Centered Instrument Image */}
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

                {/* Pricing & 3 Action Buttons */}
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

                  {/* Action Buttons: Yellow CHECKOUT + Cart Icon + Eye Icon */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2">
                    {/* CHECKOUT Button (Yellow) */}
                    <button
                      type="button"
                      onClick={() => handleOpenCheckout(product)}
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
            ))}
          </div>
        ) : (
          /* List View Mode */
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-amber-300/80 hover:border-[#FFC400] p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                {/* Image -> Links to Details Page */}
                <Link
                  href={`/products/${product.id}`}
                  className="relative w-full md:w-52 h-40 flex-shrink-0 flex items-center justify-center bg-slate-50/60 rounded-2xl p-2 cursor-pointer"
                >
                  <Image
                    src={product.image}
                    alt={`${product.brand} ${product.model}`}
                    fill
                    className="object-contain filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-black uppercase text-black bg-[#FFC400] px-2.5 py-0.5 rounded-md shadow-xs">
                      {product.brand}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {product.categoryName}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 ml-auto md:ml-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      In Stock
                    </span>
                  </div>

                  {/* Title -> Links to Details Page */}
                  <Link
                    href={`/products/${product.id}`}
                    className="group/title block hover:text-amber-600 transition-colors"
                  >
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover/title:text-amber-600 leading-snug">
                      <span className="text-[#B38600] font-black mr-1.5">{product.model}</span>
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {product.specs && product.specs.slice(0, 4).map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-slate-50 border border-slate-200/80 text-slate-700 text-[11px] px-3 py-1 rounded-lg font-medium"
                      >
                        <strong className="text-slate-900">{spec.label}:</strong>{" "}
                        {spec.value}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Action Buttons */}
                <div className="w-full md:w-56 flex flex-col justify-between gap-3 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                  {product.price && (
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block -mb-0.5">
                        B2B CONTRACTOR
                      </span>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xl font-black text-slate-950">
                          {product.price}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Excl. 18% GST
                        </span>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleOpenCheckout(product)}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#FFC400] hover:bg-[#e6b000] text-black text-xs font-black uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>CHECKOUT</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(product, 1, true)}
                      className="flex-1 py-2 rounded-xl border border-slate-200 hover:border-[#FFC400] hover:bg-amber-50 text-slate-700 hover:text-amber-800 transition-colors flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer shadow-xs"
                      title="Add to Shopping Cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Cart</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      className="p-2 rounded-xl border border-slate-200 hover:border-rose-400 hover:bg-rose-50 text-slate-700 hover:text-rose-600 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                      title={isInWishlist(product.id) ? "Saved in Wishlist" : "Save to Wishlist"}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isInWishlist(product.id)
                            ? "fill-rose-500 text-rose-500"
                            : "text-slate-400"
                        }`}
                      />
                    </button>

                    <Link
                      href={`/products/${product.id}`}
                      aria-label={`View ${product.model} detailed page`}
                      className="p-2 rounded-xl border border-slate-200 hover:border-black hover:bg-slate-50 text-slate-700 hover:text-black transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                      title="View Details Page"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Enterprise Procurement Assurance Strip */}
      <section className="bg-white border-t border-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-[#FFC400] flex items-center justify-center mb-3 shadow-xs text-black">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1">
                Authorized OEM Supply
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct distribution agreements with Owon, Matrix, Siglent, and Rigol ensuring 100% genuine factory units.
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
                Every bench scope and power source comes with laboratory-grade NABL traceable calibration reports.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-[#FFC400] flex items-center justify-center mb-3 shadow-xs text-black">
                <Truck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1">
                Express Transit Insurance
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                24h warehouse dispatch with 100% insured courier cargo covering all industrial hubs across India.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center mb-3 shadow-xs text-[#FFC400]">
                <Building2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1">
                Official GeM &amp; GST Invoicing
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant B2B GST tax invoice for full 18% ITC credit, with institutional quotes and tender support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Global Footer */}
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-black text-xs uppercase tracking-wider text-slate-500">
          Loading catalog...
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
