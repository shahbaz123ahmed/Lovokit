
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Activity, Layers, Monitor } from "lucide-react";

export default function FeaturedProduct() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Future-ready carousel slides data
  const slides = [
    {
      id: "owon-xds3202e",
      eyebrow: "FEATURED PRODUCT",
      heading: "High-Performance Digital Oscilloscope",
      description:
        "Advanced measurement, analysis and debugging for education, R&D and industrial applications.",
      specs: [
        {
          id: "bandwidth",
          value: "200 MHz",
          label: "Bandwidth",
          icon: <Activity className="w-5 h-5 text-[#FFC400]" />,
        },
        {
          id: "channels",
          value: "2 Channels",
          label: "(Upgradable)",
          icon: <Layers className="w-5 h-5 text-[#FFC400]" />,
        },
        {
          id: "sampling",
          value: "1 GSa/s",
          label: "Real-time Sampling",
          icon: <Monitor className="w-5 h-5 text-[#FFC400]" />,
        },
      ],
      brand: "owon",
      model: "XDS3202E",
      image: "/images/featured/oscilloscope-visual.png",
      ctaHref: "/products/owon-xds3202e",
    },
  ];

  const currentSlide = slides[activeSlide] || slides[0];

  return (
    <section
      id="featured-product"
      aria-label="Featured Product Showcase"
      className="py-12 sm:py-16 md:py-20 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Dark Banner Container */}
        <div className="relative w-full rounded-2xl md:rounded-3xl bg-[#090B10] border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Subtle Ambient Lighting Accents */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
            {/* Soft Warm Golden Ambient Glow Behind Oscilloscope */}
            <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[380px] h-[380px] bg-[#FFC400]/[0.05] rounded-full blur-[90px]" />
            {/* Subtle Diagonal Golden Light Streak */}
            <div className="absolute -top-16 right-[38%] w-[1.5px] h-[360px] bg-gradient-to-b from-transparent via-[#FFC400]/40 to-transparent rotate-45 transform" />
            {/* Dark left vignette for maximum text contrast */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#090B10] via-[#090B10]/80 to-transparent z-10 hidden lg:block" />
          </div>

          {/* Top-Right Brand & Model Badge */}
          <div className="absolute top-5 right-6 sm:top-7 sm:right-8 z-20 text-right">
            <div className="flex items-center justify-end font-black text-xl sm:text-2xl text-white tracking-tight leading-none">
              <span>{currentSlide.brand}</span>
              <span className="text-[10px] sm:text-xs ml-0.5 -mt-2 font-normal text-gray-300">®</span>
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-[#FFC400] tracking-widest uppercase mt-0.5">
              {currentSlide.model}
            </div>
          </div>

          {/* Banner Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center p-6 sm:p-8 md:p-10 lg:p-12 min-h-[380px] sm:min-h-[420px]">
            {/* Left Column: Product Information & Specifications */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center space-y-5 lg:space-y-6 pt-6 sm:pt-4 lg:pt-0">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-[10.5px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-gray-300">
                <span className="text-[#FFC400] text-sm font-black">—</span>
                <span>{currentSlide.eyebrow}</span>
              </div>

              {/* Heading */}
              <h3 className="text-2xl sm:text-3xl md:text-[2.25rem] font-black tracking-tight text-white leading-[1.14]">
                {currentSlide.heading}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed max-w-lg">
                {currentSlide.description}
              </p>

              {/* Technical Highlights / Key Specifications */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-1 sm:pt-2 border-y border-white/[0.08] py-3.5 sm:py-4">
                {currentSlide.specs.map((spec) => (
                  <div key={spec.id} className="flex items-center gap-2 sm:gap-2.5">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex-shrink-0">
                      {spec.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-[13px] font-extrabold text-white tracking-tight leading-tight">
                        {spec.value}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-gray-400 font-normal leading-tight">
                        {spec.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call-to-Action Button */}
              <div className="pt-2">
                <Link
                  href={currentSlide.ctaHref}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm tracking-wide uppercase px-6 sm:px-7 py-3 rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(255,196,0,0.3)] hover:shadow-[0_0_30px_rgba(255,196,0,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>View Product</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Right Column: Large Realistic Oscilloscope Product Visual */}
            <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center lg:justify-end mt-2 lg:mt-0">
              <div className="relative w-full max-w-[560px] lg:max-w-[620px] aspect-[704/341]">
                <Image
                  src={currentSlide.image}
                  alt={`${currentSlide.brand} ${currentSlide.model} High-Performance Digital Oscilloscope`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain filter contrast-[1.03] brightness-[1.01] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                />
              </div>
            </div>
          </div>

          {/* Bottom-Right Slider Indicators */}
          <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-8 z-20 flex items-center gap-1.5">
            {[0, 1, 2].map((idx) => {
              const isIndicatorActive = activeSlide === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${isIndicatorActive
                      ? "w-6 bg-[#FFC400] shadow-[0_0_8px_rgba(255,196,0,0.6)]"
                      : "w-3 sm:w-4 bg-white/20 hover:bg-white/40"
                    }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
