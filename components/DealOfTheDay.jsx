"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  Layers,
  Building2,
  Truck,
  Package,
  ChevronRight,
} from "lucide-react";
import DealProductCard from "@/components/DealProductCard";

export default function DealOfTheDay() {
  // Scroll-Trigger Entrance Observer
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

  // Live Countdown Timer state (e.g. 14 hours, 28 minutes, 38 seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 28,
    seconds: 38,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 14, minutes: 28, seconds: 38 }; // loop
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format2 = (num) => String(num).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="deal-of-the-day"
      aria-label="Deal of the Day"
      className="relative w-full overflow-hidden bg-[#F3F4F6] py-14 sm:py-18 lg:py-24 border-t border-slate-200/60"
    >
      {/* Background container (Clean #F3F4F6 studio atmosphere without yellow blocks) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Soft upper subtle highlight */}
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[140%] max-w-[1700px] h-[500px] rounded-[100%] bg-gradient-to-b from-white/40 via-transparent to-transparent blur-2xl" />
      </div>

      {/* Main Container with generous horizontal padding for right-side gap */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Copy, Badges & Timer (Fully Copiable Text)   */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 sm:space-y-6">
            {/* 1. Top Yellow Pill Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-[#FFC400]/40 text-slate-800 text-[11px] sm:text-xs font-black tracking-wide uppercase w-fit shadow-2xs ${
                isVisible ? "animate-hero-badge" : "opacity-0"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span>LIMITED B2B CONTRACTOR DISCOUNT</span>
            </div>

            {/* 2. Large Bold Italic Heading (Fully Copiable) */}
            <h2 className="text-4xl sm:text-5xl md:text-[3.25rem] xl:text-[3.65rem] font-black tracking-tight leading-[1.04] italic">
              <span
                className={`text-slate-950 block ${
                  isVisible ? "animate-hero-heading-1" : "opacity-0"
                }`}
              >
                Deal of
              </span>
              <span
                className={`text-[#FFB800] block mt-1 ${
                  isVisible ? "animate-hero-heading-2" : "opacity-0"
                }`}
              >
                The Day.
              </span>
            </h2>

            {/* 3. Paragraph Description (Fully Copiable) */}
            <p
              className={`text-slate-600 text-xs sm:text-sm lg:text-[13.5px] font-normal leading-relaxed max-w-md pt-0.5 ${
                isVisible ? "animate-hero-desc" : "opacity-0"
              }`}
            >
              Exclusive bulk lot pricing on OEM heavy-duty tools. Direct factory
              rates &amp; 24-hour Pune dispatch.
            </p>

            {/* 4. Three Feature Badges Row */}
            <div
              className={`flex flex-wrap items-center gap-4 sm:gap-5 pt-1 ${
                isVisible ? "animate-hero-trust" : "opacity-0"
              }`}
            >
              {/* Feature 1: Bulk Lot Pricing */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-[#FFC400]/50 flex items-center justify-center shrink-0 text-[#FFC400] shadow-xs">
                  <Layers className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 leading-tight">
                  <span className="block">Bulk Lot</span>
                  <span className="block text-slate-500 font-semibold">
                    Pricing
                  </span>
                </div>
              </div>

              {/* Feature 2: Direct Factory Rates */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-[#FFC400]/50 flex items-center justify-center shrink-0 text-[#FFC400] shadow-xs">
                  <Building2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 leading-tight">
                  <span className="block">Direct</span>
                  <span className="block text-slate-500 font-semibold">
                    Factory Rates
                  </span>
                </div>
              </div>

              {/* Feature 3: 24-Hour Dispatch */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-[#FFC400]/50 flex items-center justify-center shrink-0 text-[#FFC400] shadow-xs">
                  <Truck className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 leading-tight">
                  <span className="block">24-Hour</span>
                  <span className="block text-slate-500 font-semibold">
                    Dispatch
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Countdown Timer White Pill Box */}
            <div
              className={`pt-2 ${
                isVisible ? "animate-hero-actions" : "opacity-0"
              }`}
            >
              <div className="bg-white rounded-[26px] sm:rounded-[30px] p-2.5 sm:p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-200/90 inline-flex items-center gap-2.5 sm:gap-3.5 w-fit">
                <div className="pl-2 sm:pl-3 pr-1">
                  <div className="text-xs sm:text-[13px] font-black text-slate-900 tracking-tight leading-tight whitespace-nowrap">
                    Special Offer
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-wider mt-0.5 whitespace-nowrap">
                    Expires In:
                  </div>
                </div>

                {/* Box 1: Hours */}
                <div className="bg-slate-100/90 rounded-2xl px-3 sm:px-3.5 py-1.5 text-center min-w-[50px] sm:min-w-[56px]">
                  <span className="text-base sm:text-lg font-black text-slate-950 block leading-tight font-mono">
                    {format2(timeLeft.hours)}
                  </span>
                  <span className="text-[9px] sm:text-[9.5px] font-extrabold uppercase text-slate-500 tracking-wider block">
                    HOURS
                  </span>
                </div>

                {/* Box 2: Mins */}
                <div className="bg-slate-100/90 rounded-2xl px-3 sm:px-3.5 py-1.5 text-center min-w-[50px] sm:min-w-[56px]">
                  <span className="text-base sm:text-lg font-black text-slate-950 block leading-tight font-mono">
                    {format2(timeLeft.minutes)}
                  </span>
                  <span className="text-[9px] sm:text-[9.5px] font-extrabold uppercase text-slate-500 tracking-wider block">
                    MINS
                  </span>
                </div>

                {/* Box 3: Secs (LOVOKIT Yellow Highlight) */}
                <div className="bg-[#FFC400] rounded-2xl px-3 sm:px-3.5 py-1.5 text-center min-w-[50px] sm:min-w-[56px] shadow-xs">
                  <span className="text-base sm:text-lg font-black text-black block leading-tight font-mono">
                    {format2(timeLeft.seconds)}
                  </span>
                  <span className="text-[9px] sm:text-[9.5px] font-black uppercase text-black/85 tracking-wider block">
                    SECS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Product Deal Card                          */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end">
            <DealProductCard isVisible={isVisible} className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
