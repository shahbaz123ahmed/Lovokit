"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Phone, Clock, Check, X } from "lucide-react";

export default function AdminContactPage() {
  const [inquiries, setInquiries] = useState([
    {
      id: "MSG-401",
      name: "Rameshwar Patel",
      email: "r.patel@adani.com",
      phone: "+91 97230 45678",
      subject: "Annual rate contract for 50x Digital Multimeters",
      message: "We need formal quotation and GST compliance docs for 50x True RMS Industrial DMMs for our Mundra port facility.",
      date: "21 Nov 2026",
      status: "NEW",
    },
    {
      id: "MSG-400",
      name: "Kavita Sundaram",
      email: "kavita.s@iitm.ac.in",
      phone: "+91 94440 98765",
      subject: "Lab installation training query",
      message: "Can Lovokit engineers provide on-campus demonstration of the XDS3302 oscilloscope software suite?",
      date: "20 Nov 2026",
      status: "REPLIED",
    },
  ]);

  const toggleStatus = (id) => {
    setInquiries(
      inquiries.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "NEW" ? "REPLIED" : "NEW" }
          : m
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#090A0C] flex items-center gap-2.5">
          <span>Contact Inquiries</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFC400] text-[#090A0C] font-black text-xs">
            {inquiries.filter((m) => m.status === "NEW").length} New
          </span>
        </h1>
        <p className="text-xs text-[#858585] mt-1">
          Direct inquiries and procurement correspondence received from the public contact portal.
        </p>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E7E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F1] text-[#858585] uppercase tracking-wider font-black border-b border-[#E7E5DF] text-[10.5px]">
              <tr>
                <th className="py-4 px-5">Sender</th>
                <th className="py-4 px-4">Subject</th>
                <th className="py-4 px-4">Message</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF] font-medium">
              {inquiries.map((m) => (
                <tr key={m.id} className="hover:bg-[#F7F6F1]/70 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="font-black text-[#090A0C] block text-[13px]">{m.name}</span>
                    <span className="text-[11px] text-[#858585]">{m.email}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#090A0C]">{m.subject}</td>
                  <td className="py-3.5 px-4 text-[#858585] max-w-sm line-clamp-2">{m.message}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black border ${
                        m.status === "NEW"
                          ? "bg-[#FFC400] text-[#090A0C] border-[#FFC400]"
                          : "bg-[#F7F6F1] text-[#858585] border-[#E7E5DF]"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#858585] text-[11px]">{m.date}</td>
                  <td className="py-3.5 px-5 text-right">
                    <a
                      href={`mailto:${m.email}?subject=Re: ${m.subject}`}
                      className="px-3 py-1.5 rounded-lg bg-[#090A0C] hover:bg-[#FFC400] text-[#FFFFFF] hover:text-[#090A0C] font-black text-xs uppercase tracking-wider transition-colors inline-block"
                    >
                      Reply
                    </a>
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
