"use client";

import React, { useState } from "react";
import { Settings, ShieldCheck, Building2, Key, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#090A0C] text-[#FFFFFF] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-black border border-[#17191E] animate-in fade-in">
          <div className="w-5 h-5 rounded-full bg-[#FFC400] text-[#090A0C] flex items-center justify-center font-black">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toast}</span>
        </div>
      )}

      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2.5">
          <span>Settings & Security</span>
        </h1>
        <p className="text-xs text-[#858585] mt-1">
          Configure enterprise corporate details, GSTIN invoicing preferences, and administrator credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company / GST Profile */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E7E5DF] shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E7E5DF]">
            <Building2 className="w-5 h-5 text-[#090A0C]" />
            <h2 className="text-sm font-black uppercase text-[#090A0C]">Corporate Invoicing Profile</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[10.5px] font-black uppercase tracking-wider text-[#090A0C] mb-1">
                Legal Entity Name
              </label>
              <input
                type="text"
                defaultValue="Lovosis Technology Private Limited"
                className="w-full bg-[#F7F6F1] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs font-bold text-[#090A0C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10.5px] font-black uppercase tracking-wider text-[#090A0C] mb-1">
                Brand Trading Name
              </label>
              <input
                type="text"
                defaultValue="Lovokit"
                className="w-full bg-[#F7F6F1] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs font-bold text-[#090A0C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10.5px] font-black uppercase tracking-wider text-[#090A0C] mb-1">
                Registered Corporate Office Address
              </label>
              <textarea
                rows={2}
                defaultValue="3rd Floor, Swathi building, 4-72/2, Main Road, opp. singapura Garden, Lakshmipura, Abbigere, Bengaluru, Karnataka 560090"
                className="w-full bg-[#F7F6F1] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs font-bold text-[#090A0C] focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10.5px] font-black uppercase tracking-wider text-[#090A0C] mb-1">
                  Official Contact Phone
                </label>
                <input
                  type="text"
                  defaultValue="+91 97477 45544"
                  className="w-full bg-[#F7F6F1] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs font-bold text-[#090A0C] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-black uppercase tracking-wider text-[#090A0C] mb-1">
                  Official Invoicing Email
                </label>
                <input
                  type="text"
                  defaultValue="sales@lovosis.in"
                  className="w-full bg-[#F7F6F1] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs font-bold text-[#090A0C] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10.5px] font-black uppercase tracking-wider text-[#090A0C] mb-1">
                Default HSN Chapter (Lab Equipment)
              </label>
              <input
                type="text"
                defaultValue="90302000 (Oscilloscopes & Digitizers)"
                className="w-full bg-[#F7F6F1] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs font-bold text-[#090A0C] focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => showToast("Corporate profile saved")}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#090A0C] hover:bg-[#FFC400] text-[#FFFFFF] hover:text-[#090A0C] font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E7E5DF] shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#E7E5DF]">
            <Key className="w-5 h-5 text-[#090A0C]" />
            <h2 className="text-sm font-black uppercase text-[#090A0C]">Access & Security</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#F7F6F1] border border-[#E7E5DF] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#090A0C] block text-xs">Two-Factor Authentication (2FA)</span>
                <span className="text-[11px] text-[#858585]">Required for admin catalog mutations</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#FFC400] text-[#090A0C]">
                ENABLED
              </span>
            </div>

            <div>
              <label className="block text-[10.5px] font-black uppercase tracking-wider text-[#090A0C] mb-1">
                Admin Master Email
              </label>
              <input
                type="email"
                defaultValue="sales@lovosis.in"
                className="w-full bg-[#F7F6F1] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs font-bold text-[#090A0C] focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => showToast("Security parameters updated")}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#090A0C] hover:bg-[#FFC400] text-[#FFFFFF] hover:text-[#090A0C] font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Update Security
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
