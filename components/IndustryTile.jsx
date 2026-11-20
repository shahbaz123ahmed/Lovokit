"use client";

import React from "react";

export default function IndustryTile({
  name,
  icon: Icon,
}) {
  return (
    <div className="group relative bg-white border border-gray-200/85 hover:border-[#FFC400] rounded-xl p-3 sm:p-3.5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-h-[96px] sm:min-h-[105px] cursor-pointer">
      {/* Top Subtle Yellow Accent Bar on Hover */}
      <div className="absolute top-0 inset-x-4 h-[2px] bg-[#FFC400] opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-200" />

      {/* Minimal Black Lucide Icon */}
      <div className="mb-2 text-slate-900 group-hover:text-black group-hover:scale-105 transition-all duration-200">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
      </div>

      {/* Bold Centered Label */}
      <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-black tracking-tight leading-tight line-clamp-2">
        {name}
      </span>
    </div>
  );
}
