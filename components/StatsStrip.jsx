import React from "react";

export default function StatsStrip() {
  const stats = [
    {
      id: "instruments",
      value: "500+",
      label: "Instruments",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-[#C98B00]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
          <path d="m22 12.5-9.17 4.16a2 2 0 0 1-1.66 0L2 12.5" />
          <path d="m22 17.5-9.17 4.16a2 2 0 0 1-1.66 0L2 17.5" />
        </svg>
      ),
    },
    {
      id: "categories",
      value: "50+",
      label: "Product Categories",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-[#C98B00]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="4" height="4" x="3" y="3" rx="1" />
          <rect width="4" height="4" x="10" y="3" rx="1" />
          <rect width="4" height="4" x="17" y="3" rx="1" />
          <rect width="4" height="4" x="3" y="10" rx="1" />
          <rect width="4" height="4" x="10" y="10" rx="1" />
          <rect width="4" height="4" x="17" y="10" rx="1" />
          <rect width="4" height="4" x="3" y="17" rx="1" />
          <rect width="4" height="4" x="10" y="17" rx="1" />
          <rect width="4" height="4" x="17" y="17" rx="1" />
        </svg>
      ),
    },
    {
      id: "industries",
      value: "10+",
      label: "Industries Served",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-[#C98B00]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M17 18h1" />
          <path d="M12 18h1" />
          <path d="M7 18h1" />
        </svg>
      ),
    },
    {
      id: "partners",
      value: "Global",
      label: "Technology Partners",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-[#C98B00]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full relative z-20">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-xl sm:rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] py-3 px-4 sm:py-3.5 sm:px-6 md:py-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className={`flex items-center gap-3 ${
                idx === 0
                  ? "md:pr-5"
                  : idx === 1
                  ? "md:px-5"
                  : idx === 2
                  ? "md:px-5 pt-2.5 md:pt-0"
                  : "md:pl-5 pt-2.5 md:pt-0"
              }`}
            >
              <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-[11.5px] text-slate-500 font-semibold tracking-wide">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
