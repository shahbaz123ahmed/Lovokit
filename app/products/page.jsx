"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function ProductsPage() {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        const matchesBrand =
          selectedBrand === "All Brands" || product.brand === selectedBrand;
        const matchesSearch =
          searchQuery === "" ||
          product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());

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

      {/* 2. Hero Catalog Header */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-16 bg-[#08090C] text-white overflow-hidden border-b border-white/10">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-10 right-[10%] w-[500px] h-[300px] bg-[#FFC400]/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-[20%] w-[400px] h-[200px] bg-white/[0.02] rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#FFC400] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL INDUSTRIAL &amp; LABORATORY CATALOG</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Test &amp; Measurement{" "}
              <span className="text-[#FFC400] underline decoration-[#FFC400]/40 decoration-4">
                Instruments.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">
              Explore professional-grade oscilloscopes, signal generators, DC &amp; AC
              bench power sources, multimeters, and educational trainers. All products
              backed by factory warranties, NABL calibration, and express B2B dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Catalog Controls Bar: Search, Category Pills, Filter Summary */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by model, brand, or parameter (e.g. XDS3204E, Rigol, 200MHz)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FFC400] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
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
                  className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 pr-8 focus:outline-none focus:border-[#FFC400] cursor-pointer"
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
                  className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 pr-8 focus:outline-none focus:border-[#FFC400] cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="name-asc">Model: A to Z</option>
                  <option value="name-desc">Model: Z to A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Horizontal Category Pill Bar */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 overflow-x-auto no-scrollbar">
            {categoriesData.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-slate-950 text-[#FFC400] shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto my-12">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900">
              No instruments found
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your search criteria, brand filter, or category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedBrand("All Brands");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-[#FFC400] text-black font-bold text-xs rounded-full uppercase"
            >
              Show All Products
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-[#FFC400]/70 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Product Card Top: Badges & Clickable Image */}
                <div className="p-5 pb-2">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-black uppercase tracking-wider text-black bg-[#FFC400] px-2.5 py-0.5 rounded-full">
                      {product.brand}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        In Stock
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product)}
                        className="p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-100 transition-colors cursor-pointer"
                        title={isInWishlist(product.id) ? "Saved in Wishlist" : "Save to Wishlist"}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-all ${
                            isInWishlist(product.id)
                              ? "fill-rose-500 text-rose-500 scale-110"
                              : "text-slate-400"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Instrument Image with Hover Zoom -> Links to Product Details Page */}
                  <Link
                    href={`/products/${product.id}`}
                    className="relative w-full h-44 sm:h-48 flex items-center justify-center my-2 p-2 block cursor-pointer"
                  >
                    <Image
                      src={product.image}
                      alt={`${product.brand} ${product.model}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain filter contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>

                {/* Product Card Details */}
                <div className="p-5 pt-0 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                      {product.categoryName}
                    </div>

                    {/* Model & Title -> Links to Product Details Page */}
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

                    <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Key Technical Highlights Specs Matrix */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
                      {product.specs.slice(0, 4).map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-gray-50 rounded-lg p-2 border border-gray-100"
                        >
                          <div className="text-[10px] text-gray-500 font-medium leading-none">
                            {spec.label}
                          </div>
                          <div className="text-[11.5px] font-bold text-slate-900 truncate mt-1">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing row if present */}
                  {product.price && (
                    <div className="mt-4 pt-2.5 border-t border-gray-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gray-400 block -mb-0.5">
                          B2B CONTRACTOR
                        </span>
                        <span className="text-base font-black text-slate-950">
                          {product.price}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">
                        Excl. 18% GST
                      </span>
                    </div>
                  )}

                  {/* Action Buttons: CHECKOUT button + Quick ADD TO CART + EYE icon for Details Page */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                    {/* CHECKOUT Button (Yellow) */}
                    <button
                      type="button"
                      onClick={() => handleOpenCheckout(product)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#FFC400] hover:bg-[#e6b000] text-black text-xs font-extrabold uppercase tracking-wide py-2.5 px-3 rounded-xl transition-all shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>CHECKOUT</span>
                    </button>

                    {/* Quick Add To Cart Button */}
                    <button
                      type="button"
                      onClick={() => addToCart(product, 1, true)}
                      className="p-2.5 rounded-xl border border-gray-200 hover:border-[#FFC400] hover:bg-amber-50 text-slate-700 hover:text-amber-800 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                      title="Add to Shopping Cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>

                    {/* EYE Icon Button -> Navigates to Product Details Page */}
                    <Link
                      href={`/products/${product.id}`}
                      aria-label={`View ${product.model} detailed page`}
                      className="p-2.5 rounded-xl border border-gray-200 hover:border-black hover:bg-slate-50 text-gray-700 hover:text-black transition-colors flex items-center justify-center cursor-pointer shadow-xs"
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
                className="group bg-white rounded-2xl border border-gray-200 hover:border-[#FFC400] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-lg"
              >
                {/* Image -> Links to Details Page */}
                <Link
                  href={`/products/${product.id}`}
                  className="relative w-full md:w-48 h-36 flex-shrink-0 block cursor-pointer"
                >
                  <Image
                    src={product.image}
                    alt={`${product.brand} ${product.model}`}
                    fill
                    className="object-contain filter contrast-[1.03]"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase text-black bg-[#FFC400] px-2 py-0.5 rounded-full">
                      {product.brand}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      {product.categoryName}
                    </span>
                  </div>

                  {/* Title -> Links to Details Page */}
                  <Link
                    href={`/products/${product.id}`}
                    className="group/title block hover:text-amber-600 transition-colors"
                  >
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover/title:text-amber-600 leading-snug">
                      <span className="text-[#B38600] mr-1.5">{product.model}</span>
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {product.specs.slice(0, 4).map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-[10.5px] px-2.5 py-1 rounded-md font-medium"
                      >
                        <strong className="text-black">{spec.label}:</strong>{" "}
                        {spec.value}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: CHECKOUT + ADD TO CART + EYE for Details Page */}
                <div className="w-full md:w-auto flex items-center md:flex-col gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenCheckout(product)}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#FFC400] hover:bg-[#e6b000] text-black text-xs font-extrabold uppercase tracking-wide py-2.5 px-5 rounded-xl shadow-xs hover:shadow-md transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>CHECKOUT</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(product, 1, true)}
                      className="p-2.5 rounded-xl border border-gray-200 hover:border-[#FFC400] hover:bg-amber-50 text-slate-700 hover:text-amber-800 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                      title="Add to Shopping Cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      className="p-2.5 rounded-xl border border-gray-200 hover:border-rose-400 hover:bg-rose-50 text-slate-700 hover:text-rose-600 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                      title={isInWishlist(product.id) ? "Saved in Wishlist" : "Save to Wishlist"}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isInWishlist(product.id)
                            ? "fill-rose-500 text-rose-500"
                            : "text-slate-500"
                        }`}
                      />
                    </button>

                    <Link
                      href={`/products/${product.id}`}
                      aria-label={`View ${product.model} detailed page`}
                      className="p-2.5 rounded-xl border border-gray-200 hover:border-black hover:bg-slate-50 text-gray-700 hover:text-black transition-colors flex items-center justify-center cursor-pointer shadow-xs"
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

      {/* 6. Global Footer */}
      <Footer />
    </div>
  );
}
