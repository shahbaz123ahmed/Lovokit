"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Package,
  Eye,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, wishlistCount } = useShop();

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart(item, 1, false);
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <div className="pt-28 pb-8 sm:pt-36 sm:pb-10 bg-[#08090C] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#FFC400] font-bold">Saved Wishlist</span>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFC400] fill-[#FFC400]" />
                <span>Saved Instruments Wishlist</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Your shortlisted laboratory equipment, testing meters, and automation hardware.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">
                Saved Items
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#FFC400]">
                {wishlistCount} Instrument{wishlistCount === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {wishlist.length === 0 ? (
          /* Empty Wishlist State */
          <div className="bg-white rounded-3xl border border-gray-200 p-10 sm:p-16 text-center max-w-lg mx-auto shadow-sm my-8">
            <div className="w-20 h-20 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center mx-auto text-rose-500 mb-5">
              <Heart className="w-10 h-10 text-rose-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
              Browse our instruments catalog and click the heart icon on any oscilloscope, power supply, or meter to save it here for later.
            </p>
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs uppercase tracking-wider py-3.5 px-8 rounded-full shadow-md active:scale-95 transition-all"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        ) : (
          /* Populated Wishlist Layout */
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="text-xs font-semibold text-gray-500">
                You have <strong className="text-slate-900">{wishlist.length}</strong> items saved
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleMoveAllToCart}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-[#FFC400]" />
                  <span>Move All to Cart</span>
                </button>
              </div>
            </div>

            {/* Grid of Wishlist Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-[#FFC400]/70 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                >
                  {/* Top Badges & Remove Button */}
                  <div className="p-5 pb-2">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-black bg-[#FFC400] px-2.5 py-0.5 rounded-full">
                        {item.brand}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors"
                        title="Remove from Wishlist"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>
                    </div>

                    {/* Image */}
                    <Link
                      href={`/products/${item.id}`}
                      className="relative w-full h-44 sm:h-48 flex items-center justify-center my-2 p-2 block cursor-pointer"
                    >
                      <Image
                        src={item.image}
                        alt={`${item.brand} ${item.model}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain filter contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  </div>

                  {/* Details */}
                  <div className="p-5 pt-0 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10.5px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                        {item.categoryName || "Instrumentation"}
                      </div>

                      <Link
                        href={`/products/${item.id}`}
                        className="group/title block hover:text-amber-600 transition-colors"
                      >
                        <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover/title:text-amber-600 leading-snug">
                          <span className="text-[#B38600] font-black mr-1.5">
                            {item.model}
                          </span>
                          {item.title}
                        </h3>
                      </Link>

                      {item.specs && (
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {item.specs}
                        </p>
                      )}

                      {/* Pricing */}
                      <div className="mt-4 pt-2.5 border-t border-gray-100 flex items-baseline justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-gray-400 block -mb-0.5">
                            B2B CONTRACTOR
                          </span>
                          <span className="text-base font-black text-slate-950">
                            {item.price || `₹${item.numericPrice?.toLocaleString("en-IN")}`}
                          </span>
                        </div>
                        <span className="text-[10.5px] text-emerald-600 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          In Stock
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons: Add to Cart & Inspect Details */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addToCart(item, 1, true)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#FFC400] hover:bg-[#e6b000] text-black text-xs font-extrabold uppercase tracking-wide py-2.5 px-4 rounded-xl transition-all shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Add to Cart</span>
                      </button>

                      <Link
                        href={`/products/${item.id}`}
                        className="p-2.5 rounded-xl border border-gray-200 hover:border-black hover:bg-slate-50 text-gray-700 hover:text-black transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
