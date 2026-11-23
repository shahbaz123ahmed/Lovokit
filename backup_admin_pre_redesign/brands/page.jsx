"use client";

import React, { useState } from "react";
import { Tag, Plus, Trash2, Check, X, ExternalLink } from "lucide-react";
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
    showToast(`Brand "${brandFormatted}" added to catalog`);
  };

  const handleDeleteBrand = (name) => {
    if (!confirm(`Delete brand "${name}"?`)) return;
    setBrands(brands.filter((b) => b.name !== name));
    showToast(`Brand "${name}" removed`);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold border border-slate-700 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{toast}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-950 flex items-center gap-2">
            <span>Partner Brands</span>
            <span className="text-xs font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
              {brands.length} Brands
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage OEM brand partnerships, authorized distributorships, and product filters.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Brand</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((b) => (
          <div
            key={b.name}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 flex items-center justify-between hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-black">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-950 uppercase">
                  {b.name}
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  {b.count} Instruments
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteBrand(b.name)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black uppercase text-slate-950">
                Add New Brand
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddBrand} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  placeholder="e.g. KEYSIGHT or TEKTRONIX"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FFC400]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-black uppercase hover:bg-black"
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
