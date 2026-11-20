"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  Cpu,
  GraduationCap,
  Car,
  Radio,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  Settings,
  Wrench,
  FileText,
  Sparkles,
  TrendingUp,
  Clock,
  Building2,
  Phone,
  Mail,
  Download,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  Check,
  ExternalLink,
  Award,
  BarChart3,
  Flame,
  Truck,
  Headphones,
  Package,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// =============================================================================
// HERO CAROUSEL SLIDES (HOME PAGE STYLE, INDUSTRIAL THEME)
// =============================================================================
export const industrialSlides = [
  {
    id: 1,
    badge: "LOVOKIT INDUSTRIAL HUB",
    icon: Factory,
    headingLine1: "Turnkey Industrial Test.",
    headingLine2: "Measurement & Automation.",
    subheadingTag: null,
    description:
      "High-precision diagnostic benches, automated QC test fixtures, and syllabus-aligned university laboratories with NABL calibration and 24h Pune depot dispatch.",
    primaryBtn: { text: "Request Enterprise RFP" },
    secondaryBtn: { text: "Explore Sectors", href: "#sectors" },
    trustBadges: [
      { icon: ShieldCheck, label: "NABL 17025 Calibrated" },
      { icon: Truck, label: "24h Pune Dispatch" },
      { icon: Wrench, label: "On-Site Commissioning" },
    ],
    bgImage: "/images/.webp",
    mobileImage: "/images/1slide_mobile.webp",
    alt: "LOVOKIT Industrial Hub - Turnkey Industrial Test, Measurement & Automation.",
  },
  {
    id: 2,
    badge: "AUTOMOTIVE & EV SUITE",
    icon: Car,
    headingLine1: "Advanced Powertrain &",
    headingLine2: "Inverter Diagnostic Benches",
    subheadingTag: "High-Voltage • 1500V Probing • CAN/LIN",
    description:
      "Engineered for EV battery management systems, traction motor drive validation, and automated functional quality control fixtures with custom differential probing.",
    primaryBtn: { text: "Configure EV Station" },
    secondaryBtn: { text: "View EV Packages", href: "#packages" },
    trustBadges: [
      { icon: ShieldCheck, label: "Automotive Grade" },
      { icon: Zap, label: "High-Voltage Ready" },
      { icon: Headphones, label: "Field Engineers" },
    ],
    bgImage: "/images/2slide.webp",
    mobileImage: "/images/2slide_mobile.webp",
    alt: "LOVOKIT Advanced Powertrain & Inverter Diagnostic Benches.",
  },
  {
    id: 3,
    badge: "ACADEMIC & R&D LABS",
    icon: GraduationCap,
    headingLine1: "Turnkey Lab Solutions for",
    headingLine2: "Institutes & Universities",
    subheadingTag: null,
    description:
      "Standardized 10/20/30-station educational lab bundles with student-safe testbenches, curriculum experiment manuals, and master faculty hubs.",
    primaryBtn: { text: "Request Institutional RFP" },
    secondaryBtn: { text: "View Lab Bundles", href: "#packages" },
    trustBadges: [
      { icon: Package, label: "10-Bench Bundles" },
      { icon: FileText, label: "Syllabus Aligned" },
      { icon: ShieldCheck, label: "Student Protected" },
    ],
    bgImage: "/images/3slide.webp",
    mobileImage: "/images/3slide_mobile.webp",
    alt: "LOVOKIT Turnkey Lab Solutions for Institutes & Universities.",
  },
];

