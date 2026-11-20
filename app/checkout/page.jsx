"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Building2,
  FileCheck2,
  Check,
  ArrowRight,
  ArrowLeft,
  Lock,
  PhoneCall,
  Package,
  Calendar,
  FileText,
  Printer,
  ChevronRight,
  Info,
  User,
  Phone,
  MapPin,
  Banknote,
  Receipt,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";

export default function CheckoutPage() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartGst,
    cartTotal,
    clearCart,
  } = useShop();

  // Coupon state
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
      setCouponError("Invalid promo code. Use 'LOVOKIT10' for 10% off.");
    }
  };

  // Pricing calculations
  const catalogMrpTotal = Math.round(cartSubtotal * 1.15); // standard MRP baseline
  const catalogDiscount = catalogMrpTotal - cartSubtotal;
  const promoDiscount = Math.round((cartSubtotal * discountPercent) / 100);
  const taxableSubtotal = Math.max(0, cartSubtotal - promoDiscount);
  const gstAmount = Math.round(taxableSubtotal * 0.18);
  const netPayable = taxableSubtotal + gstAmount;

  // Checkout Form State matching reference
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    address3: "",
    country: "India",
    city: "",
    state: "",
    pincode: "",
    isBusinessPurchase: true,
    companyName: "",
    gstin: "",
    paymentMethod: "online", // "online" | "cod"
    notes: "",
  });

  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState(null);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const orderId = `LVK-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      customer: formData,
      items: [...cart],
      taxableSubtotal,
      gst: gstAmount,
      total: netPayable,
      paymentMethod: formData.paymentMethod,
    };
    setGeneratedOrder(newOrder);
    setOrderSubmitted(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] text-slate-900 selection:bg-[#FFC400] selection:text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16">
        {orderSubmitted && generatedOrder ? (
          /* ======================================================== */
          /* ORDER CONFIRMATION / SUCCESS SCREEN                      */
          /* ======================================================== */
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-12 max-w-3xl mx-auto shadow-sm space-y-8 animate-in fade-in duration-300 my-8">
            <div className="text-center space-y-3 pb-6 border-b border-gray-100">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Order Confirmed!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{generatedOrder.customer.name}</strong>! Your order has been registered and scheduled for dispatch.
              </p>

              <div className="inline-flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl mt-2">
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Order Reference ID
                  </span>
                  <span className="text-base sm:text-lg font-mono font-black text-slate-950">
                    {generatedOrder.orderId}
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-gray-200" />
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Payment Mode
                  </span>
                  <span className="text-xs font-bold text-slate-900 uppercase">
                    {generatedOrder.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Timeline Banner */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start sm:items-center justify-between flex-wrap gap-3 text-xs text-emerald-950">
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">
                    Estimated Air Dispatch: Within 24-48 Hours
                  </span>
                  <span className="text-emerald-800 text-[11px]">
                    Shipping to: {generatedOrder.customer.address1}, {generatedOrder.customer.city}, Pincode: {generatedOrder.customer.pincode}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                Insured Air Transit
              </span>
            </div>

            {/* Purchased Items List */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
                Instruments Ordered
              </h4>
              <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50">
                {generatedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 bg-white rounded-xl border border-gray-200 p-1 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.model}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-amber-700 block">
                          {item.brand}
                        </span>
                        <h5 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                          {item.model} • {item.title}
                        </h5>
                        <span className="text-[11px] text-gray-500">
                          Qty: {item.quantity} Unit{item.quantity > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      ₹{(item.numericPrice * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Taxable Subtotal:</span>
                <span className="font-semibold text-white">
                  ₹{generatedOrder.taxableSubtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>18% GST (Tax Invoice Included):</span>
                <span className="font-semibold text-white">
                  ₹{generatedOrder.gst.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Estimated Cargo Shipping:</span>
                <span className="font-bold text-emerald-400 uppercase text-xs">FREE</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg font-black text-white pt-2 border-t border-white/10">
                <span>Net Payable (Inc. GST):</span>
                <span className="text-[#FFC400]">
                  ₹{generatedOrder.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl border border-gray-300 hover:border-black text-xs font-bold text-slate-800 bg-white transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Order Receipt</span>
              </button>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 py-3 px-8 rounded-xl bg-[#FFC400] hover:bg-[#e6b000] text-black text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* ======================================================== */
          /* EMPTY CART SCREEN                                        */
          /* ======================================================== */
          <div className="bg-white rounded-3xl border border-gray-200 p-10 sm:p-14 text-center max-w-md mx-auto shadow-sm my-10 space-y-4">
            <Package className="w-12 h-12 text-[#FFC400] mx-auto" />
            <h2 className="text-xl font-black text-slate-900">
              No Items in Checkout
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Please add testing instruments to your cart before proceeding to checkout.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-[#FFC400] text-black font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-full shadow-md mt-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        ) : (
          /* ======================================================== */
          /* REFERENCE PORTAL LAYOUT MATCHING SCREENSHOT              */
          /* ======================================================== */
          <div className="space-y-6">
            {/* Top Dark Header Card matching reference portal style */}
            <div className="bg-gradient-to-r from-[#0C0E14] via-[#10131B] to-[#181B26] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-[10px] font-bold text-red-400 mb-2.5">
                  <Lock className="w-3 h-3 text-red-400" />
                  <span>256-BIT SSL ENCRYPTED</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  SECURE CHECKOUT PORTAL
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
                  Verify your commercial shipping address, claim GST input tax credit, and authorize payment.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Razorpay Secured</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs font-bold">
                  <Receipt className="w-4 h-4 text-[#FFC400]" />
                  <span>GST Invoice Included</span>
                </span>
              </div>
            </div>

            {/* Main Form & Sticky Summary 2-Column Grid */}
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column: Form Cards (7-8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 1. SHIPPING ADDRESS CARD */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#FFC400] text-black font-black text-xs flex items-center justify-center">
                        1
                      </div>
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900">
                        SHIPPING ADDRESS
                      </h2>
                    </div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                      Commercial &amp; Industrial Delivery
                    </span>
                  </div>

                  {/* Row 1: Receiver Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                        RECEIVER&apos;S FULL NAME *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          required
                          type="text"
                          placeholder="Admin / Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#F3F6FD] border border-[#E0E7F5] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#FFC400] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                        CONTACT PHONE NUMBER *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          required
                          type="tel"
                          placeholder="10-digit mobile"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#F3F6FD] border border-[#E0E7F5] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#FFC400] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email */}
                  <div>
                    <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                      EMAIL ADDRESS (FOR GST TAX INVOICE &amp; TRACKING) *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="admin@lovokit.com / accounts@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F3F6FD] border border-[#E0E7F5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#FFC400] transition-colors"
                    />
                  </div>

                  {/* Row 3: Address Line 1 */}
                  <div>
                    <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                      ADDRESS LINE 1 (BUILDING, WAREHOUSE, STREET) *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Plot 45, Phase III, Industrial Area"
                      value={formData.address1}
                      onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                      className="w-full bg-[#F3F6FD] border border-[#E0E7F5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#FFC400] transition-colors"
                    />
                  </div>

                  {/* Row 4: Address Line 2 */}
                  <div>
                    <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                      ADDRESS LINE 2 (LANDMARK, GATE NO.)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Metro Pillar 120"
                      value={formData.address2}
                      onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                      className="w-full bg-[#F3F6FD] border border-[#E0E7F5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#FFC400] transition-colors"
                    />
                  </div>

                  {/* Row 5: Address Line 3 (Optional) */}
                  <div>
                    <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                      ADDRESS LINE 3 (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      placeholder="Additional delivery instructions..."
                      value={formData.address3}
                      onChange={(e) => setFormData({ ...formData, address3: e.target.value })}
                      className="w-full bg-[#F3F6FD] border border-[#E0E7F5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#FFC400] transition-colors"
                    />
                  </div>

                  {/* Row 6: Country */}
                  <div>
                    <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                      COUNTRY *
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={formData.country}
                      className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  {/* Row 7: City, State, Pincode (3 columns matching reference) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                        CITY *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Pune / Bengaluru"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#F3F6FD] border border-[#E0E7F5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#FFC400] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                        STATE *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Maharashtra"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-[#F3F6FD] border border-[#E0E7F5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#FFC400] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                        PINCODE *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. 411001"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full bg-[#F3F6FD] border border-[#E0E7F5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#FFC400] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. BUSINESS GST BILLING CARD */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#FFC400] text-black font-black text-xs flex items-center justify-center">
                        2
                      </div>
                      <Receipt className="w-4 h-4 text-amber-600" />
                      <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900">
                        BUSINESS GST BILLING
                      </h2>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Claim 18% Input Tax Credit
                    </span>
                  </div>

                  {/* Checkbox Toggle matching reference */}
                  <label className="flex items-center gap-3 p-3 bg-amber-50/50 border border-amber-200/70 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBusinessPurchase}
                      onChange={(e) => setFormData({ ...formData, isBusinessPurchase: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500 accent-[#FFC400]"
                    />
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900">
                      This is a business purchase (Claim GST input tax credit for tax invoice)
                    </span>
                  </label>

                  {/* Company Name & GSTIN Fields */}
                  {formData.isBusinessPurchase && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 animate-in fade-in duration-150">
                      <div>
                        <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                          REGISTERED COMPANY NAME *
                        </label>
                        <input
                          required={formData.isBusinessPurchase}
                          type="text"
                          placeholder="e.g. LOvokit Internal / Tech Labs Pvt Ltd"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full bg-[#F3F6FD] border border-[#E0E7F5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#FFC400] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase text-gray-700 tracking-wide mb-1">
                          GSTIN NUMBER *
                        </label>
                        <input
                          required={formData.isBusinessPurchase}
                          type="text"
                          placeholder="E.G. 29AAGCL1057R1ZV"
                          value={formData.gstin}
                          onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                          className="w-full bg-[#F3F6FD] border border-[#E0E7F5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold uppercase font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-[#FFC400] transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. PAYMENT METHOD CARD (ONLY ONLINE & COD) */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#FFC400] text-black font-black text-xs flex items-center justify-center">
                        3
                      </div>
                      <CreditCard className="w-4 h-4 text-amber-600" />
                      <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900">
                        PAYMENT METHOD
                      </h2>
                    </div>
                    <span className="text-[11px] font-bold text-gray-400">
                      Select Online or Cash on Delivery
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Option 1: Online Payment */}
                    <label
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        formData.paymentMethod === "online"
                          ? "border-[#FFC400] bg-amber-50/50 ring-2 ring-[#FFC400]/40 shadow-xs"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === "online"}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="mt-1 w-4 h-4 accent-[#FFC400]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-black text-slate-900">
                            Online Payment (UPI, Debit/Credit Cards, Net Banking)
                          </span>
                          <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            Instant Dispatch
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Instant automated confirmation via Razorpay. Supports UPI, Google Pay, PhonePe, Cards, and Net Banking across SBI, HDFC, ICICI, and Axis.
                        </p>
                      </div>
                    </label>

                    {/* Option 2: Cash on Delivery (COD) */}
                    <label
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        formData.paymentMethod === "cod"
                          ? "border-[#FFC400] bg-amber-50/50 ring-2 ring-[#FFC400]/40 shadow-xs"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="mt-1 w-4 h-4 accent-[#FFC400]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-black text-slate-900">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-[10.5px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                            Pay on Delivery
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Pay directly to our certified logistics courier partner upon physical delivery and unboxing of your test instruments.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary & Review Items (4 cols sticky) */}
              <div className="lg:col-span-4 sticky top-24 space-y-4">
                
                {/* 1. REVIEW ITEMS CARD matching reference */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-amber-600" />
                      <span>REVIEW ITEMS ({cartCount})</span>
                    </h3>
                    <Link href="/cart" className="text-[11px] font-bold text-amber-700 hover:underline">
                      Edit
                    </Link>
                  </div>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 divide-y divide-gray-100">
                    {cart.map((item) => (
                      <div key={item.id} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-12 h-12 bg-slate-50 border border-gray-200 rounded-lg p-1 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.model}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-900 leading-tight">
                              {item.model}
                            </h4>
                            <span className="text-[10.5px] text-gray-500">
                              Qty: <strong>{item.quantity}</strong>
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-slate-900 whitespace-nowrap">
                          ₹{(item.numericPrice * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. NOTICE INFO BOX matching reference screenshot */}
                <div className="p-3.5 bg-[#FFF9E6] border border-[#FFE58F] rounded-2xl text-[11px] text-amber-950 space-y-1">
                  <p className="leading-relaxed">
                    Complete your phone number and shipping address to continue. For business purchases, a company name and valid GSTIN are also required.
                  </p>
                </div>

                <p className="text-[10.5px] text-gray-400 leading-snug px-1">
                  Your checkout contact and address details are saved to your customer profile and are available in your account.
                </p>

                {/* 3. ORDER SUMMARY CARD matching reference exactly */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 pb-2.5 border-b border-gray-100">
                    ORDER SUMMARY
                  </h3>

                  {/* Financial Breakdown Table matching reference */}
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Items Quantity</span>
                      <span className="font-semibold text-slate-900">{cartCount} units</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Catalog MRP Total</span>
                      <span className="font-semibold text-slate-900">
                        ₹{catalogMrpTotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between text-rose-600 font-bold">
                      <span>Total Catalog Discounts</span>
                      <span>-₹{(catalogDiscount + promoDiscount).toLocaleString("en-IN")}</span>
                    </div>

                    <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between">
                      <span>Taxable Subtotal (Excl. GST)</span>
                      <span className="font-bold text-slate-900">
                        ₹{taxableSubtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>GST (18% Standard)</span>
                      <span className="font-bold text-slate-900">
                        ₹{gstAmount.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Estimated Cargo Shipping</span>
                      <span className="font-black text-emerald-600 uppercase text-[11px]">FREE</span>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex items-baseline justify-between text-slate-950">
                      <div>
                        <span className="text-sm font-black block">Net Payable (Inc. GST)</span>
                      </div>
                      <span className="text-xl sm:text-2xl font-black text-slate-950">
                        ₹{netPayable.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Main Action Button - Styled with Lovokit Brand Yellow */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs sm:text-sm uppercase tracking-wide py-4 px-6 rounded-2xl transition-all shadow-[0_4px_16px_rgba(255,196,0,0.35)] hover:shadow-[0_6px_22px_rgba(255,196,0,0.5)] active:scale-[0.98] cursor-pointer"
                    >
                      <Lock className="w-4 h-4 stroke-[2.5]" />
                      <span>
                        {formData.paymentMethod === "cod"
                          ? "CONFIRM ORDER (CASH ON DELIVERY)"
                          : "PAY ONLINE & PLACE ORDER"}
                      </span>
                    </button>

                    <div className="text-center mt-2.5">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold inline-flex items-center gap-1">
                        <Lock className="w-3 h-3 text-gray-400" />
                        <span>SSL ENCRYPTED GATEWAY | GST INVOICE INCLUDED</span>
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
