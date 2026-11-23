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
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { productsData, categoriesData, brandsData } from "@/data/products";

export default function AdminDashboardPage() {
  const [stats] = useState({
    totalProducts: productsData.length,
    totalCategories: categoriesData.length - 1, // exclude "all"
    totalBrands: brandsData.length - 1, // exclude "All Brands"
    openQuotes: 2,
    inStockCount: productsData.filter((p) => p.inStock).length,
  });

  return (
    <div className="space-y-6">
      {/* ---------------------------------------------------- */}
      {/* 1. HERO CONTROL CENTER BANNER                        */}
      {/* ---------------------------------------------------- */}
      <div className="bg-gradient-to-br from-[#090C12] via-[#0E131F] to-[#06080E] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-slate-800">
        {/* Ambient Lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFC400]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-[#FFC400] text-[10.5px] font-black uppercase tracking-widest mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400] animate-pulse" />
            <span>Master Operations Console</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
            Lovokit Enterprise Administration
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Real-time management for laboratory instruments, OEM distributorships, technical parameters, and institutional B2B procurement RFPs.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFC400] to-[#FFB800] text-black font-black text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-md shadow-[#FFC400]/20 cursor-pointer active:scale-98"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Product</span>
            </Link>
            <Link
              href="/admin/categories"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10 cursor-pointer"
            >
              <FolderTree className="w-4 h-4 text-slate-400" />
              <span>Categories</span>
            </Link>
            <Link
              href="/admin/quotes"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>Review RFPs (2)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. KPI STATS CARDS                                   */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Products */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Total Instruments
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-950">
            {stats.totalProducts}
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{stats.inStockCount} In Stock ready for dispatch</span>
          </div>
        </div>

        {/* KPI 2: Categories */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Categories
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-700 flex items-center justify-center">
              <FolderTree className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-950">
            {stats.totalCategories}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            Active testbench sectors & kits
          </div>
        </div>

        {/* KPI 3: Brands */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              OEM Partners
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200/60 text-purple-700 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-950">
            {stats.totalBrands}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            LOVOSIS, MATRIX, OWON, RIGOL...
          </div>
        </div>

        {/* KPI 4: Quotes */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              B2B RFP Quotes
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-950">
            {stats.openQuotes}
          </div>
          <div className="mt-2 text-[11px] text-amber-700 font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>2 Quotes awaiting response</span>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. RECENT CATALOG INSTRUMENTS                        */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black uppercase tracking-tight text-slate-950">
              Live Catalog Instruments
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Instruments currently published and visible on the Lovokit storefront.
            </p>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-black uppercase tracking-wider text-slate-900 hover:text-[#B38600] inline-flex items-center gap-1.5 transition-colors group"
          >
            <span>View All ({stats.totalProducts})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-500 uppercase tracking-wider font-black border-b border-slate-200 text-[10.5px]">
              <tr>
                <th className="py-3.5 px-5">Model & Instrument</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Wholesale Price</th>
                <th className="py-3.5 px-4">Inventory</th>
                <th className="py-3.5 px-5 text-right">Storefront</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {productsData.slice(0, 6).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.model}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="font-black text-slate-950 block text-[13px]">
                          {item.model}
                        </span>
                        <span className="text-slate-500 text-[11px] line-clamp-1 max-w-xs font-medium">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-900 font-black text-[10.5px]">
                      {item.brand}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 capitalize font-bold">
                    {item.categoryName || item.category}
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-950 text-sm">
                    {item.price}
                  </td>
                  <td className="py-3.5 px-4">
                    {item.inStock ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10.5px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-bold text-[10.5px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Link
                      href={`/products/${item.id}`}
                      target="_blank"
                      className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-black inline-block transition-colors"
                      title="Preview Instrument"
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