// =============================================================================
// INDUSTRIAL SECTORS DATA
// =============================================================================
export const industrialSectors = [
  {
    id: "automotive-ev",
    name: "Automotive & EV",
    tagline: "High-Voltage Powertrain, BMS & Inverter Diagnostic Systems",
    icon: Car,
    image: "/images/solutions/industrial-testing.jpg",
    badge: "HIGH-GROWTH SECTOR",
    overview:
      "Modern electric vehicles and hybrid powertrains demand rigorous validation across battery management systems (BMS), motor traction drives, and onboard charging electronics.",
    solutions: [
      "High-voltage differential probing up to 1500V DC/AC pk-pk",
      "CAN / LIN / FlexRay automotive bus protocol decoding & jitter analysis",
      "Dynamic regenerative motor drive and inverter efficiency profiling",
      "Cell-level impedance and thermal rise testing for battery packs",
    ],
    recommendedInstruments: [
      {
        model: "OWON XDS3302",
        type: "300 MHz 14-bit Oscilloscope",
        role: "Inverter Switching Waveforms",
      },
      {
        model: "SIGLENT SPD3303X-E",
        type: "Triple Programmable DC Supply",
        role: "ECU / Sensor Rail Powering",
      },
      {
        model: "UNI-T UT216C",
        type: "600A True RMS Clamp Meter",
        role: "Inrush & Traction Current",
      },
    ],
    caseStudy:
      "Equipped Pune-based EV Powertrain OEM with 8 custom validation stations, cutting fault isolation times by 42%.",
  },
  {
    id: "electronics-mfg",
    name: "Electronics Manufacturing",
    tagline: "High-Throughput SMT Production, Automated Test & QC Racks",
    icon: Cpu,
    image: "/images/solutions/custom-solutions.jpg",
    badge: "PRECISION QC",
    overview:
      "For surface-mount assembly (SMT) plants and electronic contract manufacturers (EMS), production speed and zero-defect quality control determine factory margins.",
    solutions: [
      "Multi-channel automated functional test (FCT) and in-circuit test (ICT) rigs",
      "High-speed SPI / I2C / UART digital signal integrity verification",
      "Automated SCPI scripting over USB/LAN for cycle-time minimization",
      "Power rail ripple, transient response, and noise spectral profiling",
    ],
    recommendedInstruments: [
      {
        model: "RIGOL DHO804",
        type: "True 12-bit 4-Ch Scope",
        role: "Multi-Rail Ripple Diagnostics",
      },
      {
        model: "UNI-T UTG962E",
        type: "60 MHz Arbitrary Generator",
        role: "Clock & Sensor Emulation",
      },
      {
        model: "OWON XDS3204AE",
        type: "200 MHz Touchscreen Scope",
        role: "Functional Bench QC",
      },
    ],
    caseStudy:
      "Installed 14 automated testing jigs at Noida EMS facility, achieving 99.8% first-pass factory yield.",
  },
  {
    id: "academic-research",
    name: "Academic & R&D Labs",
    tagline: "Turnkey University Engineering Benches & Faculty Workstations",
    icon: GraduationCap,
    image: "/images/solutions/academic-labs.jpg",
    badge: "INSTITUTIONAL STANDARD",
    overview:
      "Equipping educational institutions and central research facilities with robust, student-proof instruments designed for continuous pedagogical operation.",
    solutions: [
      "Standardized 10/20/30-station laboratory bundles with central faculty station",
      "Comprehensive syllabus-aligned experiment guides & connection kits",
      "Overload and reverse polarity protected hardware for undergraduate safety",
      "PC remote screen broadcasting for smart classroom and remote lab sessions",
    ],
    recommendedInstruments: [
      {
        model: "OWON XDS3104E",
        type: "100 MHz 4-Ch Touch Scope",
        role: "Classroom Bench Experiments",
      },
      {
        model: "UNI-T UT89X",
        type: "True RMS Industrial DMM",
        role: "Component & Circuit Probing",
      },
      {
        model: "LOVOKIT Lab Rack",
        type: "Turnkey Power & DAQ Bench",
        role: "Universal Student Station",
      },
    ],
    caseStudy:
      "Supplied complete electrical engineering laboratory setup for 120 students across 3 campus technical institutes.",
  },
  {
    id: "telecom-rf",
    name: "Telecom & 5G RF",
    tagline: "RF Signal Synthesis, Spectrum Analysis & High-Speed Data Links",
    icon: Radio,
    image: "/images/1slide.png",
    badge: "RF & WIRELESS",
    overview:
      "From sub-6GHz base station modules to IoT wireless sensor nodes, high-frequency signal fidelity and modulation cleanliness are mission critical.",
    solutions: [
      "Spectrum monitoring and spurious emissions tracking up to GHz bands",
      "Phase noise, adjacent channel leakage, and harmonic distortion verification",
      "Antenna matching, VSWR, and return loss vector measurements",
      "Clock jitter and eye-diagram validation on high-speed serial interconnects",
    ],
    recommendedInstruments: [
      {
        model: "RIGOL Spectrum Series",
        type: "Real-Time Spectrum Analyzer",
        role: "RF Harmonic & EMI Scouting",
      },
      {
        model: "OWON XDS3302",
        type: "300 MHz High-Res Scope",
        role: "High-Frequency Carrier Probing",
      },
      {
        model: "UNI-T UTG962E",
        type: "Dual-Ch Arbitrary Generator",
        role: "Modulated Baseband Injection",
      },
    ],
    caseStudy:
      "Supported Bangalore RF hardware startup with turnkey spectrum analysis and RF signal source benches.",
  },
  {
    id: "renewable-power",
    name: "Renewable Energy & Power",
    tagline: "Solar Inverters, Grid Simulation & Energy Storage Profiling",
    icon: Zap,
    image: "/images/2slide.png",
    badge: "CLEAN ENERGY",
    overview:
      "Solar string inverters, wind power converters, and high-capacity battery energy storage systems (BESS) require high-power precision instrumentation.",
    solutions: [
      "Total Harmonic Distortion (THD) analysis on grid-tied inverter outputs",
      "DC programmable load profiling for PV maximum power point tracking (MPPT)",
      "Transient surge, lightning strike simulation, and ground continuity testing",
      "Long-term temperature coefficient and efficiency data acquisition",
    ],
    recommendedInstruments: [
      {
        model: "OWON High-Power Load",
        type: "Programmable DC Load",
        role: "Dynamic MPPT Curve Emulation",
      },
      {
        model: "SIGLENT SPD3303X-E",
        type: "Precision Linear Power",
        role: "Gate Driver & Logic Supply",
      },
      {
        model: "OWON XDS3202E",
        type: "200 MHz 14-bit Scope",
        role: "High-Resolution Power Waveforms",
      },
    ],
    caseStudy:
      "Commissioned Gujarat solar inverter manufacturing plant with 6 automated MPPT and grid-compliance testing racks.",
  },
  {
    id: "aerospace-defense",
    name: "Aerospace & Industrial Auto",
    tagline: "Ruggedized Testing, Environmental Stress Screening & Avionics",
    icon: Factory,
    image: "/images/3slide.png",
    badge: "MISSION CRITICAL",
    overview:
      "When equipment failure is not an option, aerospace and defense contractors rely on ultra-stable, calibrated instruments built for hostile test environments.",
    solutions: [
      "Environmental stress screening (thermal cycling and vibration test rigs)",
      "MIL-STD avionics serial bus (ARINC-429, MIL-STD-1553) signal testing",
      "Micro-ohm bond resistance and ground bonding verification",
      "Isolated high-speed recording for explosive, ballistic, and actuator events",
    ],
    recommendedInstruments: [
      {
        model: "OWON XDS3204AE",
        type: "4-Channel Scope + Arb Gen",
        role: "Avionics Bus Decoding",
      },
      {
        model: "UNI-T UT89X",
        type: "Heavy-Duty True RMS DMM",
        role: "Field Grounding & Insulation",
      },
      {
        model: "SIGLENT High-End DAQ",
        type: "Multi-Channel Scanner",
        role: "Thermal Stress Logging",
      },
    ],
    caseStudy:
      "Supplied calibrated diagnostic instruments for aerospace actuator testing facility in Hyderabad.",
  },
];

