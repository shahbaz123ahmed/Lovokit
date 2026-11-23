"use client";

import React, { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  Building2,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
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
        <h1 className="text-2xl font-black uppercase tracking-tight text-slate-950 flex items-center gap-2">
          <span>B2B Quotations & Lab RFPs</span>
          <span className="text-xs font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
            {quotes.length} RFPs
          </span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Wholesale volume discount requests and integrated laboratory package inquiries received from institutions.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-extrabold border-b border-slate-200 text-[10.5px]">
              <tr>
                <th className="py-3.5 px-4">Contact & Company</th>
                <th className="py-3.5 px-4">Package / Items</th>
                <th className="py-3.5 px-4">Estimated Budget</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Loading quotation requests...
                  </td>
                </tr>
              ) : quotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No quotation requests received yet.
                  </td>
                </tr>
              ) : (
                quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-950 text-[13px]">
                        {q.fullName}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>{q.company || "Independent Buyer"}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{q.email}</span>
                        <span>•</span>
                        <span>{q.phone}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">
                        {q.packageType}
                      </span>
                      {q.notes && (
                        <span className="text-[11px] text-slate-500 line-clamp-1 italic max-w-xs mt-0.5">
                          &quot;{q.notes}&quot;
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 font-black text-slate-900">
                      {q.budget || "Custom Pricing"}
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className={`text-[10.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${
                          q.status === "PENDING"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : q.status === "IN_REVIEW"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : q.status === "QUOTED"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="IN_REVIEW">IN REVIEW</option>
                        <option value="QUOTED">QUOTED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(q.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveQuote(q)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#FFC400] text-slate-900 hover:text-black font-bold text-xs transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black uppercase text-slate-950">
                  RFP Details: {activeQuote.fullName}
                </h3>
                <span className="text-[11px] text-slate-400">
                  ID: {activeQuote.id}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveQuote(null)}
                className="text-slate-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-900">{activeQuote.company}</div>
                <div className="text-slate-600 mt-0.5">{activeQuote.email} • {activeQuote.phone}</div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                  Requested Package
                </span>
                <div className="font-bold text-slate-900 text-sm">
                  {activeQuote.packageType}
                </div>
              </div>

              {activeQuote.notes && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                    Client Requirements / Notes
                  </span>
                  <p className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-700 leading-relaxed font-medium">
                    {activeQuote.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`mailto:${activeQuote.email}?subject=Lovokit Quotation for ${activeQuote.packageType}`}
                className="px-4 py-2 rounded-xl bg-slate-950 text-white font-black uppercase tracking-wider hover:bg-black inline-block"
              >
                Send Quotation Email
              </a>
              <button
                type="button"
                onClick={() => setActiveQuote(null)}
                className="px-4 py-2 font-bold text-slate-600"
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
