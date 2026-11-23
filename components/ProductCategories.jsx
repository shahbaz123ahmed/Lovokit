"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  BarChart3,
  Zap,
  Gauge,
  Cpu,
  Target,
  Layers,
  ShieldCheck,
} from "lucide-react";
import ProductCategoryCard from "./ProductCategoryCard";

export default function ProductCategories() {
  const [activeId, setActiveId] = useState("oscilloscopes");

  // Scroll Trigger Entrance Observer
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const categories = [
    {
      id: "oscilloscopes",
      title: "Oscilloscopes",
      image: "/images/ecosystem/oscilloscopes.webp",
      icon: Activity,
      badge: "Popular 🔥",
      href: "/products?category=oscilloscopes",
    },
    {
      id: "spectrum-analyzers",
      title: "Spectrum Analyzers",
      titleLine1: "Spectrum",
      titleLine2: "Analyzers",
      image: "/images/ecosystem/spectrum-analyzers.webp",
      icon: BarChart3,
      href: "/products?category=spectrum-analyzers",
    },
    {
      id: "power-supplies",
      title: "Power Supplies",
      titleLine1: "Power",
      titleLine2: "Supplies",
      image: "/images/ecosystem/power-supplies.webp",
      icon: Zap,
      href: "/products?category=power-supplies",
    },
    {
      id: "multimeters",
      title: "Multimeters",
      titleLine1: "Multimeters",
      image: "/images/ecosystem/multimeters.webp",
      icon: Gauge,
      href: "/products?category=multimeters",
    },
    {
      id: "trainer-kits",
      title: "Trainer Kits",
      titleLine1: "Trainer Kits",
      image: "/images/ecosystem/trainer-kits.webp",
      icon: Cpu,
      href: "/products?category=trainer-kits",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="product-ecosystem"
      aria-label="Product Ecosystem"
      className="py-14 sm:py-16 md:py-20 bg-[#F3F4F6] border-t border-slate-200/60 relative overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Soft upper ambient highlight */}
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[140%] max-w-[1700px] h-[550px] rounded-[100%] bg-gradient-to-b from-white/40 via-transparent to-transparent blur-2xl" />

        {/* Ambient warm floor glow */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-24 bg-gradient-to-r from-transparent via-[#FFC400]/10 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Upper-right link row: Rounded pill with yellow border & yellow circle arrow */}
        <div className="flex justify-end mb-4 md:mb-6">
          <Link
            href="/products"
            className={`group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#FFC400] text-xs sm:text-[13px] font-bold text-slate-800 hover:bg-[#FFFDF5] shadow-[0_2px_8px_rgba(255,196,0,0.12)] transition-all duration-200 ${
              isVisible ? "animate-hero-badge" : "opacity-0"
            }`}
          >
            <span>View All Categories</span>
            <span className="w-5 h-5 rounded-full bg-[#FFC400] text-black flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
              <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
            </span>
          </Link>
        </div>

        {/* Main Content Layout: Left Heading & Feature Badges + Right 5 Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-8 items-center">
          {/* Left Column (Hero-size Heading & Badges) */}
          <div className="xl:col-span-4 flex flex-col justify-center xl:pr-3">
            {/* Section Eyebrow */}
            <div
              className={`inline-flex items-center gap-2 text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-gray-500 mb-2.5 ${
                isVisible ? "animate-hero-badge" : "opacity-0"
              }`}
            >
              <span className="w-5 h-0.5 bg-[#FFC400] inline-block rounded-full" />
              <span>PRODUCT ECOSYSTEM</span>
            </div>

            {/* Section Heading: Exact Hero Section Heading Scale & Gap */}
            <h2 className="text-2xl sm:text-3xl md:text-[2.45rem] lg:text-[2.85rem] xl:text-[3.15rem] font-black tracking-tight leading-[1.12]">
              <span
                className={`text-slate-950 block ${
                  isVisible ? "animate-hero-heading-1" : "opacity-0"
                }`}
              >
                Explore Our
              </span>
              <span
                className={`text-[#FFB800] block mt-2.5 sm:mt-3 ${
                  isVisible ? "animate-hero-heading-2" : "opacity-0"
                }`}
              >
                Product Range
              </span>
            </h2>

            {/* Supporting Short Description */}
            <p
              className={`mt-4 text-xs sm:text-[13px] text-gray-500 leading-relaxed max-w-md ${
                isVisible ? "animate-hero-desc" : "opacity-0"
              }`}
            >
              High-precision test, measurement, and educational instruments engineered for laboratories, R&amp;D centers, and industrial automation.
            </p>

            {/* 3 Key Feature Badges Row */}
            <div
              className={`mt-6 pt-5 border-t border-slate-300/70 flex flex-wrap items-center gap-3.5 sm:gap-4 text-slate-700 ${
                isVisible ? "animate-hero-trust" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#FFB800] flex-shrink-0" strokeWidth={2.4} />
                <span className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 whitespace-nowrap">
                  Precision &amp; Accuracy
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#FFB800] flex-shrink-0" strokeWidth={2.4} />
                <span className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 whitespace-nowrap">
                  Wide Product Range
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFB800] flex-shrink-0" strokeWidth={2.4} />
                <span className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 whitespace-nowrap">
                  Reliable &amp; Long-Lasting
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop xl:): Five Product Category Cards in 5 Columns */}
          <div
            className={`hidden xl:grid xl:col-span-8 grid-cols-5 gap-3.5 items-stretch ${
              isVisible ? "animate-about-cards-appear" : "opacity-0"
            }`}
          >
            {categories.map((category) => (
              <ProductCategoryCard
                key={category.id}
                category={category}
                isActive={activeId === category.id}
                onSelect={() => setActiveId(category.id)}
              />
            ))}
          </div>

          {/* Right Column (Mobile & Tablet < xl): Auto-Running Infinite Marquee Ticker */}
          <div
            className={`xl:hidden w-full overflow-hidden py-2 relative ${
              isVisible ? "animate-about-cards-appear" : "opacity-0"
            }`}
          >
            {/* Soft Edge Gradient Masks */}
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-[#F3F4F6] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-[#F3F4F6] to-transparent z-10 pointer-events-none" />

            {/* Seamless Infinite Running Ticker (Continuous Glide, Pauses on Touch/Hover) */}
            <div className="animate-category-marquee flex items-center gap-3.5 py-1">
              {[...categories, ...categories, ...categories].map((category, idx) => (
                <div
                  key={`${category.id}-${idx}`}
                  className="w-[210px] sm:w-[230px] flex-shrink-0"
                >
                  <ProductCategoryCard
                    category={category}
                    isActive={activeId === category.id}
                    onSelect={() => setActiveId(category.id)}
                  />
                </div>
              ))}
            </div>

            {/* Mobile Helper Indicator Strip */}
            <div className="flex items-center justify-between px-2 mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
                <span>Auto-running categories • Tap to browse</span>
              </span>
              <Link
                href="/products"
                className="text-amber-600 hover:text-amber-700 font-extrabold uppercase tracking-wider flex items-center gap-1"
              >
                <span>All Categories</span>
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
