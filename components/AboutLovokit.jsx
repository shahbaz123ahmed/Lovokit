"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap, Activity, Radio, Cpu, Gauge } from "lucide-react";

// =========================================================================
// 6 PRODUCT SPECIFICATIONS & ASSETS (Auto-cycling Showcase)
// Matching Reference: media_1795156556726_3c00b276.png
// =========================================================================
const defaultProducts = [
  {
    id: 1,
    model: "XDS3202E",
    badgeLabel: "4 CHANNELS",
    badgeCode: "DSO",
    categoryTitle: "DIGITAL STORAGE\nOSCILLOSCOPE",
    src: "/images/1st.png",
    metricHeader: "BANDWIDTH 200MHz",
    specs: [
      { label: "max", val: "200 MHz" },
      { label: "avg", val: "1 GSa/s" },
      { label: "min", val: "40M Pts" },
    ],
    accentIcon: "wave",
  },
  {
    id: 2,
    model: "HSA3140",
    badgeLabel: "3.2 GHz SPECTRUM",
    badgeCode: "RF-9",
    categoryTitle: "HIGH-BANDWIDTH\nSPECTRUM ANALYZER",
    src: "/images/2nd.png",
    metricHeader: "FREQ 9kHz-3.2GHz",
    specs: [
      { label: "max", val: "3.2 GHz" },
      { label: "avg", val: "-161 dBm" },
      { label: "min", val: "1 Hz RBW" },
    ],
    accentIcon: "radio",
  },
  {
    id: 3,
    model: "SP3051",
    badgeLabel: "TRIPLE OUT DC",
    badgeCode: "PS-3",
    categoryTitle: "DC REGULATED\nLINEAR POWER SUPPLY",
    src: "/images/3rd.png",
    metricHeader: "OUTPUT 30V / 5A",
    specs: [
      { label: "max", val: "30.0 V" },
      { label: "avg", val: "5.00 A" },
      { label: "min", val: "<1 mV" },
    ],
    accentIcon: "zap",
  },
  {
    id: 4,
    model: "XDM3051",
    badgeLabel: "6½ DIGIT DMM",
    badgeCode: "RMS",
    categoryTitle: "TRUE-RMS DIGITAL\nPRECISION MULTIMETER",
    src: "/images/4th.png",
    metricHeader: "DMM 480k rdg/s",
    specs: [
      { label: "max", val: "480 k/s" },
      { label: "avg", val: "0.0035%" },
      { label: "min", val: "True-RMS" },
    ],
    accentIcon: "gauge",
  },
  {
    id: 5,
    model: "LAB-8051",
    badgeLabel: "MODULAR TRAINER",
    badgeCode: "LAB",
    categoryTitle: "MICROCONTROLLER\nEMBEDDED TRAINER BENCH",
    src: "/images/5th.png",
    metricHeader: "MCU TRAINER KIT",
    specs: [
      { label: "max", val: "8051/ARM" },
      { label: "avg", val: "Sensors" },
      { label: "min", val: "Modular" },
    ],
    accentIcon: "cpu",
  },
  {
    id: 6,
    model: "OWM5500",
    badgeLabel: "MULTI-CH DAQ",
    badgeCode: "T9",
    categoryTitle: "ANEMOMETER &\nDATA LOGGER",
    src: "/images/6th.png",
    metricHeader: "WIND SPD m/s",
    specs: [
      { label: "max", val: "37.3" },
      { label: "avg", val: "24.2" },
      { label: "min", val: "5.4" },
    ],
    accentIcon: "fan",
  },
];

