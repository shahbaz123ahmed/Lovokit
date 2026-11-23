"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Package,
  Plus,
  Minus,
  CheckCircle2,
  ArrowLeft,
  Tag,
  PhoneCall,
  Sparkles,
  Lock,
  User,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    cartGst,
    cartTotal,
    user,
    setAuthModalOpen,
    setAuthPromptReason,
  } = useShop();

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    const code = couponCode.trim().toUpperCase();
    if (code === "LOVOKIT10") {
      setDiscountPercent(10);
      setCouponApplied("LOVOKIT10 (10% Off Applied)");
    } else if (code === "INSTITUTE5") {
      setDiscountPercent(5);
      setCouponApplied("INSTITUTE5 (5% Off Applied)");
    } else {
      setCouponError("Invalid promo code. Try 'LOVOKIT10' for 10% off.");
    }
  };

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const finalSubtotal = Math.max(0, cartSubtotal - discountAmount);
  const finalGst = Math.round(finalSubtotal * 0.18);
  const finalGrandTotal = finalSubtotal + finalGst;

  // Unauthenticated Guard: Require user to Sign In / Sign Up to access Cart
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black flex flex-col justify-between">
        <Navbar />

        <main className="max-w-xl mx-auto px-4 pt-32 sm:pt-40 pb-20 text-center w-full my-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8 text-slate-900" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#B58200] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Authentication Required
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight pt-1">
                Sign In Required to View Cart
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
              Cart dekhne aur order process karne ke liye pehle apna business account <strong>Sign In</strong> ya <strong>Sign Up</strong> karein.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setAuthPromptReason("cart");
                  setAuthModalOpen(true);
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-950 hover:bg-black text-white hover:text-[#FFC400] font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-[#FFC400]" />
                <span>Sign In / Create Account</span>
              </button>
              <Link
                href="/products"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

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
            <span className="text-[#FFC400] font-bold">Shopping Cart</span>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
                <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFC400]" />
                <span>Your Procurement Cart</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Review selected high-precision instruments and configure quantities for B2B billing.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">
                Total Items
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#FFC400]">
                {cartCount} Instrument{cartCount === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cart Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-gray-200 p-10 sm:p-16 text-center max-w-lg mx-auto shadow-sm my-8">
            <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center mx-auto text-amber-600 mb-5">
              <Package className="w-10 h-10 text-[#FFC400]" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Your Cart is Currently Empty
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
              Explore our laboratory-grade digital oscilloscopes, DC power supplies, waveform generators, and testing meters.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs uppercase tracking-wider py-3.5 px-8 rounded-full shadow-md active:scale-95 transition-all"
              >
                <span>Browse Product Catalog</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                href="/wishlist"
                className="inline-flex items-center justify-center py-3.5 px-6 rounded-full border border-gray-300 text-xs font-bold text-slate-800 hover:border-black transition-colors"
              >
                View Saved Wishlist
              </Link>
            </div>
          </div>
        ) : (
          /* Populated Cart Layout: 2 Columns */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Delivery Perk Alert */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-950 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold text-xs sm:text-sm">
                    All-India <strong>FREE Express Insured Air Delivery</strong> included!
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  Dispatches in 24h
                </span>
              </div>

              {/* Items Table Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 text-[11px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100 bg-gray-50/70">
                  <span className="col-span-6">Instrument Details</span>
                  <span className="col-span-2 text-center">Unit Price</span>
                  <span className="col-span-2 text-center">Quantity</span>
                  <span className="col-span-2 text-right">Subtotal</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
                    >
                      {/* Product Visual & Details */}
                      <div className="sm:col-span-6 flex items-center gap-3.5 w-full">
                        <Link
                          href={`/products/${item.id}`}
                          className="relative w-20 h-20 sm:w-22 sm:h-22 bg-slate-50 border border-gray-200 rounded-xl p-1.5 flex-shrink-0 flex items-center justify-center overflow-hidden hover:border-[#FFC400] transition-colors"
                        >
                          <Image
                            src={item.image}
                            alt={item.model}
                            fill
                            sizes="90px"
                            className="object-contain"
                          />
                        </Link>

                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {item.brand}
                          </span>
                          <Link
                            href={`/products/${item.id}`}
                            className="block hover:text-amber-600 transition-colors mt-1"
                          >
                            <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug truncate">
                              {item.model}
                            </h3>
                          </Link>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {item.title}
                          </p>
                          <div className="text-[11px] text-gray-400 mt-1">
                            SKU: LVK-{item.model}
                          </div>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="sm:col-span-2 text-left sm:text-center w-full sm:w-auto flex justify-between sm:block">
                        <span className="sm:hidden text-xs text-gray-500">Price:</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {item.price}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="sm:col-span-2 flex items-center justify-between sm:justify-center w-full sm:w-auto">
                        <span className="sm:hidden text-xs text-gray-500">Quantity:</span>
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 text-xs font-bold text-slate-900 min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal & Delete Action */}
                      <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                        <span className="sm:hidden text-xs text-gray-500">Subtotal:</span>
                        <span className="text-sm sm:text-base font-black text-slate-950">
                          ₹{(item.numericPrice * item.quantity).toLocaleString("en-IN")}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1"
                          title="Remove from Cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Actions Bar */}
                <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-black transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Continue Browsing Products</span>
                  </Link>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors"
                  >
                    Clear Shopping Cart
                  </button>
                </div>
              </div>

              {/* Trust & Procurement Assurance Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#FFC400] flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">3 Years Warranty</span>
                    <span className="text-gray-500">Comprehensive Parts &amp; Labor</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">NABL Calibrated</span>
                    <span className="text-gray-500">Serialized Test Certificate</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-center gap-3">
                  <Tag className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">GST Tax Invoice</span>
                    <span className="text-gray-500">18% Input Tax Credit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary (4 Cols Sticky) */}
            <div className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm space-y-5">
                <h3 className="text-lg font-black text-slate-950 pb-3 border-b border-gray-100">
                  Procurement Summary
                </h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="block text-[11px] font-bold text-gray-600 uppercase">
                    Have an Institutional Promo Code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. LOVOKIT10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs uppercase font-bold focus:bg-white focus:outline-none focus:border-[#FFC400]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <span className="text-xs font-bold text-emerald-600 block">
                      {couponApplied}
                    </span>
                  )}
                  {couponError && (
                    <span className="text-xs font-semibold text-rose-600 block">
                      {couponError}
                    </span>
                  )}
                </form>

                {/* Pricing Breakdown */}
                <div className="space-y-2.5 text-xs sm:text-[13px] pt-3 border-t border-gray-100 text-gray-600">
                  <div className="flex justify-between">
                    <span>Base Subtotal:</span>
                    <span className="font-bold text-slate-900">
                      ₹{cartSubtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Promo Discount ({discountPercent}%):</span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated GST (18% ITC):</span>
                    <span className="font-bold text-slate-900">
                      ₹{finalGst.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Express Insured Shipping:</span>
                    <span className="font-black text-emerald-600 uppercase text-xs">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between text-base sm:text-lg font-black text-slate-950 pt-3 border-t border-gray-200">
                    <span>Grand Total:</span>
                    <span className="text-amber-800">
                      ₹{finalGrandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Primary Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wide py-4 px-6 rounded-xl transition-all shadow-[0_4px_16px_rgba(255,196,0,0.35)] active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                {/* Specialist Hotline */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-center">
                  <span className="text-[11px] text-gray-500 block mb-1">
                    Need GeM Portal quotation or custom tender terms?
                  </span>
                  <a
                    href="tel:+919747745544"
                    className="text-xs font-black text-slate-900 hover:text-amber-800 flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                    <span>Call Sales Engineer: +91 97477 45544</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
