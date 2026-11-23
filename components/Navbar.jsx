"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  ArrowLeft,
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
  Lock,
  Eye,
  EyeOff,
  Building2,
  Mail,
  Globe,
} from "lucide-react";
import Logo from "./Logo";
import CartDrawer from "./CartDrawer";
import { useShop } from "@/context/ShopContext";
import { productsData } from "@/data/products";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("signin"); // "signin" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "sales@lovosis.in",
    phone: "",
    company: "Lovosis Technology Pvt Ltd",
    password: "",
  });
  const { cartCount, wishlistCount, setCartDrawerOpen } = useShop();
  const [topBarVisible, setTopBarVisible] = useState(true);
  const brandRef = useRef(null);
  const brandTimeoutRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("lovokit_user");
      if (savedUser) {
        setLoggedInUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authTab === "signup") {
      const newUser = {
        name: authForm.name || (authForm.email ? authForm.email.split("@")[0] : "User"),
        email: authForm.email,
        phone: authForm.phone,
        company: authForm.company,
      };
      setLoggedInUser(newUser);
      try {
        localStorage.setItem("lovokit_user", JSON.stringify(newUser));
      } catch (err) {}
      showToast(`Welcome to Lovokit, ${newUser.name}!`);
    } else {
      const user = {
        name: authForm.email ? authForm.email.split("@")[0] : "Customer",
        email: authForm.email,
      };
      setLoggedInUser(user);
      try {
        localStorage.setItem("lovokit_user", JSON.stringify(user));
      } catch (err) {}
      showToast(`Signed in as ${user.name}`);
    }
    setAuthModalOpen(false);
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: "Aman S.",
      email: "aman@lovokit.in",
    };
    setLoggedInUser(demoUser);
    try {
      localStorage.setItem("lovokit_user", JSON.stringify(demoUser));
    } catch (err) {}
    setAuthModalOpen(false);
  };

  const handleBrandEnter = () => {
    if (brandTimeoutRef.current) clearTimeout(brandTimeoutRef.current);
    setBrandDropdownOpen(true);
  };

  const handleBrandLeave = () => {
    if (brandTimeoutRef.current) clearTimeout(brandTimeoutRef.current);
    brandTimeoutRef.current = setTimeout(() => {
      setBrandDropdownOpen(false);
    }, 75);
  };

  const handleCloseBrandImmediate = () => {
    if (brandTimeoutRef.current) clearTimeout(brandTimeoutRef.current);
    setBrandDropdownOpen(false);
  };

  useEffect(() => {
    return () => {
      if (brandTimeoutRef.current) clearTimeout(brandTimeoutRef.current);
    };
  }, []);

  // Lock background body scroll when Auth Screen is active
  useEffect(() => {
    if (authModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [authModalOpen]);

  // Dynamic Navigation Items
  const isIndustrialHub =
    pathname === "/industrial-hub" || pathname.startsWith("/industrial-hub");
  const isContact =
    pathname === "/contact" || pathname.startsWith("/contact");
  const isBrands =
    pathname === "/brands" || pathname.startsWith("/brands");
  const isHotDeals =
    pathname === "/hot-deals" || pathname.startsWith("/hot-deals");

  const navItems = [
    {
      name: "HOT DEALS",
      href: "/hot-deals",
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

  // Close search dropdown when route changes
  useEffect(() => {
    setSearchFocused(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (brandRef.current && !brandRef.current.contains(event.target)) {
        setBrandDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter products matching search term in real-time
  const liveSearchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    const cleanAlpha = q.replace(/[^a-z0-9]/g, "");

    return productsData.filter((p) => {
      const pId = p.id.toLowerCase();
      const pModel = p.model.toLowerCase();
      const pTitle = p.title.toLowerCase();
      const pBrand = p.brand.toLowerCase();
      const pCat = (p.categoryName || p.category || "").toLowerCase();
      const pAlpha = (p.id + p.model).toLowerCase().replace(/[^a-z0-9]/g, "");

      return (
        pId.includes(q) ||
        pModel.includes(q) ||
        pTitle.includes(q) ||
        pBrand.includes(q) ||
        pCat.includes(q) ||
        (cleanAlpha.length >= 2 && pAlpha.includes(cleanAlpha))
      );
    });
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);
    setSearchFocused(false);

    const rawTerm = searchTerm.trim();
    if (!rawTerm) {
      router.push("/products");
      return;
    }

    const cleanQ = rawTerm.toLowerCase();
    const cleanAlpha = cleanQ.replace(/[^a-z0-9]/g, "");

    // 1. Direct exact ID or exact model match (e.g. "LT-8085", "xds3302", "spd3303x")
    const exactMatch = productsData.find((p) => {
      const pId = p.id.toLowerCase();
      const pModel = p.model.toLowerCase();
      return (
        pId === cleanQ ||
        pModel === cleanQ ||
        pId.replace(/[^a-z0-9]/g, "") === cleanAlpha ||
        pModel.replace(/[^a-z0-9]/g, "") === cleanAlpha
      );
    });

    if (exactMatch) {
      setSearchTerm("");
      router.push(`/products/${exactMatch.id}`);
      return;
    }

    // 2. Catalog matches check
    const matches = liveSearchResults;

    // If query uniquely matches 1 product -> open its details page directly
    if (matches.length === 1) {
      setSearchTerm("");
      router.push(`/products/${matches[0].id}`);
      return;
    }

    // If query matches multiple products (e.g. "LT" matches 8-10 products) OR 0 products -> open products catalog page
    router.push(`/products?search=${encodeURIComponent(rawTerm)}`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 2800);
  };

  const brands = [
    { name: "LOVOSIS", desc: "Industrial Automation & Smart Technology" },
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
            <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-2xl relative">
              <form
                onSubmit={handleSearchSubmit}
                className="w-full relative flex items-center bg-[#F3F4F7] hover:bg-white focus-within:bg-white border border-gray-200 hover:border-gray-300 focus-within:border-[#FFC400] rounded-full pl-3.5 sm:pl-4 pr-1 sm:pr-1.5 py-1 sm:py-1.5 transition-all shadow-inner focus-within:shadow-[0_0_0_3px_rgba(255,196,0,0.2)]"
              >
                <Search className="w-4 h-4 text-gray-400 mr-2 sm:mr-3 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSearchFocused(true);
                  }}
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

              {/* Live Instant Search Dropdown */}
              {searchFocused && searchTerm.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {liveSearchResults.length > 0 ? (
                    <div>
                      <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        <span>
                          {liveSearchResults.length === 1
                            ? "1 Matching Instrument"
                            : `${liveSearchResults.length} Products Found`}
                        </span>
                        <span className="text-gray-400 font-normal">Press Enter to search</span>
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                        {liveSearchResults.slice(0, 5).map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              setSearchFocused(false);
                              setSearchTerm("");
                              router.push(`/products/${item.id}`);
                            }}
                            className="p-3 flex items-center gap-3 hover:bg-amber-50/50 cursor-pointer transition-colors group"
                          >
                            <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 p-1 border border-gray-100">
                              <Image
                                src={item.image}
                                alt={item.model}
                                width={40}
                                height={40}
                                className="object-contain max-h-9"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.2 bg-[#FFC400] text-black rounded">
                                  {item.brand}
                                </span>
                                <span className="text-xs font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                                  {item.model}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-500 truncate mt-0.5">
                                {item.title}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-black text-slate-900 block">
                                {item.price}
                              </span>
                              <span className="text-[10px] text-amber-600 font-bold group-hover:underline">
                                View →
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer Action Button */}
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full py-2.5 px-4 bg-gray-50 hover:bg-[#FFC400] text-slate-800 hover:text-black text-xs font-black uppercase tracking-wider text-center transition-colors border-t border-gray-100 cursor-pointer"
                      >
                        {liveSearchResults.length > 1
                          ? `View all ${liveSearchResults.length} results in Products Page →`
                          : "Open Product Details Page →"}
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-900">
                        No products found for &ldquo;{searchTerm}&rdquo;
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Try searching by brand (e.g. OWON, MATRIX) or model code
                      </p>
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="mt-3 px-4 py-1.5 bg-[#FFC400] text-black font-black text-[11px] uppercase tracking-wider rounded-full shadow-xs cursor-pointer"
                      >
                        Search Catalog Anyway
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

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

              {/* User / Sign In Button */}
              {loggedInUser ? (
                <div className="relative group/user">
                  <button
                    type="button"
                    title={loggedInUser.name || "My Account"}
                    className="flex items-center gap-1.5 bg-slate-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-extrabold tracking-wide hover:bg-black transition-colors shadow-sm cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#FFC400] text-black text-[10px] font-black flex items-center justify-center">
                      {(loggedInUser.name || "U")[0].toUpperCase()}
                    </span>
                    <span className="hidden md:inline max-w-[90px] truncate">
                      {loggedInUser.name || "Account"}
                    </span>
                  </button>
                  {/* Dropdown Menu on Hover */}
                  <div className="hidden group-hover/user:block absolute right-0 top-full pt-1.5 z-50">
                    <div className="w-44 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 text-xs">
                      <div className="px-3 py-2 border-b border-slate-100 font-bold text-slate-800">
                        {loggedInUser.name || "Customer"}
                      </div>
                      <Link
                        href="/wishlist"
                        className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 font-medium"
                      >
                        My Wishlist
                      </Link>
                      <Link
                        href="/checkout"
                        className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 font-medium"
                      >
                        Orders & Checkout
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem("lovokit_user");
                          setLoggedInUser(null);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 font-bold mt-1 cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setAuthModalOpen(true)}
                    title="Account / Sign In"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-[#111319] hover:bg-black text-white font-black text-xs md:hidden shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    <User className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthModalOpen(true)}
                    className="hidden md:flex items-center gap-1.5 sm:gap-2 bg-[#111319] hover:bg-black text-white px-3.5 sm:px-5 py-2 rounded-full text-xs font-extrabold tracking-wide transition-all shadow-md cursor-pointer active:scale-95"
                  >
                    <User className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Sign In</span>
                  </button>
                </>
              )}

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
                  href="/hot-deals"
                  onMouseEnter={handleCloseBrandImmediate}
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
                  onMouseEnter={handleCloseBrandImmediate}
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
                  onMouseEnter={handleCloseBrandImmediate}
                  className={`inline-flex items-center gap-1.5 font-black text-xs uppercase tracking-wider transition-all shrink-0 ${
                    isContact
                      ? "bg-[#FFF9E6] hover:bg-[#FFF2CC] border border-[#FFC400] text-black px-4 py-1.5 rounded-full shadow-2xs"
                      : "text-slate-800 hover:text-black hover:bg-gray-100 px-3 py-1.5 rounded-full"
                  }`}
                >
                  CONTACT
                </Link>
              </div>
            </div>
          </div>

          {/* BRAND Mega Menu Dropdown Panel (Instant & Snappy Transition) */}
          {brandDropdownOpen && (
            <div
              onMouseEnter={handleBrandEnter}
              onMouseLeave={handleBrandLeave}
              className="absolute top-full left-0 w-full bg-[#F9FAFB] border-b border-gray-200/90 shadow-xl py-5 sm:py-6 z-50 transition-opacity duration-100 ease-out"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 sm:gap-5">
                {/* Card 1: LOVOSIS (First Brand) */}
                <Link
                  href="/brands/lovosis"
                  onClick={() => setBrandDropdownOpen(false)}
                  className="bg-white rounded-2xl shadow-2xs border border-gray-200/80 hover:border-[#FFC400] hover:shadow-lg transition-all p-3 sm:p-4 w-44 sm:w-56 h-28 sm:h-32 flex flex-col items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <div className="h-12 sm:h-14 w-full flex items-center justify-center">
                    <Image
                      src="/images/partners/lovosis_color.webp"
                      alt="LOVOSIS"
                      width={150}
                      height={42}
                      className="object-contain max-h-9 sm:max-h-10 w-auto filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-108 transition-all duration-300"
                      unoptimized
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-slate-700 group-hover:text-black transition-colors">
                    LOVOSIS
                  </span>
                </Link>

                {/* Card 2: MATRIX (B&W to Vibrant Color on Hover) */}
                <Link
                  href="/brands/matrix"
                  onClick={() => setBrandDropdownOpen(false)}
                  className="bg-white rounded-2xl shadow-2xs border border-gray-200/80 hover:border-[#FFC400] hover:shadow-lg transition-all p-3 sm:p-4 w-44 sm:w-56 h-28 sm:h-32 flex flex-col items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <div className="h-12 sm:h-14 w-full flex items-center justify-center">
                    <Image
                      src="/images/partners/matrix_color.png"
                      alt="MATRIX"
                      width={150}
                      height={42}
                      className="object-contain max-h-8 sm:max-h-9 w-auto filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-108 transition-all duration-300"
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-slate-700 group-hover:text-black transition-colors">
                    MATRIX
                  </span>
                </Link>

                {/* Card 3: OWON (B&W to Vibrant Color on Hover) */}
                <Link
                  href="/brands/owon"
                  onClick={() => setBrandDropdownOpen(false)}
                  className="bg-white rounded-2xl shadow-2xs border border-gray-200/80 hover:border-[#FFC400] hover:shadow-lg transition-all p-3 sm:p-4 w-44 sm:w-56 h-28 sm:h-32 flex flex-col items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <div className="h-12 sm:h-14 w-full flex items-center justify-center">
                    <Image
                      src="/images/partners/owon_color.png"
                      alt="OWON"
                      width={130}
                      height={42}
                      className="object-contain max-h-7 sm:max-h-8 w-auto filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-108 transition-all duration-300"
                    />
                  </div>
                  <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-slate-700 group-hover:text-black transition-colors">
                    OWON
                  </span>
                </Link>

                {/* Card 4: ALL BRANDS (Links to /brands page) */}
                <Link
                  href="/brands"
                  onClick={() => setBrandDropdownOpen(false)}
                  className="border-2 border-dashed border-gray-300/90 rounded-2xl p-3 sm:p-4 w-44 sm:w-56 h-28 sm:h-32 flex flex-col items-center justify-center gap-2.5 group hover:border-[#FFC400] hover:bg-white/80 transition-all bg-transparent cursor-pointer"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 group-hover:bg-[#FFC400] text-gray-700 group-hover:text-black flex items-center justify-center transition-colors shadow-2xs">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-slate-800 group-hover:text-black transition-colors">
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
                        href={`/brands/${b.name.split(" ")[0].toLowerCase()}`}
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
                href="/hot-deals"
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

              {/* 4. CONTACT US */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-5 py-3.5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 hover:text-[#C48F00] transition-colors"
              >
                <span>CONTACT US</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>

            {/* Bottom: User Sign In / Account Info */}
            <div className="px-5 py-4 border-t border-gray-100 bg-slate-50">
              {loggedInUser ? (
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FFC400] text-black font-black flex items-center justify-center text-[11px]">
                      {(loggedInUser.name || "U")[0].toUpperCase()}
                    </span>
                    <span className="font-bold text-slate-900">{loggedInUser.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("lovokit_user");
                      setLoggedInUser(null);
                      setMobileMenuOpen(false);
                    }}
                    className="text-red-600 font-bold hover:underline cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-950 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
                >
                  <User className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Sign In / Register</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* DEDICATED FULL-SCREEN ENTERPRISE AUTHENTICATION PAGE      */}
      {/* ======================================================== */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F2F4F7] flex flex-col justify-between animate-in fade-in duration-150">
          {/* Subtle Enterprise Matrix Pattern on Off-White Canvas */}
          <div
            className="fixed inset-0 pointer-events-none opacity-40 z-0"
            style={{
              backgroundImage: "radial-gradient(#CBD5E1 1.2px, transparent 1.2px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Top Dedicated Portal Navigation Bar */}
          <header className="relative z-10 w-full px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-2xs">
            {/* Back to store navigation */}
            <button
              type="button"
              onClick={() => setAuthModalOpen(false)}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-black transition-colors cursor-pointer group px-3 py-1.5 rounded-full hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Store</span>
            </button>

            {/* Portal Title Badge */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
                LOVOKIT ENTERPRISE B2B GATEWAY
              </span>
            </div>

            {/* Close / Dismiss Button */}
            <button
              type="button"
              onClick={() => setAuthModalOpen(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-800 text-xs font-black transition-colors cursor-pointer"
              title="Return to Marketplace"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </header>

          {/* Main Centered Auth Container */}
          <main className="relative z-10 flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8">
            <div className="relative w-full max-w-4xl bg-white rounded-3xl sm:rounded-[32px] shadow-[0_20px_50px_-10px_rgba(15,23,42,0.12)] border border-slate-200/90 overflow-hidden grid grid-cols-1 md:grid-cols-12 my-auto">
              {/* ---------------------------------------------------- */}
              {/* LEFT COLUMN: BESPOKE ENTERPRISE SHOWCASE (DARK CARBON)*/}
              {/* ---------------------------------------------------- */}
              <div className="md:col-span-5 bg-gradient-to-b from-[#0E121A] via-[#090C12] to-[#05070B] text-white p-7 sm:p-8 lg:p-9 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10 select-none">
                {/* Subtle tech dot matrix pattern */}
                <div
                  className="absolute inset-0 opacity-[0.07] pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                {/* Ambient Gold & Ember Lighting Accents */}
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#FFC400]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  {/* Brand Header with Live Enterprise Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-block bg-white px-3 py-2 rounded-xl shadow-md border border-white/20">
                      <Logo darkText={true} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.07] border border-white/15 text-[10px] font-black tracking-wider uppercase text-[#FFC400]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400] animate-pulse" />
                      B2B PORTAL
                    </span>
                  </div>

                  {/* Distinctive Hero Headline */}
                  <div className="pt-2">
                    <div className="inline-block text-[10.5px] font-extrabold uppercase tracking-widest text-[#FFC400] mb-1.5">
                      Verified Wholesale Gateway
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white leading-[1.12] tracking-tight uppercase">
                      ENTERPRISE <br />
                      <span className="bg-gradient-to-r from-[#FFC400] via-[#FFE082] to-[#FFB300] bg-clip-text text-transparent">
                        PROCUREMENT
                      </span> <br />
                      ACCESS
                    </h2>
                    <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                      Sign in with your business credentials to access orders, invoices, serialized warranties, and dedicated support.
                    </p>
                  </div>

                  {/* 3 Bespoke Value Pillar Cards */}
                  <div className="space-y-2.5 pt-1">
                    {/* Pillar 1: Secure Authentication */}
                    <div className="group/pillar p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#FFC400]/40 transition-all duration-200 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFC400]/25 to-[#FFC400]/5 border border-[#FFC400]/30 text-[#FFC400] flex items-center justify-center shrink-0 group-hover/pillar:scale-105 transition-transform">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-wider text-white">
                            SECURE AUTHENTICATION
                          </span>
                          <span className="text-[9px] font-bold text-[#FFC400] bg-[#FFC400]/10 px-1.5 py-0.5 rounded">
                            2FA
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug truncate">
                          Industry-standard encryption and 2FA protection.
                        </div>
                      </div>
                    </div>

                    {/* Pillar 2: Role-Based Dashboard */}
                    <div className="group/pillar p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#FFC400]/40 transition-all duration-200 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-400/5 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0 group-hover/pillar:scale-105 transition-transform">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-wider text-white">
                            ROLE-BASED DASHBOARD
                          </span>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                            RBAC
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug truncate">
                          Personalized view based on your account permissions.
                        </div>
                      </div>
                    </div>

                    {/* Pillar 3: Unified Workspace */}
                    <div className="group/pillar p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#FFC400]/40 transition-all duration-200 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400/20 to-sky-400/5 border border-sky-400/30 text-sky-400 flex items-center justify-center shrink-0 group-hover/pillar:scale-105 transition-transform">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-wider text-white">
                            UNIFIED WORKSPACE
                          </span>
                          <span className="text-[9px] font-bold text-sky-400 bg-sky-400/10 px-1.5 py-0.5 rounded">
                            ALL-IN-ONE
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug truncate">
                          Orders, quotes, invoices, and support in one place.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Copyright & Systems Status Pill */}
                <div className="pt-6 mt-6 border-t border-white/10 text-[10.5px] text-slate-400 relative z-10 flex flex-col gap-1.5">
                  <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-full w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-bold text-[10px] tracking-wide">
                      Systems Operational • 99.99% Uptime
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    © 2026 Lovokit by Lovosis Technology Private Limited.
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* RIGHT COLUMN: REFINED INTERACTIVE AUTH FORM (LIGHT) */}
              {/* ---------------------------------------------------- */}
              <div className="md:col-span-7 bg-white p-7 sm:p-8 lg:p-9 flex flex-col justify-between relative overflow-y-auto max-h-[88vh] no-scrollbar">
                {/* Close Button Top Right of Card */}
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(false)}
                  className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer z-20 group"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </button>

                <div>
                  {/* Modern Pill Switcher: SIGN IN vs CREATE ACCOUNT */}
                  <div className="flex items-center justify-between gap-3 mb-6 pr-8">
                    <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
                      <button
                        type="button"
                        onClick={() => setAuthTab("signin")}
                        className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          authTab === "signin"
                            ? "bg-slate-950 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthTab("signup")}
                        className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          authTab === "signup"
                            ? "bg-[#FFC400] text-black shadow-sm"
                            : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
                        }`}
                      >
                        Create Account
                      </button>
                    </div>

                    <span className="hidden sm:inline-block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {authTab === "signin" ? "Returning Buyer" : "New Enterprise"}
                    </span>
                  </div>

                  {/* Header Title & Subtitle */}
                  <div className="mb-5">
                    <h3 className="text-2xl font-black text-slate-950 tracking-tight uppercase flex items-center gap-2">
                      {authTab === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
                      <span className="w-2 h-2 rounded-full bg-[#FFC400]" />
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                      {authTab === "signin"
                        ? "ACCESS YOUR BUSINESS ACCOUNT"
                        : "REGISTER YOUR ENTERPRISE PROFILE"}
                    </p>
                  </div>

                  {/* Main Auth Form */}
                  <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-left">
                    {/* Sign Up: Full Name */}
                    {authTab === "signup" && (
                      <div>
                        <label className="text-[10.5px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                          FULL NAME <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={authForm.name}
                            onChange={(e) =>
                              setAuthForm({ ...authForm, name: e.target.value })
                            }
                            placeholder="e.g. Aman Sharma"
                            className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/15 text-xs sm:text-sm text-slate-900 rounded-xl pl-10 pr-4 py-2.5 sm:py-3 focus:outline-none transition-all font-medium shadow-2xs"
                          />
                        </div>
                      </div>
                    )}

                    {/* Business Email */}
                    <div>
                      <label className="text-[10.5px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                        BUSINESS EMAIL <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={authForm.email}
                          onChange={(e) =>
                            setAuthForm({ ...authForm, email: e.target.value })
                          }
                          placeholder="sales@lovosis.in"
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/15 text-xs sm:text-sm text-slate-900 rounded-xl pl-10 pr-4 py-2.5 sm:py-3 focus:outline-none transition-all font-medium shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Sign Up: Phone & Company */}
                    {authTab === "signup" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10.5px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                            PHONE / WHATSAPP <span className="text-red-500">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                            <input
                              type="tel"
                              required
                              value={authForm.phone}
                              onChange={(e) =>
                                setAuthForm({ ...authForm, phone: e.target.value })
                              }
                              placeholder="+91 98000 00000"
                              className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/15 text-xs sm:text-sm text-slate-900 rounded-xl pl-10 pr-4 py-2.5 sm:py-3 focus:outline-none transition-all font-medium shadow-2xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10.5px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                            COMPANY (FOR GST)
                          </label>
                          <div className="relative flex items-center">
                            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                            <input
                              type="text"
                              value={authForm.company}
                              onChange={(e) =>
                                setAuthForm({ ...authForm, company: e.target.value })
                              }
                              placeholder="Lovosis Technology"
                              className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/15 text-xs sm:text-sm text-slate-900 rounded-xl pl-10 pr-4 py-2.5 sm:py-3 focus:outline-none transition-all font-medium shadow-2xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Password with Eye toggle */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10.5px] font-black uppercase tracking-wider text-slate-700 block">
                          PASSWORD <span className="text-red-500">*</span>
                        </label>
                        {authTab === "signin" && (
                          <button
                            type="button"
                            onClick={() => showToast("Password reset link sent to registered email")}
                            className="text-[11px] font-bold text-slate-500 hover:text-black hover:underline cursor-pointer"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative flex items-center">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={authForm.password}
                          onChange={(e) =>
                            setAuthForm({ ...authForm, password: e.target.value })
                          }
                          placeholder="••••••••••••"
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-[#FFC400] focus:ring-4 focus:ring-[#FFC400]/15 text-xs sm:text-sm text-slate-900 rounded-xl pl-10 pr-10 py-2.5 sm:py-3 focus:outline-none transition-all font-medium shadow-2xs tracking-wider"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Primary Submit Button */}
                    <button
                      type="submit"
                      className="w-full mt-2 py-3.5 rounded-xl bg-slate-950 hover:bg-black text-white hover:text-[#FFC400] font-black text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-[0.99] group/btn"
                    >
                      <span>
                        {authTab === "signin"
                          ? "SIGN IN TO DASHBOARD"
                          : "CREATE BUSINESS ACCOUNT"}
                      </span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </form>

                  {/* Divider: OR CONTINUE WITH */}
                  <div className="relative my-4 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <span className="relative bg-white px-3 text-[10px] sm:text-[10.5px] font-black uppercase tracking-wider text-slate-400">
                      OR CONTINUE WITH
                    </span>
                  </div>

                  {/* Social / Demo Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={handleDemoLogin}
                      className="py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                    >
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span>GOOGLE</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDemoLogin}
                      className="py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100/90 border border-amber-300 text-amber-950 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      <span className="truncate">1-CLICK DEMO (sales@lovosis.in)</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Security / Trust Footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    256-Bit SSL
                  </span>
                  <span>•</span>
                  <span>Instant GST Invoicing</span>
                  <span>•</span>
                  <span className="text-emerald-600">Lovosis Verified</span>
                </div>
              </div>
            </div>
          </main>

          {/* Bottom Security Footer Strip */}
          <footer className="relative z-10 w-full py-3 sm:py-3.5 px-4 text-center border-t border-slate-200/80 bg-white/60 backdrop-blur-xs">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
              <span>🔒 256-Bit Bank-Grade SSL</span>
              <span className="hidden sm:inline">•</span>
              <span>⚡ Automated GST Invoicing & Compliance</span>
              <span className="hidden sm:inline">•</span>
              <span>🛡️ Lovosis Technology Enterprise Network</span>
            </div>
          </footer>
        </div>
      )}

      {/* Interactive Cart Slide-Over Drawer */}
      <CartDrawer />
    </>
  );
}
