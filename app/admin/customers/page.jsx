"use client";

import React, { useState } from "react";
import { Users, Search, Building2, Mail, Phone, ShoppingBag, Download } from "lucide-react";

export default function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    {
      id: "CUST-101",
      name: "Vikram Mehta",
      email: "vikram@tataauto.com",
      phone: "+91 98450 12345",
      company: "Tata Motors EV Division",
      gstin: "27AAACT2727Q1ZB",
      ordersCount: 5,
      totalSpent: "₹18,40,000",
      joined: "Jan 2026",
    },
    {
      id: "CUST-102",
      name: "Dr. Ananya Ray",
      email: "ananya.ray@iitb.ac.in",
      phone: "+91 94220 56789",
      company: "IIT Bombay Microelectronics",
      gstin: "27AAATI0001B1ZU",
      ordersCount: 3,
      totalSpent: "₹14,20,000",
      joined: "Feb 2026",
    },
    {
      id: "CUST-103",
      name: "Suresh Nambiar",
      email: "suresh.nambiar@bel.co.in",
      phone: "+91 98110 34567",
      company: "Bharat Electronics Limited",
      gstin: "29AAACB1100K1ZV",
      ordersCount: 2,
      totalSpent: "₹5,40,000",
      joined: "Mar 2026",
    },
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2.5">
            <span>Enterprise Customers</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E7E5DF] text-[#090A0C] font-black text-xs">
              {customers.length} Accounts
            </span>
          </h1>
          <p className="text-xs text-[#858585] mt-1">
            Registered B2B corporate buyers, educational institutes, and procurement managers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Exporting customers...")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E7E5DF] bg-[#FFFFFF] hover:bg-[#F7F6F1] text-[#090A0C] font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#858585]" />
          <span>Export Accounts</span>
        </button>
      </div>

      <div className="bg-[#FFFFFF] p-3.5 sm:p-4 rounded-2xl border border-[#E7E5DF] shadow-2xs">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#858585] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, company, or email..."
            className="w-full bg-[#F7F6F1] hover:bg-[#FFFFFF] focus:bg-[#FFFFFF] border border-[#E7E5DF] focus:border-[#090A0C] rounded-xl pl-10 pr-4 py-2 text-xs text-[#090A0C] font-medium focus:outline-none transition-all placeholder-[#858585]"
          />
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-4 px-5">Enterprise / Contact</th>
                <th className="py-4 px-4">GSTIN</th>
                <th className="py-4 px-4">Orders</th>
                <th className="py-4 px-4">Total Spent</th>
                <th className="py-4 px-4">Member Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#F7F6F1]/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-black text-[#090A0C] text-[13px]">{c.name}</div>
                    <div className="text-[11px] text-[#858585] flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-3 h-3 text-[#858585]" />
                      <span>{c.company}</span>
                    </div>
                    <div className="text-[10px] text-[#858585] font-mono mt-0.5">
                      {c.email} • {c.phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#090A0C]">
                    {c.gstin}
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#090A0C]">
                    {c.ordersCount} orders
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#090A0C] text-sm">
                    {c.totalSpent}
                  </td>
                  <td className="py-3.5 px-4 text-[#858585] text-[11px]">
                    {c.joined}
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
