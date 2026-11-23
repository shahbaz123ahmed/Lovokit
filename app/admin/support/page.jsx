"use client";

import React, { useState } from "react";
import { LifeBuoy, AlertCircle, Clock, Check } from "lucide-react";

export default function AdminSupportPage() {
  const tickets = [
    {
      id: "TCK-8821",
      customer: "Tata Motors EV R&D",
      subject: "SCPI driver library download for Python 3.12",
      priority: "HIGH",
      status: "OPEN",
      date: "21 Nov 2026",
    },
    {
      id: "TCK-8819",
      customer: "AeroTech Labs",
      subject: "NABL calibration certificate re-issuance",
      priority: "NORMAL",
      status: "RESOLVED",
      date: "19 Nov 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2.5">
          <span>Support & Calibration Tickets</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFC400] text-[#090A0C] font-black text-xs">
            1 Open
          </span>
        </h1>
        <p className="text-xs text-[#858585] mt-1">
          Technical laboratory queries, firmware update assistance, and calibration tracking.
        </p>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-4 px-5">Ticket ID</th>
                <th className="py-4 px-4">Client</th>
                <th className="py-4 px-4">Subject</th>
                <th className="py-4 px-4">Priority</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-[#F7F6F1]/70 transition-colors">
                  <td className="py-3.5 px-5 font-black text-[#090A0C] text-[13px]">{t.id}</td>
                  <td className="py-3.5 px-4 font-bold text-[#090A0C]">{t.customer}</td>
                  <td className="py-3.5 px-4 font-bold text-[#090A0C]">{t.subject}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black ${
                      t.priority === "HIGH" ? "bg-[#FFC400] text-[#090A0C]" : "bg-[#F7F6F1] text-[#858585]"
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black border ${
                      t.status === "OPEN"
                        ? "bg-[#090A0C] text-[#FFFFFF] border-[#090A0C]"
                        : "bg-[#F7F6F1] text-[#858585] border-[#E7E5DF]"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right text-[#858585] text-[11px]">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
