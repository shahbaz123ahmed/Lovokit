"use client";

import React, { useState } from "react";
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  FolderPlus,
  Check,
  X,
  Package,
} from "lucide-react";
import { categoriesData, productsData } from "@/data/products";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(
    categoriesData
      .filter((c) => c.id !== "all")
      .map((c) => ({
        ...c,
        subcategories: [
          { id: `${c.id}-bench`, name: "Benchtop Units", count: Math.ceil(c.count / 2) },
          { id: `${c.id}-portable`, name: "Handheld / Portable", count: Math.floor(c.count / 2) },
        ],
      }))
  );

  const [toast, setToast] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [activeParentCategory, setActiveParentCategory] = useState(null);

  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const newCat = {
      id: categoryName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: categoryName.trim(),
      count: 0,
      subcategories: [],
    };

    setCategories([...categories, newCat]);
    setCategoryName("");
    setIsCategoryModalOpen(false);
    showToast(`Category "${newCat.name}" created successfully`);
  };

  const handleAddSubcategory = (e) => {
    e.preventDefault();
    if (!subcategoryName.trim() || !activeParentCategory) return;

    const newSub = {
      id: `${activeParentCategory.id}-${subcategoryName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      name: subcategoryName.trim(),
      count: 0,
    };

    setCategories(
      categories.map((c) => {
        if (c.id === activeParentCategory.id) {
          return {
            ...c,
            subcategories: [...(c.subcategories || []), newSub],
          };
        }
        return c;
      })
    );

    setSubcategoryName("");
    setIsSubcategoryModalOpen(false);
    showToast(`Subcategory "${newSub.name}" added to ${activeParentCategory.name}`);
  };

  const handleDeleteCategory = (id, name) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    setCategories(categories.filter((c) => c.id !== id));
    showToast(`Category "${name}" removed`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold border border-slate-700 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-950 flex items-center gap-2">
            <span>Categories & Subcategories</span>
            <span className="text-xs font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
              {categories.length} Categories
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize catalog instruments into sectors, laboratory categories, and specialized subcategories.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCategoryModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-black">
                    <FolderTree className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-950 uppercase tracking-tight">
                      {cat.name}
                    </h3>
                    <span className="text-[10.5px] text-slate-400 font-bold uppercase tracking-wider">
                      Slug: {cat.id}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-xs font-black bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full">
                    {cat.count} items
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Subcategories List */}
              <div className="pt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    Subcategories ({cat.subcategories?.length || 0})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveParentCategory(cat);
                      setIsSubcategoryModalOpen(true);
                    }}
                    className="text-[10px] font-black uppercase text-[#B38600] hover:text-black cursor-pointer"
                  >
                    + Add Subcategory
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.subcategories && cat.subcategories.length > 0 ? (
                    cat.subcategories.map((sub) => (
                      <span
                        key={sub.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] font-bold text-slate-700"
                      >
                        <span>{sub.name}</span>
                        <span className="text-[9px] text-slate-400">({sub.count})</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">
                      No subcategories created yet.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Category */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black uppercase text-slate-950">
                Create New Category
              </h3>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-slate-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Spectrum Analyzers"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FFC400]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-black uppercase hover:bg-black"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Subcategory */}
      {isSubcategoryModalOpen && activeParentCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black uppercase text-slate-950">
                  Add Subcategory
                </h3>
                <p className="text-[11px] text-slate-500">
                  Parent Category: <span className="font-bold text-slate-800">{activeParentCategory.name}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSubcategoryModalOpen(false)}
                className="text-slate-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubcategory} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                  Subcategory Name *
                </label>
                <input
                  type="text"
                  required
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  placeholder="e.g. Real-Time RF Analyzers"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FFC400]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubcategoryModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#FFC400] text-black font-black uppercase hover:bg-[#e6b000]"
                >
                  Add Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
