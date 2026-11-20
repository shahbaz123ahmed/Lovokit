"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

// =========================================================================
// 6 PRODUCT IMAGES LIST (Auto-cycling Showcase)
// =========================================================================
const defaultProducts = [
  {
    id: 1,
    title: "Precision Digital Storage Oscilloscope",
    badge: "4 Channels",
    spec: "200 MHz · 1 GSa/s · Touch Display",
    src: "/images/1st.png",
  },
  {
    id: 2,
    title: "High-Bandwidth Spectrum Analyzer",
    badge: "9 kHz - 3.2 GHz",
    spec: "-161 dBm/Hz DANL · Tracking Generator",
    src: "/images/2nd.png",
  },
  {
    id: 3,
    title: "DC Regulated Linear Power Supply",
    badge: "Triple Output",
    spec: "30V / 5A · Ultra-Low Ripple & Noise",
    src: "/images/3rd.png",
  },
  {
    id: 4,
    title: "True-RMS Digital Industrial Multimeter",
    badge: "6½ Digits",
    spec: "High Precision DMM · Trend Capture",
    src: "/images/4th.png",
  },
  {
    id: 5,
    title: "Modular Microcontroller Trainer Kit",
    badge: "Lab Ready",
    spec: "Embedded Systems · Sensor Interfaces",
    src: "/images/5th.png",
  },
  {
    id: 6,
    title: "Modular DAQ Chassis & Automation",
    badge: "Multi-Ch DAQ",
    spec: "Automated QC Test Bench · USB/LAN",
    src: "/images/6th.png",
  },
];

export default function AboutLovokit({ customProducts }) {
  const products = customProducts || defaultProducts;
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Auto-slide through all 6 images every 3.8 seconds (pauses on user hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isHovered, products.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const currentProduct = products[currentIndex] || products[0];

  return (
    <section
      ref={sectionRef}
      id="quality-precision"
      aria-label="Quality & Precision"
      className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24 border-t border-slate-100 select-none"
    >
      {/* Warm Ambient Yellow Spotlight in the background on the right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] sm:w-[650px] h-[550px] sm:h-[650px] bg-gradient-to-l from-amber-100/60 via-amber-50/30 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFC400]/15 rounded-full blur-2xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Typography, Separator & Action Buttons       */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Main Headline (Matching Reference: Quality & Precision) */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Quality &amp; Precision
            </h2>

            {/* Black Accent Separator Line */}
            <div className="w-12 h-1 bg-slate-900 rounded-full mt-5 mb-6" />

            {/* Description Body Text */}
            <p className="text-slate-600 text-xs sm:text-sm md:text-[14px] leading-relaxed max-w-lg mb-8 font-normal">
              At Lovokit, we combine premium B2B enterprise service with an
              uncompromising attention to detail. Whether it&apos;s sourcing
              machinery for a factory floor, fulfilling precision hand tool
              requirements, or setting up a bulk supply chain — we take care of
              the procurement with guaranteed 100% genuine factory warranty.
            </p>

            {/* Action Buttons (Matching Reference: Two Solid Yellow Buttons) */}
            <div className="flex items-center gap-3.5 mb-8">
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
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                {products.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentIndex(idx)}
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
                · {currentProduct.title}
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Skewed Parallelogram Neon Showcase Box      */}
          {/* (Matching Hand-Drawn Reference & Card Reference)          */}
          {/* ========================================================= */}
          <div
            className="lg:col-span-7 relative flex items-center justify-center py-6 sm:py-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* The Outer Showcase Container */}
            <div className="relative w-full max-w-[530px] aspect-[1.3/1] flex items-center justify-center">
              {/* -------------------------------------------------------- */}
              {/* 1. SKEWED PARALLELOGRAM BOX (Exact Match to User Sketch) */}
              {/* -------------------------------------------------------- */}
              <div
                className="absolute inset-0 [transform:skewX(-13deg)] rounded-[38px] sm:rounded-[46px] border-2 border-[#FFC400] bg-gradient-to-b from-white/80 via-amber-50/25 to-amber-100/20 backdrop-blur-[2px] pointer-events-none transition-all duration-500"
                style={{
                  boxShadow:
                    "0 0 32px rgba(255, 196, 0, 0.5), inset 0 0 22px rgba(255, 196, 0, 0.16), 0 20px 45px rgba(255, 196, 0, 0.14)",
                }}
              />

              {/* -------------------------------------------------------- */}
              {/* 2. Inner Content Area (100% Straight, Zero Skew / Tilt)  */}
              {/*    Ensures Product Image, Text Badge & Arrows are Straight*/}
              {/* -------------------------------------------------------- */}
              <div className="relative z-20 w-full h-full flex items-center justify-center p-5 sm:p-7">
                {/* 2a. Angled Yellow Badge (100% Straight Text & Alignment) */}
                {currentProduct.badge && (
                  <div className="absolute top-4 left-5 sm:left-7 z-30 inline-flex items-center">
                    <div
                      className="relative bg-[#FFC400] text-black font-black text-xs sm:text-[13px] uppercase tracking-wider px-4 py-1.5 shadow-md"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                      }}
                    >
                      <span>{currentProduct.badge}</span>
                    </div>
                  </div>
                )}

                {/* 2b. Active Product Image (Upright, Drop Shadow) */}
                <div className="relative w-[84%] h-[80%] flex items-center justify-center">
                  <div
                    key={`slide-${currentProduct.id}-${currentIndex}`}
                    className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-500 ease-out"
                  >
                    <Image
                      src={currentProduct.src}
                      alt={currentProduct.title}
                      fill
                      sizes="(max-width: 1024px) 80vw, 45vw"
                      className="object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)] select-none transition-transform duration-500 hover:scale-105"
                      priority
                    />
                  </div>
                </div>

                {/* 2c. Circular Navigation Arrows (Positioned on sides matching Image 2) */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Product"
                  className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-[#FFC400] text-slate-800 hover:text-black border border-gray-200/90 hover:border-[#FFC400] shadow-md flex items-center justify-center transition-all cursor-pointer opacity-85 hover:opacity-100"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Product"
                  className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-[#FFC400] text-slate-800 hover:text-black border border-gray-200/90 hover:border-[#FFC400] shadow-md flex items-center justify-center transition-all cursor-pointer opacity-85 hover:opacity-100"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
