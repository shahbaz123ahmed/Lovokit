"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
  Share2,
  MessageCircle,
  Send,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const catalogLinks = [
    { name: "Digital Oscilloscope", brand: "LOVOSIS", href: "/products?search=Oscilloscope" },
    { name: "Digital Oscilloscope", brand: "MATRIX", href: "/products?search=Matrix" },
    { name: "Digital Oscilloscopes", brand: "OWON", href: "/products?search=OWON" },
    { name: "Power Meter", brand: "MATRIX", href: "/products?search=Power+Meter" },
    { name: "Power Meter", brand: "OWON", href: "/products?search=Power+Meter" },
    { name: "DC Power Supply", brand: "MATRIX", href: "/products?search=Power+Supply" },
    { name: "Power Supplies", brand: "OWON", href: "/products?search=Power+Supply" },
    { name: "Digital Multimeter", brand: "MATRIX", href: "/products?search=Multimeter" },
  ];

  const supportLinks = [
    { name: "Customer Service", href: "/contact" },
    { name: "Frequently Asked Qs", href: "/contact#faqs" },
    { name: "About Company", href: "/industrial-hub#about" },
    { name: "Contact Locations", href: "/contact" },
    { name: "Track Cargo Shipment", href: "/cart" },
  ];

  const legalLinks = [
    { name: "Shipping & Cargo Policy", href: "/contact" },
    { name: "Returns & Refunds", href: "/contact" },
    { name: "Terms of Service", href: "/contact" },
    { name: "Privacy Policy", href: "/contact" },
  ];

  const paymentMethods = ["UPI", "NETBANK", "VISA/MC", "CARDS"];

  return (
    <footer
      id="footer"
      aria-label="Site Footer"
      className="bg-[#090A0C] border-t border-[#17191E] text-[#858585] pt-14 sm:pt-16 pb-8 relative select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Column 1 — Brand, Description, Socials & Registered Address (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <Link href="/" className="inline-block" aria-label="LOVOKIT Home">
              <Logo />
            </Link>

            <p className="text-xs sm:text-[13px] text-[#858585] leading-relaxed max-w-md font-normal">
              Lovokit is India&apos;s leading B2B &amp; B2C enterprise marketplace for high-performance power tools, safety gear, electrical panels, and manufacturing shop equipment. Supporting 1,000+ construction firms and garages.
            </p>

            {/* Social / Action Icons */}
            <div className="flex items-center gap-3 pt-1 text-[#858585]">
              <a
                href="/"
                aria-label="Website"
                className="w-8 h-8 rounded-full bg-[#17191E] border border-white/[0.08] hover:border-[#FFC400] text-[#858585] hover:text-[#FFC400] flex items-center justify-center transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({ title: "Lovokit", url: window.location.href }).catch(() => {});
                  } else if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard");
                  }
                }}
                aria-label="Share"
                className="w-8 h-8 rounded-full bg-[#17191E] border border-white/[0.08] hover:border-[#FFC400] text-[#858585] hover:text-[#FFC400] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <a
                href="https://wa.me/919747745544"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message on WhatsApp"
                className="w-8 h-8 rounded-full bg-[#17191E] border border-white/[0.08] hover:border-[#FFC400] text-[#858585] hover:text-[#FFC400] flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:sales@lovosis.in"
                aria-label="Send Email"
                className="w-8 h-8 rounded-full bg-[#17191E] border border-white/[0.08] hover:border-[#FFC400] text-[#858585] hover:text-[#FFC400] flex items-center justify-center transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Address & Contact Details */}
            <div className="pt-2 space-y-2.5 text-xs text-[#858585]">
              <div className="flex items-start gap-2.5 max-w-sm">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  3rd Floor, Swathi building, 4-72/2, Main Road, opp. singapura Garden, Lakshmipura, Abbigere, Bengaluru, Karnataka 560090
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href="tel:+919747745544"
                  className="hover:text-[#FFC400] transition-colors font-medium text-white/90"
                >
                  +91 97477 45544
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href="mailto:sales@lovosis.in"
                  className="hover:text-[#FFC400] transition-colors font-medium text-white/90"
                >
                  sales@lovosis.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 — Products Catalog (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h4 className="text-xs sm:text-[13px] font-black text-white tracking-wider uppercase mb-1">
              PRODUCTS CATALOG
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {catalogLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-[#858585] hover:text-[#FFC400] transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    <span>{item.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono tracking-wider">
                      [{item.brand}]
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/products"
                  className="text-white hover:text-[#FFC400] transition-colors duration-200 inline-flex items-center gap-1 font-bold text-xs"
                >
                  <span>All Categories &amp; Equipment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Enterprise Support (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h4 className="text-xs sm:text-[13px] font-black text-white tracking-wider uppercase mb-1">
              ENTERPRISE SUPPORT
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#858585] hover:text-[#FFC400] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Legal & Compliance (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h4 className="text-xs sm:text-[13px] font-black text-white tracking-wider uppercase mb-1">
              LEGAL &amp; COMPLIANCE
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#858585] hover:text-[#FFC400] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Horizontal Divider & Bottom Strip */}
        <div className="border-t border-white/[0.08] mt-12 pt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[#858585]">
            {/* Copyright Statement */}
            <p className="text-center lg:text-left text-[11.5px] leading-relaxed">
              © 2026 Lovokit by Lovosis Technology Private Limited. All rights reserved. All brand marks and logos are properties of their respective owners.
            </p>

            {/* Accepted Payment Systems */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold shrink-0">
              <span className="text-[#858585] font-medium mr-1">Accepted Payment Systems:</span>
              {paymentMethods.map((pm) => (
                <span
                  key={pm}
                  className="px-2 py-0.5 rounded bg-[#17191E] border border-white/10 text-white font-mono text-[10px] tracking-wider uppercase"
                >
                  {pm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
