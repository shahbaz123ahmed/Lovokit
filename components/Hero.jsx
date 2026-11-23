"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles,
  MessageSquare,
  FileText,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "ENGINEERED FOR PRECISION",
    icon: Activity,
    headingLine1: "Precision Instruments.",
    headingLine2: "Powerful Possibilities.",
    subheadingTag: null,
    description:
      "Discover high-performance testing, measurement and electronic instruments designed for professionals, research labs and industrial applications.",
    primaryBtn: { text: "Explore Products", href: "/products" },
    trustBadges: [
      { icon: ShieldCheck, label: "Genuine Products" },
      { icon: Truck, label: "Fast Delivery" },
      { icon: Headphones, label: "Expert Support" },
    ],
    bgImage: "/images/1slide.webp",
    mobileImage: "/images/m1.png",
    alt: "LOVOKIT Precision Instruments. Powerful Possibilities.",
  },
  {
    id: 2,
    badge: "PRECISION MEETS PERFORMANCE",
    icon: Sparkles,
    headingLine1: "Advanced Tools for Every",
    headingLine2: "Technical Challenge",
    subheadingTag: "Accuracy. Reliability. Innovation.",
    description:
      "Explore professional-grade testing instruments, measurement equipment and precision tools designed to deliver dependable results across laboratories, industries and technical applications.",
    primaryBtn: { text: "Explore Collection", href: "/products" },
    trustBadges: [
      { icon: ShieldCheck, label: "Genuine Products" },
      { icon: Truck, label: "Fast Delivery" },
      { icon: Headphones, label: "Expert Support" },
    ],
    bgImage: "/images/2slide.webp",
    mobileImage: "/images/m2.png",
    alt: "LOVOKIT Advanced Tools for Every Technical Challenge.",
  },
  {
    id: 3,
    badge: "GET IN TOUCH",
    icon: MessageSquare,
    headingLine1: "Have a Requirement?",
    headingLine2: "Let’s Talk.",
    subheadingTag: null,
    description:
      "Need product recommendations, bulk quotes or technical support? Our team is here to help you find the right solution.",
    primaryBtn: { text: "Get in Touch", href: "/contact" },

    trustBadges: [
      { icon: Headphones, label: "Expert Support" },
      { icon: FileText, label: "Quick Quote" },
      { icon: Package, label: "Bulk Orders" },
    ],
    bgImage: "/images/3slide.webp",
    mobileImage: "/images/m3.png",
    alt: "LOVOKIT Get in Touch - Have a Requirement? Let’s Talk.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Auto-play interval: cycles every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  return (
    <section
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative w-full overflow-hidden bg-white group border-b border-slate-100 sm:flex sm:items-center sm:min-h-[calc(100vh-142px)]"
    >
      {/* 1. Desktop Full-Width Studio Background Banner (Hidden on Mobile) */}
      <div className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none select-none">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${idx === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
          >
            <Image
              src={slide.bgImage}
              alt={slide.alt}
              fill
              priority={true}
              loading="eager"
              unoptimized
              sizes="100vw"
              className="object-cover object-right select-none"
            />
          </div>
        ))}
      </div>

      {/* 2. Main Content Container (Text, Heading, Buttons & Trust Badges on Top) */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-16 pt-5 pb-2 sm:py-14 lg:py-16 relative z-10 select-text">
        {slides.map((slide, idx) => {
          if (idx !== currentSlide) return null;
          return (
            <div
              key={`slide-content-${slide.id}`}
              className="max-w-md sm:max-w-xl lg:max-w-2xl flex flex-col justify-center items-start text-left space-y-3 sm:space-y-4 lg:space-y-5 select-text"
            >
              {/* Top Yellow Pill Badge - Flush Left */}
              <div className="flex items-center animate-hero-badge">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#FFC400] text-black text-[10px] sm:text-[11px] font-black tracking-wider uppercase px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-xs">
                  <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-black/15 flex items-center justify-center shrink-0">
                    <slide.icon className="w-2 sm:w-2.5 h-2 sm:h-2.5 stroke-[3] text-black" />
                  </span>
                  <span>{slide.badge}</span>
                </div>
              </div>

              {/* Heading in EXACTLY 2 Lines - Flush Left */}
              <h1 className="text-2xl sm:text-3xl md:text-[2.45rem] lg:text-[2.85rem] xl:text-[3.15rem] font-black tracking-tight text-slate-950 leading-[1.14] text-left">
                <span className="block sm:whitespace-nowrap animate-hero-heading-1">{slide.headingLine1}</span>
                <span className="block sm:whitespace-nowrap mt-1 sm:mt-2.5 text-[#FFB800] drop-shadow-xs animate-hero-heading-2">
                  {slide.headingLine2}
                </span>
              </h1>

              {/* Subheading Tag (when present, e.g. Slide 2: Accuracy. Reliability. Innovation.) - Flush Left */}
              {slide.subheadingTag && (
                <div className="inline-flex items-center gap-2 animate-hero-subtag">
                  <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-slate-900 bg-amber-100/70 border border-[#FFC400] px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full shadow-2xs">
                    {slide.subheadingTag}
                  </span>
                </div>
              )}

              {/* Description - Flush Left */}
              <p className="text-xs sm:text-sm lg:text-[15px] text-slate-700 sm:text-slate-600 font-medium leading-relaxed max-w-sm sm:max-w-lg text-left animate-hero-desc">
                {slide.description}
              </p>

              {/* Call to Action Button - Flush Left, Natural Pill Width */}
              <div className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-4 pt-1 sm:pt-2 animate-hero-actions">
                <Link
                  href={slide.primaryBtn.href}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm tracking-wide px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 text-center shrink-0 cursor-pointer select-none"
                >
                  <span>{slide.primaryBtn.text}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </Link>
              </div>

              {/* Trust Highlights Strip below buttons - Flush Left */}
              <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 sm:gap-5 pt-1.5 sm:pt-3 text-[11px] sm:text-xs font-bold text-slate-800 animate-hero-trust">
                {slide.trustBadges.map((badge, bIdx) => (
                  <React.Fragment key={bIdx}>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <badge.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFB800] shrink-0" />
                      <span>{badge.label}</span>
                    </div>

                    {bIdx < slide.trustBadges.length - 1 && (
                      <div className="h-3.5 w-[1px] bg-slate-300/80 hidden sm:block" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Mobile Rounded Image Card Display (Generous Height matching Reference) */}
      <div className="sm:hidden px-4 pt-3 pb-2 w-full relative z-10">
        <div className="relative w-full h-[230px] xs:h-[270px] rounded-[22px] overflow-hidden bg-white border border-slate-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
          {slides.map((slide, idx) => (
            <div
              key={`mobile-img-${slide.id}`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
            >
              <Image
                src={slide.mobileImage || slide.bgImage}
                alt={slide.alt}
                fill
                priority={true}
                loading="eager"
                unoptimized
                sizes="100vw"
                className="object-cover object-center select-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Desktop Navigation Chevrons */}
      <button
        onClick={goToPrev}
        aria-label="Previous Slide"
        className="hidden sm:block absolute left-0.5 sm:left-1.5 lg:left-2.5 top-1/2 -translate-y-1/2 z-30 p-1.5 text-slate-600 hover:text-[#FFC400] transition-all hover:scale-125 active:scale-90 cursor-pointer focus:outline-none"
      >
        <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2] sm:stroke-[2.2] drop-shadow-xs" />
      </button>

      <button
        onClick={goToNext}
        aria-label="Next Slide"
        className="hidden sm:block absolute right-0.5 sm:right-1.5 lg:right-2.5 top-1/2 -translate-y-1/2 z-30 p-1.5 text-slate-600 hover:text-[#FFC400] transition-all hover:scale-125 active:scale-90 cursor-pointer focus:outline-none"
      >
        <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2] sm:stroke-[2.2] drop-shadow-xs" />
      </button>

      {/* 5. Desktop Carousel Dots */}
      <div className="hidden sm:flex absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 cursor-pointer ${idx === currentSlide
              ? "w-6 h-2 rounded-full bg-[#FFC400] shadow-xs"
              : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400"
              }`}
          />
        ))}
      </div>

      {/* 6. Mobile Bottom Slider Bar (< ••• >) directly below image card */}
      <div className="sm:hidden w-full flex items-center justify-center gap-3 pt-3 pb-6 relative z-30">
        <button
          onClick={goToPrev}
          aria-label="Previous Slide"
          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#FFC400] hover:text-black text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 cursor-pointer ${idx === currentSlide
                ? "w-6 h-2 rounded-full bg-[#FFC400] shadow-xs"
                : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400"
                }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          aria-label="Next Slide"
          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#FFC400] hover:text-black text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-sm"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
}
