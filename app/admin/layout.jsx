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
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  RotateCcw,
  Truck,
  ShoppingCart,
  Heart,
  Users,
  MessageSquare,
  Send,
  Star,
  LifeBuoy,
  Settings,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigation = [
    {
      group: "CATALOG ARCHITECTURE",
      items: [
        {
          name: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
          active: pathname === "/admin",
        },
        {
          name: "Product Catalog",
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
          name: "OEM Partners",
          href: "/admin/brands",
          icon: Tag,
          active: pathname.startsWith("/admin/brands"),
          badge: "10",
        },
      ],
    },
    {
      group: "COMMERCE",
      items: [
        {
          name: "Orders",
          href: "/admin/orders",
          icon: ShoppingBag,
          active: pathname.startsWith("/admin/orders"),
          badge: "12",
        },
        {
          name: "Returns",
          href: "/admin/returns",
          icon: RotateCcw,
          active: pathname.startsWith("/admin/returns"),
        },
        {
          name: "Deliveries",
          href: "/admin/deliveries",
          icon: Truck,
          active: pathname.startsWith("/admin/deliveries"),
        },
        {
          name: "Shopping Carts",
          href: "/admin/cart",
          icon: ShoppingCart,
          active: pathname.startsWith("/admin/cart"),
        },
        {
          name: "Wishlists",
          href: "/admin/wishlist",
          icon: Heart,
          active: pathname.startsWith("/admin/wishlist"),
        },
        {
          name: "Customers",
          href: "/admin/customers",
          icon: Users,
          active: pathname.startsWith("/admin/customers"),
        },
        {
          name: "B2B RFQ Quotes",
          href: "/admin/quotes",
          icon: FileSpreadsheet,
          active: pathname.startsWith("/admin/quotes"),
          badge: "2",
          badgeYellow: true,
        },
      ],
    },
    {
      group: "CUSTOMER EXPERIENCE",
      items: [
        {
          name: "Contact Inquiries",
          href: "/admin/contact",
          icon: MessageSquare,
          active: pathname.startsWith("/admin/contact"),
          badge: "4",
        },
        {
          name: "Newsletter",
          href: "/admin/newsletter",
          icon: Send,
          active: pathname.startsWith("/admin/newsletter"),
        },
        {
          name: "Reviews",
          href: "/admin/reviews",
          icon: Star,
          active: pathname.startsWith("/admin/reviews"),
        },
        {
          name: "Support Tickets",
          href: "/admin/support",
          icon: LifeBuoy,
          active: pathname.startsWith("/admin/support"),
          badge: "1",
        },
      ],
    },
    {
      group: "ADMINISTRATION",
      items: [
        {
          name: "Settings & Security",
          href: "/admin/settings",
          icon: Settings,
          active: pathname.startsWith("/admin/settings"),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F1] flex text-[#090A0C] font-sans antialiased selection:bg-[#FFC400] selection:text-[#090A0C]">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#090A0C]/70 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* 1. PREMIUM DARK SIDEBAR (BLACK #090A0C / CHARCOAL)   */}
      {/* ---------------------------------------------------- */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#090A0C] text-[#F7F6F1] flex flex-col justify-between border-r border-[#17191E] shadow-2xl transition-all duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "w-20" : "w-72"}`}
      >
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
          {/* Top Logo & Collapse Toggle */}
          <div className="h-20 px-5 flex items-center justify-between border-b border-[#17191E] shrink-0 sticky top-0 bg-[#090A0C] z-10">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-[#FFFFFF] px-2.5 py-1.5 rounded-xl border border-[#E7E5DF] shrink-0">
                <Logo darkText={true} />
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC400] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
                    ENTERPRISE
                  </span>
                  <span className="text-[11px] font-bold text-[#858585]">
                    Admin Console
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse Toggle */}
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-[#858585] hover:text-[#FFFFFF] hover:bg-[#17191E] transition-colors cursor-pointer"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-[#858585] hover:text-[#FFFFFF]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="px-3 py-5 space-y-6 flex-1">
            {navigation.map((section, idx) => (
              <div key={idx}>
                {!sidebarCollapsed && (
                  <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-[#858585] mb-2">
                    {section.group}
                  </div>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        title={sidebarCollapsed ? item.name : undefined}
                        className={`group flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                          item.active
                            ? "bg-[#FFC400] text-[#090A0C] font-black shadow-md shadow-[#FFC400]/15"
                            : "text-[#E7E5DF] hover:text-[#FFFFFF] hover:bg-[#17191E]"
                        } ${sidebarCollapsed ? "justify-center px-0" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`w-4 h-4 stroke-[2.2] shrink-0 ${
                              item.active ? "text-[#090A0C]" : "text-[#858585] group-hover:text-[#FFFFFF]"
                            }`}
                          />
                          {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                        </div>

                        {!sidebarCollapsed && item.badge && (
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                              item.active
                                ? "bg-[#090A0C]/15 text-[#090A0C]"
                                : item.badgeYellow
                                ? "bg-[#FFC400] text-[#090A0C]"
                                : "bg-[#17191E] text-[#E7E5DF]"
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
            ))}
          </div>

          {/* Bottom Storefront & User Profile Strip */}
          <div className="p-3 border-t border-[#17191E] space-y-2 bg-[#090A0C] shrink-0 sticky bottom-0 z-10">
            <Link
              href="/"
              target="_blank"
              className={`flex items-center justify-between w-full px-3 py-2 rounded-xl bg-[#17191E] hover:bg-[#17191E]/80 text-xs font-bold text-[#E7E5DF] hover:text-[#FFFFFF] transition-all border border-[#17191E] group ${
                sidebarCollapsed ? "justify-center px-0" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5 text-[#858585] group-hover:-translate-x-0.5 transition-transform" />
                {!sidebarCollapsed && <span>Live Storefront</span>}
              </div>
              {!sidebarCollapsed && <ExternalLink className="w-3 h-3 text-[#858585]" />}
            </Link>

            {/* Profile */}
            <div
              className={`flex items-center justify-between px-2 py-1.5 rounded-xl bg-[#17191E]/50 ${
                sidebarCollapsed ? "justify-center px-0" : ""
              }`}
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-7 h-7 rounded-lg bg-[#FFC400] text-[#090A0C] font-black text-xs flex items-center justify-center shrink-0">
                  AS
                </div>
                {!sidebarCollapsed && (
                  <div className="text-left leading-tight truncate">
                    <div className="font-bold text-[#FFFFFF] text-xs truncate">
                      Aman Sharma
                    </div>
                    <div className="text-[10px] text-[#858585]">Super Admin</div>
                  </div>
                )}
              </div>
              {!sidebarCollapsed && (
                <span className="w-2 h-2 rounded-full bg-[#FFC400] ring-2 ring-[#FFC400]/20" />
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* ---------------------------------------------------- */}
      {/* 2. MAIN ADMIN CONTENT CONTAINER                      */}
      {/* ---------------------------------------------------- */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        {/* Top Header Navigation */}
        <header className="sticky top-0 z-30 h-16 bg-[#FFFFFF] border-b border-[#E7E5DF] px-4 sm:px-8 flex items-center justify-between shadow-2xs">
          {/* Breadcrumb & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#090A0C] hover:bg-[#F7F6F1]"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#858585]">
              <Link href="/admin" className="hover:text-[#090A0C] transition-colors">
                Lovokit Console
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#858585]" />
              <span className="text-[#090A0C] font-black capitalize">
                {pathname.split("/")[2] || "Overview Dashboard"}
              </span>
            </nav>
          </div>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-3">
            {/* Live Website Button with Yellow Accent */}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-[#090A0C] bg-[#FFC400] hover:bg-[#e6b000] transition-colors shadow-2xs"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3 stroke-[2.5]" />
            </Link>

            {/* Notification Icon */}
            <button
              type="button"
              onClick={() => alert("All 2 B2B RFQs are synced and ready for review.")}
              className="relative p-2 rounded-xl text-[#090A0C] hover:bg-[#F7F6F1] border border-[#E7E5DF] transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-[#090A0C]" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FFC400] ring-2 ring-[#FFFFFF]" />
            </button>

            {/* Admin Avatar Strip */}
            <div className="flex items-center gap-2 pl-3 border-l border-[#E7E5DF]">
              <div className="w-8 h-8 rounded-full bg-[#090A0C] text-[#FFC400] flex items-center justify-center font-black text-xs shadow-xs">
                A
              </div>
              <div className="hidden md:block text-left text-xs leading-tight">
                <div className="font-black text-[#090A0C]">Aman S.</div>
                <div className="text-[10px] text-[#858585]">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

        {/* Enterprise Operations Footer */}
        <footer className="mt-auto border-t border-[#E7E5DF] bg-[#FFFFFF] px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#858585]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-center sm:text-left">
              <span className="font-black text-[#090A0C] text-[11px] uppercase tracking-wider">Registered Office:</span>
              <span className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-[#090A0C]">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                3rd Floor, Swathi building, 4-72/2, Main Road, opp. singapura Garden, Lakshmipura, Abbigere, Bengaluru, Karnataka 560090
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium shrink-0">
              <a href="tel:+919747745544" className="flex items-center gap-1 text-[#090A0C] hover:text-[#FFC400]">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>+91 97477 45544</span>
              </a>
              <span className="text-[#858585]">|</span>
              <a href="mailto:sales@lovosis.in" className="flex items-center gap-1 text-[#090A0C] hover:text-[#FFC400]">
                <Mail className="w-3.5 h-3.5 text-red-500" />
                <span>sales@lovosis.in</span>
              </a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-2.5 mt-2.5 border-t border-[#E7E5DF]/60 text-center sm:text-left text-[10.5px] text-[#858585]">
            © 2026 Lovokit by Lovosis Technology Private Limited. All rights reserved. All brand marks and logos are properties of their respective owners.
          </div>
        </footer>
      </div>
    </div>
  );
}
