"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function SolutionCard({
  title,
  description,
  image,
  href = "#solution",
}) {
  return (
    <div className="group relative rounded-xl md:rounded-2xl overflow-hidden bg-slate-900 border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-300 h-[190px] sm:h-[200px] md:h-[215px] flex flex-col justify-end">
      {/* Background Photographic Image with Smooth Hover Zoom */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover object-center filter brightness-[0.92] contrast-[1.02] group-hover:scale-105 group-hover:brightness-100 transition-all duration-500 ease-out"
      />

      {/* Dark Gradient Overlay for Maximum Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 via-45% to-transparent pointer-events-none" />

      {/* Bottom Content Area */}
      <div className="relative z-10 p-3.5 sm:p-4 flex items-end justify-between gap-2.5">
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-[13px] md:text-sm font-extrabold text-white tracking-tight leading-snug truncate group-hover:text-[#FFC400] transition-colors">
            {title}
          </h4>
          <p className="text-[10px] sm:text-[11px] text-gray-300 font-normal leading-relaxed line-clamp-2 mt-1">
            {description}
          </p>
        </div>

        {/* Circular Arrow Button at Bottom-Right */}
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 group-hover:bg-[#FFC400] text-white group-hover:text-black flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm self-end mb-0.5">
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
