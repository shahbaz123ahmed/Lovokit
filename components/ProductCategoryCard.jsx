"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ProductCategoryCard({
  category,
  isActive,
  onSelect,
}) {
  const IconComponent = category.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`View ${category.title}`}
      className={`group relative rounded-[22px] sm:rounded-[24px] p-2.5 sm:p-3 flex flex-col justify-between transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-[#FFC400]/60 min-h-[230px] sm:min-h-[250px] xl:min-h-[270px] w-full overflow-hidden ${
        isActive
          ? "bg-[#0B0E17] border-2 border-[#FFC400] shadow-[0_12px_36px_rgba(255,196,0,0.28)] scale-[1.02] z-10"
          : "bg-white border border-slate-200/90 hover:border-[#FFC400] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_28px_rgba(255,196,0,0.12)] hover:-translate-y-1"
      }`}
    >
      {/* Featured / Popular Badge */}
      {category.badge && (
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 bg-[#FFC400] text-black text-[9px] sm:text-[10px] font-black tracking-tight px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
          <span>{category.badge}</span>
        </div>
      )}

      {/* Product Visual on Pedestal */}
      <div className="w-full flex-1 flex items-center justify-center relative pt-3 pb-1 overflow-hidden">
        <div className="relative w-full h-28 sm:h-32 xl:h-36">
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            priority={isActive}
          />
        </div>
      </div>

      {/* Bottom Category Icon, Title & Action Arrow */}
      <div className="w-full pt-2 flex items-end justify-between gap-1.5 mt-auto">
        <div className="flex items-center gap-1.5 min-w-0 pr-1">
          {IconComponent && (
            <div className="flex-shrink-0 text-[#FFB800]">
              <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.2} />
            </div>
          )}
          <div className="min-w-0 leading-tight">
            {isActive ? (
              <span className="font-extrabold text-white text-[11px] sm:text-[12px] tracking-tight block truncate">
                {category.title}
              </span>
            ) : (
              <div className="font-bold text-slate-800 group-hover:text-black text-[10.5px] sm:text-[11.5px] leading-[1.2] tracking-tight">
                {category.titleLine1 || category.title}
                {category.titleLine2 && (
                  <span className="block">{category.titleLine2}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Circular Action Button */}
        {isActive ? (
          <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-[#FFC400] text-black flex items-center justify-center flex-shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-110">
            <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
          </div>
        ) : (
          <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-slate-100 group-hover:bg-[#FFC400] text-slate-500 group-hover:text-black flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105">
            <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2.2} />
          </div>
        )}
      </div>
    </button>
  );
}
