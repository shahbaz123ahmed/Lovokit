"use client";

import React from "react";
import { ShoppingCart, Clock } from "lucide-react";

export default function AdminCartPage() {
  const carts = [
    {
      id: "CART-9941",
      user: "Research Scholar (ananya@iitb.ac.in)",
      items: ["OWON XDS3302 (14-bit Scope)", "SIGLENT SPD3303X-E Supply"],
      itemCount: 2,
      cartValue: "₹2,05,000",
      lastActive: "15 mins ago",
      status: "ACTIVE",
    },
    {
      id: "CART-9938",
      user: "Guest Buyer (Mumbai IP: 103.21.x.x)",
      items: ["OWON XDS3204E Benchtop Scope"],
      itemCount: 1,
      cartValue: "₹1,82,000",
      lastActive: "2 hours ago",
      status: "ABANDONED",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2.5">
          <span>Active & Abandoned Carts</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E7E5DF] text-[#090A0C] font-black text-xs">
            {carts.length} Live Carts
          </span>
        </h1>
        <p className="text-xs text-[#858585] mt-1">
          Monitor real-time instrument carts and identify B2B procurement opportunities.
        </p>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-4 px-5">Session / Buyer</th>
                <th className="py-4 px-4">Selected Instruments</th>
                <th className="py-4 px-4">Units</th>
                <th className="py-4 px-4">Cart Value</th>
                <th className="py-4 px-4">Last Activity</th>
                <th className="py-4 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {carts.map((c) => (
                <tr key={c.id} className="hover:bg-[#F7F6F1]/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="font-black text-[#090A0C] block text-[13px]">{c.id}</span>
                    <span className="text-[11px] text-[#858585]">{c.user}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#090A0C]">
                    <div className="space-y-0.5">
                      {c.items.map((it, i) => (
                        <div key={i} className="text-xs">{it}</div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#090A0C]">{c.itemCount}</td>
                  <td className="py-3.5 px-4 font-black text-[#090A0C] text-sm">{c.cartValue}</td>
                  <td className="py-3.5 px-4 text-[#858585]">{c.lastActive}</td>
                  <td className="py-3.5 px-5 text-right">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black border ${
                      c.status === "ACTIVE"
                        ? "bg-[#FFC400] text-[#090A0C] border-[#FFC400]"
                        : "bg-[#F7F6F1] text-[#858585] border-[#E7E5DF]"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
