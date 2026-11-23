"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Clock,
  ArrowUpDown,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "ORD-2026-9041",
      customer: "Vikram Mehta",
      company: "Tata Motors EV Division",
      date: "21 Nov 2026",
      itemsCount: 4,
      total: "₹4,85,000",
      payment: "PAID (NEFT)",
      fulfillment: "PROCESSING",
    },
    {
      id: "ORD-2026-9040",
      customer: "Dr. Ananya Ray",
      company: "IIT Bombay Microelectronics",
      date: "20 Nov 2026",
      itemsCount: 10,
      total: "₹9,50,000",
      payment: "PAID (PURCHASE ORDER)",
      fulfillment: "DISPATCHED",
    },
    {
      id: "ORD-2026-9039",
      customer: "Suresh Nambiar",
      company: "Bharat Electronics Ltd (BEL)",
      date: "19 Nov 2026",
      itemsCount: 2,
      total: "₹2,70,000",
      payment: "PENDING VERIFICATION",
      fulfillment: "ON HOLD",
    },
    {
      id: "ORD-2026-9038",
      customer: "Pooja Hegde",
      company: "VentureTech Labs",
      date: "18 Nov 2026",
      itemsCount: 1,
      total: "₹1,45,000",
      payment: "PAID (GATEWAY)",
      fulfillment: "DELIVERED",
    },
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || o.fulfillment.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2.5">
            <span>Orders & Invoices</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E7E5DF] text-[#090A0C] font-black text-xs">
              {orders.length} Orders
            </span>
          </h1>
          <p className="text-xs text-[#858585] mt-1">
            Enterprise procurement orders, tax invoices, and serialized dispatch records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Exporting Orders CSV...")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E7E5DF] bg-[#FFFFFF] hover:bg-[#F7F6F1] text-[#090A0C] font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#858585]" />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFFFFF] p-3.5 sm:p-4 rounded-2xl border border-[#E7E5DF] shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#858585] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order ID, customer, or enterprise..."
            className="w-full bg-[#F7F6F1] hover:bg-[#FFFFFF] focus:bg-[#FFFFFF] border border-[#E7E5DF] focus:border-[#090A0C] rounded-xl pl-10 pr-4 py-2 text-xs text-[#090A0C] font-medium focus:outline-none transition-all placeholder-[#858585]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto bg-[#F7F6F1] border border-[#E7E5DF] rounded-xl px-3 py-2 text-xs font-bold text-[#090A0C] focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="processing">Processing</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
            <option value="on hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-4 px-5">Order ID & Date</th>
                <th className="py-4 px-4">Client / Institution</th>
                <th className="py-4 px-4">Items</th>
                <th className="py-4 px-4">Total Value</th>
                <th className="py-4 px-4">Payment</th>
                <th className="py-4 px-4">Fulfillment</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-[#F7F6F1]/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="font-black text-[#090A0C] block text-[13px]">
                      {o.id}
                    </span>
                    <span className="text-[11px] text-[#858585]">{o.date}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#090A0C]">{o.customer}</div>
                    <div className="text-[11px] text-[#858585]">{o.company}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#090A0C]">
                    {o.itemsCount} units
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#090A0C] text-sm">
                    {o.total}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black bg-[#F7F6F1] border border-[#E7E5DF] text-[#090A0C]">
                      {o.payment}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${
                        o.fulfillment === "DELIVERED"
                          ? "bg-[#090A0C] text-[#FFFFFF] border-[#090A0C]"
                          : o.fulfillment === "DISPATCHED"
                          ? "bg-[#FFC400] text-[#090A0C] border-[#FFC400]"
                          : "bg-[#F7F6F1] text-[#090A0C] border-[#E7E5DF]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#090A0C]" />
                      <span>{o.fulfillment}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => alert(`Opening tax invoice for ${o.id}`)}
                        className="p-1.5 rounded-lg border border-[#E7E5DF] bg-[#FFFFFF] hover:bg-[#F7F6F1] text-[#090A0C] transition-colors cursor-pointer"
                        title="View Invoice"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
