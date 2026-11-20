"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Package,
  Plus,
  Minus,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    cartGst,
    cartTotal,
    cartDrawerOpen,
    setCartDrawerOpen,
    toastMessage,
  } = useShop();

  return (
    <>
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#FFC400]/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFC400] animate-ping" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Cart Slide-Over Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Backdrop Click */}
          <div
            className="absolute inset-0"
            onClick={() => setCartDrawerOpen(false)}
          />

          <aside className="relative bg-white text-slate-900 border-l border-gray-200 w-full max-w-md h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-200">
            {/* 1. Header */}
            <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFC400] text-black flex items-center justify-center font-black">
                  <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider text-white">
                    Your Shopping Cart
                  </h3>
                  <span className="text-[11px] text-[#FFC400] font-bold">
                    {cartCount} Instrument{cartCount === 1 ? "" : "s"} Selected
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCartDrawerOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Body / Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-gray-100">
              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
                    <Package className="w-8 h-8 text-[#FFC400]" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      Your Cart is Empty
                    </h4>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1 leading-relaxed">
                      Explore professional laboratory oscilloscopes, power sources, and testing meters to build your procurement order.
                    </p>
                  </div>
                  <Link
                    href="/products"
                    onClick={() => setCartDrawerOpen(false)}
                    className="inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs uppercase tracking-wider py-3 px-6 rounded-full transition-all shadow-md active:scale-95"
                  >
                    <span>Browse Product Catalog</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Delivery Perk Banner */}
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-950">
                    <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold text-[11px]">
                      Eligible for <strong>FREE Insured Air Transit</strong> across India!
                    </span>
                  </div>

                  {/* Cart Items */}
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3.5 py-3 first:pt-0"
                    >
                      {/* Product Thumbnail */}
                      <Link
                        href={`/products/${item.id}`}
                        onClick={() => setCartDrawerOpen(false)}
                        className="relative w-20 h-20 bg-slate-50 border border-gray-200 rounded-xl p-1 flex-shrink-0 flex items-center justify-center overflow-hidden hover:border-[#FFC400] transition-colors"
                      >
                        <Image
                          src={item.image}
                          alt={item.model}
                          fill
                          sizes="80px"
                          className="object-contain"
                        />
                      </Link>

                      {/* Product Info & Stepper */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <Link
                            href={`/products/${item.id}`}
                            onClick={() => setCartDrawerOpen(false)}
                            className="hover:text-amber-600 transition-colors"
                          >
                            <span className="text-[10px] font-black uppercase text-amber-700 block">
                              {item.brand}
                            </span>
                            <h4 className="text-xs sm:text-[13px] font-black text-slate-900 leading-snug truncate">
                              {item.model}
                            </h4>
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs font-black text-slate-950 mt-1">
                          {item.price}
                        </div>

                        {/* Quantity Counter & Subtotal */}
                        <div className="flex items-center justify-between mt-2 pt-1">
                          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-200 font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 py-1 text-xs font-bold text-slate-900 min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-200 font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-black text-slate-900">
                            ₹{(item.numericPrice * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Footer / Checkout Actions */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-gray-200 bg-slate-50 space-y-3">
                {/* Cost Breakdown */}
                <div className="text-xs space-y-1.5 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-slate-900">
                      ₹{cartSubtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18% ITC invoice included):</span>
                    <span className="font-bold text-slate-900">
                      ₹{cartGst.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Insured Shipping:</span>
                    <span className="font-bold text-emerald-600 uppercase text-[11px]">
                      FREE
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-black text-slate-950 pt-2 border-t border-gray-200">
                    <span>Total Amount:</span>
                    <span className="text-amber-800">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Primary Buttons */}
                <div className="space-y-2 pt-1">
                  <Link
                    href="/checkout"
                    onClick={() => setCartDrawerOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wide py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_16px_rgba(255,196,0,0.35)] active:scale-[0.98]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/cart"
                      onClick={() => setCartDrawerOpen(false)}
                      className="flex-1 inline-flex items-center justify-center py-2.5 px-4 rounded-xl border border-gray-300 hover:border-black text-slate-900 font-bold text-xs bg-white transition-colors"
                    >
                      View Full Cart Page
                    </Link>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="py-2.5 px-3 rounded-xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50 text-gray-500 hover:text-rose-600 text-xs font-semibold transition-colors"
                      title="Clear Cart"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10.5px] text-gray-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3-Year Warranty • NABL Traceable Calibration Included</span>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
