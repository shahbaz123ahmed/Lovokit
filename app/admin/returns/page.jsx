"use client";

import React from "react";
import { RotateCcw, Package, AlertCircle } from "lucide-react";

export default function AdminReturnsPage() {
  const returns = [
    {
      id: "RMA-501",
      orderId: "ORD-2026-9022",
      customer: "Kiran Rao (BEL)",
      instrument: "OWON XDS3204E",
      reason: "Channel 4 BNC connector calibration check",
      type: "CALIBRATION / RMA",
      status: "INSPECTION SCHEDULED",
      date: "19 Nov 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2.5">
          <span>Returns & RMA Service</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E7E5DF] text-[#090A0C] font-black text-xs">
            {returns.length} Active RMA
          </span>
        </h1>
        <p className="text-xs text-[#858585] mt-1">
          Manage instrument warranty claims, factory re-calibration, and repair returns.
        </p>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-4 px-5">RMA ID & Order</th>
                <th className="py-4 px-4">Client</th>
                <th className="py-4 px-4">Instrument</th>
                <th className="py-4 px-4">Reason / Notes</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {returns.map((r) => (
                <tr key={r.id} className="hover:bg-[#F7F6F1]/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="font-black text-[#090A0C] block text-[13px]">{r.id}</span>
                    <span className="text-[11px] text-[#858585]">{r.orderId}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#090A0C]">{r.customer}</td>
                  <td className="py-3.5 px-4 font-black text-[#090A0C]">{r.instrument}</td>
                  <td className="py-3.5 px-4 text-[#858585] max-w-xs">{r.reason}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black bg-[#FFC400]/20 text-[#090A0C] border border-[#FFC400]">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right text-[#858585]">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