// =============================================================================
// TURNKEY LAB PACKAGES (PRE-ENGINEERED BUNDLES)
// =============================================================================
export const turnkeyPackages = [
  {
    id: "package-ev",
    title: "Tier-1 Automotive & EV Diagnostic Station",
    category: "Automotive / EV",
    tag: "MOST POPULAR FOR EV",
    priceRange: "₹4,85,000",
    leadTime: "3 - 5 Days Delivery",
    image: "/images/featured/owon-exact-transparent.png",
    description:
      "Comprehensive high-voltage diagnostic station engineered specifically for EV motor controller testing, inverter development, and BMS cell array validation.",
    includedGear: [
      "OWON XDS3302 (300 MHz, 2-Ch, 14-bit ADC Scope)",
      "High-Voltage Differential Probe Pair (1000V Category III)",
      "SIGLENT SPD3303X-E Triple-Output Programmable DC Supply",
      "UNI-T UT216C 600A True RMS Clamp & Inrush Meter",
      "Pre-configured Anti-Static Laboratory Bench Mat & Grounding Kit",
      "1-Year NABL Traceable Calibration Certificate Included",
    ],
  },
  {
    id: "package-smt",
    title: "Electronics Production & SMT QC Testbench",
    category: "Manufacturing / EMS",
    tag: "HIGH-THROUGHPUT QC",
    priceRange: "₹2,95,000",
    leadTime: "24 - 48 Hours Dispatch",
    image: "/images/categories/oscilloscope-transparent.png",
    description:
      "Turnkey assembly and quality-assurance bench designed for electronic contract manufacturers. Maximizes test coverage and minimizes operator cycle times.",
    includedGear: [
      "OWON XDS3204E (200 MHz, 4-Channel Touchscreen Scope)",
      "UNI-T UTG962E 60 MHz Dual-Channel Waveform Generator",
      "UNI-T UT89X True RMS Industrial Digital Multimeter",
      "Precision Solder Smoke Extractor & High-Lumen Magnifier",
      "Python / SCPI Automated Test Suite Drivers for PC Logging",
      "Factory Direct Calibration & Installation Guidance",
    ],
  },
  {
    id: "package-academic",
    title: "Academic Benchmark Lab (10-Station Suite)",
    category: "Education / Research",
    tag: "INSTITUTIONAL BUNDLE",
    priceRange: "₹9,50,000",
    leadTime: "7 - 10 Days Deployment",
    image: "/images/featured/oscilloscope-visual.png",
    description:
      "Standardized 10-bench engineering laboratory package for universities, polytechnics, and R&D centers. Complete with syllabus experiment sets and master station.",
    includedGear: [
      "10x OWON XDS3104E (100 MHz, 4-Ch Digital Storage Scopes)",
      "10x Regulated Linear 30V/5A Bench DC Power Supplies",
      "10x High-Precision Digital Multimeters with Temp Probes",
      "1x Master Faculty Instructor Bench with Projection Hub",
      "Printed Lab Curriculum Manuals & Sample Circuit Boards",
      "On-Campus Faculty Training & Commissioning by LOVOKIT Engineers",
    ],
  },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function IndustrialHubPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [activeSectorId, setActiveSectorId] = useState("automotive-ev");
  const [rfpModalOpen, setRfpModalOpen] = useState(false);
  const [selectedPackageForQuote, setSelectedPackageForQuote] = useState(null);
  const [rfpSubmitted, setRfpSubmitted] = useState(false);

  // Auto-play interval: cycles every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % industrialSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? industrialSlides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % industrialSlides.length);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  // Form State
  const [rfpForm, setRfpForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    sector: "Automotive & EV",
    budgetRange: "₹2 Lakh - ₹5 Lakh",
    quantity: "1-3 Units",
    notes: "",
  });

  const activeSector =
    industrialSectors.find((s) => s.id === activeSectorId) || industrialSectors[0];

  const handleOpenRfp = (pkg = null) => {
    setSelectedPackageForQuote(pkg);
    setRfpSubmitted(false);
    if (pkg) {
      setRfpForm((prev) => ({
        ...prev,
        notes: `Inquiring about package: ${pkg.title} (${pkg.priceRange})`,
      }));
    }
    setRfpModalOpen(true);
  };

  const handleSubmitRfp = (e) => {
    e.preventDefault();
    setRfpSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* ===================================================================== */}
      {/* 2. COMPACT INDUSTRIAL HERO CAROUSEL (HOME PAGE STYLE, REDUCED HEIGHT) */}
      {/* ===================================================================== */}
      <section
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative w-full overflow-hidden bg-white select-none group border-b border-slate-100 sm:flex sm:items-center sm:min-h-[460px] lg:min-h-[480px]"
      >
        {/* 1. Desktop Full-Width Studio Background Banner (Hidden on Mobile) */}
        <div className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none select-none">
          {industrialSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${idx === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
                }`}
            >
              <Image
                src={slide.bgImage}
                alt={slide.alt}
                fill
                priority={true}
                loading="eager"
                unoptimized
                sizes="100vw"
                className="object-cover object-right select-none"
              />
            </div>
          ))}
        </div>

        {/* 2. Mobile Top Image Display (Zero Cutting Edge, Perfectly Contained) */}
        <div className="sm:hidden relative w-full h-[220px] xs:h-[260px] bg-white border-b border-slate-100 overflow-hidden flex items-center justify-center p-2">
          {industrialSlides.map((slide, idx) => (
            <div
              key={`mobile-img-${slide.id}`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out p-1.5 flex items-center justify-center ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
            >
              <Image
                src={slide.mobileImage || slide.bgImage}
                alt={slide.alt}
                fill
                priority={true}
                loading="eager"
                unoptimized
                sizes="100vw"
                className="object-contain object-center select-none"
              />
            </div>
          ))}
        </div>

        {/* 3. Main Content Container (Phir neeche left side mein ye sab text wagaira rakho) */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-5 pb-16 sm:py-10 lg:py-12 relative z-10">
          {industrialSlides.map((slide, idx) => {
            if (idx !== currentSlide) return null;
            return (
              <div
                key={`slide-content-${slide.id}`}
                className="max-w-md sm:max-w-xl lg:max-w-2xl flex flex-col justify-center items-start text-left space-y-3 sm:space-y-3.5 lg:space-y-4"
              >
                {/* Top Yellow Pill Badge - Flush Left */}
                <div className="flex items-center animate-hero-badge">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#FFC400] text-black text-[10px] sm:text-[11px] font-black tracking-wider uppercase px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-xs">
                    <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-black/15 flex items-center justify-center shrink-0">
                      <slide.icon className="w-2 sm:w-2.5 h-2 sm:h-2.5 stroke-[3] text-black" />
                    </span>
                    <span>{slide.badge}</span>
                  </div>
                </div>

                {/* Heading in EXACTLY 2 Lines - Flush Left */}
                <h1 className="text-2xl sm:text-3xl md:text-[2.2rem] lg:text-[2.6rem] xl:text-[2.85rem] font-black tracking-tight text-slate-950 leading-[1.14] text-left">
                  <span className="block sm:whitespace-nowrap animate-hero-heading-1">
                    {slide.headingLine1}
                  </span>
                  <span className="block sm:whitespace-nowrap mt-1 sm:mt-2 text-[#FFB800] drop-shadow-xs animate-hero-heading-2">
                    {slide.headingLine2}
                  </span>
                </h1>

                {/* Subheading Tag when present - Flush Left */}
                {slide.subheadingTag && (
                  <div className="inline-flex items-center gap-2 animate-hero-subtag">
                    <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-slate-900 bg-amber-100/70 border border-[#FFC400] px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full shadow-2xs">
                      {slide.subheadingTag}
                    </span>
                  </div>
                )}

                {/* Description - Flush Left */}
                <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-700 sm:text-slate-600 font-medium leading-relaxed max-w-sm sm:max-w-lg text-left animate-hero-desc">
                  {slide.description}
                </p>

                {/* Call to Action Buttons - Flush Left, Natural Pill Widths */}
                <div className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-4 pt-1 sm:pt-2 animate-hero-actions">
                  {/* Button 1: Primary Yellow Pill */}
                  <button
                    type="button"
                    onClick={() => handleOpenRfp()}
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm tracking-wide px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 text-center shrink-0 cursor-pointer"
                  >
                    <span>{slide.primaryBtn.text}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                  </button>

                  {/* Button 2: Secondary White Pill with black outline */}
                  <a
                    href={slide.secondaryBtn.href}
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-white hover:bg-slate-50 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide px-5 sm:px-7 py-2.5 sm:py-3 rounded-full border border-slate-900 shadow-xs transition-all duration-200 active:scale-95 text-center shrink-0 cursor-pointer"
                  >
                    <span>{slide.secondaryBtn.text}</span>
                  </a>
                </div>

                {/* Trust Highlights Strip below buttons - Flush Left */}
                <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 sm:gap-5 pt-1.5 sm:pt-2.5 text-[11px] sm:text-xs font-bold text-slate-800 animate-hero-trust">
                  {slide.trustBadges.map((badge, bIdx) => (
                    <React.Fragment key={bIdx}>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <badge.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFB800] shrink-0" />
                        <span>{badge.label}</span>
                      </div>

                      {bIdx < slide.trustBadges.length - 1 && (
                        <div className="h-3.5 w-[1px] bg-slate-300/80 hidden sm:block" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Desktop Slider Navigation Controls */}
        <button
          onClick={goToPrev}
          aria-label="Previous Slide"
          className="hidden sm:block absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 text-slate-600 hover:text-black transition-all hover:scale-125 active:scale-90 cursor-pointer focus:outline-none"
        >
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2] sm:stroke-[2.2] drop-shadow-xs" />
        </button>

        <button
          onClick={goToNext}
          aria-label="Next Slide"
          className="hidden sm:block absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 text-slate-600 hover:text-black transition-all hover:scale-125 active:scale-90 cursor-pointer focus:outline-none"
        >
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2] sm:stroke-[2.2] drop-shadow-xs" />
        </button>

        {/* 5. Desktop Carousel Dots */}
        <div className="hidden sm:flex absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 items-center gap-2 z-20">
          {industrialSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 cursor-pointer ${idx === currentSlide
                  ? "w-6 h-2 rounded-full bg-[#FFC400] shadow-xs"
                  : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400"
                }`}
            />
          ))}
        </div>

        {/* 6. Mobile Bottom Slider Bar (< ••• >) matching reference image */}
        <div className="sm:hidden absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          <button
            onClick={goToPrev}
            aria-label="Previous Slide"
            className="w-7 h-7 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-1.5">
            {industrialSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer ${idx === currentSlide
                    ? "w-5 h-1.5 rounded-full bg-[#FFC400] shadow-xs"
                    : "w-1.5 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400"
                  }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            aria-label="Next Slide"
            className="w-7 h-7 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. INTERACTIVE INDUSTRY SECTORS SHOWCASE                              */}
      {/* ===================================================================== */}
      <section id="sectors" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-black tracking-wider uppercase mb-3">
              <Cpu className="w-3.5 h-3.5 text-slate-900" />
              <span>SPECIALIZED SECTORS WE EMPOWER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              ENGINEERED FOR INDIA’S LEADING{" "}
              <span className="text-[#FFB800]">INDUSTRIAL WORKFLOWS.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Every production floor and research laboratory faces distinct testing
              protocols. Select your sector below to inspect custom instrument racks,
              recommended configurations, and real enterprise case studies.
            </p>
          </div>

          {/* Sector Navigation Tabs (Horizontal Scroll on Mobile) */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-4 mb-8 border-b border-slate-200">
            {industrialSectors.map((sector) => {
              const Icon = sector.icon;
              const isActive = activeSectorId === sector.id;
              return (
                <button
                  key={sector.id}
                  type="button"
                  onClick={() => setActiveSectorId(sector.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-200 shrink-0 cursor-pointer ${isActive
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20 scale-[1.02]"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-[#FFC400]" : "text-slate-500"
                      }`}
                  />
                  <span>{sector.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Sector Detailed Blueprint Showcase */}
          <div className="rounded-[32px] bg-gradient-to-br from-slate-900 to-[#0B0F17] text-white p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC400]/[0.05] rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Sector Narrative & Solutions (7 Cols) */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10.5px] font-black tracking-wider uppercase mb-4">
                  <span>{activeSector.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                  {activeSector.tagline}
                </h3>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeSector.overview}
                </p>

                {/* Solutions Checklist */}
                <div className="mt-6 space-y-2.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Engineered Capabilities:
                  </div>
                  {activeSector.solutions.map((sol, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>

                {/* Case Study Callout Box */}
                <div className="mt-8 p-4.5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-[#FFC400]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Real-World Installation:</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed font-medium">
                    {activeSector.caseStudy}
                  </p>
                </div>
              </div>

              {/* Right Column: Recommended Instrument Stack (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Recommended Bench Stack:</span>
                  <span className="text-[#FFC400]">Tested & Calibrated</span>
                </div>

                {activeSector.recommendedInstruments.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm font-black text-white">{item.model}</div>
                      <div className="text-xs text-slate-300">{item.type}</div>
                      <div className="text-[10.5px] font-bold text-amber-400 mt-1">
                        Application: {item.role}
                      </div>
                    </div>
                    <Link
                      href="/products"
                      className="p-2 rounded-xl bg-white/10 hover:bg-[#FFC400] hover:text-black text-white transition-colors shrink-0"
                      title="Inspect Model"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={() =>
                    handleOpenRfp({
                      title: `${activeSector.name} Custom Bench`,
                      priceRange: "Custom RFP Quote",
                    })
                  }
                  className="w-full mt-2 py-3.5 rounded-2xl bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-lg cursor-pointer"
                >
                  <FileText className="w-4 h-4 stroke-[2.5]" />
                  <span>Configure {activeSector.name} Station</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. TURNKEY LAB PACKAGES (PRE-CONFIGURED BENCH BUNDLES)                 */}
      {/* ===================================================================== */}
      <section id="packages" className="py-16 sm:py-24 bg-[#F2F4F7] relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-black tracking-wider uppercase mb-3">
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                <span>PRE-ENGINEERED WORKBENCHES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                POPULAR TURNKEY{" "}
                <span className="text-[#FFB800]">LAB PACKAGES.</span>
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Ready-to-deploy laboratory bundles complete with test instruments,
                differential probes, safety fixtures, and calibration records.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenRfp()}
              className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-[#FFC400] text-white hover:text-black text-xs font-black tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
            >
              Request Custom Package RFP
            </button>
          </div>

          {/* 3 Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {turnkeyPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-[28px] bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#FFC400] transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Top Badge & Category */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black tracking-tight">
                        {pkg.tag}
                      </span>
                      <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                        {pkg.category}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight group-hover:text-amber-600 transition-colors">
                      {pkg.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Centered Instrument Preview Image */}
                  <div className="relative w-full h-44 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 border-y border-slate-100">
                    <div className="relative w-full h-full">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* What is Included Checklist */}
                  <div className="p-6 pt-5">
                    <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3">
                      Package Hardware & Services:
                    </div>
                    <ul className="space-y-2">
                      {pkg.includedGear.map((gear, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0 mt-0.5" />
                          <span>{gear}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Pricing & Action Bar */}
                <div className="p-6 pt-4 bg-slate-50/80 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
                        TURNKEY ESTIMATE
                      </div>
                      <div className="text-xl font-black text-slate-950">
                        {pkg.priceRange}
                      </div>
                    </div>
                    <div className="text-[10.5px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      {pkg.leadTime}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenRfp(pkg)}
                    className="w-full py-3 rounded-xl bg-slate-950 hover:bg-[#FFC400] text-white hover:text-black text-xs font-black tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <span>Request Package Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. LOVOKIT INDUSTRIAL CAPABILITIES & GUARANTEES                       */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-black tracking-wider uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
              <span>THE LOVOKIT ENTERPRISE STANDARD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              WHY PROCURE THROUGH{" "}
              <span className="text-[#FFB800]">LOVOKIT INDUSTRIAL HUB.</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We eliminate procurement friction, vendor delays, and calibration
              compliance hurdles for testing labs and manufacturing plants across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 hover:border-[#FFC400] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#FFC400] flex items-center justify-center mb-4 shadow-sm text-black">
                <Award className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-slate-950 mb-1">
                NABL Calibration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ISO/IEC 17025 compliant calibration certificates traceable to
                national standards, ensuring seamless audit readiness.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 hover:border-[#FFC400] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-4 shadow-sm text-[#FFC400]">
                <Clock className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-slate-950 mb-1">
                24h Pune Dispatch
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-volume warehouse depot in Pune stocked with Tier-1 scopes,
                generators, and DMMs ready for express shipping.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 hover:border-[#FFC400] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#FFC400] flex items-center justify-center mb-4 shadow-sm text-black">
                <Wrench className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-slate-950 mb-1">
                On-Site Commissioning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated field application engineers deploy, rack-mount, and
                train your operators on equipment in person.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 hover:border-[#FFC400] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-4 shadow-sm text-[#FFC400]">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-slate-950 mb-1">
                OEM Warranty & AMC
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official manufacturer warranty backed by annual maintenance
                contracts and rapid turnaround standby replacement units.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. INDUSTRIAL RFP / QUOTATION MODAL                                  */}
      {/* ===================================================================== */}
      {rfpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#0B0D13] text-white p-6 pb-5 flex items-center justify-between border-b border-white/10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FFC400] block mb-1">
                  LOVOKIT ENTERPRISE PROCUREMENT
                </span>
                <h3 className="text-xl font-black">
                  Request Official Industrial Quotation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRfpModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              {rfpSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-950">
                    RFP Successfully Registered!
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
                    Reference ID:{" "}
                    <span className="font-mono font-bold text-slate-900">
                      RFP-2026-IND-9481
                    </span>
                    . Our Senior Industrial Procurement Engineer will connect with
                    your team within 4 business hours with an official GST quotation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRfpModalOpen(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-slate-950 text-white text-xs font-black uppercase tracking-wider hover:bg-[#FFC400] hover:text-black transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitRfp} className="space-y-4">
                  {selectedPackageForQuote && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-bold flex items-center justify-between">
                      <span>Selected: {selectedPackageForQuote.title}</span>
                      <span className="font-mono text-black">
                        {selectedPackageForQuote.priceRange}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Company / Institution Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rfpForm.companyName}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, companyName: e.target.value })
                        }
                        placeholder="e.g. Tata Motors / IIT Labs"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Procurement Officer Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rfpForm.contactPerson}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, contactPerson: e.target.value })
                        }
                        placeholder="Full name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={rfpForm.email}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, email: e.target.value })
                        }
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={rfpForm.phone}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, phone: e.target.value })
                        }
                        placeholder="+91 98000 00000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Industry Sector
                      </label>
                      <select
                        value={rfpForm.sector}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, sector: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#FFC400] bg-white"
                      >
                        <option value="Automotive & EV">Automotive & EV</option>
                        <option value="Electronics Manufacturing">Electronics Manufacturing</option>
                        <option value="Academic & Research">Academic & Research</option>
                        <option value="Telecom & 5G">Telecom & 5G</option>
                        <option value="Renewable Energy">Renewable Energy</option>
                        <option value="Aerospace & Defense">Aerospace & Defense</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Approx Budget Bracket
                      </label>
                      <select
                        value={rfpForm.budgetRange}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, budgetRange: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#FFC400] bg-white"
                      >
                        <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                        <option value="₹1 Lakh - ₹3 Lakh">₹1 Lakh - ₹3 Lakh</option>
                        <option value="₹3 Lakh - ₹10 Lakh">₹3 Lakh - ₹10 Lakh</option>
                        <option value="₹10 Lakh - ₹25 Lakh">₹10 Lakh - ₹25 Lakh</option>
                        <option value="₹25 Lakh+ Institutional">₹25 Lakh+ Institutional</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                      Specific Requirements / Target Specs
                    </label>
                    <textarea
                      rows={3}
                      value={rfpForm.notes}
                      onChange={(e) =>
                        setRfpForm({ ...rfpForm, notes: e.target.value })
                      }
                      placeholder="Specify required bandwidth, channels, calibration needs, or tender deadlines..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md cursor-pointer"
                  >
                    <FileText className="w-4 h-4 stroke-[2.5]" />
                    <span>Submit RFP For Direct Pune Factory Quote</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 7. GLOBAL FOOTER                                                      */}
      {/* ===================================================================== */}
      <Footer />
    </div>
  );
}
