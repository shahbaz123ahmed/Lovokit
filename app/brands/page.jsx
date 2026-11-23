"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Truck,
  FileText,
  Mail,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BrandsPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  const brands = [
    {
      id: "lovosis",
      name: "Lovosis",
      brandParam: "LOVOSIS",
      tag: "FLAGSHIP TECHNOLOGY PARTNER",
      logo: "/images/partners/lovosis_color.webp",
      logoWidth: 200,
      logoHeight: 48,
      categories: [
        "Industrial Test Automation",
        "Electronic Hardware Platforms",
        "Sensors & Signal Interfaces",
        "Smart Measurement Solutions",
      ],
      description:
        "Premier industrial and electronic technology partner delivering high-reliability test automation, smart interface solutions, and precision diagnostic hardware engineered for Indian manufacturing, academic institutions, and enterprise quality control labs.",
    },
    {
      id: "matrix",
      name: "Matrix",
      brandParam: "MATRIX",
      tag: "OFFICIAL DISTRIBUTOR",
      logo: "/images/partners/matrix_color.png",
      logoWidth: 240,
      logoHeight: 48,
      categories: [
        "DC Power Supplies",
        "Arbitrary Waveform Generators",
        "Programmable DC Loads",
        "Digital Frequency Counters",
      ],
      description:
        "Specialized in high-accuracy programmable switching & linear DC power supplies, multi-channel waveform generators, and electronic diagnostic benches trusted by R&D laboratories, defense contractors, and technical universities across India.",
    },
    {
      id: "owon",
      name: "Owon",
      brandParam: "OWON",
      tag: "OFFICIAL DISTRIBUTOR",
      logo: "/images/partners/owon_color.png",
      logoWidth: 190,
      logoHeight: 48,
      categories: [
        "Digital Storage Oscilloscopes",
        "Handheld Multi-Instruments",
        "Benchtop Multimeters",
        "PC USB Virtual Scopes",
      ],
      description:
        "Global leader in advanced test and measurement technology, manufacturing high-bandwidth digital storage oscilloscopes (DSO), portable handheld scopes, waveform generators, and automated test instrumentation with factory warranty and NABL calibration compliance.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* ===================================================================== */}
      {/* 2. OFFICIAL BRANDS HERO BANNER (MATCHING REFERENCE WITH LOVOKIT THEME) */}
      {/* ===================================================================== */}
      <section className="relative w-full bg-[#0B0D13] text-white py-14 sm:py-16 lg:py-20 border-b border-white/[0.08] overflow-hidden">
        {/* Subtle grid background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Ambient warm glow */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#FFC400]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 bg-[#FFC400]/10 border border-[#FFC400]/30 text-[#FFC400] px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-black tracking-wider uppercase mb-5">
            <Award className="w-3.5 h-3.5 text-[#FFC400]" />
            <span>CERTIFIED DISTRIBUTION &amp; MANUFACTURER PARTNERSHIPS</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Official Brands in <span className="text-[#FFC400]">India</span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed mb-8">
            Official Authorised Partner &amp; Distributor of <strong className="text-white">LOVOSIS</strong>,{" "}
            <strong className="text-white">OWON</strong>, <strong className="text-white">MATRIX</strong>, and premier Educational Trainer Kits
            in India. 100% genuine products with manufacturer factory warranty and GST tax invoices.
          </p>

          {/* Quick Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-xs text-gray-300 font-bold">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FFC400] shrink-0" />
              <span>100% Genuine Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFC400] shrink-0" />
              <span>NABL 17025 Calibrated</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#FFC400] shrink-0" />
              <span>24h Pune Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FFC400] shrink-0" />
              <span>GST Corporate Invoicing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. ALL AVAILABLE BRANDS SECTION (MATCHING SCREENSHOT 1)               */}
      {/* ===================================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="mb-8 sm:mb-10">
            <span className="text-xs font-black tracking-widest text-gray-500 uppercase">
              BROWSE BRANDS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              All Available Brands
            </h2>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {brands.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#FFC400] transition-all p-6 sm:p-8 flex flex-col justify-between group"
              >
                <div>
                  {/* Logo Display Box */}
                  <Link
                    href={`/brands/${b.id}`}
                    className="h-40 sm:h-48 w-full bg-[#FAFBFD] rounded-xl border border-gray-100 flex items-center justify-center p-6 mb-6 group-hover:bg-amber-50/20 transition-colors block cursor-pointer"
                  >
                    <Image
                      src={b.logo}
                      alt={b.name}
                      width={b.logoWidth}
                      height={b.logoHeight}
                      className="object-contain max-h-16 sm:max-h-20 group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Official Distributor Tag */}
                  <div className="mb-2">
                    <span className="inline-block text-[10.5px] font-black uppercase tracking-wider text-gray-400">
                      {b.tag}
                    </span>
                  </div>

                  {/* Brand Title */}
                  <Link href={`/brands/${b.id}`} className="block group-hover:text-amber-600 transition-colors">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 group-hover:text-amber-600">
                      {b.name}
                    </h3>
                  </Link>

                  {/* Brand Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                    {b.description}
                  </p>

                  {/* Categories Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {b.categories.map((cat, i) => (
                      <Link
                        key={i}
                        href={`/products?brand=${b.brandParam}&search=${encodeURIComponent(cat)}`}
                        className="bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-black text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: EXPLORE on left, VIEW button on right */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-500">
                    EXPLORE DIVISION
                  </span>
                  <Link
                    href={`/brands/${b.id}`}
                    className="inline-flex items-center gap-2 bg-[#E02424] hover:bg-[#C81E1E] text-white font-black text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>VIEW</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. WHOLESALE DIGEST NEWSLETTER (MATCHING SCREENSHOT 2)                */}
      {/* ===================================================================== */}
      <section className="relative w-full bg-[#0B0D13] text-white py-16 sm:py-20 border-t border-white/[0.08] overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFC400] to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Circular Mail Icon with red/amber ring */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-red-500/40 text-red-500 mb-6 shadow-inner">
            <Mail className="w-6 h-6 stroke-[2]" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-3 uppercase">
            SUBSCRIBE TO LOVOKIT{" "}
            <span className="text-[#FFC400]">WHOLESALE DIGEST</span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Receive priority updates on new tool arrivals, clearance events, and OSHA
            compliance documents.
          </p>

          {/* Newsletter Form */}
          {subscribed ? (
            <div className="bg-[#FFC400]/10 border border-[#FFC400]/40 rounded-xl p-4 max-w-md mx-auto flex items-center justify-center gap-2 text-[#FFC400] text-xs font-black uppercase tracking-wider animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#FFC400]" />
              <span>Thank you! You are subscribed to Wholesale Digest.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-xl mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter corporate or business email..."
                className="w-full sm:flex-1 bg-[#141721] border border-white/10 rounded-full sm:rounded-l-full sm:rounded-r-none px-5 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC400] transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#E6B000] text-black font-black text-xs uppercase tracking-wider px-8 py-3 rounded-full sm:rounded-r-full sm:rounded-l-none transition-all shadow-md cursor-pointer shrink-0"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>
          )}

          {/* Trust Strip Footer */}
          <div className="mt-8 text-[10.5px] font-black uppercase tracking-wider text-gray-500">
            <span>NO SPAM</span>
            <span className="mx-2.5 text-gray-700">|</span>
            <span>UNSUBSCRIBE ANYTIME</span>
            <span className="mx-2.5 text-gray-700">|</span>
            <span>SECURE DATA STORAGE</span>
          </div>
        </div>
      </section>

      {/* 5. Global Footer */}
      <Footer />
    </div>
  );
}
