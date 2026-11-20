"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  Building2,
  MessageSquare,
  FileText,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Headphones,
  Truck,
  Wrench,
  Award,
  ExternalLink,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// =============================================================================
// FAQ DATA
// =============================================================================
const contactFaqs = [
  {
    q: "How fast can our procurement team receive an official GST quote?",
    a: "Official corporate and institutional quotations (including HSN codes, GST breakdown, and delivery lead times) are dispatched within 2 to 4 business hours via email and WhatsApp.",
  },
  {
    q: "Do you supply instruments with NABL traceable calibration certificates?",
    a: "Yes. All precision bench oscilloscopes, DC power supplies, arbitrary waveform generators, and digital multimeters can be bundled with ISO/IEC 17025 accredited NABL calibration certificates.",
  },
  {
    q: "Can our engineers request an on-site equipment demonstration?",
    a: "Yes, our application engineers conduct on-site demonstration visits across Pune, Mumbai, Bangalore, Delhi NCR, Hyderabad, Chennai, and Ahmedabad for laboratory bench setups.",
  },
  {
    q: "Do you assist with institutional government tenders and GeM procurement?",
    a: "Yes. Our institutional tender team provides comprehensive specification compliance sheets, proprietary certificates, and vendor authorization documentation.",
  },
];

export default function ContactPage() {
  // Form Type State
  const [inquiryType, setInquiryType] = useState("b2b-quote");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Form Field State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    sector: "Automotive & EV",
    requirement: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      sector: "Automotive & EV",
      requirement: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* ===================================================================== */}
      {/* 2. COMPACT CONTACT HERO BANNER (MATCHING HOMEPAGE DESIGN)             */}
      {/* ===================================================================== */}
      <section className="relative w-full overflow-hidden bg-white flex items-center border-b border-slate-100 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] py-8 sm:py-10 lg:py-12 select-none group">
        {/* Full-Width Background Studio Banner */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <Image
            src="/images/3slide.webp"
            alt="LOVOKIT Contact Desk - Have a Requirement? Let's Talk Solutions."
            fill
            priority={true}
            loading="eager"
            unoptimized
            sizes="100vw"
            className="object-cover object-right select-none opacity-95"
          />
        </div>

        {/* Hero Content Container */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="max-w-md sm:max-w-xl lg:max-w-2xl flex flex-col justify-center space-y-3 sm:space-y-3.5 lg:space-y-4 text-left">
            {/* Top Yellow Pill Badge */}
            <div className="flex items-center animate-hero-badge">
              <div className="inline-flex items-center gap-2 bg-[#FFC400] text-black text-[11px] font-black tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="w-4 h-4 rounded-full bg-black/15 flex items-center justify-center shrink-0">
                  <Phone className="w-2.5 h-2.5 stroke-[3] text-black" />
                </span>
                <span>DIRECT PROCUREMENT &amp; TECHNICAL DESK</span>
              </div>
            </div>

            {/* Heading in EXACTLY 2 Lines */}
            <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] lg:text-[2.6rem] xl:text-[2.85rem] font-black tracking-tight text-slate-950 leading-[1.12]">
              <span className="block sm:whitespace-nowrap animate-hero-heading-1">
                Have a Requirement?
              </span>
              <span className="block sm:whitespace-nowrap mt-1.5 sm:mt-2 text-[#FFB800] drop-shadow-xs animate-hero-heading-2">
                Let’s Talk Solutions.
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-600 font-medium leading-relaxed max-w-md sm:max-w-lg pt-0.5 animate-hero-desc">
              Connect directly with our instrument specialists, request custom
              laboratory testbench quotations, or schedule on-site demonstrations
              across India.
            </p>

            {/* Quick Action Hotline Strip */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2 animate-hero-actions">
              <a
                href="tel:+919747745544"
                className="inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm tracking-wide px-6 sm:px-7 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 hover:-translate-y-0.5 cursor-pointer"
              >
                <Phone className="w-4 h-4 stroke-[2.5]" />
                <span>Call Sales: +91 97477 45544</span>
              </a>

              <a
                href="#inquiry-form"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide px-6 sm:px-7 py-3 rounded-full border border-slate-900 shadow-xs transition-all duration-200 active:scale-95 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Submit RFP Inquiry ↓</span>
              </a>
            </div>

            {/* Trust Badges Strip below buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-1.5 sm:pt-2.5 text-xs font-bold text-slate-800 animate-hero-trust">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FFB800]" />
                <span>&lt; 4-Hour Response SLA</span>
              </div>

              <div className="h-3.5 w-[1px] bg-slate-300/80" />

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
                <span>NABL 17025 Traceable</span>
              </div>

              <div className="h-3.5 w-[1px] bg-slate-300/80" />

              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#FFC400]" />
                <span>Pune Depot Stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. CORE INTERACTIVE CONTACT & INQUIRY CENTER                          */}
      {/* ===================================================================== */}
      <section id="inquiry-form" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ================================================================= */}
          {/* LEFT COLUMN: Corporate Channels & Office Directory (5 Cols)      */}
          {/* ================================================================= */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-black tracking-wider uppercase mb-3">
                <Building2 className="w-3.5 h-3.5 text-slate-900" />
                <span>DIRECT CORPORATE DESK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                REACH OUR SPECIALIZED{" "}
                <span className="text-[#FFB800]">DEPARTMENTS.</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect directly with the appropriate division for priority
                pricing, tender drafting, calibration verification, or on-site trials.
              </p>
            </div>

            {/* Channel Cards */}
            <div className="space-y-4">
              {/* Channel 1: Sales & Tenders */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#FFC400] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFC400] text-black flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      B2B PROCUREMENT &amp; TENDERS
                    </div>
                    <div className="text-sm font-black text-slate-950 mt-0.5">
                      National Sales Division
                    </div>
                    <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                      <div>
                        Phone:{" "}
                        <a
                          href="tel:+919747745544"
                          className="font-bold text-slate-900 hover:text-amber-600"
                        >
                          +91 97477 45544
                        </a>
                      </div>
                      <div>
                        Email:{" "}
                        <a
                          href="mailto:sales@lovokit.com"
                          className="font-bold text-slate-900 hover:text-amber-600"
                        >
                          sales@lovokit.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Channel 2: Technical & Calibration */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#FFC400] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 text-[#FFC400] flex items-center justify-center shrink-0 shadow-xs">
                    <Wrench className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      ENGINEERING &amp; RMA SERVICE
                    </div>
                    <div className="text-sm font-black text-slate-950 mt-0.5">
                      Technical Application Desk
                    </div>
                    <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                      <div>
                        Desk:{" "}
                        <a
                          href="tel:+919823045812"
                          className="font-bold text-slate-900 hover:text-amber-600"
                        >
                          +91 98230 45812
                        </a>
                      </div>
                      <div>
                        Email:{" "}
                        <a
                          href="mailto:support@lovokit.com"
                          className="font-bold text-slate-900 hover:text-amber-600"
                        >
                          support@lovokit.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Channel 3: Pune Distribution Depot */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#FFC400] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      CENTRAL LOGISTICS HUB
                    </div>
                    <div className="text-sm font-black text-slate-950 mt-0.5">
                      Pune Technology &amp; Calibration Depot
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Plot 48, Electronics Manufacturing Zone, Bhosari MIDC, Pune,
                      Maharashtra 411026, India.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card with Live Indicator */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0F141F] text-white flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <div>
                  <div className="text-xs font-black">Depot Desk Active Now</div>
                  <div className="text-[11px] text-slate-400">
                    Mon – Sat: 9:00 AM – 7:30 PM IST
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/919747745544"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#FFC400] hover:bg-[#e6b000] text-black text-[11px] font-black uppercase tracking-wider shrink-0 transition-colors"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Interactive High-End RFP & Inquiry Form (7 Cols)   */}
          {/* ================================================================= */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] bg-white border border-slate-200 shadow-xl p-6 sm:p-10 relative overflow-hidden">
              {/* Form Top Header */}
              <div className="border-b border-slate-100 pb-6 mb-6">
                <div className="text-[10px] font-black uppercase tracking-wider text-amber-600 block mb-1">
                  OFFICIAL PROCUREMENT FORM
                </div>
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">
                  Submit Instrument Quotation Request
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your lab or project parameters. We will prepare an
                  official GST quotation with datasheet attachments.
                </p>

                {/* Inquiry Type Selector Pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { id: "b2b-quote", label: "B2B & Bulk Quote" },
                    { id: "lab-setup", label: "Turnkey Lab Setup" },
                    { id: "calibration", label: "Calibration / Service" },
                    { id: "general", label: "Technical Inquiry" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setInquiryType(t.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        inquiryType === t.id
                          ? "bg-slate-950 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {formSubmitted ? (
                /* Interactive Success Card */
                <div className="py-10 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-950">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                    Ticket Reference:{" "}
                    <span className="font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      LOVO-TKT-2026-9814
                    </span>
                    . An instrument engineer from our Pune Logistics Hub will
                    dispatch your official quotation within 4 hours.
                  </p>

                  <div className="mt-8 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full bg-slate-950 hover:bg-[#FFC400] text-white hover:text-black text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Inquiry Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Vikram Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400] bg-slate-50/50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                        Corporate / Academic Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="vikram@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400] bg-slate-50/50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98000 00000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400] bg-slate-50/50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                        Company / University Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="e.g. Tata Motors / IIT Pune"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400] bg-slate-50/50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                      Industry Sector / Application
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) =>
                        setFormData({ ...formData, sector: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#FFC400] bg-slate-50/50 focus:bg-white"
                    >
                      <option value="Automotive & EV">Automotive & EV Powertrain</option>
                      <option value="Electronics Manufacturing">Electronics Manufacturing / EMS</option>
                      <option value="Academic Labs">Academic & Higher Education R&D</option>
                      <option value="Telecom & 5G">Telecommunications & 5G RF</option>
                      <option value="Renewable Energy">Solar / Renewable Energy</option>
                      <option value="Aerospace & Defense">Aerospace & Defense</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                      Requirements / Target Specifications *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.requirement}
                      onChange={(e) =>
                        setFormData({ ...formData, requirement: e.target.value })
                      }
                      placeholder="Specify required bandwidth, number of channels, tender deadlines, or specific models like OWON XDS3302, SIGLENT SPD3303X-E..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400] bg-slate-50/50 focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>Send Inquiry to Pune Factory Desk</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Confidential B2B Pricing • Direct OEM Rates</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. NATIONWIDE SERVICE GUARANTEES STRIP                                */}
      {/* ===================================================================== */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-sm font-black text-slate-950">4-Hour SLA</div>
              <div className="text-xs text-slate-500 mt-0.5">
                Rapid quote &amp; technical response
              </div>
            </div>

            <div className="p-4 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center mx-auto mb-2">
                <Award className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-sm font-black text-slate-950">NABL Traceable</div>
              <div className="text-xs text-slate-500 mt-0.5">
                ISO/IEC 17025 accredited records
              </div>
            </div>

            <div className="p-4 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
                <Truck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-sm font-black text-slate-950">Pune Central Depot</div>
              <div className="text-xs text-slate-500 mt-0.5">
                Same-day shipping across India
              </div>
            </div>

            <div className="p-4 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center mx-auto mb-2">
                <Wrench className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-sm font-black text-slate-950">Field Commissioning</div>
              <div className="text-xs text-slate-500 mt-0.5">
                On-site engineering deployment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. FREQUENTLY ASKED QUESTIONS ACCORDION                              */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-black tracking-wider uppercase mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-slate-900" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            PROCUREMENT &amp; SUPPORT FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {contactFaqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isExpanded ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-black text-sm text-slate-900 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-[#FFC400]" : "text-slate-400"
                    }`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. GLOBAL FOOTER                                                      */}
      {/* ===================================================================== */}
      <Footer />
    </div>
  );
}
