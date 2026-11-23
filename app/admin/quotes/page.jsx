"use client";

import React, { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  Building2,
  Clock,
  X,
  Mail,
  Phone,
} from "lucide-react";

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuote, setActiveQuote] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("/api/quotes");
      const data = await res.json();
      if (data.success && data.quotes) {
        setQuotes(data.quotes);
      }
    } catch (err) {
      console.error("Failed to load quotes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setQuotes(
      quotes.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2">
          <span>B2B Quotations & Lab RFPs</span>
          <span className="text-xs font-black bg-[#FFC400] text-[#090A0C] px-2.5 py-0.5 rounded-full">
            {quotes.length} RFPs
          </span>
        </h1>
        <p className="text-xs text-[#858585] mt-0.5">
          Institutional wholesale inquiries and lab packages submitted by corporate clients.
        </p>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-3.5 px-5">Contact & Company</th>
                <th className="py-3.5 px-4">Package / Items</th>
                <th className="py-3.5 px-4">Estimated Budget</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#858585]">
                    Loading quotation requests...
                  </td>
                </tr>
              ) : quotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#858585]">
                    No quotation requests received yet.
                  </td>
                </tr>
              ) : (
                quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-[#F7F6F1]/70 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-[#090A0C] text-[13px]">
                        {q.fullName}
                      </div>
                      <div className="text-[11px] text-[#858585] flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3 h-3 text-[#858585]" />
                        <span>{q.company || "Independent Buyer"}</span>
                      </div>
                      <div className="text-[10px] text-[#858585] flex items-center gap-2 mt-0.5 font-mono">
                        <span>{q.email}</span>
                        <span>•</span>
                        <span>{q.phone}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#090A0C] block">
                        {q.packageType}
                      </span>
                      {q.notes && (
                        <span className="text-[11px] text-[#858585] line-clamp-1 italic max-w-xs mt-0.5">
                          &quot;{q.notes}&quot;
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-black text-[#090A0C]">
                      {q.budget || "Custom Pricing"}
                    </td>

                    {/* Status dropdown in Pure Black / Yellow / Off-White palette */}
                    <td className="py-3.5 px-4">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className={`text-[10.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${
                          q.status === "PENDING"
                            ? "bg-[#FFC400]/20 text-[#090A0C] border-[#FFC400]"
                            : q.status === "IN_REVIEW"
                            ? "bg-[#17191E] text-[#FFFFFF] border-[#17191E]"
                            : q.status === "QUOTED"
                            ? "bg-[#090A0C] text-[#FFC400] border-[#090A0C]"
                            : "bg-[#F7F6F1] text-[#858585] border-[#E7E5DF]"
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="IN_REVIEW">IN REVIEW</option>
                        <option value="QUOTED">QUOTED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-[#858585] text-[11px]">
                      {new Date(q.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveQuote(q)}
                        className="px-3 py-1.5 rounded-xl bg-[#F7F6F1] hover:bg-[#FFC400] text-[#090A0C] border border-[#E7E5DF] font-bold text-xs transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Detail Modal */}
      {activeQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-[#090A0C]/75 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FFFFFF] rounded-2xl p-6 shadow-2xl border border-[#E7E5DF] space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5DF]">
              <div>
                <h3 className="text-base font-black uppercase text-[#090A0C]">
                  RFP Details: {activeQuote.fullName}
                </h3>
                <span className="text-[11px] text-[#858585]">
                  ID: {activeQuote.id}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveQuote(null)}
                className="text-[#858585] hover:text-[#090A0C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-[#F7F6F1] p-3 rounded-xl border border-[#E7E5DF]">
                <div className="font-bold text-[#090A0C]">{activeQuote.company}</div>
                <div className="text-[#858585] mt-0.5">{activeQuote.email} • {activeQuote.phone}</div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#858585] block mb-1">
                  Requested Package
                </span>
                <div className="font-bold text-[#090A0C] text-sm">
                  {activeQuote.packageType}
                </div>
              </div>

              {activeQuote.notes && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#858585] block mb-1">
                    Client Requirements
                  </span>
                  <p className="bg-[#F7F6F1] p-3 rounded-xl border border-[#E7E5DF] text-[#090A0C] leading-relaxed font-medium">
                    {activeQuote.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#E7E5DF] flex items-center justify-between">
              <a
                href={`mailto:${activeQuote.email}?subject=Lovokit Quotation for ${activeQuote.packageType}`}
                className="px-4 py-2 rounded-xl bg-[#090A0C] hover:bg-[#FFC400] text-[#FFFFFF] hover:text-[#090A0C] font-black uppercase tracking-wider transition-colors inline-block"
              >
                Send Quotation Email
              </a>
              <button
                type="button"
                onClick={() => setActiveQuote(null)}
                className="px-4 py-2 font-bold text-[#858585] hover:text-[#090A0C]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
