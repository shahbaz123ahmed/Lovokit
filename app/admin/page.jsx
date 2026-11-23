"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  FolderTree,
  Tag,
  FileSpreadsheet,
  Plus,
  ArrowUpRight,
  ArrowRight,
  ExternalLink,
  Search,
  Activity,
  Layers,
  Building2,
  FileText,
  Clock,
  Sparkles,
  BarChart3,
  SlidersHorizontal,
} from "lucide-react";
import { productsData, categoriesData, brandsData } from "@/data/products";

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = {
    totalProducts: productsData.length,
    totalCategories: categoriesData.length - 1, // exclude "all"
    totalBrands: brandsData.length - 1, // exclude "All Brands"
    openQuotes: 2,
    inStockCount: productsData.filter((p) => p.inStock).length,
  };

  const recentRFQs = [
    {
      id: "rfp-1001",
      name: "Vikram Mehta",
      company: "Tata Motors EV Division",
      package: "Automotive & EV Diagnostic Station",
      budget: "₹5,00,000",
      status: "IN REVIEW",
    },
    {
      id: "rfp-1002",
      name: "Dr. Ananya Ray",
      company: "IIT Bombay Microelectronics Lab",
      package: "Academic Benchmark Lab (10-Station Suite)",
      budget: "₹10,00,000",
      status: "PENDING",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ---------------------------------------------------- */}
      {/* 4. HERO SECTION (PURE BLACK & BRAND YELLOW GLOW)     */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#090A0C] text-[#FFFFFF] rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-xl border border-[#17191E]">
        {/* Subtle Brand Yellow Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC400]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-1/4 w-64 h-64 bg-[#FFC400]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            {/* Yellow Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17191E] border border-[#17191E] text-[#FFC400] text-[10.5px] font-black uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
              <span>MASTER OPERATIONS CONSOLE</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#FFFFFF] leading-[1.12]">
              LOVOKIT ENTERPRISE ADMINISTRATION
            </h1>

            {/* Supporting Description */}
            <p className="mt-3 text-xs sm:text-sm text-[#E7E5DF] leading-relaxed max-w-xl font-normal">
              Unified control center for managing laboratory instruments, OEM partnerships, real-time specifications, wholesale pricing, and institutional B2B procurement RFQs.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/admin/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFC400] hover:bg-[#e6b000] text-[#090A0C] font-black text-xs uppercase tracking-wider transition-colors shadow-md shadow-[#FFC400]/20 cursor-pointer active:scale-98"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ ADD NEW PRODUCT</span>
              </Link>
              <Link
                href="/admin/categories"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#17191E] hover:bg-[#17191E]/80 text-[#F7F6F1] font-bold text-xs uppercase tracking-wider transition-colors border border-[#17191E] cursor-pointer"
              >
                <FolderTree className="w-4 h-4 text-[#FFC400]" />
                <span>CATEGORIES</span>
              </Link>
              <Link
                href="/admin/quotes"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#17191E] hover:bg-[#17191E]/80 text-[#F7F6F1] font-bold text-xs uppercase tracking-wider transition-colors border border-[#17191E] cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#FFC400]" />
                <span>REVIEW RFPS</span>
              </Link>
            </div>
          </div>

          {/* Abstract Technical Grid on Right */}
          <div className="hidden lg:flex flex-col gap-2.5 p-5 rounded-xl bg-[#17191E]/70 border border-[#17191E] text-xs w-72 shrink-0">
            <div className="flex items-center justify-between text-[#858585] text-[10px] uppercase font-bold tracking-wider">
              <span>SYSTEM SYNCHRONIZATION</span>
              <span className="text-[#FFC400] font-black">99.98%</span>
            </div>
            <div className="h-1.5 w-full bg-[#090A0C] rounded-full overflow-hidden">
              <div className="h-full bg-[#FFC400] w-[99.98%]" />
            </div>
            <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-[#E7E5DF]">
              <div>
                <span className="text-[10px] text-[#858585] block font-medium">Database Node</span>
                <span className="font-bold">Active / Local</span>
              </div>
              <div>
                <span className="text-[10px] text-[#858585] block font-medium">HSN Standards</span>
                <span className="font-bold">90302000 (Lab)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 5. KPI STATISTICS CARDS (OFF-WHITE / WHITE SURFACES) */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Instruments */}
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E7E5DF] shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#858585]">
              Total Instruments
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FFC400]/15 text-[#090A0C] flex items-center justify-center font-black">
              <Package className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#090A0C]">
            {stats.totalProducts}
          </div>
          <div className="mt-2 text-[11px] text-[#858585] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
            <span>{stats.inStockCount} In Stock ready for dispatch</span>
          </div>
        </div>

        {/* KPI 2: Categories */}
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E7E5DF] shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#858585]">
              Categories
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FFC400]/15 text-[#090A0C] flex items-center justify-center font-black">
              <FolderTree className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#090A0C]">
            {stats.totalCategories}
          </div>
          <div className="mt-2 text-[11px] text-[#858585] font-medium">
            Active product sectors & testbenches
          </div>
        </div>

        {/* KPI 3: OEM Partners */}
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E7E5DF] shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#858585]">
              OEM Partners
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FFC400]/15 text-[#090A0C] flex items-center justify-center font-black">
              <Tag className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#090A0C]">
            {stats.totalBrands}
          </div>
          <div className="mt-2 text-[11px] text-[#858585] font-medium">
            LOVOSIS, MATRIX, OWON, RIGOL...
          </div>
        </div>

        {/* KPI 4: B2B RFQ Quotes */}
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E7E5DF] shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#858585]">
              B2B RFQ Quotes
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FFC400]/15 text-[#090A0C] flex items-center justify-center font-black">
              <FileSpreadsheet className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#090A0C]">
            {stats.openQuotes}
          </div>
          <div className="mt-2 text-[11px] text-[#858585] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
            <span>2 Quotes awaiting response</span>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 7. ADDITIONAL SECTIONS: ANALYTICS & RECENT RFQS      */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Catalog Breakdown by Sector (8 cols) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5DF]">
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#090A0C]" />
                  <span>Catalog Distribution by Sector</span>
                </h3>
                <p className="text-xs text-[#858585] mt-0.5">
                  Breakdown of active laboratory instruments across product families.
                </p>
              </div>
              <span className="text-xs font-black bg-[#F7F6F1] px-2.5 py-1 rounded-full border border-[#E7E5DF]">
                {stats.totalProducts} Items
              </span>
            </div>

            <div className="space-y-3.5 pt-4">
              {[
                { name: "Oscilloscopes & Digitizers", count: 10, pct: "28%" },
                { name: "Benchtop Power Supplies", count: 4, pct: "16%" },
                { name: "Digital Multimeters", count: 4, pct: "16%" },
                { name: "Waveform Generators", count: 3, pct: "12%" },
                { name: "LCR Meters & AC Sources", count: 6, pct: "18%" },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#090A0C]">
                    <span>{item.name}</span>
                    <span className="text-[#858585] font-black">{item.count} units ({item.pct})</span>
                  </div>
                  <div className="h-2 w-full bg-[#F7F6F1] rounded-full overflow-hidden border border-[#E7E5DF]">
                    <div
                      className="h-full bg-[#090A0C]"
                      style={{ width: item.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#E7E5DF] flex items-center justify-between text-xs text-[#858585]">
            <span>100% Verified Compliance</span>
            <Link
              href="/admin/categories"
              className="font-bold text-[#090A0C] hover:text-[#FFC400] inline-flex items-center gap-1 transition-colors"
            >
              <span>Manage Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Recent B2B RFQs Overview (5 cols) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5DF]">
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-[#090A0C]" />
                  <span>Recent B2B RFQ Inquiries</span>
                </h3>
                <p className="text-xs text-[#858585] mt-0.5">
                  Institutional wholesale quote requests.
                </p>
              </div>
              <span className="text-xs font-black bg-[#FFC400] text-[#090A0C] px-2 py-0.5 rounded-full">
                2 New
              </span>
            </div>

            <div className="divide-y divide-[#E7E5DF] pt-1">
              {recentRFQs.map((rfq) => (
                <div key={rfq.id} className="py-3.5 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-[#090A0C]">
                      {rfq.name}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#090A0C] text-[#FFFFFF]">
                      {rfq.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#858585]">{rfq.company}</div>
                  <div className="text-xs font-black text-[#090A0C]">
                    {rfq.package}
                  </div>
                  <div className="text-[11px] text-[#858585]">
                    Est. Budget: <span className="font-bold text-[#090A0C]">{rfq.budget}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E7E5DF]">
            <Link
              href="/admin/quotes"
              className="w-full py-2 px-3 rounded-xl bg-[#F7F6F1] hover:bg-[#E7E5DF] text-[#090A0C] font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View All Quotes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 6. LIVE PRODUCT CATALOG OVERVIEW                     */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        {/* Table Header Row */}
        <div className="p-5 sm:p-6 border-b border-[#E7E5DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-black uppercase tracking-tight text-[#090A0C]">
              Live Catalog Instruments
            </h2>
            <p className="text-xs text-[#858585] mt-0.5">
              Live products currently displayed in the Lovokit wholesale catalog.
            </p>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-black uppercase tracking-wider text-[#090A0C] hover:text-[#FFC400] inline-flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Full Catalog View</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-3.5 px-5">Instrument / Model</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Wholesale Price</th>
                <th className="py-3.5 px-4">Inventory Status</th>
                <th className="py-3.5 px-5 text-right">Storefront</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {productsData.slice(0, 6).map((item) => (
                <tr key={item.id} className="hover:bg-[#F7F6F1]/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#F7F6F1] border border-[#E7E5DF] flex items-center justify-center p-1.5 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.model}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="font-black text-[#090A0C] block text-[13px]">
                          {item.model}
                        </span>
                        <span className="text-[#858585] text-[11px] line-clamp-1 max-w-xs font-medium">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#F7F6F1] text-[#090A0C] font-black text-[10.5px] border border-[#E7E5DF]">
                      {item.brand}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#090A0C] capitalize font-bold">
                    {item.categoryName || item.category}
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#090A0C] text-sm">
                    {item.price}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.inStock ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F6F1] border border-[#E7E5DF] text-[#090A0C] font-bold text-[10.5px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
                        <span>In Stock</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#090A0C] text-[#FFFFFF] font-bold text-[10.5px]">
                        <span>Out of Stock</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Link
                      href={`/products/${item.id}`}
                      target="_blank"
                      className="p-1.5 rounded-xl border border-[#E7E5DF] bg-[#FFFFFF] hover:bg-[#F7F6F1] text-[#090A0C] inline-block transition-colors"
                      title="Preview on Live Store"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
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
