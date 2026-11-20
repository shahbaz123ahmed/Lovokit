"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Linkedin, Youtube, Instagram, Mail, ArrowRight, Check } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  const productLinks = [
    { name: "Oscilloscopes", href: "#oscilloscopes" },
    { name: "Spectrum Analyzers", href: "#spectrum-analyzers" },
    { name: "Power Supplies", href: "#power-supplies" },
    { name: "Multimeters", href: "#multimeters" },
    { name: "Trainer Kits", href: "#trainer-kits" },
  ];

  const solutionLinks = [
    { name: "Education & R&D Labs", href: "/industrial-hub#sectors" },
    { name: "Industrial Testing & QC", href: "/industrial-hub#sectors" },
    { name: "Custom Automation Solutions", href: "/industrial-hub#solutions" },
    { name: "Turnkey Lab Setup Bundles", href: "/industrial-hub#packages" },
  ];

  const companyLinks = [
    { name: "About LOVOKIT", href: "#about" },
    { name: "Why Choose Us", href: "#why-choose-us" },
    { name: "Careers", href: "#careers" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer
      id="footer"
      aria-label="Site Footer"
      className="bg-[#080B10] border-t border-white/[0.08] text-gray-300 pt-16 sm:pt-20 pb-8 sm:pb-10 relative select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 5-Column Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 items-start">
          {/* Column 1 — Brand */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-block" aria-label="LOVOKIT Home">
              <Logo />
            </Link>
            <p className="text-xs sm:text-[13px] text-[#9CA3AF] leading-relaxed max-w-xs">
              Precision instruments and solutions for education, research, and industry.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#linkedin"
                aria-label="LOVOKIT on LinkedIn"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#FFC400] text-gray-400 hover:text-[#FFC400] hover:bg-[#FFC400]/10 flex items-center justify-center transition-all duration-200"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#youtube"
                aria-label="LOVOKIT on YouTube"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#FFC400] text-gray-400 hover:text-[#FFC400] hover:bg-[#FFC400]/10 flex items-center justify-center transition-all duration-200"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href="#instagram"
                aria-label="LOVOKIT on Instagram"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#FFC400] text-gray-400 hover:text-[#FFC400] hover:bg-[#FFC400]/10 flex items-center justify-center transition-all duration-200"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                aria-label="Contact LOVOKIT via Email"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#FFC400] text-gray-400 hover:text-[#FFC400] hover:bg-[#FFC400]/10 flex items-center justify-center transition-all duration-200"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2 — Products */}
          <div className="flex flex-col space-y-3 sm:space-y-3.5">
            <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase mb-1">
              Products
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-[13px]">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#9CA3AF] hover:text-[#FFC400] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Solutions */}
          <div className="flex flex-col space-y-3 sm:space-y-3.5">
            <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase mb-1">
              Solutions
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-[13px]">
              {solutionLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#9CA3AF] hover:text-[#FFC400] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company */}
          <div className="flex flex-col space-y-3 sm:space-y-3.5">
            <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase mb-1">
              Company
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-[13px]">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#9CA3AF] hover:text-[#FFC400] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Stay Updated / Newsletter */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase mb-1">
              Stay Updated
            </h4>
            <p className="text-xs sm:text-[13px] text-[#9CA3AF] leading-relaxed">
              Get the latest product updates, application notes, and offers.
            </p>

            {/* Newsletter Subscription Form */}
            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="flex items-center rounded-lg overflow-hidden border border-white/10 focus-within:border-[#FFC400] transition-colors shadow-inner bg-[#12151D]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email."
                  aria-label="Email address for newsletter"
                  className="bg-transparent text-white text-xs sm:text-sm px-3.5 py-2.5 flex-1 min-w-0 placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="bg-[#FFC400] hover:bg-[#e6b000] text-black px-3.5 py-2.5 flex items-center justify-center transition-colors flex-shrink-0 active:scale-95"
                >
                  {submitted ? (
                    <Check className="w-4 h-4 stroke-[3] text-black" />
                  ) : (
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  )}
                </button>
              </div>

              {/* Status and Feedback Messages */}
              {error && (
                <p className="text-[11px] text-red-400 mt-1.5 font-medium">{error}</p>
              )}
              {submitted && (
                <p className="text-[11px] text-[#FFC400] mt-1.5 font-medium flex items-center gap-1">
                  <span>✓</span> Thank you for subscribing!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Horizontal Divider */}
        <div className="border-t border-white/[0.08] mt-12 sm:mt-16 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
            {/* Copyright Statement */}
            <p className="text-center sm:text-left">
              © 2026 LOVOKIT. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="#privacy"
                className="hover:text-[#FFC400] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-700 select-none">|</span>
              <Link
                href="#terms"
                className="hover:text-[#FFC400] transition-colors duration-200"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
