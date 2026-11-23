"use client";

import React from "react";
import { Headphones, Wrench, Gauge, ShieldCheck } from "lucide-react";
import {
  LovosisLogo,
  OwonLogo,
  UniTLogo,
  RigolLogo,
  SiglentLogo,
  KeysightLogo,
  TektronixLogo,
} from "./PartnerLogos";

export default function PartnersAndServices() {
  const partners = [
    { id: "lovosis", name: "LOVOSIS", component: LovosisLogo },
    { id: "owon", name: "OWON", component: OwonLogo },
    { id: "unit", name: "UNI-T", component: UniTLogo },
    { id: "rigol", name: "RIGOL", component: RigolLogo },
    { id: "siglent", name: "SIGLENT", component: SiglentLogo },
    { id: "keysight", name: "Keysight", component: KeysightLogo },
    { id: "tektronix", name: "Tektronix", component: TektronixLogo },
  ];

  const services = [
    {
      id: "consultation",
      title: "Product Consultation",
      description: "Get expert recommendations.",
      icon: Headphones,
    },
    {
      id: "installation",
      title: "Installation & Setup",
      description: "On-site or remote assistance.",
      icon: Wrench,
    },
    {
      id: "calibration",
      title: "Calibration & Maintenance",
      description: "Ensure long-term accuracy and performance.",
      icon: Gauge,
    },
    {
      id: "warranty",
      title: "Warranty & Repairs",
      description: "Reliable after-sales support.",
      icon: ShieldCheck,
    },
  ];

  // 4x duplicated arrays to guarantee a perfectly seamless infinite loop at -50% translateX
  const marqueePartners = [...partners, ...partners, ...partners, ...partners];
  const marqueeServices = [...services, ...services, ...services, ...services];

  return (
    <section
      id="partners-services"
      aria-label="Technology Partners and Support Services"
      className="py-12 sm:py-14 md:py-16 bg-[#F3F4F6] border-t border-slate-200/60 relative overflow-hidden select-none"
    >
      {/* Decorative Corner Geometric Sweeps matching Reference */}
      {/* Top-left decorative corner swoop */}
      <div className="absolute top-0 left-0 w-32 sm:w-44 md:w-56 h-32 sm:h-44 md:h-56 pointer-events-none select-none overflow-hidden z-0">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 0 L 200 0 C 140 40 40 140 0 200 Z"
            fill="url(#psYellowCornerTL)"
          />
          <defs>
            <linearGradient id="psYellowCornerTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFAA00" />
              <stop offset="100%" stopColor="#FFC400" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom-right decorative corner swoop - Flush with exact bottom & right edge (no gaps) */}
      <div className="absolute bottom-0 right-0 w-32 sm:w-44 md:w-56 h-24 sm:h-32 md:h-40 pointer-events-none select-none overflow-hidden z-0">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M 200 200 L 0 200 C 60 160 160 60 200 0 Z"
            fill="url(#psYellowCornerBR)"
          />
          <defs>
            <linearGradient id="psYellowCornerBR" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFAA00" />
              <stop offset="100%" stopColor="#FFC400" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ROW 1: Our Technology Partners (Continuous Marquee: Right to Left) */}
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Section Heading Left */}
          <div className="w-full lg:w-52 xl:w-60 flex-shrink-0 z-20 pr-5 lg:pr-7">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-4 h-0.5 bg-[#FFC400] inline-block rounded-full" />
              <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-slate-500">
                OUR
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-[1.15]">
              <span className="text-slate-950 block">Technology</span>
              <span className="text-[000000] block">Partners</span>
            </h3>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden lg:block w-[1px] h-14 bg-slate-300/80 flex-shrink-0 z-20" />

          {/* Marquee Track Container: Right to Left (Starts immediately at the vertical divider line) */}
          <div className="flex-1 overflow-hidden relative min-w-0 mt-4 lg:mt-0">
            <div className="animate-marquee-left flex items-center gap-3 sm:gap-3.5 py-1">
              {marqueePartners.map((partner, index) => {
                const LogoComponent = partner.component;
                return (
                  <div
                    key={`partner-${partner.id}-${index}`}
                    className="w-[165px] sm:w-[185px] lg:w-[195px] flex-shrink-0 bg-white rounded-[18px] sm:rounded-[20px] border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(255,196,0,0.12)] hover:border-[#FFC400]/60 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center p-3 h-16 sm:h-[68px] cursor-pointer"
                    title={partner.name}
                    aria-label={partner.name}
                  >
                    <div className="flex items-center justify-center max-w-[85%] max-h-[70%]">
                      <LogoComponent />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="w-full h-px bg-slate-300/60 my-6 sm:my-8" />

        {/* ROW 2: Comprehensive Support & Services (Continuous Marquee: Left to Right) */}
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Section Heading Left */}
          <div className="w-full lg:w-52 xl:w-60 flex-shrink-0 z-20 pr-5 lg:pr-7">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-4 h-0.5 bg-[#FFC400] inline-block rounded-full" />
              <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-slate-500">
                COMPREHENSIVE
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-[1.15]">
              <span className="text-slate-950 block">Support &amp;</span>
              <span className="text-[000000] block">Services</span>
            </h3>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden lg:block w-[1px] h-14 bg-slate-300/80 flex-shrink-0 z-20" />

          {/* Marquee Track Container: Left to Right (Starts immediately at the vertical divider line) */}
          <div className="flex-1 overflow-hidden relative min-w-0 mt-4 lg:mt-0">
            <div className="animate-marquee-right flex items-center gap-3 sm:gap-3.5 py-1">
              {marqueeServices.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`service-${item.id}-${index}`}
                    className="w-[270px] sm:w-[295px] lg:w-[315px] flex-shrink-0 bg-white rounded-[18px] sm:rounded-[20px] border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(255,196,0,0.12)] hover:border-[#FFC400]/60 hover:-translate-y-0.5 transition-all duration-200 p-3.5 sm:p-4 flex items-center gap-3.5 cursor-default"
                  >
                    {/* Soft yellow icon badge */}
                    <div className="w-10 h-10 rounded-xl bg-amber-50/90 border border-[#FFC400]/40 flex items-center justify-center flex-shrink-0 text-[#FFB800] shadow-2xs">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    {/* Service Text */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-[13px] font-bold text-slate-950 tracking-tight leading-snug truncate">
                        {item.title}
                      </span>
                      <span className="text-[10.5px] sm:text-[11.5px] text-slate-500 font-normal leading-snug mt-0.5 truncate">
                        {item.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
