"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

// =============================================================================
// 🖼️ HOW TO CHANGE / ADD YOUR OWN IMAGE (Yahan se image badlein):
// -----------------------------------------------------------------------------
// OPTION 1: Apni image file ko project folder me paste karein:
//           public/images/cta/apna-image-name.png (ya .jpg)
//           Aur neeche path update kar dein:
//           export const CTA_DEFAULT_IMAGE = "/images/cta/apna-image-name.jpg";
//
// OPTION 2: Ya simply public/images/cta/building.png file ko apni image se
//           replace (overwrite) kar dein.
// =============================================================================
export const CTA_DEFAULT_IMAGE = "/images/4thsection.png";

export default function CtaBanner({
  backgroundImage = CTA_DEFAULT_IMAGE,
  imageAlt = "LOVOKIT Headquarters and Modern Technology Showroom",
}) {
  // Scroll-Trigger Observer for smooth entrance animations
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

  return (
    <section
      ref={sectionRef}
      id="cta-banner"
      aria-label="Work Together Call to Action"
      className="relative w-full overflow-hidden bg-[#07090E] border-t border-white/[0.06] py-14 sm:py-16 md:py-0 md:h-[430px] flex items-center"
    >
      {/* Background Architectural Facility Image - Full Width Span */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out ${isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-105"
            }`}
        >
          <Image
            src={backgroundImage}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-right md:object-center filter brightness-[0.92] contrast-[1.04]"
          />
        </div>

        {/* Directional Dark Gradient Overlay for Maximum Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090E] via-[#07090E]/85 via-35% sm:via-45% to-transparent to-90% z-1" />

        {/* Subtle Top & Bottom Cinematic Edge Shading */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#07090E] to-transparent z-1" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#07090E] to-transparent z-1" />

        {/* Soft Golden Ambient Glow */}
        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[350px] h-[350px] bg-[#FFC400]/[0.03] rounded-full blur-[90px] z-1" />
      </div>

      {/* Main Content Container on Left with Staggered Scroll Entrance Effects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-6">
        <div className="max-w-xl lg:max-w-xl xl:max-w-2xl flex flex-col justify-center space-y-4 sm:space-y-5">
          {/* Eyebrow Tag */}
          <div
            className={`inline-flex items-center gap-2 text-[10.5px] sm:text-xs font-extrabold tracking-[0.22em] uppercase text-gray-300 transition-all duration-700 delay-100 ease-out ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
              }`}
          >
            <span className="text-[#FFC400] text-sm font-black">—</span>
            <span>LET&apos;S WORK TOGETHER</span>
          </div>

          {/* Main Heading */}
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-black tracking-tight text-white leading-[1.12] transition-all duration-700 delay-200 ease-out ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
              }`}
          >
            Get the Right Instrumentation Solution{" "}
            <span className="block mt-1 sm:mt-1.5 text-[#FFC400] drop-shadow-[0_2px_15px_rgba(255,196,0,0.22)]">
              for Your Need
            </span>
          </h2>

          {/* Supporting Description */}
          <p
            className={`text-xs sm:text-sm md:text-[15px] text-gray-300 font-normal leading-relaxed max-w-lg transition-all duration-700 delay-300 ease-out ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
              }`}
          >
            Talk to our experts and find the best instruments, kits, or custom
            solutions for your lab, industry, or institution.
          </p>

          {/* CTA Action Buttons (Responsive: side-by-side on desktop, stackable on mobile) */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2 sm:pt-3 transition-all duration-700 delay-400 ease-out ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
              }`}
          >
            {/* Primary CTA Button */}
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2.5 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm tracking-wide uppercase px-6 sm:px-7 py-3.5 rounded-full transition-all duration-200 shadow-[0_0_25px_rgba(255,196,0,0.3)] hover:shadow-[0_0_35px_rgba(255,196,0,0.5)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            {/* Secondary CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-[#12151D]/90 hover:bg-[#1A1F2C] border border-white/20 hover:border-white/35 text-white font-medium text-xs sm:text-sm px-5 sm:px-6 py-3.5 rounded-full transition-all duration-200 backdrop-blur-md shadow-lg group active:scale-[0.98]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#FFC400] transition-colors" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
