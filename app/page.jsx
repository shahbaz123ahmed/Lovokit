import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import AboutLovokit from "@/components/AboutLovokit";
import PartnersAndServices from "@/components/PartnersAndServices";
import TrendingBestSellers from "@/components/TrendingBestSellers";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-[#FFC400] selection:text-black">
      {/* 1. Premium Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section with Full-Width Showroom & Statistics Strip */}
      <Hero />

      {/* 3. Product Ecosystem / Categories */}
      <ProductCategories />

      {/* 4. About Lovokit - Quality, Precision & Service with The Lovokit Standard */}
      <AboutLovokit />

      {/* 5. Technology Partners & Support Services */}
      <PartnersAndServices />

      {/* 6. Trending Best Sellers Showcase (Directly below Brands / Company Names) */}
      <TrendingBestSellers />

      {/* 7. Final Call to Action Architectural Banner */}
      <CtaBanner />

      {/* 8. Premium Website Footer */}
      <Footer />
    </main>
  );
}
