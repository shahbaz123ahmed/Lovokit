"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Zap,
  Truck,
  ShieldCheck,
  Package,
  Phone,
  MapPin,
  Search,
  ArrowLeftRight,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Flame,
  ArrowRight,
  Menu,
  X,
  FileText,
  CheckCircle2,
  ExternalLink,
  Factory,
  Sparkles,
} from "lucide-react";
import Logo from "./Logo";
import CartDrawer from "./CartDrawer";
import { useShop } from "@/context/ShopContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const { cartCount, wishlistCount, setCartDrawerOpen } = useShop();
  const [topBarVisible, setTopBarVisible] = useState(true);
  const brandRef = useRef(null);
  const brandTimeoutRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleBrandEnter = () => {
    if (brandTimeoutRef.current) clearTimeout(brandTimeoutRef.current);
    setBrandDropdownOpen(true);
  };

  const handleBrandLeave = () => {
    if (brandTimeoutRef.current) clearTimeout(brandTimeoutRef.current);
    brandTimeoutRef.current = setTimeout(() => {
      setBrandDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (brandTimeoutRef.current) clearTimeout(brandTimeoutRef.current);
    };
  }, []);

  // Dynamic Navigation Items (Treat HOT DEALS as Home Page, Dynamic Route Active)
  const isIndustrialHub =
    pathname === "/industrial-hub" || pathname.startsWith("/industrial-hub");
  const isContact =
    pathname === "/contact" || pathname.startsWith("/contact");
  const isBrands =
    pathname === "/brands" || pathname.startsWith("/brands");
  const isHotDeals =
    (pathname === "/" ||
      pathname === "/products" ||
      pathname.startsWith("/products")) &&
    !isIndustrialHub &&
    !isContact &&
    !isBrands;

  const navItems = [
    {
      name: "HOT DEALS",
      href: "/",
      isActive: isHotDeals,
      icon: Flame,
      pulse: true,
    },
    {
      name: "INDUSTRIAL HUB",
      href: "/industrial-hub",
      isActive: isIndustrialHub,
      icon: Factory,
    },
    {
      name: "CONTACT",
      href: "/contact",
      isActive: isContact,
      icon: Phone,
    },
  ];

  // Dynamic Scroll Direction:
  // Scroll down (reading down page) -> Tier 1 smoothly slides offscreen
  // Scroll up (moving back up) -> Tier 1 instantly & smoothly returns
  // Works anywhere on the page (bottom, middle, top)
  // Zero layout shift / zero reflow ensures NO flickering or half-appearance
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // When near the very top of the page, top bar is always visible
          if (currentScrollY <= 40) {
            setTopBarVisible(true);
            lastScrollY.current = currentScrollY;
            ticking.current = false;
            return;
          }

          const diff = currentScrollY - lastScrollY.current;

          // Single scroll tick threshold (>= 6px): triggers instantly on a single mouse wheel notch
          // and filters out subpixel vibration
          if (Math.abs(diff) >= 6) {
            if (diff > 0) {
              // Scrolling down -> Top bar disappears
              setTopBarVisible(false);
            } else {
              // Scrolling up -> Top bar reappears completely
              setTopBarVisible(true);
            }
            lastScrollY.current = currentScrollY;
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (brandRef.current && !brandRef.current.contains(event.target)) {
        setBrandDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/products");
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 2800);
  };

  const brands = [
    { name: "MATRIX", desc: "DC Power Supplies & Arbitrary Generators" },
    { name: "OWON", desc: "Digital Oscilloscopes & Power Supplies" },
  ];

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 select-none shadow-md bg-white transition-transform duration-300 ease-out will-change-transform ${
          topBarVisible ? "translate-y-0" : "-translate-y-[36px]"
        }`}
      >
        {/* ======================================================== */}
        {/* TIER 1: TOP UTILITY STRIP (Scroll Direction Controlled)  */}
        {/* ======================================================== */}
        <div className="bg-[#0B0D13] border-b border-white/[0.08] text-white h-9 overflow-hidden">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs">
            {/* Left: Angled Flash Sale Live Badge */}
            <div className="flex items-center">
              <div
                className="relative inline-flex items-center gap-1.5 bg-[#FFC400] text-black font-extrabold text-[10.5px] sm:text-[11px] tracking-wider uppercase px-3.5 sm:px-4 py-1 pr-5 sm:pr-6"
                style={{
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
                }}
              >
                <Zap className="w-3.5 h-3.5 fill-black stroke-black shrink-0" />
                <span className="font-black">FLASH SALE LIVE</span>
              </div>
            </div>

            {/* Center: Trust Badges & Dispatch Highlights (Hidden on small mobile) */}
            <div className="hidden lg:flex items-center text-[11px] text-gray-300 font-medium">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>Free Dispatch on Orders &gt; ₹1,500</span>
              </div>

              <div className="h-3 w-[1px] bg-white/20 mx-3" />

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>100% Genuine Industrial Warranty</span>
              </div>

              <div className="h-3 w-[1px] bg-white/20 mx-3" />

              <div className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>Same-Day Warehouse Dispatch</span>
              </div>
            </div>

            {/* Right: Phone Hotline & Track Order */}
            <div className="flex items-center text-[11px]">
              {/* Diagonal gold accent slash */}
              <span className="hidden sm:inline-block text-[#FFC400]/70 font-light text-sm mx-2.5">
                /
              </span>

              {/* Direct Hotline */}
              <a
                href="tel:+919747745544"
                className="flex items-center gap-1.5 text-white hover:text-[#FFC400] font-bold tracking-tight transition-colors text-[10.5px] sm:text-[11px]"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFC400] fill-[#FFC400]/20 shrink-0" />
                <span>+91 97477 45544</span>
              </a>

              <div className="h-3 w-[1px] bg-white/20 mx-2 sm:mx-3" />

              {/* Track Order */}
              <button
                onClick={() => showToast("Track Order: Enter your AWB or RFQ number in portal.")}
                className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-[10.5px] sm:text-[11px]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FFC400] shrink-0" />
                <span className="font-medium">Track Order</span>
              </button>

              {/* Far right angled wedge */}
              <div
                className="hidden xl:block w-3.5 h-4 ml-3 bg-[#FFC400]"
                style={{
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TIER 2: MIDDLE MAIN BAR (Clean White Surface)            */}
        {/* ======================================================== */}
        <div className="bg-white border-b border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] py-2.5 sm:py-3 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
            {/* 1. Left: Brand Logo & Vertical Divider */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="group flex items-center">
                <Logo darkText={true} />
              </Link>
              <div className="hidden md:block h-7 w-[1px] bg-gray-200 ml-4 mr-1" />
            </div>

            {/* 2. Center: Prominent Pill Search Bar (Desktop only, mobile search is inside drawer) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-2xl relative items-center bg-[#F3F4F7] hover:bg-white focus-within:bg-white border border-gray-200 hover:border-gray-300 focus-within:border-[#FFC400] rounded-full pl-3.5 sm:pl-4 pr-1 sm:pr-1.5 py-1 sm:py-1.5 transition-all shadow-inner focus-within:shadow-[0_0_0_3px_rgba(255,196,0,0.2)]"
            >
              <Search className="w-4 h-4 text-gray-400 mr-2 sm:mr-3 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search power tools, cordless drills, part numbers..."
                className="w-full bg-transparent text-xs sm:text-sm text-gray-900 placeholder-gray-400 font-medium focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="bg-[#FFC400] hover:bg-[#e6b000] text-black w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>

            {/* 3. Right: Utility Action Buttons (Compare, Wishlist, Cart, Sign In, Hamburger) */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <div className="hidden lg:block h-7 w-[1px] bg-gray-200 mr-1" />

              {/* Compare Button (Visible on mobile & desktop) */}
              <button
                type="button"
                onClick={() => alert("Comparison tray is ready. Add instruments to compare.")}
                title="Compare Products"
                className="flex w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white hover:border-[#FFC400] hover:bg-gray-50 items-center justify-center text-gray-700 transition-colors shadow-2xs cursor-pointer"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Wishlist Button (Navigates to /wishlist with live count badge) */}
              <Link
                href="/wishlist"
                title="Wishlist"
                className="relative flex w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white hover:border-[#FFC400] hover:bg-gray-50 items-center justify-center text-gray-700 transition-colors shadow-2xs cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-800" />
                {wishlistCount > 0 ? (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FFC400] text-black text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                    {wishlistCount}
                  </span>
                ) : null}
              </Link>

              {/* My Cart Button (Opens Cart Drawer, shows live count) */}
              <button
                type="button"
                onClick={() => setCartDrawerOpen(true)}
                className="flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3.5 sm:py-1.5 rounded-full border border-gray-200 bg-gray-100 sm:bg-white hover:border-gray-300 transition-colors shadow-2xs cursor-pointer"
              >
                <div className="relative">
                  <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-800" />
                  {cartCount > 0 ? (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FFC400] text-black text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                      {cartCount}
                    </span>
                  ) : (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gray-300 ring-2 ring-white" />
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left ml-2">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-wider text-gray-400 leading-tight">
                    MY CART
                  </span>
                  <span className="text-xs font-black text-gray-900 leading-tight">
                    {cartCount} {cartCount === 1 ? "Item" : "Items"}
                  </span>
                </div>
              </button>

              {/* User / Sign In Button (Circular "A" avatar on mobile matching reference, pill on desktop) */}
              <Link
                href="/products"
                title="Account / Sign In"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#111319] hover:bg-black text-white font-black text-xs md:hidden shadow-xs"
              >
                <span>A</span>
              </Link>
              <Link
                href="/products"
                className="hidden md:flex items-center gap-1.5 sm:gap-2 bg-[#111319] hover:bg-black text-white px-3.5 sm:px-5 py-2 rounded-full text-xs font-extrabold tracking-wide transition-colors shadow-md"
              >
                <User className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Sign In</span>
              </Link>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 text-gray-800 hover:text-black rounded-lg focus:outline-none cursor-pointer"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2.2]" /> : <Menu className="w-6 h-6 stroke-[2.2]" />}
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TIER 3: BOTTOM NAVIGATION RIBBON (Desktop only)         */}
        {/* ======================================================== */}
        {/* ======================================================== */}
        {/* TIER 3: BOTTOM NAVIGATION RIBBON (Desktop only)         */}
        {/* ======================================================== */}
        <div ref={brandRef} className="hidden md:block bg-white relative z-20 border-b border-gray-200/90 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              {/* Left Group: BRAND, HOT DEALS, INDUSTRIAL HUB, CONTACT */}
              <div className="flex items-center gap-3">
                {/* 1. BRAND Pill Toggle (Opens on hover and click; No yellow without hover) */}
                <div
                  className="relative inline-flex items-center"
                  onMouseEnter={handleBrandEnter}
                  onMouseLeave={handleBrandLeave}
                >
                  <button
                    type="button"
                    onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      brandDropdownOpen
                        ? "bg-[#FFC400] text-black border border-[#E6B000] shadow-xs"
                        : "text-slate-800 hover:text-black hover:bg-gray-100 bg-transparent border border-transparent"
                    }`}
                  >
                    <span>BRAND</span>
                    {brandDropdownOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 stroke-[3] text-black" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 stroke-[3] text-slate-700" />
                    )}
                  </button>
                </div>

                {/* 2. 🔥 HOT DEALS Pill (Yellow Pill when active) */}
                <Link
                  href="/"
                  className={`inline-flex items-center gap-1.5 font-black text-xs uppercase tracking-wider transition-all shrink-0 ${
                    isHotDeals
                      ? "bg-[#FFF9E6] hover:bg-[#FFF2CC] border border-[#FFC400] text-black px-4 py-1.5 rounded-full shadow-2xs"
                      : "text-slate-800 hover:text-black hover:bg-gray-100 px-3 py-1.5 rounded-full"
                  }`}
                >
                  <span className="text-xs">🔥</span>
                  <span>HOT DEALS</span>
                </Link>

                {/* 3. INDUSTRIAL HUB (Yellow Pill when active) */}
                <Link
                  href="/industrial-hub"
                  className={`inline-flex items-center gap-1.5 font-black text-xs uppercase tracking-wider transition-all shrink-0 ${
                    isIndustrialHub
                      ? "bg-[#FFF9E6] hover:bg-[#FFF2CC] border border-[#FFC400] text-black px-4 py-1.5 rounded-full shadow-2xs"
                      : "text-slate-800 hover:text-black hover:bg-gray-100 px-3 py-1.5 rounded-full"
                  }`}
                >
                  INDUSTRIAL HUB
                </Link>

                {/* 4. CONTACT (Yellow Pill when active) */}
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-1.5 font-black text-xs uppercase tracking-wider transition-all shrink-0 ${
                    isContact
                      ? "bg-[#FFF9E6] hover:bg-[#FFF2CC] border border-[#FFC400] text-black px-4 py-1.5 rounded-full shadow-2xs"
                      : "text-slate-800 hover:text-black hover:bg-gray-100 px-3 py-1.5 rounded-full"
                  }`}
                >
                  CONTACT
                </Link>
              </div>

              {/* Right: B2B BULK QUOTE Pill with Sparkles */}
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200/90 text-slate-900 font-black text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-2xs transition-all group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E69900] group-hover:rotate-12 transition-transform" />
                <span className="tracking-wide">B2B BULK QUOTE</span>
              </Link>
            </div>
          </div>

          {/* BRAND Mega Menu Dropdown Panel (Aligned with ribbon padding + Card 3 links to /brands) */}
          {brandDropdownOpen && (
            <div
              onMouseEnter={handleBrandEnter}
              onMouseLeave={handleBrandLeave}
              className="absolute top-full left-0 w-full bg-[#F9FAFB] border-b border-gray-200/90 shadow-xl py-3 sm:py-3.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 sm:gap-4">
                {/* Card 1: MATRIX (B&W to Vibrant Color on Hover) */}
                <Link
                  href="/products?brand=MATRIX"
                  onClick={() => setBrandDropdownOpen(false)}
                  className="bg-white rounded-xl shadow-2xs border border-gray-200/70 hover:border-[#FFC400] hover:shadow-md transition-all p-2.5 sm:p-3 w-36 sm:w-44 h-20 sm:h-22 flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
                >
                  <div className="h-7 sm:h-8 flex items-center justify-center">
                    <Image
                      src="/images/partners/matrix_color.png"
                      alt="MATRIX"
                      width={120}
                      height={24}
                      className="object-contain max-h-5 sm:max-h-5.5 filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <span className="text-[10.5px] sm:text-xs font-black uppercase tracking-wider text-gray-500 group-hover:text-black transition-colors">
                    MATRIX
                  </span>
                </Link>

                {/* Card 2: OWON (B&W to Vibrant Color on Hover) */}
                <Link
                  href="/products?brand=OWON"
                  onClick={() => setBrandDropdownOpen(false)}
                  className="bg-white rounded-xl shadow-2xs border border-gray-200/70 hover:border-[#FFC400] hover:shadow-md transition-all p-2.5 sm:p-3 w-36 sm:w-44 h-20 sm:h-22 flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
                >
                  <div className="h-7 sm:h-8 flex items-center justify-center">
                    <Image
                      src="/images/partners/owon_color.png"
                      alt="OWON"
                      width={85}
                      height={24}
                      className="object-contain max-h-4.5 sm:max-h-5 filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <span className="text-[10.5px] sm:text-xs font-black uppercase tracking-wider text-gray-500 group-hover:text-black transition-colors">
                    OWON
                  </span>
                </Link>

                {/* Card 3: ALL BRANDS (Links to /brands page) */}
                <Link
                  href="/brands"
                  onClick={() => setBrandDropdownOpen(false)}
                  className="border-2 border-dashed border-gray-300/90 rounded-xl p-2.5 sm:p-3 w-36 sm:w-44 h-20 sm:h-22 flex flex-col items-center justify-center gap-1.5 group hover:border-[#FFC400] hover:bg-white/80 transition-all bg-transparent cursor-pointer"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 group-hover:bg-[#FFC400] text-gray-700 group-hover:text-black flex items-center justify-center transition-colors shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-[10.5px] sm:text-xs font-black uppercase tracking-wider text-gray-700 group-hover:text-black transition-colors">
                    ALL BRANDS
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* MOBILE NAVIGATION DRAWER (Clean White Surface matching ref) */}
        {/* ======================================================== */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 shadow-2xl animate-in slide-in-from-top-2 duration-200 text-slate-900">
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="p-3.5 sm:p-4 border-b border-gray-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tools, part codes..."
                  className="w-full bg-white border border-gray-200 rounded-lg pl-3.5 pr-10 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFC400] transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-3 text-gray-400 hover:text-black cursor-pointer"
                >
                  <Search className="w-4 h-4 stroke-[2]" />
                </button>
              </div>
            </form>

            {/* Menu Rows List */}
            <div className="divide-y divide-gray-100 text-left">
              {/* 1. ALL BRANDS */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileBrandsOpen(!mobileBrandsOpen)}
                  className="w-full px-5 py-3.5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 hover:text-[#C48F00] transition-colors cursor-pointer text-left"
                >
                  <span>ALL BRANDS</span>
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      mobileBrandsOpen ? "rotate-90 text-[#FFC400]" : ""
                    }`}
                  />
                </button>
                {mobileBrandsOpen && (
                  <div className="px-5 pb-3 pt-1 grid grid-cols-2 gap-2 bg-slate-50 border-t border-gray-100">
                    {brands.map((b, idx) => (
                      <Link
                        key={idx}
                        href={`/products?brand=${encodeURIComponent(b.name.split(" ")[0])}`}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileBrandsOpen(false);
                        }}
                        className="p-2 rounded bg-white border border-gray-200 text-xs font-bold text-slate-800 hover:border-[#FFC400] transition-colors"
                      >
                        {b.name.split(" ")[0]}
                      </Link>
                    ))}
                    <Link
                      href="/brands"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileBrandsOpen(false);
                      }}
                      className="col-span-2 p-2 rounded bg-[#FFF9E6] border border-[#FFC400]/70 text-xs font-black text-black flex items-center justify-center gap-1.5 hover:bg-[#FFF3CC] transition-colors"
                    >
                      <span>VIEW ALL BRANDS DIRECTORY</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </Link>
                  </div>
                )}
              </div>

              {/* 2. 🔥 HOT DEALS */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-5 py-3.5 flex items-center justify-between text-xs font-black uppercase tracking-wider transition-colors ${
                  isHotDeals
                    ? "bg-[#FFF9E6] text-black font-black"
                    : "text-slate-900 hover:text-[#C48F00]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🔥</span>
                  <span>HOT DEALS</span>
                </span>
                <ChevronRight className="w-4 h-4 text-[#FFC400]" />
              </Link>

              {/* 3. INDUSTRIAL HUB */}
              <Link
                href="/industrial-hub"
                onClick={() => setMobileMenuOpen(false)}
                className="px-5 py-3.5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 hover:text-[#C48F00] transition-colors"
              >
                <span>INDUSTRIAL HUB</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              {/* 4. REQUEST BULK QUOTE */}
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-5 py-3.5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 hover:text-[#C48F00] transition-colors"
              >
                <span>REQUEST BULK QUOTE</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              {/* 5. CONTACT US */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-5 py-3.5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 hover:text-[#C48F00] transition-colors"
              >
                <span>CONTACT US</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>

            {/* Bottom: Sign Out */}
            <div className="px-5 py-4 border-t border-gray-100">
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-gray-400 font-medium hover:text-slate-900 transition-colors inline-block"
              >
                Sign Out
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Cart Slide-Over Drawer */}
      <CartDrawer />
    </>
  );
}
