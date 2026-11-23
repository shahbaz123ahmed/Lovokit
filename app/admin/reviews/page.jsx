"use client";

import React, { useState } from "react";
import { Star, Check, Trash2, ExternalLink } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: "REV-101",
      customer: "Dr. K. Srinivas",
      institution: "ECE Dept, IISc Bangalore",
      model: "OWON XDS3302",
      rating: 5,
      comment: "Outstanding 14-bit resolution. Noise floor is remarkably clean below 10mV/div. Fast delivery with full NABL certificate.",
      status: "APPROVED",
      date: "20 Nov 2026",
    },
    {
      id: "REV-102",
      customer: "Amitav Sengupta",
      institution: "Embedded System Engineer",
      model: "SIGLENT SPD3303X-E",
      rating: 5,
      comment: "Very stable power supply under full 3.2A load. Low ripple. Channel tracking mode works flawlessly.",
      status: "APPROVED",
      date: "18 Nov 2026",
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2.5">
          <span>Customer Reviews & Ratings</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E7E5DF] text-[#090A0C] font-black text-xs">
            {reviews.length} Verified Reviews
          </span>
        </h1>
        <p className="text-xs text-[#858585] mt-1">
          Moderate verified buyer feedback, ratings, and laboratory benchmarks.
        </p>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-4 px-5">Reviewer & Institution</th>
                <th className="py-4 px-4">Instrument</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-4">Feedback</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-[#F7F6F1]/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="font-black text-[#090A0C] block text-[13px]">{r.customer}</span>
                    <span className="text-[11px] text-[#858585]">{r.institution}</span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#090A0C]">{r.model}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FFC400] text-[#FFC400]" />
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#858585] max-w-sm line-clamp-2">{r.comment}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black bg-[#F7F6F1] border border-[#E7E5DF] text-[#090A0C]">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right text-[#858585] text-[11px]">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