export default function AboutLovokit({ customProducts }) {
  const products = customProducts || defaultProducts;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Trigger Entrance Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth two-phase transition: relaxed fade-out (500ms) -> switch -> fade-in (500ms)
  const goToSlide = (nextIndex) => {
    if (isFading || nextIndex === currentIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsFading(false);
    }, 500); // 500ms smooth fade-out, then new product smoothly fades in
  };

  const handlePrev = () => {
    const prev = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    goToSlide(prev);
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % products.length;
    goToSlide(next);
  };

  // Auto-slide every 4.8 seconds (pauses when user hovers)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4800);

    return () => clearInterval(interval);
  }, [isHovered, currentIndex, isFading]);

  const currentProduct = products[currentIndex] || products[0];

  return (
    <section
      ref={sectionRef}
      id="quality-precision"
      aria-label="Quality & Precision"
      className="relative w-full overflow-hidden bg-white py-14 sm:py-20 lg:py-24 border-t border-slate-100 select-none"
    >
      {/* Warm Ambient Yellow Spotlight in the background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] sm:w-[680px] h-[550px] sm:h-[680px] bg-gradient-to-l from-amber-100/50 via-amber-50/25 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute right-16 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFC400]/15 rounded-full blur-2xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Typography, Separator & Action Buttons       */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Main Headline with Staggered Entrance */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              <span
                className={`block ${
                  isVisible ? "animate-hero-heading-1" : "opacity-0"
                }`}
              >
                Quality &amp; Precision
              </span>
            </h2>

            {/* Black Accent Separator Line */}
            <div
              className={`w-12 h-1 bg-slate-900 rounded-full mt-5 mb-6 ${
                isVisible ? "animate-hero-desc" : "opacity-0"
              }`}
            />

            {/* Description Body Text */}
            <p
              className={`text-slate-600 text-xs sm:text-sm md:text-[14px] leading-relaxed max-w-lg mb-8 font-normal ${
                isVisible ? "animate-hero-desc" : "opacity-0"
              }`}
            >
              At Lovokit, we combine premium B2B enterprise service with an
              uncompromising attention to detail. Whether it&apos;s sourcing
              machinery for a factory floor, fulfilling precision hand tool
              requirements, or setting up a bulk supply chain — we take care of
              the procurement with guaranteed 100% genuine factory warranty.
            </p>

            {/* Action Buttons */}
            <div
              className={`flex items-center gap-3.5 mb-8 ${
                isVisible ? "animate-hero-actions" : "opacity-0"
              }`}
            >
              <Link
                href="/products"
                className="bg-[#FFC400] hover:bg-[#E6B000] text-black font-black text-xs uppercase tracking-wider px-7 py-3 rounded-none shadow-sm transition-all transform active:scale-95 inline-flex items-center justify-center cursor-pointer"
              >
                FEATURED
              </Link>
              <Link
                href="/contact"
                className="bg-[#FFC400] hover:bg-[#E6B000] text-black font-black text-xs uppercase tracking-wider px-7 py-3 rounded-none shadow-sm transition-all transform active:scale-95 inline-flex items-center justify-center cursor-pointer"
              >
                CATALOG
              </Link>
            </div>

            {/* Six Products Dot Indicators & Current Info */}
            <div
              className={`flex items-center gap-3 pt-4 border-t border-slate-100 ${
                isVisible ? "animate-hero-trust" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {products.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? "w-7 bg-[#FFC400]"
                        : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-2">
                0{currentIndex + 1} / 0{products.length}
              </span>
              <span className="text-[11px] font-bold text-slate-700 truncate max-w-[200px]">
                · {currentProduct.model}
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Exact Metallic Neon Showcase Box            */}
          {/* Matching Reference: media_1795156556726_3c00b276.png      */}
          {/* ========================================================= */}
          <div
            className={`lg:col-span-7 relative flex items-center justify-center py-6 sm:py-8 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-[0.96]"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Master Showcase Frame Container */}
            <div className="relative w-full max-w-[580px] aspect-[1.62/1] sm:aspect-[1.58/1] flex items-center justify-center">
              
              {/* ---------------------------------------------------- */}
              {/* 1. SKEWED METALLIC BEZEL & NEON LIGHT TUBE (Outer)   */}
              {/* ---------------------------------------------------- */}
              <div
                className="absolute inset-0 [transform:skewX(-13deg)] rounded-[32px] sm:rounded-[38px] p-[5px] sm:p-[6px] transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, #1b1e24 0%, #2a2e38 50%, #15171c 100%)",
                  boxShadow:
                    "0 22px 50px -10px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              >
                {/* 1a. Golden Glowing Neon Inner Track */}
                <div
                  className="relative w-full h-full rounded-[27px] sm:rounded-[32px] overflow-hidden p-[2.5px]"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFC400 0%, #FFE072 30%, #FFB300 70%, #FF8F00 100%)",
                    boxShadow:
                      "0 0 24px rgba(255, 196, 0, 0.75), inset 0 0 16px rgba(255, 196, 0, 0.65)",
                  }}
                >
                  {/* 1b. Brushed Ceramic / Silver Light Plate Surface */}
                  <div
                    className="relative w-full h-full rounded-[25px] sm:rounded-[30px] overflow-hidden"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 40%, #ffffff 0%, #f4f6f9 55%, #e6e9ee 100%)",
                    }}
                  >
                    {/* Corner Diagonal Hatch Pattern: Top-Right */}
                    <div
                      className="absolute -top-1 -right-1 w-28 sm:w-36 h-28 sm:h-36 pointer-events-none opacity-[0.22]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, #1E293B, #1E293B 2px, transparent 2px, transparent 8px)",
                        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                      }}
                    />

                    {/* Corner Diagonal Hatch Pattern: Bottom-Left */}
                    <div
                      className="absolute -bottom-1 -left-1 w-24 sm:w-32 h-24 sm:h-32 pointer-events-none opacity-[0.22]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, #1E293B, #1E293B 2px, transparent 2px, transparent 8px)",
                        clipPath: "polygon(0 100%, 0 0, 100% 100%)",
                      }}
                    />

                    {/* Subtle Star / Glint Accent near bottom right */}
                    <div className="absolute right-6 sm:right-8 bottom-6 sm:bottom-7 pointer-events-none opacity-40">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z"
                          fill="#94A3B8"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 2. TOP-LEFT METALLIC BADGE: ⚡ MULTI-CH DAQ | T9     */}
              {/* ---------------------------------------------------- */}
              <div
                className={`absolute -top-3.5 sm:-top-4 left-6 sm:left-10 z-30 inline-flex items-center shadow-xl transition-opacity duration-500 ease-in-out ${
                  isFading ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
                }}
              >
                <div
                  className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 border border-[#FFC400]/60"
                  style={{
                    background:
                      "linear-gradient(135deg, #1A1D24 0%, #2D323E 50%, #15171C 100%)",
                  }}
                >
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC400] fill-[#FFC400]" />
                  <span className="text-[#FFC400] font-black text-[11px] sm:text-xs tracking-wider uppercase">
                    {currentProduct.badgeLabel}
                  </span>
                  <span className="text-white/30 text-xs font-light">|</span>
                  <span className="text-white font-black text-[11px] sm:text-xs tracking-wider uppercase">
                    {currentProduct.badgeCode}
                  </span>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 3. INNER SHOWCASE CONTENT (100% Upright & Straight)  */}
              {/* ---------------------------------------------------- */}
              <div className="relative z-20 w-full h-full flex items-center justify-between px-7 sm:px-11 py-6 pointer-events-none">
                
                {/* 3a. LEFT TECHNICAL READOUT BLOCK */}
                <div
                  className={`w-[28%] sm:w-[26%] flex flex-col justify-center z-20 pointer-events-auto transition-opacity duration-500 ease-in-out ${
                    isFading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2 sm:mb-2.5">
                    {currentProduct.accentIcon === "wave" && (
                      <Activity className="w-3.5 h-3.5 text-slate-800" />
                    )}
                    {currentProduct.accentIcon === "radio" && (
                      <Radio className="w-3.5 h-3.5 text-slate-800" />
                    )}
                    {currentProduct.accentIcon === "zap" && (
                      <Zap className="w-3.5 h-3.5 text-slate-800 fill-slate-800" />
                    )}
                    {currentProduct.accentIcon === "gauge" && (
                      <Gauge className="w-3.5 h-3.5 text-slate-800" />
                    )}
                    {currentProduct.accentIcon === "cpu" && (
                      <Cpu className="w-3.5 h-3.5 text-slate-800" />
                    )}
                    {currentProduct.accentIcon === "fan" && (
                      <span className="text-xs">🌀</span>
                    )}
                    <span className="text-[10px] sm:text-[11px] font-black tracking-tight text-slate-900 uppercase">
                      {currentProduct.metricHeader}
                    </span>
                  </div>

                  {/* Monospace Specs Grid */}
                  <div className="space-y-0.5 sm:space-y-1 font-mono text-[10px] sm:text-[11px]">
                    {currentProduct.specs.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-slate-700 font-bold"
                      >
                        <span className="text-slate-500 font-normal">{item.label}</span>
                        <span className="text-slate-900 font-black">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3b. CENTER PRODUCT RENDER (Pure Fade-In / Fade-Out) */}
                <div
                  className={`relative w-[44%] sm:w-[46%] h-[82%] sm:h-[86%] flex items-center justify-center z-10 pointer-events-auto transition-opacity duration-500 ease-in-out ${
                    isFading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={currentProduct.src}
                      alt={currentProduct.model}
                      fill
                      sizes="(max-width: 1024px) 60vw, 35vw"
                      className="object-contain filter drop-shadow-[0_18px_24px_rgba(0,0,0,0.22)] select-none transition-transform duration-500 hover:scale-105"
                      priority
                    />
                  </div>
                </div>

                {/* 3c. RIGHT MODEL NUMBER & TITLE BLOCK */}
                <div
                  className={`w-[28%] sm:w-[28%] flex flex-col justify-center text-left z-20 pointer-events-auto pl-1 sm:pl-2 transition-opacity duration-500 ease-in-out ${
                    isFading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="text-slate-900 font-black text-base sm:text-xl lg:text-2xl tracking-tight leading-tight">
                    {currentProduct.model}
                  </div>
                  {/* Subtle Gold Gradient Underline */}
                  <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-[#FFC400] to-transparent my-1.5 sm:my-2" />
                  <div className="text-slate-900 font-extrabold text-[10px] sm:text-[11px] lg:text-xs uppercase tracking-wider leading-tight whitespace-pre-line">
                    {currentProduct.categoryTitle}
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 4. CLEAN NAVIGATION ARROWS (At Bottom Just Above Line)*/}
              {/* ---------------------------------------------------- */}
              <div className="absolute bottom-1.5 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6 sm:gap-8 pointer-events-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Product"
                  className="p-1 text-slate-700 hover:text-[#FFC400] transition-colors cursor-pointer group active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Product"
                  className="p-1 text-slate-700 hover:text-[#FFC400] transition-colors cursor-pointer group active:scale-90"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
