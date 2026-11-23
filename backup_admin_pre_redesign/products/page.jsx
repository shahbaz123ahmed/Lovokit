"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  X,
  Check,
  AlertCircle,
  Eye,
  ArrowUpDown,
  Download,
  Star,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  FolderTree,
  Tag,
  Boxes,
  RotateCcw,
} from "lucide-react";
import { categoriesData, brandsData } from "@/data/products";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "instock" | "outofstock" | "featured"
  const [sortBy, setSortBy] = useState("default");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal State for Adding / Editing Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const [formData, setFormData] = useState({
    model: "",
    title: "",
    brand: "OWON",
    category: "oscilloscopes",
    categoryName: "Oscilloscopes",
    subcategory: "",
    price: "",
    originalPrice: "",
    inStock: true,
    stockQuantity: 15,
    featured: false,
    image: "/images/featured/owon-exact-transparent.png",
    description: "",
    specs: [
      { label: "Bandwidth", value: "200 MHz" },
      { label: "Channels", value: "2 Channels" },
      { label: "Sample Rate", value: "1 GSa/s" },
    ],
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtered & Sorted products list
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search term
        const matchesSearch =
          searchTerm === "" ||
          p.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand?.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter
        const matchesCategory =
          selectedCategory === "all" ||
          p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          p.categoryName?.toLowerCase() === selectedCategory.toLowerCase();

        // Brand filter
        const matchesBrand =
          selectedBrand === "all" ||
          p.brand?.toLowerCase() === selectedBrand.toLowerCase();

        // Status tab filter
        let matchesStatus = true;
        if (statusFilter === "instock") matchesStatus = p.inStock === true;
        if (statusFilter === "outofstock") matchesStatus = p.inStock === false;
        if (statusFilter === "featured") matchesStatus = p.featured === true;

        return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") {
          const pA = parseInt(String(a.price).replace(/[^0-9]/g, ""), 10) || 0;
          const pB = parseInt(String(b.price).replace(/[^0-9]/g, ""), 10) || 0;
          return pA - pB;
        }
        if (sortBy === "price-high") {
          const pA = parseInt(String(a.price).replace(/[^0-9]/g, ""), 10) || 0;
          const pB = parseInt(String(b.price).replace(/[^0-9]/g, ""), 10) || 0;
          return pB - pA;
        }
        if (sortBy === "model-asc") {
          return (a.model || "").localeCompare(b.model || "");
        }
        return 0;
      });
  }, [products, searchTerm, selectedCategory, selectedBrand, statusFilter, sortBy]);

  // Paginated slice
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedBrand, statusFilter, itemsPerPage]);

  // Selection Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add & Edit Handlers
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      model: "",
      title: "",
      brand: "OWON",
      category: "oscilloscopes",
      categoryName: "Oscilloscopes",
      subcategory: "",
      price: "",
      originalPrice: "",
      inStock: true,
      stockQuantity: 15,
      featured: false,
      image: "/images/featured/owon-exact-transparent.png",
      description: "",
      specs: [
        { label: "Bandwidth", value: "200 MHz" },
        { label: "Channels", value: "2 Channels" },
        { label: "Sample Rate", value: "1 GSa/s" },
      ],
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      model: product.model || "",
      title: product.title || "",
      brand: product.brand || "OWON",
      category: product.category || "oscilloscopes",
      categoryName: product.categoryName || "Oscilloscopes",
      subcategory: product.subcategory || "",
      price: product.price?.replace(/[^0-9]/g, "") || "",
      originalPrice: product.originalPrice?.replace(/[^0-9]/g, "") || "",
      inStock: product.inStock !== false,
      stockQuantity: product.stockQuantity || 15,
      featured: Boolean(product.featured),
      image: product.image || "",
      description: product.description || "",
      specs: product.specs?.length ? product.specs : [{ label: "Bandwidth", value: "" }],
    });
    setIsModalOpen(true);
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...formData.specs];
    updated[index][field] = value;
    setFormData({ ...formData, specs: updated });
  };

  const handleAddSpecRow = () => {
    setFormData({
      ...formData,
      specs: [...formData.specs, { label: "", value: "" }],
    });
  };

  const handleRemoveSpecRow = (index) => {
    const updated = formData.specs.filter((_, i) => i !== index);
    setFormData({ ...formData, specs: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const payload = {
        ...formData,
        price: `₹${Number(formData.price || 0).toLocaleString("en-IN")}`,
        originalPrice: formData.originalPrice
          ? `₹${Number(formData.originalPrice).toLocaleString("en-IN")}`
          : null,
      };

      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success) {
          setProducts(
            products.map((p) =>
              p.id === editingProduct.id ? { ...p, ...payload } : p
            )
          );
          showToast(`Instrument ${payload.model} updated successfully`);
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success && result.product) {
          setProducts([result.product, ...products]);
          showToast(`Instrument ${payload.model} published to catalog`);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      alert("Error saving product: " + err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id, model) => {
    if (!confirm(`Are you sure you want to delete instrument ${model}?`)) return;

    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
      showToast(`Instrument ${model} deleted from catalog`);
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  // Export CSV mock
  const handleExportCSV = () => {
    const rows = [
      ["Model", "Brand", "Category", "Price", "Stock", "Featured"],
      ...filteredProducts.map((p) => [
        p.model,
        p.brand,
        p.categoryName || p.category,
        p.price,
        p.inStock ? "In Stock" : "Out of Stock",
        p.featured ? "Yes" : "No",
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `lovokit_catalog_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV catalog exported successfully");
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-black border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toast}</span>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 1. TOP HEADER & QUICK ACTION BAR                     */}
      {/* ---------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950">
              Product Catalog
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-black text-xs">
              {products.length} Instruments
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Live catalog control center. Configure laboratory testbenches, technical parameters, serialized warranty pricing, and inventory.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all shadow-2xs cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-[#FFC400] text-white hover:text-black font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. SEGMENTED STATUS TABS                             */}
      {/* ---------------------------------------------------- */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto no-scrollbar">
        {[
          { id: "all", label: "All Instruments", count: products.length },
          {
            id: "instock",
            label: "In Stock",
            count: products.filter((p) => p.inStock).length,
          },
          {
            id: "outofstock",
            label: "Out of Stock",
            count: products.filter((p) => !p.inStock).length,
          },
          {
            id: "featured",
            label: "Best Sellers",
            count: products.filter((p) => p.featured).length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatusFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              statusFilter === tab.id
                ? "bg-slate-950 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                statusFilter === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-slate-200/80 text-slate-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. SEARCH & ADVANCED FILTER TOOLBAR                  */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by model, instrument name, or brand..."
            className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#FFC400] rounded-xl pl-10 pr-9 py-2 text-xs text-slate-900 font-medium focus:outline-none transition-all placeholder-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="relative inline-flex items-center">
            <FolderTree className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 hover:bg-white border border-slate-200 focus:border-[#FFC400] rounded-xl pl-8 pr-4 py-2 text-xs text-slate-800 font-bold focus:outline-none cursor-pointer transition-colors"
            >
              <option value="all">All Categories</option>
              {categoriesData
                .filter((c) => c.id !== "all")
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div className="relative inline-flex items-center">
            <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-slate-50 hover:bg-white border border-slate-200 focus:border-[#FFC400] rounded-xl pl-8 pr-4 py-2 text-xs text-slate-800 font-bold focus:outline-none cursor-pointer transition-colors"
            >
              <option value="all">All Brands</option>
              {brandsData
                .filter((b) => b !== "All Brands")
                .map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="relative inline-flex items-center">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 hover:bg-white border border-slate-200 focus:border-[#FFC400] rounded-xl pl-8 pr-4 py-2 text-xs text-slate-800 font-bold focus:outline-none cursor-pointer transition-colors"
            >
              <option value="default">Sort: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="model-asc">Model: A to Z</option>
            </select>
          </div>

          {/* Reset Filters button (if any active) */}
          {(searchTerm || selectedCategory !== "all" || selectedBrand !== "all" || sortBy !== "default") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedBrand("all");
                setSortBy("default");
              }}
              className="p-2 rounded-xl text-slate-500 hover:text-black hover:bg-slate-100 transition-colors"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. REFINED DATA TABLE                                */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            {/* Table Header */}
            <thead className="bg-[#F8FAFC] text-slate-600 uppercase tracking-wider font-black border-b border-slate-200/90 text-[10.5px]">
              <tr>
                <th className="py-4 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      paginatedProducts.length > 0 &&
                      paginatedProducts.every((p) => selectedIds.includes(p.id))
                    }
                    onChange={handleSelectAll}
                    className="rounded text-slate-900 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-4 px-4">Instrument / Model</th>
                <th className="py-4 px-4">Brand</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price (Excl. GST)</th>
                <th className="py-4 px-4">Inventory Status</th>
                <th className="py-4 px-4 text-center">Featured</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-7 h-7 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-bold text-slate-600">
                        Synchronizing laboratory catalog...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Boxes className="w-10 h-10 text-slate-300" />
                      <span className="text-sm font-bold text-slate-700">
                        No instruments found
                      </span>
                      <span className="text-xs text-slate-400">
                        Try clearing search terms or selected filters.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  return (
                    <tr
                      key={p.id}
                      className={`group hover:bg-slate-50/80 transition-colors ${
                        isSelected ? "bg-amber-50/40" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(p.id)}
                          className="rounded text-slate-900 focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Model & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-1.5 shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.image}
                              alt={p.model}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="font-black text-slate-950 block text-[13.5px] group-hover:text-black transition-colors">
                              {p.model}
                            </span>
                            <span className="text-slate-500 text-xs line-clamp-1 max-w-xs font-medium">
                              {p.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ID: {p.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Brand Pill */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-900 font-black text-[10.5px] tracking-wide border border-slate-200/60">
                          {p.brand}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="text-slate-700 font-bold capitalize text-xs">
                          {p.categoryName || p.category}
                        </span>
                        {p.subcategory && (
                          <span className="block text-[10px] text-slate-400 font-medium">
                            {p.subcategory}
                          </span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <div className="font-black text-slate-950 text-sm">
                          {p.price}
                        </div>
                        {p.originalPrice ? (
                          <div className="text-[10.5px] text-slate-400 line-through font-medium">
                            {p.originalPrice}
                          </div>
                        ) : (
                          <div className="text-[10px] text-emerald-600 font-bold">
                            Wholesale Tier
                          </div>
                        )}
                      </td>

                      {/* Inventory Status */}
                      <td className="py-3.5 px-4">
                        {p.inStock ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 font-bold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>In Stock ({p.stockQuantity || 15})</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-700 font-bold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <span>Out of Stock</span>
                          </span>
                        )}
                      </td>

                      {/* Featured */}
                      <td className="py-3.5 px-4 text-center">
                        {p.featured ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black border border-amber-200">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span>YES</span>
                          </span>
                        ) : (
                          <span className="text-slate-300 text-xs font-bold">—</span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200/80 rounded-xl p-1 shadow-2xs">
                          <Link
                            href={`/products/${p.id}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-black hover:bg-white transition-all"
                            title="Preview on Live Store"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-white transition-all cursor-pointer"
                            title="Edit Instrument"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id, p.model)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white transition-all cursor-pointer"
                            title="Delete Instrument"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 5. PAGINATION & FOOTER CONTROLS                      */}
        {/* ---------------------------------------------------- */}
        <div className="p-4 bg-[#F8FAFC] border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 font-medium">
            Showing{" "}
            <span className="font-black text-slate-900">
              {filteredProducts.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-black text-slate-900">
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
            </span>{" "}
            of{" "}
            <span className="font-black text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            instruments
          </div>

          <div className="flex items-center gap-3">
            {/* Items Per Page */}
            <div className="flex items-center gap-1.5 text-slate-500">
              <span>Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Page Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-slate-950 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 6. ELEVATED ADD / EDIT PRODUCT MODAL                 */}
      {/* ---------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFC400] text-black font-black flex items-center justify-center">
                  <Package className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 uppercase tracking-tight">
                    {editingProduct
                      ? `Edit Instrument: ${editingProduct.model}`
                      : "Add New Laboratory Instrument"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {editingProduct
                      ? "Update technical specifications, wholesale price, and inventory count."
                      : "Publish a certified instrument directly to the Lovokit wholesale catalog."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Section 1: Core Identity */}
              <div className="space-y-3">
                <div className="text-[10.5px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#FFC400]" />
                  <span>1. Instrument Identity</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                      Model Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={(e) =>
                        setFormData({ ...formData, model: e.target.value })
                      }
                      placeholder="e.g. XDS3302"
                      className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/20 rounded-xl px-3 py-2 text-xs font-black text-slate-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                      Full Product Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="e.g. 14-bit High-Resolution Digital Storage Oscilloscope"
                      className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/20 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                      Brand Partner *
                    </label>
                    <select
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData({ ...formData, brand: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                    >
                      {brandsData
                        .filter((b) => b !== "All Brands")
                        .map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        const selected = categoriesData.find(
                          (c) => c.id === e.target.value
                        );
                        setFormData({
                          ...formData,
                          category: e.target.value,
                          categoryName: selected
                            ? selected.name
                            : e.target.value,
                        });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                    >
                      {categoriesData
                        .filter((c) => c.id !== "all")
                        .map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      value={formData.subcategory}
                      onChange={(e) =>
                        setFormData({ ...formData, subcategory: e.target.value })
                      }
                      placeholder="e.g. Benchtop Scopes"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Inventory */}
              <div className="space-y-3">
                <div className="text-[10.5px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5 text-[#FFC400]" />
                  <span>2. Pricing & Warehouse Inventory</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                      Wholesale Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="e.g. 145000"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#FFC400] rounded-xl px-3 py-2 text-xs font-black text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                      Original / MRP (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalPrice: e.target.value,
                        })
                      }
                      placeholder="e.g. 175000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                      Units In Warehouse
                    </label>
                    <input
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stockQuantity: parseInt(e.target.value, 10),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) =>
                        setFormData({ ...formData, inStock: e.target.checked })
                      }
                      className="rounded text-slate-950 focus:ring-0"
                    />
                    <span className="font-bold text-slate-800 text-xs">
                      Available for Immediate Dispatch (In Stock)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="rounded text-slate-950 focus:ring-0"
                    />
                    <span className="font-bold text-slate-800 text-xs">
                      Feature on Homepage & Best Sellers
                    </span>
                  </label>
                </div>
              </div>

              {/* Section 3: Technical Parameters */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                  <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#FFC400]" />
                    <span>3. Technical Specifications</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleAddSpecRow}
                    className="text-[10.5px] font-black uppercase tracking-wider text-[#B38600] hover:text-black cursor-pointer"
                  >
                    + Add Parameter
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) =>
                          handleSpecChange(i, "label", e.target.value)
                        }
                        placeholder="Label (e.g. Bandwidth)"
                        className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#FFC400]"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) =>
                          handleSpecChange(i, "value", e.target.value)
                        }
                        placeholder="Value (e.g. 300 MHz)"
                        className="w-1/2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#FFC400]"
                      />
                      {formData.specs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecRow(i)}
                          className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Image & Description */}
              <div className="space-y-3">
                <div className="text-[10.5px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                  4. Media & Overview
                </div>

                <div>
                  <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    Product Image (Cloudinary URL or /images/ path) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="/images/featured/owon-exact-transparent.png"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-black uppercase tracking-wider text-slate-700 mb-1">
                    Laboratory Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Comprehensive details regarding testing parameters, compliance, and warranty..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-black text-white hover:text-[#FFC400] font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {formSubmitting
                    ? "Saving..."
                    : editingProduct
                    ? "Update Instrument"
                    : "Publish to Catalog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
