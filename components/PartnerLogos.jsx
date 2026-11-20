import React from "react";

export function OwonLogo({ className = "h-6 sm:h-7" }) {
  return (
    <svg className={className} viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* OWON Official Vector Wordmark in Signature Orange */}
      <text x="0" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="26" fill="#F47920" letterSpacing="-1">
        owon
      </text>
      <circle cx="98" cy="10" r="3" stroke="#F47920" strokeWidth="1" fill="none" />
      <text x="96.5" y="12" fontFamily="sans-serif" fontSize="4" fill="#F47920">R</text>
    </svg>
  );
}

export function UniTLogo({ className = "h-5 sm:h-6" }) {
  return (
    <svg className={className} viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* UNI-T Official Vector Wordmark in Bold Red */}
      <rect x="0" y="0" width="110" height="28" fill="none" />
      <text x="2" y="22" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="22" fill="#E30613" letterSpacing="0.5">
        UNI-T
      </text>
      <circle cx="86" cy="20" r="3" fill="#E30613" />
    </svg>
  );
}

export function RigolLogo({ className = "h-5 sm:h-6" }) {
  return (
    <svg className={className} viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* RIGOL Official Vector Wordmark in Dark Slate with Red Dot */}
      <text x="0" y="22" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="23" fill="#1C2024" letterSpacing="1.5">
        R
      </text>
      {/* I with red square dot */}
      <rect x="23" y="10" width="6" height="12" fill="#1C2024" />
      <rect x="23" y="3" width="6" height="5" fill="#E30613" />
      <text x="34" y="22" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="23" fill="#1C2024" letterSpacing="1.5">
        GOL
      </text>
    </svg>
  );
}

export function SiglentLogo({ className = "h-6 sm:h-7" }) {
  return (
    <svg className={className} viewBox="0 0 130 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* SIGLENT Waveform Icon */}
      <g transform="translate(0, 3)">
        <path d="M4 16C8 7 14 7 18 16C22 25 28 25 32 16" stroke="#0090D0" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 16C14 10 18 10 22 16C26 22 30 22 34 16" stroke="#005BAC" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* SIGLENT Bold Blue Typography */}
      <text x="36" y="22" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="20" fill="#005BAC" letterSpacing="1">
        SIGLENT
      </text>
    </svg>
  );
}

export function KeysightLogo({ className = "h-6 sm:h-7" }) {
  return (
    <svg className={className} viewBox="0 0 135 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Keysight 4-Bar Heartbeat/Waveform Mark */}
      <g transform="translate(0, 4)">
        <rect x="0" y="14" width="3.5" height="4" fill="#E01A22" />
        <rect x="5.5" y="6" width="3.5" height="12" fill="#E01A22" />
        <rect x="11" y="0" width="3.5" height="18" fill="#E01A22" />
        <rect x="16.5" y="8" width="3.5" height="10" fill="#E01A22" />
      </g>
      {/* KEYSIGHT Bold Red Typography */}
      <text x="26" y="21" fontFamily="Arial Black, Helvetica, sans-serif" fontWeight="900" fontSize="17" fill="#E01A22" letterSpacing="0.8">
        KEYSIGHT
      </text>
    </svg>
  );
}

export function TektronixLogo({ className = "h-6 sm:h-7" }) {
  return (
    <svg className={className} viewBox="0 0 135 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tektronix Chevron/Square Mark */}
      <g transform="translate(0, 6)">
        <path d="M0 0H14L7 9L0 0Z" fill="#E41F26" />
        <path d="M0 16H14L7 7L0 16Z" fill="#12161A" />
      </g>
      {/* Tektronix Typography */}
      <text x="20" y="21" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="18" fill="#12161A" letterSpacing="-0.3">
        Tektronix
      </text>
    </svg>
  );
}
