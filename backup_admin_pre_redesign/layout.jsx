"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tag,
  FileSpreadsheet,
  ArrowLeft,
  Search,
  Bell,
  User,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Database,
  Layers,
  SlidersHorizontal,
} from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const coreNavLinks = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Products Catalog",
      href: "/admin/products",
      icon: Package,
      active: pathname.startsWith("/admin/products"),
      badge: "36",
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: FolderTree,
      active: pathname.startsWith("/admin/categories"),
      badge: "9",
    },
    {
      name: "Brand Partners",
      href: "/admin/brands",
      icon: Tag,
      active: pathname.startsWith("/admin/brands"),
      badge: "10",
    },
  ];

  const salesNavLinks = [
    {
      name: "B2B Quotes & RFPs",
      href: "/admin/quotes",
      icon: FileSpreadsheet,
      active: pathname.startsWith("/admin/quotes"),
      highlight: "2 New",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans antialiased selection:bg-[#FFC400] selection:text-black">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* 1. ELEVATED ADMIN SIDEBAR                             */}
      {/* ---------------------------------------------------- */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0A0D14] text-white flex flex-col justify-between border-r border-slate-800/80 shadow-2xl transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
          {/* Top Brand & Portal Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-md border border-white/20">
                <Logo darkText={true} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-widest uppercase text-[#FFC400] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400] animate-pulse" />
                  CONSOLE
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  v2.4 Enterprise
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Environment Status Pill */}
          <div className="px-5 pt-4">
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px]">
              <span className="flex items-center gap-2 text-slate-300 font-medium">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Catalog DB</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[9.5px]">
                LIVE SYNC
              </span>
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="px-3 py-4 space-y-6 flex-1">
            {/* GROUP 1: CATALOG MANAGEMENT */}
            <div>
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2 flex items-center justify-between">
                <span>CATALOG ARCHITECTURE</span>
                <Layers className="w-3 h-3 text-slate-600" />
              </div>
              <div className="space-y-1">
                {coreNavLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        item.active
                          ? "bg-gradient-to-r from-[#FFC400] to-[#FFB800] text-black shadow-md shadow-[#FFC400]/20 font-black"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 stroke-[2.2] transition-transform group-hover:scale-110 ${
                            item.active ? "text-black" : "text-slate-400 group-hover:text-white"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                            item.active
                              ? "bg-black/15 text-black"
                              : "bg-white/[0.08] text-slate-300"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* GROUP 2: SALES & PROCUREMENT */}
            <div>
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2 flex items-center justify-between">
                <span>COMMERCE & RFPs</span>
                <SlidersHorizontal className="w-3 h-3 text-slate-600" />
              </div>
              <div className="space-y-1">
                {salesNavLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        item.active
                          ? "bg-gradient-to-r from-[#FFC400] to-[#FFB800] text-black shadow-md shadow-[#FFC400]/20 font-black"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 stroke-[2.2] transition-transform group-hover:scale-110 ${
                            item.active ? "text-black" : "text-slate-400 group-hover:text-white"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.highlight && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-500 text-white animate-pulse">
                          {item.highlight}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Storefront & User Card */}
          <div className="p-4 border-t border-white/[0.08] bg-white/[0.01] space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all border border-white/5 hover:border-white/15 group"
            >
              <div className="flex items-center gap-2.5">
                <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
                <span>Visit Storefront</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            {/* Admin Profile Strip */}
            <div className="flex items-center justify-between pt-1 px-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-[#FFC400] text-black font-black text-xs flex items-center justify-center shadow-sm">
                  AS
                </div>
                <div className="text-left text-xs leading-snug">
                  <div className="font-bold text-white flex items-center gap-1">
                    <span>Aman Sharma</span>
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="text-[10px] text-slate-400">Head of Operations</div>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
            </div>
          </div>
        </div>
      </aside>

      {/* ---------------------------------------------------- */}
      {/* 2. MAIN ADMIN CONTENT WRAPPER                         */}
      {/* ---------------------------------------------------- */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Top Modern SaaS Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-2xs">
          {/* Left: Mobile Toggle & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-black hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-400">
              <Link href="/admin" className="hover:text-slate-900 transition-colors">
                Admin
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-900 capitalize font-extrabold">
                {pathname.split("/")[2] || "Overview"}
              </span>
            </nav>
          </div>

          {/* Right: Actions, Store Link & Notifications */}
          <div className="flex items-center gap-3">
            {/* Live Store Pill */}
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-slate-800 bg-slate-100 hover:bg-[#FFC400] hover:text-black transition-all border border-slate-200"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => alert("All 2 B2B RFPs are synchronized with database.")}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {/* Quick Profile Pill */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xs">
                A
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <div className="font-extrabold text-slate-900">Aman S.</div>
                <div className="text-[10px] text-slate-400">Admin Console</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
