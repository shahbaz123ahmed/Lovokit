"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  MapPin,
  CheckCircle2,
  Save,
  Lock,
  LogOut,
  ShoppingCart,
  Heart,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";

export default function ProfilePage() {
  const { user, updateUser, logout, setAuthModalOpen, setAuthPromptReason, cartCount, wishlistCount } = useShop();

  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "address"
  const [profileSaved, setProfileSaved] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    gstin: "",
  });

  // Address Form State
  const [addressForm, setAddressForm] = useState({
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Sync state when user loads/changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "Aman S.",
        email: user.email || "sales@lovosis.in",
        phone: user.phone || "+91 97477 45544",
        company: user.company || "Lovosis Technology Pvt Ltd",
        gstin: user.gstin || "27AABCL1234F1Z5",
      });

      const addr = user.address || {};
      setAddressForm({
        street: addr.street || "3rd Floor, Swathi Building, 4-72/2, Main Road",
        landmark: addr.landmark || "Opp. Singapura Garden, Lakshmipura",
        city: addr.city || "Bengaluru",
        state: addr.state || "Karnataka",
        pincode: addr.pincode || "560013",
        country: addr.country || "India",
      });
    }
  }, [user]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUser({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      company: profileForm.company,
      gstin: profileForm.gstin,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    updateUser({
      address: {
        street: addressForm.street,
        landmark: addressForm.landmark,
        city: addressForm.city,
        state: addressForm.state,
        pincode: addressForm.pincode,
        country: addressForm.country,
      },
    });
    setAddressSaved(true);
    setTimeout(() => setAddressSaved(false), 3000);
  };

  // Unauthenticated Guard
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black flex flex-col justify-between">
        <Navbar />

        <main className="max-w-md mx-auto px-4 pt-32 sm:pt-40 pb-20 text-center w-full my-auto">
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8 text-slate-900" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#B58200] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Account Security
              </span>
              <h1 className="text-2xl font-black text-slate-950 tracking-tight pt-1">
                Sign In to View Profile
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-sm mx-auto leading-relaxed">
              Apna profile details aur delivery addresses edit karne ke liye pehle apna account Sign In karein.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setAuthPromptReason("profile");
                  setAuthModalOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-black text-white hover:text-[#FFC400] font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-[#FFC400]" />
                <span>Sign In / Create Account</span>
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const initial = (user?.name || "A")[0].toUpperCase();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16 w-full flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">My Profile &amp; Address</span>
        </div>

        {/* User Greeting & Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-950 text-[#FFC400] flex items-center justify-center font-black text-2xl shadow-md border-2 border-[#FFC400]/40 shrink-0">
              {initial}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  {user.name}
                </h1>
                <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-300 text-amber-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                  <span>Verified B2B Account</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {user.email} • {user.company || "Lovosis Enterprise"}
              </p>
            </div>
          </div>

          {/* Quick Stats & Sign Out */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href="/cart"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-slate-600" />
              <span>Cart ({cartCount})</span>
            </Link>
            <Link
              href="/wishlist"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-slate-600" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Profile Details vs Delivery Address */}
        <div className="flex p-1 bg-white rounded-2xl border border-slate-200/90 shadow-2xs mb-6 w-full sm:w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-slate-950 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            Personal &amp; Business Info
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("address")}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "address"
                ? "bg-slate-950 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            Delivery &amp; Billing Address
          </button>
        </div>

        {/* TAB 1: Profile & Company Details */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-lg font-black text-slate-950 tracking-tight">
                  Personal &amp; Enterprise Information
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your contact info and official corporate details for GST invoicing.
                </p>
              </div>

              {profileSaved && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] text-xs sm:text-sm text-slate-900 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, email: e.target.value })
                      }
                      className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] text-xs sm:text-sm text-slate-900 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, phone: e.target.value })
                      }
                      className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] text-xs sm:text-sm text-slate-900 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                    Company Name (for GST Invoicing)
                  </label>
                  <div className="relative flex items-center">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={profileForm.company}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, company: e.target.value })
                      }
                      className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] text-xs sm:text-sm text-slate-900 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                  GSTIN / Tax ID (Optional for 18% Input Tax Credit)
                </label>
                <div className="relative flex items-center">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={profileForm.gstin}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, gstin: e.target.value })
                    }
                    placeholder="27AABCL1234F1Z5"
                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] text-xs sm:text-sm text-slate-900 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 focus:outline-none transition-all font-mono font-bold uppercase"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-slate-950 hover:bg-black text-white hover:text-[#FFC400] font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Details</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: Delivery & Billing Address */}
        {activeTab === "address" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-lg font-black text-slate-950 tracking-tight">
                  Default Delivery &amp; Laboratory Address
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  This address will be auto-filled during express instrument checkout and dispatch.
                </p>
              </div>

              {addressSaved && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Address Saved!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleAddressSubmit} className="space-y-4 max-w-2xl">
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                  Street Address / Premises / Unit <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={addressForm.street}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, street: e.target.value })
                    }
                    placeholder="e.g. 3rd Floor, Swathi Building, Main Road"
                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] text-xs sm:text-sm text-slate-900 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 focus:outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                  Landmark / Industrial Area
                </label>
                <input
                  type="text"
                  value={addressForm.landmark}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, landmark: e.target.value })
                  }
                  placeholder="e.g. Opp. Technology Park, Gate 2"
                  className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] text-xs sm:text-sm text-slate-900 rounded-xl px-3.5 py-2.5 sm:py-3 focus:outline-none transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, city: e.target.value })
                    }
                    placeholder="e.g. Bengaluru / Pune"
                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] text-xs sm:text-sm text-slate-900 rounded-xl px-3.5 py-2.5 sm:py-3 focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.state}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, state: e.target.value })
                    }
                    placeholder="e.g. Karnataka / Maharashtra"
                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] text-xs sm:text-sm text-slate-900 rounded-xl px-3.5 py-2.5 sm:py-3 focus:outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.pincode}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, pincode: e.target.value })
                    }
                    placeholder="560013"
                    className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] text-xs sm:text-sm text-slate-900 rounded-xl px-3.5 py-2.5 sm:py-3 focus:outline-none transition-all font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    disabled
                    value={addressForm.country}
                    className="w-full bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-500 rounded-xl px-3.5 py-2.5 sm:py-3 cursor-not-allowed font-medium"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-slate-950 hover:bg-black text-white hover:text-[#FFC400] font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Delivery Address</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
