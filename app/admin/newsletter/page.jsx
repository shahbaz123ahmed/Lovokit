"use client";

import React, { useState } from "react";
import { Send, Mail, Download, Check } from "lucide-react";

export default function AdminNewsletterPage() {
  const subscribers = [
    { email: "procurement@bharatforge.com", date: "21 Nov 2026", source: "Wholesale Digest Footer" },
    { email: "lab.director@nitk.edu.in", date: "20 Nov 2026", source: "Hot Deals Banner" },
    { email: "testbench.lead@tata.com", date: "19 Nov 2026", source: "Industrial Hub" },
    { email: "instruments@lnttech.com", date: "18 Nov 2026", source: "Checkout Page" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2.5">
            <span>Wholesale Digest Subscribers</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E7E5DF] text-[#090A0C] font-black text-xs">
              {subscribers.length} Corporate Subscribers
            </span>
          </h1>
          <p className="text-xs text-[#858585] mt-1">
            Verified corporate and institutional emails subscribed to clearance events and OEM datasheets.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Exporting subscriber emails...")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E7E5DF] bg-[#FFFFFF] hover:bg-[#F7F6F1] text-[#090A0C] font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#858585]" />
          <span>Export List</span>
        </button>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-4 px-5">Subscriber Email</th>
                <th className="py-4 px-4">Subscribed Route</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Date Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {subscribers.map((s, idx) => (
                <tr key={idx} className="hover:bg-[#F7F6F1]/70 transition-colors">
                  <td className="py-3.5 px-5 font-black text-[#090A0C] text-[13px]">{s.email}</td>
                  <td className="py-3.5 px-4 text-[#858585]">{s.source}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F6F1] border border-[#E7E5DF] text-[#090A0C] font-black text-[10.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
                      <span>SUBSCRIBED</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right text-[#858585] text-[11px]">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
