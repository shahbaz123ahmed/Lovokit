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
  Star,
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Form Field State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiry: "",
  });

  // Wholesale Digest Newsletter State
  const [digestEmail, setDigestEmail] = useState("");
  const [digestSubscribed, setDigestSubscribed] = useState(false);

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
      subject: "",
      inquiry: "",
    });
  };

  const handleDigestSubscribe = (e) => {
    e.preventDefault();
    setDigestSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* ===================================================================== */}
      {/* 2. COMPACT CONTACT HERO BANNER (MATCHING HOMEPAGE DESIGN)             */}
      {/* ===================================================================== */}
      <section className="relative w-full overflow-hidden bg-white flex items-center border-b border-slate-100 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] py-8 sm:py-10 lg:py-12 group">
        {/* Full-Width Background Studio Banner */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <Image
            src="/images/contact.png"
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
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 select-text">
          <div className="max-w-md sm:max-w-xl lg:max-w-2xl flex flex-col justify-center space-y-3 sm:space-y-3.5 lg:space-y-4 text-left select-text">
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
              <span className="block sm:whitespace-nowrap mt-1 sm:mt-1.5 text-[#FFB800] drop-shadow-xs animate-hero-heading-2">
                Let&apos;s Talk Solutions.
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-600 font-medium leading-relaxed max-w-md sm:max-w-lg pt-0.5 animate-hero-desc">
              Connect directly with our instrument specialists, request custom
              laboratory testbench quotations, or schedule on-site demonstrations
              across India.
            </p>



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
          {/* LEFT COLUMN: Direct Contact Channels (5 Cols)                    */}
          {/* ================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-black tracking-wider uppercase mb-2">
                <Building2 className="w-3.5 h-3.5 text-slate-900" />
                <span>ENTERPRISE HEADQUARTERS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Get In Touch With Our Application Team
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Reach out for direct wholesale supply, OEM distribution
                agreements, institutional tenders, or NABL calibration
                scheduling.
              </p>
            </div>

            {/* Direct Department Channels */}
            <div className="space-y-4">
              {/* Channel 1: Commercial Sales */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#FFC400] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFC400] text-black flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      COMMERCIAL &amp; B2B PROCUREMENT
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
                          href="mailto:sales@lovosis.in"
                          className="font-bold text-slate-900 hover:text-amber-600"
                        >
                          sales@lovosis.in
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

              {/* Channel 3: Registered Corporate Office */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#FFC400] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      REGISTERED CORPORATE HEADQUARTERS
                    </div>
                    <div className="text-sm font-black text-slate-950 mt-0.5">
                      Lovokit / Lovosis Technology Pvt. Ltd.
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      3rd Floor, Swathi building, 4-72/2, Main Road, opp. singapura Garden, Lakshmipura, Abbigere, Bengaluru, Karnataka 560090
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card with Live Indicator */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0F141F] text-white flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <div>
                  <div className="text-xs font-black">Headquarters Desk Active Now</div>
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
          {/* RIGHT COLUMN: Inquiry Form Box                                    */}
          {/* ================================================================= */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10 relative">
              {/* Form Top Header */}
              <div className="border-b border-slate-200/80 pb-4 mb-6">
                <h3 className="text-xs sm:text-sm font-black tracking-wider uppercase text-slate-900">
                  INQUIRE BULK PRICING / CUSTOM QUOTE
                </h3>
              </div>

              {formSubmitted ? (
                /* Interactive Success Card */
                <div className="py-10 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
                    <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <h4 className="text-xl font-black text-slate-950">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-900">{formData.name || "Customer"}</span>. Your inquiry has been logged. Our representative will contact you at <span className="font-bold text-slate-900">{formData.email}</span> shortly.
                  </p>

                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-[#090A0C] hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Inquiry Form */
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Aniket Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. aniket@enterprise.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. +91 9876543210"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                        SUBJECT
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        placeholder="e.g. Volume discount for 50 Wrench units"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Detailed Inquiry */}
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1.5">
                      DETAILED INQUIRY *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.inquiry}
                      onChange={(e) =>
                        setFormData({ ...formData, inquiry: e.target.value })
                      }
                      placeholder="Specify brand name, model numbers, part codes, and estimated delivery dates..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors resize-none"
                    />
                  </div>

                  {/* Row 4: Submit Button (Right Aligned) */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-xl bg-[#090A0C] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-98"
                    >
                      <span>SEND INQUIRY</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. GOOGLE MAP - LOVOSIS HEADQUARTERS BENGALURU                        */}
      {/* ===================================================================== */}
      <section className="w-full bg-slate-100 border-t border-slate-200/80 relative">
        <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[480px]">
          {/* Interactive Google Map iframe */}
          <iframe
            title="Lovosis Technology Private Limited Location"
            src="https://maps.google.com/maps?q=Swathi+building,+Main+Road,+opp.+singapura+Garden,+Lakshmipura,+Abbigere,+Bengaluru,+Karnataka+560090&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[0.08] contrast-[1.05]"
          />

          {/* Floating Location Card Overlay (Matching Reference Screenshot) */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-10 max-w-[310px] sm:max-w-xs bg-white rounded-xl shadow-xl border border-slate-200/90 p-4 sm:p-5 select-none pointer-events-auto">
            <h4 className="text-xs sm:text-[13px] font-black text-slate-900 leading-tight">
              Lovosis Technology Private limited
            </h4>
            <p className="text-[11px] text-slate-600 mt-1.5 leading-snug font-medium">
              3rd Floor, Swathi building, 4-72/2, Main Road, opp. singapura Garden, Lakshmipura, Abbigere, Bengaluru, Karnataka 560090
            </p>

            <div className="flex items-center gap-1.5 mt-2.5 text-xs">
              <span className="font-black text-slate-900">4.9</span>
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-medium">(15)</span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
              <a
                href="https://maps.google.com/?q=Swathi+building,+Main+Road,+opp.+singapura+Garden,+Lakshmipura,+Abbigere,+Bengaluru,+Karnataka+560090"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-2xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. SUBSCRIBE TO LOVOKIT WHOLESALE DIGEST (BLACK & YELLOW THEME)       */}
      {/* ===================================================================== */}
      <section className="relative w-full bg-[#0B0D13] text-white py-16 sm:py-20 border-t border-white/[0.08] overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFC400] to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Circular Mail Icon with red/amber ring */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-red-500/40 text-red-500 mb-6 shadow-inner">
            <Mail className="w-6 h-6 stroke-[2]" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-3 uppercase">
            SUBSCRIBE TO LOVOKIT{" "}
            <span className="text-[#FFC400]">WHOLESALE DIGEST</span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Receive priority updates on new tool arrivals, clearance events, and OSHA compliance documents.
          </p>

          {/* Newsletter Form */}
          {digestSubscribed ? (
            <div className="bg-[#FFC400]/10 border border-[#FFC400]/40 rounded-xl p-4 max-w-md mx-auto flex items-center justify-center gap-2 text-[#FFC400] text-xs font-black uppercase tracking-wider animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#FFC400]" />
              <span>Thank you! You are subscribed to Lovokit Wholesale Digest.</span>
            </div>
          ) : (
            <form
              onSubmit={handleDigestSubscribe}
              className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-xl mx-auto"
            >
              <input
                type="email"
                required
                value={digestEmail}
                onChange={(e) => setDigestEmail(e.target.value)}
                placeholder="Enter corporate or business email..."
                className="w-full sm:flex-1 bg-[#141721] border border-white/10 rounded-full sm:rounded-l-full sm:rounded-r-none px-5 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC400] transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#E6B000] text-black font-black text-xs uppercase tracking-wider px-8 py-3 rounded-full sm:rounded-r-full sm:rounded-l-none transition-all shadow-md cursor-pointer shrink-0"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>
          )}

          {/* Trust Strip Footer */}
          <div className="mt-8 text-[10.5px] font-black uppercase tracking-wider text-gray-500">
            <span>NO SPAM</span>
            <span className="mx-2.5 text-gray-700">|</span>
            <span>UNSUBSCRIBE ANYTIME</span>
            <span className="mx-2.5 text-gray-700">|</span>
            <span>SECURE DATA STORAGE</span>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. NATIONWIDE SERVICE GUARANTEES STRIP                                */}
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
      {/* 7. FREQUENTLY ASKED QUESTIONS ACCORDION                              */}
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
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#FFC400]" : "text-slate-400"
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
      {/* 8. GLOBAL FOOTER                                                      */}
      {/* ===================================================================== */}
      <Footer />
    </div>
  );
}
