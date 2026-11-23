"use client";

import React from "react";
import { Truck, MapPin, Package, ExternalLink } from "lucide-react";

export default function AdminDeliveriesPage() {
  const shipments = [
    {
      trackingNumber: "BD-8890214",
      courier: "BlueDart Express Logistics",
      destination: "Pune, Maharashtra",
      orderId: "ORD-2026-9040",
      recipient: "IIT Bombay Microelectronics",
      packageWeight: "42 kg (Wood Crate)",
      status: "IN TRANSIT",
      eta: "22 Nov 2026",
    },
    {
      trackingNumber: "SF-4401923",
      courier: "SafeXpress Industrial Cargo",
      destination: "Bangalore, Karnataka",
      orderId: "ORD-2026-9038",
      recipient: "VentureTech Labs",
      packageWeight: "8 kg",
      status: "DELIVERED",
      eta: "Delivered on 19 Nov",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2.5">
          <span>Deliveries & Logistics</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E7E5DF] text-[#090A0C] font-black text-xs">
            {shipments.length} Active Shipments
          </span>
        </h1>
        <p className="text-xs text-[#858585] mt-1">
          Monitor calibrated freight shipments, multi-box deliveries, and warehouse dispatches.
        </p>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-4 px-5">Tracking & Carrier</th>
                <th className="py-4 px-4">Order / Recipient</th>
                <th className="py-4 px-4">Destination</th>
                <th className="py-4 px-4">Cargo Weight</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {shipments.map((s) => (
                <tr key={s.trackingNumber} className="hover:bg-[#F7F6F1]/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="font-mono font-black text-[#090A0C] block text-[13px]">{s.trackingNumber}</span>
                    <span className="text-[11px] text-[#858585]">{s.courier}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#090A0C]">{s.recipient}</div>
                    <div className="text-[11px] text-[#858585]">{s.orderId}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#090A0C] flex items-center gap-1.5 pt-4">
                    <MapPin className="w-3.5 h-3.5 text-[#858585]" />
                    <span>{s.destination}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#858585] font-medium">{s.packageWeight}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-black bg-[#F7F6F1] border border-[#E7E5DF] text-[#090A0C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
                      <span>{s.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right font-bold text-[#090A0C]">{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
