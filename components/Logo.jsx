"use client";

import React from "react";
import Image from "next/image";

export default function Logo({
  className = "",
  showTagline = false,
  darkText = false,
}) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Official LOVOKIT Brand Logo (Yellow & Black LK Monogram + Wordmark) */}
      <div className="relative h-8 sm:h-9 w-36 sm:w-40 flex items-center">
        <Image
          src={
            darkText
              ? "/images/logo/lovokit-logo-dark.png"
              : "/images/logo/lovokit-logo-light.png"
          }
          alt="LOVOKIT - Precision Electronic Test & Measurement Instruments"
          fill
          priority
          sizes="(max-width: 640px) 150px, 180px"
          className="object-contain object-left"
        />
      </div>

      {showTagline && (
        <span
          className={`text-[9px] tracking-wider uppercase font-medium ml-1 hidden sm:inline-block ${darkText ? "text-gray-600" : "text-gray-400"
            }`}
        >
          Instrumentation Solutions
        </span>
      )}
    </div>
  );
}

