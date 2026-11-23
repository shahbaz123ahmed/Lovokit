"use client";

import React from "react";
import { Heart, Tag, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { productsData } from "@/data/products";

export default function AdminWishlistPage() {
  const wishlistedItems = [
    {
      model: "XDS3302",
      title: "14-bit High-Resolution Digital Storage Oscilloscope",
      brand: "OWON",
      price: "₹1,45,000",
      savesCount: 142,
      inStock: true,
      id: "xds3302",
    },
    {
      model: "SPD3303X-E",
      title: "Triple-Output Linear Programmable DC Bench Supply",
      brand: "SIGLENT",
      price: "₹62,000",
      savesCount: 98,
      inStock: true,
      id: "spd3303xe",
    },
    {
      model: "XDS3204E",
      title: "4-Channel Touchscreen Color Display Benchtop Scope",
      brand: "OWON",
      price: "₹1,82,000",
      savesCount: 76,
      inStock: true,
      id: "xds3204e",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2.5">
          <span>Customer Wishlist Analytics</span>
        </h1>
        <p className="text-xs text-[#858585] mt-1">
          Top-saved instruments by engineers and laboratory procurement leads.
        </p>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-4 px-5">Instrument / Model</th>
                <th className="py-4 px-4">Brand</th>
                <th className="py-4 px-4">Wholesale Price</th>
                <th className="py-4 px-4">Engineers Saved</th>
                <th className="py-4 px-4">Warehouse Status</th>
                <th className="py-4 px-5 text-right">Storefront</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {wishlistedItems.map((w) => (
                <tr key={w.model} className="hover:bg-[#F7F6F1]/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="font-black text-[#090A0C] block text-[13px]">{w.model}</span>
                    <span className="text-[11px] text-[#858585]">{w.title}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-[#F7F6F1] border border-[#E7E5DF] text-[#090A0C] font-black text-[10.5px]">
                      {w.brand}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#090A0C] text-sm">{w.price}</td>
                  <td className="py-3.5 px-4 font-black text-[#090A0C] flex items-center gap-1.5 pt-4">
                    <Heart className="w-3.5 h-3.5 text-[#090A0C] fill-[#090A0C]" />
                    <span>{w.savesCount} buyers</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#F7F6F1] border border-[#E7E5DF] text-[#090A0C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
                      <span>In Stock</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Link
                      href={`/products/${w.id}`}
                      target="_blank"
                      className="p-1.5 rounded-lg border border-[#E7E5DF] bg-[#FFFFFF] hover:bg-[#F7F6F1] inline-block"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#090A0C]" />
                    </Link>
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
