"use client";

import React, { useState } from "react";
import { Tag, Plus, Trash2, Check, X } from "lucide-react";
import { brandsData, productsData } from "@/data/products";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState(
    brandsData
      .filter((b) => b !== "All Brands")
      .map((b) => ({
        name: b,
        count: productsData.filter((p) => p.brand === b).length,
      }))
  );

  const [toast, setToast] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;

    const brandFormatted = newBrandName.toUpperCase().trim();
    if (brands.some((b) => b.name === brandFormatted)) {
      alert("Brand already exists!");
      return;
    }

    setBrands([...brands, { name: brandFormatted, count: 0 }]);
    setNewBrandName("");
    setIsModalOpen(false);
    showToast(`OEM Partner "${brandFormatted}" registered`);
  };

  const handleDeleteBrand = (name) => {
    if (!confirm(`Delete brand "${name}"?`)) return;
    setBrands(brands.filter((b) => b.name !== name));
    showToast(`Brand "${name}" removed`);
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2">
            <span>OEM Brand Partners</span>
            <span className="text-xs font-black bg-[#FFFFFF] text-[#090A0C] px-2.5 py-0.5 rounded-full border border-[#E7E5DF]">
              {brands.length} Brands
            </span>
          </h1>
          <p className="text-xs text-[#858585] mt-0.5">
            Manage authorized manufacturer distributorships and catalog filter categories.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#090A0C] hover:bg-[#FFC400] text-[#FFFFFF] hover:text-[#090A0C] font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-98"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Add OEM Partner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((b) => (
          <div
            key={b.name}
            className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs p-5 flex items-center justify-between hover:border-[#090A0C] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFC400]/15 text-[#090A0C] flex items-center justify-center font-black">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#090A0C] uppercase">
                  {b.name}
                </h3>
                <span className="text-[11px] text-[#858585] font-medium">
                  {b.count} Instruments
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteBrand(b.name)}
              className="p-1.5 rounded-lg text-[#858585] hover:text-[#090A0C] hover:bg-[#F7F6F1] cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-[#090A0C]/75 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FFFFFF] rounded-2xl p-6 shadow-2xl border border-[#E7E5DF]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black uppercase text-[#090A0C]">
                Add OEM Partner
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#858585] hover:text-[#090A0C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddBrand} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10.5px] font-black uppercase tracking-wider text-[#090A0C] mb-1">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  placeholder="e.g. KEYSIGHT or TEKTRONIX"
                  className="w-full bg-[#F7F6F1] border border-[#E7E5DF] rounded-xl px-3 py-2.5 text-xs font-bold text-[#090A0C] focus:outline-none focus:border-[#090A0C]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-bold text-[#858585]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#090A0C] hover:bg-[#FFC400] text-[#FFFFFF] hover:text-[#090A0C] font-black uppercase"
                >
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
