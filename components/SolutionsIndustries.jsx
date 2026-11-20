"use client";

import React from "react";
import {
  GraduationCap,
  Cpu,
  Factory,
  FlaskConical,
  Radio,
  Car,
} from "lucide-react";
import SolutionCard from "./SolutionCard";
import IndustryTile from "./IndustryTile";

export default function SolutionsIndustries() {
  const solutions = [
    {
      id: "academic-labs",
      title: "Academic & Training Labs",
      description: "Complete lab setup for institutions and universities.",
      image: "/images/solutions/academic-labs.jpg",
    },
    {
      id: "industrial-testing",
      title: "Industrial Testing",
      description: "Reliable instruments for production, R&D and QC.",
      image: "/images/solutions/industrial-testing.jpg",
    },
    {
      id: "custom-solutions",
      title: "Custom Solutions",
      description: "Tailored test and automation systems for your needs.",
      image: "/images/solutions/custom-solutions.jpg",
    },
  ];

  const industries = [
    {
      id: "education-research",
      name: "Education & Research",
      icon: GraduationCap,
    },
    {
      id: "electronics-mfg",
      name: "Electronics Manufacturing",
      icon: Cpu,
    },
    {
      id: "industrial-automation",
      name: "Industrial Automation",
      icon: Factory,
    },
    {
      id: "rd-labs",
      name: "R&D Labs",
      icon: FlaskConical,
    },
    {
      id: "telecom",
      name: "Telecommunication",
      icon: Radio,
    },
    {
      id: "automotive-ev",
      name: "Automotive & EV",
      icon: Car,
    },
  ];

  return (
    <section
      id="solutions-industries"
      aria-label="Solutions and Industries"
      className="py-14 sm:py-16 md:py-20 bg-white border-t border-gray-100 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Desktop Layout (62% Left / 38% Right) with Subtle Vertical Divider */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          {/* Left Column (~62%): Solutions for Real-World Applications */}
          <div className="w-full lg:w-[62%] flex flex-col justify-between lg:pr-10 lg:border-r lg:border-gray-200/90">
            {/* Section Heading */}
            <h3 className="text-xl sm:text-2xl lg:text-[1.7rem] font-black text-slate-950 tracking-tight leading-tight mb-5 sm:mb-6">
              Solutions for <span className="block sm:inline lg:block">Real-World Applications</span>
            </h3>

            {/* Three Photographic Cards in One Horizontal Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 flex-1">
              {solutions.map((item) => (
                <SolutionCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              ))}
            </div>
          </div>

          {/* Right Column (~38%): Industries We Serve */}
          <div className="w-full lg:w-[38%] flex flex-col justify-between">
            {/* Heading */}
            <h3 className="text-xl sm:text-2xl lg:text-[1.7rem] font-black text-slate-950 tracking-tight leading-tight mb-5 sm:mb-6">
              Industries We Serve
            </h3>

            {/* Six Compact Industry Tiles in a 3-Column × 2-Row Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5 flex-1">
              {industries.map((ind) => (
                <IndustryTile
                  key={ind.id}
                  name={ind.name}
                  icon={ind.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
